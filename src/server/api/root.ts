import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { googleBooksRouter } from "./routers/googleBooks";
import { authorsRouter } from "./routers/authors";
import { booksRouter } from "./routers/books";
import { genresRouter } from "./routers/genres";
import { purchaseLinesRouter } from "./routers/purchaseLines";
import { purchaseOrdersRouter } from "./routers/purchaseOrders";
import { salesLinesRouter } from "./routers/salesLines";
import { salesReconciliationsRouter } from "./routers/salesReconciliations";
import { vendorsRouter } from "./routers/vendors";
import { usersRouter } from "./routers/users";
import { imagesRouter } from "./routers/imageUpload";
import { buybackOrdersRouter } from "./routers/buybackOrders";
import { buybackLinesRouter } from "./routers/buybackLines";
import { csvPortsRouter } from "./routers/csvPorts";
import { bookHookRouter } from "./routers/bookHook";
import { correctionsRouter } from "./routers/corrections";
import { casesRouter } from "./routers/cases";
import { shelvesRouter } from "./routers/shelves";
import { bridgeRouter } from "./routers/bridge";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  authors: authorsRouter,
  bookHook: bookHookRouter,
  books: booksRouter,
  bridge: bridgeRouter,
  buybackOrders: buybackOrdersRouter,
  buybackLines: buybackLinesRouter,
  cases: casesRouter,
  corrections: correctionsRouter,
  genres: genresRouter,
  purchaseLines: purchaseLinesRouter,
  purchaseOrders: purchaseOrdersRouter,
  salesLines: salesLinesRouter,
  salesReconciliations: salesReconciliationsRouter,
  shelves: shelvesRouter,
  vendors: vendorsRouter,
  googleBooks: googleBooksRouter,
  users: usersRouter,
  imageUpload: imagesRouter,
  csvPorts: csvPortsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
