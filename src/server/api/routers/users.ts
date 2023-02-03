import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { prisma } from "../../db";
import { TRPCError } from "@trpc/server";
import { hash, verify } from "argon2";
import { UserSchema } from "../../../../prisma/generated/zod";
import { passwordSchema } from "../../../schema/user.schema";
import { contextProps } from "@trpc/react-query/shared";

export const usersRouter = createTRPCRouter({
	setPassword: publicProcedure
		.input(passwordSchema)
		.mutation(async ({input}) => {
			const newPassword  = input.password;
			const password = await hash(newPassword);
			prisma.user.create({data: {password}});
			return {
				status: 201,
				message: "Account Created Successfully"
			}
		}),

	login: publicProcedure
		.input(passwordSchema)
		.query(async ({ input }) => {
			const { password } = input;
      const allUser = await prisma.user.findFirst();
			if (!allUser) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: `User was never registered`,
				});
			}


      const correctPassword = verify(allUser.password, password)
      if (!correctPassword) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: `Incorrect Password`,
				});
			}

        return allUser;
	    }),


  /*
  byId: publicProcedure
    .input(z.object({ id: z.string }))
  input: UserSchema,
  resolve: async ({ input, ctx }) => {
    const { password : string} = input;
    const exists = await ctx.prisma.user.findFirst({
      where: { email },
    });
    if (exists) {
      throw new trpc.TRPCError({
        code: "CONFLICT",
        message: "User already exists.",
      });
    }
    const hashedPassword = await hash(password);
    const result = await ctx.prisma.user.create({
      data: { username, email, password: hashedPassword },
    });
    return {
      status: 201,
      message: "Account created successfully",
      result: result.email,
    };
		*/
});