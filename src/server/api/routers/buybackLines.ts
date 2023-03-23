import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { prisma } from "../../db";
import { TRPCError } from "@trpc/server";

export const buybackLinesRouter = createTRPCRouter({
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

      const items = await prisma.buybackLine.findMany({
        // get an extra item at the end which we'll use as next cursor
        take: limit + 1,
        where: { display: true },
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
        orderBy: {
          bookId: "desc",
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

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;
      const buybackLine = await prisma.buybackLine.findUnique({
        where: { id },
      });
      if (!buybackLine || !buybackLine.display) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No buyback line with id '${id}'`,
        });
      }
      return buybackLine;
    }),

  getByIdWithBookPrimaries: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;
      const buybackLineWithBookPrimaries = await prisma.buybackLine.findUnique({
        where: { id },
        include: {
          book: {
            select: {
              id: true,
              title: true,
              authors: true,
              isbn_13: true,
            },
          },
        },
      });
      if (
        !buybackLineWithBookPrimaries ||
        !buybackLineWithBookPrimaries.display
      ) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No sales line with id '${id}'`,
        });
      }
      return buybackLineWithBookPrimaries;
    }),

  getByIdWithRelations: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;
      const buybackLineWithRelations = await prisma.buybackLine.findUnique({
        where: { id },
        include: {
          book: {
            select: {
              id: true,
              title: true,
              authors: true,
              isbn_13: true,
            },
          },
          buybackOrder: {
            select: {
              id: true,
              date: true,
            },
          },
        },
      });
      if (!buybackLineWithRelations || !buybackLineWithRelations.display) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No sales line with id '${id}'`,
        });
      }
      return buybackLineWithRelations;
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        bookId: z.string(),
        quantity: z.number().gt(0),
        unitBuybackPrice: z.number().gt(0),
        buybackOrderId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const currentbuybackLine = await prisma.buybackLine.findUnique({
        where: { id: input.id },
        include: {
          book: {
            select: {
              id: true,
              inventoryCount: true,
            },
          },
        },
      });

      const futureBookInventoryCount = await prisma.book.findUnique({
        where: { id: input.bookId },
        select: {
          inventoryCount: true,
        },
      });

      if ((futureBookInventoryCount?.inventoryCount ?? 0) < input.quantity) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: `Not enough inventory for buyback of ${input.quantity} books with id ${input.bookId}`,
        });
      }

      const updatedBuybackLine = await prisma.buybackLine.update({
        where: {
          id: input.id,
        },
        data: {
          book: {
            connect: {
              id: input.bookId,
            },
          },
          quantity: input.quantity,
          unitBuybackPrice: input.unitBuybackPrice,
          buybackOrder: {
            connect: {
              id: input.buybackOrderId,
            },
          },
          display: true,
        },
      });

      await prisma.book.update({
        where: { id: input.bookId },
        data: {
          inventoryCount: {
            decrement: input.quantity,
          },
        },
      });
      await prisma.book.update({
        where: { id: currentbuybackLine?.book.id },
        data: {
          inventoryCount: {
            increment: currentbuybackLine?.quantity,
          },
        },
      });
      return updatedBuybackLine;
    }),

  add: publicProcedure
    .input(
      z.object({
        bookId: z.string(),
        quantity: z.number().gt(0),
        unitBuybackPrice: z.number().gt(0),
        buybackOrderId: z.string(),
      })
    )

    .mutation(async ({ input }) => {
      const bookInventoryCount = await prisma.book.findUnique({
        where: { id: input.bookId },
        select: {
          inventoryCount: true,
        },
      });
      if ((bookInventoryCount?.inventoryCount ?? 0) < input.quantity) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: `Not enough inventory for buyback of ${input.quantity} books with id ${input.bookId}`,
        });
      }

      const buybackLine = await prisma.buybackLine.create({
        data: {
          book: {
            connect: {
              id: input.bookId,
            },
          },
          quantity: input.quantity,
          unitBuybackPrice: input.unitBuybackPrice,
          buybackOrder: {
            connect: {
              id: input.buybackOrderId,
            },
          },
          display: true,
        },
      });
      await prisma.book.update({
        where: { id: input.bookId },
        data: {
          inventoryCount: {
            decrement: input.quantity,
          },
        },
      });
      return buybackLine;
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const { id } = input;

      const currentBuybackLine = await prisma.buybackLine.findUnique({
        where: { id },
        include: {
          book: {
            select: {
              id: true,
            },
          },
        },
      });

      // const updatedBuybackLine = await prisma.buybackLine.update({
      //   where: {
      //     id: input.id,
      //   },
      //   data: {
      //     display: false,
      //   },
      // });
      const updatedBuybackLine = await prisma.buybackLine.delete({
        where: {
          id: input.id,
        },
      });
      if (!updatedBuybackLine) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No buyback line with id '${id}'`,
        });
      }

      await prisma.book.update({
        where: { id: currentBuybackLine?.book.id },
        data: {
          inventoryCount: {
            increment: currentBuybackLine?.quantity,
          },
        },
      });

      return updatedBuybackLine;
    }),
});
