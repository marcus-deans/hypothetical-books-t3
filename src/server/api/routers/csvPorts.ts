import { number, z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import type { purchaseOrdersInput} from "../../../schema/imports.schema";
import { purchaseOrdersInputSchema, purchaseOrdersInputUnknownSchema } from "../../../schema/imports.schema";

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
        parsedData: z.array(purchaseOrdersInputSchema.nullable())
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
      let verified = true;
      let message = "Verified";
      const parsedData: purchaseOrdersInput[] = [];
			input.forEach(function (entry, index){
        const newEntry: purchaseOrdersInput = {isbn_13: -1, quantity: -1, unit_wholesale_price: -1}
        newEntry.isbn_13 = entry.isbn_13;
        newEntry.quantity = entry.quantity;
        newEntry.unit_wholesale_price = entry.unit_wholesale_price;
        if(newEntry.isbn_13 == -1 || newEntry.quantity == -1 || newEntry.unit_wholesale_price == -1){
          verified = false;
          message = "Not taking data";
        }
        parsedData.push(newEntry);
        /*
        if(verified == false){
          return;
        }
        console.log(typeof entry);
        const newEntry = entry as number[];
        const created:purchaseOrdersInput = {isbn_13:"", quantity:"", unit_wholesale_price:""};
        console.log(typeof newEntry[0]);
        const a = newEntry[0] as number;
        console.log(a)
        if(newEntry[0]){
          created.isbn_13 = newEntry[0].toString();
        }
        if(newEntry[1]){
          created.quantity = newEntry[1].toString();
        }
        if(newEntry[2]){
          created.unit_wholesale_price = newEntry[2].toString();
        }
        parsedData.push(created);
        */
      })
      return{
        verified,
        message,
        parsedData
      }
    }),
});
