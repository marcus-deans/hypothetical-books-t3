/**
 * Integration test example for the `post` router
 */
import type { inferProcedureInput } from "@trpc/server";
import type { AppRouter } from "../src/server/api/root";
import { appRouter } from "../src/server/api/root";
// import { createInnerTRPCContext } from "../src/server/api/trpc";
import { expect, test } from "vitest";
import { prisma } from "../src/server/db";
/**
 * interface GoogleBookDetails {
 *   title: string;
 *   authors: string[];
 *   publishedDate: string;
 *   description: string;
 *   industryIdentifiers: {
 *     type: string;
 *     identifier: string;
 *   };
 *   pageCount: number;
 *   categories: string[];
 * }
 */
test("get book from google API", async () => {
  // const ctx = createInnerTRPCContext({ session: null });
  // const caller = appRouter.createCaller(ctx);
  const caller = appRouter.createCaller({ session: null, prisma: prisma });

  type Input = inferProcedureInput<AppRouter["googleBooks"]["retrieveByISBN"]>;
  const input: Input = {
    isbn: "9780520266124",
  };

  const retrievedBook = await caller.googleBooks.retrieveByISBN(input);

  const desiredBook = {
    title: "The Adventures of Tom Sawyer",
    authors: ["Mark Twain"],
    publishedDate: "2010",
    description:
      "The adventures and pranks of a mischievous boy growing up in a Mississippi River town in the nineteenth-century.",
    industryIdentifiers: [
      {
        type: "ISBN_10",
        identifier: "0520266129",
      },
      {
        type: "ISBN_13",
        identifier: "9780520266124",
      },
    ],
    pageCount: 274,
    categories: ["Fiction"],
  };

  expect(retrievedBook).toMatchObject(desiredBook);
});
