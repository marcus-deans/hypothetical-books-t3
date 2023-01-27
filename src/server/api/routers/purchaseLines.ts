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
      const purchaseLine = await prisma.purchaseLine.findUnique({
        where: { id },
      });
      if (!purchaseLine) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No purchase line with id '${id}'`,
        });
      }
      return purchaseLine;
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
        bookId: z.string(),
        quantity: z.number().gt(0),
        unitWholesalePrice: z.number().gt(0),
        purchaseOrderId: z.string(),
      })
    )

    //TODO: add proper purchase line implementation
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
        },
      });

      return purchaseLine;
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const { id } = input;
      const purchaseLine = await prisma.purchaseLine.delete({
        where: { id },
      });
      if (!purchaseLine) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No purchase line to delete with id '${id}'`,
        });
      }
      return purchaseLine;
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
