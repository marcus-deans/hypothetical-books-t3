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
		.mutation(async ({input}) => {
      input.password = await hash(input.password, 10);
			await prisma.user.create({data: input});
			return {
				status: 201,
				message: "Account Created Successfully"
			}
		}),
  changePassword: publicProcedure
		.input(passwordSchema)
		.mutation(async ({input}) => {
      input.password = await hash(input.password, 10);
      const user = await prisma.user.findFirst();
      if(user?.id === undefined){
        return {
          status: 404,
          message: "Account not Found"
        }
      }
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          password: input.password,
        }
      });
			return {
				status: 201,
				message: "Password Edited Successfully"
			}
		}),
  getUser: publicProcedure
    .query(async () => {
      return await prisma.user.findFirst();
    }),
  doesUserExist: publicProcedure
    .output(z.object({
      status: z.number(),
      message: z.string(),
    }))
    .query(async () =>{
      const egg = await prisma.user.findFirst();
      if (egg == undefined){
        return{
          status: 404,
          message: "No user found"
        }
      } else{
      return {
        status: 200,
        message: "User Found"
      }
      };
    })
  /*
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