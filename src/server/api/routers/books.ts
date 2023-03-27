import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { prisma } from "../../db";
import { TRPCError } from "@trpc/server";
import type { bookDetail } from "../../../schema/books.schema";
import { bookDetailSchema } from "../../../schema/books.schema";
import { env } from "../../../env/server.mjs";
import Fuse from "fuse.js";
import { api } from "../../../utils/api";
import type { S3 } from "aws-sdk/clients/browser_default";
import * as AWS from "aws-sdk";

const s3 = new AWS.S3();
AWS.config.update({
  accessKeyId: env.AWS_ACCESS_KEY_ID,
  secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
});

const BUCKET_NAME = env.AWS_S3_BUCKET;
const UPLOADING_TIME_LIMIT = 30;
const UPLOAD_MAX_FILE_SIZE = 1000000;

const getUrlExtension = (url: string) => {
  return url?.split(/[#?]/)[0]?.split(".")?.pop()?.trim();
};

const createPresignedUrl = async (bookId: string) => {
  return new Promise((resolve, reject) => {
    s3.createPresignedPost(
      {
        Fields: {
          key: `images/${bookId}`,
        },
        Conditions: [
          ["starts-with", "$Content-Type", "image/"],
          ["content-length-range", 0, UPLOAD_MAX_FILE_SIZE],
        ],
        Expires: UPLOADING_TIME_LIMIT,
        Bucket: BUCKET_NAME,
      },
      (err, signed) => {
        if (err) return reject(err);
        resolve(signed);
      }
    );
  });
};

const uploadToS3 = async (imgUrl: string, bookId: string) => {};

export const booksRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ input }) => {
      /**
       * For pagination docs you can have a look here
       * @see https://trpc.io/docs/useInfiniteQuery
       * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
       */
      const limit = input.limit ?? 50;
      const { cursor } = input;

      const items = await prisma.book.findMany({
        // get an extra item at the end which we'll use as next cursor
        take: limit + 1,
        where: { display: true },
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
        orderBy: {
          title: "desc",
        },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        // Remove the last item and use it as next cursor
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const nextItem = items.pop()!;
        nextCursor = nextItem.id;
      }

      return {
        items: items.reverse(),
        nextCursor,
      };
    }),

  getAllWithAuthorsAndGenre: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ input }) => {
      /**
       * For pagination docs you can have a look here
       * @see https://trpc.io/docs/useInfiniteQuery
       * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
       */
      const limit = input.limit ?? 50;
      const { cursor } = input;

      const items = await prisma.book.findMany({
        // get an extra item at the end which we'll use as next cursor
        take: limit + 1,
        where: { display: true },
        include: {
          authors: {
            select: {
              name: true,
            },
          },
          genre: {
            select: {
              name: true,
            },
          },
        },
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
        orderBy: {
          title: "asc",
        },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        // Remove the last item and use it as next cursor
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const nextItem = items.pop()!;
        nextCursor = nextItem.id;
      }

      return {
        items: items.reverse(),
        nextCursor,
      };
    }),

  getAllWithDetails: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ input }) => {
      /**
       * For pagination docs you can have a look here
       * @see https://trpc.io/docs/useInfiniteQuery
       * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
       */
      const limit = input.limit ?? 50;
      const { cursor } = input;

      const items = await prisma.book.findMany({
        // get an extra item at the end which we'll use as next cursor
        take: limit + 1,
        where: { display: true },
        include: {
          authors: true,
          genre: true,
          purchaseLines: true,
          salesLines: {
            include: {
              salesReconciliation: {
                select: {
                  date: true,
                },
              },
            },
          },
          buybackLines: true,
          costMostRecentVendor: {
            include: {
              vendor: true,
              purchaseLine: {
                select: {
                  unitWholesalePrice: true,
                },
              },
            },
          },
        },
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
        orderBy: {
          title: "desc",
        },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        // Remove the last item and use it as next cursor
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const nextItem = items.pop()!;
        nextCursor = nextItem.id;
      }

      return {
        items: items.reverse(),
        nextCursor,
      };
    }),
  getManyFromIsbn13WithDetails: publicProcedure
    .input(
      z.object({
        books: z.array(z.string()).optional(),
      })
    )
    .output(z.array(bookDetailSchema))
    .query(async ({ input }) => {
      if (input.books === undefined) {
        return [];
      }
      const bookList: bookDetail[] = [];
      for (const entry of input.books) {
        const isbn_13 = entry;
        const book = await prisma.book.findFirst({
          where: { isbn_13 },
          include: {
            authors: true,
            genre: true,
          },
        });
        const authorObject = book?.authors;
        const authorList: string[] = [];
        authorObject?.forEach(function (author) {
          authorList.push(author.name);
        });
        const bookTyped: bookDetail = {
          title: book?.title,
          authors: authorList,
          isbn_13: book?.isbn_13,
          isbn_10: book?.isbn_10,
          publisher: book?.publisher,
          publication_year: book?.publicationYear,
          page_count: book?.pageCount,
          height: book?.height,
          width: book?.width,
          thickness: book?.thickness,
          retail_price: book?.retailPrice,
          genre: book?.genre.name,
          inventory_count: book?.inventoryCount,
        };
        bookList.push(bookTyped);
      }
      return bookList;
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;
      const book = await prisma.book.findUnique({
        where: { id },
      });
      if (!book || !book.display) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No book with id '${id}'`,
        });
      }
      return book;
    }),

  getByIdWithAuthorAndGenre: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;
      const book = await prisma.book.findUnique({
        where: { id },
        include: {
          authors: {
            select: {
              name: true,
            },
          },
          genre: {
            select: {
              name: true,
            },
          },
        },
      });
      if (!book || !book.display) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No book with id '${id}'`,
        });
      }
      return book;
    }),

  getByIdWithAllDetails: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;
      const book = await prisma.book.findUnique({
        where: { id },
        include: {
          authors: true,
          genre: true,
          purchaseLines: {
            include: {
              purchaseOrder: {
                include: {
                  vendor: {
                    select: {
                      name: true,
                    },
                  },
                  user: true,
                },
              },
            },
          },
          salesLines: {
            include: {
              salesReconciliation: true,
            },
          },
          buybackLines: {
            include: {
              buybackOrder: {
                include: {
                  vendor: {
                    select: {
                      name: true,
                    },
                  },
                  user: true,
                },
              },
            },
          },
          costMostRecentVendor: {
            include: {
              vendor: true,
              purchaseLine: {
                select: {
                  unitWholesalePrice: true,
                },
              },
            },
          },
          correction: {
            include: {
              user: true,
            },
          },
          relatedBooks: {
            include: {
              authors: true,
              genre: true,
            },
          },
        },
      });
      if (!book || !book.display) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No book with id '${id}'`,
        });
      }
      return book;
    }),

  /**
   *  id                String @id @default(cuid())
   *  title            String
   *  authors          Author[]
   *  isbn_13          String
   *  isbn_10          String?
   *  publisher        String
   *  publicationYear  Int
   *  pageCount          Int
   *  width            Float
   *  height            Float
   *  thickness        Float
   *  retailPrice      Float
   *  genre            Genre @relation(fields: [genreId], references: [lineId])
   *  genreId          String // relation String field
   *  purchaseLines      PurchaseLine[]
   *  saleReconciliationLines SaleLine[]
   *  //to Be determined
   *  inventoryCount    Int
   */

  edit: publicProcedure
    .input(
      z.object({
        id: z.string(),
        retailPrice: z.number().gte(0),
        genreId: z.string(),
        pageCount: z.number().gt(0),
        width: z.number().gte(0),
        height: z.number().gte(0),
        thickness: z.number().gte(0),
      })
    )

    .mutation(async ({ input }) => {
      return await prisma.book.update({
        where: { id: input.id },
        data: {
          retailPrice: input.retailPrice,
          genreId: input.genreId,
          pageCount: input.pageCount,
          width: input.width,
          height: input.height,
          thickness: input.thickness,
          imgUrl: `https://${env.AWS_S3_BUCKET}.s3.amazonaws.com/images/${input.id}`,
        },
      });
    }),

  add: publicProcedure
    .input(
      z.object({
        title: z.string(),
        authors: z.string().array(),
        isbn_13: z.string().length(13),
        isbn_10: z.string().length(10).nullish(),
        publisher: z.string(),
        publicationYear: z.number().int(),
        pageCount: z.number().int(),
        width: z.number().gte(0),
        height: z.number().gte(0),
        thickness: z.number().gte(0),
        retailPrice: z.number().gte(0),
        genreName: z.string(),
        imgUrl: z.string().url(),
        purchaseLines: z.string().array(),
        salesLines: z.string().array(),
        inventoryCount: z.number().int(),
        relatedBooks: z.string().array(),
      })
    )

    //   model Author {
    //   id 				String @id @default(cuid())
    //   name 			String
    //   books 		Book[]

    .mutation(async ({ input }) => {
      // let authorData: { name: string }[];
      // input.authors.forEach((authorName) =>
      //   authorData.push({ name: authorName })
      // );

      const existingGenre = await prisma.genre.findFirst({
        where: {
          name: input.genreName,
        },
      });

      let createdGenre = null;
      if (!existingGenre) {
        createdGenre = await prisma.genre.create({
          data: {
            name: input.genreName,
          },
        });
      }

      const genreId = existingGenre?.id ?? createdGenre?.id;
      if (!genreId)
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: `No genre found`,
        });

      const book = await prisma.book.create({
        data: {
          title: input.title,
          authors: {
            create: [],
          },
          isbn_13: input.isbn_13,
          isbn_10: input.isbn_10,
          publisher: input.publisher,
          publicationYear: input.publicationYear,
          pageCount: input.pageCount,
          width: input.width,
          height: input.height,
          thickness: input.thickness,
          retailPrice: input.retailPrice,
          genreId: genreId,
          imgUrl: input.imgUrl,
          purchaseLines: {
            create: [],
          },
          salesLines: {
            create: [],
          },
          inventoryCount: input.inventoryCount,
          display: true,
        },
      });

      for (const author of input.authors) {
        const ifAuthorExists = await prisma.author.findFirst({
          where: { name: author },
        });

        await prisma.book.update({
          where: { id: book.id },
          data: {
            authors: {
              connectOrCreate: {
                where: {
                  id: ifAuthorExists?.id ?? "",
                },
                create: {
                  name: author,
                },
              },
            },
          },
        });
      }

      const relatedBooksAddedIds = new Set<string>();

      for (const relatedBookId of input.relatedBooks) {
        const relatedBook = await prisma.book.findUnique({
          where: { id: relatedBookId },
          include: {
            relatedBooks: {
              select: { id: true },
            },
          },
        });

        if (!relatedBook) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: `No book with id '${relatedBookId}'`,
          });
        }

        await prisma.book.update({
          where: { id: book.id },
          data: {
            relatedBooks: {
              connect: [{ id: relatedBookId }],
            },
          },
        });
        await prisma.book.update({
          where: { id: relatedBookId },
          data: {
            relatedBooks: {
              connect: [{ id: book.id }],
            },
          },
        });

        relatedBooksAddedIds.add(relatedBookId);

        for (const checkBook of relatedBook.relatedBooks) {
          if (!relatedBooksAddedIds.has(checkBook.id)) {
            await prisma.book.update({
              where: { id: book.id },
              data: {
                relatedBooks: {
                  connect: [{ id: checkBook.id }],
                },
              },
            });

            await prisma.book.update({
              where: { id: checkBook.id },
              data: {
                relatedBooks: {
                  connect: [{ id: book.id }],
                },
              },
            });

            relatedBooksAddedIds.add(checkBook.id);
          }
        }
      }

      fetch(input.imgUrl).then(async (response) => {
        const contentType = response.headers.get("content-type");
        const blob = await response.blob();
        const file = new File([blob], "tempFile.png", {
          type: contentType ? contentType : "image/png",
        });
        if (!file) {
          throw new TRPCError({
            code: "PRECONDITION_FAILED",
            message: `File not found`,
          });
        }
        if (
          file.type !== "image/jpeg" &&
          file.type !== "image/png" &&
          file.type !== "image/jpg"
        ) {
          throw new TRPCError({
            code: "PRECONDITION_FAILED",
            message: `File not an image type`,
          });
        }
        const presignedUrl = (await createPresignedUrl(
          book.id
        )) as S3.PresignedPost;
        const url = presignedUrl.url;
        const fields = presignedUrl.fields;
        const imageData = {
          ...fields,
          "Content-Type": file.type,
          file,
        };
        const formData = new FormData();
        for (const name in imageData) {
          /* eslint-disable */
          // @ts-ignore
          formData.append(name, imageData[name]);
          /*eslint-enable */
        }
        await fetch(url, {
          method: "POST",
          body: formData,
        });

        await prisma.book.update({
          where: { id: book.id },
          data: {
            imgUrl: url,
          },
        });
      });

      console.log("Successfully uploaded image to S3");

      return book;
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const { id } = input;

      const currentBook = await prisma.book.findUnique({
        where: { id },
      });

      if (currentBook?.inventoryCount ?? 1 > 0) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: `Book with id '${id}' has inventory greater than 0`,
        });
      }

      const book = await prisma.book.update({
        where: { id },
        data: {
          display: false,
        },
      });
      if (!book) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No book to delete with id '${id}'`,
        });
      }
      return book;
    }),
});
