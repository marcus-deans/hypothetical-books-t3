import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { env } from "../../../env/server.mjs";
import { prisma } from "../../db";
import Fuse from "fuse.js";
import type { Book } from "@prisma/client";
import {
  BridgeBookSchema,
  BridgeResponseSchema,
  convertBridgeBookToBook,
} from "./bridge";

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

export const fetchWithTimeout = async (
  resource: RequestInfo,
  options: RequestInit = {},
  timeout = 7000
) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(resource, {
    ...options,
    signal: controller.signal,
  });
  clearTimeout(id);

  return response;
};
const getGoogleBooksDetails = async (
  isbn: string
): Promise<GoogleBooksDetails | null> => {
  const queryURL = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${env.GOOGLE_BOOKS_API_KEY}`;
  console.log("Starting the Google Books call");
  return await fetchWithTimeout(queryURL)
    .then((response) => response.json())
    .then((response) => {
      console.log("Obtained below response from Google Books API");
      console.log(response);
      const googleBookResponse = GoogleBooksResponseSchema.safeParse(response);
      if (!googleBookResponse.success) {
        console.error(response);
        console.error(`Could not obtain book details for ISBN ${isbn}`);
        return null;
      } else {
        const volumeInfo = googleBookResponse.data.items.map((item) => {
          return item.volumeInfo;
        });
        const bookDetails = volumeInfo[0];
        if (bookDetails) {
          console.log("Book Details: ");
          console.log(bookDetails);
          return bookDetails;
        }
      }
      return null;
    });
};

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
const getBooksRunPrices = async (isbn: string): Promise<number> => {
  console.log(`Fetching price details for ${isbn}`);
  const queryURL = `https://booksrun.com/api/v3/price/buy/${isbn}?key=${env.BOOKS_RUN_API_KEY}`;
  try {
    return await fetchWithTimeout(queryURL)
      .then((response) => response.json())
      .then((response) => {
        const bookPriceResponse = BooksRunResponseSchema.safeParse(response);
        if (!bookPriceResponse.success) {
          console.log(response);
          console.log("Could not parse response successfully");
          return 0;
        } else {
          console.log("Successfully retrieved book price from BooksRun");
          try {
            const newPrice = BooksRunOfferSchema.parse(
              bookPriceResponse.data.result.offers.booksrun.new
            ).price;
            console.log(`New price ${newPrice}`);
            return newPrice;
          } catch (error) {
            console.log("Could not get new price");
            return 0;
          }
        }
      });
  } catch (error) {
    console.log("Error retrieving book price from BooksRun");
    console.log(error);
    return 0;
  }
};

type bookWithAuthorsType = Book & { authors: { name: string }[] };

const getRelatedBooks = async (book: GoogleBooksDetails) => {
  console.log("Beginning related books search");
  const allBooks = await prisma.book.findMany({
    where: { display: true },
    include: {
      authors: {
        select: {
          name: true,
        },
      },
    },
  });
  if (!allBooks) {
    return [];
  }
  type allBooksType = (typeof allBooks)[number];
  type returnBookType = {
    item: allBooksType;
    score: number;
    refIndex: number;
  };

  const options = {
    includeScore: true,
    ignoreLocation: true,
    keys: [
      {
        name: "title",
        weight: 0.7,
        getFn: (book: allBooksType) => book.title,
      },
      {
        name: "authors",
        weight: 0.3,
        getFn: (book: allBooksType) =>
          book.authors.map((author) => author.name).join(","),
      },
    ],
  };

  const fuse = new Fuse(allBooks, options);
  const searchResults = fuse.search({
    title: book.title,
    authors: book.authors.join(", "),
  });
  console.log("Related book search results");
  console.log(searchResults);
  const returnableSearchResult = searchResults as returnBookType[];
  console.log("Related book search results: ");
  console.log(returnableSearchResult);
  return returnableSearchResult.map((result) => result.item);
};

