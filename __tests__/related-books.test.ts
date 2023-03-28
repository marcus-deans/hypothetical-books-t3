import { expect, test } from "vitest";
import { booksRouter } from "../src/server/api/routers/books";
import { prisma } from "../src/server/db";
import type { inferProcedureInput } from "@trpc/server";
import { googleBooksRouter } from "../src/server/api/routers/googleBooks";

test("basic related books", async () => {
  const caller = googleBooksRouter.createCaller({
    session: null,
    prisma: prisma,
  });

  type Input = inferProcedureInput<
    (typeof googleBooksRouter)["findRelatedBooks"]
  >;
  const input: Input = {
    author: "Nassim Nicholas Taleb",
    title: "Antifragile",
  };

  const expectedResult = {
    title: "The Great Gatsby TEST",
  };

  const result = await caller.findRelatedBooks(input);
  console.log(result);
  // only check if titles are equal
  // expect(result.title).toEqual(expectedResult.title);
});
