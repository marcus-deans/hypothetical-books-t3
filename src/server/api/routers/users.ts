import { number, z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { prisma } from "../../db";
import { TRPCError } from "@trpc/server";
import { hash } from "bcrypt";
import { UserSchema } from "../../../../prisma/generated/zod";
import { passwordSchema } from "../../../schema/user.schema";
import { contextProps } from "@trpc/react-query/shared";

export const usersRouter = createTRPCRouter({
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
  changePassword: publicProcedure
    .input(passwordSchema)
    .mutation(async ({ input }) => {
      input.password = await hash(input.password, 10);
      const user = await prisma.user.findFirst({
        where: {
          name: input.name,
        },
      });
      if (user?.id === undefined) {
        return {
          status: 404,
          message: "Account not Found",
        };
      }
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          password: input.password,
        },
      });
      return {
        status: 201,
        message: "Password Edited Successfully",
      };
    }),
  getByName: publicProcedure
    .input(passwordSchema)
    .query(async ({ input }) => {
      const user = await prisma.user.findFirst({
        where: {
          name: input.name,
        },
      });
      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No genre with name '${input.name}'`,
        });
      }
      return user;
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
    .input(z.object({ name: z.string() }))
    .query(async () => {
      const user = await prisma.user.findFirst({
        where: {
          name: "admin",
        },
      });
      return (!(user == undefined));
    }),
});