const getRemoteBookDetails = async (isbn: string) => {
  try {
    return await fetchWithTimeout(env.SUBSIDIARY_RETRIEVE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isbns: [isbn] }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log("Obtained response from subsidiary");
        const remoteBookResponse = BridgeResponseSchema.safeParse(response);
        if (!remoteBookResponse.success) {
          console.error(remoteBookResponse);
          console.error(
            `Could not obtain remote book details for ISBN ${isbn}`
          );
          return null;
        } else {
          const remoteBookDetails = BridgeBookSchema.safeParse(
            remoteBookResponse.data[isbn]
          );
          if (!remoteBookDetails.success) {
            console.error(`Could not parse remote book details`);
            return null;
          }
          return convertBridgeBookToBook(remoteBookDetails.data);
        }
      });
  } catch (err) {
    console.log("Error retrieving book details from subsidiary");
    console.log(err);
    return null;
  }
};

interface AllBookDetails {
  googleBookDetails: GoogleBooksDetails;
  remoteBookDetails: ReturnType<typeof convertBridgeBookToBook>;
  booksRunPrice: number;
  relatedBooks: bookWithAuthorsType[];
}

export const googleBooksRouter = createTRPCRouter({
  /**
   * Fetch book details from Google Books API
   */
  retrieveDetailsByISBNs: publicProcedure
    .input(z.object({ isbns: z.string().min(10).array() }))
    .query(async ({ input }) => {
      // logger.info("Fetching book from Google Books API");
      console.log("Fetching all details for books");
      console.log(input.isbns);

      const allBookDetails: AllBookDetails[] = [];
      for (const isbn of input.isbns) {
        console.log(`ISBN: ${isbn}`);
        const bookPrice = await getBooksRunPrices(isbn);
        let relatedBooks: bookWithAuthorsType[] = [];
        const bookDetails = await getGoogleBooksDetails(isbn);
        if (!bookDetails) {
          console.log("Could not get book details, skipping this book");
          continue;
        }
        relatedBooks = await getRelatedBooks(bookDetails);
        const remoteBookDetails = await getRemoteBookDetails(isbn);
        const retrievedBookDetails = {
          googleBookDetails: bookDetails,
          remoteBookDetails: remoteBookDetails,
          booksRunPrice: bookPrice,
          relatedBooks: relatedBooks,
        } as AllBookDetails;
        console.log("Retrieved book details: ");
        console.log(retrievedBookDetails);
        allBookDetails.push(retrievedBookDetails);
      }
      // console.log("All book details: ");
      // console.log(allBookDetails);
      return allBookDetails;
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

  findRelatedBooks: publicProcedure
    .input(
      z.object({
        title: z.string(),
        author: z.string(),
      })
    )
    .query(async ({ input }) => {
      const allBooks = await prisma.book.findMany({
        where: { display: true },
        include: {
          authors: {
            select: {
              name: true,
            },
          },
        },
      });
      type allBooksType = (typeof allBooks)[number];
      type returnBookType = {
        item: allBooksType;
        score: number;
        refIndex: number;
      };

      const options = {
        includeScore: true,
        ignoreLocation: true,
        keys: [
          {
            name: "title",
            weight: 0.7,
            getFn: (book: allBooksType) => book.title,
          },
          {
            name: "authors",
            weight: 0.3,
            getFn: (book: allBooksType) =>
              book.authors.map((author) => author.name).join(","),
          },
        ],
      };

      const fuse = new Fuse(allBooks, options);
      const searchResults = fuse.search({
        title: input.title,
        authors: input.author,
      });
      const returnableSearchResult = searchResults as returnBookType[];
      // console.log(
      //   returnableSearchResult.map((result) =>
      //     result.item.authors.map((author) => author.name).join(", ")
      //   )
      // );
      console.log("Related book search results: ");
      console.log(returnableSearchResult);
      return returnableSearchResult;
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
