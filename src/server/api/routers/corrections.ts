import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { prisma } from "../../db";
import { TRPCError } from "@trpc/server";

export const correctionsRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  add: publicProcedure
    .input(
      z.object({
        bookId: z.string(),
        quantity: z.number().int(),
        user: z.object({
          id: z.string(),
          name: z.string(),
          role: z.string(),
        }),
      })
    )

    .mutation(async ({ input }) => {
      const bookInventoryCount = await prisma.book.findUnique({
        where: { id: input.bookId },
        select: {
          inventoryCount: true,
        },
      });
      if ((bookInventoryCount?.inventoryCount ?? 0) + input.quantity < 0) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: `Not enough inventory for correction of ${input.quantity} books with id ${input.bookId}`,
        });
      }

      const correction = await prisma.correction.create({
        data: {
          book: {
            connect: {
              id: input.bookId,
            },
          },
          date: new Date(),
          quantity: input.quantity,
          user: {
            connect: {
              id: input.user.id,
            },
          },
        },
      });

      await prisma.book.update({
        where: { id: input.bookId },
        data: {
          inventoryCount: {
            increment: input.quantity,
          },
        },
      });
      return correction;
    }),
});
