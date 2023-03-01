import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { prisma } from "../../db";
import { TRPCError } from "@trpc/server";

export const salesLinesRouter = createTRPCRouter({
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

      const items = await prisma.salesLine.findMany({
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
        items: items.reverse(),
        nextCursor,
      };
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;
      const salesLine = await prisma.salesLine.findUnique({
        where: { id },
      });
      if (!salesLine || !salesLine.display) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No sales line with id '${id}'`,
        });
      }
      return salesLine;
    }),

  getByIdWithBookPrimaries: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;
      const salesLineWithBookPrimaries = await prisma.salesLine.findUnique({
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
      if (!salesLineWithBookPrimaries || !salesLineWithBookPrimaries.display) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No sales line with id '${id}'`,
        });
      }
      return salesLineWithBookPrimaries;
    }),

  getByIdWithRelations: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;
      const purchaseLineWithRelations = await prisma.salesLine.findUnique({
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
          salesReconciliation: {
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
        bookId: z.string(),
        quantity: z.number().gt(0),
        unitWholesalePrice: z.number().gt(0),
        salesReconciliationId: z.string(),
      })
    )

    .mutation(async ({ input }) => {
      const currentSalesLine = await prisma.salesLine.findUnique({
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
          message: `Not enough inventory for sale of ${input.quantity} books with id '${input.bookId}'`,
        });
      }

      const updatedSalesLine = await prisma.salesLine.update({
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
          salesReconciliation: {
            connect: {
              id: input.salesReconciliationId,
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
        where: { id: currentSalesLine?.book.id },
        data: {
          inventoryCount: {
            increment: currentSalesLine?.quantity,
          },
        },
      });

      return updatedSalesLine;
    }),

  add: publicProcedure
    .input(
      z.object({
        bookId: z.string(),
        quantity: z.number().gt(0),
        unitWholesalePrice: z.number().gt(0),
        salesReconciliationId: z.string(),
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
          message: `Not enough inventory for sale of ${input.quantity} books with id '${input.bookId}'`,
        });
      }

      const salesLine = await prisma.salesLine.create({
        data: {
          book: {
            connect: {
              id: input.bookId,
            },
          },
          quantity: input.quantity,
          unitWholesalePrice: input.unitWholesalePrice,
          salesReconciliation: {
            connect: {
              id: input.salesReconciliationId,
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
      return salesLine;
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const { id } = input;

      const currentSalesLine = await prisma.salesLine.findUnique({
        where: { id },
        include: {
          book: {
            select: {
              id: true,
            },
          },
        },
      });

      // const salesLine = await prisma.salesLine.delete({
      //   where: { id },
      // });
      const updatedSalesLine = await prisma.salesLine.update({
        where: { id },
        data: {
          display: false,
        },
      });
      if (!updatedSalesLine) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No sales line to delete withid '${id}'`,
        });
      }
      if (currentSalesLine !== null) {
        await prisma.book.update({
          where: { id: currentSalesLine.book.id },
          data: {
            inventoryCount: {
              increment: currentSalesLine.quantity,
            },
          },
        });
      }

      return updatedSalesLine;
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
