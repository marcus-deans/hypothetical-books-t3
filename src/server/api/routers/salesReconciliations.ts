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
        items: items.reverse(),
        nextCursor,
      };
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;
      const salesReconciliation = await prisma.salesReconciliation.findUnique({
        where: { id ,
      });
      if (!salesReconciliation) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No sales reconciliation with id '${id}',
        });
      }
      return salesReconciliation;
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
              select: {
                id: tru,
              ,
            ,
          ,
        });
      if (!salesReconciliationWithSalesLineIds) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No sales reconciliation with id '${id}',
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
              include: {
                book: {
                  select: {
                    title: tru,
                  ,
                ,
              ,
            ,
          ,
        });
      if (!salesReconciliationWithSalesLineAndBookTitle) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No sales reconciliation with id '${id}',
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
        date: z.date(),
        vendorId: z.string(),
        salesLines: z.array(z.string()),
      })
    )

    .mutation(async ({ input }) => {
      const salesReconciliation = await prisma.salesReconciliation.create({
        data: {
          date: input.date,
          salesLines: {
            create: [],
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
      const salesReconciliation = await prisma.salesReconciliation.delete({
        where: { id },
      });
      if (!salesReconciliation) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No sales reconcilitation to delete with id '${id}'`,
        });
      }
      return salesReconciliation;
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
