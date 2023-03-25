import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { env } from "../../../env/server.mjs";

const GoogleBooksDetailsSchema = z.object({
  title: z.string(),
  authors: z.string().array(),
  publishedDate: z.string(),
  description: z.string().nullable(),
  industryIdentifiers: z
    .object({
      type: z.string(),
      identifier: z.string(),
    })
    .array(),
  pageCount: z.number(),
  publisher: z.string().optional(),
  categories: z.string().array().optional(),
  imageLinks: z.object({
    smallThumbnail: z.string().optional(),
    thumbnail: z.string().optional(),
    small: z.string().optional(),
    medium: z.string().optional(),
    large: z.string().optional(),
  }),
});

const GoogleBooksItemsSchema = z.object({
  kind: z.string(),
  id: z.string(),
  etag: z.string(),
  selfLink: z.string(),
  volumeInfo: GoogleBooksDetailsSchema,
});

const GoogleBooksResponseSchema = z.object({
  kind: z.string(),
  totalItems: z.number(),
  items: GoogleBooksItemsSchema.array(),
});

type GoogleBooksDetails = z.infer<typeof GoogleBooksDetailsSchema>;
type GoogleBooksItems = z.infer<typeof GoogleBooksItemsSchema>;
type GoogleBooksResponse = z.infer<typeof GoogleBooksResponseSchema>;

export const googleBooksRouter = createTRPCRouter({
  /**
   * Fetch book details from Google Books API
   */
  retrieveByISBNs: publicProcedure
    .input(z.object({ isbns: z.string().min(10).array() }))
    .query(async ({ input }) => {
      // logger.info("Fetching book from Google Books API");
      console.log("Fetching books from Google Books API");
      console.log(input.isbns);
      const isbnDetails: GoogleBooksDetails[] = [];
      for (const isbn of input.isbns) {
        console.log(`ISBN: ${isbn}`);
        const queryURL = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${env.GOOGLE_BOOKS_API_KEY}`;
        await fetch(queryURL)
          .then((response) => response.json())
          .then((response) => {
            const googleBookResponse =
              GoogleBooksResponseSchema.safeParse(response);
            if (!googleBookResponse.success) {
              console.log(`Could not obtain book details for ISBN ${isbn}`);
              return;
            } else {
              const volumeInfo = googleBookResponse.data.items.map((item) => {
                return item.volumeInfo;
              });
              const bookDetails = volumeInfo[0];
              if (bookDetails) {
                console.log("Book Details: ");
                console.log(bookDetails);
                isbnDetails.push(bookDetails);
              }
            }
          });
      }
      return isbnDetails;
    }),

  /**
   * @deprecated
   */
  simpleRetrieveByISBN: publicProcedure
    .input(z.object({ isbn: z.string().min(10) }))
    .query(async ({ input }) => {
      // logger.info("Fetching book from Google Books API");
      console.log("Fetching book from Google Books API");
      const queryURL = `https://www.googleapis.com/books/v1/volumes?q=isbn:${input.isbn}&key=${env.GOOGLE_BOOKS_API_KEY}`;
      return fetch(queryURL)
        .then((response) => response.json())
        .then((response) => {
          const googleBookResponse = response as GoogleBooksResponse;
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

  /**
   * @deprecated
   */
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
        const retrievedBook = await request<GoogleBooksDetails>(queryURL);
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

      const BooksRunOfferSchema = z.object({
        price: z.number(),
        cart_url: z.string(),
      });
      const BooksRunOffersSchema = z.object({
        booksrun: z.object({
          new: BooksRunOfferSchema.optional(),
          used: BooksRunOfferSchema.optional(),
        }),
      });
      const BooksRunResponseSchema = z.object({
        result: z.object({
          status: z.string(),
          message: z.string(),
          offers: BooksRunOffersSchema,
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
              const bookPriceResponse =
                BooksRunResponseSchema.safeParse(response);
              if (!bookPriceResponse.success) {
                console.log("Could not parse response successfully");
                bookPrices.push(0);
                return;
              } else {
                console.log("Successfully retrieved book price from BooksRun");
                try {
                  const newPrice = BooksRunOfferSchema.parse(
                    bookPriceResponse.data.result.offers.booksrun.new
                  ).price;
                  console.log(`New price ${newPrice}`);
                  bookPrices.push(newPrice);
                } catch (error) {
                  console.log("Could not get new price");
                  bookPrices.push(0);
                }
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
