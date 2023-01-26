import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { prisma } from "../../db";
import { TRPCError } from "@trpc/server";

export const vendorsRouter = createTRPCRouter({
  add: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      const vendor = await prisma.vendor.create({
        data: input,
      });
      return vendor;
    }),

  connectToBook: publicProcedure
    .input(z.object({ vendorId: z.string(), bookId: z.string() }))
    .mutation(async ({ input }) => {
      const { vendorId, bookId } = input;
      const connectedVendor = await prisma.vendor.update({
        where: {
          id: vendorId,
        },
        data: {
          books: {
            connect: {
              id: bookId,
            },
          },
        },
      });
      return connectedVendor;
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const { id } = input;
      const vendor = await prisma.vendor.delete({
        where: { id },
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
