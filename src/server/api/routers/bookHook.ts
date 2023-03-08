import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { XMLParser } from "fast-xml-parser";

export const bookHookRouter = createTRPCRouter({
  upload: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: "/bookhook/upload",
        tags: ["bookhook"],
        summary: "Add new sales data to system",
      },
    })
    // .input(
    //   z.object({
    //     email: z.string().email(),
    //     passcode: z.preprocess(
    //       (arg) => (typeof arg === "string" ? parseInt(arg) : arg),
    //       z.number().min(1000).max(9999)
    //     ),
    //     name: z.string().min(3),
    //   })
    // )
    .input(z.string())
    .output(
      z.object({
        user: z.object({
          id: z.string().uuid(),
          email: z.string().email(),
          name: z.string().min(3),
        }),
      })
    )
    .mutation(({ input }) => {
      const options = {
        ignoreAttributes: false,
      };

      const parser = new XMLParser(options);
      const jsonObj = parser.parse(input);

      const BookHookSchema = z.object({
        sale:
          item: z.array({
            isbn: z.string(),
            qty: z.number().gt(0),
             price: z.number().gt(0),
      })
        ),
      });

      let user = database.users.find((_user) => _user.email === input.email);

      if (user) {
        throw new TRPCError({
          message: "User with email already exists",
          code: "UNAUTHORIZED",
        });
      }

      user = {
        id: uuid(),
        email: input.email,
        passcode: input.passcode,
        name: input.name,
      };

      database.users.push(user);

      return { user: { id: user.id, email: user.email, name: user.name } };
    }),
});
