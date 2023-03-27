import { number, z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { prisma } from "../../db";
import { TRPCError } from "@trpc/server";
import { hash } from "bcrypt";
import { UserSchema } from "../../../../prisma/generated/zod";
import { passwordSchema } from "../../../schema/user.schema";
import { contextProps } from "@trpc/react-query/shared";

export const usersRouter = createTRPCRouter({
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

      const items = await prisma.user.findMany({
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
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;
      const user = await prisma.user.findUnique({
        where: { id },
      });
      if (!user || !user.display) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No user with id '${id}'`,
        });
      }
      return user;
    }),
  setPassword: publicProcedure
    .input(z.object({
      name: z.string(),
      password: z.string(),
    }))
    .mutation(async ({ input }) => {
      input.password = await hash(input.password, 10);
      await prisma.user.create({ data: input });
      return {
        status: 201,
        message: "Account Created Successfully",
      };
    }),
  changeUserPassword: publicProcedure
    .input(passwordSchema)
    .output(z.object({
      success: z.boolean(),
      message: z.string(),
    }))
    .mutation(async ({ input }) => {
      if (!input.user) {
        return {
          success: false,
          message: "No User Logged In"
        }
      }
      input.password = await hash(input.password, 10);
      if (input.user.id === undefined) {
        return {
          success: false,
          message: "Account not Found",
        };
      }
      await prisma.user.update({
        where: {
          id: input.user.id,
        },
        data: {
          password: input.password,
        },
      });
      return {
        success: true,
        message: "Password Changed Successfully",
      };
    }),
  getAdmin: publicProcedure.query(async () => {
    return await prisma.user.findFirst({
      where: {
        name: "admin",
      },
    });
  }),
  createAdmin: publicProcedure
    .input(z.object({
      password: z.string(),
    }))
    .mutation(async ({ input }) => {
      input.password = await hash(input.password, 10);
      await prisma.user.create({
        data: {
          name: "admin",
          password: input.password,
          role: "admin",
        }
      });
      return {
        status: 201,
        message: "Account Created Successfully",
      };
    }),
  createUser: publicProcedure
    .input(z.object({
      name: z.string(),
      password: z.string(),
      admin: z.boolean()
    }))
    .output(z.object({
      success: z.boolean(),
      message: z.string(),
    }))
    .mutation(async ({ input }) => {
      if(input.name == ""){
        return {
          success: false,
          message: "Name cannot be blank",
        }
      }
      if(input.name == "admin"){
        return {
          success: false,
          message: "User cannot have the name admin",
        }
      }
      const redundantUserName = await prisma.user.findFirst({
        where: {
          name: input.name,
          display: true,
        }
      })
      if(redundantUserName){
        return {
          success: false,
          message: "Name Belongs to Active User",
        }
      }
      input.password = await hash(input.password, 10);
      await prisma.user.create({
        data: {
          name: input.name,
          password: input.password,
          role: input.admin ? "admin" : "user",
        }
      });
      return {
        success: true,
        message: "User Created Successfully",
      };
    }),
  doesAdminExist: publicProcedure
    .output(
      z.boolean()
    )
    .query(async () => {
      const user = await prisma.user.findFirst({
        where: {
          name: "admin",
        },
      });
      return (!(user == undefined));
    }),
});
