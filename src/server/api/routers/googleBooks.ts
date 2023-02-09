import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { env } from "../../../env/server.mjs";
import type { JSONSchemaType } from "ajv";
import Ajv from "ajv";
import { Logger } from "tslog";

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

const detailSchema: JSONSchemaType<GoogleBookDetails> = {
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

interface GoogleBookItems {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: GoogleBookDetails;
}

const itemsSchema: JSONSchemaType<GoogleBookItems> = {
  type: "object",
  properties: {
    kind: { type: "string" },
    id: { type: "string" },
    etag: { type: "string" },
    selfLink: { type: "string" },
    volumeInfo: detailSchema,
  },
  required: ["kind", "id", "etag", "selfLink", "volumeInfo"],
  additionalProperties: false,
};

interface GoogleBookResponse {
  kind: string;
  totalItems: number;
  items: GoogleBookItems[];
}

const responseSchema: JSONSchemaType<GoogleBookResponse> = {
  type: "object",
  properties: {
    kind: { type: "string" },
    totalItems: { type: "number" },
    items: itemsSchema,
  },
  required: ["kind", "totalItems", "items"],
  additionalProperties: false,
};

const validate = ajv.compile(responseSchema);
const logger = new Logger({ name: "googleBooksRouterLogger" });

export const googleBooksRouter = createTRPCRouter({
  simpleRetrieveByISBN: publicProcedure
    .input(z.object({ isbn: z.string().min(10) }))
    .mutation(async ({ input }) => {
      logger.info("Fetching book from Google Books API");
      console.log("Fetching book from Google Books API");
      const queryURL = `https://www.googleapis.com/books/v1/volumes?q=isbn:${input.isbn}&key=${env.GOOGLE_BOOKS_API_KEY}`;
      return fetch(queryURL)
        .then((response) => response.json())
        .then((response) => {
          const googleBookResponse = response as GoogleBookResponse;
          const volumeInfo = googleBookResponse.items.map((item) => {
            return item.volumeInfo;
          });
          console.log(volumeInfo);
          return googleBookResponse;
        });

      // const retrievedBook = await fetch(queryURL);

      // console.log(retrievedBook);
      // if (!retrievedBook.ok) {
      //   throw new TRPCError({
      //     message: "Book could not be found",
      //     code: "NOT_FOUND",
      //   });
      // }
      // 9780747573630, 9781514682050
      // 9781514682050
      // const jsonified: any = await retrievedBook.json();
      // console.log(jsonified);
      // return jsonified;
    }),

  retrieveByISBN: publicProcedure
    .input(z.object({ isbn: z.string().min(10) }))
    .mutation(async ({ input }) => {
      async function request<TResponse>(
        url: string,
        config: RequestInit = {}
      ): Promise<TResponse> {
        logger.info("Fetching book from Google Books API");
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
        // if (!validate(retrievedBook)) {
        //   throw new TRPCError({
        //     message: "Book could not be found",
        //     code: "NOT_FOUND",
        //   });
        // }
        return retrievedBook;
      } catch (error) {
        logger.error("Error fetching book from Google Books API");
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
