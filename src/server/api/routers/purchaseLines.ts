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
      const purchaseLineWithBookPrimaries =
        await prisma.purchaseLine.findUnique({
          where: { id },
          include: {
            book: {
              select: {
                id: true,
                title: true,
                authors: true,
                isbn_13: true,
                inventoryCount: true,
              },
            },
          },
        });
      if (
        !purchaseLineWithBookPrimaries ||
        !purchaseLineWithBookPrimaries.display
      ) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No sales line with id '${id}'`,
        });
      }
      return purchaseLineWithBookPrimaries;
    }),

  getByIdWithRelations: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;
      const purchaseLineWithRelations = await prisma.purchaseLine.findUnique({
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
          purchaseOrder: {
            select: {
              id: true,
              date: true,
            },
          },
        },
      });
      if (!purchaseLineWithRelations || !purchaseLineWithRelations.display) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No sales line with id '${id}'`,
        });
      }
      return purchaseLineWithRelations;
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

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        bookId: z.string(),
        quantity: z.number().gt(0),
        unitWholesalePrice: z.number().gt(0),
        purchaseOrderId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const currentPurchaseLine = await prisma.purchaseLine.findUnique({
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

      const existingPurchasedCount = currentPurchaseLine?.quantity ?? 0;

      const bookInventoryCount =
        currentPurchaseLine?.book.inventoryCount ?? 100000;

      if (bookInventoryCount - existingPurchasedCount + input.quantity < 0) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: `Cannot modify purchase line of ${existingPurchasedCount} books`,
        });
      }

      const updatedPurchaseLine = await prisma.purchaseLine.update({
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
      await prisma.book.update({
        where: { id: currentPurchaseLine?.book.id },
        data: {
          inventoryCount: {
            decrement: existingPurchasedCount,
          },
        },
      });
      return updatedPurchaseLine;
    }),

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

      // Update cost most recent for this book and vendor combination
      const currentPurchaseOrder = await prisma.purchaseOrder.findUnique({
        where: {
          id: input.purchaseOrderId,
        },
      });
      const vendorId = currentPurchaseOrder?.vendorId;

      if (!vendorId) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No vendor found for purchase order with id '${input.purchaseOrderId}'`,
        });
      }
      const costMostRecentVendor = await prisma.costMostRecentVendor.upsert({
        where: {
          costMostRecentVendorId: {
            bookId: input.bookId,
            vendorId: vendorId,
          },
        },
        update: {},
        create: {
          book: {
            connect: {
              id: input.bookId,
            },
          },
          vendor: {
            connect: {
              id: vendorId,
            },
          },
          purchaseLine: {
            connect: {
              id: purchaseLine.id,
            },
          },
          purchaseOrder: {
            connect: {
              id: input.purchaseOrderId,
            },
          },
        },
      });

      const costMostRecentVendorPurchaseOrder =
        await prisma.purchaseOrder.findUnique({
          where: {
            id: costMostRecentVendor.purchaseOrderId,
          },
        });

      // Check if this is the new cost most recent
      const currentPurchaseOrderDate = currentPurchaseOrder?.date;
      const costMostRecentVendorDate =
        costMostRecentVendorPurchaseOrder?.date ?? new Date();
      if (currentPurchaseOrderDate > costMostRecentVendorDate) {
        await prisma.costMostRecentVendor.update({
          where: {
            costMostRecentVendorId: {
              bookId: input.bookId,
              vendorId: vendorId,
            },
          },
          data: {
            purchaseLine: {
              connect: {
                id: purchaseLine.id,
              },
            },
            purchaseOrder: {
              connect: {
                id: input.purchaseOrderId,
              },
            },
          },
        });
      }

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
          purchaseOrder: {
            include: {
              vendor: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });
      if (!currentPurchaseLine) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No purchase line found with id '${id}'`,
        });
      }
      const purchasedCount = currentPurchaseLine?.quantity ?? 0;
      const bookInventoryCount =
        currentPurchaseLine?.book.inventoryCount ?? 100000;
      if (bookInventoryCount < purchasedCount) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: `Cannot delete purchase order of ${purchasedCount} boks`,
        });
      }

      const currentBookId = currentPurchaseLine.bookId;
      const currentVendorId = currentPurchaseLine.purchaseOrder.vendorId;

      // Check if this purchase line was part of cost-most-recent for this book and vendor combination
      const costMostRecentVendor = await prisma.costMostRecentVendor.findUnique(
        {
          where: {
            costMostRecentVendorId: {
              bookId: currentBookId,
              vendorId: currentVendorId,
            },
          },
          include: {
            purchaseLine: {
              select: {
                id: true,
              },
            },
          },
        }
      );

      if (costMostRecentVendor?.purchaseLineId !== currentPurchaseLine.id) {
        // CMR is not affected, delete the purchase line
        const deletedPurchaseLine = await prisma.purchaseLine.delete({
          where: { id: currentPurchaseLine.id },
        });
        if (!deletedPurchaseLine) {
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
      } else {
        await prisma.costMostRecentVendor.delete({
          where: {
            costMostRecentVendorId: {
              bookId: currentBookId,
              vendorId: currentVendorId,
            },
          },
        });

        // CMR is affected, delete the purchase line and recompute
        const deletedPurchaseLine = await prisma.purchaseLine.delete({
          where: { id: currentPurchaseLine.id },
        });
        if (!deletedPurchaseLine) {
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

        // need to recompute CMR
        const mostRecentPurchaseLine = await prisma.purchaseLine.findFirst({
          where: {
            bookId: currentBookId,
            purchaseOrder: {
              vendor: {
                id: currentVendorId,
              },
            },
          },
          orderBy: {
            purchaseOrder: {
              date: "desc",
            },
          },
        });

        if (mostRecentPurchaseLine) {
          await prisma.costMostRecentVendor.create({
            data: {
              purchaseLine: {
                connect: {
                  id: mostRecentPurchaseLine.id,
                },
              },
              purchaseOrder: {
                connect: {
                  id: mostRecentPurchaseLine.purchaseOrderId,
                },
              },
              book: {
                connect: {
                  id: currentBookId,
                },
              },
              vendor: {
                connect: {
                  id: currentVendorId,
                },
              },
            },
          });
        }
      }
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
