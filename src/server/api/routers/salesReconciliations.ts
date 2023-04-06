import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { prisma } from "../../db";
import { TRPCError } from "@trpc/server";

export const salesReconciliationsRouter = createTRPCRouter({
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

      const items = await prisma.salesReconciliation.findMany({
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

      const items = await prisma.salesReconciliation.findMany({
        // get an extra item at the end which we'll use as next cursor
        take: limit + 1,
        where: { display: true },
        include: {
          salesLines: {
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

      const salesReconciliationWithOverallMetrics = [];
      for (const salesReconciliation of items.reverse()) {
        let totalPrice = 0;
        let totalQuantity = 0;
        const seenBooks = new Set<string>();
        for (const salesLine of salesReconciliation.salesLines) {
          totalPrice += salesLine.quantity * salesLine.unitWholesalePrice;
          totalQuantity += salesLine.quantity;
          seenBooks.add(salesLine.book.isbn_13);
        }
        salesReconciliationWithOverallMetrics.push({
          salesReconciliation,
          totalPrice,
          totalQuantity,
          totalUniqueBooks: seenBooks.size,
        });
      }

      return {
        items: salesReconciliationWithOverallMetrics,
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

      const items = await prisma.salesReconciliation.findMany({
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
          salesLines: {
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

      const salesReconciliationWithOverallMetrics = [];
      for (const salesReconciliation of items.reverse()) {
        let totalPrice = 0;
        let totalQuantity = 0;
        const seenBooks = new Set<string>();
        for (const salesLine of salesReconciliation.salesLines) {
          totalPrice += salesLine.quantity * salesLine.unitWholesalePrice;
          totalQuantity += salesLine.quantity;
          seenBooks.add(salesLine.book.isbn_13);
        }
        salesReconciliationWithOverallMetrics.push({
          salesReconciliation,
          totalPrice,
          totalQuantity,
          totalUniqueBooks: seenBooks.size,
        });
      }

      return {
        items: salesReconciliationWithOverallMetrics,
        nextCursor,
      };
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;
      const salesReconciliation = await prisma.salesReconciliation.findUnique({
        where: { id },
      });
      if (!salesReconciliation || !salesReconciliation.display) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No sales reconciliation with id '${id}'",
        });
      }
      return salesReconciliation;
    }),

  getByIdWithOverallMetrics: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;
      const salesReconciliationWithOverallMetrics =
        await prisma.salesReconciliation.findUnique({
          where: { id },
          include: {
            salesLines: {
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
            user: true,
          },
        });
      if (
        !salesReconciliationWithOverallMetrics ||
        !salesReconciliationWithOverallMetrics.display
      ) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No sales reconciliation with id '${id}'`,
        });
      }
      let totalPrice = 0;
      let totalQuantity = 0;
      const seenBooks = new Set<string>();
      for (const salesLine of salesReconciliationWithOverallMetrics.salesLines) {
        totalPrice += salesLine.quantity * salesLine.unitWholesalePrice;
        totalQuantity += salesLine.quantity;
        seenBooks.add(salesLine.book.isbn_13);
      }
      return {
        salesReconciliationWithOverallMetrics,
        totalPrice,
        totalQuantity,
        totalUniqueBooks: seenBooks.size,
      };
    }),

  getByIdWithSalesLineIds: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;
      const salesReconciliationWithSalesLineIds =
        await prisma.salesReconciliation.findUnique({
          where: { id },
          include: {
            salesLines: {
              where: {
                display: true,
              },
              select: {
                id: true,
              },
            },
          },
        });
      if (
        !salesReconciliationWithSalesLineIds ||
        !salesReconciliationWithSalesLineIds.display
      ) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No sales reconciliation with id '${id}'`,
        });
      }
      return salesReconciliationWithSalesLineIds;
    }),

  getByIdWithSalesLineAndBookTitle: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;
      const salesReconciliationWithSalesLineAndBookTitle =
        await prisma.salesReconciliation.findUnique({
          where: { id },
          include: {
            salesLines: {
              where: {
                display: true,
              },
              include: {
                book: {
                  select: {
                    title: true,
                  },
                },
              },
            },
          },
        });
      if (
        !salesReconciliationWithSalesLineAndBookTitle ||
        !salesReconciliationWithSalesLineAndBookTitle.display
      ) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No sales reconciliation with id '${id}'`,
        });
      }
      return salesReconciliationWithSalesLineAndBookTitle;
    }),

  // model SalesReconciliation{
  //   id 				String @id @default(cuid())
  //   date			DateTime
  //   saleLines SaleLine[]
  // }
  //
  // model SaleLine{
  //   id 				String @id @default(cuid())
  //   book 			Book @relation(fields: [bookId], references: [lineId])
  //   bookId 		String
  //   quantity 	Int
  //   unitWholesalePrice Float
  //   salesReconciliation		SalesReconciliation @relation(fields: [salesReconciliationId], references: [lineId])
  //   salesReconciliationId	String
  // }

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        date: z.date(),
        salesLines: z.array(z.string()),
      })
    )
    .mutation(async ({ input }) => {
      const updatedSalesReconciliation =
        await prisma.salesReconciliation.update({
          where: { id: input.id },
          data: {
            date: input.date,
          },
        });
    }),

  add: publicProcedure
    .input(
      z.object({
        date: z.date(),
        salesLines: z.array(z.string()),
        user: z.object({
          id: z.string(),
          name: z.string(),
          role: z.string(),
        }),
      })
    )

    .mutation(async ({ input }) => {
      const salesReconciliation = await prisma.salesReconciliation.create({
        data: {
          date: input.date,
          salesLines: {
            create: [],
          },
          user: {
            connect: {
              id: input.user.id,
            },
          },
        },
      });

      for (const salesLineId of input.salesLines) {
        await prisma.salesLine.update({
          where: { id: salesLineId },
          data: {
            salesReconciliation: {
              connect: {
                id: salesReconciliation.id,
              },
            },
          },
        });
      }

      return salesReconciliation;
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const { id } = input;

      const currentSalesReconciliation =
        await prisma.salesReconciliation.findUnique({
          where: { id },
          include: {
            salesLines: {
              where: {
                display: true,
              },
              include: {
                book: {
                  select: {
                    id: true,
                  },
                },
              },
            },
          },
        });
      if (!currentSalesReconciliation) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No sales reconcilitation to delete with id '${id}'`,
        });
      }

      for (const salesLine of currentSalesReconciliation.salesLines) {
        // const updatedSalesLine = await prisma.salesLine.update({
        //   where: { id: salesLine.id },
        //   data: {
        //     display: false,
        //   },
        // });
        const updatedSalesLine = await prisma.salesLine.delete({
          where: { id: salesLine.id },
        });
        if (!updatedSalesLine) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: `No sales line to delete with id '${salesLine.id}'`,
          });
        }
        await prisma.book.update({
          where: { id: salesLine.book.id },
          data: {
            inventoryCount: {
              increment: salesLine.quantity,
            },
          },
        });
      }

      // const updatedSalesReconciliation =
      //   await prisma.salesReconciliation.update({
      //     where: { id },
      //     data: {
      //       display: false,
      //     },
      //   });
      const updatedSalesReconciliation =
        await prisma.salesReconciliation.delete({
          where: { id },
        });

      return updatedSalesReconciliation;
    }),
});
