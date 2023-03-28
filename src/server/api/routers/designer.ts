import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { prisma } from "../../db";
import { TRPCError } from "@trpc/server";

export const designerRouter = createTRPCRouter({
  getAllCases: publicProcedure
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

      const items = await prisma.case.findMany({
        // get an extra item at the end which we'll use as next cursor
        include: {
          shelves: true,
          creator: true,
          editor: true,
        },
        take: limit + 1,
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
        orderBy: {
          editedAt: "asc",
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
      const caseDesign = await prisma.case.findUnique({
        where: { id },
      });
      if (!caseDesign) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No genre with id '${id}'`,
        });
      }
      return caseDesign;
    }),

  add: publicProcedure
    .input(
      z.object({
        name: z.string(),
        creatorId: z.string(),
        width: z.number.gt(0),
        shelfCount: z.number.gt(0),
        shelvesIds: z.string().array(),
      })
    )
    .mutation(async ({ input }) => {
      const newCase = await prisma.case.create({
        data: {
          name: input.name,
          creator: {
            connect: {
              id: input.creatorId,
            },
          },
          editor: {
            connect: {
              id: input.creatorId,
            },
          },
          width: input.width,
          shelfCount: input.shelfCount,
          shelves: {
            connect: input.shelvesIds.map((id) => ({ id })),
          },
        },
      });
      return newCase;
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const { id } = input;
      const deletedCase = await prisma.case.delete({
        where: { id },
      });
      if (!deletedCase) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No case to delete with id '${id}'`,
        });
      }
      return deletedCase;
    }),
});
