import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { prisma } from "../../db";
import { TRPCError } from "@trpc/server";

export const shelvesRouter = createTRPCRouter({
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

      const items = await prisma.shelf.findMany({
        // get an extra item at the end which we'll use as next cursor
        include: {
          booksOnShelf: {
            include: {
              book: true,
            },
          },
        },
        take: limit + 1,
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
        orderBy: {
          id: "asc",
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
      const shelf = await prisma.shelf.findUnique({
        where: { id },
        include: {
          booksOnShelf: {
            include: {
              book: true,
            },
          },
        },
      });
      if (!shelf) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No shelf with id '${id}'`,
        });
      }
      return shelf;
    }),

  add: publicProcedure
    .input(
      z.object({
        caseId: z.string(),
        spaceUsed: z.number(),
        bookDetails: z
          .object({
            bookId: z.string(),
            orientation: z.string(),
            displayCount: z.number(),
            author: z.string(),
          })
          .array(),
        user: z.object({
          id: z.string(),
          name: z.string(),
          role: z.string(),
        }),
      })
    )
    .mutation(async ({ input }) => {
      const newShelf = await prisma.shelf.create({
        data: {
          case: {
            connect: {
              id: input.caseId,
            },
          },
          spaceUsed: input.spaceUsed,
        },
      });

      await prisma.case.update({
        where: { id: newShelf.caseId },
        data: {
          editor: {
            connect: {
              id: input.user.id,
            },
          },
        },
      });

      for (const bookDetails of input.bookDetails) {
        const bookId = bookDetails.bookId;
        const bookOrientation = bookDetails.orientation;
        const displayCount = bookDetails.displayCount;
        const author = bookDetails.author;
        const newBookOnShelf = await prisma.bookOnShelf.create({
          data: {
            book: {
              connect: {
                id: bookId,
              },
            },
            shelf: {
              connect: {
                id: newShelf.id,
              },
            },
            orientation: bookOrientation,
            displayCount: displayCount,
            author: author,
          },
        });
      }

      return newShelf;
    }),

  edit: publicProcedure
    .input(
      z.object({
        id: z.string(),
        spaceUsed: z.number(),
        bookDetails: z
          .object({
            bookId: z.string(),
            orientation: z.string(),
            displayCount: z.number(),
            author: z.string(),
          })
          .array(),
        user: z.object({
          id: z.string(),
          name: z.string(),
          role: z.string(),
        }),
      })
    )
    .mutation(async ({ input }) => {
      const deletedBookOnShelf = await prisma.bookOnShelf.deleteMany({
        where: { shelfId: input.id },
      });

      const newShelf = await prisma.shelf.update({
        where: { id: input.id },
        data: {
          spaceUsed: input.spaceUsed,
        },
      });

      await prisma.case.update({
        where: { id: newShelf.caseId },
        data: {
          editor: {
            connect: {
              id: input.user.id,
            },
          },
        },
      });

      await prisma.bookOnShelf.createMany({
        data: input.bookDetails.map((bookDetails) => ({
          bookId: bookDetails.bookId,
          shelfId: input.id,
          orientation: bookDetails.orientation,
          displayCount: bookDetails.displayCount,
          author: bookDetails.author,
        })),
      });

      // for (const bookDetails of input.bookDetails) {
      //   const bookId = bookDetails.bookId;
      //   const bookOrientation = bookDetails.orientation;
      //   const newBookOnShelf = await prisma.bookOnShelf.create({
      //     data: {
      //       book: {
      //         connect: {
      //           id: bookId,
      //         },
      //       },
      //       shelf: {
      //         connect: {
      //           id: newShelf.id,
      //         },
      //       },
      //       orientation: bookOrientation,
      //       displayCount: bookDetails.displayCount,
      //       author: bookDetails.author,
      //     },
      //   });
      // }

      return newShelf;
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))

    .mutation(async ({ input }) => {
      const { id } = input;

      const deletedBookOnShelf = await prisma.bookOnShelf.deleteMany({
        where: { shelfId: id },
      });

      const deletedShelf = await prisma.shelf.delete({
        where: { id },
      });
      if (!deletedShelf) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No shelf to delete with id '${id}'`,
        });
      }
      return deletedShelf;
    }),
});
