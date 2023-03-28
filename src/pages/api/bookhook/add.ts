import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { XMLParser } from "fast-xml-parser";
import { prisma } from "../../../server/db";

type ResponseData = {
  type: string;
  message: string;
};
export default async function addToBookhookHandler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    if (
      req.headers["x-real-ip"] != "152.3.54.108" &&
      req.headers["x-real-ip"] != "192.168.1.126"
    ) {
      res.status(403).json({
        type: "UNAUTHORIZED",
        message: "There was an error in your authorization",
      });
      return;
    }
  } catch (error) {
    res.status(403).json({
      type: "UNAUTHORIZED",
      message: "There was an error in your authorization",
    });
    return;
  }

  const options = {
    ignoreAttributes: false,
  };
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const xml = Object.values(req.body).join("");

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
        z.coerce.date().max(new Date(), { message: "Date is in the future" })
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
    res.status(400).json({
      type: "PARSE_ERROR",
      message: "The data did not match the expected format",
    });
    return;
  } else {
    console.log("Data is valid");
    salesDate = inputData.data.sale["@_date"];
    salesDate.setUTCHours(4, 0, 0, 0);
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
    res.status(400).json({
      type: "PARSE_ERROR",
      message: "No valid line items could be found",
    });
    return;
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
      const difference = sale.qty - (bookInventoryCount?.inventoryCount ?? 0);
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
    res.status(404).json({
      type: "NOT_FOUND",
      message:
        "No sales were added to the system, as no line items had correct format",
    });
    return;
  }
  res.status(200).json({
    type: "SUCCESS",
    message: `${
      booksAdded.length
    } sales were successfully added with ISBNs: ${booksAdded.join(", ")}`,
  });
}
