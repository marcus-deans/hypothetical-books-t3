import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { prisma } from "../../db";
import { TRPCError } from "@trpc/server";

export const buybackOrdersRouter = createTRPCRouter({
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

      const items = await prisma.buybackOrder.findMany({
        // get an extra item at the end which we'll use as next cursor
        take: limit + 1,
        where: { display: true },
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
        orderBy: {
          date: "desc",
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

      const items = await prisma.buybackOrder.findMany({
        // get an extra item at the end which we'll use as next cursor
        take: limit + 1,
        where: { display: true },
        include: {
          buybackLines: {
            where: {
              display: true,
            },
            include: {
              book: {
                select: {
                  title: true,
                  isbn_13: true,
                },
              },
            },
          },
          vendor: {
            select: {
              name: true,
            },
          },
          user: true,
        },
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
        orderBy: {
          date: "desc",
        },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        // Remove the last item and use it as next cursor
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const nextItem = items.pop()!;
        nextCursor = nextItem.id;
      }

      const buybackOrderWithOverallMetrics = [];
      for (const buybackOrder of items.reverse()) {
        let totalPrice = 0;
        let totalQuantity = 0;
        const seenBooks = new Set<string>();
        for (const buybackLine of buybackOrder.buybackLines) {
          totalPrice += buybackLine.quantity * buybackLine.unitBuybackPrice;
          totalQuantity += buybackLine.quantity;
          seenBooks.add(buybackLine.book.isbn_13);
        }
        buybackOrderWithOverallMetrics.push({
          buybackOrder: buybackOrder,
          totalPrice,
          totalQuantity,
          totalUniqueBooks: seenBooks.size,
        });
      }

      return {
        items: buybackOrderWithOverallMetrics,
        nextCursor,
      };
    }),

  getByDateWithOverallMetrics: publicProcedure
    .input(
      z.object({
        startDate: z.date().nullish(),
        endDate: z.date().nullish(),
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
      const start = input.startDate ?? new Date(1970, 0, 1);
      const end = input.endDate ?? new Date(2100, 0, 1);

      const items = await prisma.buybackOrder.findMany({
        // get an extra item at the end which we'll use as next cursor
        take: limit + 1,
        where: {
          display: true,
          date: {
            lte: end,
            gte: start,
          },
        },
        include: {
          buybackLines: {
            where: {
              display: true,
            },
            include: {
              book: {
                select: {
                  title: true,
                  isbn_13: true,
                },
              },
            },
          },
          vendor: {
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
          //Don't change this please because of report calculation for top 10 books. It requires it in date order from earliest to latest
          date: "desc",
        },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        // Remove the last item and use it as next cursor
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const nextItem = items.pop()!;
        nextCursor = nextItem.id;
      }

      const buybackOrderWithOverallMetrics = [];
      for (const buybackOrder of items.reverse()) {
        let totalPrice = 0;
        let totalQuantity = 0;
        const seenBooks = new Set<string>();
        for (const buybackLine of buybackOrder.buybackLines) {
          totalPrice += buybackLine.quantity * buybackLine.unitBuybackPrice;
          totalQuantity += buybackLine.quantity;
          seenBooks.add(buybackLine.book.isbn_13);
        }
        buybackOrderWithOverallMetrics.push({
          buybackOrder: buybackOrder,
          totalPrice,
          totalQuantity,
          totalUniqueBooks: seenBooks.size,
        });
      }

      return {
        items: buybackOrderWithOverallMetrics,
        nextCursor,
      };
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;
      const buybackOrder = await prisma.buybackOrder.findUnique({
        where: { id },
      });
      if (!buybackOrder || !buybackOrder.display) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No buyback order with id '${id}'`,
        });
      }
      return buybackOrder;
    }),

  getByIdWithOverallMetrics: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;
      const buybackOrderWithOverallMetrics =
        await prisma.buybackOrder.findUnique({
          where: { id },
          include: {
            buybackLines: {
              where: {
                display: true,
              },
              include: {
                book: {
                  select: {
                    id: true,
                    title: true,
                    isbn_13: true,
                  },
                },
              },
            },
            vendor: {
              select: {
                name: true,
                id: true,
              },
            },
          },
        });
      if (
        !buybackOrderWithOverallMetrics ||
        !buybackOrderWithOverallMetrics.display
      ) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No sales reconciliation with id '${id}'`,
        });
      }
      let totalPrice = 0;
      let totalQuantity = 0;
      const seenBooks = new Set<string>();
      for (const buybackLine of buybackOrderWithOverallMetrics.buybackLines) {
        totalPrice += buybackLine.quantity * buybackLine.unitBuybackPrice;
        totalQuantity += buybackLine.quantity;
        seenBooks.add(buybackLine.book.isbn_13);
      }
      return {
        buybackOrderWithOverallMetrics: buybackOrderWithOverallMetrics,
        totalPrice,
        totalQuantity,
        totalUniqueBooks: seenBooks.size,
      };
    }),

  edit: publicProcedure
    .input(
      z.object({
        id: z.string(),
        date: z.date(),
        vendorId: z.string(),
        buybackLines: z.array(z.string()),
      })
    )

    .mutation(async ({ input }) => {
      const editedBuybackOrder = await prisma.buybackOrder.update({
        where: { id: input.id },
        data: {
          date: input.date,
          vendor: {
            connect: {
              id: input.vendorId,
            },
          },
          display: true,
        },
      });
      return editedBuybackOrder;
    }),

  add: publicProcedure
    .input(
      z.object({
        date: z.date(),
        vendorId: z.string(),
        buybackLines: z.array(z.string()),
        user: z.object({
          id: z.string(),
          name: z.string(),
          role: z.string(),
        }),
      })
    )

    .mutation(async ({ input }) => {
      const buybackOrder = await prisma.buybackOrder.create({
        data: {
          date: input.date,
          vendor: {
            connect: {
              id: input.vendorId,
            },
          },
          buybackLines: {
            create: [],
          },
          user: {
            connect: {
              id: input.user.id,
            },
          },
          display: true,
        },
      });

      for (const buybackLineId of input.buybackLines) {
        await prisma.buybackLine.update({
          where: { id: buybackLineId },
          data: {
            buybackOrder: {
              connect: {
                id: buybackOrder.id,
              },
            },
          },
        });
      }

      return buybackOrder;
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const { id } = input;

      const currentBuybackOrder = await prisma.buybackOrder.findUnique({
        where: { id },
        include: {
          buybackLines: {
            where: {
              display: true,
            },
            include: {
              book: {
                select: {
                  id: true,
                  inventoryCount: true,
                },
              },
            },
          },
        },
      });

      for (const buybackLine of currentBuybackOrder?.buybackLines ?? []) {
        // const updatedBuybackLine = await prisma.buybackLine.update({
        //   where: { id: buybackLine.id },
        //   data: {
        //     display: false,
        //   },
        // });
        const updatedBuybackLine = await prisma.buybackLine.delete({
          where: { id: buybackLine.id },
        });
        if (!updatedBuybackLine) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: `No buyback line to delete with id '${id}'`,
          });
        }
        await prisma.book.update({
          where: { id: buybackLine?.book.id },
          data: {
            inventoryCount: {
              increment: buybackLine?.quantity,
            },
          },
        });
      }

      // const updatedBuybackOrder = await prisma.buybackOrder.update({
      //   where: { id },
      //   data: {
      //     display: false,
      //   },
      // });
      const updatedBuybackOrder = await prisma.buybackOrder.delete({
        where: { id },
      });
      if (!updatedBuybackOrder) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No buyback order to delete with id '${id}'`,
        });
      }
      return updatedBuybackOrder;
    }),
});
