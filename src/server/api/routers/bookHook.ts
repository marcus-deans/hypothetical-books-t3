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
      console.log("XML'd Input");
      const xml = Object.values(input).join("");
      console.log(xml);

      const parser = new XMLParser(options);
      const parsedData = parser.parse(xml) as object;
      console.log("Parsed data: ");
      console.log(parsedData);
      try {
        console.log(parsedData.sale.item);
      } catch {
        console.log("No sale.item");
      }
      const BookHookDataSchema = z.object({
        sale: z.object({
          item: z.array(
            z.object({
              isbn: z.string().min(10).max(13),
              qty: z.number().gt(0),
              price: z.number().gt(0),
            })
          ),
        }),
      });
      type BookHookData = z.infer<typeof BookHookDataSchema>;

      const processData = (parsedData: BookHookData) => {
        console.log(parsedData);
        if (BookHookDataSchema.safeParse(parsedData).success) {
          console.log("Data is valid");
          parsedData.sale.item.forEach((item) => {
            console.log(item.isbn);
            console.log(item.qty);
            console.log(item.price);
          });
          return parsedData.sale.item;
        } else {
          console.log("Data is invalid");
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Invalid data",
          });
        }
      };

      return processData(parsedData);
    }),
});
