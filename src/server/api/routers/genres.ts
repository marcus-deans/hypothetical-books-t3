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
        where: {},
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
        orderBy: {
          name: "asc",
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

  add: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      const genre = await prisma.genre.create({
        data: input,
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
      const genre = await prisma.genre.delete({
        where: { id },
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
