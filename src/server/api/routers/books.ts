import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { prisma } from "../../db";
import { TRPCError } from "@trpc/server";
import type { bookDetail } from "../../../schema/books.schema";
import { bookDetailSchema } from "../../../schema/books.schema";
import { env } from "../../../env/server.mjs";
import * as AWS from "aws-sdk";

import { v2 as cloudinary } from "cloudinary";
import {
  BridgeBookSchema,
  BridgeResponseSchema,
  convertBridgeBookToBook,
} from "./bridge";
// Configuration
cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

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

async function getAllDetailsById(id: string) {
  const internalBook = await prisma.book.findUnique({
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
          salesReconciliation: {
            include: {
              user: true,
            },
          },
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
  if (!internalBook || !internalBook.display) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `No book with id '${id}'`,
    });
  }
  return internalBook;
}

async function getSingleBookFromSubsidiaryByIsbn(isbn13: string) {
  return await fetch(env.SUBSIDIARY_RETRIEVE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isbns: [isbn13] }),
  })
    .then((response) => {
      // if (!response.ok) {
      //   console.log(response.json());
      //   throw new TRPCError({
      //     code: "INTERNAL_SERVER_ERROR",
      //     message: "Could not obtain remote book details",
      //   });
      // }
      return response.json();
    })
    .then((response) => {
      console.log("Obtained response from subsidiary");
      const remoteBookResponse = BridgeResponseSchema.safeParse(response);
      if (!remoteBookResponse.success) {
        console.error(remoteBookResponse);
        console.error(
          `Could not obtain remote book details for ISBN ${isbn13}`
        );
        return null;
      } else {
        const remoteBookDetails = BridgeBookSchema.safeParse(
          remoteBookResponse.data[isbn13]
        );
        if (!remoteBookDetails.success) {
          console.error(`Could not parse remote book details`);
          return null;
        }
        return convertBridgeBookToBook(remoteBookDetails.data);
      }
    });
}

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
          relatedBooks: true,
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

  getAllWithDetailsAndSubsidiary: publicProcedure
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

      const internalBooks = await prisma.book.findMany({
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
          relatedBooks: true,
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
      if (internalBooks.length > limit) {
        // Remove the last item and use it as next cursor
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const nextItem = internalBooks.pop()!;
        nextCursor = nextItem.id;
      }

      // return await fetch(env.SUBSIDIARY_RETRIEVE_URL, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ isbns: [isbn13] }),
      // })

      const internalIsbn13s = internalBooks.map((book) => book.isbn_13);
      const postObject = JSON.stringify({ isbns: internalIsbn13s });
      console.log(postObject);
      const remoteBooks = await fetch(env.SUBSIDIARY_RETRIEVE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isbns: internalIsbn13s }),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log("Obtained response from subsidiary");
          const remoteBookResponse = BridgeResponseSchema.safeParse(response);
          if (!remoteBookResponse.success) {
            console.error(response);
            console.error(`Could not obtain remote books`);
            return;
          } else {
            return Object.values(remoteBookResponse.data).map((book) => {
              try {
                const remoteBookDetails = BridgeBookSchema.safeParse(book);
                if (!remoteBookDetails.success) {
                  console.error(`Could not parse remote book details`);
                  return;
                }
                return convertBridgeBookToBook(remoteBookDetails.data);
              } catch (err) {
                return;
              }
            });
          }
        });

      const allBooks = internalBooks.reverse().map((book) => {
        const remoteBook = remoteBooks?.find(
          (remoteBook) => remoteBook?.isbn_13 === book.isbn_13
        );
        if (remoteBook) {
          return {
            ...book,
            ...remoteBook,
          };
        }
        return book;
      });

      return {
        items: allBooks,
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
      const book = await getAllDetailsById(id);
      if (!book || !book.display) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No book with id '${id}'`,
        });
      }
      return book;
    }),

  getByIsbnFromSubsidiary: publicProcedure
    .input(z.object({ isbn13: z.string() }))
    .query(async ({ input }) => {
      const { isbn13 } = input;
      return await getSingleBookFromSubsidiaryByIsbn(isbn13);
    }),

  getByIdWithAllDetailsAndSubsidiary: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;
      const internalBook = await getAllDetailsById(id);

      const internalIsbn13 = internalBook.isbn_13;
      const remoteBook = await getSingleBookFromSubsidiaryByIsbn(
        internalIsbn13
      );

      return {
        internalBook: internalBook,
        remoteBook: remoteBook,
      };
    }),

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
        imgUrl: z.string(),
      })
    )

    .mutation(async ({ input }) => {
      const currentImgUrl = await prisma.book.findUnique({
        where: { id: input.id },
        select: { imgUrl: true },
      });
      if (!currentImgUrl || !currentImgUrl.imgUrl) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No book with id '${input.id}'`,
        });
      }
      try {
        await cloudinary.uploader.destroy(
          currentImgUrl.imgUrl,
          function (error, result) {
            console.log(result, error);
          }
        );
      } catch (error) {
        console.error("Could not delete existing image from cloudinary", error);
      }

      return await prisma.book.update({
        where: { id: input.id },
        data: {
          retailPrice: input.retailPrice,
          genreId: input.genreId,
          pageCount: input.pageCount,
          width: input.width,
          height: input.height,
          thickness: input.thickness,
          imgUrl: input.imgUrl,
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

      const cloudinaryUpload = await cloudinary.uploader
        .upload(input.imgUrl, { public_id: book.id })
        .then((data) => {
          console.log(data);
          console.log(data.secure_url);
        })
        .catch((err) => {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `Error uploading image to cloudinary`,
          });
        });
      const cloudinaryUrl = cloudinary.url(book.id);

      await prisma.book.update({
        where: { id: book.id },
        data: {
          imgUrl: cloudinaryUrl,
        },
      });

      console.log("Successfully uploaded image to Cloudinary");

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
