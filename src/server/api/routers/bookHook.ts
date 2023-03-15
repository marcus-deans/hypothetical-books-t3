import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { XMLParser } from "fast-xml-parser";

export const bookHookRouter = createTRPCRouter({
  upload: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: "/bookhook/upload",
        tags: ["bookhook"],
        summary: "Add new sales data to system",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        contentTypes: ["application/xml"],
      },
    })
    // .input(
    //   z.object({
    //     email: z.string().email(),
    //     passcode: z.preprocess(
    //       (arg) => (typeof arg === "string" ? parseInt(arg) : arg),
    //       z.number().min(1000).max(9999)
    //     ),
    //     name: z.string().min(3),
    //   })
    // )
    // .input(z.object( z.string() ))
    .input(z.object({ name: z.string().optional() }).catchall(z.any()))
    .output(
      z.array(
        z.object({
          isbn: z.string().min(10).max(13),
          qty: z.number().gt(0),
          price: z.number().gt(0),
        })
      )
    )
    .mutation(({ input }) => {
      const options = {
        ignoreAttributes: true,
      };
      const xml = Object.values(input).join("");

      const parser = new XMLParser(options);
      const parsedData = parser.parse(xml) as BookHookInput;
      console.log("Parsed data: ");
      console.log(parsedData);

      const BookHookItemSchema = z.object({
        isbn: z.coerce.string(),
        qty: z.number().gt(0),
        price: z.number().gt(0),
      });
      const BookHookDataSchema = z.object({
        item: z.array(z.any()),
      });
      const BookHookInputSchema = z.object({
        "?xml": z.string(),
        sale: BookHookDataSchema,
      });
      type BookHookInput = z.infer<typeof BookHookInputSchema>;
      type BookHookData = z.infer<typeof BookHookDataSchema>;
      type BookHookItem = z.infer<typeof BookHookItemSchema>;
      const processData = (parsedData: BookHookData) => {
        console.log(parsedData);
        if (BookHookDataSchema.safeParse(parsedData).success) {
          console.log("Data is valid");
          const salesData: BookHookItem[] = [];
          parsedData.item.forEach((item) => {
            if (BookHookItemSchema.safeParse(item).success) {
              const itemData = item as BookHookItem;
              const parsedIsbn = itemData.isbn.replace(/-/g, "");
              if (parsedIsbn.length !== 10 && parsedIsbn.length !== 13) {
                console.log(`Item with ISBN ${parsedIsbn} is invalid`);
                return;
              }
              salesData.push({
                isbn: parsedIsbn,
                qty: itemData.qty,
                price: itemData.price,
              });
            } else {
              console.log("Item is invalid");
            }
          });
          console.log("Sales data: ");
          console.log(salesData);
          return salesData;
        } else {
          console.log("Data is invalid");
          throw new TRPCError({
            code: "PARSE_ERROR",
            message: "Invalid data",
          });
        }
      };

      const processedData = processData(parsedData.sale);
      if (processedData.length == 0) {
        throw new TRPCError({
          code: "PARSE_ERROR",
          message: "No ISBNs could be found",
        });
      }
      return processedData;
    }),
});
