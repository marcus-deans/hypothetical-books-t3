import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import { prisma } from "../../db";
import { TRPCError } from "@trpc/server";

export const purchaseLinesRouter = createTRPCRouter({
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

      const items = await prisma.purchaseLine.findMany({
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
      const purchaseLine = await prisma.purchaseLine.findUnique({
        where: { id },
      });
      if (!purchaseLine || !purchaseLine.display) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No purchase line with id '${id}'`,
        });
      }
      return purchaseLine;
    }),

  getByIdWithBookPrimaries: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;
      const salesLineWithBookPrimaries = await prisma.purchaseLine.findUnique({
        where: { id },
        include: {
          book: {
            select: {
              title: true,
              authors: true,
              isbn_13: true,
            },
          },
        },
      });
      if (!salesLineWithBookPrimaries || !salesLineWithBookPrimaries.display) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No sales line with id '${id}'`,
        });
      }
      return salesLineWithBookPrimaries;
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

  add: publicProcedure
    .input(
      z.object({
        bookId: z.string(),
        quantity: z.number().gt(0),
        unitWholesalePrice: z.number().gt(0),
        purchaseOrderId: z.string(),
      })
    )

    .mutation(async ({ input }) => {
      const purchaseLine = await prisma.purchaseLine.create({
        data: {
          book: {
            connect: {
              id: input.bookId,
            },
          },
          quantity: input.quantity,
          unitWholesalePrice: input.unitWholesalePrice,
          purchaseOrder: {
            connect: {
              id: input.purchaseOrderId,
            },
          },
          display: true,
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
      return purchaseLine;
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const { id } = input;

      const currentPurchaseLine = await prisma.purchaseLine.findUnique({
        where: { id },
        include: {
          book: {
            select: {
              id: true,
              inventoryCount: true,
            },
          },
        },
      });

      const purchasedCount = currentPurchaseLine?.quantity ?? 0;

      const bookInventoryCount =
        currentPurchaseLine?.book.inventoryCount ?? 100000;

      if (bookInventoryCount < purchasedCount) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: `Cannot delete purchase order of ${purchasedCount} boks`,
        });
      }

      // const purchaseLine = await prisma.purchaseLine.delete({
      //   where: { id },
      // });
      const purchaseLine = await prisma.purchaseLine.update({
        where: { id },
        data: {
          display: false,
        },
      });
      if (!purchaseLine) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No purchase line to delete with id '${id}'`,
        });
      }

      await prisma.book.update({
        where: { id: currentPurchaseLine?.book.id },
        data: {
          inventoryCount: {
            decrement: purchasedCount,
          },
        },
      });

      return purchaseLine;
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
