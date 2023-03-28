import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import * as AWS from "aws-sdk";
import type { Image } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { env } from "../../../env/server.mjs";

import { v2 as cloudinary } from "cloudinary";
// Configuration
cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

const s3 = new AWS.S3();
AWS.config.update({
  accessKeyId: env.AWS_ACCESS_KEY_ID,
  secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
});

const BUCKET_NAME = env.AWS_S3_BUCKET;
const UPLOADING_TIME_LIMIT = 30;
const UPLOAD_MAX_FILE_SIZE = 1000000;

interface ImageMetadata extends Image {
  url: string;
}

export const imagesRouter = createTRPCRouter({
  getImagesForUser: publicProcedure
    .input(z.object({ bookId: z.string() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.session) {
        throw new TRPCError({
          message: "User is not authenticated",
          code: "UNAUTHORIZED",
        });
      }

      return [
        {
          // ...image,
          url: await s3.getSignedUrlPromise("getObject", {
            Bucket: BUCKET_NAME,
            Key: `images/${input.bookId}`,
          }),
        },
      ];
    }),

  addCloudinaryImage: publicProcedure
    .input(z.object({ imgUrl: z.string(), bookId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session) {
        throw new TRPCError({
          message: "User is not authenticated",
          code: "UNAUTHORIZED",
        });
      }

      return await cloudinary.uploader
        .upload(input.imgUrl, { public_id: input.bookId })
        .then((data) => {
          console.log(data);
          return data.url;
        })
        .catch((err) => {
          console.error(err);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `Error uploading image to cloudinary`,
          });
        });
    }),

  getCloudinaryImageFromId: publicProcedure
    .input(z.object({ bookId: z.string() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.session) {
        throw new TRPCError({
          message: "User is not authenticated",
          code: "UNAUTHORIZED",
        });
      }

      const currentBook = await prisma.book.findUnique({
        where: { id: input.bookId },
      });

      if (!currentBook) {
        throw new TRPCError({
          message: "Book not found",
          code: "NOT_FOUND",
        });
      }

      return currentBook.imgUrl;
    }),

  deleteCloudinaryImageFromId: publicProcedure
    .input(z.object({ bookId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session) {
        throw new TRPCError({
          message: "User is not authenticated",
          code: "UNAUTHORIZED",
        });
      }

      await cloudinary.uploader.destroy(input.bookId, function (error, result) {
        console.log(result, error);
      });
    }),

  getImageFromId: publicProcedure
    .input(z.object({ bookId: z.string() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.session) {
        throw new TRPCError({
          message: "User is not authenticated",
          code: "UNAUTHORIZED",
        });
      }

      return {
        // ...image,
        url: await s3.getSignedUrlPromise("getObject", {
          Bucket: BUCKET_NAME,
          Key: `images/${input.bookId}`,
        }),
      };
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

      await s3
        .deleteObject({
          Bucket: BUCKET_NAME,
          Key: `images/${input.imageId}`,
        })
        .promise();
    }),

  createPresignedUrl: publicProcedure
    .input(z.object({ bookId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session) {
        throw new TRPCError({
          message: "User is not authenticated",
          code: "UNAUTHORIZED",
        });
      }

      return new Promise((resolve, reject) => {
        s3.createPresignedPost(
          {
            Fields: {
              key: `images/${input.bookId}`,
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
