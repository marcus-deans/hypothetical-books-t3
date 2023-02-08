import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { prisma } from "../../db";
import { TRPCError } from "@trpc/server";

export const vendorsRouter = createTRPCRouter({
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

      const items = await prisma.vendor.findMany({
        // get an extra item at the end which we'll use as next cursor
        take: limit + 1,
        where: { display: true },
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
        orderBy: {
          name: "desc",
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

  add: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      const vendor = await prisma.vendor.create({
        data: {
          name: input.name,
          display: true,
        },
      });
      return vendor;
    }),

  connectToPurchaseOrder: publicProcedure
    .input(z.object({ vendorId: z.string(), purchaseOrderId: z.string() }))
    .mutation(async ({ input }) => {
      const { vendorId, purchaseOrderId } = input;
      const connectedVendor = await prisma.vendor.update({
        where: {
          id: vendorId,
        },
        data: {
          purchaseOrder: {
            connect: {
              id: purchaseOrderId,
            },
          },
        },
      });
      return connectedVendor;
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;
      const vendor = await prisma.vendor.findUnique({
        where: { id },
      });
      if (!vendor) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No vendor with id '${id}'`,
        });
      }
      return vendor;
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const { id } = input;
      // const vendor = await prisma.vendor.delete({
      //   where: { id },
      // });
      const currentVendor = await prisma.vendor.findUnique({
        where: { id },
        include: {
          purchaseOrder: true,
        },
      });
      if ((currentVendor?.purchaseOrder.length ?? 1) > 0) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: `Vendor '${
            currentVendor?.name ?? ""
          }' has purchase orders associated with it. Please delete those purchase orders first.`,
        });
      }

      const vendor = await prisma.vendor.update({
        where: { id },
        data: {
          display: false,
        },
      });
      if (!vendor) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No vendor to delete with id '${id}'`,
        });
      }
      return vendor;
    }),
});
