import { authorsRouter } from "../src/server/api/routers/authors";
import { expect, jest, test} from '@jest/globals';
import { prisma } from "../src/server/db";
import type { inferProcedureInput } from "@trpc/server";


test("add an author", async () => {
    const caller = authorsRouter.createCaller({ session: null, prisma: prisma });
  
    type Input = inferProcedureInput<typeof authorsRouter["add"]>;
    const input: Input = {
      name: "John Smith",
    };
  
    const expectedResult = {
      id: "1",
      name: "John Smith",
    };

    const result = await caller.add(input);
    expect(result).toEqual(expectedResult);
});
  
test("connect author to a book", async () => {
    const caller = authorsRouter.createCaller({ session: null, prisma: prisma });
  
    type Input = inferProcedureInput<typeof authorsRouter["connectToBook"]>;
    const input: Input = {
      authorId: "1",
      bookId: "1",
    };
  
    const expectedResult = {
      id: "1",
      name: "John Smith",
      books: [
        {
          id: "1",
          title: "The Great Gatsby",
        },
      ],
    };

    const result = await caller.connectToBook(input);
    expect(result).toEqual(expectedResult);
});
  
test("delete an author", async () => {
    const caller = authorsRouter.createCaller({ session: null, prisma: prisma });
  
    type Input = inferProcedureInput<typeof authorsRouter["delete"]>;
    const input: Input = {
      id: "1",
    };
  
    const expectedResult = {
      id: "1",
      name: "Jane Doe",
    };

    const result = await caller.delete(input);
    expect(result).toEqual(expectedResult);
});