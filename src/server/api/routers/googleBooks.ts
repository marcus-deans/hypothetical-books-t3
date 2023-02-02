import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { env } from "../../../env/server.mjs";
import type { JSONSchemaType } from "ajv";
import Ajv from "ajv";

const ajv = new Ajv();

interface GoogleBookDetails {
  title: string;
  authors: string[];
  publishedDate: string;
  description: string;
  industryIdentifiers: {
    type: string;
    identifier: string;
  }[];

  pageCount: number;
  categories: string[];
}

const industryIdentifiersSchema: JSONSchemaType<
  GoogleBookDetails["industryIdentifiers"]
> = {
  type: "array",
  items: {
    type: "object",
    properties: {
      type: { type: "string" },
      identifier: { type: "string" },
    },
    additionalProperties: false,
    required: ["type", "identifier"],
  },
};

const schema: JSONSchemaType<GoogleBookDetails> = {
  type: "object",
  properties: {
    title: { type: "string" },
    authors: { type: "array", items: { type: "string" } },
    publishedDate: { type: "string" },
    description: { type: "string" },
    industryIdentifiers: industryIdentifiersSchema,
    pageCount: { type: "integer" },
    categories: { type: "array", items: { type: "string" } },
  },
  required: [
    "title",
    "authors",
    "publishedDate",
    "description",
    "industryIdentifiers",
    "pageCount",
    "categories",
  ],
  additionalProperties: false,
};

const validate = ajv.compile(schema);

export const googleBooksRouter = createTRPCRouter({
  retrieveByISBN: publicProcedure
    .input(z.object({ isbn: z.string().min(10) }))
    .query(async ({ input }) => {
      async function request<TResponse>(
        url: string,
        config: RequestInit = {}
      ): Promise<TResponse> {
        const response = await fetch(url, config);
        if (!response.ok) {
          throw new TRPCError({
            message: "Error fetching book",
            code: "INTERNAL_SERVER_ERROR",
          });
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return await response.json();
      }

      try {
        const queryURL = `https://www.googleapis.com/books/v1/volumes?q=isbn:${input.isbn}&key=${env.GOOGLE_BOOKS_API_KEY}`;
        const retrievedBook = await request<GoogleBookDetails>(queryURL);
        if (!validate(retrievedBook)) {
          throw new TRPCError({
            message: "Book could not be found",
            code: "NOT_FOUND",
          });
        }
        return retrievedBook;
      } catch (error) {
        throw new TRPCError({
          message: "Book could not be found",
          code: "NOT_FOUND",
        });
      }

      // const queryURL = `https://www.googleapis.com/books/v1/volumes?q=isbn:${input.isbn}&key=${env.GOOGLE_BOOKS_API_KEY}`;
      // return await fetch(queryURL)
      //   .then((res) => res.json())
      //   .then((res) => {
      //     return res as GoogleBookDetails;
      //   });
    }),
});
