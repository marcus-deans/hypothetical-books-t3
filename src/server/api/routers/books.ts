import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
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
        where: { display: true },
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
        items: items.reverse(),
        nextCursor,
      };
    }),

  getAllWithAuthorsAndGenre: publicProcedure
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
        where: { display: true },
        include: {
          authors: {
            select: {
              name: true,
            },
          },
          genre: {
            select: {
              name: true,
            },
          },
        },
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
        orderBy: {
          title: "asc",
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
        items: items.reverse(),
        nextCursor,
      };
    }),

  getAllWithDetails: publicProcedure
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
        where: { display: true },
        include: {
          authors: true,
          genre: true,
          purchaseLines: true,
          salesLines: true,
        },
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
        items: items.reverse(),
        nextCursor,
      };
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;
      const book = await prisma.book.findUnique({
        where: { id },
      });
      if (!book || !book.display) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No book with id '${id}'`,
        });
      }
      return book;
    }),

  getByIdWithAuthorAndGenre: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;
      const book = await prisma.book.findUnique({
        where: { id },
        include: {
          authors: {
            select: {
              name: true,
            },
          },
          genre: {
            select: {
              name: true,
            },
          },
        },
      });
      if (!book || !book.display) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No book with id '${id}'`,
        });
      }
      return book;
    }),

  getByIdWithAllDetails: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;
      const book = await prisma.book.findUnique({
        where: { id },
        include: {
          authors: true,
          genre: true,
          purchaseLines: true,
          salesLines: true,
        },
      });
      if (!book || !book.display) {
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
   *  retailPrice      Float
   *  genre            Genre @relation(fields: [genreId], references: [lineId])
   *  genreId          String // relation String field
   *  purchaseLines      PurchaseLine[]
   *  saleReconciliationLines SaleLine[]
   *  //to Be determined
   *  inventoryCount    Int
   */

  edit: publicProcedure
    .input(
      z.object({
        id: z.string(),
        retailPrice: z.number().gte(0),
        genreId: z.string(),
        purchaseLineIds: z.string().array(),
        salesLineIds: z.string().array(),
      })
    )

    .mutation(async ({ input }) => {
      //TODO: add proper author implementation
      const book = await prisma.book.update({
        where: { id: input.id },
        data: {
          retailPrice: input.retailPrice,
          genreId: input.genreId,
          purchaseLines: {
            create: [],
          },
          salesLines: {
            create: [],
          },
        },
      });

      for (const purchaseLine of input.purchaseLineIds) {
        await prisma.book.update({
          where: { id: input.id },
          data: {
            purchaseLines: {
              connect: {
                id: purchaseLine,
              },
            },
          },
        });
      }

      for (const salesLine of input.salesLineIds) {
        await prisma.book.update({
          where: { id: input.id },
          data: {
            salesLines: {
              connect: {
                id: salesLine,
              },
            },
          },
        });
      }

      return book;
    }),

  add: publicProcedure
    .input(
      z.object({
        title: z.string(),
        authors: z.string().array(),
        isbn_13: z.string().length(13),
        isbn_10: z.string().length(10).nullish(),
        publisher: z.string(),
        publicationYear: z.number().int(),
        pageCount: z.number().int(),
        width: z.number().gte(0),
        height: z.number().gte(0),
        thickness: z.number().gte(0),
        retailPrice: z.number().gte(0),
        genreId: z.string(),
        purchaseLines: z.string().array(),
        salesLines: z.string().array(),
        inventoryCount: z.number().int(),
      })
    )

    //   model Author {
    //   id 				String @id @default(cuid())
    //   name 			String
    //   books 		Book[]

    .mutation(async ({ input }) => {
      // let authorData: { name: string }[];
      // input.authors.forEach((authorName) =>
      //   authorData.push({ name: authorName })
      // );

      //TODO: add proper author implementation
      const book = await prisma.book.create({
        data: {
          title: input.title,
          authors: {
            create: [],
          },
          isbn_13: input.isbn_13,
          isbn_10: input.isbn_10,
          publisher: input.publisher,
          publicationYear: input.publicationYear,
          pageCount: input.pageCount,
          width: input.width,
          height: input.height,
          thickness: input.thickness,
          retailPrice: input.retailPrice,
          genreId: input.genreId,
          purchaseLines: {
            create: [],
          },
          salesLines: {
            create: [],
          },
          inventoryCount: input.inventoryCount,
          display: true,
        },
      });

      for (const author of input.authors) {
        const ifAuthorExists = await prisma.author.findFirst({
          where: { name: author },
        });

        await prisma.book.update({
          where: { id: book.id },
          data: {
            authors: {
              connectOrCreate: {
                where: {
                  id: ifAuthorExists?.id ?? "",
                },
                create: {
                  name: author,
                },
              },
            },
          },
        });
      }

      return book;
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const { id } = input;

      const currentBook = await prisma.book.findUnique({
        where: { id },
      });

      if (currentBook?.inventoryCount ?? 1 > 0) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: `Book with id '${id}' has inventory greater than 0`,
        });
      }

      const book = await prisma.book.update({
        where: { id },
        data: {
          display: false,
        },
      });
      if (!book) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No book to delete with id '${id}'`,
        });
      }
      return book;
    }),
});
