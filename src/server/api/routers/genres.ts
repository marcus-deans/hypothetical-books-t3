import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { prisma } from "../../db";
import { TRPCError } from "@trpc/server";

export const genresRouter = createTRPCRouter({
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
