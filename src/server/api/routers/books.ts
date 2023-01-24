import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { prisma } from "../../db";
import { TRPCError } from "@trpc/server";
export const booksRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ input }) => {
      /**
       * For pagination docs you can have a look here
       * @see https://trpc.io/docs/useInfiniteQuery
       * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
       */
      const limit = input.limit ?? 50;
      const { cursor } = input;

      const items = await prisma.book.findMany({
        // get an extra item at the end which we'll use as next cursor
        take: limit + 1,
        where: {},
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
        orderBy: {
          title: "desc",
        },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        // Remove the last item and use it as next cursor
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const nextItem = items.pop()!;
        nextCursor = nextItem.id;
      }

      return {
        item: items.reverse(),
        nextCursor,
      };
    }),

  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;
      const book = await prisma.book.findUnique({
        where: { id },
      });
      if (!book) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No book with id '${id}'`,
        });
      }
      return book;
    }),


  /**
   *  id                String @id @default(cuid())
   *  title            String
   *  authors          Author[]
   *  isbn_13          String
   *  isbn_10          String?
   *  publisher        String
   *  publicationYear  Int
   *  pageCount          Int
   *  width            Float
   *  height            Float
   *  thickness        Float
   *  retail_price      Float
   *  genre            Genre @relation(fields: [genreId], references: [id])
   *  genreId          String // relation String field
   *  purchaseLines      PurchaseLine[]
   *  saleReconciliationLines SaleLine[]
   *  //to Be determined
   *  inventoryCount    Int
   */

  add: publicProcedure
    .input(
      z.object({
        id: z.string().uuid().optional(),
        title: z.string().min(1).max(32),
        authors: z.string().array(),
        isbn_13: z.string().length(13),
        isbn_10: z.string().length(10).optional(),
        publisher: z.string(),
        publicationYear: z.string(),
        pageCount: z.number().min(0).int(),
        width: z.number().min(0),
        height: z.number().min(0),
        thickness: z.number().min(0),
        retail_price: z.number().min(0),
        genre: z.string(),
        genreId: z.string(),
        purchaseLines: ,
        saleReconcilitationLines: z.obj.saleReconcilitationLines
        inventoryCount: z.number().gte(0),
      })
    )
    .mutation(async ({ input }) => {
      const book = await prisma.book.create({
        data: input,
      });
      return book;
    }),

  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
