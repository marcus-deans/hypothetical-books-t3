import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
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
        where: {},
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

  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;
      const salesLine = await prisma.salesLine.findUnique({
        where: { id },
      });
      if (!salesLine) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No sales line with id '${id}'`,
        });
      }
      return salesLine;
    }),

  // model SalesReconciliation{
  //   id 				String @id @default(cuid())
  //   date			DateTime
  //   saleLines SaleLine[]
  // }
  //
  // model SaleLine{
  //   id 				String @id @default(cuid())
  //   book 			Book @relation(fields: [bookId], references: [id])
  //   bookId 		String
  //   quantity 	Int
  //   unitWholesalePrice Float
  //   salesReconciliation		SalesReconciliation @relation(fields: [salesReconciliationId], references: [id])
  //   salesReconciliationId	String
  // }

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
        },
      });

      return salesLine;
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const { id } = input;
      const salesLine = await prisma.salesLine.delete({
        where: { id },
      });
      if (!salesLine) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No sales line to delete with id '${id}'`,
        });
      }
      return salesLine;
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
