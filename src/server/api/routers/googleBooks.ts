import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { env } from "../../../env/server.mjs";
import type { JSONSchemaType } from "ajv";
import Ajv from "ajv";
import { toast } from "react-toastify";

const ajv = new Ajv();

interface GoogleBookDetails {
  title: string;
  authors: string[];
  publishedDate: string;
  description: string | null;
  industryIdentifiers: {
    type: string;
    identifier: string;
  }[];

  pageCount: number;
  publisher: string | null;
  categories: string[] | null;
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
    publisher: { type: "string" },
    categories: { type: "array", items: { type: "string" } },
  },
  required: [
    "title",
    "authors",
    "publishedDate",
    "description",
    "industryIdentifiers",
    "pageCount",
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
    items: { type: "array", items: itemsSchema },
  },
  required: ["kind", "totalItems", "items"],
  additionalProperties: false,
};

const validate = ajv.compile(responseSchema);
// const logger = new Logger({ name: "googleBooksRouterLogger" });

export const googleBooksRouter = createTRPCRouter({
  multipleRetrieveByIsbns: publicProcedure
    .input(z.object({ isbns: z.string().min(10).array() }))
    .query(async ({ input }) => {
      // logger.info("Fetching book from Google Books API");
      console.log("Fetching book from Google Books API");
      console.log(input.isbns);
      const isbnDetails: GoogleBookDetails[] = [];
      for (const isbn of input.isbns) {
        console.log(`ISBN: ${isbn}`);
        const queryURL = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${env.GOOGLE_BOOKS_API_KEY}`;
        await fetch(queryURL)
          .then((response) => response.json())
          .then((response) => {
            const googleBookResponse = response as GoogleBookResponse;
            const volumeInfo = googleBookResponse.items.map((item) => {
              return item.volumeInfo;
            });
            // console.log(`Volume Info`);
            // console.log(volumeInfo);
            const bookDetails = volumeInfo[0];
            if (bookDetails) {
              console.log("Book Details: ");
              console.log(bookDetails);
              isbnDetails.push(bookDetails);
            }
          });
      }
      return isbnDetails;
    }),

  simpleRetrieveByISBN: publicProcedure
    .input(z.object({ isbn: z.string().min(10) }))
    .query(async ({ input }) => {
      // logger.info("Fetching book from Google Books API");
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
          return volumeInfo;
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
        // logger.info("Fetching book from Google Books API");
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
        // logger.error("Error fetching book from Google Books API");
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

  retrievePricingData: publicProcedure
    .input(z.object({ isbns: z.string().min(10).array() }))
    .query(async ({ input }) => {
      console.log("Fetching price details from API");
      const bookPrices: Array<number> = [];

      const BooksRunResponseSchema = z.object({
        result: z.object({
          status: z.string(),
          message: z.string(),
          offers: z.any(),
        }),
      });
      type BooksRunResponse = z.infer<typeof BooksRunResponseSchema>;
      for (const isbn of input.isbns) {
        console.log(`Fetching price details for ${isbn}`);
        const queryURL = `https://booksrun.com/api/v3/price/buy/${isbn}?key=${env.BOOKS_RUN_API_KEY}`;
        try {
          await fetch(queryURL)
            .then((response) => response.json())
            .then((response) => {
              console.log(response);
              if (BooksRunResponseSchema.safeParse(response).success) {
                console.log("successfully parsed response");
                const bookPriceResponse = response as BooksRunResponse;
                type bookPriceDetails = {
                  booksrun: {
                    new: {
                      price: number;
                    };
                  };
                };
                const bookPriceResponseDetails = bookPriceResponse.result
                  .offers as bookPriceDetails;
                bookPrices.push(bookPriceResponseDetails.booksrun.new.price);
              } else {
                console.log("Error retrieving book price from BooksRun");
                bookPrices.push(0);
              }
            });
        } catch (error) {
          console.log("Error retrieving book price from BooksRun");
          bookPrices.push(0);
          console.log(error);
        }
      }
      console.log(bookPrices);
      return bookPrices;
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
