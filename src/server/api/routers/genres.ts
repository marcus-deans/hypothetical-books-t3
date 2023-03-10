import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { prisma } from "../../db";
import { TRPCError } from "@trpc/server";

export const genresRouter = createTRPCRouter({
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

      const items = await prisma.genre.findMany({
        // get an extra item at the end which we'll use as next cursor
        take: limit + 1,
        where: { display: true },
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
        orderBy: {
          name: "desc",
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

  getAllWithOverallMetrics: publicProcedure
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

      const items = await prisma.genre.findMany({
        // get an extra item at the end which we'll use as next cursor
        take: limit + 1,
        where: { display: true },
        include: {
          books: {
            where: {
              display: true,
            },
            select: {
              id: true,
            },
          },
        },
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
        orderBy: {
          name: "desc",
        },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        // Remove the last item and use it as next cursor
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const nextItem = items.pop()!;
        nextCursor = nextItem.id;
      }

      const genresWithOverallMetrics = [];
      for (const genre of items.reverse()) {
        genresWithOverallMetrics.push({
          genre: genre,
          bookCount: genre.books.length,
        });
      }

      return {
        items: genresWithOverallMetrics,
        nextCursor,
      };
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;
      const genre = await prisma.genre.findUnique({
        where: { id },
      });
      if (!genre) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No genre with id '${id}'`,
        });
      }
      return genre;
    }),

  getByIdWithBooksAndAuthors: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;
      const genre = await prisma.genre.findUnique({
        where: { id },
        include: {
          books: {
            where: {
              display: true,
            },
            include: {
              authors: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });
      if (!genre) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No genre with id '${id}'`,
        });
      }
      return genre;
    }),

  getByName: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ input }) => {
      const genre = await prisma.genre.findFirst({
        where: {
          name: input.name,
        },
      });
      if (!genre) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No genre with name '${input.name}'`,
        });
      }
      return genre;
    }),

  add: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      const genre = await prisma.genre.create({
        data: {
          name: input.name,
          display: true,
        },
      });
      return genre;
    }),

  edit: publicProcedure
    .input(z.object({ id: z.string(), name: z.string() }))
    .mutation(async ({ input }) => {
      const genre = await prisma.genre.update({
        where: { id: input.id },
        data: {
          name: input.name,
        },
      });
      return genre;
    }),

  connectToBook: publicProcedure
    .input(z.object({ genreId: z.string(), bookId: z.string() }))
    .mutation(async ({ input }) => {
      const { genreId, bookId } = input;
      const connectedGenre = await prisma.genre.update({
        where: {
          id: genreId,
        },
        data: {
          books: {
            connect: {
              id: bookId,
            },
          },
        },
      });
      return connectedGenre;
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const { id } = input;
      // const genre = await prisma.genre.delete({
      //   where: { id },
      // });
      const currentGenre = await prisma.genre.findUnique({
        where: { id },
        include: {
          books: true,
        },
      });
      if ((currentGenre?.books.length ?? 1) > 0) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: `Genre '${
            currentGenre?.name ?? ""
          }' has books associated with it. Please delete those books first.`,
        });
      }

      const genre = await prisma.genre.update({
        where: { id },
        data: { display: false },
      });
      if (!genre) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No genre to delete with id '${id}'`,
        });
      }
      return genre;
    }),
});
