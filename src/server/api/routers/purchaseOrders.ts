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
        where: {},
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
        item: items.reverse(),
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
        where: {},
        include: {
          purchaseLines: {
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

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;
      const purchaseOrder = await prisma.purchaseOrder.findUnique({
        where: { id },
      });
      if (!purchaseOrder) {
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
        });
      if (!purchaseOrderWithOverallMetrics) {
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
   * 	vendor		Vendor @relation(fields: [vendorId], references: [id])
   * 	vendorId	String
   * 	purchaseLines PurchaseLine[]
   * }
   *
   * model PurchaseLine{
   * 	id 				String @id @default(cuid())
   * 	book 			Book @relation(fields: [bookId], references: [id])
   * 	bookId 		String
   * 	quantity 	Int
   * 	unitWholesalePrice Float
   * 	purchaseOrder		PurchaseOrder @relation(fields: [purchaseOrderId], references: [id])
   * 	purchaseOrderId	String
   * }
   */

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
      const purchaseOrder = await prisma.purchaseOrder.delete({
        where: { id },
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
