import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { prisma } from "../../db";
import { TRPCError } from "@trpc/server";

export const purchaseOrdersRouter = createTRPCRouter({
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

      const items = await prisma.purchaseOrder.findMany({
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

      const items = await prisma.purchaseOrder.findMany({
        // get an extra item at the end which we'll use as next cursor
        take: limit + 1,
        where: { display: true },
        include: {
          purchaseLines: {
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

      const purchaseOrderWithOverallMetrics = [];
      for (const purchaseOrder of items.reverse()) {
        let totalPrice = 0;
        let totalQuantity = 0;
        const seenBooks = new Set<string>();
        for (const purchaseLine of purchaseOrder.purchaseLines) {
          totalPrice += purchaseLine.quantity * purchaseLine.unitWholesalePrice;
          totalQuantity += purchaseLine.quantity;
          seenBooks.add(purchaseLine.book.isbn_13);
        }
        purchaseOrderWithOverallMetrics.push({
          purchaseOrder,
          totalPrice,
          totalQuantity,
          totalUniqueBooks: seenBooks.size,
        });
      }

      return {
        items: purchaseOrderWithOverallMetrics,
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

      const items = await prisma.purchaseOrder.findMany({
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
          purchaseLines: {
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

      const purchaseOrderWithOverallMetrics = [];
      for (const purchaseOrder of items.reverse()) {
        let totalPrice = 0;
        let totalQuantity = 0;
        const seenBooks = new Set<string>();
        for (const purchaseLine of purchaseOrder.purchaseLines) {
          totalPrice += purchaseLine.quantity * purchaseLine.unitWholesalePrice;
          totalQuantity += purchaseLine.quantity;
          seenBooks.add(purchaseLine.book.isbn_13);
        }
        purchaseOrderWithOverallMetrics.push({
          purchaseOrder,
          totalPrice,
          totalQuantity,
          totalUniqueBooks: seenBooks.size,
        });
      }

      return {
        items: purchaseOrderWithOverallMetrics,
        nextCursor,
      };
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;
      const purchaseOrder = await prisma.purchaseOrder.findUnique({
        where: { id },
      });
      if (!purchaseOrder || !purchaseOrder.display) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No purchase order with id '${id}'`,
        });
      }
      return purchaseOrder;
    }),

  getByIdWithOverallMetrics: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;
      const purchaseOrderWithOverallMetrics =
        await prisma.purchaseOrder.findUnique({
          where: { id },
          include: {
            purchaseLines: {
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
        !purchaseOrderWithOverallMetrics ||
        !purchaseOrderWithOverallMetrics.display
      ) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No sales reconciliation with id '${id}'`,
        });
      }
      let totalPrice = 0;
      let totalQuantity = 0;
      const seenBooks = new Set<string>();
      for (const purchaseLine of purchaseOrderWithOverallMetrics.purchaseLines) {
        totalPrice += purchaseLine.quantity * purchaseLine.unitWholesalePrice;
        totalQuantity += purchaseLine.quantity;
        seenBooks.add(purchaseLine.book.isbn_13);
      }
      return {
        purchaseOrderWithOverallMetrics: purchaseOrderWithOverallMetrics,
        totalPrice,
        totalQuantity,
        totalUniqueBooks: seenBooks.size,
      };
    }),

  /**
   * model Vendor {
   * 	id				String @id @default(cuid())
   * 	name			String
   * 	purchaseOrder PurchaseOrder[]
   * }
   *
   * model PurchaseOrder{
   * 	id				String @id @default(cuid())
   * 	date			DateTime
   * 	vendor		Vendor @relation(fields: [vendorId], references: [lineId])
   * 	vendorId	String
   * 	purchaseLines PurchaseLine[]
   * }
   *
   * model PurchaseLine{
   * 	id 				String @id @default(cuid())
   * 	book 			Book @relation(fields: [bookId], references: [lineId])
   * 	bookId 		String
   * 	quantity 	Int
   * 	unitWholesalePrice Float
   * 	purchaseOrder		PurchaseOrder @relation(fields: [purchaseOrderId], references: [lineId])
   * 	purchaseOrderId	String
   * }
   */

  edit: publicProcedure
    .input(
      z.object({
        id: z.string(),
        date: z.date(),
        vendorId: z.string(),
        purchaseLines: z.array(z.string()),
      })
    )

    .mutation(async ({ input }) => {
      const currentPurchaseOrder = await prisma.purchaseOrder.findFirst({
        where: {
          id: input.id,
        },
      });

      const editedPurchaseOrder = await prisma.purchaseOrder.update({
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

      const currentDate = currentPurchaseOrder?.date ?? new Date();
      const newDate = input.date;
      if (newDate < currentDate) {
        const outdatedCostMostRecentVendors =
          await prisma.costMostRecentVendor.findMany({
            where: {
              purchaseOrder: {
                id: input.id,
              },
            },
          });

        for (const outdatedCostMostRecentVendor of outdatedCostMostRecentVendors) {
          const mostRecentPurchaseOrder = await prisma.purchaseOrder.findFirst({
            where: {
              purchaseLines: {
                some: {
                  book: {
                    id: outdatedCostMostRecentVendor.bookId,
                  },
                },
              },
              vendor: {
                id: outdatedCostMostRecentVendor.vendorId,
              },
            },
            include: {
              purchaseLines: {
                where: {
                  book: {
                    id: outdatedCostMostRecentVendor.bookId,
                  },
                },
                select: {
                  id: true,
                },
              },
            },
            orderBy: {
              date: "desc",
            },
          });

          const updatedCostMostRecentVendor =
            await prisma.costMostRecentVendor.update({
              where: {
                id: outdatedCostMostRecentVendor.id,
              },
              data: {
                purchaseOrder: {
                  connect: {
                    id: mostRecentPurchaseOrder?.id,
                  },
                },
                vendor: {
                  connect: {
                    id: mostRecentPurchaseOrder?.vendorId,
                  },
                },
                purchaseLine: {
                  connect: {
                    id:
                      mostRecentPurchaseOrder?.purchaseLines[0]?.id ??
                      undefined,
                  },
                },
              },
            });
        }
      }

      return editedPurchaseOrder;
    }),

  add: publicProcedure
    .input(
      z.object({
        date: z.date(),
        vendorId: z.string(),
        purchaseLines: z.array(z.string()),
      })
    )

    .mutation(async ({ input }) => {
      const purchaseOrder = await prisma.purchaseOrder.create({
        data: {
          date: input.date,
          vendor: {
            connect: {
              id: input.vendorId,
            },
          },
          purchaseLines: {
            create: [],
          },
          display: true,
        },
      });

      for (const purchaseLineId of input.purchaseLines) {
        await prisma.purchaseLine.update({
          where: { id: purchaseLineId },
          data: {
            purchaseOrder: {
              connect: {
                id: purchaseOrder.id,
              },
            },
          },
        });
      }

      return purchaseOrder;
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const { id } = input;

      const currentPurchaseOrder = await prisma.purchaseOrder.findUnique({
        where: { id },
        include: {
          purchaseLines: {
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

      for (const purchaseLine of currentPurchaseOrder?.purchaseLines ?? []) {
        const purchasedCount = purchaseLine?.quantity ?? 0;
        const bookInventoryCount = purchaseLine?.book.inventoryCount ?? 100000;
        if (bookInventoryCount < purchasedCount) {
          throw new TRPCError({
            code: "PRECONDITION_FAILED",
            message: `Cannot delete purchase order of ${purchasedCount} boks`,
          });
        }
        const deletedPurchaseLine = await prisma.purchaseLine.update({
          where: { id: purchaseLine.id },
          data: {
            display: false,
          },
        });
        if (!deletedPurchaseLine) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: `No purchase line to delete with id '${id}'`,
          });
        }
        await prisma.book.update({
          where: { id: purchaseLine?.book.id },
          data: {
            inventoryCount: {
              decrement: purchasedCount,
            },
          },
        });
      }

      const purchaseOrder = await prisma.purchaseOrder.update({
        where: { id },
        data: {
          display: false,
        },
      });
      if (!purchaseOrder) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No purchase order to delete with id '${id}'`,
        });
      }
      return purchaseOrder;
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
