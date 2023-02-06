import { booksRouter } from "../src/server/api/routers/books";
import { expect, jest, test} from '@jest/globals';
import { prisma } from "../src/server/db";
import type { inferProcedureInput } from "@trpc/server";


test("add a book", async () => {
    const caller = booksRouter.createCaller({ session: null, prisma: prisma });
  
    type Input = inferProcedureInput<typeof booksRouter["add"]>;
    const input: Input = {
        title: "The Great Gatsby TEST",
        authors: ["F. Scott Fitzgerald"],
        isbn_13: "9780743273565",
        isbn_10: null,
        publisher: "Simon & Schuster",
        publicationYear: 2004,
        pageCount: 180,
        width: 5.25,
        height: 8.25,
        thickness: 0.75,
        retailPrice: 14.99,
        genreId: "Fiction",
        inventoryCount: 10,
        purchaseLines: ["test"],
        saleReconciliationLines: ["test"],
    };
  
    const expectedResult = {
      title: "The Great Gatsby TEST",
    };

    const result = await caller.add(input);
    // only check if titles are equal
    expect(result.title).toEqual(expectedResult.title);
});