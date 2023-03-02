import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import type { Image } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { env } from "../../../env/server.mjs";
import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost, PresignedPost } from "@aws-sdk/s3-presigned-post";

const BUCKET_NAME = env.AWS_S3_BUCKET;
const UPLOADING_TIME_LIMIT = 30;
const UPLOAD_MAX_FILE_SIZE = 1000000;
const userId = "hypothetical-images";
const REGION = env.AWS_S3_REGION;

const credentials = {
  accessKeyId: env.AWS_ACCESS_KEY_ID,
  secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
};

const s3Client = new S3Client({
  region: env.AWS_S3_REGION,
  credentials: credentials,
});
// const s3 = new AWS.S3();

interface ImageMetadata extends Image {
  url: string;
}

export const imagesRouter = createTRPCRouter({
  // getImagesForUser: publicProcedure
  //   .input(z.object({ bookId: z.string() }))
  //   .query(async ({ ctx, input }) => {
  //   if (!ctx.session) {
  //     throw new TRPCError({
  //       message: "User is not authenticated",
  //       code: "UNAUTHORIZED",
  //     });
  //   }
  //
  //   /*const userId = ctx.session.user?.id;
  //
  //   if (!userId) {
  //     throw new TRPCError({
  //       message: "User not found",
  //       code: "NOT_FOUND",
  //     });
  //   }*/
  //
  //   const images = await prisma.image.findMany({
  //     where: {
  //       userId: userId,
  //     },
  //   });
  //
  //   const extendedImages: ImageMetadata[] = await Promise.all(
  //     images.map(async (image) => {
  //       return {
  //         ...image,
  //         url: await s3Client.getSignedUrlPromise("getObject", {
  //           Bucket: BUCKET_NAME,
  //           Key: `${userId}/${image.id}`,
  //         }),
  //       };
  //     })
  //   );
  //   return extendedImages;
  // }),

  // getImageFromId: publicProcedure
  //   .input(z.object({ imageId: z.string() }))
  //   .query(async ({ ctx, input }) => {
  //     if (!ctx.session) {
  //       throw new TRPCError({
  //         message: "User is not authenticated",
  //         code: "UNAUTHORIZED",
  //       });
  //     }
  //
  //     const image = await prisma.image.findFirst({
  //       where: {
  //         id: input.imageId,
  //       },
  //     });
  //
  //     if (!image) {
  //       throw new TRPCError({
  //         message: "Invalid image access",
  //         code: "NOT_FOUND",
  //       });
  //     }
  //
  //     return {
  //       ...image,
  //       url: await s3.getSignedUrlPromise("getObject", {
  //         Bucket: BUCKET_NAME,
  //         Key: `${userId}/${image.id}`,
  //       }),
  //     };
  //   }),

  delete: publicProcedure
    .input(z.object({ bookId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session) {
        throw new TRPCError({
          message: "User is not authenticated",
          code: "UNAUTHORIZED",
        });
      }

      /*const userId = ctx?.session?.user?.id;

      if (!userId) {
        throw new TRPCError({
          message: "User not found",
          code: "NOT_FOUND",
        });
      }*/

      // const image = await prisma.image.findFirst({
      //   where: {
      //     id: input.imageId,
      //   },
      // });
      //
      // if (!image) {
      //   throw new TRPCError({
      //     message: "Invalid image access",
      //     code: "NOT_FOUND",
      //   });
      // }

      // await prisma.image.delete({
      //   where: {
      //     id: input.imageId,
      //   },
      // });

      const data = await s3Client.send(
        new DeleteObjectCommand({
          Bucket: BUCKET_NAME,
          Key: `images/${input.bookId}`,
        })
      );
      return data;
    }),

  // getImageUrl: publicProcedure
  //   .input(z.object({ bookId: z.string() }))
  //   .mutation(async ({ ctx, input }) => {
  //     if (!ctx.session) {
  //       throw new TRPCError({
  //         message: "User is not authenticated",
  //         code: "UNAUTHORIZED",
  //       });
  //     }
  //
  //     const clientOptions: S3ClientConfig = {
  //       region: REGION,
  //     };
  //
  //     // const client = new S3Client(clientOptions);
  //     // const awsName = `images/${input.bookId}`;
  //     // const params = {
  //     //   Bucket: BUCKET_NAME,
  //     //   Key: awsName,
  //     //   Body: "BODY",
  //     //   Region: REGION,
  //     // };
  //     // const command = new GetObjectCommand(params);
  //     const s3ObjectUrl = parseUrl(
  //       `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/images/${input.bookId}`
  //     );
  //
  //
  //     const presigner = new S3RequestPresigner({
  //       credentials: {
  //         accessKeyId: env.AWS_ACCESS_KEY_ID,
  //         secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  //       },
  //       region: REGION,
  //       sha256: Hash.bind(null, "sha256"),
  //     });
  //
  //     console.log("Ready to try generating url");
  //     try {
  //       // const url = await getSignedUrl(client, command, {
  //       //   expiresIn: 60 * 60 * 24 * 7 * 4,
  //       // });
  //       const url = await presigner.presign(new HttpRequest(s3ObjectUrl));
  //       console.log(`Returning presigned get url: `, url);
  //       return url;
  //     } catch (err) {
  //       console.log("Could not get presigned get URL");
  //     }
  //   }),

  createPresignedUrl: publicProcedure
    .input(z.object({ bookId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session) {
        throw new TRPCError({
          message: "User is not authenticated",
          code: "UNAUTHORIZED",
        });
      }

      /*const userId = ctx.session.user?.id;

    if (!userId) {
      throw new TRPCError({
        message: "User not found",
        code: "NOT_FOUND",
      });
    }*/

      // const image = await prisma.image.create({
      //   data: {
      //     userId: userId,
      //   },
      // });

      // return new Promise((resolve, reject) => {
      //   createPresignedPost(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return
      return await createPresignedPost(
        s3Client,
        {
          Key: `images/${input.bookId}`,
          Conditions: [
            ["starts-with", "$Content-Type", "image/"],
            ["content-length-range", 0, UPLOAD_MAX_FILE_SIZE],
          ],
          Expires: UPLOADING_TIME_LIMIT,
          Bucket: BUCKET_NAME,
        }
        // (err, signed) => {
        //   if (err) return reject(err);
        //   resolve(signed);
        // }
      );
    }),
});
