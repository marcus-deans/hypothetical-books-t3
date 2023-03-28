import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { XMLParser } from "fast-xml-parser";
import { prisma } from "../../db";
import type { NextApiRequest } from "next";

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
        protect: true,
      },
    })
    .input(z.object({ name: z.string().optional() }).catchall(z.any()))
    // .output(
    //   z.array(
    //     z.object({
    //       isbn: z.string().min(10).max(13),
    //       qty: z.number().gt(0),
    //       price: z.number().gt(0),
    //     })
    //   )
    // )
    .output(
      z.object({
        message: z.string(),
        booksAdded: z.string().array(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // try {
      //   if (!ctx.req) {
      //     throw new Error("You are missing `req` or `res` in your call.");
      //   }
      //   const req = ctx.req as NextApiRequest;
      //   if (req.headers["x-real-ip"] != "152.3.54.108") {
      //     throw new TRPCError({
      //       code: "UNAUTHORIZED",
      //       message:
      //         "You are attempting to access BookHook upload from an unauthorized IP address",
      //     });
      //   }
      // } catch (error) {
      //   throw new TRPCError({
      //     code: "UNAUTHORIZED",
      //     message: "There was an error in your authorization",
      //   });
      // }
      const options = {
        ignoreAttributes: false,
      };
      const xml = Object.values(input).join("");

      const BookHookItemSchema = z.object({
        isbn: z.coerce.string(),
        qty: z.number().gt(0),
        price: z.number().gt(0),
      });
      const BookHookDataSchema = z.object({
        item: z.union([z.any(), z.any().array()]).transform((data) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return Array.isArray(data) ? data : [data];
        }),
        "@_date": z
          .union([z.string(), z.number(), z.date()])
          .pipe(
            z.coerce
              .date()
              .max(new Date(), { message: "Date is in the future" })
          ),
      });
      const BookHookInputSchema = z.object({
        "?xml": z
          .object({
            "@_version": z.string(),
            "@_encoding": z.string(),
          })
          .optional(),
        sale: BookHookDataSchema,
      });
      type BookHookInput = z.infer<typeof BookHookInputSchema>;
      type BookHookData = z.infer<typeof BookHookDataSchema>;
      type BookHookItem = z.infer<typeof BookHookItemSchema>;

      const parser = new XMLParser(options);
      const parsedData = parser.parse(xml) as unknown;
      console.log("Parsed data: ");
      console.log(parsedData);

      let salesDate = new Date();
      const processedData: BookHookItem[] = [];
      const inputData = BookHookInputSchema.safeParse(parsedData);
      if (!inputData.success) {
        console.log("Data is invalid");
        throw new TRPCError({
          code: "PARSE_ERROR",
          message: "The data did not match the expected format",
        });
      } else {
        console.log("Data is valid");
        salesDate = inputData.data.sale["@_date"];
        inputData.data.sale.item.forEach((item) => {
          const itemData = BookHookItemSchema.safeParse(item);
          if (!itemData.success) {
            console.log("Item is invalid");
            return;
          } else {
            console.log("Current item is valid");
            console.log(item);
            const parsedIsbn = itemData.data.isbn.replace(/-/g, "");
            if (parsedIsbn.length !== 10 && parsedIsbn.length !== 13) {
              console.log(`Item with ISBN ${parsedIsbn} is invalid`);
              return;
            }
            processedData.push({
              isbn: parsedIsbn,
              qty: itemData.data.qty,
              price: itemData.data.price,
            });
          }
        });
        console.log("Sales data: ");
        console.log(processedData);
      }

      if (processedData.length == 0) {
        throw new TRPCError({
          code: "PARSE_ERROR",
          message: "No ISBNs could be found",
        });
      }
      const salesReconciliation = await prisma.salesReconciliation.create({
        data: {
          date: salesDate,
        },
      });

      const booksAdded: string[] = [];
      for (const sale of processedData) {
        const currentBook = await prisma.book.findFirst({
          where: {
            OR: [
              {
                isbn_10: sale.isbn,
              },
              {
                isbn_13: sale.isbn,
              },
            ],
          },
        });
        if (!currentBook) {
          console.log(`Book with ISBN ${sale.isbn} not found`);
          continue;
        }

        const bookInventoryCount = await prisma.book.findUnique({
          where: { id: currentBook.id },
          select: {
            inventoryCount: true,
          },
        });

        if ((bookInventoryCount?.inventoryCount ?? 0) < sale.qty) {
          const difference =
            sale.qty - (bookInventoryCount?.inventoryCount ?? 0);
          console.log(
            `Book with ISBN ${sale.isbn} has insufficient inventory, adding correction of ${difference}`
          );
          await prisma.correction.create({
            data: {
              book: {
                connect: {
                  id: currentBook.id,
                },
              },
              quantity: difference,
              date: salesDate,
            },
          });

          await prisma.book.update({
            where: { id: currentBook.id },
            data: {
              inventoryCount: {
                increment: difference,
              },
            },
          });
        }

        const salesLine = await prisma.salesLine.create({
          data: {
            book: {
              connect: {
                id: currentBook.id,
              },
            },
            quantity: sale.qty,
            unitWholesalePrice: sale.price,
            salesReconciliation: {
              connect: {
                id: salesReconciliation.id,
              },
            },
            display: true,
          },
        });

        await prisma.book.update({
          where: { id: currentBook.id },
          data: {
            inventoryCount: {
              decrement: sale.qty,
            },
          },
        });
        booksAdded.push(sale.isbn);
      }
      if (booksAdded.length == 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message:
            "No sales were added to the system, as no line items had correct format",
        });
      }
      return {
        message: `${booksAdded.length} sales of below ISBNs were successfully added`,
        booksAdded: booksAdded,
      };
    }),
});
