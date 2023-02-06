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
      name: "John Smith",
    };

    const result = await caller.add(input);
    // only check if names are equal
    expect(result.name).toEqual(expectedResult.name);
});
  
test("connect author to a book", async () => {
    const caller = authorsRouter.createCaller({ session: null, prisma: prisma });
  
    type addInput = inferProcedureInput<typeof authorsRouter["add"]>;
    const addForInput: addInput = {
      name: "John Smith",
    };

    const addResult = await caller.add(addForInput);
    
    type Input = inferProcedureInput<typeof authorsRouter["connectToBook"]>;
    const input: Input = {
      authorId: addResult.id,
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

    type addInput = inferProcedureInput<typeof authorsRouter["add"]>;
    const addinput: addInput = {
      name: "John Smith",
    };

    const addResult = await caller.add(addinput);

    type Input = inferProcedureInput<typeof authorsRouter["delete"]>;
    const input: Input = {
      id: addResult.id,
    };

    const result = await caller.delete(input);
    expect(result).toEqual(addResult);
});