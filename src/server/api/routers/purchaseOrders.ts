import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
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

  byId: publicProcedure
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
      })
    )

    //TODO: add proper purchase line implementation
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
