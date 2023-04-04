import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { XMLParser } from "fast-xml-parser";
import { prisma } from "../../db";
import type { NextApiRequest } from "next";

export const BridgeBookSchema = z
  .object({
    title: z.string(),
    authors: z.string().array(),
    isbn13: z.string().length(13),
    isbn10: z.string().length(10).nullable(),
    publisher: z.string(),
    publicationYear: z.number(),
    pageCount: z.number().optional(),
    height: z.number().gte(0).nullable(),
    width: z.number().gte(0).nullable(),
    thickness: z.number().gte(0).nullable(),
    retailPrice: z.number().gte(0),
    inventoryCount: z.number().gte(0),
  })
  .nullable();
export type BridgeBook = z.infer<typeof BridgeBookSchema>;
export const BridgeResponseSchema = z
  .record(z.string(), BridgeBookSchema)
  .array();

export const bridgeRouter = createTRPCRouter({
  retrieve: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: "/bridge/retrieve",
        tags: ["bridge"],
        summary: "Retrieve sales information from system",
        contentTypes: ["application/json"],
        protect: true,
      },
    })
    .input(z.object({ isbns: z.string().length(13).array() }))
    .output(BridgeResponseSchema)
    .mutation(async ({ input }) => {
      const retrievedBooks = [];
      for (const isbn of input.isbns) {
        const book = await prisma.book.findFirst({
          where: { isbn_13: isbn },
          include: {
            authors: true,
          },
        });
        if (book) {
          retrievedBooks.push({
            [isbn]: {
              title: book.title,
              authors: book.authors.map((author) => author.name),
              isbn13: book.isbn_13,
              isbn10: book.isbn_10,
              publisher: book.publisher,
              publicationYear: book.publicationYear,
              pageCount: book.pageCount,
              height: book.height,
              width: book.width,
              thickness: book.thickness,
              retailPrice: book.retailPrice,
              inventoryCount: book.inventoryCount,
            },
          });
        } else {
          console.log("Book not found: " + isbn);
          retrievedBooks.push({ [isbn]: null });
        }
      }
      if (retrievedBooks.length === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No books found",
        });
      }
      return retrievedBooks;
    }),
});
