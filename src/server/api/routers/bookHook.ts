import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { XMLParser } from "fast-xml-parser";
import { prisma } from "../../db";

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
    .output(z.string())
    .mutation(async ({ input }) => {
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
        "@_date": z.string(),
      });
      const BookHookInputSchema = z.object({
        "?xml": z.object({
          "@_version": z.string(),
          "@_encoding": z.string(),
        }),
        sale: BookHookDataSchema,
      });
      type BookHookInput = z.infer<typeof BookHookInputSchema>;
      type BookHookData = z.infer<typeof BookHookDataSchema>;
      type BookHookItem = z.infer<typeof BookHookItemSchema>;

      const parser = new XMLParser(options);
      const parsedData = parser.parse(xml) as unknown;
      console.log("Parsed data: ");
      console.log(parsedData);

      let salesDate = "";

      const processedData: BookHookItem[] = [];
      if (BookHookInputSchema.safeParse(parsedData).success) {
        const inputData = parsedData as BookHookInput;
        console.log("Data is valid");
        inputData.sale.item.forEach((item) => {
          salesDate = inputData.sale["@_date"];
          if (BookHookItemSchema.safeParse(item).success) {
            const itemData = item as BookHookItem;
            const parsedIsbn = itemData.isbn.replace(/-/g, "");
            if (parsedIsbn.length !== 10 && parsedIsbn.length !== 13) {
              console.log(`Item with ISBN ${parsedIsbn} is invalid`);
              return;
            }
            processedData.push({
              isbn: parsedIsbn,
              qty: itemData.qty,
              price: itemData.price,
            });
          } else {
            console.log("Item is invalid");
          }
        });
        console.log("Sales data: ");
        console.log(processedData);
      } else {
        console.log("Data is invalid");
        throw new TRPCError({
          code: "PARSE_ERROR",
          message: "Invalid data",
        });
      }

      if (processedData.length == 0) {
        throw new TRPCError({
          code: "PARSE_ERROR",
          message: "No ISBNs could be found",
        });
      }
      const salesDateFormatted = new Date(salesDate);
      const salesReconciliation = await prisma.salesReconciliation.create({
        data: {
          date: salesDateFormatted,
        },
      });

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
              date: new Date(),
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
      }
      return "Sales successfully added to system";
    }),
});
