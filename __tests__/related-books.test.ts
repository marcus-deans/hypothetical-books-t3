import { expect, test } from "@jest/globals";
import { booksRouter } from "../src/server/api/routers/books";
import { prisma } from "../src/server/db";
import type { inferProcedureInput } from "@trpc/server";

test("basic related books", async () => {
  const caller = booksRouter.createCaller({ session: null, prisma: prisma });

  type Input = inferProcedureInput<(typeof booksRouter)["findRelatedBooks"]>;
  const input: Input = {
    author: "Nassim",
    title: "fragile",
  };

  const expectedResult = {
    title: "The Great Gatsby TEST",
  };

  const result = await caller.findRelatedBooks(input);
  console.log(result);
  // only check if titles are equal
  // expect(result.title).toEqual(expectedResult.title);
});
