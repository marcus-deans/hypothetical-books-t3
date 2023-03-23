import { number, z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { prisma } from "../../db";
import { TRPCError } from "@trpc/server";
import { hash } from "bcrypt";
import { UserSchema } from "../../../../prisma/generated/zod";
import { passwordSchema } from "../../../schema/user.schema";
import { contextProps } from "@trpc/react-query/shared";

export const usersRouter = createTRPCRouter({
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
    .input(passwordSchema)
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
      if(!input.user){
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
