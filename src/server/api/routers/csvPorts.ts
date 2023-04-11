import { number, z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import {
  CSVInputSchema,
  CSVInputIdSchema} from "../../../schema/imports.schema";
import type {
  CSVInputId} from "../../../schema/imports.schema";
import { prisma } from "../../db";
import type { Book } from "@prisma/client";

export const csvPortsRouter = createTRPCRouter({
  verifyImportHeaders: publicProcedure
    .input(
      z.object({
        headers: z.array(z.string()).optional(),
      })
    )
    .output(
      z.object({
        verified: z.boolean(),
        message: z.string(),
      })
    )
    // eslint-disable-next-line @typescript-eslint/require-await
    .query(async ({ input }) => {
      if (!input.headers || input.headers.length != 3) {
        return {
          verified: false,
          message: "File must have three headers",
        };
      }
      if (
        input.headers.at(0) != "isbn" ||
        input.headers.at(1) != "quantity" ||
        input.headers.at(2) != "unit_price"
      ) {
        return {
          verified: false,
          message: "The file headers must be `isbn, quantity, unit_price`." ,
        };
      }
      return {
        verified: true,
        message: "Verified",
      };
    }),
  verifySaleCSV: publicProcedure
    .input(z.array(CSVInputSchema).optional())
    .output(
      z.object({
        verified: z.boolean(),
        message: z.string(),
        parsedData: z.array(CSVInputIdSchema),
      })
    )
    // eslint-disable-next-line @typescript-eslint/require-await
    .query(async ({ input }) => {
      if (!input) {
        return {
          verified: false,
          message: "No Input",
          parsedData: [],
        };
      }
      const parsedData: CSVInputId[] = [];
      let index = 0;
      for (const entry of input) {
        const newEntry: CSVInputId = {
          id: index,
          bookId: "",
          title: "",
          isbn: entry.isbn,
          quantity: -1,
          unit_price: -1,
          verified: true,
          reason: ""
        };
        index ++;
        const quantitySplit = entry.quantity.split(".");
        if (quantitySplit.length > 1) {
          newEntry.verified = false;
          newEntry.reason += "Has a decimal quantity. ";
        }
        const unitPriceNoDollarSign = entry.unit_price.replace("$", "");
        const unitPriceSplit = unitPriceNoDollarSign.split(".");
        if (unitPriceSplit.length > 1) {
          if (unitPriceSplit[1] && unitPriceSplit[1].length > 2) {
            newEntry.verified = false;
            newEntry.reason += "Has a a price with more than 2 decimal places. ";
          }
        }
        newEntry.quantity = parseFloat(entry.quantity);
        newEntry.unit_price = parseFloat(unitPriceNoDollarSign);
        if(Number.isNaN(newEntry.quantity)){
          newEntry.verified = false;
          newEntry.reason += "Quantity is Either not in data row or NaN. ";
          newEntry.quantity = 0;
        }
        if(Number.isNaN(newEntry.unit_price)){
          newEntry.verified = false;
          newEntry.reason += "UWP is Either not in data row or NaN. ";
          newEntry.unit_price = 0;
        }
        // cast it to either an isbn-13 or isbn-10
        const inputIsbn = entry.isbn.replace(/\s+/g, "").replace(/-/g, "");
        const validIsbnLengths: number[] = [10, 13];
        if (!validIsbnLengths.includes(inputIsbn.length)) {
          newEntry.verified = false;
          newEntry.reason += "Not a valid ISBN due to length. ";
          parsedData.push(newEntry);
          continue; 
        }
        let bookInDatabase: Book | null = null;
        if (inputIsbn.length === 10) {
          const isbn_10 = inputIsbn;
          bookInDatabase = await prisma.book.findFirst({
            where: { isbn_10 },
          });
        } else if (inputIsbn.length === 13) {
          const isbn_13 = inputIsbn;
          bookInDatabase = await prisma.book.findFirst({
            where: { isbn_13 },
          });
        }
        if (!bookInDatabase) {
          newEntry.verified == false;
          newEntry.reason += "This book is not in the database. "
          newEntry.title = "BOOK NOT FOUND"
          parsedData.push(newEntry);
          continue; 
        }
        if (bookInDatabase.inventoryCount < newEntry.quantity) {
          newEntry.verified == false;
          newEntry.reason += "Book " + entry.isbn +" has quantity " + newEntry.quantity.toString() +" when the inventory count is only " + bookInDatabase.inventoryCount.toString();
        }
        newEntry.bookId = bookInDatabase.id;
        newEntry.title = bookInDatabase.title;
        if (
          newEntry.bookId == "" ||
          newEntry.quantity == -1 ||
          newEntry.unit_price == -1
        ) {
          newEntry.verified = false;
          newEntry.reason += "Data row not filled completely. "
        }
        parsedData.push(newEntry);
      }
      let allVerified = true;
      parsedData.forEach(function (entry){
        if(!entry.verified) allVerified = false;
      })
      return {
        verified: allVerified,
        message: "Data Successfully Parsed",
        parsedData: parsedData,
      };
    }),
  verifyCSV: publicProcedure
    .input(z.array(CSVInputSchema).optional())
    .output(
      z.object({
        verified: z.boolean(),
        message: z.string(),
        parsedData: z.array(CSVInputIdSchema),
      })
    )
    // eslint-disable-next-line @typescript-eslint/require-await
    .query(async ({ input }) => {
      if (!input) {
        return {
          verified: false,
          message: "No Input",
          parsedData: [],
        };
      }
      const parsedData: CSVInputId[] = [];
      let index = 0;
      for (const entry of input) {
        const newEntry: CSVInputId = {
          id: index,
          bookId: "",
          title: "",
          isbn: entry.isbn,
          quantity: -1,
          unit_price: -1,
          verified: true,
          reason: ""
        };
        index ++;
        const quantitySplit = entry.quantity.split(".");
        if (quantitySplit.length > 1) {
          newEntry.verified = false;
          newEntry.reason += "Has a decimal quantity. ";
        }
        const unitPriceNoDollarSign = entry.unit_price.replace("$", "");
        const unitPriceSplit = unitPriceNoDollarSign.split(".");
        if (unitPriceSplit.length > 1) {
          if (unitPriceSplit[1] && unitPriceSplit[1].length > 2) {
            newEntry.verified = false;
            newEntry.reason += "Has a a price with more than 2 decimal places. ";
          }
        }
        newEntry.quantity = parseFloat(entry.quantity);
        newEntry.unit_price = parseFloat(unitPriceNoDollarSign);
        if(Number.isNaN(newEntry.quantity)){
          newEntry.verified = false;
          newEntry.reason += "Quantity is Either not in data row or NaN. ";
          newEntry.quantity = 0;
        }
        if(Number.isNaN(newEntry.unit_price)){
          newEntry.verified = false;
          newEntry.reason += "UWP is Either not in data row or NaN. ";
          newEntry.unit_price = 0;
        }
        // cast it to either an isbn-13 or isbn-10
        const inputIsbn = entry.isbn.replace(/\s+/g, "").replace(/-/g, "");
        const validIsbnLengths: number[] = [10, 13];
        if (!validIsbnLengths.includes(inputIsbn.length)) {
          newEntry.verified = false;
          newEntry.reason += "Not a valid ISBN due to length. ";
          parsedData.push(newEntry);
          continue; 
        }
        let bookInDatabase: Book | null = null;
        if (inputIsbn.length === 10) {
          const isbn_10 = inputIsbn;
          bookInDatabase = await prisma.book.findFirst({
            where: { isbn_10 },
          });
        } else if (inputIsbn.length === 13) {
          const isbn_13 = inputIsbn;
          bookInDatabase = await prisma.book.findFirst({
            where: { isbn_13 },
          });
        }
        if (!bookInDatabase) {
          newEntry.verified == false;
          newEntry.reason += "This book is not in the database. "
          newEntry.title = "BOOK NOT FOUND"
          parsedData.push(newEntry);
          continue; 
        }
        newEntry.bookId = bookInDatabase.id;
        newEntry.title = bookInDatabase.title;
        if (
          newEntry.bookId == "" ||
          newEntry.quantity == -1 ||
          newEntry.unit_price == -1
        ) {
          newEntry.verified = false;
          newEntry.reason += "Data row not filled completely. "
        }
        parsedData.push(newEntry);
      }
      let allVerified = true;
      parsedData.forEach(function (entry){
        if(!entry.verified) allVerified = false;
      })
      return {
        verified: allVerified,
        message: "Data Successfully Parsed",
        parsedData: parsedData,
      };
    }),
  addSaleImport: publicProcedure
    .input(
      z.object({
        data: z.array(CSVInputIdSchema).optional(),
        salesReconciliationId: z.string(),
      })
    )
    .output(
      z.object({
        success: z.boolean(),
        message: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      let addedLines = 0;
      if (!input.data) {
        return {
          success: false,
          message: "No Input",
        };
      }
      for (const entry of input.data) {
        const salesLine = await prisma.salesLine.create({
          data: {
            book: {
              connect: {
                id: entry.bookId,
              },
            },
            quantity: entry.quantity,
            unitWholesalePrice: entry.unit_price,
            salesReconciliation: {
              connect: {
                id: input.salesReconciliationId,
              },
            },
            display: true,
          },
        });
        await prisma.book.update({
          where: { id: entry.bookId },
          data: {
            inventoryCount: {
              decrement: entry.quantity,
            },
          },
        });
        addedLines++;
      }
      return {
        success: true,
        message:
          "Successfully added " +
          addedLines.toString() +
          " Sales Reconciliation Lines",
      };
    }),
  addPurchaseImport: publicProcedure
    .input(
      z.object({
        data: z.array(CSVInputIdSchema).optional(),
        purchaseOrderId: z.string(),
      })
    )
    .output(
      z.object({
        success: z.boolean(),
        message: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      let addedLines = 0;
      if (!input.data) {
        return {
          success: false,
          message: "No Input",
        };
      }
      for (const entry of input.data) {
        const purchaseLine = await prisma.purchaseLine.create({
          data: {
            book: {
              connect: {
                id: entry.bookId,
              },
            },
            quantity: entry.quantity,
            unitWholesalePrice: entry.unit_price,
            purchaseOrder: {
              connect: {
                id: input.purchaseOrderId,
              },
            },
            display: true,
          },
        });
        await prisma.book.update({
          where: { id: entry.bookId },
          data: {
            inventoryCount: {
              increment: entry.quantity,
            },
          },
        });
        addedLines++;
      }
      return {
        success: true,
        message:
          "Successfully added " +
          addedLines.toString() +
          " Purchase Order Lines",
      };
    }),
  addBuybackImport: publicProcedure
  .input(
    z.object({
      data: z.array(CSVInputIdSchema).optional(),
      buybackOrderId: z.string(),
    })
  )
  .output(
    z.object({
      success: z.boolean(),
      message: z.string(),
    })
  )
  .mutation(async ({ input }) => {
    let addedLines = 0;
    if (!input.data) {
      return {
        success: false,
        message: "No Input",
      };
    }
    for (const entry of input.data) {
      const buybackLine = await prisma.buybackLine.create({
        data: {
          book: {
            connect: {
              id: entry.bookId,
            },
          },
          quantity: entry.quantity,
          unitBuybackPrice: entry.unit_price,
          buybackOrder: {
            connect: {
              id: input.buybackOrderId,
            },
          },
          display: true,
        },
      });
      await prisma.book.update({
        where: { id: entry.bookId },
        data: {
          inventoryCount: {
            decrement: entry.quantity,
          },
        },
      });
      addedLines++;
    }
    return {
      success: true,
      message:
        "Successfully added " +
        addedLines.toString() +
        " Buyback Order Lines",
    };
  }),
});
