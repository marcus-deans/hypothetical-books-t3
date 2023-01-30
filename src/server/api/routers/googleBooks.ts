import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { env } from "../../../env/server.mjs";

interface GoogleBookDetails {
  title: string;
}
export const googleBooksRouter = createTRPCRouter({
  retrieveByISBN: publicProcedure
    .input(z.object({ isbn: z.string().min(10) }))
    .query(async ({ input }) => {
      const queryURL = `https://www.googleapis.com/books/v1/volumes?q=isbn:${input.isbn}&key=${env.GOOGLE_BOOKS_API_KEY}`;
      return await fetch(queryURL)
        .then((res) => res.json())
        .then((res) => {
          return res as GoogleBookDetails;
        });
    }),
});
