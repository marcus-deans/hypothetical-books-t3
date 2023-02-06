import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { prisma } from "../../db";
import { TRPCError } from "@trpc/server";

export const authorsRouter = createTRPCRouter({
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
      const author = await prisma.author.delete({
        where: { id },
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
