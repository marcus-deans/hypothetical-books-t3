import { expect, test } from "vitest";
import { prisma } from "../src/server/db";
import type { inferProcedureInput } from "@trpc/server";
import { booksRouter } from "../src/server/api/routers/books";

/*
A Remainder of One: 9780547349961
Hary Potter & Chamber of Secrets: 9781781100226
Antifragile: 9780812979688
Suicide of the West: 9781101904954
El Alquimista: 9788408052944
*/

test("Subsidiary details antifragile", async () => {
  const caller = booksRouter.createCaller({
    session: null,
    prisma: prisma,
  });

  type Input = inferProcedureInput<
    (typeof booksRouter)["getByIsbnFromSubsidiary"]
  >;
  const input: Input = { isbn13: "9788408052944" };

  const expectedResult = {
    "9780812979688": {
      title: "Antifragile",
      author: "Nassim Nicholas Taleb",
    },
  };

  const result = await caller.getByIsbnFromSubsidiary(input);
  console.log(result);
  // only check if titles are equal
  // expect(result.title).toEqual(expectedResult.title);
});

test("Subsidiary all books", async () => {
  const caller = booksRouter.createCaller({
    session: null,
    prisma: prisma,
  });

  type Input = inferProcedureInput<
    (typeof booksRouter)["getAllWithDetailsAndSubsidiary"]
  >;
  const input: Input = { limit: 50, cursor: null };

  const expectedResult = {
    "9780812979688": {
      title: "Antifragile",
      author: "Nassim Nicholas Taleb",
    },
  };

  const result = await caller.getAllWithDetailsAndSubsidiary(input);
  console.log(result);
  // only check if titles are equal
  // expect(result.title).toEqual(expectedResult.title);
});
