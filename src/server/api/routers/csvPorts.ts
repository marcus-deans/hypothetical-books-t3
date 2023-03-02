import { number, z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import type { CSVBuybackInputId, CSVPurchaseInputId, CSVSaleInputId} from "../../../schema/imports.schema";
import { CSVBuybackInputSchema, CSVSaleInputIdSchema, CSVSaleInputSchema } from "../../../schema/imports.schema";
import { CSVPurchaseInputSchema, CSVPurchaseInputIdSchema , CSVBuybackInputIdSchema } from "../../../schema/imports.schema";
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
			if(!input.headers || input.headers.length != 3){
        return {
          verified: false,
          message: "File must have three headers",
        }
      }
      if(input.headers.at(0) != "isbn" || input.headers.at(1) != "quantity"  || !input.headers.at(2)?.startsWith("unit_") || !input.headers.at(2)?.endsWith("_price")){
        return {
          verified: false,
          message: "The file headers must be `isbn, quantity, unit_x_price`.",
        }
      }
      return {
        verified: true,
        message: "Verified",
      }
    }),
  verifyPurchaseCSV: publicProcedure
    .input(
      z.array(
        CSVPurchaseInputSchema
      ).optional()
    )
    .output(
      z.object({
        verified: z.boolean(),
        message: z.string(),
        parsedData: z.array(CSVPurchaseInputIdSchema)
      })
    )
		// eslint-disable-next-line @typescript-eslint/require-await
		.query(async ({ input }) => {
      if(!input){
        return {
          verified: false,
          message: "No Input",
          parsedData: []
        }
      }
      const parsedData: CSVPurchaseInputId[] = [];
			for (const entry of input){
        const newEntry: CSVPurchaseInputId = {bookId: "", quantity: -1, unit_wholesale_price: -1}
        // cast it to either an isbn-13 or isbn-10
        const inputIsbn = entry.isbn.replace(/\s+/g, "").replace(/-/g, "");
        const validIsbnLengths: number[] = [10, 13];
        if(!validIsbnLengths.includes(inputIsbn.length)){
          return{
            verified: false,
            message: "Book with Isbn: " + entry.isbn + " is not a valid ISBN due to length",
            parsedData: [],
          };
        }
        let bookInDatabase: Book | null = null;
        if(inputIsbn.length === 10){
          const isbn_10 = inputIsbn;
          bookInDatabase = await prisma.book.findFirst({
            where: { isbn_10 } ,
          })
        } else if (inputIsbn.length === 13){
          const isbn_13 = inputIsbn;
          bookInDatabase = await prisma.book.findFirst({
            where: { isbn_13 } ,
          })
        }
        if(!bookInDatabase){
          return{
            verified: false,
            message: "Book with Isbn: " + entry.isbn + " is not in the database",
            parsedData: [],
          };
        }
        newEntry.bookId = bookInDatabase.id;
        const quantitySplit = entry.quantity.split(".");
        if(quantitySplit.length > 1){
          return {
            verified: false,
            message: "Book with Isbn: " + entry.isbn + " has a decimal quantity",
            parsedData: [],
          }
        }
        const unitPriceSplit = entry.unit_wholesale_price.split(".");
        if(unitPriceSplit.length > 1){
          if(unitPriceSplit[1] && unitPriceSplit[1].length > 2){
            return {
              verified: false,
              message: "Book with Isbn-13: " + entry.isbn + " has a a price with more than 3 decimal places",
              parsedData: [],
            }
          }
        }
        newEntry.quantity = parseInt(entry.quantity);
        newEntry.unit_wholesale_price = parseFloat(entry.unit_wholesale_price);
        if(newEntry.bookId == "" || newEntry.quantity == -1 || newEntry.unit_wholesale_price == -1){
          return{
            verified: false,
            message: "Data not filled on line with book ISBN-13: " + entry.isbn,
            parsedData: []
          }
        }
        parsedData.push(newEntry);
      }
      return{
        verified: true,
        message: "Data Successfully Parsed",
        parsedData: parsedData
      }
    }),
  verifySaleCSV: publicProcedure
    .input(
      z.array(
        CSVSaleInputSchema
      ).optional()
    )
    .output(
      z.object({
        verified: z.boolean(),
        message: z.string(),
        parsedData: z.array(CSVSaleInputIdSchema)
      })
    )
		// eslint-disable-next-line @typescript-eslint/require-await
		.query(async ({ input }) => {
      if(!input){
        return {
          verified: false,
          message: "No Input",
          parsedData: []
        }
      }
      const parsedData: CSVSaleInputId[] = [];
			for (const entry of input){
        const newEntry: CSVSaleInputId = {bookId: "", quantity: -1, unit_retail_price: -1}
        // cast it to either an isbn-13 or isbn-10
        const inputIsbn = entry.isbn.replace(/\s+/g, "").replace(/-/g, "");
        const validIsbnLengths: number[] = [10, 13];
        if(!validIsbnLengths.includes(inputIsbn.length)){
          return{
            verified: false,
            message: "Book with Isbn: " + entry.isbn + " is not a valid ISBN due to length",
            parsedData: [],
          };
        }
        let bookInDatabase: Book | null = null;
        if(inputIsbn.length === 10){
          const isbn_10 = inputIsbn;
          bookInDatabase = await prisma.book.findFirst({
            where: { isbn_10 } ,
          })
        } else if (inputIsbn.length === 13){
          const isbn_13 = inputIsbn;
          bookInDatabase = await prisma.book.findFirst({
            where: { isbn_13 } ,
          })
        }
        if(!bookInDatabase){
          return{
            verified: false,
            message: "Book with Isbn: " + entry.isbn + " is not in the database",
            parsedData: [],
          };
        }
        newEntry.bookId = bookInDatabase.id;
        const quantitySplit = entry.quantity.split(".");
        if(quantitySplit.length > 1){
          return {
            verified: false,
            message: "Book with Isbn: " + entry.isbn + " has a decimal quantity",
            parsedData: [],
          }
        }
        const unitPriceSplit = entry.unit_retail_price.split(".");
        if(unitPriceSplit.length > 1){
          if(unitPriceSplit[1] && unitPriceSplit[1].length > 2){
            return {
              verified: false,
              message: "Book with Isbn-13: " + entry.isbn + " has a a price with more than 3 decimal places",
              parsedData: [],
            }
          }
        }
        newEntry.quantity = parseInt(entry.quantity);
        newEntry.unit_retail_price = parseFloat(entry.unit_retail_price);
        if(bookInDatabase.inventoryCount < newEntry.quantity){
          return{
            verified: false,
            message: "Book " + entry.isbn + " has quantity " + newEntry.quantity.toString() + " when the inventory count is only " + bookInDatabase.inventoryCount.toString(),
            parsedData: []
          }
        }
        if(newEntry.bookId == "" || newEntry.quantity == -1 || newEntry.unit_retail_price == -1){
          return{
            verified: false,
            message: "Data not filled on line with book ISBN-13: " + entry.isbn,
            parsedData: []
          }
        }
        parsedData.push(newEntry);
      }
      return{
        verified: true,
        message: "Data Successfully Parsed",
        parsedData: parsedData
      }
    }),
  verifyBuybackCSV: publicProcedure
    .input(
      z.array(
        CSVBuybackInputSchema
      ).optional()
    )
    .output(
      z.object({
        verified: z.boolean(),
        message: z.string(),
        parsedData: z.array(CSVBuybackInputIdSchema)
      })
    )
		// eslint-disable-next-line @typescript-eslint/require-await
		.query(async ({ input }) => {
      if(!input){
        return {
          verified: false,
          message: "No Input",
          parsedData: []
        }
      }
      const parsedData: CSVBuybackInputId[] = [];
			for (const entry of input){
        const newEntry: CSVBuybackInputId = {bookId: "", quantity: -1, unit_buyback_price: -1}
        // cast it to either an isbn-13 or isbn-10
        const inputIsbn = entry.isbn.replace(/\s+/g, "").replace(/-/g, "");
        const validIsbnLengths: number[] = [10, 13];
        if(!validIsbnLengths.includes(inputIsbn.length)){
          return{
            verified: false,
            message: "Book with Isbn: " + entry.isbn + " is not a valid ISBN due to length",
            parsedData: [],
          };
        }
        let bookInDatabase: Book | null = null;
        if(inputIsbn.length === 10){
          const isbn_10 = inputIsbn;
          bookInDatabase = await prisma.book.findFirst({
            where: { isbn_10 } ,
          })
        } else if (inputIsbn.length === 13){
          const isbn_13 = inputIsbn;
          bookInDatabase = await prisma.book.findFirst({
            where: { isbn_13 } ,
          })
        }
        if(!bookInDatabase){
          return{
            verified: false,
            message: "Book with Isbn: " + entry.isbn + " is not in the database",
            parsedData: [],
          };
        }
        newEntry.bookId = bookInDatabase.id;
        const quantitySplit = entry.quantity.split(".");
        if(quantitySplit.length > 1){
          return {
            verified: false,
            message: "Book with Isbn: " + entry.isbn + " has a decimal quantity",
            parsedData: [],
          }
        }
        const unitPriceSplit = entry.unit_buyback_price.split(".");
        if(unitPriceSplit.length > 1){
          if(unitPriceSplit[1] && unitPriceSplit[1].length > 2){
            return {
              verified: false,
              message: "Book with Isbn-13: " + entry.isbn + " has a a price with more than 3 decimal places",
              parsedData: [],
            }
          }
        }
        newEntry.quantity = parseInt(entry.quantity);
        newEntry.unit_buyback_price = parseFloat(entry.unit_buyback_price);
        if(bookInDatabase.inventoryCount < newEntry.quantity){
          return{
            verified: false,
            message: "Book " + entry.isbn + " has quantity " + newEntry.quantity.toString() + " when the inventory count is only " + bookInDatabase.inventoryCount.toString(),
            parsedData: []
          }
        }
        if(newEntry.bookId == "" || newEntry.quantity == -1 || newEntry.unit_buyback_price == -1){
          return{
            verified: false,
            message: "Data not filled on line with book ISBN-13: " + entry.isbn,
            parsedData: []
          }
        }
        parsedData.push(newEntry);
      }
      return{
        verified: true,
        message: "Data Successfully Parsed",
        parsedData: parsedData
      }
    }),    
  addPurchaseImport: publicProcedure
    .input(
      z.object({
        data: z.array(
          CSVPurchaseInputIdSchema
          ).optional(),
        purchaseOrderId: z.string(),
      }))
    .output(
      z.object({
        completed: z.boolean(),
        message: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      let addedLines = 0;
      if(!input.data){
        return {
          completed: false,
          message: "No Input"
        }
      }
      console.log("It has input")
      for (const entry of input.data){
        const purchaseLine = await prisma.purchaseLine.create({
          data: {
            book: {
              connect: {
                id: entry.bookId,
              },
            },
            quantity: entry.quantity,
            unitWholesalePrice: entry.unit_wholesale_price,
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
      console.log("Got to end of for-loop")
      return{
        completed: true,
        message: "Successfully added " + addedLines.toString() + " Purchase Order Lines"
      }
    }),
  addSaleImport: publicProcedure
    .input(
      z.object({
        data: z.array(
          CSVSaleInputIdSchema
          ).optional(),
        salesOrderId: z.string(),
      }))
    .output(
      z.object({
        completed: z.boolean(),
        message: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      let addedLines = 0;
      if(!input.data){
        return {
          completed: false,
          message: "No Input"
        }
      }
      console.log("It has input")
      for (const entry of input.data){
        const salesLine = await prisma.salesLine.create({
          data: {
            book: {
              connect: {
                id: entry.bookId,
              },
            },
            quantity: entry.quantity,
            unitWholesalePrice: entry.unit_retail_price,
            salesReconciliation: {
              connect: {
                id: input.salesOrderId,
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
      console.log("Got to end of for-loop")
      return{
        completed: true,
        message: "Successfully added " + addedLines.toString() + " Sales Order Lines"
      }
    }),
  addBuybackImport: publicProcedure
    .input(
      z.object({
        data: z.array(
          CSVBuybackInputIdSchema
          ).optional(),
        buybackOrderId: z.string(),
      }))
    .output(
      z.object({
        completed: z.boolean(),
        message: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      let addedLines = 0;
      if(!input.data){
        return {
          completed: false,
          message: "No Input"
        }
      }
      console.log("It has input")
      for (const entry of input.data){
        const buybackLine = await prisma.buybackLine.create({
          data: {
            book: {
              connect: {
                id: entry.bookId,
              },
            },
            quantity: entry.quantity,
            unitBuybackPrice: entry.unit_buyback_price,
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
      console.log("Got to end of for-loop")
      return{
        completed: true,
        message: "Successfully added " + addedLines.toString() + " Buyback Order Lines"
      }
    }),
});
