import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { prisma } from "../../db";
import { TRPCError } from "@trpc/server";

export const authorsRouter = createTRPCRouter({
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

      const items = await prisma.author.findMany({
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

  add: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      const author = await prisma.author.create({
        data: input,
      });
      return author;
    }),

  connectToBook: publicProcedure
    .input(z.object({ authorId: z.string(), bookId: z.string() }))
    .mutation(async ({ input }) => {
      const { authorId, bookId } = input;
      const connectedAuthor = await prisma.author.update({
        where: {
          id: authorId,
        },
        data: {
          books: {
            connect: {
              id: bookId,
            },
          },
        },
      });
      return connectedAuthor;
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const { id } = input;
      // const author = await prisma.author.delete({
      //   where: { id },
      // });
      const author = await prisma.author.update({
        where: { id },
        data: {
          display: false,
        },
      });

      if (!author) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No author to delete with id '${id}'`,
        });
      }
      return author;
    }),
});
