import { number, z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import type { purchaseOrdersInput, purchaseOrdersInputId} from "../../../schema/imports.schema";
import { purchaseOrdersInputSchema, purchaseOrdersInputIdSchema } from "../../../schema/imports.schema";
import { api } from "../../../utils/api";
import { prisma } from "../../db";

export const csvPortsRouter = createTRPCRouter({
  verifyPurchaseHeaders: publicProcedure
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
      if(input.headers.at(0) != "isbn_13" || input.headers.at(1) != "quantity"  || input.headers.at(2) != "unit_wholesale_price" ){
        return {
          verified: false,
          message: "The file headers must be `isbn_13, quantity, unit_wholesale_price`.",
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
        purchaseOrdersInputSchema
      ).optional()
    )
    .output(
      z.object({
        verified: z.boolean(),
        message: z.string(),
        parsedData: z.array(purchaseOrdersInputIdSchema)
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
      const parsedData: purchaseOrdersInputId[] = [];
			for (const entry of input){
        const newEntry: purchaseOrdersInputId = {bookId: "", quantity: -1, unit_wholesale_price: -1}
        const isbn_13 = entry.isbn_13.toString();
        const bookInDatabase = await prisma.book.findFirst({
          where: { isbn_13 } ,
        })
        if(!bookInDatabase){
          return{
            verified: false,
            message: "Book with Isbn-13: " + entry.isbn_13.toString() + " is not in the database",
            parsedData: [],
          };
        }
        bookInDatabase?.id;
        newEntry.bookId = bookInDatabase.id;
        const quantityString = entry.quantity.toString();
        const quantitySplit = quantityString.split(".");
        if(quantitySplit.length > 1){
          return {
            verified: false,
            message: "Book with Isbn-13: " + entry.isbn_13.toString() + " has a decimal quantity",
            parsedData: [],
          }
        }
        const unitPriceString = entry.unit_wholesale_price.toString();
        const unitPriceSplit = unitPriceString.split(".");
        if(unitPriceSplit.length > 1){
          if(unitPriceSplit[1] && unitPriceSplit[1].length > 2){
            return {
              verified: false,
              message: "Book with Isbn-13: " + entry.isbn_13.toString() + " has a a price with more than 3 decimal places",
              parsedData: [],
            }
          }
        }
        newEntry.quantity = entry.quantity;
        newEntry.unit_wholesale_price = entry.unit_wholesale_price;
        if(newEntry.bookId == "" || newEntry.quantity == -1 || newEntry.unit_wholesale_price == -1){
          return{
            verified: false,
            message: "Data not filled on line with book ISBN-13: " + entry.isbn_13.toString(),
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
          purchaseOrdersInputIdSchema
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
    })
});
