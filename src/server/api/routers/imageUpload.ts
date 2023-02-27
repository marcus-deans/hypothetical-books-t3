import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { prisma } from "../../db";
import * as AWS from "aws-sdk";
import type { Image } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { env } from "../../../env/server.mjs";

const s3 = new AWS.S3();

const BUCKET_NAME = env.AWS_S3_BUCKET ?? "hypothetical-books-dev";
const UPLOADING_TIME_LIMIT = 30;
const UPLOAD_MAX_FILE_SIZE = 1000000;

interface ImageMetadata extends Image {
  url: string;
}

export const imagesRouter = createTRPCRouter({
  getImagesForUser: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.session) {
      throw new TRPCError({
        message: "User is not authenticated",
        code: "UNAUTHORIZED",
      });
    }

    const userId = ctx.session.user?.id;

    if (!userId) {
      throw new TRPCError({
        message: "User not found",
        code: "NOT_FOUND",
      });
    }

    const images = await prisma.image.findMany({
      where: {
        userId: userId,
      },
    });

    const extendedImages: ImageMetadata[] = await Promise.all(
      images.map(async (image) => {
        return {
          ...image,
          url: await s3.getSignedUrlPromise("getObject", {
            Bucket: BUCKET_NAME,
            Key: `${userId}/${image.id}`,
          }),
        };
      })
    );
    return extendedImages;
  }),

  delete: publicProcedure
    .input(z.object({ imageId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session) {
        throw new TRPCError({
          message: "User is not authenticated",
          code: "UNAUTHORIZED",
        });
      }

      const userId = ctx?.session?.user?.id;

      if (!userId) {
        throw new TRPCError({
          message: "User not found",
          code: "NOT_FOUND",
        });
      }

      const image = await prisma.image.findFirst({
        where: {
          id: input.imageId,
        },
      });

      if (!image || image.userId !== userId) {
        throw new TRPCError({
          message: "Invalid image access",
          code: "NOT_FOUND",
        });
      }

      await prisma.image.delete({
        where: {
          id: input.imageId,
        },
      });

      await s3
        .deleteObject({
          Bucket: BUCKET_NAME,
          Key: `${userId}/${input.imageId}`,
        })
        .promise();
    }),

  createPresignedUrl: publicProcedure.mutation(async ({ ctx }) => {
    if (!ctx.session) {
      throw new TRPCError({
        message: "User is not authenticated",
        code: "UNAUTHORIZED",
      });
    }

    const userId = ctx.session.user?.id;

    if (!userId) {
      throw new TRPCError({
        message: "User not found",
        code: "NOT_FOUND",
      });
    }

    const image = await prisma.image.create({
      data: {
        userId: userId,
      },
    });

    return new Promise((resolve, reject) => {
      s3.createPresignedPost(
        {
          Fields: {
            key: `${userId}/${image.id}`,
          },
          Conditions: [
            ["starts-with", "$Content-Type", "image/"],
            ["content-length-range", 0, UPLOAD_MAX_FILE_SIZE],
          ],
          Expires: UPLOADING_TIME_LIMIT,
          Bucket: BUCKET_NAME,
        },
        (err, signed) => {
          if (err) return reject(err);
          resolve(signed);
        }
      );
    });
  }),
});
