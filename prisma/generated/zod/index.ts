import { z } from "zod";
import * as PrismaClient from "@prisma/client";

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

// PRISMA GENERATED ENUMS
//------------------------------------------------------

export const AccountScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.AccountScalarFieldEnum);

export const AuthorScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.AuthorScalarFieldEnum);

export const BookOnShelfScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.BookOnShelfScalarFieldEnum);

export const BookScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.BookScalarFieldEnum);

export const BuybackLineScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.BuybackLineScalarFieldEnum);

export const BuybackOrderScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.BuybackOrderScalarFieldEnum);

export const CaseScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.CaseScalarFieldEnum);

export const CorrectionScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.CorrectionScalarFieldEnum);

export const CostMostRecentVendorScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.CostMostRecentVendorScalarFieldEnum);

export const ExampleScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.ExampleScalarFieldEnum);

export const GenreScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.GenreScalarFieldEnum);

export const ImageScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.ImageScalarFieldEnum);

export const PurchaseLineScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.PurchaseLineScalarFieldEnum);

export const PurchaseOrderScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.PurchaseOrderScalarFieldEnum);

export const QueryModeSchema = z.nativeEnum(PrismaClient.Prisma.QueryMode);

export const SalesLineScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.SalesLineScalarFieldEnum);

export const SalesReconciliationScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.SalesReconciliationScalarFieldEnum);

export const SessionScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.SessionScalarFieldEnum);

export const ShelfScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.ShelfScalarFieldEnum);

export const SortOrderSchema = z.nativeEnum(PrismaClient.Prisma.SortOrder);

export const TransactionIsolationLevelSchema = z.nativeEnum(PrismaClient.Prisma.TransactionIsolationLevel);

export const UserScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.UserScalarFieldEnum);

export const VendorScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.VendorScalarFieldEnum);

export const VerificationTokenScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.VerificationTokenScalarFieldEnum);

// CUSTOM ENUMS
//------------------------------------------------------

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

// BOOK
//------------------------------------------------------

export const BookSchema = z.object({
  id: z.string().cuid(),
  title: z.string(),
  isbn_13: z.string(),
  isbn_10: z.string().nullish(),
  publisher: z.string(),
  publicationYear: z.number().int(),
  pageCount: z.number().int(),
  width: z.number(),
  height: z.number(),
  thickness: z.number(),
  retailPrice: z.number(),
  genreId: z.string(),
  inventoryCount: z.number().int(),
  display: z.boolean(),
  imgUrl: z.string().nullish(),
});

// GENRE
//------------------------------------------------------

export const GenreSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  display: z.boolean(),
});

// AUTHOR
//------------------------------------------------------

export const AuthorSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  display: z.boolean(),
});

// VENDOR
//------------------------------------------------------

export const VendorSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  buybackRate: z.number(),
  display: z.boolean(),
});

// PURCHASE ORDER
//------------------------------------------------------

export const PurchaseOrderSchema = z.object({
  id: z.string().cuid(),
  date: z.date(),
  userId: z.string().nullish(),
  vendorId: z.string(),
  display: z.boolean(),
});

// PURCHASE LINE
//------------------------------------------------------

export const PurchaseLineSchema = z.object({
  id: z.string().cuid(),
  bookId: z.string(),
  quantity: z.number().int(),
  unitWholesalePrice: z.number(),
  purchaseOrderId: z.string(),
  display: z.boolean(),
});

// SALES RECONCILIATION
//------------------------------------------------------

export const SalesReconciliationSchema = z.object({
  id: z.string().cuid(),
  date: z.date(),
  display: z.boolean(),
});

// SALES LINE
//------------------------------------------------------

export const SalesLineSchema = z.object({
  id: z.string().cuid(),
  bookId: z.string(),
  quantity: z.number().int(),
  unitWholesalePrice: z.number(),
  salesReconciliationId: z.string(),
  display: z.boolean(),
});

// BUYBACK ORDER
//------------------------------------------------------

export const BuybackOrderSchema = z.object({
  id: z.string().cuid(),
  date: z.date(),
  userId: z.string().nullish(),
  vendorId: z.string(),
  display: z.boolean(),
});

// BUYBACK LINE
//------------------------------------------------------

export const BuybackLineSchema = z.object({
  id: z.string().cuid(),
  bookId: z.string(),
  quantity: z.number().int(),
  unitBuybackPrice: z.number(),
  buybackOrderId: z.string(),
  display: z.boolean(),
});

// CORRECTION
//------------------------------------------------------

export const CorrectionSchema = z.object({
  id: z.string().cuid(),
  userId: z.string().nullish(),
  date: z.date(),
  bookId: z.string(),
  quantity: z.number().int(),
});

// COST MOST RECENT VENDOR
//------------------------------------------------------

export const CostMostRecentVendorSchema = z.object({
  id: z.string().cuid(),
  bookId: z.string(),
  vendorId: z.string(),
  purchaseLineId: z.string(),
  purchaseOrderId: z.string(),
});

// CASE
//------------------------------------------------------

export const CaseSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  creatorId: z.string(),
  editorId: z.string(),
  editedAt: z.date(),
  width: z.number(),
  shelfCount: z.number().int(),
});

// SHELF
//------------------------------------------------------

export const ShelfSchema = z.object({
  id: z.string().cuid(),
  caseId: z.string(),
  spaceUsed: z.number(),
});

// BOOK ON SHELF
//------------------------------------------------------

export const BookOnShelfSchema = z.object({
  id: z.string().cuid(),
  bookId: z.string(),
  shelfId: z.string(),
  orientation: z.string(),
});

// EXAMPLE
//------------------------------------------------------

export const ExampleSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// ACCOUNT
//------------------------------------------------------

export const AccountSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullish(),
  access_token: z.string().nullish(),
  expires_at: z.number().int().nullish(),
  token_type: z.string().nullish(),
  scope: z.string().nullish(),
  id_token: z.string().nullish(),
  session_state: z.string().nullish(),
});

// SESSION
//------------------------------------------------------

export const SessionSchema = z.object({
  id: z.string().cuid(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.date(),
});

// USER
//------------------------------------------------------

export const UserSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  password: z.string(),
  role: z.string(),
  display: z.boolean(),
});

// VERIFICATION TOKEN
//------------------------------------------------------

export const VerificationTokenSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.date(),
});

// IMAGE
//------------------------------------------------------

export const ImageSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
});

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// BOOK
//------------------------------------------------------

export const BookArgsSchema: z.ZodType<PrismaClient.Prisma.BookArgs> = z.object({
  select: z.lazy(() => BookSelectSchema).optional(),
  include: z.lazy(() => BookIncludeSchema).optional(),
}).strict();

export const BookIncludeSchema: z.ZodType<PrismaClient.Prisma.BookInclude> = z.object({
  authors: z.union([z.boolean(), z.lazy(() => AuthorFindManyArgsSchema)]).optional(),
  genre: z.union([z.boolean(), z.lazy(() => GenreArgsSchema)]).optional(),
  purchaseLines: z.union([z.boolean(), z.lazy(() => PurchaseLineFindManyArgsSchema)]).optional(),
  salesLines: z.union([z.boolean(), z.lazy(() => SalesLineFindManyArgsSchema)]).optional(),
  buybackLines: z.union([z.boolean(), z.lazy(() => BuybackLineFindManyArgsSchema)]).optional(),
  costMostRecentVendor: z.union([z.boolean(), z.lazy(() => CostMostRecentVendorFindManyArgsSchema)]).optional(),
  correction: z.union([z.boolean(), z.lazy(() => CorrectionFindManyArgsSchema)]).optional(),
  relatedBooks: z.union([z.boolean(), z.lazy(() => BookFindManyArgsSchema)]).optional(),
  symmetricRelatedBooks: z.union([z.boolean(), z.lazy(() => BookFindManyArgsSchema)]).optional(),
<<<<<<< HEAD
  booksOnShelves: z.union([z.boolean(), z.lazy(() => BookOnShelfFindManyArgsSchema)]).optional(),
=======
  shelves: z.union([z.boolean(), z.lazy(() => ShelfFindManyArgsSchema)]).optional(),
>>>>>>> tempCaseDesignerBranch
  _count: z.union([z.boolean(), z.lazy(() => BookCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const BookCountOutputTypeArgsSchema: z.ZodType<PrismaClient.Prisma.BookCountOutputTypeArgs> = z.object({
  select: z.lazy(() => BookCountOutputTypeSelectSchema).nullish(),
}).strict();

export const BookCountOutputTypeSelectSchema: z.ZodType<PrismaClient.Prisma.BookCountOutputTypeSelect> = z.object({
  authors: z.boolean().optional(),
  purchaseLines: z.boolean().optional(),
  salesLines: z.boolean().optional(),
  buybackLines: z.boolean().optional(),
  costMostRecentVendor: z.boolean().optional(),
  correction: z.boolean().optional(),
  relatedBooks: z.boolean().optional(),
  symmetricRelatedBooks: z.boolean().optional(),
<<<<<<< HEAD
  booksOnShelves: z.boolean().optional(),
=======
  shelves: z.boolean().optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const BookSelectSchema: z.ZodType<PrismaClient.Prisma.BookSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  isbn_13: z.boolean().optional(),
  isbn_10: z.boolean().optional(),
  publisher: z.boolean().optional(),
  publicationYear: z.boolean().optional(),
  pageCount: z.boolean().optional(),
  width: z.boolean().optional(),
  height: z.boolean().optional(),
  thickness: z.boolean().optional(),
  retailPrice: z.boolean().optional(),
  genreId: z.boolean().optional(),
  inventoryCount: z.boolean().optional(),
  display: z.boolean().optional(),
  imgUrl: z.boolean().optional(),
  authors: z.union([z.boolean(), z.lazy(() => AuthorFindManyArgsSchema)]).optional(),
  genre: z.union([z.boolean(), z.lazy(() => GenreArgsSchema)]).optional(),
  purchaseLines: z.union([z.boolean(), z.lazy(() => PurchaseLineFindManyArgsSchema)]).optional(),
  salesLines: z.union([z.boolean(), z.lazy(() => SalesLineFindManyArgsSchema)]).optional(),
  buybackLines: z.union([z.boolean(), z.lazy(() => BuybackLineFindManyArgsSchema)]).optional(),
  costMostRecentVendor: z.union([z.boolean(), z.lazy(() => CostMostRecentVendorFindManyArgsSchema)]).optional(),
  correction: z.union([z.boolean(), z.lazy(() => CorrectionFindManyArgsSchema)]).optional(),
  relatedBooks: z.union([z.boolean(), z.lazy(() => BookFindManyArgsSchema)]).optional(),
  symmetricRelatedBooks: z.union([z.boolean(), z.lazy(() => BookFindManyArgsSchema)]).optional(),
<<<<<<< HEAD
  booksOnShelves: z.union([z.boolean(), z.lazy(() => BookOnShelfFindManyArgsSchema)]).optional(),
=======
  shelves: z.union([z.boolean(), z.lazy(() => ShelfFindManyArgsSchema)]).optional(),
>>>>>>> tempCaseDesignerBranch
  _count: z.union([z.boolean(), z.lazy(() => BookCountOutputTypeArgsSchema)]).optional(),
}).strict();

// GENRE
//------------------------------------------------------

export const GenreArgsSchema: z.ZodType<PrismaClient.Prisma.GenreArgs> = z.object({
  select: z.lazy(() => GenreSelectSchema).optional(),
  include: z.lazy(() => GenreIncludeSchema).optional(),
}).strict();

export const GenreIncludeSchema: z.ZodType<PrismaClient.Prisma.GenreInclude> = z.object({
  books: z.union([z.boolean(), z.lazy(() => BookFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => GenreCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const GenreCountOutputTypeArgsSchema: z.ZodType<PrismaClient.Prisma.GenreCountOutputTypeArgs> = z.object({
  select: z.lazy(() => GenreCountOutputTypeSelectSchema).nullish(),
}).strict();

export const GenreCountOutputTypeSelectSchema: z.ZodType<PrismaClient.Prisma.GenreCountOutputTypeSelect> = z.object({
  books: z.boolean().optional(),
}).strict();

export const GenreSelectSchema: z.ZodType<PrismaClient.Prisma.GenreSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  display: z.boolean().optional(),
  books: z.union([z.boolean(), z.lazy(() => BookFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => GenreCountOutputTypeArgsSchema)]).optional(),
}).strict();

// AUTHOR
//------------------------------------------------------

export const AuthorArgsSchema: z.ZodType<PrismaClient.Prisma.AuthorArgs> = z.object({
  select: z.lazy(() => AuthorSelectSchema).optional(),
  include: z.lazy(() => AuthorIncludeSchema).optional(),
}).strict();

export const AuthorIncludeSchema: z.ZodType<PrismaClient.Prisma.AuthorInclude> = z.object({
  books: z.union([z.boolean(), z.lazy(() => BookFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => AuthorCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const AuthorCountOutputTypeArgsSchema: z.ZodType<PrismaClient.Prisma.AuthorCountOutputTypeArgs> = z.object({
  select: z.lazy(() => AuthorCountOutputTypeSelectSchema).nullish(),
}).strict();

export const AuthorCountOutputTypeSelectSchema: z.ZodType<PrismaClient.Prisma.AuthorCountOutputTypeSelect> = z.object({
  books: z.boolean().optional(),
}).strict();

export const AuthorSelectSchema: z.ZodType<PrismaClient.Prisma.AuthorSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  display: z.boolean().optional(),
  books: z.union([z.boolean(), z.lazy(() => BookFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => AuthorCountOutputTypeArgsSchema)]).optional(),
}).strict();

// VENDOR
//------------------------------------------------------

export const VendorArgsSchema: z.ZodType<PrismaClient.Prisma.VendorArgs> = z.object({
  select: z.lazy(() => VendorSelectSchema).optional(),
  include: z.lazy(() => VendorIncludeSchema).optional(),
}).strict();

export const VendorIncludeSchema: z.ZodType<PrismaClient.Prisma.VendorInclude> = z.object({
  purchaseOrder: z.union([z.boolean(), z.lazy(() => PurchaseOrderFindManyArgsSchema)]).optional(),
  buybackOrders: z.union([z.boolean(), z.lazy(() => BuybackOrderFindManyArgsSchema)]).optional(),
  costMostRecentVendor: z.union([z.boolean(), z.lazy(() => CostMostRecentVendorFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => VendorCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const VendorCountOutputTypeArgsSchema: z.ZodType<PrismaClient.Prisma.VendorCountOutputTypeArgs> = z.object({
  select: z.lazy(() => VendorCountOutputTypeSelectSchema).nullish(),
}).strict();

export const VendorCountOutputTypeSelectSchema: z.ZodType<PrismaClient.Prisma.VendorCountOutputTypeSelect> = z.object({
  purchaseOrder: z.boolean().optional(),
  buybackOrders: z.boolean().optional(),
  costMostRecentVendor: z.boolean().optional(),
}).strict();

export const VendorSelectSchema: z.ZodType<PrismaClient.Prisma.VendorSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  buybackRate: z.boolean().optional(),
  display: z.boolean().optional(),
  purchaseOrder: z.union([z.boolean(), z.lazy(() => PurchaseOrderFindManyArgsSchema)]).optional(),
  buybackOrders: z.union([z.boolean(), z.lazy(() => BuybackOrderFindManyArgsSchema)]).optional(),
  costMostRecentVendor: z.union([z.boolean(), z.lazy(() => CostMostRecentVendorFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => VendorCountOutputTypeArgsSchema)]).optional(),
}).strict();

// PURCHASE ORDER
//------------------------------------------------------

export const PurchaseOrderArgsSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderArgs> = z.object({
  select: z.lazy(() => PurchaseOrderSelectSchema).optional(),
  include: z.lazy(() => PurchaseOrderIncludeSchema).optional(),
}).strict();

export const PurchaseOrderIncludeSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderInclude> = z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  vendor: z.union([z.boolean(), z.lazy(() => VendorArgsSchema)]).optional(),
  purchaseLines: z.union([z.boolean(), z.lazy(() => PurchaseLineFindManyArgsSchema)]).optional(),
  costMostRecentVendor: z.union([z.boolean(), z.lazy(() => CostMostRecentVendorFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => PurchaseOrderCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const PurchaseOrderCountOutputTypeArgsSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderCountOutputTypeArgs> = z.object({
  select: z.lazy(() => PurchaseOrderCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PurchaseOrderCountOutputTypeSelectSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderCountOutputTypeSelect> = z.object({
  purchaseLines: z.boolean().optional(),
  costMostRecentVendor: z.boolean().optional(),
}).strict();

export const PurchaseOrderSelectSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderSelect> = z.object({
  id: z.boolean().optional(),
  date: z.boolean().optional(),
  userId: z.boolean().optional(),
  vendorId: z.boolean().optional(),
  display: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  vendor: z.union([z.boolean(), z.lazy(() => VendorArgsSchema)]).optional(),
  purchaseLines: z.union([z.boolean(), z.lazy(() => PurchaseLineFindManyArgsSchema)]).optional(),
  costMostRecentVendor: z.union([z.boolean(), z.lazy(() => CostMostRecentVendorFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => PurchaseOrderCountOutputTypeArgsSchema)]).optional(),
}).strict();

// PURCHASE LINE
//------------------------------------------------------

export const PurchaseLineArgsSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineArgs> = z.object({
  select: z.lazy(() => PurchaseLineSelectSchema).optional(),
  include: z.lazy(() => PurchaseLineIncludeSchema).optional(),
}).strict();

export const PurchaseLineIncludeSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineInclude> = z.object({
  book: z.union([z.boolean(), z.lazy(() => BookArgsSchema)]).optional(),
  purchaseOrder: z.union([z.boolean(), z.lazy(() => PurchaseOrderArgsSchema)]).optional(),
  costMostRecentVendor: z.union([z.boolean(), z.lazy(() => CostMostRecentVendorArgsSchema)]).optional(),
}).strict();

export const PurchaseLineSelectSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineSelect> = z.object({
  id: z.boolean().optional(),
  bookId: z.boolean().optional(),
  quantity: z.boolean().optional(),
  unitWholesalePrice: z.boolean().optional(),
  purchaseOrderId: z.boolean().optional(),
  display: z.boolean().optional(),
  book: z.union([z.boolean(), z.lazy(() => BookArgsSchema)]).optional(),
  purchaseOrder: z.union([z.boolean(), z.lazy(() => PurchaseOrderArgsSchema)]).optional(),
  costMostRecentVendor: z.union([z.boolean(), z.lazy(() => CostMostRecentVendorArgsSchema)]).optional(),
}).strict();

// SALES RECONCILIATION
//------------------------------------------------------

export const SalesReconciliationArgsSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationArgs> = z.object({
  select: z.lazy(() => SalesReconciliationSelectSchema).optional(),
  include: z.lazy(() => SalesReconciliationIncludeSchema).optional(),
}).strict();

export const SalesReconciliationIncludeSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationInclude> = z.object({
  salesLines: z.union([z.boolean(), z.lazy(() => SalesLineFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => SalesReconciliationCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const SalesReconciliationCountOutputTypeArgsSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationCountOutputTypeArgs> = z.object({
  select: z.lazy(() => SalesReconciliationCountOutputTypeSelectSchema).nullish(),
}).strict();

export const SalesReconciliationCountOutputTypeSelectSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationCountOutputTypeSelect> = z.object({
  salesLines: z.boolean().optional(),
}).strict();

export const SalesReconciliationSelectSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationSelect> = z.object({
  id: z.boolean().optional(),
  date: z.boolean().optional(),
  display: z.boolean().optional(),
  salesLines: z.union([z.boolean(), z.lazy(() => SalesLineFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => SalesReconciliationCountOutputTypeArgsSchema)]).optional(),
}).strict();

// SALES LINE
//------------------------------------------------------

export const SalesLineArgsSchema: z.ZodType<PrismaClient.Prisma.SalesLineArgs> = z.object({
  select: z.lazy(() => SalesLineSelectSchema).optional(),
  include: z.lazy(() => SalesLineIncludeSchema).optional(),
}).strict();

export const SalesLineIncludeSchema: z.ZodType<PrismaClient.Prisma.SalesLineInclude> = z.object({
  book: z.union([z.boolean(), z.lazy(() => BookArgsSchema)]).optional(),
  salesReconciliation: z.union([z.boolean(), z.lazy(() => SalesReconciliationArgsSchema)]).optional(),
}).strict();

export const SalesLineSelectSchema: z.ZodType<PrismaClient.Prisma.SalesLineSelect> = z.object({
  id: z.boolean().optional(),
  bookId: z.boolean().optional(),
  quantity: z.boolean().optional(),
  unitWholesalePrice: z.boolean().optional(),
  salesReconciliationId: z.boolean().optional(),
  display: z.boolean().optional(),
  book: z.union([z.boolean(), z.lazy(() => BookArgsSchema)]).optional(),
  salesReconciliation: z.union([z.boolean(), z.lazy(() => SalesReconciliationArgsSchema)]).optional(),
}).strict();

// BUYBACK ORDER
//------------------------------------------------------

export const BuybackOrderArgsSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderArgs> = z.object({
  select: z.lazy(() => BuybackOrderSelectSchema).optional(),
  include: z.lazy(() => BuybackOrderIncludeSchema).optional(),
}).strict();

export const BuybackOrderIncludeSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderInclude> = z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  vendor: z.union([z.boolean(), z.lazy(() => VendorArgsSchema)]).optional(),
  buybackLines: z.union([z.boolean(), z.lazy(() => BuybackLineFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => BuybackOrderCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const BuybackOrderCountOutputTypeArgsSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderCountOutputTypeArgs> = z.object({
  select: z.lazy(() => BuybackOrderCountOutputTypeSelectSchema).nullish(),
}).strict();

export const BuybackOrderCountOutputTypeSelectSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderCountOutputTypeSelect> = z.object({
  buybackLines: z.boolean().optional(),
}).strict();

export const BuybackOrderSelectSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderSelect> = z.object({
  id: z.boolean().optional(),
  date: z.boolean().optional(),
  userId: z.boolean().optional(),
  vendorId: z.boolean().optional(),
  display: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  vendor: z.union([z.boolean(), z.lazy(() => VendorArgsSchema)]).optional(),
  buybackLines: z.union([z.boolean(), z.lazy(() => BuybackLineFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => BuybackOrderCountOutputTypeArgsSchema)]).optional(),
}).strict();

// BUYBACK LINE
//------------------------------------------------------

export const BuybackLineArgsSchema: z.ZodType<PrismaClient.Prisma.BuybackLineArgs> = z.object({
  select: z.lazy(() => BuybackLineSelectSchema).optional(),
  include: z.lazy(() => BuybackLineIncludeSchema).optional(),
}).strict();

export const BuybackLineIncludeSchema: z.ZodType<PrismaClient.Prisma.BuybackLineInclude> = z.object({
  book: z.union([z.boolean(), z.lazy(() => BookArgsSchema)]).optional(),
  buybackOrder: z.union([z.boolean(), z.lazy(() => BuybackOrderArgsSchema)]).optional(),
}).strict();

export const BuybackLineSelectSchema: z.ZodType<PrismaClient.Prisma.BuybackLineSelect> = z.object({
  id: z.boolean().optional(),
  bookId: z.boolean().optional(),
  quantity: z.boolean().optional(),
  unitBuybackPrice: z.boolean().optional(),
  buybackOrderId: z.boolean().optional(),
  display: z.boolean().optional(),
  book: z.union([z.boolean(), z.lazy(() => BookArgsSchema)]).optional(),
  buybackOrder: z.union([z.boolean(), z.lazy(() => BuybackOrderArgsSchema)]).optional(),
}).strict();

// CORRECTION
//------------------------------------------------------

export const CorrectionArgsSchema: z.ZodType<PrismaClient.Prisma.CorrectionArgs> = z.object({
  select: z.lazy(() => CorrectionSelectSchema).optional(),
  include: z.lazy(() => CorrectionIncludeSchema).optional(),
}).strict();

export const CorrectionIncludeSchema: z.ZodType<PrismaClient.Prisma.CorrectionInclude> = z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  book: z.union([z.boolean(), z.lazy(() => BookArgsSchema)]).optional(),
}).strict();

export const CorrectionSelectSchema: z.ZodType<PrismaClient.Prisma.CorrectionSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  date: z.boolean().optional(),
  bookId: z.boolean().optional(),
  quantity: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  book: z.union([z.boolean(), z.lazy(() => BookArgsSchema)]).optional(),
}).strict();

// COST MOST RECENT VENDOR
//------------------------------------------------------

export const CostMostRecentVendorArgsSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorArgs> = z.object({
  select: z.lazy(() => CostMostRecentVendorSelectSchema).optional(),
  include: z.lazy(() => CostMostRecentVendorIncludeSchema).optional(),
}).strict();

export const CostMostRecentVendorIncludeSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorInclude> = z.object({
  book: z.union([z.boolean(), z.lazy(() => BookArgsSchema)]).optional(),
  vendor: z.union([z.boolean(), z.lazy(() => VendorArgsSchema)]).optional(),
  purchaseLine: z.union([z.boolean(), z.lazy(() => PurchaseLineArgsSchema)]).optional(),
  purchaseOrder: z.union([z.boolean(), z.lazy(() => PurchaseOrderArgsSchema)]).optional(),
}).strict();

export const CostMostRecentVendorSelectSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorSelect> = z.object({
  id: z.boolean().optional(),
  bookId: z.boolean().optional(),
  vendorId: z.boolean().optional(),
  purchaseLineId: z.boolean().optional(),
  purchaseOrderId: z.boolean().optional(),
  book: z.union([z.boolean(), z.lazy(() => BookArgsSchema)]).optional(),
  vendor: z.union([z.boolean(), z.lazy(() => VendorArgsSchema)]).optional(),
  purchaseLine: z.union([z.boolean(), z.lazy(() => PurchaseLineArgsSchema)]).optional(),
  purchaseOrder: z.union([z.boolean(), z.lazy(() => PurchaseOrderArgsSchema)]).optional(),
}).strict();

// CASE
//------------------------------------------------------

export const CaseArgsSchema: z.ZodType<PrismaClient.Prisma.CaseArgs> = z.object({
  select: z.lazy(() => CaseSelectSchema).optional(),
  include: z.lazy(() => CaseIncludeSchema).optional(),
}).strict();

export const CaseIncludeSchema: z.ZodType<PrismaClient.Prisma.CaseInclude> = z.object({
  creator: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  editor: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  shelves: z.union([z.boolean(), z.lazy(() => ShelfFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => CaseCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const CaseCountOutputTypeArgsSchema: z.ZodType<PrismaClient.Prisma.CaseCountOutputTypeArgs> = z.object({
  select: z.lazy(() => CaseCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CaseCountOutputTypeSelectSchema: z.ZodType<PrismaClient.Prisma.CaseCountOutputTypeSelect> = z.object({
  shelves: z.boolean().optional(),
}).strict();

export const CaseSelectSchema: z.ZodType<PrismaClient.Prisma.CaseSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  creatorId: z.boolean().optional(),
  editorId: z.boolean().optional(),
  editedAt: z.boolean().optional(),
  width: z.boolean().optional(),
  shelfCount: z.boolean().optional(),
  creator: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  editor: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  shelves: z.union([z.boolean(), z.lazy(() => ShelfFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => CaseCountOutputTypeArgsSchema)]).optional(),
}).strict();

// SHELF
//------------------------------------------------------

export const ShelfArgsSchema: z.ZodType<PrismaClient.Prisma.ShelfArgs> = z.object({
  select: z.lazy(() => ShelfSelectSchema).optional(),
  include: z.lazy(() => ShelfIncludeSchema).optional(),
}).strict();

export const ShelfIncludeSchema: z.ZodType<PrismaClient.Prisma.ShelfInclude> = z.object({
  case: z.union([z.boolean(), z.lazy(() => CaseArgsSchema)]).optional(),
  booksOnShelf: z.union([z.boolean(), z.lazy(() => BookOnShelfFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => ShelfCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const ShelfCountOutputTypeArgsSchema: z.ZodType<PrismaClient.Prisma.ShelfCountOutputTypeArgs> = z.object({
  select: z.lazy(() => ShelfCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ShelfCountOutputTypeSelectSchema: z.ZodType<PrismaClient.Prisma.ShelfCountOutputTypeSelect> = z.object({
  booksOnShelf: z.boolean().optional(),
}).strict();

export const ShelfSelectSchema: z.ZodType<PrismaClient.Prisma.ShelfSelect> = z.object({
  id: z.boolean().optional(),
  caseId: z.boolean().optional(),
  spaceUsed: z.boolean().optional(),
  case: z.union([z.boolean(), z.lazy(() => CaseArgsSchema)]).optional(),
  booksOnShelf: z.union([z.boolean(), z.lazy(() => BookOnShelfFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => ShelfCountOutputTypeArgsSchema)]).optional(),
}).strict();

// BOOK ON SHELF
//------------------------------------------------------

export const BookOnShelfArgsSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfArgs> = z.object({
  select: z.lazy(() => BookOnShelfSelectSchema).optional(),
  include: z.lazy(() => BookOnShelfIncludeSchema).optional(),
}).strict();

export const BookOnShelfIncludeSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfInclude> = z.object({
  book: z.union([z.boolean(), z.lazy(() => BookArgsSchema)]).optional(),
  shelf: z.union([z.boolean(), z.lazy(() => ShelfArgsSchema)]).optional(),
}).strict();

export const BookOnShelfSelectSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfSelect> = z.object({
  id: z.boolean().optional(),
  bookId: z.boolean().optional(),
  shelfId: z.boolean().optional(),
  orientation: z.boolean().optional(),
  book: z.union([z.boolean(), z.lazy(() => BookArgsSchema)]).optional(),
  shelf: z.union([z.boolean(), z.lazy(() => ShelfArgsSchema)]).optional(),
}).strict();

// EXAMPLE
//------------------------------------------------------

export const ExampleSelectSchema: z.ZodType<PrismaClient.Prisma.ExampleSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict();

// ACCOUNT
//------------------------------------------------------

export const AccountArgsSchema: z.ZodType<PrismaClient.Prisma.AccountArgs> = z.object({
  select: z.lazy(() => AccountSelectSchema).optional(),
  include: z.lazy(() => AccountIncludeSchema).optional(),
}).strict();

export const AccountIncludeSchema: z.ZodType<PrismaClient.Prisma.AccountInclude> = z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
}).strict();

export const AccountSelectSchema: z.ZodType<PrismaClient.Prisma.AccountSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  type: z.boolean().optional(),
  provider: z.boolean().optional(),
  providerAccountId: z.boolean().optional(),
  refresh_token: z.boolean().optional(),
  access_token: z.boolean().optional(),
  expires_at: z.boolean().optional(),
  token_type: z.boolean().optional(),
  scope: z.boolean().optional(),
  id_token: z.boolean().optional(),
  session_state: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
}).strict();

// SESSION
//------------------------------------------------------

export const SessionArgsSchema: z.ZodType<PrismaClient.Prisma.SessionArgs> = z.object({
  select: z.lazy(() => SessionSelectSchema).optional(),
  include: z.lazy(() => SessionIncludeSchema).optional(),
}).strict();

export const SessionIncludeSchema: z.ZodType<PrismaClient.Prisma.SessionInclude> = z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
}).strict();

export const SessionSelectSchema: z.ZodType<PrismaClient.Prisma.SessionSelect> = z.object({
  id: z.boolean().optional(),
  sessionToken: z.boolean().optional(),
  userId: z.boolean().optional(),
  expires: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
}).strict();

// USER
//------------------------------------------------------

export const UserArgsSchema: z.ZodType<PrismaClient.Prisma.UserArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserIncludeSchema: z.ZodType<PrismaClient.Prisma.UserInclude> = z.object({
  accounts: z.union([z.boolean(), z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(), z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  Correction: z.union([z.boolean(), z.lazy(() => CorrectionFindManyArgsSchema)]).optional(),
  PurchaseOrder: z.union([z.boolean(), z.lazy(() => PurchaseOrderFindManyArgsSchema)]).optional(),
  BuybackOrder: z.union([z.boolean(), z.lazy(() => BuybackOrderFindManyArgsSchema)]).optional(),
  casesCreated: z.union([z.boolean(), z.lazy(() => CaseFindManyArgsSchema)]).optional(),
  casesLastEdited: z.union([z.boolean(), z.lazy(() => CaseFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<PrismaClient.Prisma.UserCountOutputTypeArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<PrismaClient.Prisma.UserCountOutputTypeSelect> = z.object({
  accounts: z.boolean().optional(),
  sessions: z.boolean().optional(),
  Correction: z.boolean().optional(),
  PurchaseOrder: z.boolean().optional(),
  BuybackOrder: z.boolean().optional(),
  casesCreated: z.boolean().optional(),
  casesLastEdited: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<PrismaClient.Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  password: z.boolean().optional(),
  role: z.boolean().optional(),
  display: z.boolean().optional(),
  accounts: z.union([z.boolean(), z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(), z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  Correction: z.union([z.boolean(), z.lazy(() => CorrectionFindManyArgsSchema)]).optional(),
  PurchaseOrder: z.union([z.boolean(), z.lazy(() => PurchaseOrderFindManyArgsSchema)]).optional(),
  BuybackOrder: z.union([z.boolean(), z.lazy(() => BuybackOrderFindManyArgsSchema)]).optional(),
  casesCreated: z.union([z.boolean(), z.lazy(() => CaseFindManyArgsSchema)]).optional(),
  casesLastEdited: z.union([z.boolean(), z.lazy(() => CaseFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict();

// VERIFICATION TOKEN
//------------------------------------------------------

export const VerificationTokenSelectSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenSelect> = z.object({
  identifier: z.boolean().optional(),
  token: z.boolean().optional(),
  expires: z.boolean().optional(),
}).strict();

// IMAGE
//------------------------------------------------------

export const ImageSelectSchema: z.ZodType<PrismaClient.Prisma.ImageSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
}).strict();

/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const BookWhereInputSchema: z.ZodType<PrismaClient.Prisma.BookWhereInput> = z.object({
  AND: z.union([z.lazy(() => BookWhereInputSchema), z.lazy(() => BookWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => BookWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => BookWhereInputSchema), z.lazy(() => BookWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  title: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  isbn_13: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  isbn_10: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  publisher: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  publicationYear: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
  pageCount: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
  width: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
  height: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
  thickness: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
  retailPrice: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
  genreId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  inventoryCount: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
  display: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
  imgUrl: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  authors: z.lazy(() => AuthorListRelationFilterSchema).optional(),
  genre: z.union([z.lazy(() => GenreRelationFilterSchema), z.lazy(() => GenreWhereInputSchema)]).optional(),
  purchaseLines: z.lazy(() => PurchaseLineListRelationFilterSchema).optional(),
  salesLines: z.lazy(() => SalesLineListRelationFilterSchema).optional(),
  buybackLines: z.lazy(() => BuybackLineListRelationFilterSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorListRelationFilterSchema).optional(),
  correction: z.lazy(() => CorrectionListRelationFilterSchema).optional(),
  relatedBooks: z.lazy(() => BookListRelationFilterSchema).optional(),
  symmetricRelatedBooks: z.lazy(() => BookListRelationFilterSchema).optional(),
<<<<<<< HEAD
  booksOnShelves: z.lazy(() => BookOnShelfListRelationFilterSchema).optional(),
=======
  shelves: z.lazy(() => ShelfListRelationFilterSchema).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const BookOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.BookOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  isbn_13: z.lazy(() => SortOrderSchema).optional(),
  isbn_10: z.lazy(() => SortOrderSchema).optional(),
  publisher: z.lazy(() => SortOrderSchema).optional(),
  publicationYear: z.lazy(() => SortOrderSchema).optional(),
  pageCount: z.lazy(() => SortOrderSchema).optional(),
  width: z.lazy(() => SortOrderSchema).optional(),
  height: z.lazy(() => SortOrderSchema).optional(),
  thickness: z.lazy(() => SortOrderSchema).optional(),
  retailPrice: z.lazy(() => SortOrderSchema).optional(),
  genreId: z.lazy(() => SortOrderSchema).optional(),
  inventoryCount: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
  imgUrl: z.lazy(() => SortOrderSchema).optional(),
  authors: z.lazy(() => AuthorOrderByRelationAggregateInputSchema).optional(),
  genre: z.lazy(() => GenreOrderByWithRelationInputSchema).optional(),
  purchaseLines: z.lazy(() => PurchaseLineOrderByRelationAggregateInputSchema).optional(),
  salesLines: z.lazy(() => SalesLineOrderByRelationAggregateInputSchema).optional(),
  buybackLines: z.lazy(() => BuybackLineOrderByRelationAggregateInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorOrderByRelationAggregateInputSchema).optional(),
  correction: z.lazy(() => CorrectionOrderByRelationAggregateInputSchema).optional(),
  relatedBooks: z.lazy(() => BookOrderByRelationAggregateInputSchema).optional(),
  symmetricRelatedBooks: z.lazy(() => BookOrderByRelationAggregateInputSchema).optional(),
<<<<<<< HEAD
  booksOnShelves: z.lazy(() => BookOnShelfOrderByRelationAggregateInputSchema).optional(),
=======
  shelves: z.lazy(() => ShelfOrderByRelationAggregateInputSchema).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const BookWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.BookWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
}).strict();

export const BookOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.BookOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  isbn_13: z.lazy(() => SortOrderSchema).optional(),
  isbn_10: z.lazy(() => SortOrderSchema).optional(),
  publisher: z.lazy(() => SortOrderSchema).optional(),
  publicationYear: z.lazy(() => SortOrderSchema).optional(),
  pageCount: z.lazy(() => SortOrderSchema).optional(),
  width: z.lazy(() => SortOrderSchema).optional(),
  height: z.lazy(() => SortOrderSchema).optional(),
  thickness: z.lazy(() => SortOrderSchema).optional(),
  retailPrice: z.lazy(() => SortOrderSchema).optional(),
  genreId: z.lazy(() => SortOrderSchema).optional(),
  inventoryCount: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
  imgUrl: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => BookCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => BookAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => BookMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => BookMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => BookSumOrderByAggregateInputSchema).optional(),
}).strict();

export const BookScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.BookScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => BookScalarWhereWithAggregatesInputSchema), z.lazy(() => BookScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => BookScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => BookScalarWhereWithAggregatesInputSchema), z.lazy(() => BookScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  title: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  isbn_13: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  isbn_10: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  publisher: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  publicationYear: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
  pageCount: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
  width: z.union([z.lazy(() => FloatWithAggregatesFilterSchema), z.number()]).optional(),
  height: z.union([z.lazy(() => FloatWithAggregatesFilterSchema), z.number()]).optional(),
  thickness: z.union([z.lazy(() => FloatWithAggregatesFilterSchema), z.number()]).optional(),
  retailPrice: z.union([z.lazy(() => FloatWithAggregatesFilterSchema), z.number()]).optional(),
  genreId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  inventoryCount: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
  display: z.union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()]).optional(),
  imgUrl: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
}).strict();

export const GenreWhereInputSchema: z.ZodType<PrismaClient.Prisma.GenreWhereInput> = z.object({
  AND: z.union([z.lazy(() => GenreWhereInputSchema), z.lazy(() => GenreWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => GenreWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => GenreWhereInputSchema), z.lazy(() => GenreWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  display: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
  books: z.lazy(() => BookListRelationFilterSchema).optional(),
}).strict();

export const GenreOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.GenreOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
  books: z.lazy(() => BookOrderByRelationAggregateInputSchema).optional(),
}).strict();

export const GenreWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.GenreWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
}).strict();

export const GenreOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.GenreOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => GenreCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => GenreMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => GenreMinOrderByAggregateInputSchema).optional(),
}).strict();

export const GenreScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.GenreScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => GenreScalarWhereWithAggregatesInputSchema), z.lazy(() => GenreScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => GenreScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => GenreScalarWhereWithAggregatesInputSchema), z.lazy(() => GenreScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  display: z.union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()]).optional(),
}).strict();

export const AuthorWhereInputSchema: z.ZodType<PrismaClient.Prisma.AuthorWhereInput> = z.object({
  AND: z.union([z.lazy(() => AuthorWhereInputSchema), z.lazy(() => AuthorWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => AuthorWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => AuthorWhereInputSchema), z.lazy(() => AuthorWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  display: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
  books: z.lazy(() => BookListRelationFilterSchema).optional(),
}).strict();

export const AuthorOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.AuthorOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
  books: z.lazy(() => BookOrderByRelationAggregateInputSchema).optional(),
}).strict();

export const AuthorWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.AuthorWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
}).strict();

export const AuthorOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.AuthorOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AuthorCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AuthorMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AuthorMinOrderByAggregateInputSchema).optional(),
}).strict();

export const AuthorScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.AuthorScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => AuthorScalarWhereWithAggregatesInputSchema), z.lazy(() => AuthorScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => AuthorScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => AuthorScalarWhereWithAggregatesInputSchema), z.lazy(() => AuthorScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  display: z.union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()]).optional(),
}).strict();

export const VendorWhereInputSchema: z.ZodType<PrismaClient.Prisma.VendorWhereInput> = z.object({
  AND: z.union([z.lazy(() => VendorWhereInputSchema), z.lazy(() => VendorWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => VendorWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => VendorWhereInputSchema), z.lazy(() => VendorWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  buybackRate: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
  display: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
  purchaseOrder: z.lazy(() => PurchaseOrderListRelationFilterSchema).optional(),
  buybackOrders: z.lazy(() => BuybackOrderListRelationFilterSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorListRelationFilterSchema).optional(),
}).strict();

export const VendorOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.VendorOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  buybackRate: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
  purchaseOrder: z.lazy(() => PurchaseOrderOrderByRelationAggregateInputSchema).optional(),
  buybackOrders: z.lazy(() => BuybackOrderOrderByRelationAggregateInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorOrderByRelationAggregateInputSchema).optional(),
}).strict();

export const VendorWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.VendorWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
}).strict();

export const VendorOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.VendorOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  buybackRate: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => VendorCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => VendorAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VendorMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VendorMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => VendorSumOrderByAggregateInputSchema).optional(),
}).strict();

export const VendorScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.VendorScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => VendorScalarWhereWithAggregatesInputSchema), z.lazy(() => VendorScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => VendorScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => VendorScalarWhereWithAggregatesInputSchema), z.lazy(() => VendorScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  buybackRate: z.union([z.lazy(() => FloatWithAggregatesFilterSchema), z.number()]).optional(),
  display: z.union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()]).optional(),
}).strict();

export const PurchaseOrderWhereInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderWhereInput> = z.object({
  AND: z.union([z.lazy(() => PurchaseOrderWhereInputSchema), z.lazy(() => PurchaseOrderWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => PurchaseOrderWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => PurchaseOrderWhereInputSchema), z.lazy(() => PurchaseOrderWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  date: z.union([z.lazy(() => DateTimeFilterSchema), z.date()]).optional(),
  userId: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  vendorId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  display: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
  user: z.union([z.lazy(() => UserRelationFilterSchema), z.lazy(() => UserWhereInputSchema)]).optional().nullable(),
  vendor: z.union([z.lazy(() => VendorRelationFilterSchema), z.lazy(() => VendorWhereInputSchema)]).optional(),
  purchaseLines: z.lazy(() => PurchaseLineListRelationFilterSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorListRelationFilterSchema).optional(),
}).strict();

export const PurchaseOrderOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  vendorId: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  vendor: z.lazy(() => VendorOrderByWithRelationInputSchema).optional(),
  purchaseLines: z.lazy(() => PurchaseLineOrderByRelationAggregateInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorOrderByRelationAggregateInputSchema).optional(),
}).strict();

export const PurchaseOrderWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
}).strict();

export const PurchaseOrderOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  vendorId: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PurchaseOrderCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PurchaseOrderMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PurchaseOrderMinOrderByAggregateInputSchema).optional(),
}).strict();

export const PurchaseOrderScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => PurchaseOrderScalarWhereWithAggregatesInputSchema), z.lazy(() => PurchaseOrderScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => PurchaseOrderScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => PurchaseOrderScalarWhereWithAggregatesInputSchema), z.lazy(() => PurchaseOrderScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  date: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.date()]).optional(),
  userId: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  vendorId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  display: z.union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()]).optional(),
}).strict();

export const PurchaseLineWhereInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineWhereInput> = z.object({
  AND: z.union([z.lazy(() => PurchaseLineWhereInputSchema), z.lazy(() => PurchaseLineWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => PurchaseLineWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => PurchaseLineWhereInputSchema), z.lazy(() => PurchaseLineWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  bookId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  quantity: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
  unitWholesalePrice: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
  purchaseOrderId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  display: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
  book: z.union([z.lazy(() => BookRelationFilterSchema), z.lazy(() => BookWhereInputSchema)]).optional(),
  purchaseOrder: z.union([z.lazy(() => PurchaseOrderRelationFilterSchema), z.lazy(() => PurchaseOrderWhereInputSchema)]).optional(),
  costMostRecentVendor: z.union([z.lazy(() => CostMostRecentVendorRelationFilterSchema), z.lazy(() => CostMostRecentVendorWhereInputSchema)]).optional().nullable(),
}).strict();

export const PurchaseLineOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bookId: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  unitWholesalePrice: z.lazy(() => SortOrderSchema).optional(),
  purchaseOrderId: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
  book: z.lazy(() => BookOrderByWithRelationInputSchema).optional(),
  purchaseOrder: z.lazy(() => PurchaseOrderOrderByWithRelationInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorOrderByWithRelationInputSchema).optional(),
}).strict();

export const PurchaseLineWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
}).strict();

export const PurchaseLineOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bookId: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  unitWholesalePrice: z.lazy(() => SortOrderSchema).optional(),
  purchaseOrderId: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PurchaseLineCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PurchaseLineAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PurchaseLineMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PurchaseLineMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PurchaseLineSumOrderByAggregateInputSchema).optional(),
}).strict();

export const PurchaseLineScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => PurchaseLineScalarWhereWithAggregatesInputSchema), z.lazy(() => PurchaseLineScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => PurchaseLineScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => PurchaseLineScalarWhereWithAggregatesInputSchema), z.lazy(() => PurchaseLineScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  bookId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  quantity: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
  unitWholesalePrice: z.union([z.lazy(() => FloatWithAggregatesFilterSchema), z.number()]).optional(),
  purchaseOrderId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  display: z.union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()]).optional(),
}).strict();

export const SalesReconciliationWhereInputSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationWhereInput> = z.object({
  AND: z.union([z.lazy(() => SalesReconciliationWhereInputSchema), z.lazy(() => SalesReconciliationWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => SalesReconciliationWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => SalesReconciliationWhereInputSchema), z.lazy(() => SalesReconciliationWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  date: z.union([z.lazy(() => DateTimeFilterSchema), z.date()]).optional(),
  display: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
  salesLines: z.lazy(() => SalesLineListRelationFilterSchema).optional(),
}).strict();

export const SalesReconciliationOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
  salesLines: z.lazy(() => SalesLineOrderByRelationAggregateInputSchema).optional(),
}).strict();

export const SalesReconciliationWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
}).strict();

export const SalesReconciliationOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SalesReconciliationCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SalesReconciliationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SalesReconciliationMinOrderByAggregateInputSchema).optional(),
}).strict();

export const SalesReconciliationScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => SalesReconciliationScalarWhereWithAggregatesInputSchema), z.lazy(() => SalesReconciliationScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => SalesReconciliationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => SalesReconciliationScalarWhereWithAggregatesInputSchema), z.lazy(() => SalesReconciliationScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  date: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.date()]).optional(),
  display: z.union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()]).optional(),
}).strict();

export const SalesLineWhereInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineWhereInput> = z.object({
  AND: z.union([z.lazy(() => SalesLineWhereInputSchema), z.lazy(() => SalesLineWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => SalesLineWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => SalesLineWhereInputSchema), z.lazy(() => SalesLineWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  bookId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  quantity: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
  unitWholesalePrice: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
  salesReconciliationId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  display: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
  book: z.union([z.lazy(() => BookRelationFilterSchema), z.lazy(() => BookWhereInputSchema)]).optional(),
  salesReconciliation: z.union([z.lazy(() => SalesReconciliationRelationFilterSchema), z.lazy(() => SalesReconciliationWhereInputSchema)]).optional(),
}).strict();

export const SalesLineOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bookId: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  unitWholesalePrice: z.lazy(() => SortOrderSchema).optional(),
  salesReconciliationId: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
  book: z.lazy(() => BookOrderByWithRelationInputSchema).optional(),
  salesReconciliation: z.lazy(() => SalesReconciliationOrderByWithRelationInputSchema).optional(),
}).strict();

export const SalesLineWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
}).strict();

export const SalesLineOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bookId: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  unitWholesalePrice: z.lazy(() => SortOrderSchema).optional(),
  salesReconciliationId: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SalesLineCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => SalesLineAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SalesLineMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SalesLineMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => SalesLineSumOrderByAggregateInputSchema).optional(),
}).strict();

export const SalesLineScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => SalesLineScalarWhereWithAggregatesInputSchema), z.lazy(() => SalesLineScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => SalesLineScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => SalesLineScalarWhereWithAggregatesInputSchema), z.lazy(() => SalesLineScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  bookId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  quantity: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
  unitWholesalePrice: z.union([z.lazy(() => FloatWithAggregatesFilterSchema), z.number()]).optional(),
  salesReconciliationId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  display: z.union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()]).optional(),
}).strict();

export const BuybackOrderWhereInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderWhereInput> = z.object({
  AND: z.union([z.lazy(() => BuybackOrderWhereInputSchema), z.lazy(() => BuybackOrderWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => BuybackOrderWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => BuybackOrderWhereInputSchema), z.lazy(() => BuybackOrderWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  date: z.union([z.lazy(() => DateTimeFilterSchema), z.date()]).optional(),
  userId: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  vendorId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  display: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
  user: z.union([z.lazy(() => UserRelationFilterSchema), z.lazy(() => UserWhereInputSchema)]).optional().nullable(),
  vendor: z.union([z.lazy(() => VendorRelationFilterSchema), z.lazy(() => VendorWhereInputSchema)]).optional(),
  buybackLines: z.lazy(() => BuybackLineListRelationFilterSchema).optional(),
}).strict();

export const BuybackOrderOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  vendorId: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  vendor: z.lazy(() => VendorOrderByWithRelationInputSchema).optional(),
  buybackLines: z.lazy(() => BuybackLineOrderByRelationAggregateInputSchema).optional(),
}).strict();

export const BuybackOrderWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
}).strict();

export const BuybackOrderOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  vendorId: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => BuybackOrderCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => BuybackOrderMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => BuybackOrderMinOrderByAggregateInputSchema).optional(),
}).strict();

export const BuybackOrderScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => BuybackOrderScalarWhereWithAggregatesInputSchema), z.lazy(() => BuybackOrderScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => BuybackOrderScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => BuybackOrderScalarWhereWithAggregatesInputSchema), z.lazy(() => BuybackOrderScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  date: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.date()]).optional(),
  userId: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  vendorId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  display: z.union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()]).optional(),
}).strict();

export const BuybackLineWhereInputSchema: z.ZodType<PrismaClient.Prisma.BuybackLineWhereInput> = z.object({
  AND: z.union([z.lazy(() => BuybackLineWhereInputSchema), z.lazy(() => BuybackLineWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => BuybackLineWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => BuybackLineWhereInputSchema), z.lazy(() => BuybackLineWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  bookId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  quantity: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
  unitBuybackPrice: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
  buybackOrderId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  display: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
  book: z.union([z.lazy(() => BookRelationFilterSchema), z.lazy(() => BookWhereInputSchema)]).optional(),
  buybackOrder: z.union([z.lazy(() => BuybackOrderRelationFilterSchema), z.lazy(() => BuybackOrderWhereInputSchema)]).optional(),
}).strict();

export const BuybackLineOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.BuybackLineOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bookId: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  unitBuybackPrice: z.lazy(() => SortOrderSchema).optional(),
  buybackOrderId: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
  book: z.lazy(() => BookOrderByWithRelationInputSchema).optional(),
  buybackOrder: z.lazy(() => BuybackOrderOrderByWithRelationInputSchema).optional(),
}).strict();

export const BuybackLineWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.BuybackLineWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
}).strict();

export const BuybackLineOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.BuybackLineOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bookId: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  unitBuybackPrice: z.lazy(() => SortOrderSchema).optional(),
  buybackOrderId: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => BuybackLineCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => BuybackLineAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => BuybackLineMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => BuybackLineMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => BuybackLineSumOrderByAggregateInputSchema).optional(),
}).strict();

export const BuybackLineScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.BuybackLineScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => BuybackLineScalarWhereWithAggregatesInputSchema), z.lazy(() => BuybackLineScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => BuybackLineScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => BuybackLineScalarWhereWithAggregatesInputSchema), z.lazy(() => BuybackLineScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  bookId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  quantity: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
  unitBuybackPrice: z.union([z.lazy(() => FloatWithAggregatesFilterSchema), z.number()]).optional(),
  buybackOrderId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  display: z.union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()]).optional(),
}).strict();

export const CorrectionWhereInputSchema: z.ZodType<PrismaClient.Prisma.CorrectionWhereInput> = z.object({
  AND: z.union([z.lazy(() => CorrectionWhereInputSchema), z.lazy(() => CorrectionWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => CorrectionWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => CorrectionWhereInputSchema), z.lazy(() => CorrectionWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  date: z.union([z.lazy(() => DateTimeFilterSchema), z.date()]).optional(),
  bookId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  quantity: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
  user: z.union([z.lazy(() => UserRelationFilterSchema), z.lazy(() => UserWhereInputSchema)]).optional().nullable(),
  book: z.union([z.lazy(() => BookRelationFilterSchema), z.lazy(() => BookWhereInputSchema)]).optional(),
}).strict();

export const CorrectionOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.CorrectionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  bookId: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  book: z.lazy(() => BookOrderByWithRelationInputSchema).optional(),
}).strict();

export const CorrectionWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.CorrectionWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
}).strict();

export const CorrectionOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.CorrectionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  bookId: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CorrectionCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CorrectionAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CorrectionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CorrectionMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CorrectionSumOrderByAggregateInputSchema).optional(),
}).strict();

export const CorrectionScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.CorrectionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => CorrectionScalarWhereWithAggregatesInputSchema), z.lazy(() => CorrectionScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => CorrectionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => CorrectionScalarWhereWithAggregatesInputSchema), z.lazy(() => CorrectionScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  date: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.date()]).optional(),
  bookId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  quantity: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
}).strict();

export const CostMostRecentVendorWhereInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorWhereInput> = z.object({
  AND: z.union([z.lazy(() => CostMostRecentVendorWhereInputSchema), z.lazy(() => CostMostRecentVendorWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => CostMostRecentVendorWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => CostMostRecentVendorWhereInputSchema), z.lazy(() => CostMostRecentVendorWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  bookId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  vendorId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  purchaseLineId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  purchaseOrderId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  book: z.union([z.lazy(() => BookRelationFilterSchema), z.lazy(() => BookWhereInputSchema)]).optional(),
  vendor: z.union([z.lazy(() => VendorRelationFilterSchema), z.lazy(() => VendorWhereInputSchema)]).optional(),
  purchaseLine: z.union([z.lazy(() => PurchaseLineRelationFilterSchema), z.lazy(() => PurchaseLineWhereInputSchema)]).optional(),
  purchaseOrder: z.union([z.lazy(() => PurchaseOrderRelationFilterSchema), z.lazy(() => PurchaseOrderWhereInputSchema)]).optional(),
}).strict();

export const CostMostRecentVendorOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bookId: z.lazy(() => SortOrderSchema).optional(),
  vendorId: z.lazy(() => SortOrderSchema).optional(),
  purchaseLineId: z.lazy(() => SortOrderSchema).optional(),
  purchaseOrderId: z.lazy(() => SortOrderSchema).optional(),
  book: z.lazy(() => BookOrderByWithRelationInputSchema).optional(),
  vendor: z.lazy(() => VendorOrderByWithRelationInputSchema).optional(),
  purchaseLine: z.lazy(() => PurchaseLineOrderByWithRelationInputSchema).optional(),
  purchaseOrder: z.lazy(() => PurchaseOrderOrderByWithRelationInputSchema).optional(),
}).strict();

export const CostMostRecentVendorWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  purchaseLineId: z.string().optional(),
  costMostRecentVendorId: z.lazy(() => CostMostRecentVendorCostMostRecentVendorIdCompoundUniqueInputSchema).optional(),
}).strict();

export const CostMostRecentVendorOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bookId: z.lazy(() => SortOrderSchema).optional(),
  vendorId: z.lazy(() => SortOrderSchema).optional(),
  purchaseLineId: z.lazy(() => SortOrderSchema).optional(),
  purchaseOrderId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CostMostRecentVendorCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CostMostRecentVendorMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CostMostRecentVendorMinOrderByAggregateInputSchema).optional(),
}).strict();

export const CostMostRecentVendorScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => CostMostRecentVendorScalarWhereWithAggregatesInputSchema), z.lazy(() => CostMostRecentVendorScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => CostMostRecentVendorScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => CostMostRecentVendorScalarWhereWithAggregatesInputSchema), z.lazy(() => CostMostRecentVendorScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  bookId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  vendorId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  purchaseLineId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  purchaseOrderId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
}).strict();

export const CaseWhereInputSchema: z.ZodType<PrismaClient.Prisma.CaseWhereInput> = z.object({
  AND: z.union([z.lazy(() => CaseWhereInputSchema), z.lazy(() => CaseWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => CaseWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => CaseWhereInputSchema), z.lazy(() => CaseWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  creatorId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  editorId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  editedAt: z.union([z.lazy(() => DateTimeFilterSchema), z.date()]).optional(),
  width: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
  shelfCount: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
  creator: z.union([z.lazy(() => UserRelationFilterSchema), z.lazy(() => UserWhereInputSchema)]).optional(),
  editor: z.union([z.lazy(() => UserRelationFilterSchema), z.lazy(() => UserWhereInputSchema)]).optional(),
  shelves: z.lazy(() => ShelfListRelationFilterSchema).optional(),
}).strict();

export const CaseOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.CaseOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  creatorId: z.lazy(() => SortOrderSchema).optional(),
  editorId: z.lazy(() => SortOrderSchema).optional(),
  editedAt: z.lazy(() => SortOrderSchema).optional(),
  width: z.lazy(() => SortOrderSchema).optional(),
  shelfCount: z.lazy(() => SortOrderSchema).optional(),
  creator: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  editor: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  shelves: z.lazy(() => ShelfOrderByRelationAggregateInputSchema).optional(),
}).strict();

export const CaseWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.CaseWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
}).strict();

export const CaseOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.CaseOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  creatorId: z.lazy(() => SortOrderSchema).optional(),
  editorId: z.lazy(() => SortOrderSchema).optional(),
  editedAt: z.lazy(() => SortOrderSchema).optional(),
  width: z.lazy(() => SortOrderSchema).optional(),
  shelfCount: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CaseCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CaseAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CaseMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CaseMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CaseSumOrderByAggregateInputSchema).optional(),
}).strict();

export const CaseScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.CaseScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => CaseScalarWhereWithAggregatesInputSchema), z.lazy(() => CaseScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => CaseScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => CaseScalarWhereWithAggregatesInputSchema), z.lazy(() => CaseScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  creatorId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  editorId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  editedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.date()]).optional(),
  width: z.union([z.lazy(() => FloatWithAggregatesFilterSchema), z.number()]).optional(),
  shelfCount: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
}).strict();

export const ShelfWhereInputSchema: z.ZodType<PrismaClient.Prisma.ShelfWhereInput> = z.object({
  AND: z.union([z.lazy(() => ShelfWhereInputSchema), z.lazy(() => ShelfWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => ShelfWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => ShelfWhereInputSchema), z.lazy(() => ShelfWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  caseId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  spaceUsed: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
  case: z.union([z.lazy(() => CaseRelationFilterSchema), z.lazy(() => CaseWhereInputSchema)]).optional(),
  booksOnShelf: z.lazy(() => BookOnShelfListRelationFilterSchema).optional(),
}).strict();

export const ShelfOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.ShelfOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  caseId: z.lazy(() => SortOrderSchema).optional(),
  spaceUsed: z.lazy(() => SortOrderSchema).optional(),
  case: z.lazy(() => CaseOrderByWithRelationInputSchema).optional(),
  booksOnShelf: z.lazy(() => BookOnShelfOrderByRelationAggregateInputSchema).optional(),
}).strict();

export const ShelfWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.ShelfWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
}).strict();

export const ShelfOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.ShelfOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  caseId: z.lazy(() => SortOrderSchema).optional(),
  spaceUsed: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ShelfCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ShelfAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ShelfMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ShelfMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ShelfSumOrderByAggregateInputSchema).optional(),
}).strict();

export const ShelfScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.ShelfScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => ShelfScalarWhereWithAggregatesInputSchema), z.lazy(() => ShelfScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => ShelfScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => ShelfScalarWhereWithAggregatesInputSchema), z.lazy(() => ShelfScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  caseId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  spaceUsed: z.union([z.lazy(() => FloatWithAggregatesFilterSchema), z.number()]).optional(),
}).strict();

export const BookOnShelfWhereInputSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfWhereInput> = z.object({
  AND: z.union([z.lazy(() => BookOnShelfWhereInputSchema), z.lazy(() => BookOnShelfWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => BookOnShelfWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => BookOnShelfWhereInputSchema), z.lazy(() => BookOnShelfWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  bookId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  shelfId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  orientation: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  book: z.union([z.lazy(() => BookRelationFilterSchema), z.lazy(() => BookWhereInputSchema)]).optional(),
  shelf: z.union([z.lazy(() => ShelfRelationFilterSchema), z.lazy(() => ShelfWhereInputSchema)]).optional(),
}).strict();

export const BookOnShelfOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bookId: z.lazy(() => SortOrderSchema).optional(),
  shelfId: z.lazy(() => SortOrderSchema).optional(),
  orientation: z.lazy(() => SortOrderSchema).optional(),
  book: z.lazy(() => BookOrderByWithRelationInputSchema).optional(),
  shelf: z.lazy(() => ShelfOrderByWithRelationInputSchema).optional(),
}).strict();

export const BookOnShelfWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
}).strict();

export const BookOnShelfOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bookId: z.lazy(() => SortOrderSchema).optional(),
  shelfId: z.lazy(() => SortOrderSchema).optional(),
  orientation: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => BookOnShelfCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => BookOnShelfMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => BookOnShelfMinOrderByAggregateInputSchema).optional(),
}).strict();

export const BookOnShelfScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => BookOnShelfScalarWhereWithAggregatesInputSchema), z.lazy(() => BookOnShelfScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => BookOnShelfScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => BookOnShelfScalarWhereWithAggregatesInputSchema), z.lazy(() => BookOnShelfScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  bookId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  shelfId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  orientation: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
}).strict();

export const ExampleWhereInputSchema: z.ZodType<PrismaClient.Prisma.ExampleWhereInput> = z.object({
  AND: z.union([z.lazy(() => ExampleWhereInputSchema), z.lazy(() => ExampleWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => ExampleWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => ExampleWhereInputSchema), z.lazy(() => ExampleWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterSchema), z.date()]).optional(),
}).strict();

export const ExampleOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.ExampleOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ExampleWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.ExampleWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
}).strict();

export const ExampleOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.ExampleOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ExampleCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ExampleMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ExampleMinOrderByAggregateInputSchema).optional(),
}).strict();

export const ExampleScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.ExampleScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => ExampleScalarWhereWithAggregatesInputSchema), z.lazy(() => ExampleScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => ExampleScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => ExampleScalarWhereWithAggregatesInputSchema), z.lazy(() => ExampleScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.date()]).optional(),
}).strict();

export const AccountWhereInputSchema: z.ZodType<PrismaClient.Prisma.AccountWhereInput> = z.object({
  AND: z.union([z.lazy(() => AccountWhereInputSchema), z.lazy(() => AccountWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => AccountWhereInputSchema), z.lazy(() => AccountWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  type: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  provider: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  providerAccountId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  refresh_token: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  access_token: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  expires_at: z.union([z.lazy(() => IntNullableFilterSchema), z.number()]).optional().nullable(),
  token_type: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  scope: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  id_token: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  session_state: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  user: z.union([z.lazy(() => UserRelationFilterSchema), z.lazy(() => UserWhereInputSchema)]).optional(),
}).strict();

export const AccountOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.AccountOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
}).strict();

export const AccountWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.AccountWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema).optional(),
}).strict();

export const AccountOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.AccountOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AccountCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AccountAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AccountMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AccountMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AccountSumOrderByAggregateInputSchema).optional(),
}).strict();

export const AccountScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.AccountScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => AccountScalarWhereWithAggregatesInputSchema), z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => AccountScalarWhereWithAggregatesInputSchema), z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  type: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  provider: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  providerAccountId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  refresh_token: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  access_token: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  expires_at: z.union([z.lazy(() => IntNullableWithAggregatesFilterSchema), z.number()]).optional().nullable(),
  token_type: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  scope: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  id_token: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  session_state: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
}).strict();

export const SessionWhereInputSchema: z.ZodType<PrismaClient.Prisma.SessionWhereInput> = z.object({
  AND: z.union([z.lazy(() => SessionWhereInputSchema), z.lazy(() => SessionWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => SessionWhereInputSchema), z.lazy(() => SessionWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  sessionToken: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  expires: z.union([z.lazy(() => DateTimeFilterSchema), z.date()]).optional(),
  user: z.union([z.lazy(() => UserRelationFilterSchema), z.lazy(() => UserWhereInputSchema)]).optional(),
}).strict();

export const SessionOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.SessionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
}).strict();

export const SessionWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.SessionWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string().optional(),
}).strict();

export const SessionOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.SessionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional(),
}).strict();

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.SessionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => SessionScalarWhereWithAggregatesInputSchema), z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => SessionScalarWhereWithAggregatesInputSchema), z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  sessionToken: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  expires: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.date()]).optional(),
}).strict();

export const UserWhereInputSchema: z.ZodType<PrismaClient.Prisma.UserWhereInput> = z.object({
  AND: z.union([z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  password: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  role: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  display: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  Correction: z.lazy(() => CorrectionListRelationFilterSchema).optional(),
  PurchaseOrder: z.lazy(() => PurchaseOrderListRelationFilterSchema).optional(),
  BuybackOrder: z.lazy(() => BuybackOrderListRelationFilterSchema).optional(),
  casesCreated: z.lazy(() => CaseListRelationFilterSchema).optional(),
  casesLastEdited: z.lazy(() => CaseListRelationFilterSchema).optional(),
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
  accounts: z.lazy(() => AccountOrderByRelationAggregateInputSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
  Correction: z.lazy(() => CorrectionOrderByRelationAggregateInputSchema).optional(),
  PurchaseOrder: z.lazy(() => PurchaseOrderOrderByRelationAggregateInputSchema).optional(),
  BuybackOrder: z.lazy(() => BuybackOrderOrderByRelationAggregateInputSchema).optional(),
  casesCreated: z.lazy(() => CaseOrderByRelationAggregateInputSchema).optional(),
  casesLastEdited: z.lazy(() => CaseOrderByRelationAggregateInputSchema).optional(),
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.UserWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
}).strict();

export const UserOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => UserScalarWhereWithAggregatesInputSchema), z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => UserScalarWhereWithAggregatesInputSchema), z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  password: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  role: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  display: z.union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()]).optional(),
}).strict();

export const VerificationTokenWhereInputSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenWhereInput> = z.object({
  AND: z.union([z.lazy(() => VerificationTokenWhereInputSchema), z.lazy(() => VerificationTokenWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => VerificationTokenWhereInputSchema), z.lazy(() => VerificationTokenWhereInputSchema).array()]).optional(),
  identifier: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  token: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  expires: z.union([z.lazy(() => DateTimeFilterSchema), z.date()]).optional(),
}).strict();

export const VerificationTokenOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenOrderByWithRelationInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const VerificationTokenWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenWhereUniqueInput> = z.object({
  token: z.string().optional(),
  identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema).optional(),
}).strict();

export const VerificationTokenOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenOrderByWithAggregationInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => VerificationTokenCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VerificationTokenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VerificationTokenMinOrderByAggregateInputSchema).optional(),
}).strict();

export const VerificationTokenScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema), z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema), z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array()]).optional(),
  identifier: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  token: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  expires: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.date()]).optional(),
}).strict();

export const ImageWhereInputSchema: z.ZodType<PrismaClient.Prisma.ImageWhereInput> = z.object({
  AND: z.union([z.lazy(() => ImageWhereInputSchema), z.lazy(() => ImageWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => ImageWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => ImageWhereInputSchema), z.lazy(() => ImageWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
}).strict();

export const ImageOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.ImageOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ImageWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.ImageWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
}).strict();

export const ImageOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.ImageOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ImageCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ImageMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ImageMinOrderByAggregateInputSchema).optional(),
}).strict();

export const ImageScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.ImageScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => ImageScalarWhereWithAggregatesInputSchema), z.lazy(() => ImageScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => ImageScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => ImageScalarWhereWithAggregatesInputSchema), z.lazy(() => ImageScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
}).strict();

export const BookCreateInputSchema: z.ZodType<PrismaClient.Prisma.BookCreateInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  isbn_13: z.string(),
  isbn_10: z.string().optional().nullable(),
  publisher: z.string(),
  publicationYear: z.number().int(),
  pageCount: z.number().int(),
  width: z.number(),
  height: z.number(),
  thickness: z.number(),
  retailPrice: z.number(),
  inventoryCount: z.number().int(),
  display: z.boolean().optional(),
  imgUrl: z.string().optional().nullable(),
  authors: z.lazy(() => AuthorCreateNestedManyWithoutBooksInputSchema).optional(),
  genre: z.lazy(() => GenreCreateNestedOneWithoutBooksInputSchema),
  purchaseLines: z.lazy(() => PurchaseLineCreateNestedManyWithoutBookInputSchema).optional(),
  salesLines: z.lazy(() => SalesLineCreateNestedManyWithoutBookInputSchema).optional(),
  buybackLines: z.lazy(() => BuybackLineCreateNestedManyWithoutBookInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorCreateNestedManyWithoutBookInputSchema).optional(),
  correction: z.lazy(() => CorrectionCreateNestedManyWithoutBookInputSchema).optional(),
  relatedBooks: z.lazy(() => BookCreateNestedManyWithoutSymmetricRelatedBooksInputSchema).optional(),
  symmetricRelatedBooks: z.lazy(() => BookCreateNestedManyWithoutRelatedBooksInputSchema).optional(),
<<<<<<< HEAD
  booksOnShelves: z.lazy(() => BookOnShelfCreateNestedManyWithoutBookInputSchema).optional(),
=======
  shelves: z.lazy(() => ShelfCreateNestedManyWithoutBooksInputSchema).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const BookUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.BookUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  isbn_13: z.string(),
  isbn_10: z.string().optional().nullable(),
  publisher: z.string(),
  publicationYear: z.number().int(),
  pageCount: z.number().int(),
  width: z.number(),
  height: z.number(),
  thickness: z.number(),
  retailPrice: z.number(),
  genreId: z.string(),
  inventoryCount: z.number().int(),
  display: z.boolean().optional(),
  imgUrl: z.string().optional().nullable(),
  authors: z.lazy(() => AuthorUncheckedCreateNestedManyWithoutBooksInputSchema).optional(),
  purchaseLines: z.lazy(() => PurchaseLineUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  salesLines: z.lazy(() => SalesLineUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  buybackLines: z.lazy(() => BuybackLineUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  correction: z.lazy(() => CorrectionUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  relatedBooks: z.lazy(() => BookUncheckedCreateNestedManyWithoutSymmetricRelatedBooksInputSchema).optional(),
  symmetricRelatedBooks: z.lazy(() => BookUncheckedCreateNestedManyWithoutRelatedBooksInputSchema).optional(),
<<<<<<< HEAD
  booksOnShelves: z.lazy(() => BookOnShelfUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
=======
  shelves: z.lazy(() => ShelfUncheckedCreateNestedManyWithoutBooksInputSchema).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const BookUpdateInputSchema: z.ZodType<PrismaClient.Prisma.BookUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_13: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_10: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  publisher: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  publicationYear: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  pageCount: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  width: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  height: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  thickness: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  retailPrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  inventoryCount: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  imgUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  authors: z.lazy(() => AuthorUpdateManyWithoutBooksNestedInputSchema).optional(),
  genre: z.lazy(() => GenreUpdateOneRequiredWithoutBooksNestedInputSchema).optional(),
  purchaseLines: z.lazy(() => PurchaseLineUpdateManyWithoutBookNestedInputSchema).optional(),
  salesLines: z.lazy(() => SalesLineUpdateManyWithoutBookNestedInputSchema).optional(),
  buybackLines: z.lazy(() => BuybackLineUpdateManyWithoutBookNestedInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUpdateManyWithoutBookNestedInputSchema).optional(),
  correction: z.lazy(() => CorrectionUpdateManyWithoutBookNestedInputSchema).optional(),
  relatedBooks: z.lazy(() => BookUpdateManyWithoutSymmetricRelatedBooksNestedInputSchema).optional(),
  symmetricRelatedBooks: z.lazy(() => BookUpdateManyWithoutRelatedBooksNestedInputSchema).optional(),
<<<<<<< HEAD
  booksOnShelves: z.lazy(() => BookOnShelfUpdateManyWithoutBookNestedInputSchema).optional(),
=======
  shelves: z.lazy(() => ShelfUpdateManyWithoutBooksNestedInputSchema).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const BookUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.BookUncheckedUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_13: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_10: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  publisher: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  publicationYear: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  pageCount: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  width: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  height: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  thickness: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  retailPrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  genreId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  inventoryCount: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  imgUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  authors: z.lazy(() => AuthorUncheckedUpdateManyWithoutBooksNestedInputSchema).optional(),
  purchaseLines: z.lazy(() => PurchaseLineUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  salesLines: z.lazy(() => SalesLineUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  buybackLines: z.lazy(() => BuybackLineUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  correction: z.lazy(() => CorrectionUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  relatedBooks: z.lazy(() => BookUncheckedUpdateManyWithoutSymmetricRelatedBooksNestedInputSchema).optional(),
  symmetricRelatedBooks: z.lazy(() => BookUncheckedUpdateManyWithoutRelatedBooksNestedInputSchema).optional(),
<<<<<<< HEAD
  booksOnShelves: z.lazy(() => BookOnShelfUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
=======
  shelves: z.lazy(() => ShelfUncheckedUpdateManyWithoutBooksNestedInputSchema).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const BookCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.BookCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  isbn_13: z.string(),
  isbn_10: z.string().optional().nullable(),
  publisher: z.string(),
  publicationYear: z.number().int(),
  pageCount: z.number().int(),
  width: z.number(),
  height: z.number(),
  thickness: z.number(),
  retailPrice: z.number(),
  genreId: z.string(),
  inventoryCount: z.number().int(),
  display: z.boolean().optional(),
  imgUrl: z.string().optional().nullable(),
}).strict();

export const BookUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.BookUpdateManyMutationInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_13: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_10: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  publisher: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  publicationYear: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  pageCount: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  width: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  height: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  thickness: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  retailPrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  inventoryCount: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  imgUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const BookUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.BookUncheckedUpdateManyInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_13: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_10: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  publisher: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  publicationYear: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  pageCount: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  width: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  height: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  thickness: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  retailPrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  genreId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  inventoryCount: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  imgUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const GenreCreateInputSchema: z.ZodType<PrismaClient.Prisma.GenreCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  display: z.boolean().optional(),
  books: z.lazy(() => BookCreateNestedManyWithoutGenreInputSchema).optional(),
}).strict();

export const GenreUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.GenreUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  display: z.boolean().optional(),
  books: z.lazy(() => BookUncheckedCreateNestedManyWithoutGenreInputSchema).optional(),
}).strict();

export const GenreUpdateInputSchema: z.ZodType<PrismaClient.Prisma.GenreUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  books: z.lazy(() => BookUpdateManyWithoutGenreNestedInputSchema).optional(),
}).strict();

export const GenreUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.GenreUncheckedUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  books: z.lazy(() => BookUncheckedUpdateManyWithoutGenreNestedInputSchema).optional(),
}).strict();

export const GenreCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.GenreCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  display: z.boolean().optional(),
}).strict();

export const GenreUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.GenreUpdateManyMutationInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const GenreUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.GenreUncheckedUpdateManyInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const AuthorCreateInputSchema: z.ZodType<PrismaClient.Prisma.AuthorCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  display: z.boolean().optional(),
  books: z.lazy(() => BookCreateNestedManyWithoutAuthorsInputSchema).optional(),
}).strict();

export const AuthorUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.AuthorUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  display: z.boolean().optional(),
  books: z.lazy(() => BookUncheckedCreateNestedManyWithoutAuthorsInputSchema).optional(),
}).strict();

export const AuthorUpdateInputSchema: z.ZodType<PrismaClient.Prisma.AuthorUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  books: z.lazy(() => BookUpdateManyWithoutAuthorsNestedInputSchema).optional(),
}).strict();

export const AuthorUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.AuthorUncheckedUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  books: z.lazy(() => BookUncheckedUpdateManyWithoutAuthorsNestedInputSchema).optional(),
}).strict();

export const AuthorCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.AuthorCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  display: z.boolean().optional(),
}).strict();

export const AuthorUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.AuthorUpdateManyMutationInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const AuthorUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.AuthorUncheckedUpdateManyInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const VendorCreateInputSchema: z.ZodType<PrismaClient.Prisma.VendorCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  buybackRate: z.number().optional(),
  display: z.boolean().optional(),
  purchaseOrder: z.lazy(() => PurchaseOrderCreateNestedManyWithoutVendorInputSchema).optional(),
  buybackOrders: z.lazy(() => BuybackOrderCreateNestedManyWithoutVendorInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorCreateNestedManyWithoutVendorInputSchema).optional(),
}).strict();

export const VendorUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.VendorUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  buybackRate: z.number().optional(),
  display: z.boolean().optional(),
  purchaseOrder: z.lazy(() => PurchaseOrderUncheckedCreateNestedManyWithoutVendorInputSchema).optional(),
  buybackOrders: z.lazy(() => BuybackOrderUncheckedCreateNestedManyWithoutVendorInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUncheckedCreateNestedManyWithoutVendorInputSchema).optional(),
}).strict();

export const VendorUpdateInputSchema: z.ZodType<PrismaClient.Prisma.VendorUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  buybackRate: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  purchaseOrder: z.lazy(() => PurchaseOrderUpdateManyWithoutVendorNestedInputSchema).optional(),
  buybackOrders: z.lazy(() => BuybackOrderUpdateManyWithoutVendorNestedInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUpdateManyWithoutVendorNestedInputSchema).optional(),
}).strict();

export const VendorUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.VendorUncheckedUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  buybackRate: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  purchaseOrder: z.lazy(() => PurchaseOrderUncheckedUpdateManyWithoutVendorNestedInputSchema).optional(),
  buybackOrders: z.lazy(() => BuybackOrderUncheckedUpdateManyWithoutVendorNestedInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUncheckedUpdateManyWithoutVendorNestedInputSchema).optional(),
}).strict();

export const VendorCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.VendorCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  buybackRate: z.number().optional(),
  display: z.boolean().optional(),
}).strict();

export const VendorUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.VendorUpdateManyMutationInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  buybackRate: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const VendorUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.VendorUncheckedUpdateManyInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  buybackRate: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const PurchaseOrderCreateInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderCreateInput> = z.object({
  id: z.string().cuid().optional(),
  date: z.date(),
  display: z.boolean().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutPurchaseOrderInputSchema).optional(),
  vendor: z.lazy(() => VendorCreateNestedOneWithoutPurchaseOrderInputSchema),
  purchaseLines: z.lazy(() => PurchaseLineCreateNestedManyWithoutPurchaseOrderInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorCreateNestedManyWithoutPurchaseOrderInputSchema).optional(),
}).strict();

export const PurchaseOrderUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  date: z.date(),
  userId: z.string().optional().nullable(),
  vendorId: z.string(),
  display: z.boolean().optional(),
  purchaseLines: z.lazy(() => PurchaseLineUncheckedCreateNestedManyWithoutPurchaseOrderInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUncheckedCreateNestedManyWithoutPurchaseOrderInputSchema).optional(),
}).strict();

export const PurchaseOrderUpdateInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutPurchaseOrderNestedInputSchema).optional(),
  vendor: z.lazy(() => VendorUpdateOneRequiredWithoutPurchaseOrderNestedInputSchema).optional(),
  purchaseLines: z.lazy(() => PurchaseLineUpdateManyWithoutPurchaseOrderNestedInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUpdateManyWithoutPurchaseOrderNestedInputSchema).optional(),
}).strict();

export const PurchaseOrderUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderUncheckedUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  vendorId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  purchaseLines: z.lazy(() => PurchaseLineUncheckedUpdateManyWithoutPurchaseOrderNestedInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUncheckedUpdateManyWithoutPurchaseOrderNestedInputSchema).optional(),
}).strict();

export const PurchaseOrderCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  date: z.date(),
  userId: z.string().optional().nullable(),
  vendorId: z.string(),
  display: z.boolean().optional(),
}).strict();

export const PurchaseOrderUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderUpdateManyMutationInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const PurchaseOrderUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderUncheckedUpdateManyInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  vendorId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const PurchaseLineCreateInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineCreateInput> = z.object({
  id: z.string().cuid().optional(),
  quantity: z.number().int(),
  unitWholesalePrice: z.number(),
  display: z.boolean().optional(),
  book: z.lazy(() => BookCreateNestedOneWithoutPurchaseLinesInputSchema),
  purchaseOrder: z.lazy(() => PurchaseOrderCreateNestedOneWithoutPurchaseLinesInputSchema),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorCreateNestedOneWithoutPurchaseLineInputSchema).optional(),
}).strict();

export const PurchaseLineUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  bookId: z.string(),
  quantity: z.number().int(),
  unitWholesalePrice: z.number(),
  purchaseOrderId: z.string(),
  display: z.boolean().optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUncheckedCreateNestedOneWithoutPurchaseLineInputSchema).optional(),
}).strict();

export const PurchaseLineUpdateInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  unitWholesalePrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  book: z.lazy(() => BookUpdateOneRequiredWithoutPurchaseLinesNestedInputSchema).optional(),
  purchaseOrder: z.lazy(() => PurchaseOrderUpdateOneRequiredWithoutPurchaseLinesNestedInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUpdateOneWithoutPurchaseLineNestedInputSchema).optional(),
}).strict();

export const PurchaseLineUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineUncheckedUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  bookId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  unitWholesalePrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  purchaseOrderId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUncheckedUpdateOneWithoutPurchaseLineNestedInputSchema).optional(),
}).strict();

export const PurchaseLineCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  bookId: z.string(),
  quantity: z.number().int(),
  unitWholesalePrice: z.number(),
  purchaseOrderId: z.string(),
  display: z.boolean().optional(),
}).strict();

export const PurchaseLineUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineUpdateManyMutationInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  unitWholesalePrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const PurchaseLineUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineUncheckedUpdateManyInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  bookId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  unitWholesalePrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  purchaseOrderId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const SalesReconciliationCreateInputSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationCreateInput> = z.object({
  id: z.string().cuid().optional(),
  date: z.date(),
  display: z.boolean().optional(),
  salesLines: z.lazy(() => SalesLineCreateNestedManyWithoutSalesReconciliationInputSchema).optional(),
}).strict();

export const SalesReconciliationUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  date: z.date(),
  display: z.boolean().optional(),
  salesLines: z.lazy(() => SalesLineUncheckedCreateNestedManyWithoutSalesReconciliationInputSchema).optional(),
}).strict();

export const SalesReconciliationUpdateInputSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  salesLines: z.lazy(() => SalesLineUpdateManyWithoutSalesReconciliationNestedInputSchema).optional(),
}).strict();

export const SalesReconciliationUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationUncheckedUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  salesLines: z.lazy(() => SalesLineUncheckedUpdateManyWithoutSalesReconciliationNestedInputSchema).optional(),
}).strict();

export const SalesReconciliationCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  date: z.date(),
  display: z.boolean().optional(),
}).strict();

export const SalesReconciliationUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationUpdateManyMutationInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const SalesReconciliationUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationUncheckedUpdateManyInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const SalesLineCreateInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineCreateInput> = z.object({
  id: z.string().cuid().optional(),
  quantity: z.number().int(),
  unitWholesalePrice: z.number(),
  display: z.boolean().optional(),
  book: z.lazy(() => BookCreateNestedOneWithoutSalesLinesInputSchema),
  salesReconciliation: z.lazy(() => SalesReconciliationCreateNestedOneWithoutSalesLinesInputSchema),
}).strict();

export const SalesLineUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  bookId: z.string(),
  quantity: z.number().int(),
  unitWholesalePrice: z.number(),
  salesReconciliationId: z.string(),
  display: z.boolean().optional(),
}).strict();

export const SalesLineUpdateInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  unitWholesalePrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  book: z.lazy(() => BookUpdateOneRequiredWithoutSalesLinesNestedInputSchema).optional(),
  salesReconciliation: z.lazy(() => SalesReconciliationUpdateOneRequiredWithoutSalesLinesNestedInputSchema).optional(),
}).strict();

export const SalesLineUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineUncheckedUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  bookId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  unitWholesalePrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  salesReconciliationId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const SalesLineCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  bookId: z.string(),
  quantity: z.number().int(),
  unitWholesalePrice: z.number(),
  salesReconciliationId: z.string(),
  display: z.boolean().optional(),
}).strict();

export const SalesLineUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineUpdateManyMutationInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  unitWholesalePrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const SalesLineUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineUncheckedUpdateManyInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  bookId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  unitWholesalePrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  salesReconciliationId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const BuybackOrderCreateInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderCreateInput> = z.object({
  id: z.string().cuid().optional(),
  date: z.date(),
  display: z.boolean().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutBuybackOrderInputSchema).optional(),
  vendor: z.lazy(() => VendorCreateNestedOneWithoutBuybackOrdersInputSchema),
  buybackLines: z.lazy(() => BuybackLineCreateNestedManyWithoutBuybackOrderInputSchema).optional(),
}).strict();

export const BuybackOrderUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  date: z.date(),
  userId: z.string().optional().nullable(),
  vendorId: z.string(),
  display: z.boolean().optional(),
  buybackLines: z.lazy(() => BuybackLineUncheckedCreateNestedManyWithoutBuybackOrderInputSchema).optional(),
}).strict();

export const BuybackOrderUpdateInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutBuybackOrderNestedInputSchema).optional(),
  vendor: z.lazy(() => VendorUpdateOneRequiredWithoutBuybackOrdersNestedInputSchema).optional(),
  buybackLines: z.lazy(() => BuybackLineUpdateManyWithoutBuybackOrderNestedInputSchema).optional(),
}).strict();

export const BuybackOrderUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderUncheckedUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  vendorId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  buybackLines: z.lazy(() => BuybackLineUncheckedUpdateManyWithoutBuybackOrderNestedInputSchema).optional(),
}).strict();

export const BuybackOrderCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  date: z.date(),
  userId: z.string().optional().nullable(),
  vendorId: z.string(),
  display: z.boolean().optional(),
}).strict();

export const BuybackOrderUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderUpdateManyMutationInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const BuybackOrderUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderUncheckedUpdateManyInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  vendorId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const BuybackLineCreateInputSchema: z.ZodType<PrismaClient.Prisma.BuybackLineCreateInput> = z.object({
  id: z.string().cuid().optional(),
  quantity: z.number().int(),
  unitBuybackPrice: z.number(),
  display: z.boolean().optional(),
  book: z.lazy(() => BookCreateNestedOneWithoutBuybackLinesInputSchema),
  buybackOrder: z.lazy(() => BuybackOrderCreateNestedOneWithoutBuybackLinesInputSchema),
}).strict();

export const BuybackLineUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.BuybackLineUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  bookId: z.string(),
  quantity: z.number().int(),
  unitBuybackPrice: z.number(),
  buybackOrderId: z.string(),
  display: z.boolean().optional(),
}).strict();

export const BuybackLineUpdateInputSchema: z.ZodType<PrismaClient.Prisma.BuybackLineUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  unitBuybackPrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  book: z.lazy(() => BookUpdateOneRequiredWithoutBuybackLinesNestedInputSchema).optional(),
  buybackOrder: z.lazy(() => BuybackOrderUpdateOneRequiredWithoutBuybackLinesNestedInputSchema).optional(),
}).strict();

export const BuybackLineUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.BuybackLineUncheckedUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  bookId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  unitBuybackPrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  buybackOrderId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const BuybackLineCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.BuybackLineCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  bookId: z.string(),
  quantity: z.number().int(),
  unitBuybackPrice: z.number(),
  buybackOrderId: z.string(),
  display: z.boolean().optional(),
}).strict();

export const BuybackLineUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.BuybackLineUpdateManyMutationInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  unitBuybackPrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const BuybackLineUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.BuybackLineUncheckedUpdateManyInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  bookId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  unitBuybackPrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  buybackOrderId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const CorrectionCreateInputSchema: z.ZodType<PrismaClient.Prisma.CorrectionCreateInput> = z.object({
  id: z.string().cuid().optional(),
  date: z.date(),
  quantity: z.number().int(),
  user: z.lazy(() => UserCreateNestedOneWithoutCorrectionInputSchema).optional(),
  book: z.lazy(() => BookCreateNestedOneWithoutCorrectionInputSchema),
}).strict();

export const CorrectionUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.CorrectionUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string().optional().nullable(),
  date: z.date(),
  bookId: z.string(),
  quantity: z.number().int(),
}).strict();

export const CorrectionUpdateInputSchema: z.ZodType<PrismaClient.Prisma.CorrectionUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutCorrectionNestedInputSchema).optional(),
  book: z.lazy(() => BookUpdateOneRequiredWithoutCorrectionNestedInputSchema).optional(),
}).strict();

export const CorrectionUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.CorrectionUncheckedUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  bookId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const CorrectionCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.CorrectionCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string().optional().nullable(),
  date: z.date(),
  bookId: z.string(),
  quantity: z.number().int(),
}).strict();

export const CorrectionUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.CorrectionUpdateManyMutationInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const CorrectionUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.CorrectionUncheckedUpdateManyInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  bookId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const CostMostRecentVendorCreateInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorCreateInput> = z.object({
  id: z.string().cuid().optional(),
  book: z.lazy(() => BookCreateNestedOneWithoutCostMostRecentVendorInputSchema),
  vendor: z.lazy(() => VendorCreateNestedOneWithoutCostMostRecentVendorInputSchema),
  purchaseLine: z.lazy(() => PurchaseLineCreateNestedOneWithoutCostMostRecentVendorInputSchema),
  purchaseOrder: z.lazy(() => PurchaseOrderCreateNestedOneWithoutCostMostRecentVendorInputSchema),
}).strict();

export const CostMostRecentVendorUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  bookId: z.string(),
  vendorId: z.string(),
  purchaseLineId: z.string(),
  purchaseOrderId: z.string(),
}).strict();

export const CostMostRecentVendorUpdateInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  book: z.lazy(() => BookUpdateOneRequiredWithoutCostMostRecentVendorNestedInputSchema).optional(),
  vendor: z.lazy(() => VendorUpdateOneRequiredWithoutCostMostRecentVendorNestedInputSchema).optional(),
  purchaseLine: z.lazy(() => PurchaseLineUpdateOneRequiredWithoutCostMostRecentVendorNestedInputSchema).optional(),
  purchaseOrder: z.lazy(() => PurchaseOrderUpdateOneRequiredWithoutCostMostRecentVendorNestedInputSchema).optional(),
}).strict();

export const CostMostRecentVendorUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorUncheckedUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  bookId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  vendorId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  purchaseLineId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  purchaseOrderId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const CostMostRecentVendorCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  bookId: z.string(),
  vendorId: z.string(),
  purchaseLineId: z.string(),
  purchaseOrderId: z.string(),
}).strict();

export const CostMostRecentVendorUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorUpdateManyMutationInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const CostMostRecentVendorUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorUncheckedUpdateManyInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  bookId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  vendorId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  purchaseLineId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  purchaseOrderId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const CaseCreateInputSchema: z.ZodType<PrismaClient.Prisma.CaseCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  editedAt: z.date().optional(),
  width: z.number(),
  shelfCount: z.number().int(),
  creator: z.lazy(() => UserCreateNestedOneWithoutCasesCreatedInputSchema),
  editor: z.lazy(() => UserCreateNestedOneWithoutCasesLastEditedInputSchema),
  shelves: z.lazy(() => ShelfCreateNestedManyWithoutCaseInputSchema).optional(),
}).strict();

export const CaseUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.CaseUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  creatorId: z.string(),
  editorId: z.string(),
  editedAt: z.date().optional(),
  width: z.number(),
  shelfCount: z.number().int(),
  shelves: z.lazy(() => ShelfUncheckedCreateNestedManyWithoutCaseInputSchema).optional(),
}).strict();

export const CaseUpdateInputSchema: z.ZodType<PrismaClient.Prisma.CaseUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  editedAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  width: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  shelfCount: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  creator: z.lazy(() => UserUpdateOneRequiredWithoutCasesCreatedNestedInputSchema).optional(),
  editor: z.lazy(() => UserUpdateOneRequiredWithoutCasesLastEditedNestedInputSchema).optional(),
  shelves: z.lazy(() => ShelfUpdateManyWithoutCaseNestedInputSchema).optional(),
}).strict();

export const CaseUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.CaseUncheckedUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  creatorId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  editorId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  editedAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  width: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  shelfCount: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  shelves: z.lazy(() => ShelfUncheckedUpdateManyWithoutCaseNestedInputSchema).optional(),
}).strict();

export const CaseCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.CaseCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  creatorId: z.string(),
  editorId: z.string(),
  editedAt: z.date().optional(),
  width: z.number(),
  shelfCount: z.number().int(),
}).strict();

export const CaseUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.CaseUpdateManyMutationInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  editedAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  width: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  shelfCount: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const CaseUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.CaseUncheckedUpdateManyInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  creatorId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  editorId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  editedAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  width: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  shelfCount: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const ShelfCreateInputSchema: z.ZodType<PrismaClient.Prisma.ShelfCreateInput> = z.object({
  id: z.string().cuid().optional(),
  spaceUsed: z.number(),
  case: z.lazy(() => CaseCreateNestedOneWithoutShelvesInputSchema),
<<<<<<< HEAD
  booksOnShelf: z.lazy(() => BookOnShelfCreateNestedManyWithoutShelfInputSchema).optional(),
=======
  books: z.lazy(() => BookCreateNestedManyWithoutShelvesInputSchema).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const ShelfUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.ShelfUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  caseId: z.string(),
  spaceUsed: z.number(),
<<<<<<< HEAD
  booksOnShelf: z.lazy(() => BookOnShelfUncheckedCreateNestedManyWithoutShelfInputSchema).optional(),
=======
  books: z.lazy(() => BookUncheckedCreateNestedManyWithoutShelvesInputSchema).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const ShelfUpdateInputSchema: z.ZodType<PrismaClient.Prisma.ShelfUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  spaceUsed: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  case: z.lazy(() => CaseUpdateOneRequiredWithoutShelvesNestedInputSchema).optional(),
<<<<<<< HEAD
  booksOnShelf: z.lazy(() => BookOnShelfUpdateManyWithoutShelfNestedInputSchema).optional(),
=======
  books: z.lazy(() => BookUpdateManyWithoutShelvesNestedInputSchema).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const ShelfUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.ShelfUncheckedUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  caseId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  spaceUsed: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
<<<<<<< HEAD
  booksOnShelf: z.lazy(() => BookOnShelfUncheckedUpdateManyWithoutShelfNestedInputSchema).optional(),
=======
  books: z.lazy(() => BookUncheckedUpdateManyWithoutShelvesNestedInputSchema).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const ShelfCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.ShelfCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  caseId: z.string(),
  spaceUsed: z.number(),
}).strict();

export const ShelfUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.ShelfUpdateManyMutationInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  spaceUsed: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const ShelfUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.ShelfUncheckedUpdateManyInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  caseId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  spaceUsed: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const BookOnShelfCreateInputSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfCreateInput> = z.object({
  id: z.string().cuid().optional(),
  orientation: z.string(),
  book: z.lazy(() => BookCreateNestedOneWithoutBooksOnShelvesInputSchema),
  shelf: z.lazy(() => ShelfCreateNestedOneWithoutBooksOnShelfInputSchema),
}).strict();

export const BookOnShelfUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  bookId: z.string(),
  shelfId: z.string(),
  orientation: z.string(),
}).strict();

export const BookOnShelfUpdateInputSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  orientation: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  book: z.lazy(() => BookUpdateOneRequiredWithoutBooksOnShelvesNestedInputSchema).optional(),
  shelf: z.lazy(() => ShelfUpdateOneRequiredWithoutBooksOnShelfNestedInputSchema).optional(),
}).strict();

export const BookOnShelfUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfUncheckedUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  bookId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  shelfId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  orientation: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const BookOnShelfCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  bookId: z.string(),
  shelfId: z.string(),
  orientation: z.string(),
}).strict();

export const BookOnShelfUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfUpdateManyMutationInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  orientation: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const BookOnShelfUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfUncheckedUpdateManyInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  bookId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  shelfId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  orientation: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const ExampleCreateInputSchema: z.ZodType<PrismaClient.Prisma.ExampleCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
}).strict();

export const ExampleUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.ExampleUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
}).strict();

export const ExampleUpdateInputSchema: z.ZodType<PrismaClient.Prisma.ExampleUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  createdAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  updatedAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const ExampleUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.ExampleUncheckedUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  createdAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  updatedAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const ExampleCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.ExampleCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
}).strict();

export const ExampleUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.ExampleUpdateManyMutationInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  createdAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  updatedAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const ExampleUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.ExampleUncheckedUpdateManyInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  createdAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  updatedAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const AccountCreateInputSchema: z.ZodType<PrismaClient.Prisma.AccountCreateInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutAccountsInputSchema),
}).strict();

export const AccountUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.AccountUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
}).strict();

export const AccountUpdateInputSchema: z.ZodType<PrismaClient.Prisma.AccountUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  type: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  provider: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  providerAccountId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  refresh_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  access_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  expires_at: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  token_type: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  scope: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  id_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  session_state: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAccountsNestedInputSchema).optional(),
}).strict();

export const AccountUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.AccountUncheckedUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  type: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  provider: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  providerAccountId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  refresh_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  access_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  expires_at: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  token_type: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  scope: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  id_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  session_state: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const AccountCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.AccountCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
}).strict();

export const AccountUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.AccountUpdateManyMutationInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  type: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  provider: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  providerAccountId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  refresh_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  access_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  expires_at: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  token_type: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  scope: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  id_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  session_state: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.AccountUncheckedUpdateManyInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  type: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  provider: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  providerAccountId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  refresh_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  access_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  expires_at: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  token_type: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  scope: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  id_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  session_state: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const SessionCreateInputSchema: z.ZodType<PrismaClient.Prisma.SessionCreateInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.date(),
  user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema),
}).strict();

export const SessionUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.SessionUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.date(),
}).strict();

export const SessionUpdateInputSchema: z.ZodType<PrismaClient.Prisma.SessionUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  sessionToken: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  expires: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema).optional(),
}).strict();

export const SessionUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.SessionUncheckedUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  sessionToken: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  expires: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const SessionCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.SessionCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.date(),
}).strict();

export const SessionUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.SessionUpdateManyMutationInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  sessionToken: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  expires: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.SessionUncheckedUpdateManyInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  sessionToken: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  expires: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional(),
  password: z.string(),
  role: z.string().optional(),
  display: z.boolean().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  Correction: z.lazy(() => CorrectionCreateNestedManyWithoutUserInputSchema).optional(),
  PurchaseOrder: z.lazy(() => PurchaseOrderCreateNestedManyWithoutUserInputSchema).optional(),
  BuybackOrder: z.lazy(() => BuybackOrderCreateNestedManyWithoutUserInputSchema).optional(),
  casesCreated: z.lazy(() => CaseCreateNestedManyWithoutCreatorInputSchema).optional(),
  casesLastEdited: z.lazy(() => CaseCreateNestedManyWithoutEditorInputSchema).optional(),
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional(),
  password: z.string(),
  role: z.string().optional(),
  display: z.boolean().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Correction: z.lazy(() => CorrectionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  PurchaseOrder: z.lazy(() => PurchaseOrderUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  BuybackOrder: z.lazy(() => BuybackOrderUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  casesCreated: z.lazy(() => CaseUncheckedCreateNestedManyWithoutCreatorInputSchema).optional(),
  casesLastEdited: z.lazy(() => CaseUncheckedCreateNestedManyWithoutEditorInputSchema).optional(),
}).strict();

export const UserUpdateInputSchema: z.ZodType<PrismaClient.Prisma.UserUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  password: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  role: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  Correction: z.lazy(() => CorrectionUpdateManyWithoutUserNestedInputSchema).optional(),
  PurchaseOrder: z.lazy(() => PurchaseOrderUpdateManyWithoutUserNestedInputSchema).optional(),
  BuybackOrder: z.lazy(() => BuybackOrderUpdateManyWithoutUserNestedInputSchema).optional(),
  casesCreated: z.lazy(() => CaseUpdateManyWithoutCreatorNestedInputSchema).optional(),
  casesLastEdited: z.lazy(() => CaseUpdateManyWithoutEditorNestedInputSchema).optional(),
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  password: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  role: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Correction: z.lazy(() => CorrectionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  PurchaseOrder: z.lazy(() => PurchaseOrderUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  BuybackOrder: z.lazy(() => BuybackOrderUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  casesCreated: z.lazy(() => CaseUncheckedUpdateManyWithoutCreatorNestedInputSchema).optional(),
  casesLastEdited: z.lazy(() => CaseUncheckedUpdateManyWithoutEditorNestedInputSchema).optional(),
}).strict();

export const UserCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional(),
  password: z.string(),
  role: z.string().optional(),
  display: z.boolean().optional(),
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  password: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  role: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  password: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  role: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const VerificationTokenCreateInputSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.date(),
}).strict();

export const VerificationTokenUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenUncheckedCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.date(),
}).strict();

export const VerificationTokenUpdateInputSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenUpdateInput> = z.object({
  identifier: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  token: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  expires: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenUncheckedUpdateInput> = z.object({
  identifier: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  token: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  expires: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const VerificationTokenCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenCreateManyInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.date(),
}).strict();

export const VerificationTokenUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenUpdateManyMutationInput> = z.object({
  identifier: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  token: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  expires: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenUncheckedUpdateManyInput> = z.object({
  identifier: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  token: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  expires: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const ImageCreateInputSchema: z.ZodType<PrismaClient.Prisma.ImageCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
}).strict();

export const ImageUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.ImageUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
}).strict();

export const ImageUpdateInputSchema: z.ZodType<PrismaClient.Prisma.ImageUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const ImageUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.ImageUncheckedUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const ImageCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.ImageCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
}).strict();

export const ImageUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.ImageUpdateManyMutationInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const ImageUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.ImageUncheckedUpdateManyInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<PrismaClient.Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([z.string(), z.lazy(() => NestedStringFilterSchema)]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<PrismaClient.Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)]).optional().nullable(),
}).strict();

export const IntFilterSchema: z.ZodType<PrismaClient.Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
}).strict();

export const FloatFilterSchema: z.ZodType<PrismaClient.Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedFloatFilterSchema)]).optional(),
}).strict();

export const BoolFilterSchema: z.ZodType<PrismaClient.Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([z.boolean(), z.lazy(() => NestedBoolFilterSchema)]).optional(),
}).strict();

export const AuthorListRelationFilterSchema: z.ZodType<PrismaClient.Prisma.AuthorListRelationFilter> = z.object({
  every: z.lazy(() => AuthorWhereInputSchema).optional(),
  some: z.lazy(() => AuthorWhereInputSchema).optional(),
  none: z.lazy(() => AuthorWhereInputSchema).optional(),
}).strict();

export const GenreRelationFilterSchema: z.ZodType<PrismaClient.Prisma.GenreRelationFilter> = z.object({
  is: z.lazy(() => GenreWhereInputSchema).optional(),
  isNot: z.lazy(() => GenreWhereInputSchema).optional(),
}).strict();

export const PurchaseLineListRelationFilterSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineListRelationFilter> = z.object({
  every: z.lazy(() => PurchaseLineWhereInputSchema).optional(),
  some: z.lazy(() => PurchaseLineWhereInputSchema).optional(),
  none: z.lazy(() => PurchaseLineWhereInputSchema).optional(),
}).strict();

export const SalesLineListRelationFilterSchema: z.ZodType<PrismaClient.Prisma.SalesLineListRelationFilter> = z.object({
  every: z.lazy(() => SalesLineWhereInputSchema).optional(),
  some: z.lazy(() => SalesLineWhereInputSchema).optional(),
  none: z.lazy(() => SalesLineWhereInputSchema).optional(),
}).strict();

export const BuybackLineListRelationFilterSchema: z.ZodType<PrismaClient.Prisma.BuybackLineListRelationFilter> = z.object({
  every: z.lazy(() => BuybackLineWhereInputSchema).optional(),
  some: z.lazy(() => BuybackLineWhereInputSchema).optional(),
  none: z.lazy(() => BuybackLineWhereInputSchema).optional(),
}).strict();

export const CostMostRecentVendorListRelationFilterSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorListRelationFilter> = z.object({
  every: z.lazy(() => CostMostRecentVendorWhereInputSchema).optional(),
  some: z.lazy(() => CostMostRecentVendorWhereInputSchema).optional(),
  none: z.lazy(() => CostMostRecentVendorWhereInputSchema).optional(),
}).strict();

export const CorrectionListRelationFilterSchema: z.ZodType<PrismaClient.Prisma.CorrectionListRelationFilter> = z.object({
  every: z.lazy(() => CorrectionWhereInputSchema).optional(),
  some: z.lazy(() => CorrectionWhereInputSchema).optional(),
  none: z.lazy(() => CorrectionWhereInputSchema).optional(),
}).strict();

export const BookListRelationFilterSchema: z.ZodType<PrismaClient.Prisma.BookListRelationFilter> = z.object({
  every: z.lazy(() => BookWhereInputSchema).optional(),
  some: z.lazy(() => BookWhereInputSchema).optional(),
  none: z.lazy(() => BookWhereInputSchema).optional(),
}).strict();

<<<<<<< HEAD
export const BookOnShelfListRelationFilterSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfListRelationFilter> = z.object({
  every: z.lazy(() => BookOnShelfWhereInputSchema).optional(),
  some: z.lazy(() => BookOnShelfWhereInputSchema).optional(),
  none: z.lazy(() => BookOnShelfWhereInputSchema).optional(),
=======
export const ShelfListRelationFilterSchema: z.ZodType<PrismaClient.Prisma.ShelfListRelationFilter> = z.object({
  every: z.lazy(() => ShelfWhereInputSchema).optional(),
  some: z.lazy(() => ShelfWhereInputSchema).optional(),
  none: z.lazy(() => ShelfWhereInputSchema).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const AuthorOrderByRelationAggregateInputSchema: z.ZodType<PrismaClient.Prisma.AuthorOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const PurchaseLineOrderByRelationAggregateInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SalesLineOrderByRelationAggregateInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const BuybackLineOrderByRelationAggregateInputSchema: z.ZodType<PrismaClient.Prisma.BuybackLineOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const CostMostRecentVendorOrderByRelationAggregateInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const CorrectionOrderByRelationAggregateInputSchema: z.ZodType<PrismaClient.Prisma.CorrectionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const BookOrderByRelationAggregateInputSchema: z.ZodType<PrismaClient.Prisma.BookOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

<<<<<<< HEAD
export const BookOnShelfOrderByRelationAggregateInputSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfOrderByRelationAggregateInput> = z.object({
=======
export const ShelfOrderByRelationAggregateInputSchema: z.ZodType<PrismaClient.Prisma.ShelfOrderByRelationAggregateInput> = z.object({
>>>>>>> tempCaseDesignerBranch
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const BookCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.BookCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  isbn_13: z.lazy(() => SortOrderSchema).optional(),
  isbn_10: z.lazy(() => SortOrderSchema).optional(),
  publisher: z.lazy(() => SortOrderSchema).optional(),
  publicationYear: z.lazy(() => SortOrderSchema).optional(),
  pageCount: z.lazy(() => SortOrderSchema).optional(),
  width: z.lazy(() => SortOrderSchema).optional(),
  height: z.lazy(() => SortOrderSchema).optional(),
  thickness: z.lazy(() => SortOrderSchema).optional(),
  retailPrice: z.lazy(() => SortOrderSchema).optional(),
  genreId: z.lazy(() => SortOrderSchema).optional(),
  inventoryCount: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
  imgUrl: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const BookAvgOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.BookAvgOrderByAggregateInput> = z.object({
  publicationYear: z.lazy(() => SortOrderSchema).optional(),
  pageCount: z.lazy(() => SortOrderSchema).optional(),
  width: z.lazy(() => SortOrderSchema).optional(),
  height: z.lazy(() => SortOrderSchema).optional(),
  thickness: z.lazy(() => SortOrderSchema).optional(),
  retailPrice: z.lazy(() => SortOrderSchema).optional(),
  inventoryCount: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const BookMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.BookMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  isbn_13: z.lazy(() => SortOrderSchema).optional(),
  isbn_10: z.lazy(() => SortOrderSchema).optional(),
  publisher: z.lazy(() => SortOrderSchema).optional(),
  publicationYear: z.lazy(() => SortOrderSchema).optional(),
  pageCount: z.lazy(() => SortOrderSchema).optional(),
  width: z.lazy(() => SortOrderSchema).optional(),
  height: z.lazy(() => SortOrderSchema).optional(),
  thickness: z.lazy(() => SortOrderSchema).optional(),
  retailPrice: z.lazy(() => SortOrderSchema).optional(),
  genreId: z.lazy(() => SortOrderSchema).optional(),
  inventoryCount: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
  imgUrl: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const BookMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.BookMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  isbn_13: z.lazy(() => SortOrderSchema).optional(),
  isbn_10: z.lazy(() => SortOrderSchema).optional(),
  publisher: z.lazy(() => SortOrderSchema).optional(),
  publicationYear: z.lazy(() => SortOrderSchema).optional(),
  pageCount: z.lazy(() => SortOrderSchema).optional(),
  width: z.lazy(() => SortOrderSchema).optional(),
  height: z.lazy(() => SortOrderSchema).optional(),
  thickness: z.lazy(() => SortOrderSchema).optional(),
  retailPrice: z.lazy(() => SortOrderSchema).optional(),
  genreId: z.lazy(() => SortOrderSchema).optional(),
  inventoryCount: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
  imgUrl: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const BookSumOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.BookSumOrderByAggregateInput> = z.object({
  publicationYear: z.lazy(() => SortOrderSchema).optional(),
  pageCount: z.lazy(() => SortOrderSchema).optional(),
  width: z.lazy(() => SortOrderSchema).optional(),
  height: z.lazy(() => SortOrderSchema).optional(),
  thickness: z.lazy(() => SortOrderSchema).optional(),
  retailPrice: z.lazy(() => SortOrderSchema).optional(),
  inventoryCount: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([z.string(), z.lazy(() => NestedStringWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([z.string(), z.lazy(() => NestedStringNullableWithAggregatesFilterSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional(),
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedFloatWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional(),
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([z.boolean(), z.lazy(() => NestedBoolWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional(),
}).strict();

export const GenreCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.GenreCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const GenreMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.GenreMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const GenreMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.GenreMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const AuthorCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.AuthorCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const AuthorMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.AuthorMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const AuthorMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.AuthorMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const PurchaseOrderListRelationFilterSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderListRelationFilter> = z.object({
  every: z.lazy(() => PurchaseOrderWhereInputSchema).optional(),
  some: z.lazy(() => PurchaseOrderWhereInputSchema).optional(),
  none: z.lazy(() => PurchaseOrderWhereInputSchema).optional(),
}).strict();

export const BuybackOrderListRelationFilterSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderListRelationFilter> = z.object({
  every: z.lazy(() => BuybackOrderWhereInputSchema).optional(),
  some: z.lazy(() => BuybackOrderWhereInputSchema).optional(),
  none: z.lazy(() => BuybackOrderWhereInputSchema).optional(),
}).strict();

export const PurchaseOrderOrderByRelationAggregateInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const BuybackOrderOrderByRelationAggregateInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const VendorCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.VendorCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  buybackRate: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const VendorAvgOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.VendorAvgOrderByAggregateInput> = z.object({
  buybackRate: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const VendorMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.VendorMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  buybackRate: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const VendorMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.VendorMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  buybackRate: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const VendorSumOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.VendorSumOrderByAggregateInput> = z.object({
  buybackRate: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<PrismaClient.Prisma.DateTimeFilter> = z.object({
  equals: z.date().optional(),
  in: z.date().array().optional(),
  notIn: z.date().array().optional(),
  lt: z.date().optional(),
  lte: z.date().optional(),
  gt: z.date().optional(),
  gte: z.date().optional(),
  not: z.union([z.date(), z.lazy(() => NestedDateTimeFilterSchema)]).optional(),
}).strict();

export const UserRelationFilterSchema: z.ZodType<PrismaClient.Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional(),
}).strict();

export const VendorRelationFilterSchema: z.ZodType<PrismaClient.Prisma.VendorRelationFilter> = z.object({
  is: z.lazy(() => VendorWhereInputSchema).optional(),
  isNot: z.lazy(() => VendorWhereInputSchema).optional(),
}).strict();

export const PurchaseOrderCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  vendorId: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const PurchaseOrderMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  vendorId: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const PurchaseOrderMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  vendorId: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.date().optional(),
  in: z.date().array().optional(),
  notIn: z.date().array().optional(),
  lt: z.date().optional(),
  lte: z.date().optional(),
  gt: z.date().optional(),
  gte: z.date().optional(),
  not: z.union([z.date(), z.lazy(() => NestedDateTimeWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
}).strict();

export const BookRelationFilterSchema: z.ZodType<PrismaClient.Prisma.BookRelationFilter> = z.object({
  is: z.lazy(() => BookWhereInputSchema).optional(),
  isNot: z.lazy(() => BookWhereInputSchema).optional(),
}).strict();

export const PurchaseOrderRelationFilterSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderRelationFilter> = z.object({
  is: z.lazy(() => PurchaseOrderWhereInputSchema).optional(),
  isNot: z.lazy(() => PurchaseOrderWhereInputSchema).optional(),
}).strict();

export const CostMostRecentVendorRelationFilterSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorRelationFilter> = z.object({
  is: z.lazy(() => CostMostRecentVendorWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => CostMostRecentVendorWhereInputSchema).optional().nullable(),
}).strict();

export const PurchaseLineCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bookId: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  unitWholesalePrice: z.lazy(() => SortOrderSchema).optional(),
  purchaseOrderId: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const PurchaseLineAvgOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineAvgOrderByAggregateInput> = z.object({
  quantity: z.lazy(() => SortOrderSchema).optional(),
  unitWholesalePrice: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const PurchaseLineMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bookId: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  unitWholesalePrice: z.lazy(() => SortOrderSchema).optional(),
  purchaseOrderId: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const PurchaseLineMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bookId: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  unitWholesalePrice: z.lazy(() => SortOrderSchema).optional(),
  purchaseOrderId: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const PurchaseLineSumOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineSumOrderByAggregateInput> = z.object({
  quantity: z.lazy(() => SortOrderSchema).optional(),
  unitWholesalePrice: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SalesReconciliationCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SalesReconciliationMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SalesReconciliationMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SalesReconciliationRelationFilterSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationRelationFilter> = z.object({
  is: z.lazy(() => SalesReconciliationWhereInputSchema).optional(),
  isNot: z.lazy(() => SalesReconciliationWhereInputSchema).optional(),
}).strict();

export const SalesLineCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bookId: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  unitWholesalePrice: z.lazy(() => SortOrderSchema).optional(),
  salesReconciliationId: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SalesLineAvgOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineAvgOrderByAggregateInput> = z.object({
  quantity: z.lazy(() => SortOrderSchema).optional(),
  unitWholesalePrice: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SalesLineMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bookId: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  unitWholesalePrice: z.lazy(() => SortOrderSchema).optional(),
  salesReconciliationId: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SalesLineMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bookId: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  unitWholesalePrice: z.lazy(() => SortOrderSchema).optional(),
  salesReconciliationId: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SalesLineSumOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineSumOrderByAggregateInput> = z.object({
  quantity: z.lazy(() => SortOrderSchema).optional(),
  unitWholesalePrice: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const BuybackOrderCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  vendorId: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const BuybackOrderMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  vendorId: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const BuybackOrderMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  vendorId: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const BuybackOrderRelationFilterSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderRelationFilter> = z.object({
  is: z.lazy(() => BuybackOrderWhereInputSchema).optional(),
  isNot: z.lazy(() => BuybackOrderWhereInputSchema).optional(),
}).strict();

export const BuybackLineCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.BuybackLineCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bookId: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  unitBuybackPrice: z.lazy(() => SortOrderSchema).optional(),
  buybackOrderId: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const BuybackLineAvgOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.BuybackLineAvgOrderByAggregateInput> = z.object({
  quantity: z.lazy(() => SortOrderSchema).optional(),
  unitBuybackPrice: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const BuybackLineMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.BuybackLineMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bookId: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  unitBuybackPrice: z.lazy(() => SortOrderSchema).optional(),
  buybackOrderId: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const BuybackLineMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.BuybackLineMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bookId: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  unitBuybackPrice: z.lazy(() => SortOrderSchema).optional(),
  buybackOrderId: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const BuybackLineSumOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.BuybackLineSumOrderByAggregateInput> = z.object({
  quantity: z.lazy(() => SortOrderSchema).optional(),
  unitBuybackPrice: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const CorrectionCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.CorrectionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  bookId: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const CorrectionAvgOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.CorrectionAvgOrderByAggregateInput> = z.object({
  quantity: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const CorrectionMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.CorrectionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  bookId: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const CorrectionMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.CorrectionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  bookId: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const CorrectionSumOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.CorrectionSumOrderByAggregateInput> = z.object({
  quantity: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const PurchaseLineRelationFilterSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineRelationFilter> = z.object({
  is: z.lazy(() => PurchaseLineWhereInputSchema).optional(),
  isNot: z.lazy(() => PurchaseLineWhereInputSchema).optional(),
}).strict();

export const CostMostRecentVendorCostMostRecentVendorIdCompoundUniqueInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorCostMostRecentVendorIdCompoundUniqueInput> = z.object({
  bookId: z.string(),
  vendorId: z.string(),
}).strict();

export const CostMostRecentVendorCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bookId: z.lazy(() => SortOrderSchema).optional(),
  vendorId: z.lazy(() => SortOrderSchema).optional(),
  purchaseLineId: z.lazy(() => SortOrderSchema).optional(),
  purchaseOrderId: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const CostMostRecentVendorMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bookId: z.lazy(() => SortOrderSchema).optional(),
  vendorId: z.lazy(() => SortOrderSchema).optional(),
  purchaseLineId: z.lazy(() => SortOrderSchema).optional(),
  purchaseOrderId: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const CostMostRecentVendorMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bookId: z.lazy(() => SortOrderSchema).optional(),
  vendorId: z.lazy(() => SortOrderSchema).optional(),
  purchaseLineId: z.lazy(() => SortOrderSchema).optional(),
  purchaseOrderId: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const CaseCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.CaseCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  creatorId: z.lazy(() => SortOrderSchema).optional(),
  editorId: z.lazy(() => SortOrderSchema).optional(),
  editedAt: z.lazy(() => SortOrderSchema).optional(),
  width: z.lazy(() => SortOrderSchema).optional(),
  shelfCount: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const CaseAvgOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.CaseAvgOrderByAggregateInput> = z.object({
  width: z.lazy(() => SortOrderSchema).optional(),
  shelfCount: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const CaseMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.CaseMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  creatorId: z.lazy(() => SortOrderSchema).optional(),
  editorId: z.lazy(() => SortOrderSchema).optional(),
  editedAt: z.lazy(() => SortOrderSchema).optional(),
  width: z.lazy(() => SortOrderSchema).optional(),
  shelfCount: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const CaseMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.CaseMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  creatorId: z.lazy(() => SortOrderSchema).optional(),
  editorId: z.lazy(() => SortOrderSchema).optional(),
  editedAt: z.lazy(() => SortOrderSchema).optional(),
  width: z.lazy(() => SortOrderSchema).optional(),
  shelfCount: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const CaseSumOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.CaseSumOrderByAggregateInput> = z.object({
  width: z.lazy(() => SortOrderSchema).optional(),
  shelfCount: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const CaseRelationFilterSchema: z.ZodType<PrismaClient.Prisma.CaseRelationFilter> = z.object({
  is: z.lazy(() => CaseWhereInputSchema).optional(),
  isNot: z.lazy(() => CaseWhereInputSchema).optional(),
}).strict();

export const ShelfCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.ShelfCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  caseId: z.lazy(() => SortOrderSchema).optional(),
  spaceUsed: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ShelfAvgOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.ShelfAvgOrderByAggregateInput> = z.object({
  spaceUsed: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ShelfMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.ShelfMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  caseId: z.lazy(() => SortOrderSchema).optional(),
  spaceUsed: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ShelfMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.ShelfMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  caseId: z.lazy(() => SortOrderSchema).optional(),
  spaceUsed: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ShelfSumOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.ShelfSumOrderByAggregateInput> = z.object({
  spaceUsed: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ShelfRelationFilterSchema: z.ZodType<PrismaClient.Prisma.ShelfRelationFilter> = z.object({
  is: z.lazy(() => ShelfWhereInputSchema).optional(),
  isNot: z.lazy(() => ShelfWhereInputSchema).optional(),
}).strict();

export const BookOnShelfCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bookId: z.lazy(() => SortOrderSchema).optional(),
  shelfId: z.lazy(() => SortOrderSchema).optional(),
  orientation: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const BookOnShelfMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bookId: z.lazy(() => SortOrderSchema).optional(),
  shelfId: z.lazy(() => SortOrderSchema).optional(),
  orientation: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const BookOnShelfMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bookId: z.lazy(() => SortOrderSchema).optional(),
  shelfId: z.lazy(() => SortOrderSchema).optional(),
  orientation: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ExampleCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.ExampleCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ExampleMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.ExampleMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ExampleMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.ExampleMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const IntNullableFilterSchema: z.ZodType<PrismaClient.Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)]).optional().nullable(),
}).strict();

export const AccountProviderProviderAccountIdCompoundUniqueInputSchema: z.ZodType<PrismaClient.Prisma.AccountProviderProviderAccountIdCompoundUniqueInput> = z.object({
  provider: z.string(),
  providerAccountId: z.string(),
}).strict();

export const AccountCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.AccountCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const AccountAvgOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.AccountAvgOrderByAggregateInput> = z.object({
  expires_at: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const AccountMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.AccountMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const AccountMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.AccountMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const AccountSumOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.AccountSumOrderByAggregateInput> = z.object({
  expires_at: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntNullableWithAggregatesFilterSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
}).strict();

export const SessionCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.SessionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.SessionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SessionMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.SessionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const AccountListRelationFilterSchema: z.ZodType<PrismaClient.Prisma.AccountListRelationFilter> = z.object({
  every: z.lazy(() => AccountWhereInputSchema).optional(),
  some: z.lazy(() => AccountWhereInputSchema).optional(),
  none: z.lazy(() => AccountWhereInputSchema).optional(),
}).strict();

export const SessionListRelationFilterSchema: z.ZodType<PrismaClient.Prisma.SessionListRelationFilter> = z.object({
  every: z.lazy(() => SessionWhereInputSchema).optional(),
  some: z.lazy(() => SessionWhereInputSchema).optional(),
  none: z.lazy(() => SessionWhereInputSchema).optional(),
}).strict();

export const CaseListRelationFilterSchema: z.ZodType<PrismaClient.Prisma.CaseListRelationFilter> = z.object({
  every: z.lazy(() => CaseWhereInputSchema).optional(),
  some: z.lazy(() => CaseWhereInputSchema).optional(),
  none: z.lazy(() => CaseWhereInputSchema).optional(),
}).strict();

export const AccountOrderByRelationAggregateInputSchema: z.ZodType<PrismaClient.Prisma.AccountOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<PrismaClient.Prisma.SessionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const CaseOrderByRelationAggregateInputSchema: z.ZodType<PrismaClient.Prisma.CaseOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const VerificationTokenIdentifierTokenCompoundUniqueInputSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenIdentifierTokenCompoundUniqueInput> = z.object({
  identifier: z.string(),
  token: z.string(),
}).strict();

export const VerificationTokenCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenCountOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const VerificationTokenMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenMaxOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const VerificationTokenMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenMinOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ImageCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.ImageCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ImageMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.ImageMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ImageMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.ImageMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const AuthorCreateNestedManyWithoutBooksInputSchema: z.ZodType<PrismaClient.Prisma.AuthorCreateNestedManyWithoutBooksInput> = z.object({
  create: z.union([z.lazy(() => AuthorCreateWithoutBooksInputSchema), z.lazy(() => AuthorCreateWithoutBooksInputSchema).array(), z.lazy(() => AuthorUncheckedCreateWithoutBooksInputSchema), z.lazy(() => AuthorUncheckedCreateWithoutBooksInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AuthorCreateOrConnectWithoutBooksInputSchema), z.lazy(() => AuthorCreateOrConnectWithoutBooksInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => AuthorWhereUniqueInputSchema), z.lazy(() => AuthorWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const GenreCreateNestedOneWithoutBooksInputSchema: z.ZodType<PrismaClient.Prisma.GenreCreateNestedOneWithoutBooksInput> = z.object({
  create: z.union([z.lazy(() => GenreCreateWithoutBooksInputSchema), z.lazy(() => GenreUncheckedCreateWithoutBooksInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => GenreCreateOrConnectWithoutBooksInputSchema).optional(),
  connect: z.lazy(() => GenreWhereUniqueInputSchema).optional(),
}).strict();

export const PurchaseLineCreateNestedManyWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineCreateNestedManyWithoutBookInput> = z.object({
  create: z.union([z.lazy(() => PurchaseLineCreateWithoutBookInputSchema), z.lazy(() => PurchaseLineCreateWithoutBookInputSchema).array(), z.lazy(() => PurchaseLineUncheckedCreateWithoutBookInputSchema), z.lazy(() => PurchaseLineUncheckedCreateWithoutBookInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PurchaseLineCreateOrConnectWithoutBookInputSchema), z.lazy(() => PurchaseLineCreateOrConnectWithoutBookInputSchema).array()]).optional(),
  createMany: z.lazy(() => PurchaseLineCreateManyBookInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => PurchaseLineWhereUniqueInputSchema), z.lazy(() => PurchaseLineWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const SalesLineCreateNestedManyWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineCreateNestedManyWithoutBookInput> = z.object({
  create: z.union([z.lazy(() => SalesLineCreateWithoutBookInputSchema), z.lazy(() => SalesLineCreateWithoutBookInputSchema).array(), z.lazy(() => SalesLineUncheckedCreateWithoutBookInputSchema), z.lazy(() => SalesLineUncheckedCreateWithoutBookInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => SalesLineCreateOrConnectWithoutBookInputSchema), z.lazy(() => SalesLineCreateOrConnectWithoutBookInputSchema).array()]).optional(),
  createMany: z.lazy(() => SalesLineCreateManyBookInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => SalesLineWhereUniqueInputSchema), z.lazy(() => SalesLineWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const BuybackLineCreateNestedManyWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.BuybackLineCreateNestedManyWithoutBookInput> = z.object({
  create: z.union([z.lazy(() => BuybackLineCreateWithoutBookInputSchema), z.lazy(() => BuybackLineCreateWithoutBookInputSchema).array(), z.lazy(() => BuybackLineUncheckedCreateWithoutBookInputSchema), z.lazy(() => BuybackLineUncheckedCreateWithoutBookInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BuybackLineCreateOrConnectWithoutBookInputSchema), z.lazy(() => BuybackLineCreateOrConnectWithoutBookInputSchema).array()]).optional(),
  createMany: z.lazy(() => BuybackLineCreateManyBookInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => BuybackLineWhereUniqueInputSchema), z.lazy(() => BuybackLineWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const CostMostRecentVendorCreateNestedManyWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorCreateNestedManyWithoutBookInput> = z.object({
  create: z.union([z.lazy(() => CostMostRecentVendorCreateWithoutBookInputSchema), z.lazy(() => CostMostRecentVendorCreateWithoutBookInputSchema).array(), z.lazy(() => CostMostRecentVendorUncheckedCreateWithoutBookInputSchema), z.lazy(() => CostMostRecentVendorUncheckedCreateWithoutBookInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CostMostRecentVendorCreateOrConnectWithoutBookInputSchema), z.lazy(() => CostMostRecentVendorCreateOrConnectWithoutBookInputSchema).array()]).optional(),
  createMany: z.lazy(() => CostMostRecentVendorCreateManyBookInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema), z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const CorrectionCreateNestedManyWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.CorrectionCreateNestedManyWithoutBookInput> = z.object({
  create: z.union([z.lazy(() => CorrectionCreateWithoutBookInputSchema), z.lazy(() => CorrectionCreateWithoutBookInputSchema).array(), z.lazy(() => CorrectionUncheckedCreateWithoutBookInputSchema), z.lazy(() => CorrectionUncheckedCreateWithoutBookInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CorrectionCreateOrConnectWithoutBookInputSchema), z.lazy(() => CorrectionCreateOrConnectWithoutBookInputSchema).array()]).optional(),
  createMany: z.lazy(() => CorrectionCreateManyBookInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => CorrectionWhereUniqueInputSchema), z.lazy(() => CorrectionWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const BookCreateNestedManyWithoutSymmetricRelatedBooksInputSchema: z.ZodType<PrismaClient.Prisma.BookCreateNestedManyWithoutSymmetricRelatedBooksInput> = z.object({
  create: z.union([z.lazy(() => BookCreateWithoutSymmetricRelatedBooksInputSchema), z.lazy(() => BookCreateWithoutSymmetricRelatedBooksInputSchema).array(), z.lazy(() => BookUncheckedCreateWithoutSymmetricRelatedBooksInputSchema), z.lazy(() => BookUncheckedCreateWithoutSymmetricRelatedBooksInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BookCreateOrConnectWithoutSymmetricRelatedBooksInputSchema), z.lazy(() => BookCreateOrConnectWithoutSymmetricRelatedBooksInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => BookWhereUniqueInputSchema), z.lazy(() => BookWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const BookCreateNestedManyWithoutRelatedBooksInputSchema: z.ZodType<PrismaClient.Prisma.BookCreateNestedManyWithoutRelatedBooksInput> = z.object({
  create: z.union([z.lazy(() => BookCreateWithoutRelatedBooksInputSchema), z.lazy(() => BookCreateWithoutRelatedBooksInputSchema).array(), z.lazy(() => BookUncheckedCreateWithoutRelatedBooksInputSchema), z.lazy(() => BookUncheckedCreateWithoutRelatedBooksInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BookCreateOrConnectWithoutRelatedBooksInputSchema), z.lazy(() => BookCreateOrConnectWithoutRelatedBooksInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => BookWhereUniqueInputSchema), z.lazy(() => BookWhereUniqueInputSchema).array()]).optional(),
}).strict();

<<<<<<< HEAD
export const BookOnShelfCreateNestedManyWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfCreateNestedManyWithoutBookInput> = z.object({
  create: z.union([z.lazy(() => BookOnShelfCreateWithoutBookInputSchema), z.lazy(() => BookOnShelfCreateWithoutBookInputSchema).array(), z.lazy(() => BookOnShelfUncheckedCreateWithoutBookInputSchema), z.lazy(() => BookOnShelfUncheckedCreateWithoutBookInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BookOnShelfCreateOrConnectWithoutBookInputSchema), z.lazy(() => BookOnShelfCreateOrConnectWithoutBookInputSchema).array()]).optional(),
  createMany: z.lazy(() => BookOnShelfCreateManyBookInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => BookOnShelfWhereUniqueInputSchema), z.lazy(() => BookOnShelfWhereUniqueInputSchema).array()]).optional(),
=======
export const ShelfCreateNestedManyWithoutBooksInputSchema: z.ZodType<PrismaClient.Prisma.ShelfCreateNestedManyWithoutBooksInput> = z.object({
  create: z.union([z.lazy(() => ShelfCreateWithoutBooksInputSchema), z.lazy(() => ShelfCreateWithoutBooksInputSchema).array(), z.lazy(() => ShelfUncheckedCreateWithoutBooksInputSchema), z.lazy(() => ShelfUncheckedCreateWithoutBooksInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ShelfCreateOrConnectWithoutBooksInputSchema), z.lazy(() => ShelfCreateOrConnectWithoutBooksInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ShelfWhereUniqueInputSchema), z.lazy(() => ShelfWhereUniqueInputSchema).array()]).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const AuthorUncheckedCreateNestedManyWithoutBooksInputSchema: z.ZodType<PrismaClient.Prisma.AuthorUncheckedCreateNestedManyWithoutBooksInput> = z.object({
  create: z.union([z.lazy(() => AuthorCreateWithoutBooksInputSchema), z.lazy(() => AuthorCreateWithoutBooksInputSchema).array(), z.lazy(() => AuthorUncheckedCreateWithoutBooksInputSchema), z.lazy(() => AuthorUncheckedCreateWithoutBooksInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AuthorCreateOrConnectWithoutBooksInputSchema), z.lazy(() => AuthorCreateOrConnectWithoutBooksInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => AuthorWhereUniqueInputSchema), z.lazy(() => AuthorWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const PurchaseLineUncheckedCreateNestedManyWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineUncheckedCreateNestedManyWithoutBookInput> = z.object({
  create: z.union([z.lazy(() => PurchaseLineCreateWithoutBookInputSchema), z.lazy(() => PurchaseLineCreateWithoutBookInputSchema).array(), z.lazy(() => PurchaseLineUncheckedCreateWithoutBookInputSchema), z.lazy(() => PurchaseLineUncheckedCreateWithoutBookInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PurchaseLineCreateOrConnectWithoutBookInputSchema), z.lazy(() => PurchaseLineCreateOrConnectWithoutBookInputSchema).array()]).optional(),
  createMany: z.lazy(() => PurchaseLineCreateManyBookInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => PurchaseLineWhereUniqueInputSchema), z.lazy(() => PurchaseLineWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const SalesLineUncheckedCreateNestedManyWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineUncheckedCreateNestedManyWithoutBookInput> = z.object({
  create: z.union([z.lazy(() => SalesLineCreateWithoutBookInputSchema), z.lazy(() => SalesLineCreateWithoutBookInputSchema).array(), z.lazy(() => SalesLineUncheckedCreateWithoutBookInputSchema), z.lazy(() => SalesLineUncheckedCreateWithoutBookInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => SalesLineCreateOrConnectWithoutBookInputSchema), z.lazy(() => SalesLineCreateOrConnectWithoutBookInputSchema).array()]).optional(),
  createMany: z.lazy(() => SalesLineCreateManyBookInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => SalesLineWhereUniqueInputSchema), z.lazy(() => SalesLineWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const BuybackLineUncheckedCreateNestedManyWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.BuybackLineUncheckedCreateNestedManyWithoutBookInput> = z.object({
  create: z.union([z.lazy(() => BuybackLineCreateWithoutBookInputSchema), z.lazy(() => BuybackLineCreateWithoutBookInputSchema).array(), z.lazy(() => BuybackLineUncheckedCreateWithoutBookInputSchema), z.lazy(() => BuybackLineUncheckedCreateWithoutBookInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BuybackLineCreateOrConnectWithoutBookInputSchema), z.lazy(() => BuybackLineCreateOrConnectWithoutBookInputSchema).array()]).optional(),
  createMany: z.lazy(() => BuybackLineCreateManyBookInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => BuybackLineWhereUniqueInputSchema), z.lazy(() => BuybackLineWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const CostMostRecentVendorUncheckedCreateNestedManyWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorUncheckedCreateNestedManyWithoutBookInput> = z.object({
  create: z.union([z.lazy(() => CostMostRecentVendorCreateWithoutBookInputSchema), z.lazy(() => CostMostRecentVendorCreateWithoutBookInputSchema).array(), z.lazy(() => CostMostRecentVendorUncheckedCreateWithoutBookInputSchema), z.lazy(() => CostMostRecentVendorUncheckedCreateWithoutBookInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CostMostRecentVendorCreateOrConnectWithoutBookInputSchema), z.lazy(() => CostMostRecentVendorCreateOrConnectWithoutBookInputSchema).array()]).optional(),
  createMany: z.lazy(() => CostMostRecentVendorCreateManyBookInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema), z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const CorrectionUncheckedCreateNestedManyWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.CorrectionUncheckedCreateNestedManyWithoutBookInput> = z.object({
  create: z.union([z.lazy(() => CorrectionCreateWithoutBookInputSchema), z.lazy(() => CorrectionCreateWithoutBookInputSchema).array(), z.lazy(() => CorrectionUncheckedCreateWithoutBookInputSchema), z.lazy(() => CorrectionUncheckedCreateWithoutBookInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CorrectionCreateOrConnectWithoutBookInputSchema), z.lazy(() => CorrectionCreateOrConnectWithoutBookInputSchema).array()]).optional(),
  createMany: z.lazy(() => CorrectionCreateManyBookInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => CorrectionWhereUniqueInputSchema), z.lazy(() => CorrectionWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const BookUncheckedCreateNestedManyWithoutSymmetricRelatedBooksInputSchema: z.ZodType<PrismaClient.Prisma.BookUncheckedCreateNestedManyWithoutSymmetricRelatedBooksInput> = z.object({
  create: z.union([z.lazy(() => BookCreateWithoutSymmetricRelatedBooksInputSchema), z.lazy(() => BookCreateWithoutSymmetricRelatedBooksInputSchema).array(), z.lazy(() => BookUncheckedCreateWithoutSymmetricRelatedBooksInputSchema), z.lazy(() => BookUncheckedCreateWithoutSymmetricRelatedBooksInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BookCreateOrConnectWithoutSymmetricRelatedBooksInputSchema), z.lazy(() => BookCreateOrConnectWithoutSymmetricRelatedBooksInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => BookWhereUniqueInputSchema), z.lazy(() => BookWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const BookUncheckedCreateNestedManyWithoutRelatedBooksInputSchema: z.ZodType<PrismaClient.Prisma.BookUncheckedCreateNestedManyWithoutRelatedBooksInput> = z.object({
  create: z.union([z.lazy(() => BookCreateWithoutRelatedBooksInputSchema), z.lazy(() => BookCreateWithoutRelatedBooksInputSchema).array(), z.lazy(() => BookUncheckedCreateWithoutRelatedBooksInputSchema), z.lazy(() => BookUncheckedCreateWithoutRelatedBooksInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BookCreateOrConnectWithoutRelatedBooksInputSchema), z.lazy(() => BookCreateOrConnectWithoutRelatedBooksInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => BookWhereUniqueInputSchema), z.lazy(() => BookWhereUniqueInputSchema).array()]).optional(),
}).strict();

<<<<<<< HEAD
export const BookOnShelfUncheckedCreateNestedManyWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfUncheckedCreateNestedManyWithoutBookInput> = z.object({
  create: z.union([z.lazy(() => BookOnShelfCreateWithoutBookInputSchema), z.lazy(() => BookOnShelfCreateWithoutBookInputSchema).array(), z.lazy(() => BookOnShelfUncheckedCreateWithoutBookInputSchema), z.lazy(() => BookOnShelfUncheckedCreateWithoutBookInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BookOnShelfCreateOrConnectWithoutBookInputSchema), z.lazy(() => BookOnShelfCreateOrConnectWithoutBookInputSchema).array()]).optional(),
  createMany: z.lazy(() => BookOnShelfCreateManyBookInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => BookOnShelfWhereUniqueInputSchema), z.lazy(() => BookOnShelfWhereUniqueInputSchema).array()]).optional(),
=======
export const ShelfUncheckedCreateNestedManyWithoutBooksInputSchema: z.ZodType<PrismaClient.Prisma.ShelfUncheckedCreateNestedManyWithoutBooksInput> = z.object({
  create: z.union([z.lazy(() => ShelfCreateWithoutBooksInputSchema), z.lazy(() => ShelfCreateWithoutBooksInputSchema).array(), z.lazy(() => ShelfUncheckedCreateWithoutBooksInputSchema), z.lazy(() => ShelfUncheckedCreateWithoutBooksInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ShelfCreateOrConnectWithoutBooksInputSchema), z.lazy(() => ShelfCreateOrConnectWithoutBooksInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ShelfWhereUniqueInputSchema), z.lazy(() => ShelfWhereUniqueInputSchema).array()]).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional(),
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional(),
}).strict();

export const AuthorUpdateManyWithoutBooksNestedInputSchema: z.ZodType<PrismaClient.Prisma.AuthorUpdateManyWithoutBooksNestedInput> = z.object({
  create: z.union([z.lazy(() => AuthorCreateWithoutBooksInputSchema), z.lazy(() => AuthorCreateWithoutBooksInputSchema).array(), z.lazy(() => AuthorUncheckedCreateWithoutBooksInputSchema), z.lazy(() => AuthorUncheckedCreateWithoutBooksInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AuthorCreateOrConnectWithoutBooksInputSchema), z.lazy(() => AuthorCreateOrConnectWithoutBooksInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => AuthorUpsertWithWhereUniqueWithoutBooksInputSchema), z.lazy(() => AuthorUpsertWithWhereUniqueWithoutBooksInputSchema).array()]).optional(),
  set: z.union([z.lazy(() => AuthorWhereUniqueInputSchema), z.lazy(() => AuthorWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => AuthorWhereUniqueInputSchema), z.lazy(() => AuthorWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => AuthorWhereUniqueInputSchema), z.lazy(() => AuthorWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => AuthorWhereUniqueInputSchema), z.lazy(() => AuthorWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => AuthorUpdateWithWhereUniqueWithoutBooksInputSchema), z.lazy(() => AuthorUpdateWithWhereUniqueWithoutBooksInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => AuthorUpdateManyWithWhereWithoutBooksInputSchema), z.lazy(() => AuthorUpdateManyWithWhereWithoutBooksInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => AuthorScalarWhereInputSchema), z.lazy(() => AuthorScalarWhereInputSchema).array()]).optional(),
}).strict();

export const GenreUpdateOneRequiredWithoutBooksNestedInputSchema: z.ZodType<PrismaClient.Prisma.GenreUpdateOneRequiredWithoutBooksNestedInput> = z.object({
  create: z.union([z.lazy(() => GenreCreateWithoutBooksInputSchema), z.lazy(() => GenreUncheckedCreateWithoutBooksInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => GenreCreateOrConnectWithoutBooksInputSchema).optional(),
  upsert: z.lazy(() => GenreUpsertWithoutBooksInputSchema).optional(),
  connect: z.lazy(() => GenreWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => GenreUpdateWithoutBooksInputSchema), z.lazy(() => GenreUncheckedUpdateWithoutBooksInputSchema)]).optional(),
}).strict();

export const PurchaseLineUpdateManyWithoutBookNestedInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineUpdateManyWithoutBookNestedInput> = z.object({
  create: z.union([z.lazy(() => PurchaseLineCreateWithoutBookInputSchema), z.lazy(() => PurchaseLineCreateWithoutBookInputSchema).array(), z.lazy(() => PurchaseLineUncheckedCreateWithoutBookInputSchema), z.lazy(() => PurchaseLineUncheckedCreateWithoutBookInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PurchaseLineCreateOrConnectWithoutBookInputSchema), z.lazy(() => PurchaseLineCreateOrConnectWithoutBookInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => PurchaseLineUpsertWithWhereUniqueWithoutBookInputSchema), z.lazy(() => PurchaseLineUpsertWithWhereUniqueWithoutBookInputSchema).array()]).optional(),
  createMany: z.lazy(() => PurchaseLineCreateManyBookInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => PurchaseLineWhereUniqueInputSchema), z.lazy(() => PurchaseLineWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => PurchaseLineWhereUniqueInputSchema), z.lazy(() => PurchaseLineWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => PurchaseLineWhereUniqueInputSchema), z.lazy(() => PurchaseLineWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => PurchaseLineWhereUniqueInputSchema), z.lazy(() => PurchaseLineWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => PurchaseLineUpdateWithWhereUniqueWithoutBookInputSchema), z.lazy(() => PurchaseLineUpdateWithWhereUniqueWithoutBookInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => PurchaseLineUpdateManyWithWhereWithoutBookInputSchema), z.lazy(() => PurchaseLineUpdateManyWithWhereWithoutBookInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => PurchaseLineScalarWhereInputSchema), z.lazy(() => PurchaseLineScalarWhereInputSchema).array()]).optional(),
}).strict();

export const SalesLineUpdateManyWithoutBookNestedInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineUpdateManyWithoutBookNestedInput> = z.object({
  create: z.union([z.lazy(() => SalesLineCreateWithoutBookInputSchema), z.lazy(() => SalesLineCreateWithoutBookInputSchema).array(), z.lazy(() => SalesLineUncheckedCreateWithoutBookInputSchema), z.lazy(() => SalesLineUncheckedCreateWithoutBookInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => SalesLineCreateOrConnectWithoutBookInputSchema), z.lazy(() => SalesLineCreateOrConnectWithoutBookInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => SalesLineUpsertWithWhereUniqueWithoutBookInputSchema), z.lazy(() => SalesLineUpsertWithWhereUniqueWithoutBookInputSchema).array()]).optional(),
  createMany: z.lazy(() => SalesLineCreateManyBookInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => SalesLineWhereUniqueInputSchema), z.lazy(() => SalesLineWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => SalesLineWhereUniqueInputSchema), z.lazy(() => SalesLineWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => SalesLineWhereUniqueInputSchema), z.lazy(() => SalesLineWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => SalesLineWhereUniqueInputSchema), z.lazy(() => SalesLineWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => SalesLineUpdateWithWhereUniqueWithoutBookInputSchema), z.lazy(() => SalesLineUpdateWithWhereUniqueWithoutBookInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => SalesLineUpdateManyWithWhereWithoutBookInputSchema), z.lazy(() => SalesLineUpdateManyWithWhereWithoutBookInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => SalesLineScalarWhereInputSchema), z.lazy(() => SalesLineScalarWhereInputSchema).array()]).optional(),
}).strict();

export const BuybackLineUpdateManyWithoutBookNestedInputSchema: z.ZodType<PrismaClient.Prisma.BuybackLineUpdateManyWithoutBookNestedInput> = z.object({
  create: z.union([z.lazy(() => BuybackLineCreateWithoutBookInputSchema), z.lazy(() => BuybackLineCreateWithoutBookInputSchema).array(), z.lazy(() => BuybackLineUncheckedCreateWithoutBookInputSchema), z.lazy(() => BuybackLineUncheckedCreateWithoutBookInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BuybackLineCreateOrConnectWithoutBookInputSchema), z.lazy(() => BuybackLineCreateOrConnectWithoutBookInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => BuybackLineUpsertWithWhereUniqueWithoutBookInputSchema), z.lazy(() => BuybackLineUpsertWithWhereUniqueWithoutBookInputSchema).array()]).optional(),
  createMany: z.lazy(() => BuybackLineCreateManyBookInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => BuybackLineWhereUniqueInputSchema), z.lazy(() => BuybackLineWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => BuybackLineWhereUniqueInputSchema), z.lazy(() => BuybackLineWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => BuybackLineWhereUniqueInputSchema), z.lazy(() => BuybackLineWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => BuybackLineWhereUniqueInputSchema), z.lazy(() => BuybackLineWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => BuybackLineUpdateWithWhereUniqueWithoutBookInputSchema), z.lazy(() => BuybackLineUpdateWithWhereUniqueWithoutBookInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => BuybackLineUpdateManyWithWhereWithoutBookInputSchema), z.lazy(() => BuybackLineUpdateManyWithWhereWithoutBookInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => BuybackLineScalarWhereInputSchema), z.lazy(() => BuybackLineScalarWhereInputSchema).array()]).optional(),
}).strict();

export const CostMostRecentVendorUpdateManyWithoutBookNestedInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorUpdateManyWithoutBookNestedInput> = z.object({
  create: z.union([z.lazy(() => CostMostRecentVendorCreateWithoutBookInputSchema), z.lazy(() => CostMostRecentVendorCreateWithoutBookInputSchema).array(), z.lazy(() => CostMostRecentVendorUncheckedCreateWithoutBookInputSchema), z.lazy(() => CostMostRecentVendorUncheckedCreateWithoutBookInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CostMostRecentVendorCreateOrConnectWithoutBookInputSchema), z.lazy(() => CostMostRecentVendorCreateOrConnectWithoutBookInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CostMostRecentVendorUpsertWithWhereUniqueWithoutBookInputSchema), z.lazy(() => CostMostRecentVendorUpsertWithWhereUniqueWithoutBookInputSchema).array()]).optional(),
  createMany: z.lazy(() => CostMostRecentVendorCreateManyBookInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema), z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema), z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema), z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema), z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => CostMostRecentVendorUpdateWithWhereUniqueWithoutBookInputSchema), z.lazy(() => CostMostRecentVendorUpdateWithWhereUniqueWithoutBookInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CostMostRecentVendorUpdateManyWithWhereWithoutBookInputSchema), z.lazy(() => CostMostRecentVendorUpdateManyWithWhereWithoutBookInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CostMostRecentVendorScalarWhereInputSchema), z.lazy(() => CostMostRecentVendorScalarWhereInputSchema).array()]).optional(),
}).strict();

export const CorrectionUpdateManyWithoutBookNestedInputSchema: z.ZodType<PrismaClient.Prisma.CorrectionUpdateManyWithoutBookNestedInput> = z.object({
  create: z.union([z.lazy(() => CorrectionCreateWithoutBookInputSchema), z.lazy(() => CorrectionCreateWithoutBookInputSchema).array(), z.lazy(() => CorrectionUncheckedCreateWithoutBookInputSchema), z.lazy(() => CorrectionUncheckedCreateWithoutBookInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CorrectionCreateOrConnectWithoutBookInputSchema), z.lazy(() => CorrectionCreateOrConnectWithoutBookInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CorrectionUpsertWithWhereUniqueWithoutBookInputSchema), z.lazy(() => CorrectionUpsertWithWhereUniqueWithoutBookInputSchema).array()]).optional(),
  createMany: z.lazy(() => CorrectionCreateManyBookInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => CorrectionWhereUniqueInputSchema), z.lazy(() => CorrectionWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CorrectionWhereUniqueInputSchema), z.lazy(() => CorrectionWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CorrectionWhereUniqueInputSchema), z.lazy(() => CorrectionWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CorrectionWhereUniqueInputSchema), z.lazy(() => CorrectionWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => CorrectionUpdateWithWhereUniqueWithoutBookInputSchema), z.lazy(() => CorrectionUpdateWithWhereUniqueWithoutBookInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CorrectionUpdateManyWithWhereWithoutBookInputSchema), z.lazy(() => CorrectionUpdateManyWithWhereWithoutBookInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CorrectionScalarWhereInputSchema), z.lazy(() => CorrectionScalarWhereInputSchema).array()]).optional(),
}).strict();

export const BookUpdateManyWithoutSymmetricRelatedBooksNestedInputSchema: z.ZodType<PrismaClient.Prisma.BookUpdateManyWithoutSymmetricRelatedBooksNestedInput> = z.object({
  create: z.union([z.lazy(() => BookCreateWithoutSymmetricRelatedBooksInputSchema), z.lazy(() => BookCreateWithoutSymmetricRelatedBooksInputSchema).array(), z.lazy(() => BookUncheckedCreateWithoutSymmetricRelatedBooksInputSchema), z.lazy(() => BookUncheckedCreateWithoutSymmetricRelatedBooksInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BookCreateOrConnectWithoutSymmetricRelatedBooksInputSchema), z.lazy(() => BookCreateOrConnectWithoutSymmetricRelatedBooksInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => BookUpsertWithWhereUniqueWithoutSymmetricRelatedBooksInputSchema), z.lazy(() => BookUpsertWithWhereUniqueWithoutSymmetricRelatedBooksInputSchema).array()]).optional(),
  set: z.union([z.lazy(() => BookWhereUniqueInputSchema), z.lazy(() => BookWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => BookWhereUniqueInputSchema), z.lazy(() => BookWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => BookWhereUniqueInputSchema), z.lazy(() => BookWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => BookWhereUniqueInputSchema), z.lazy(() => BookWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => BookUpdateWithWhereUniqueWithoutSymmetricRelatedBooksInputSchema), z.lazy(() => BookUpdateWithWhereUniqueWithoutSymmetricRelatedBooksInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => BookUpdateManyWithWhereWithoutSymmetricRelatedBooksInputSchema), z.lazy(() => BookUpdateManyWithWhereWithoutSymmetricRelatedBooksInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => BookScalarWhereInputSchema), z.lazy(() => BookScalarWhereInputSchema).array()]).optional(),
}).strict();

export const BookUpdateManyWithoutRelatedBooksNestedInputSchema: z.ZodType<PrismaClient.Prisma.BookUpdateManyWithoutRelatedBooksNestedInput> = z.object({
  create: z.union([z.lazy(() => BookCreateWithoutRelatedBooksInputSchema), z.lazy(() => BookCreateWithoutRelatedBooksInputSchema).array(), z.lazy(() => BookUncheckedCreateWithoutRelatedBooksInputSchema), z.lazy(() => BookUncheckedCreateWithoutRelatedBooksInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BookCreateOrConnectWithoutRelatedBooksInputSchema), z.lazy(() => BookCreateOrConnectWithoutRelatedBooksInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => BookUpsertWithWhereUniqueWithoutRelatedBooksInputSchema), z.lazy(() => BookUpsertWithWhereUniqueWithoutRelatedBooksInputSchema).array()]).optional(),
  set: z.union([z.lazy(() => BookWhereUniqueInputSchema), z.lazy(() => BookWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => BookWhereUniqueInputSchema), z.lazy(() => BookWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => BookWhereUniqueInputSchema), z.lazy(() => BookWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => BookWhereUniqueInputSchema), z.lazy(() => BookWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => BookUpdateWithWhereUniqueWithoutRelatedBooksInputSchema), z.lazy(() => BookUpdateWithWhereUniqueWithoutRelatedBooksInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => BookUpdateManyWithWhereWithoutRelatedBooksInputSchema), z.lazy(() => BookUpdateManyWithWhereWithoutRelatedBooksInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => BookScalarWhereInputSchema), z.lazy(() => BookScalarWhereInputSchema).array()]).optional(),
}).strict();

<<<<<<< HEAD
export const BookOnShelfUpdateManyWithoutBookNestedInputSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfUpdateManyWithoutBookNestedInput> = z.object({
  create: z.union([z.lazy(() => BookOnShelfCreateWithoutBookInputSchema), z.lazy(() => BookOnShelfCreateWithoutBookInputSchema).array(), z.lazy(() => BookOnShelfUncheckedCreateWithoutBookInputSchema), z.lazy(() => BookOnShelfUncheckedCreateWithoutBookInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BookOnShelfCreateOrConnectWithoutBookInputSchema), z.lazy(() => BookOnShelfCreateOrConnectWithoutBookInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => BookOnShelfUpsertWithWhereUniqueWithoutBookInputSchema), z.lazy(() => BookOnShelfUpsertWithWhereUniqueWithoutBookInputSchema).array()]).optional(),
  createMany: z.lazy(() => BookOnShelfCreateManyBookInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => BookOnShelfWhereUniqueInputSchema), z.lazy(() => BookOnShelfWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => BookOnShelfWhereUniqueInputSchema), z.lazy(() => BookOnShelfWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => BookOnShelfWhereUniqueInputSchema), z.lazy(() => BookOnShelfWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => BookOnShelfWhereUniqueInputSchema), z.lazy(() => BookOnShelfWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => BookOnShelfUpdateWithWhereUniqueWithoutBookInputSchema), z.lazy(() => BookOnShelfUpdateWithWhereUniqueWithoutBookInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => BookOnShelfUpdateManyWithWhereWithoutBookInputSchema), z.lazy(() => BookOnShelfUpdateManyWithWhereWithoutBookInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => BookOnShelfScalarWhereInputSchema), z.lazy(() => BookOnShelfScalarWhereInputSchema).array()]).optional(),
=======
export const ShelfUpdateManyWithoutBooksNestedInputSchema: z.ZodType<PrismaClient.Prisma.ShelfUpdateManyWithoutBooksNestedInput> = z.object({
  create: z.union([z.lazy(() => ShelfCreateWithoutBooksInputSchema), z.lazy(() => ShelfCreateWithoutBooksInputSchema).array(), z.lazy(() => ShelfUncheckedCreateWithoutBooksInputSchema), z.lazy(() => ShelfUncheckedCreateWithoutBooksInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ShelfCreateOrConnectWithoutBooksInputSchema), z.lazy(() => ShelfCreateOrConnectWithoutBooksInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ShelfUpsertWithWhereUniqueWithoutBooksInputSchema), z.lazy(() => ShelfUpsertWithWhereUniqueWithoutBooksInputSchema).array()]).optional(),
  set: z.union([z.lazy(() => ShelfWhereUniqueInputSchema), z.lazy(() => ShelfWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ShelfWhereUniqueInputSchema), z.lazy(() => ShelfWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ShelfWhereUniqueInputSchema), z.lazy(() => ShelfWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ShelfWhereUniqueInputSchema), z.lazy(() => ShelfWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => ShelfUpdateWithWhereUniqueWithoutBooksInputSchema), z.lazy(() => ShelfUpdateWithWhereUniqueWithoutBooksInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ShelfUpdateManyWithWhereWithoutBooksInputSchema), z.lazy(() => ShelfUpdateManyWithWhereWithoutBooksInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ShelfScalarWhereInputSchema), z.lazy(() => ShelfScalarWhereInputSchema).array()]).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const AuthorUncheckedUpdateManyWithoutBooksNestedInputSchema: z.ZodType<PrismaClient.Prisma.AuthorUncheckedUpdateManyWithoutBooksNestedInput> = z.object({
  create: z.union([z.lazy(() => AuthorCreateWithoutBooksInputSchema), z.lazy(() => AuthorCreateWithoutBooksInputSchema).array(), z.lazy(() => AuthorUncheckedCreateWithoutBooksInputSchema), z.lazy(() => AuthorUncheckedCreateWithoutBooksInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AuthorCreateOrConnectWithoutBooksInputSchema), z.lazy(() => AuthorCreateOrConnectWithoutBooksInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => AuthorUpsertWithWhereUniqueWithoutBooksInputSchema), z.lazy(() => AuthorUpsertWithWhereUniqueWithoutBooksInputSchema).array()]).optional(),
  set: z.union([z.lazy(() => AuthorWhereUniqueInputSchema), z.lazy(() => AuthorWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => AuthorWhereUniqueInputSchema), z.lazy(() => AuthorWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => AuthorWhereUniqueInputSchema), z.lazy(() => AuthorWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => AuthorWhereUniqueInputSchema), z.lazy(() => AuthorWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => AuthorUpdateWithWhereUniqueWithoutBooksInputSchema), z.lazy(() => AuthorUpdateWithWhereUniqueWithoutBooksInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => AuthorUpdateManyWithWhereWithoutBooksInputSchema), z.lazy(() => AuthorUpdateManyWithWhereWithoutBooksInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => AuthorScalarWhereInputSchema), z.lazy(() => AuthorScalarWhereInputSchema).array()]).optional(),
}).strict();

export const PurchaseLineUncheckedUpdateManyWithoutBookNestedInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineUncheckedUpdateManyWithoutBookNestedInput> = z.object({
  create: z.union([z.lazy(() => PurchaseLineCreateWithoutBookInputSchema), z.lazy(() => PurchaseLineCreateWithoutBookInputSchema).array(), z.lazy(() => PurchaseLineUncheckedCreateWithoutBookInputSchema), z.lazy(() => PurchaseLineUncheckedCreateWithoutBookInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PurchaseLineCreateOrConnectWithoutBookInputSchema), z.lazy(() => PurchaseLineCreateOrConnectWithoutBookInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => PurchaseLineUpsertWithWhereUniqueWithoutBookInputSchema), z.lazy(() => PurchaseLineUpsertWithWhereUniqueWithoutBookInputSchema).array()]).optional(),
  createMany: z.lazy(() => PurchaseLineCreateManyBookInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => PurchaseLineWhereUniqueInputSchema), z.lazy(() => PurchaseLineWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => PurchaseLineWhereUniqueInputSchema), z.lazy(() => PurchaseLineWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => PurchaseLineWhereUniqueInputSchema), z.lazy(() => PurchaseLineWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => PurchaseLineWhereUniqueInputSchema), z.lazy(() => PurchaseLineWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => PurchaseLineUpdateWithWhereUniqueWithoutBookInputSchema), z.lazy(() => PurchaseLineUpdateWithWhereUniqueWithoutBookInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => PurchaseLineUpdateManyWithWhereWithoutBookInputSchema), z.lazy(() => PurchaseLineUpdateManyWithWhereWithoutBookInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => PurchaseLineScalarWhereInputSchema), z.lazy(() => PurchaseLineScalarWhereInputSchema).array()]).optional(),
}).strict();

export const SalesLineUncheckedUpdateManyWithoutBookNestedInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineUncheckedUpdateManyWithoutBookNestedInput> = z.object({
  create: z.union([z.lazy(() => SalesLineCreateWithoutBookInputSchema), z.lazy(() => SalesLineCreateWithoutBookInputSchema).array(), z.lazy(() => SalesLineUncheckedCreateWithoutBookInputSchema), z.lazy(() => SalesLineUncheckedCreateWithoutBookInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => SalesLineCreateOrConnectWithoutBookInputSchema), z.lazy(() => SalesLineCreateOrConnectWithoutBookInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => SalesLineUpsertWithWhereUniqueWithoutBookInputSchema), z.lazy(() => SalesLineUpsertWithWhereUniqueWithoutBookInputSchema).array()]).optional(),
  createMany: z.lazy(() => SalesLineCreateManyBookInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => SalesLineWhereUniqueInputSchema), z.lazy(() => SalesLineWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => SalesLineWhereUniqueInputSchema), z.lazy(() => SalesLineWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => SalesLineWhereUniqueInputSchema), z.lazy(() => SalesLineWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => SalesLineWhereUniqueInputSchema), z.lazy(() => SalesLineWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => SalesLineUpdateWithWhereUniqueWithoutBookInputSchema), z.lazy(() => SalesLineUpdateWithWhereUniqueWithoutBookInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => SalesLineUpdateManyWithWhereWithoutBookInputSchema), z.lazy(() => SalesLineUpdateManyWithWhereWithoutBookInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => SalesLineScalarWhereInputSchema), z.lazy(() => SalesLineScalarWhereInputSchema).array()]).optional(),
}).strict();

export const BuybackLineUncheckedUpdateManyWithoutBookNestedInputSchema: z.ZodType<PrismaClient.Prisma.BuybackLineUncheckedUpdateManyWithoutBookNestedInput> = z.object({
  create: z.union([z.lazy(() => BuybackLineCreateWithoutBookInputSchema), z.lazy(() => BuybackLineCreateWithoutBookInputSchema).array(), z.lazy(() => BuybackLineUncheckedCreateWithoutBookInputSchema), z.lazy(() => BuybackLineUncheckedCreateWithoutBookInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BuybackLineCreateOrConnectWithoutBookInputSchema), z.lazy(() => BuybackLineCreateOrConnectWithoutBookInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => BuybackLineUpsertWithWhereUniqueWithoutBookInputSchema), z.lazy(() => BuybackLineUpsertWithWhereUniqueWithoutBookInputSchema).array()]).optional(),
  createMany: z.lazy(() => BuybackLineCreateManyBookInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => BuybackLineWhereUniqueInputSchema), z.lazy(() => BuybackLineWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => BuybackLineWhereUniqueInputSchema), z.lazy(() => BuybackLineWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => BuybackLineWhereUniqueInputSchema), z.lazy(() => BuybackLineWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => BuybackLineWhereUniqueInputSchema), z.lazy(() => BuybackLineWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => BuybackLineUpdateWithWhereUniqueWithoutBookInputSchema), z.lazy(() => BuybackLineUpdateWithWhereUniqueWithoutBookInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => BuybackLineUpdateManyWithWhereWithoutBookInputSchema), z.lazy(() => BuybackLineUpdateManyWithWhereWithoutBookInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => BuybackLineScalarWhereInputSchema), z.lazy(() => BuybackLineScalarWhereInputSchema).array()]).optional(),
}).strict();

export const CostMostRecentVendorUncheckedUpdateManyWithoutBookNestedInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorUncheckedUpdateManyWithoutBookNestedInput> = z.object({
  create: z.union([z.lazy(() => CostMostRecentVendorCreateWithoutBookInputSchema), z.lazy(() => CostMostRecentVendorCreateWithoutBookInputSchema).array(), z.lazy(() => CostMostRecentVendorUncheckedCreateWithoutBookInputSchema), z.lazy(() => CostMostRecentVendorUncheckedCreateWithoutBookInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CostMostRecentVendorCreateOrConnectWithoutBookInputSchema), z.lazy(() => CostMostRecentVendorCreateOrConnectWithoutBookInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CostMostRecentVendorUpsertWithWhereUniqueWithoutBookInputSchema), z.lazy(() => CostMostRecentVendorUpsertWithWhereUniqueWithoutBookInputSchema).array()]).optional(),
  createMany: z.lazy(() => CostMostRecentVendorCreateManyBookInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema), z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema), z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema), z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema), z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => CostMostRecentVendorUpdateWithWhereUniqueWithoutBookInputSchema), z.lazy(() => CostMostRecentVendorUpdateWithWhereUniqueWithoutBookInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CostMostRecentVendorUpdateManyWithWhereWithoutBookInputSchema), z.lazy(() => CostMostRecentVendorUpdateManyWithWhereWithoutBookInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CostMostRecentVendorScalarWhereInputSchema), z.lazy(() => CostMostRecentVendorScalarWhereInputSchema).array()]).optional(),
}).strict();

export const CorrectionUncheckedUpdateManyWithoutBookNestedInputSchema: z.ZodType<PrismaClient.Prisma.CorrectionUncheckedUpdateManyWithoutBookNestedInput> = z.object({
  create: z.union([z.lazy(() => CorrectionCreateWithoutBookInputSchema), z.lazy(() => CorrectionCreateWithoutBookInputSchema).array(), z.lazy(() => CorrectionUncheckedCreateWithoutBookInputSchema), z.lazy(() => CorrectionUncheckedCreateWithoutBookInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CorrectionCreateOrConnectWithoutBookInputSchema), z.lazy(() => CorrectionCreateOrConnectWithoutBookInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CorrectionUpsertWithWhereUniqueWithoutBookInputSchema), z.lazy(() => CorrectionUpsertWithWhereUniqueWithoutBookInputSchema).array()]).optional(),
  createMany: z.lazy(() => CorrectionCreateManyBookInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => CorrectionWhereUniqueInputSchema), z.lazy(() => CorrectionWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CorrectionWhereUniqueInputSchema), z.lazy(() => CorrectionWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CorrectionWhereUniqueInputSchema), z.lazy(() => CorrectionWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CorrectionWhereUniqueInputSchema), z.lazy(() => CorrectionWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => CorrectionUpdateWithWhereUniqueWithoutBookInputSchema), z.lazy(() => CorrectionUpdateWithWhereUniqueWithoutBookInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CorrectionUpdateManyWithWhereWithoutBookInputSchema), z.lazy(() => CorrectionUpdateManyWithWhereWithoutBookInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CorrectionScalarWhereInputSchema), z.lazy(() => CorrectionScalarWhereInputSchema).array()]).optional(),
}).strict();

export const BookUncheckedUpdateManyWithoutSymmetricRelatedBooksNestedInputSchema: z.ZodType<PrismaClient.Prisma.BookUncheckedUpdateManyWithoutSymmetricRelatedBooksNestedInput> = z.object({
  create: z.union([z.lazy(() => BookCreateWithoutSymmetricRelatedBooksInputSchema), z.lazy(() => BookCreateWithoutSymmetricRelatedBooksInputSchema).array(), z.lazy(() => BookUncheckedCreateWithoutSymmetricRelatedBooksInputSchema), z.lazy(() => BookUncheckedCreateWithoutSymmetricRelatedBooksInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BookCreateOrConnectWithoutSymmetricRelatedBooksInputSchema), z.lazy(() => BookCreateOrConnectWithoutSymmetricRelatedBooksInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => BookUpsertWithWhereUniqueWithoutSymmetricRelatedBooksInputSchema), z.lazy(() => BookUpsertWithWhereUniqueWithoutSymmetricRelatedBooksInputSchema).array()]).optional(),
  set: z.union([z.lazy(() => BookWhereUniqueInputSchema), z.lazy(() => BookWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => BookWhereUniqueInputSchema), z.lazy(() => BookWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => BookWhereUniqueInputSchema), z.lazy(() => BookWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => BookWhereUniqueInputSchema), z.lazy(() => BookWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => BookUpdateWithWhereUniqueWithoutSymmetricRelatedBooksInputSchema), z.lazy(() => BookUpdateWithWhereUniqueWithoutSymmetricRelatedBooksInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => BookUpdateManyWithWhereWithoutSymmetricRelatedBooksInputSchema), z.lazy(() => BookUpdateManyWithWhereWithoutSymmetricRelatedBooksInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => BookScalarWhereInputSchema), z.lazy(() => BookScalarWhereInputSchema).array()]).optional(),
}).strict();

export const BookUncheckedUpdateManyWithoutRelatedBooksNestedInputSchema: z.ZodType<PrismaClient.Prisma.BookUncheckedUpdateManyWithoutRelatedBooksNestedInput> = z.object({
  create: z.union([z.lazy(() => BookCreateWithoutRelatedBooksInputSchema), z.lazy(() => BookCreateWithoutRelatedBooksInputSchema).array(), z.lazy(() => BookUncheckedCreateWithoutRelatedBooksInputSchema), z.lazy(() => BookUncheckedCreateWithoutRelatedBooksInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BookCreateOrConnectWithoutRelatedBooksInputSchema), z.lazy(() => BookCreateOrConnectWithoutRelatedBooksInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => BookUpsertWithWhereUniqueWithoutRelatedBooksInputSchema), z.lazy(() => BookUpsertWithWhereUniqueWithoutRelatedBooksInputSchema).array()]).optional(),
  set: z.union([z.lazy(() => BookWhereUniqueInputSchema), z.lazy(() => BookWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => BookWhereUniqueInputSchema), z.lazy(() => BookWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => BookWhereUniqueInputSchema), z.lazy(() => BookWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => BookWhereUniqueInputSchema), z.lazy(() => BookWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => BookUpdateWithWhereUniqueWithoutRelatedBooksInputSchema), z.lazy(() => BookUpdateWithWhereUniqueWithoutRelatedBooksInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => BookUpdateManyWithWhereWithoutRelatedBooksInputSchema), z.lazy(() => BookUpdateManyWithWhereWithoutRelatedBooksInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => BookScalarWhereInputSchema), z.lazy(() => BookScalarWhereInputSchema).array()]).optional(),
}).strict();

<<<<<<< HEAD
export const BookOnShelfUncheckedUpdateManyWithoutBookNestedInputSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfUncheckedUpdateManyWithoutBookNestedInput> = z.object({
  create: z.union([z.lazy(() => BookOnShelfCreateWithoutBookInputSchema), z.lazy(() => BookOnShelfCreateWithoutBookInputSchema).array(), z.lazy(() => BookOnShelfUncheckedCreateWithoutBookInputSchema), z.lazy(() => BookOnShelfUncheckedCreateWithoutBookInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BookOnShelfCreateOrConnectWithoutBookInputSchema), z.lazy(() => BookOnShelfCreateOrConnectWithoutBookInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => BookOnShelfUpsertWithWhereUniqueWithoutBookInputSchema), z.lazy(() => BookOnShelfUpsertWithWhereUniqueWithoutBookInputSchema).array()]).optional(),
  createMany: z.lazy(() => BookOnShelfCreateManyBookInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => BookOnShelfWhereUniqueInputSchema), z.lazy(() => BookOnShelfWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => BookOnShelfWhereUniqueInputSchema), z.lazy(() => BookOnShelfWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => BookOnShelfWhereUniqueInputSchema), z.lazy(() => BookOnShelfWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => BookOnShelfWhereUniqueInputSchema), z.lazy(() => BookOnShelfWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => BookOnShelfUpdateWithWhereUniqueWithoutBookInputSchema), z.lazy(() => BookOnShelfUpdateWithWhereUniqueWithoutBookInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => BookOnShelfUpdateManyWithWhereWithoutBookInputSchema), z.lazy(() => BookOnShelfUpdateManyWithWhereWithoutBookInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => BookOnShelfScalarWhereInputSchema), z.lazy(() => BookOnShelfScalarWhereInputSchema).array()]).optional(),
=======
export const ShelfUncheckedUpdateManyWithoutBooksNestedInputSchema: z.ZodType<PrismaClient.Prisma.ShelfUncheckedUpdateManyWithoutBooksNestedInput> = z.object({
  create: z.union([z.lazy(() => ShelfCreateWithoutBooksInputSchema), z.lazy(() => ShelfCreateWithoutBooksInputSchema).array(), z.lazy(() => ShelfUncheckedCreateWithoutBooksInputSchema), z.lazy(() => ShelfUncheckedCreateWithoutBooksInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ShelfCreateOrConnectWithoutBooksInputSchema), z.lazy(() => ShelfCreateOrConnectWithoutBooksInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ShelfUpsertWithWhereUniqueWithoutBooksInputSchema), z.lazy(() => ShelfUpsertWithWhereUniqueWithoutBooksInputSchema).array()]).optional(),
  set: z.union([z.lazy(() => ShelfWhereUniqueInputSchema), z.lazy(() => ShelfWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ShelfWhereUniqueInputSchema), z.lazy(() => ShelfWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ShelfWhereUniqueInputSchema), z.lazy(() => ShelfWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ShelfWhereUniqueInputSchema), z.lazy(() => ShelfWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => ShelfUpdateWithWhereUniqueWithoutBooksInputSchema), z.lazy(() => ShelfUpdateWithWhereUniqueWithoutBooksInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ShelfUpdateManyWithWhereWithoutBooksInputSchema), z.lazy(() => ShelfUpdateManyWithWhereWithoutBooksInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ShelfScalarWhereInputSchema), z.lazy(() => ShelfScalarWhereInputSchema).array()]).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const BookCreateNestedManyWithoutGenreInputSchema: z.ZodType<PrismaClient.Prisma.BookCreateNestedManyWithoutGenreInput> = z.object({
  create: z.union([z.lazy(() => BookCreateWithoutGenreInputSchema), z.lazy(() => BookCreateWithoutGenreInputSchema).array(), z.lazy(() => BookUncheckedCreateWithoutGenreInputSchema), z.lazy(() => BookUncheckedCreateWithoutGenreInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BookCreateOrConnectWithoutGenreInputSchema), z.lazy(() => BookCreateOrConnectWithoutGenreInputSchema).array()]).optional(),
  createMany: z.lazy(() => BookCreateManyGenreInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => BookWhereUniqueInputSchema), z.lazy(() => BookWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const BookUncheckedCreateNestedManyWithoutGenreInputSchema: z.ZodType<PrismaClient.Prisma.BookUncheckedCreateNestedManyWithoutGenreInput> = z.object({
  create: z.union([z.lazy(() => BookCreateWithoutGenreInputSchema), z.lazy(() => BookCreateWithoutGenreInputSchema).array(), z.lazy(() => BookUncheckedCreateWithoutGenreInputSchema), z.lazy(() => BookUncheckedCreateWithoutGenreInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BookCreateOrConnectWithoutGenreInputSchema), z.lazy(() => BookCreateOrConnectWithoutGenreInputSchema).array()]).optional(),
  createMany: z.lazy(() => BookCreateManyGenreInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => BookWhereUniqueInputSchema), z.lazy(() => BookWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const BookUpdateManyWithoutGenreNestedInputSchema: z.ZodType<PrismaClient.Prisma.BookUpdateManyWithoutGenreNestedInput> = z.object({
  create: z.union([z.lazy(() => BookCreateWithoutGenreInputSchema), z.lazy(() => BookCreateWithoutGenreInputSchema).array(), z.lazy(() => BookUncheckedCreateWithoutGenreInputSchema), z.lazy(() => BookUncheckedCreateWithoutGenreInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BookCreateOrConnectWithoutGenreInputSchema), z.lazy(() => BookCreateOrConnectWithoutGenreInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => BookUpsertWithWhereUniqueWithoutGenreInputSchema), z.lazy(() => BookUpsertWithWhereUniqueWithoutGenreInputSchema).array()]).optional(),
  createMany: z.lazy(() => BookCreateManyGenreInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => BookWhereUniqueInputSchema), z.lazy(() => BookWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => BookWhereUniqueInputSchema), z.lazy(() => BookWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => BookWhereUniqueInputSchema), z.lazy(() => BookWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => BookWhereUniqueInputSchema), z.lazy(() => BookWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => BookUpdateWithWhereUniqueWithoutGenreInputSchema), z.lazy(() => BookUpdateWithWhereUniqueWithoutGenreInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => BookUpdateManyWithWhereWithoutGenreInputSchema), z.lazy(() => BookUpdateManyWithWhereWithoutGenreInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => BookScalarWhereInputSchema), z.lazy(() => BookScalarWhereInputSchema).array()]).optional(),
}).strict();

export const BookUncheckedUpdateManyWithoutGenreNestedInputSchema: z.ZodType<PrismaClient.Prisma.BookUncheckedUpdateManyWithoutGenreNestedInput> = z.object({
  create: z.union([z.lazy(() => BookCreateWithoutGenreInputSchema), z.lazy(() => BookCreateWithoutGenreInputSchema).array(), z.lazy(() => BookUncheckedCreateWithoutGenreInputSchema), z.lazy(() => BookUncheckedCreateWithoutGenreInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BookCreateOrConnectWithoutGenreInputSchema), z.lazy(() => BookCreateOrConnectWithoutGenreInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => BookUpsertWithWhereUniqueWithoutGenreInputSchema), z.lazy(() => BookUpsertWithWhereUniqueWithoutGenreInputSchema).array()]).optional(),
  createMany: z.lazy(() => BookCreateManyGenreInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => BookWhereUniqueInputSchema), z.lazy(() => BookWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => BookWhereUniqueInputSchema), z.lazy(() => BookWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => BookWhereUniqueInputSchema), z.lazy(() => BookWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => BookWhereUniqueInputSchema), z.lazy(() => BookWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => BookUpdateWithWhereUniqueWithoutGenreInputSchema), z.lazy(() => BookUpdateWithWhereUniqueWithoutGenreInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => BookUpdateManyWithWhereWithoutGenreInputSchema), z.lazy(() => BookUpdateManyWithWhereWithoutGenreInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => BookScalarWhereInputSchema), z.lazy(() => BookScalarWhereInputSchema).array()]).optional(),
}).strict();

export const BookCreateNestedManyWithoutAuthorsInputSchema: z.ZodType<PrismaClient.Prisma.BookCreateNestedManyWithoutAuthorsInput> = z.object({
  create: z.union([z.lazy(() => BookCreateWithoutAuthorsInputSchema), z.lazy(() => BookCreateWithoutAuthorsInputSchema).array(), z.lazy(() => BookUncheckedCreateWithoutAuthorsInputSchema), z.lazy(() => BookUncheckedCreateWithoutAuthorsInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BookCreateOrConnectWithoutAuthorsInputSchema), z.lazy(() => BookCreateOrConnectWithoutAuthorsInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => BookWhereUniqueInputSchema), z.lazy(() => BookWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const BookUncheckedCreateNestedManyWithoutAuthorsInputSchema: z.ZodType<PrismaClient.Prisma.BookUncheckedCreateNestedManyWithoutAuthorsInput> = z.object({
  create: z.union([z.lazy(() => BookCreateWithoutAuthorsInputSchema), z.lazy(() => BookCreateWithoutAuthorsInputSchema).array(), z.lazy(() => BookUncheckedCreateWithoutAuthorsInputSchema), z.lazy(() => BookUncheckedCreateWithoutAuthorsInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BookCreateOrConnectWithoutAuthorsInputSchema), z.lazy(() => BookCreateOrConnectWithoutAuthorsInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => BookWhereUniqueInputSchema), z.lazy(() => BookWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const BookUpdateManyWithoutAuthorsNestedInputSchema: z.ZodType<PrismaClient.Prisma.BookUpdateManyWithoutAuthorsNestedInput> = z.object({
  create: z.union([z.lazy(() => BookCreateWithoutAuthorsInputSchema), z.lazy(() => BookCreateWithoutAuthorsInputSchema).array(), z.lazy(() => BookUncheckedCreateWithoutAuthorsInputSchema), z.lazy(() => BookUncheckedCreateWithoutAuthorsInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BookCreateOrConnectWithoutAuthorsInputSchema), z.lazy(() => BookCreateOrConnectWithoutAuthorsInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => BookUpsertWithWhereUniqueWithoutAuthorsInputSchema), z.lazy(() => BookUpsertWithWhereUniqueWithoutAuthorsInputSchema).array()]).optional(),
  set: z.union([z.lazy(() => BookWhereUniqueInputSchema), z.lazy(() => BookWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => BookWhereUniqueInputSchema), z.lazy(() => BookWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => BookWhereUniqueInputSchema), z.lazy(() => BookWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => BookWhereUniqueInputSchema), z.lazy(() => BookWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => BookUpdateWithWhereUniqueWithoutAuthorsInputSchema), z.lazy(() => BookUpdateWithWhereUniqueWithoutAuthorsInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => BookUpdateManyWithWhereWithoutAuthorsInputSchema), z.lazy(() => BookUpdateManyWithWhereWithoutAuthorsInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => BookScalarWhereInputSchema), z.lazy(() => BookScalarWhereInputSchema).array()]).optional(),
}).strict();

export const BookUncheckedUpdateManyWithoutAuthorsNestedInputSchema: z.ZodType<PrismaClient.Prisma.BookUncheckedUpdateManyWithoutAuthorsNestedInput> = z.object({
  create: z.union([z.lazy(() => BookCreateWithoutAuthorsInputSchema), z.lazy(() => BookCreateWithoutAuthorsInputSchema).array(), z.lazy(() => BookUncheckedCreateWithoutAuthorsInputSchema), z.lazy(() => BookUncheckedCreateWithoutAuthorsInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BookCreateOrConnectWithoutAuthorsInputSchema), z.lazy(() => BookCreateOrConnectWithoutAuthorsInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => BookUpsertWithWhereUniqueWithoutAuthorsInputSchema), z.lazy(() => BookUpsertWithWhereUniqueWithoutAuthorsInputSchema).array()]).optional(),
  set: z.union([z.lazy(() => BookWhereUniqueInputSchema), z.lazy(() => BookWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => BookWhereUniqueInputSchema), z.lazy(() => BookWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => BookWhereUniqueInputSchema), z.lazy(() => BookWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => BookWhereUniqueInputSchema), z.lazy(() => BookWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => BookUpdateWithWhereUniqueWithoutAuthorsInputSchema), z.lazy(() => BookUpdateWithWhereUniqueWithoutAuthorsInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => BookUpdateManyWithWhereWithoutAuthorsInputSchema), z.lazy(() => BookUpdateManyWithWhereWithoutAuthorsInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => BookScalarWhereInputSchema), z.lazy(() => BookScalarWhereInputSchema).array()]).optional(),
}).strict();

export const PurchaseOrderCreateNestedManyWithoutVendorInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderCreateNestedManyWithoutVendorInput> = z.object({
  create: z.union([z.lazy(() => PurchaseOrderCreateWithoutVendorInputSchema), z.lazy(() => PurchaseOrderCreateWithoutVendorInputSchema).array(), z.lazy(() => PurchaseOrderUncheckedCreateWithoutVendorInputSchema), z.lazy(() => PurchaseOrderUncheckedCreateWithoutVendorInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PurchaseOrderCreateOrConnectWithoutVendorInputSchema), z.lazy(() => PurchaseOrderCreateOrConnectWithoutVendorInputSchema).array()]).optional(),
  createMany: z.lazy(() => PurchaseOrderCreateManyVendorInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => PurchaseOrderWhereUniqueInputSchema), z.lazy(() => PurchaseOrderWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const BuybackOrderCreateNestedManyWithoutVendorInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderCreateNestedManyWithoutVendorInput> = z.object({
  create: z.union([z.lazy(() => BuybackOrderCreateWithoutVendorInputSchema), z.lazy(() => BuybackOrderCreateWithoutVendorInputSchema).array(), z.lazy(() => BuybackOrderUncheckedCreateWithoutVendorInputSchema), z.lazy(() => BuybackOrderUncheckedCreateWithoutVendorInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BuybackOrderCreateOrConnectWithoutVendorInputSchema), z.lazy(() => BuybackOrderCreateOrConnectWithoutVendorInputSchema).array()]).optional(),
  createMany: z.lazy(() => BuybackOrderCreateManyVendorInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => BuybackOrderWhereUniqueInputSchema), z.lazy(() => BuybackOrderWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const CostMostRecentVendorCreateNestedManyWithoutVendorInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorCreateNestedManyWithoutVendorInput> = z.object({
  create: z.union([z.lazy(() => CostMostRecentVendorCreateWithoutVendorInputSchema), z.lazy(() => CostMostRecentVendorCreateWithoutVendorInputSchema).array(), z.lazy(() => CostMostRecentVendorUncheckedCreateWithoutVendorInputSchema), z.lazy(() => CostMostRecentVendorUncheckedCreateWithoutVendorInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CostMostRecentVendorCreateOrConnectWithoutVendorInputSchema), z.lazy(() => CostMostRecentVendorCreateOrConnectWithoutVendorInputSchema).array()]).optional(),
  createMany: z.lazy(() => CostMostRecentVendorCreateManyVendorInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema), z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const PurchaseOrderUncheckedCreateNestedManyWithoutVendorInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderUncheckedCreateNestedManyWithoutVendorInput> = z.object({
  create: z.union([z.lazy(() => PurchaseOrderCreateWithoutVendorInputSchema), z.lazy(() => PurchaseOrderCreateWithoutVendorInputSchema).array(), z.lazy(() => PurchaseOrderUncheckedCreateWithoutVendorInputSchema), z.lazy(() => PurchaseOrderUncheckedCreateWithoutVendorInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PurchaseOrderCreateOrConnectWithoutVendorInputSchema), z.lazy(() => PurchaseOrderCreateOrConnectWithoutVendorInputSchema).array()]).optional(),
  createMany: z.lazy(() => PurchaseOrderCreateManyVendorInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => PurchaseOrderWhereUniqueInputSchema), z.lazy(() => PurchaseOrderWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const BuybackOrderUncheckedCreateNestedManyWithoutVendorInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderUncheckedCreateNestedManyWithoutVendorInput> = z.object({
  create: z.union([z.lazy(() => BuybackOrderCreateWithoutVendorInputSchema), z.lazy(() => BuybackOrderCreateWithoutVendorInputSchema).array(), z.lazy(() => BuybackOrderUncheckedCreateWithoutVendorInputSchema), z.lazy(() => BuybackOrderUncheckedCreateWithoutVendorInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BuybackOrderCreateOrConnectWithoutVendorInputSchema), z.lazy(() => BuybackOrderCreateOrConnectWithoutVendorInputSchema).array()]).optional(),
  createMany: z.lazy(() => BuybackOrderCreateManyVendorInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => BuybackOrderWhereUniqueInputSchema), z.lazy(() => BuybackOrderWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const CostMostRecentVendorUncheckedCreateNestedManyWithoutVendorInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorUncheckedCreateNestedManyWithoutVendorInput> = z.object({
  create: z.union([z.lazy(() => CostMostRecentVendorCreateWithoutVendorInputSchema), z.lazy(() => CostMostRecentVendorCreateWithoutVendorInputSchema).array(), z.lazy(() => CostMostRecentVendorUncheckedCreateWithoutVendorInputSchema), z.lazy(() => CostMostRecentVendorUncheckedCreateWithoutVendorInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CostMostRecentVendorCreateOrConnectWithoutVendorInputSchema), z.lazy(() => CostMostRecentVendorCreateOrConnectWithoutVendorInputSchema).array()]).optional(),
  createMany: z.lazy(() => CostMostRecentVendorCreateManyVendorInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema), z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const PurchaseOrderUpdateManyWithoutVendorNestedInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderUpdateManyWithoutVendorNestedInput> = z.object({
  create: z.union([z.lazy(() => PurchaseOrderCreateWithoutVendorInputSchema), z.lazy(() => PurchaseOrderCreateWithoutVendorInputSchema).array(), z.lazy(() => PurchaseOrderUncheckedCreateWithoutVendorInputSchema), z.lazy(() => PurchaseOrderUncheckedCreateWithoutVendorInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PurchaseOrderCreateOrConnectWithoutVendorInputSchema), z.lazy(() => PurchaseOrderCreateOrConnectWithoutVendorInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => PurchaseOrderUpsertWithWhereUniqueWithoutVendorInputSchema), z.lazy(() => PurchaseOrderUpsertWithWhereUniqueWithoutVendorInputSchema).array()]).optional(),
  createMany: z.lazy(() => PurchaseOrderCreateManyVendorInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => PurchaseOrderWhereUniqueInputSchema), z.lazy(() => PurchaseOrderWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => PurchaseOrderWhereUniqueInputSchema), z.lazy(() => PurchaseOrderWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => PurchaseOrderWhereUniqueInputSchema), z.lazy(() => PurchaseOrderWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => PurchaseOrderWhereUniqueInputSchema), z.lazy(() => PurchaseOrderWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => PurchaseOrderUpdateWithWhereUniqueWithoutVendorInputSchema), z.lazy(() => PurchaseOrderUpdateWithWhereUniqueWithoutVendorInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => PurchaseOrderUpdateManyWithWhereWithoutVendorInputSchema), z.lazy(() => PurchaseOrderUpdateManyWithWhereWithoutVendorInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => PurchaseOrderScalarWhereInputSchema), z.lazy(() => PurchaseOrderScalarWhereInputSchema).array()]).optional(),
}).strict();

export const BuybackOrderUpdateManyWithoutVendorNestedInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderUpdateManyWithoutVendorNestedInput> = z.object({
  create: z.union([z.lazy(() => BuybackOrderCreateWithoutVendorInputSchema), z.lazy(() => BuybackOrderCreateWithoutVendorInputSchema).array(), z.lazy(() => BuybackOrderUncheckedCreateWithoutVendorInputSchema), z.lazy(() => BuybackOrderUncheckedCreateWithoutVendorInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BuybackOrderCreateOrConnectWithoutVendorInputSchema), z.lazy(() => BuybackOrderCreateOrConnectWithoutVendorInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => BuybackOrderUpsertWithWhereUniqueWithoutVendorInputSchema), z.lazy(() => BuybackOrderUpsertWithWhereUniqueWithoutVendorInputSchema).array()]).optional(),
  createMany: z.lazy(() => BuybackOrderCreateManyVendorInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => BuybackOrderWhereUniqueInputSchema), z.lazy(() => BuybackOrderWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => BuybackOrderWhereUniqueInputSchema), z.lazy(() => BuybackOrderWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => BuybackOrderWhereUniqueInputSchema), z.lazy(() => BuybackOrderWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => BuybackOrderWhereUniqueInputSchema), z.lazy(() => BuybackOrderWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => BuybackOrderUpdateWithWhereUniqueWithoutVendorInputSchema), z.lazy(() => BuybackOrderUpdateWithWhereUniqueWithoutVendorInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => BuybackOrderUpdateManyWithWhereWithoutVendorInputSchema), z.lazy(() => BuybackOrderUpdateManyWithWhereWithoutVendorInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => BuybackOrderScalarWhereInputSchema), z.lazy(() => BuybackOrderScalarWhereInputSchema).array()]).optional(),
}).strict();

export const CostMostRecentVendorUpdateManyWithoutVendorNestedInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorUpdateManyWithoutVendorNestedInput> = z.object({
  create: z.union([z.lazy(() => CostMostRecentVendorCreateWithoutVendorInputSchema), z.lazy(() => CostMostRecentVendorCreateWithoutVendorInputSchema).array(), z.lazy(() => CostMostRecentVendorUncheckedCreateWithoutVendorInputSchema), z.lazy(() => CostMostRecentVendorUncheckedCreateWithoutVendorInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CostMostRecentVendorCreateOrConnectWithoutVendorInputSchema), z.lazy(() => CostMostRecentVendorCreateOrConnectWithoutVendorInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CostMostRecentVendorUpsertWithWhereUniqueWithoutVendorInputSchema), z.lazy(() => CostMostRecentVendorUpsertWithWhereUniqueWithoutVendorInputSchema).array()]).optional(),
  createMany: z.lazy(() => CostMostRecentVendorCreateManyVendorInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema), z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema), z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema), z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema), z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => CostMostRecentVendorUpdateWithWhereUniqueWithoutVendorInputSchema), z.lazy(() => CostMostRecentVendorUpdateWithWhereUniqueWithoutVendorInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CostMostRecentVendorUpdateManyWithWhereWithoutVendorInputSchema), z.lazy(() => CostMostRecentVendorUpdateManyWithWhereWithoutVendorInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CostMostRecentVendorScalarWhereInputSchema), z.lazy(() => CostMostRecentVendorScalarWhereInputSchema).array()]).optional(),
}).strict();

export const PurchaseOrderUncheckedUpdateManyWithoutVendorNestedInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderUncheckedUpdateManyWithoutVendorNestedInput> = z.object({
  create: z.union([z.lazy(() => PurchaseOrderCreateWithoutVendorInputSchema), z.lazy(() => PurchaseOrderCreateWithoutVendorInputSchema).array(), z.lazy(() => PurchaseOrderUncheckedCreateWithoutVendorInputSchema), z.lazy(() => PurchaseOrderUncheckedCreateWithoutVendorInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PurchaseOrderCreateOrConnectWithoutVendorInputSchema), z.lazy(() => PurchaseOrderCreateOrConnectWithoutVendorInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => PurchaseOrderUpsertWithWhereUniqueWithoutVendorInputSchema), z.lazy(() => PurchaseOrderUpsertWithWhereUniqueWithoutVendorInputSchema).array()]).optional(),
  createMany: z.lazy(() => PurchaseOrderCreateManyVendorInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => PurchaseOrderWhereUniqueInputSchema), z.lazy(() => PurchaseOrderWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => PurchaseOrderWhereUniqueInputSchema), z.lazy(() => PurchaseOrderWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => PurchaseOrderWhereUniqueInputSchema), z.lazy(() => PurchaseOrderWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => PurchaseOrderWhereUniqueInputSchema), z.lazy(() => PurchaseOrderWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => PurchaseOrderUpdateWithWhereUniqueWithoutVendorInputSchema), z.lazy(() => PurchaseOrderUpdateWithWhereUniqueWithoutVendorInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => PurchaseOrderUpdateManyWithWhereWithoutVendorInputSchema), z.lazy(() => PurchaseOrderUpdateManyWithWhereWithoutVendorInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => PurchaseOrderScalarWhereInputSchema), z.lazy(() => PurchaseOrderScalarWhereInputSchema).array()]).optional(),
}).strict();

export const BuybackOrderUncheckedUpdateManyWithoutVendorNestedInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderUncheckedUpdateManyWithoutVendorNestedInput> = z.object({
  create: z.union([z.lazy(() => BuybackOrderCreateWithoutVendorInputSchema), z.lazy(() => BuybackOrderCreateWithoutVendorInputSchema).array(), z.lazy(() => BuybackOrderUncheckedCreateWithoutVendorInputSchema), z.lazy(() => BuybackOrderUncheckedCreateWithoutVendorInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BuybackOrderCreateOrConnectWithoutVendorInputSchema), z.lazy(() => BuybackOrderCreateOrConnectWithoutVendorInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => BuybackOrderUpsertWithWhereUniqueWithoutVendorInputSchema), z.lazy(() => BuybackOrderUpsertWithWhereUniqueWithoutVendorInputSchema).array()]).optional(),
  createMany: z.lazy(() => BuybackOrderCreateManyVendorInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => BuybackOrderWhereUniqueInputSchema), z.lazy(() => BuybackOrderWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => BuybackOrderWhereUniqueInputSchema), z.lazy(() => BuybackOrderWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => BuybackOrderWhereUniqueInputSchema), z.lazy(() => BuybackOrderWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => BuybackOrderWhereUniqueInputSchema), z.lazy(() => BuybackOrderWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => BuybackOrderUpdateWithWhereUniqueWithoutVendorInputSchema), z.lazy(() => BuybackOrderUpdateWithWhereUniqueWithoutVendorInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => BuybackOrderUpdateManyWithWhereWithoutVendorInputSchema), z.lazy(() => BuybackOrderUpdateManyWithWhereWithoutVendorInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => BuybackOrderScalarWhereInputSchema), z.lazy(() => BuybackOrderScalarWhereInputSchema).array()]).optional(),
}).strict();

export const CostMostRecentVendorUncheckedUpdateManyWithoutVendorNestedInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorUncheckedUpdateManyWithoutVendorNestedInput> = z.object({
  create: z.union([z.lazy(() => CostMostRecentVendorCreateWithoutVendorInputSchema), z.lazy(() => CostMostRecentVendorCreateWithoutVendorInputSchema).array(), z.lazy(() => CostMostRecentVendorUncheckedCreateWithoutVendorInputSchema), z.lazy(() => CostMostRecentVendorUncheckedCreateWithoutVendorInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CostMostRecentVendorCreateOrConnectWithoutVendorInputSchema), z.lazy(() => CostMostRecentVendorCreateOrConnectWithoutVendorInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CostMostRecentVendorUpsertWithWhereUniqueWithoutVendorInputSchema), z.lazy(() => CostMostRecentVendorUpsertWithWhereUniqueWithoutVendorInputSchema).array()]).optional(),
  createMany: z.lazy(() => CostMostRecentVendorCreateManyVendorInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema), z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema), z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema), z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema), z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => CostMostRecentVendorUpdateWithWhereUniqueWithoutVendorInputSchema), z.lazy(() => CostMostRecentVendorUpdateWithWhereUniqueWithoutVendorInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CostMostRecentVendorUpdateManyWithWhereWithoutVendorInputSchema), z.lazy(() => CostMostRecentVendorUpdateManyWithWhereWithoutVendorInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CostMostRecentVendorScalarWhereInputSchema), z.lazy(() => CostMostRecentVendorScalarWhereInputSchema).array()]).optional(),
}).strict();

export const UserCreateNestedOneWithoutPurchaseOrderInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateNestedOneWithoutPurchaseOrderInput> = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutPurchaseOrderInputSchema), z.lazy(() => UserUncheckedCreateWithoutPurchaseOrderInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPurchaseOrderInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
}).strict();

export const VendorCreateNestedOneWithoutPurchaseOrderInputSchema: z.ZodType<PrismaClient.Prisma.VendorCreateNestedOneWithoutPurchaseOrderInput> = z.object({
  create: z.union([z.lazy(() => VendorCreateWithoutPurchaseOrderInputSchema), z.lazy(() => VendorUncheckedCreateWithoutPurchaseOrderInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => VendorCreateOrConnectWithoutPurchaseOrderInputSchema).optional(),
  connect: z.lazy(() => VendorWhereUniqueInputSchema).optional(),
}).strict();

export const PurchaseLineCreateNestedManyWithoutPurchaseOrderInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineCreateNestedManyWithoutPurchaseOrderInput> = z.object({
  create: z.union([z.lazy(() => PurchaseLineCreateWithoutPurchaseOrderInputSchema), z.lazy(() => PurchaseLineCreateWithoutPurchaseOrderInputSchema).array(), z.lazy(() => PurchaseLineUncheckedCreateWithoutPurchaseOrderInputSchema), z.lazy(() => PurchaseLineUncheckedCreateWithoutPurchaseOrderInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PurchaseLineCreateOrConnectWithoutPurchaseOrderInputSchema), z.lazy(() => PurchaseLineCreateOrConnectWithoutPurchaseOrderInputSchema).array()]).optional(),
  createMany: z.lazy(() => PurchaseLineCreateManyPurchaseOrderInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => PurchaseLineWhereUniqueInputSchema), z.lazy(() => PurchaseLineWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const CostMostRecentVendorCreateNestedManyWithoutPurchaseOrderInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorCreateNestedManyWithoutPurchaseOrderInput> = z.object({
  create: z.union([z.lazy(() => CostMostRecentVendorCreateWithoutPurchaseOrderInputSchema), z.lazy(() => CostMostRecentVendorCreateWithoutPurchaseOrderInputSchema).array(), z.lazy(() => CostMostRecentVendorUncheckedCreateWithoutPurchaseOrderInputSchema), z.lazy(() => CostMostRecentVendorUncheckedCreateWithoutPurchaseOrderInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CostMostRecentVendorCreateOrConnectWithoutPurchaseOrderInputSchema), z.lazy(() => CostMostRecentVendorCreateOrConnectWithoutPurchaseOrderInputSchema).array()]).optional(),
  createMany: z.lazy(() => CostMostRecentVendorCreateManyPurchaseOrderInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema), z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const PurchaseLineUncheckedCreateNestedManyWithoutPurchaseOrderInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineUncheckedCreateNestedManyWithoutPurchaseOrderInput> = z.object({
  create: z.union([z.lazy(() => PurchaseLineCreateWithoutPurchaseOrderInputSchema), z.lazy(() => PurchaseLineCreateWithoutPurchaseOrderInputSchema).array(), z.lazy(() => PurchaseLineUncheckedCreateWithoutPurchaseOrderInputSchema), z.lazy(() => PurchaseLineUncheckedCreateWithoutPurchaseOrderInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PurchaseLineCreateOrConnectWithoutPurchaseOrderInputSchema), z.lazy(() => PurchaseLineCreateOrConnectWithoutPurchaseOrderInputSchema).array()]).optional(),
  createMany: z.lazy(() => PurchaseLineCreateManyPurchaseOrderInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => PurchaseLineWhereUniqueInputSchema), z.lazy(() => PurchaseLineWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const CostMostRecentVendorUncheckedCreateNestedManyWithoutPurchaseOrderInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorUncheckedCreateNestedManyWithoutPurchaseOrderInput> = z.object({
  create: z.union([z.lazy(() => CostMostRecentVendorCreateWithoutPurchaseOrderInputSchema), z.lazy(() => CostMostRecentVendorCreateWithoutPurchaseOrderInputSchema).array(), z.lazy(() => CostMostRecentVendorUncheckedCreateWithoutPurchaseOrderInputSchema), z.lazy(() => CostMostRecentVendorUncheckedCreateWithoutPurchaseOrderInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CostMostRecentVendorCreateOrConnectWithoutPurchaseOrderInputSchema), z.lazy(() => CostMostRecentVendorCreateOrConnectWithoutPurchaseOrderInputSchema).array()]).optional(),
  createMany: z.lazy(() => CostMostRecentVendorCreateManyPurchaseOrderInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema), z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.date().optional(),
}).strict();

export const UserUpdateOneWithoutPurchaseOrderNestedInputSchema: z.ZodType<PrismaClient.Prisma.UserUpdateOneWithoutPurchaseOrderNestedInput> = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutPurchaseOrderInputSchema), z.lazy(() => UserUncheckedCreateWithoutPurchaseOrderInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPurchaseOrderInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutPurchaseOrderInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateWithoutPurchaseOrderInputSchema), z.lazy(() => UserUncheckedUpdateWithoutPurchaseOrderInputSchema)]).optional(),
}).strict();

export const VendorUpdateOneRequiredWithoutPurchaseOrderNestedInputSchema: z.ZodType<PrismaClient.Prisma.VendorUpdateOneRequiredWithoutPurchaseOrderNestedInput> = z.object({
  create: z.union([z.lazy(() => VendorCreateWithoutPurchaseOrderInputSchema), z.lazy(() => VendorUncheckedCreateWithoutPurchaseOrderInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => VendorCreateOrConnectWithoutPurchaseOrderInputSchema).optional(),
  upsert: z.lazy(() => VendorUpsertWithoutPurchaseOrderInputSchema).optional(),
  connect: z.lazy(() => VendorWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => VendorUpdateWithoutPurchaseOrderInputSchema), z.lazy(() => VendorUncheckedUpdateWithoutPurchaseOrderInputSchema)]).optional(),
}).strict();

export const PurchaseLineUpdateManyWithoutPurchaseOrderNestedInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineUpdateManyWithoutPurchaseOrderNestedInput> = z.object({
  create: z.union([z.lazy(() => PurchaseLineCreateWithoutPurchaseOrderInputSchema), z.lazy(() => PurchaseLineCreateWithoutPurchaseOrderInputSchema).array(), z.lazy(() => PurchaseLineUncheckedCreateWithoutPurchaseOrderInputSchema), z.lazy(() => PurchaseLineUncheckedCreateWithoutPurchaseOrderInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PurchaseLineCreateOrConnectWithoutPurchaseOrderInputSchema), z.lazy(() => PurchaseLineCreateOrConnectWithoutPurchaseOrderInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => PurchaseLineUpsertWithWhereUniqueWithoutPurchaseOrderInputSchema), z.lazy(() => PurchaseLineUpsertWithWhereUniqueWithoutPurchaseOrderInputSchema).array()]).optional(),
  createMany: z.lazy(() => PurchaseLineCreateManyPurchaseOrderInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => PurchaseLineWhereUniqueInputSchema), z.lazy(() => PurchaseLineWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => PurchaseLineWhereUniqueInputSchema), z.lazy(() => PurchaseLineWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => PurchaseLineWhereUniqueInputSchema), z.lazy(() => PurchaseLineWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => PurchaseLineWhereUniqueInputSchema), z.lazy(() => PurchaseLineWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => PurchaseLineUpdateWithWhereUniqueWithoutPurchaseOrderInputSchema), z.lazy(() => PurchaseLineUpdateWithWhereUniqueWithoutPurchaseOrderInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => PurchaseLineUpdateManyWithWhereWithoutPurchaseOrderInputSchema), z.lazy(() => PurchaseLineUpdateManyWithWhereWithoutPurchaseOrderInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => PurchaseLineScalarWhereInputSchema), z.lazy(() => PurchaseLineScalarWhereInputSchema).array()]).optional(),
}).strict();

export const CostMostRecentVendorUpdateManyWithoutPurchaseOrderNestedInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorUpdateManyWithoutPurchaseOrderNestedInput> = z.object({
  create: z.union([z.lazy(() => CostMostRecentVendorCreateWithoutPurchaseOrderInputSchema), z.lazy(() => CostMostRecentVendorCreateWithoutPurchaseOrderInputSchema).array(), z.lazy(() => CostMostRecentVendorUncheckedCreateWithoutPurchaseOrderInputSchema), z.lazy(() => CostMostRecentVendorUncheckedCreateWithoutPurchaseOrderInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CostMostRecentVendorCreateOrConnectWithoutPurchaseOrderInputSchema), z.lazy(() => CostMostRecentVendorCreateOrConnectWithoutPurchaseOrderInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CostMostRecentVendorUpsertWithWhereUniqueWithoutPurchaseOrderInputSchema), z.lazy(() => CostMostRecentVendorUpsertWithWhereUniqueWithoutPurchaseOrderInputSchema).array()]).optional(),
  createMany: z.lazy(() => CostMostRecentVendorCreateManyPurchaseOrderInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema), z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema), z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema), z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema), z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => CostMostRecentVendorUpdateWithWhereUniqueWithoutPurchaseOrderInputSchema), z.lazy(() => CostMostRecentVendorUpdateWithWhereUniqueWithoutPurchaseOrderInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CostMostRecentVendorUpdateManyWithWhereWithoutPurchaseOrderInputSchema), z.lazy(() => CostMostRecentVendorUpdateManyWithWhereWithoutPurchaseOrderInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CostMostRecentVendorScalarWhereInputSchema), z.lazy(() => CostMostRecentVendorScalarWhereInputSchema).array()]).optional(),
}).strict();

export const PurchaseLineUncheckedUpdateManyWithoutPurchaseOrderNestedInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineUncheckedUpdateManyWithoutPurchaseOrderNestedInput> = z.object({
  create: z.union([z.lazy(() => PurchaseLineCreateWithoutPurchaseOrderInputSchema), z.lazy(() => PurchaseLineCreateWithoutPurchaseOrderInputSchema).array(), z.lazy(() => PurchaseLineUncheckedCreateWithoutPurchaseOrderInputSchema), z.lazy(() => PurchaseLineUncheckedCreateWithoutPurchaseOrderInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PurchaseLineCreateOrConnectWithoutPurchaseOrderInputSchema), z.lazy(() => PurchaseLineCreateOrConnectWithoutPurchaseOrderInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => PurchaseLineUpsertWithWhereUniqueWithoutPurchaseOrderInputSchema), z.lazy(() => PurchaseLineUpsertWithWhereUniqueWithoutPurchaseOrderInputSchema).array()]).optional(),
  createMany: z.lazy(() => PurchaseLineCreateManyPurchaseOrderInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => PurchaseLineWhereUniqueInputSchema), z.lazy(() => PurchaseLineWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => PurchaseLineWhereUniqueInputSchema), z.lazy(() => PurchaseLineWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => PurchaseLineWhereUniqueInputSchema), z.lazy(() => PurchaseLineWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => PurchaseLineWhereUniqueInputSchema), z.lazy(() => PurchaseLineWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => PurchaseLineUpdateWithWhereUniqueWithoutPurchaseOrderInputSchema), z.lazy(() => PurchaseLineUpdateWithWhereUniqueWithoutPurchaseOrderInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => PurchaseLineUpdateManyWithWhereWithoutPurchaseOrderInputSchema), z.lazy(() => PurchaseLineUpdateManyWithWhereWithoutPurchaseOrderInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => PurchaseLineScalarWhereInputSchema), z.lazy(() => PurchaseLineScalarWhereInputSchema).array()]).optional(),
}).strict();

export const CostMostRecentVendorUncheckedUpdateManyWithoutPurchaseOrderNestedInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorUncheckedUpdateManyWithoutPurchaseOrderNestedInput> = z.object({
  create: z.union([z.lazy(() => CostMostRecentVendorCreateWithoutPurchaseOrderInputSchema), z.lazy(() => CostMostRecentVendorCreateWithoutPurchaseOrderInputSchema).array(), z.lazy(() => CostMostRecentVendorUncheckedCreateWithoutPurchaseOrderInputSchema), z.lazy(() => CostMostRecentVendorUncheckedCreateWithoutPurchaseOrderInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CostMostRecentVendorCreateOrConnectWithoutPurchaseOrderInputSchema), z.lazy(() => CostMostRecentVendorCreateOrConnectWithoutPurchaseOrderInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CostMostRecentVendorUpsertWithWhereUniqueWithoutPurchaseOrderInputSchema), z.lazy(() => CostMostRecentVendorUpsertWithWhereUniqueWithoutPurchaseOrderInputSchema).array()]).optional(),
  createMany: z.lazy(() => CostMostRecentVendorCreateManyPurchaseOrderInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema), z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema), z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema), z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema), z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => CostMostRecentVendorUpdateWithWhereUniqueWithoutPurchaseOrderInputSchema), z.lazy(() => CostMostRecentVendorUpdateWithWhereUniqueWithoutPurchaseOrderInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CostMostRecentVendorUpdateManyWithWhereWithoutPurchaseOrderInputSchema), z.lazy(() => CostMostRecentVendorUpdateManyWithWhereWithoutPurchaseOrderInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CostMostRecentVendorScalarWhereInputSchema), z.lazy(() => CostMostRecentVendorScalarWhereInputSchema).array()]).optional(),
}).strict();

export const BookCreateNestedOneWithoutPurchaseLinesInputSchema: z.ZodType<PrismaClient.Prisma.BookCreateNestedOneWithoutPurchaseLinesInput> = z.object({
  create: z.union([z.lazy(() => BookCreateWithoutPurchaseLinesInputSchema), z.lazy(() => BookUncheckedCreateWithoutPurchaseLinesInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => BookCreateOrConnectWithoutPurchaseLinesInputSchema).optional(),
  connect: z.lazy(() => BookWhereUniqueInputSchema).optional(),
}).strict();

export const PurchaseOrderCreateNestedOneWithoutPurchaseLinesInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderCreateNestedOneWithoutPurchaseLinesInput> = z.object({
  create: z.union([z.lazy(() => PurchaseOrderCreateWithoutPurchaseLinesInputSchema), z.lazy(() => PurchaseOrderUncheckedCreateWithoutPurchaseLinesInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => PurchaseOrderCreateOrConnectWithoutPurchaseLinesInputSchema).optional(),
  connect: z.lazy(() => PurchaseOrderWhereUniqueInputSchema).optional(),
}).strict();

export const CostMostRecentVendorCreateNestedOneWithoutPurchaseLineInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorCreateNestedOneWithoutPurchaseLineInput> = z.object({
  create: z.union([z.lazy(() => CostMostRecentVendorCreateWithoutPurchaseLineInputSchema), z.lazy(() => CostMostRecentVendorUncheckedCreateWithoutPurchaseLineInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => CostMostRecentVendorCreateOrConnectWithoutPurchaseLineInputSchema).optional(),
  connect: z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema).optional(),
}).strict();

export const CostMostRecentVendorUncheckedCreateNestedOneWithoutPurchaseLineInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorUncheckedCreateNestedOneWithoutPurchaseLineInput> = z.object({
  create: z.union([z.lazy(() => CostMostRecentVendorCreateWithoutPurchaseLineInputSchema), z.lazy(() => CostMostRecentVendorUncheckedCreateWithoutPurchaseLineInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => CostMostRecentVendorCreateOrConnectWithoutPurchaseLineInputSchema).optional(),
  connect: z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema).optional(),
}).strict();

export const BookUpdateOneRequiredWithoutPurchaseLinesNestedInputSchema: z.ZodType<PrismaClient.Prisma.BookUpdateOneRequiredWithoutPurchaseLinesNestedInput> = z.object({
  create: z.union([z.lazy(() => BookCreateWithoutPurchaseLinesInputSchema), z.lazy(() => BookUncheckedCreateWithoutPurchaseLinesInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => BookCreateOrConnectWithoutPurchaseLinesInputSchema).optional(),
  upsert: z.lazy(() => BookUpsertWithoutPurchaseLinesInputSchema).optional(),
  connect: z.lazy(() => BookWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => BookUpdateWithoutPurchaseLinesInputSchema), z.lazy(() => BookUncheckedUpdateWithoutPurchaseLinesInputSchema)]).optional(),
}).strict();

export const PurchaseOrderUpdateOneRequiredWithoutPurchaseLinesNestedInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderUpdateOneRequiredWithoutPurchaseLinesNestedInput> = z.object({
  create: z.union([z.lazy(() => PurchaseOrderCreateWithoutPurchaseLinesInputSchema), z.lazy(() => PurchaseOrderUncheckedCreateWithoutPurchaseLinesInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => PurchaseOrderCreateOrConnectWithoutPurchaseLinesInputSchema).optional(),
  upsert: z.lazy(() => PurchaseOrderUpsertWithoutPurchaseLinesInputSchema).optional(),
  connect: z.lazy(() => PurchaseOrderWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => PurchaseOrderUpdateWithoutPurchaseLinesInputSchema), z.lazy(() => PurchaseOrderUncheckedUpdateWithoutPurchaseLinesInputSchema)]).optional(),
}).strict();

export const CostMostRecentVendorUpdateOneWithoutPurchaseLineNestedInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorUpdateOneWithoutPurchaseLineNestedInput> = z.object({
  create: z.union([z.lazy(() => CostMostRecentVendorCreateWithoutPurchaseLineInputSchema), z.lazy(() => CostMostRecentVendorUncheckedCreateWithoutPurchaseLineInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => CostMostRecentVendorCreateOrConnectWithoutPurchaseLineInputSchema).optional(),
  upsert: z.lazy(() => CostMostRecentVendorUpsertWithoutPurchaseLineInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => CostMostRecentVendorUpdateWithoutPurchaseLineInputSchema), z.lazy(() => CostMostRecentVendorUncheckedUpdateWithoutPurchaseLineInputSchema)]).optional(),
}).strict();

export const CostMostRecentVendorUncheckedUpdateOneWithoutPurchaseLineNestedInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorUncheckedUpdateOneWithoutPurchaseLineNestedInput> = z.object({
  create: z.union([z.lazy(() => CostMostRecentVendorCreateWithoutPurchaseLineInputSchema), z.lazy(() => CostMostRecentVendorUncheckedCreateWithoutPurchaseLineInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => CostMostRecentVendorCreateOrConnectWithoutPurchaseLineInputSchema).optional(),
  upsert: z.lazy(() => CostMostRecentVendorUpsertWithoutPurchaseLineInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => CostMostRecentVendorUpdateWithoutPurchaseLineInputSchema), z.lazy(() => CostMostRecentVendorUncheckedUpdateWithoutPurchaseLineInputSchema)]).optional(),
}).strict();

export const SalesLineCreateNestedManyWithoutSalesReconciliationInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineCreateNestedManyWithoutSalesReconciliationInput> = z.object({
  create: z.union([z.lazy(() => SalesLineCreateWithoutSalesReconciliationInputSchema), z.lazy(() => SalesLineCreateWithoutSalesReconciliationInputSchema).array(), z.lazy(() => SalesLineUncheckedCreateWithoutSalesReconciliationInputSchema), z.lazy(() => SalesLineUncheckedCreateWithoutSalesReconciliationInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => SalesLineCreateOrConnectWithoutSalesReconciliationInputSchema), z.lazy(() => SalesLineCreateOrConnectWithoutSalesReconciliationInputSchema).array()]).optional(),
  createMany: z.lazy(() => SalesLineCreateManySalesReconciliationInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => SalesLineWhereUniqueInputSchema), z.lazy(() => SalesLineWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const SalesLineUncheckedCreateNestedManyWithoutSalesReconciliationInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineUncheckedCreateNestedManyWithoutSalesReconciliationInput> = z.object({
  create: z.union([z.lazy(() => SalesLineCreateWithoutSalesReconciliationInputSchema), z.lazy(() => SalesLineCreateWithoutSalesReconciliationInputSchema).array(), z.lazy(() => SalesLineUncheckedCreateWithoutSalesReconciliationInputSchema), z.lazy(() => SalesLineUncheckedCreateWithoutSalesReconciliationInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => SalesLineCreateOrConnectWithoutSalesReconciliationInputSchema), z.lazy(() => SalesLineCreateOrConnectWithoutSalesReconciliationInputSchema).array()]).optional(),
  createMany: z.lazy(() => SalesLineCreateManySalesReconciliationInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => SalesLineWhereUniqueInputSchema), z.lazy(() => SalesLineWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const SalesLineUpdateManyWithoutSalesReconciliationNestedInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineUpdateManyWithoutSalesReconciliationNestedInput> = z.object({
  create: z.union([z.lazy(() => SalesLineCreateWithoutSalesReconciliationInputSchema), z.lazy(() => SalesLineCreateWithoutSalesReconciliationInputSchema).array(), z.lazy(() => SalesLineUncheckedCreateWithoutSalesReconciliationInputSchema), z.lazy(() => SalesLineUncheckedCreateWithoutSalesReconciliationInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => SalesLineCreateOrConnectWithoutSalesReconciliationInputSchema), z.lazy(() => SalesLineCreateOrConnectWithoutSalesReconciliationInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => SalesLineUpsertWithWhereUniqueWithoutSalesReconciliationInputSchema), z.lazy(() => SalesLineUpsertWithWhereUniqueWithoutSalesReconciliationInputSchema).array()]).optional(),
  createMany: z.lazy(() => SalesLineCreateManySalesReconciliationInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => SalesLineWhereUniqueInputSchema), z.lazy(() => SalesLineWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => SalesLineWhereUniqueInputSchema), z.lazy(() => SalesLineWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => SalesLineWhereUniqueInputSchema), z.lazy(() => SalesLineWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => SalesLineWhereUniqueInputSchema), z.lazy(() => SalesLineWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => SalesLineUpdateWithWhereUniqueWithoutSalesReconciliationInputSchema), z.lazy(() => SalesLineUpdateWithWhereUniqueWithoutSalesReconciliationInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => SalesLineUpdateManyWithWhereWithoutSalesReconciliationInputSchema), z.lazy(() => SalesLineUpdateManyWithWhereWithoutSalesReconciliationInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => SalesLineScalarWhereInputSchema), z.lazy(() => SalesLineScalarWhereInputSchema).array()]).optional(),
}).strict();

export const SalesLineUncheckedUpdateManyWithoutSalesReconciliationNestedInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineUncheckedUpdateManyWithoutSalesReconciliationNestedInput> = z.object({
  create: z.union([z.lazy(() => SalesLineCreateWithoutSalesReconciliationInputSchema), z.lazy(() => SalesLineCreateWithoutSalesReconciliationInputSchema).array(), z.lazy(() => SalesLineUncheckedCreateWithoutSalesReconciliationInputSchema), z.lazy(() => SalesLineUncheckedCreateWithoutSalesReconciliationInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => SalesLineCreateOrConnectWithoutSalesReconciliationInputSchema), z.lazy(() => SalesLineCreateOrConnectWithoutSalesReconciliationInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => SalesLineUpsertWithWhereUniqueWithoutSalesReconciliationInputSchema), z.lazy(() => SalesLineUpsertWithWhereUniqueWithoutSalesReconciliationInputSchema).array()]).optional(),
  createMany: z.lazy(() => SalesLineCreateManySalesReconciliationInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => SalesLineWhereUniqueInputSchema), z.lazy(() => SalesLineWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => SalesLineWhereUniqueInputSchema), z.lazy(() => SalesLineWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => SalesLineWhereUniqueInputSchema), z.lazy(() => SalesLineWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => SalesLineWhereUniqueInputSchema), z.lazy(() => SalesLineWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => SalesLineUpdateWithWhereUniqueWithoutSalesReconciliationInputSchema), z.lazy(() => SalesLineUpdateWithWhereUniqueWithoutSalesReconciliationInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => SalesLineUpdateManyWithWhereWithoutSalesReconciliationInputSchema), z.lazy(() => SalesLineUpdateManyWithWhereWithoutSalesReconciliationInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => SalesLineScalarWhereInputSchema), z.lazy(() => SalesLineScalarWhereInputSchema).array()]).optional(),
}).strict();

export const BookCreateNestedOneWithoutSalesLinesInputSchema: z.ZodType<PrismaClient.Prisma.BookCreateNestedOneWithoutSalesLinesInput> = z.object({
  create: z.union([z.lazy(() => BookCreateWithoutSalesLinesInputSchema), z.lazy(() => BookUncheckedCreateWithoutSalesLinesInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => BookCreateOrConnectWithoutSalesLinesInputSchema).optional(),
  connect: z.lazy(() => BookWhereUniqueInputSchema).optional(),
}).strict();

export const SalesReconciliationCreateNestedOneWithoutSalesLinesInputSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationCreateNestedOneWithoutSalesLinesInput> = z.object({
  create: z.union([z.lazy(() => SalesReconciliationCreateWithoutSalesLinesInputSchema), z.lazy(() => SalesReconciliationUncheckedCreateWithoutSalesLinesInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => SalesReconciliationCreateOrConnectWithoutSalesLinesInputSchema).optional(),
  connect: z.lazy(() => SalesReconciliationWhereUniqueInputSchema).optional(),
}).strict();

export const BookUpdateOneRequiredWithoutSalesLinesNestedInputSchema: z.ZodType<PrismaClient.Prisma.BookUpdateOneRequiredWithoutSalesLinesNestedInput> = z.object({
  create: z.union([z.lazy(() => BookCreateWithoutSalesLinesInputSchema), z.lazy(() => BookUncheckedCreateWithoutSalesLinesInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => BookCreateOrConnectWithoutSalesLinesInputSchema).optional(),
  upsert: z.lazy(() => BookUpsertWithoutSalesLinesInputSchema).optional(),
  connect: z.lazy(() => BookWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => BookUpdateWithoutSalesLinesInputSchema), z.lazy(() => BookUncheckedUpdateWithoutSalesLinesInputSchema)]).optional(),
}).strict();

export const SalesReconciliationUpdateOneRequiredWithoutSalesLinesNestedInputSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationUpdateOneRequiredWithoutSalesLinesNestedInput> = z.object({
  create: z.union([z.lazy(() => SalesReconciliationCreateWithoutSalesLinesInputSchema), z.lazy(() => SalesReconciliationUncheckedCreateWithoutSalesLinesInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => SalesReconciliationCreateOrConnectWithoutSalesLinesInputSchema).optional(),
  upsert: z.lazy(() => SalesReconciliationUpsertWithoutSalesLinesInputSchema).optional(),
  connect: z.lazy(() => SalesReconciliationWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => SalesReconciliationUpdateWithoutSalesLinesInputSchema), z.lazy(() => SalesReconciliationUncheckedUpdateWithoutSalesLinesInputSchema)]).optional(),
}).strict();

export const UserCreateNestedOneWithoutBuybackOrderInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateNestedOneWithoutBuybackOrderInput> = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutBuybackOrderInputSchema), z.lazy(() => UserUncheckedCreateWithoutBuybackOrderInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutBuybackOrderInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
}).strict();

export const VendorCreateNestedOneWithoutBuybackOrdersInputSchema: z.ZodType<PrismaClient.Prisma.VendorCreateNestedOneWithoutBuybackOrdersInput> = z.object({
  create: z.union([z.lazy(() => VendorCreateWithoutBuybackOrdersInputSchema), z.lazy(() => VendorUncheckedCreateWithoutBuybackOrdersInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => VendorCreateOrConnectWithoutBuybackOrdersInputSchema).optional(),
  connect: z.lazy(() => VendorWhereUniqueInputSchema).optional(),
}).strict();

export const BuybackLineCreateNestedManyWithoutBuybackOrderInputSchema: z.ZodType<PrismaClient.Prisma.BuybackLineCreateNestedManyWithoutBuybackOrderInput> = z.object({
  create: z.union([z.lazy(() => BuybackLineCreateWithoutBuybackOrderInputSchema), z.lazy(() => BuybackLineCreateWithoutBuybackOrderInputSchema).array(), z.lazy(() => BuybackLineUncheckedCreateWithoutBuybackOrderInputSchema), z.lazy(() => BuybackLineUncheckedCreateWithoutBuybackOrderInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BuybackLineCreateOrConnectWithoutBuybackOrderInputSchema), z.lazy(() => BuybackLineCreateOrConnectWithoutBuybackOrderInputSchema).array()]).optional(),
  createMany: z.lazy(() => BuybackLineCreateManyBuybackOrderInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => BuybackLineWhereUniqueInputSchema), z.lazy(() => BuybackLineWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const BuybackLineUncheckedCreateNestedManyWithoutBuybackOrderInputSchema: z.ZodType<PrismaClient.Prisma.BuybackLineUncheckedCreateNestedManyWithoutBuybackOrderInput> = z.object({
  create: z.union([z.lazy(() => BuybackLineCreateWithoutBuybackOrderInputSchema), z.lazy(() => BuybackLineCreateWithoutBuybackOrderInputSchema).array(), z.lazy(() => BuybackLineUncheckedCreateWithoutBuybackOrderInputSchema), z.lazy(() => BuybackLineUncheckedCreateWithoutBuybackOrderInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BuybackLineCreateOrConnectWithoutBuybackOrderInputSchema), z.lazy(() => BuybackLineCreateOrConnectWithoutBuybackOrderInputSchema).array()]).optional(),
  createMany: z.lazy(() => BuybackLineCreateManyBuybackOrderInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => BuybackLineWhereUniqueInputSchema), z.lazy(() => BuybackLineWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const UserUpdateOneWithoutBuybackOrderNestedInputSchema: z.ZodType<PrismaClient.Prisma.UserUpdateOneWithoutBuybackOrderNestedInput> = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutBuybackOrderInputSchema), z.lazy(() => UserUncheckedCreateWithoutBuybackOrderInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutBuybackOrderInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutBuybackOrderInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateWithoutBuybackOrderInputSchema), z.lazy(() => UserUncheckedUpdateWithoutBuybackOrderInputSchema)]).optional(),
}).strict();

export const VendorUpdateOneRequiredWithoutBuybackOrdersNestedInputSchema: z.ZodType<PrismaClient.Prisma.VendorUpdateOneRequiredWithoutBuybackOrdersNestedInput> = z.object({
  create: z.union([z.lazy(() => VendorCreateWithoutBuybackOrdersInputSchema), z.lazy(() => VendorUncheckedCreateWithoutBuybackOrdersInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => VendorCreateOrConnectWithoutBuybackOrdersInputSchema).optional(),
  upsert: z.lazy(() => VendorUpsertWithoutBuybackOrdersInputSchema).optional(),
  connect: z.lazy(() => VendorWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => VendorUpdateWithoutBuybackOrdersInputSchema), z.lazy(() => VendorUncheckedUpdateWithoutBuybackOrdersInputSchema)]).optional(),
}).strict();

export const BuybackLineUpdateManyWithoutBuybackOrderNestedInputSchema: z.ZodType<PrismaClient.Prisma.BuybackLineUpdateManyWithoutBuybackOrderNestedInput> = z.object({
  create: z.union([z.lazy(() => BuybackLineCreateWithoutBuybackOrderInputSchema), z.lazy(() => BuybackLineCreateWithoutBuybackOrderInputSchema).array(), z.lazy(() => BuybackLineUncheckedCreateWithoutBuybackOrderInputSchema), z.lazy(() => BuybackLineUncheckedCreateWithoutBuybackOrderInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BuybackLineCreateOrConnectWithoutBuybackOrderInputSchema), z.lazy(() => BuybackLineCreateOrConnectWithoutBuybackOrderInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => BuybackLineUpsertWithWhereUniqueWithoutBuybackOrderInputSchema), z.lazy(() => BuybackLineUpsertWithWhereUniqueWithoutBuybackOrderInputSchema).array()]).optional(),
  createMany: z.lazy(() => BuybackLineCreateManyBuybackOrderInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => BuybackLineWhereUniqueInputSchema), z.lazy(() => BuybackLineWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => BuybackLineWhereUniqueInputSchema), z.lazy(() => BuybackLineWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => BuybackLineWhereUniqueInputSchema), z.lazy(() => BuybackLineWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => BuybackLineWhereUniqueInputSchema), z.lazy(() => BuybackLineWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => BuybackLineUpdateWithWhereUniqueWithoutBuybackOrderInputSchema), z.lazy(() => BuybackLineUpdateWithWhereUniqueWithoutBuybackOrderInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => BuybackLineUpdateManyWithWhereWithoutBuybackOrderInputSchema), z.lazy(() => BuybackLineUpdateManyWithWhereWithoutBuybackOrderInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => BuybackLineScalarWhereInputSchema), z.lazy(() => BuybackLineScalarWhereInputSchema).array()]).optional(),
}).strict();

export const BuybackLineUncheckedUpdateManyWithoutBuybackOrderNestedInputSchema: z.ZodType<PrismaClient.Prisma.BuybackLineUncheckedUpdateManyWithoutBuybackOrderNestedInput> = z.object({
  create: z.union([z.lazy(() => BuybackLineCreateWithoutBuybackOrderInputSchema), z.lazy(() => BuybackLineCreateWithoutBuybackOrderInputSchema).array(), z.lazy(() => BuybackLineUncheckedCreateWithoutBuybackOrderInputSchema), z.lazy(() => BuybackLineUncheckedCreateWithoutBuybackOrderInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BuybackLineCreateOrConnectWithoutBuybackOrderInputSchema), z.lazy(() => BuybackLineCreateOrConnectWithoutBuybackOrderInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => BuybackLineUpsertWithWhereUniqueWithoutBuybackOrderInputSchema), z.lazy(() => BuybackLineUpsertWithWhereUniqueWithoutBuybackOrderInputSchema).array()]).optional(),
  createMany: z.lazy(() => BuybackLineCreateManyBuybackOrderInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => BuybackLineWhereUniqueInputSchema), z.lazy(() => BuybackLineWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => BuybackLineWhereUniqueInputSchema), z.lazy(() => BuybackLineWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => BuybackLineWhereUniqueInputSchema), z.lazy(() => BuybackLineWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => BuybackLineWhereUniqueInputSchema), z.lazy(() => BuybackLineWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => BuybackLineUpdateWithWhereUniqueWithoutBuybackOrderInputSchema), z.lazy(() => BuybackLineUpdateWithWhereUniqueWithoutBuybackOrderInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => BuybackLineUpdateManyWithWhereWithoutBuybackOrderInputSchema), z.lazy(() => BuybackLineUpdateManyWithWhereWithoutBuybackOrderInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => BuybackLineScalarWhereInputSchema), z.lazy(() => BuybackLineScalarWhereInputSchema).array()]).optional(),
}).strict();

export const BookCreateNestedOneWithoutBuybackLinesInputSchema: z.ZodType<PrismaClient.Prisma.BookCreateNestedOneWithoutBuybackLinesInput> = z.object({
  create: z.union([z.lazy(() => BookCreateWithoutBuybackLinesInputSchema), z.lazy(() => BookUncheckedCreateWithoutBuybackLinesInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => BookCreateOrConnectWithoutBuybackLinesInputSchema).optional(),
  connect: z.lazy(() => BookWhereUniqueInputSchema).optional(),
}).strict();

export const BuybackOrderCreateNestedOneWithoutBuybackLinesInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderCreateNestedOneWithoutBuybackLinesInput> = z.object({
  create: z.union([z.lazy(() => BuybackOrderCreateWithoutBuybackLinesInputSchema), z.lazy(() => BuybackOrderUncheckedCreateWithoutBuybackLinesInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => BuybackOrderCreateOrConnectWithoutBuybackLinesInputSchema).optional(),
  connect: z.lazy(() => BuybackOrderWhereUniqueInputSchema).optional(),
}).strict();

export const BookUpdateOneRequiredWithoutBuybackLinesNestedInputSchema: z.ZodType<PrismaClient.Prisma.BookUpdateOneRequiredWithoutBuybackLinesNestedInput> = z.object({
  create: z.union([z.lazy(() => BookCreateWithoutBuybackLinesInputSchema), z.lazy(() => BookUncheckedCreateWithoutBuybackLinesInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => BookCreateOrConnectWithoutBuybackLinesInputSchema).optional(),
  upsert: z.lazy(() => BookUpsertWithoutBuybackLinesInputSchema).optional(),
  connect: z.lazy(() => BookWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => BookUpdateWithoutBuybackLinesInputSchema), z.lazy(() => BookUncheckedUpdateWithoutBuybackLinesInputSchema)]).optional(),
}).strict();

export const BuybackOrderUpdateOneRequiredWithoutBuybackLinesNestedInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderUpdateOneRequiredWithoutBuybackLinesNestedInput> = z.object({
  create: z.union([z.lazy(() => BuybackOrderCreateWithoutBuybackLinesInputSchema), z.lazy(() => BuybackOrderUncheckedCreateWithoutBuybackLinesInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => BuybackOrderCreateOrConnectWithoutBuybackLinesInputSchema).optional(),
  upsert: z.lazy(() => BuybackOrderUpsertWithoutBuybackLinesInputSchema).optional(),
  connect: z.lazy(() => BuybackOrderWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => BuybackOrderUpdateWithoutBuybackLinesInputSchema), z.lazy(() => BuybackOrderUncheckedUpdateWithoutBuybackLinesInputSchema)]).optional(),
}).strict();

export const UserCreateNestedOneWithoutCorrectionInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateNestedOneWithoutCorrectionInput> = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutCorrectionInputSchema), z.lazy(() => UserUncheckedCreateWithoutCorrectionInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCorrectionInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
}).strict();

export const BookCreateNestedOneWithoutCorrectionInputSchema: z.ZodType<PrismaClient.Prisma.BookCreateNestedOneWithoutCorrectionInput> = z.object({
  create: z.union([z.lazy(() => BookCreateWithoutCorrectionInputSchema), z.lazy(() => BookUncheckedCreateWithoutCorrectionInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => BookCreateOrConnectWithoutCorrectionInputSchema).optional(),
  connect: z.lazy(() => BookWhereUniqueInputSchema).optional(),
}).strict();

export const UserUpdateOneWithoutCorrectionNestedInputSchema: z.ZodType<PrismaClient.Prisma.UserUpdateOneWithoutCorrectionNestedInput> = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutCorrectionInputSchema), z.lazy(() => UserUncheckedCreateWithoutCorrectionInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCorrectionInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCorrectionInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateWithoutCorrectionInputSchema), z.lazy(() => UserUncheckedUpdateWithoutCorrectionInputSchema)]).optional(),
}).strict();

export const BookUpdateOneRequiredWithoutCorrectionNestedInputSchema: z.ZodType<PrismaClient.Prisma.BookUpdateOneRequiredWithoutCorrectionNestedInput> = z.object({
  create: z.union([z.lazy(() => BookCreateWithoutCorrectionInputSchema), z.lazy(() => BookUncheckedCreateWithoutCorrectionInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => BookCreateOrConnectWithoutCorrectionInputSchema).optional(),
  upsert: z.lazy(() => BookUpsertWithoutCorrectionInputSchema).optional(),
  connect: z.lazy(() => BookWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => BookUpdateWithoutCorrectionInputSchema), z.lazy(() => BookUncheckedUpdateWithoutCorrectionInputSchema)]).optional(),
}).strict();

export const BookCreateNestedOneWithoutCostMostRecentVendorInputSchema: z.ZodType<PrismaClient.Prisma.BookCreateNestedOneWithoutCostMostRecentVendorInput> = z.object({
  create: z.union([z.lazy(() => BookCreateWithoutCostMostRecentVendorInputSchema), z.lazy(() => BookUncheckedCreateWithoutCostMostRecentVendorInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => BookCreateOrConnectWithoutCostMostRecentVendorInputSchema).optional(),
  connect: z.lazy(() => BookWhereUniqueInputSchema).optional(),
}).strict();

export const VendorCreateNestedOneWithoutCostMostRecentVendorInputSchema: z.ZodType<PrismaClient.Prisma.VendorCreateNestedOneWithoutCostMostRecentVendorInput> = z.object({
  create: z.union([z.lazy(() => VendorCreateWithoutCostMostRecentVendorInputSchema), z.lazy(() => VendorUncheckedCreateWithoutCostMostRecentVendorInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => VendorCreateOrConnectWithoutCostMostRecentVendorInputSchema).optional(),
  connect: z.lazy(() => VendorWhereUniqueInputSchema).optional(),
}).strict();

export const PurchaseLineCreateNestedOneWithoutCostMostRecentVendorInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineCreateNestedOneWithoutCostMostRecentVendorInput> = z.object({
  create: z.union([z.lazy(() => PurchaseLineCreateWithoutCostMostRecentVendorInputSchema), z.lazy(() => PurchaseLineUncheckedCreateWithoutCostMostRecentVendorInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => PurchaseLineCreateOrConnectWithoutCostMostRecentVendorInputSchema).optional(),
  connect: z.lazy(() => PurchaseLineWhereUniqueInputSchema).optional(),
}).strict();

export const PurchaseOrderCreateNestedOneWithoutCostMostRecentVendorInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderCreateNestedOneWithoutCostMostRecentVendorInput> = z.object({
  create: z.union([z.lazy(() => PurchaseOrderCreateWithoutCostMostRecentVendorInputSchema), z.lazy(() => PurchaseOrderUncheckedCreateWithoutCostMostRecentVendorInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => PurchaseOrderCreateOrConnectWithoutCostMostRecentVendorInputSchema).optional(),
  connect: z.lazy(() => PurchaseOrderWhereUniqueInputSchema).optional(),
}).strict();

export const BookUpdateOneRequiredWithoutCostMostRecentVendorNestedInputSchema: z.ZodType<PrismaClient.Prisma.BookUpdateOneRequiredWithoutCostMostRecentVendorNestedInput> = z.object({
  create: z.union([z.lazy(() => BookCreateWithoutCostMostRecentVendorInputSchema), z.lazy(() => BookUncheckedCreateWithoutCostMostRecentVendorInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => BookCreateOrConnectWithoutCostMostRecentVendorInputSchema).optional(),
  upsert: z.lazy(() => BookUpsertWithoutCostMostRecentVendorInputSchema).optional(),
  connect: z.lazy(() => BookWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => BookUpdateWithoutCostMostRecentVendorInputSchema), z.lazy(() => BookUncheckedUpdateWithoutCostMostRecentVendorInputSchema)]).optional(),
}).strict();

export const VendorUpdateOneRequiredWithoutCostMostRecentVendorNestedInputSchema: z.ZodType<PrismaClient.Prisma.VendorUpdateOneRequiredWithoutCostMostRecentVendorNestedInput> = z.object({
  create: z.union([z.lazy(() => VendorCreateWithoutCostMostRecentVendorInputSchema), z.lazy(() => VendorUncheckedCreateWithoutCostMostRecentVendorInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => VendorCreateOrConnectWithoutCostMostRecentVendorInputSchema).optional(),
  upsert: z.lazy(() => VendorUpsertWithoutCostMostRecentVendorInputSchema).optional(),
  connect: z.lazy(() => VendorWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => VendorUpdateWithoutCostMostRecentVendorInputSchema), z.lazy(() => VendorUncheckedUpdateWithoutCostMostRecentVendorInputSchema)]).optional(),
}).strict();

export const PurchaseLineUpdateOneRequiredWithoutCostMostRecentVendorNestedInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineUpdateOneRequiredWithoutCostMostRecentVendorNestedInput> = z.object({
  create: z.union([z.lazy(() => PurchaseLineCreateWithoutCostMostRecentVendorInputSchema), z.lazy(() => PurchaseLineUncheckedCreateWithoutCostMostRecentVendorInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => PurchaseLineCreateOrConnectWithoutCostMostRecentVendorInputSchema).optional(),
  upsert: z.lazy(() => PurchaseLineUpsertWithoutCostMostRecentVendorInputSchema).optional(),
  connect: z.lazy(() => PurchaseLineWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => PurchaseLineUpdateWithoutCostMostRecentVendorInputSchema), z.lazy(() => PurchaseLineUncheckedUpdateWithoutCostMostRecentVendorInputSchema)]).optional(),
}).strict();

export const PurchaseOrderUpdateOneRequiredWithoutCostMostRecentVendorNestedInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderUpdateOneRequiredWithoutCostMostRecentVendorNestedInput> = z.object({
  create: z.union([z.lazy(() => PurchaseOrderCreateWithoutCostMostRecentVendorInputSchema), z.lazy(() => PurchaseOrderUncheckedCreateWithoutCostMostRecentVendorInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => PurchaseOrderCreateOrConnectWithoutCostMostRecentVendorInputSchema).optional(),
  upsert: z.lazy(() => PurchaseOrderUpsertWithoutCostMostRecentVendorInputSchema).optional(),
  connect: z.lazy(() => PurchaseOrderWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => PurchaseOrderUpdateWithoutCostMostRecentVendorInputSchema), z.lazy(() => PurchaseOrderUncheckedUpdateWithoutCostMostRecentVendorInputSchema)]).optional(),
}).strict();

export const UserCreateNestedOneWithoutCasesCreatedInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateNestedOneWithoutCasesCreatedInput> = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutCasesCreatedInputSchema), z.lazy(() => UserUncheckedCreateWithoutCasesCreatedInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCasesCreatedInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
}).strict();

export const UserCreateNestedOneWithoutCasesLastEditedInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateNestedOneWithoutCasesLastEditedInput> = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutCasesLastEditedInputSchema), z.lazy(() => UserUncheckedCreateWithoutCasesLastEditedInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCasesLastEditedInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
}).strict();

export const ShelfCreateNestedManyWithoutCaseInputSchema: z.ZodType<PrismaClient.Prisma.ShelfCreateNestedManyWithoutCaseInput> = z.object({
  create: z.union([z.lazy(() => ShelfCreateWithoutCaseInputSchema), z.lazy(() => ShelfCreateWithoutCaseInputSchema).array(), z.lazy(() => ShelfUncheckedCreateWithoutCaseInputSchema), z.lazy(() => ShelfUncheckedCreateWithoutCaseInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ShelfCreateOrConnectWithoutCaseInputSchema), z.lazy(() => ShelfCreateOrConnectWithoutCaseInputSchema).array()]).optional(),
  createMany: z.lazy(() => ShelfCreateManyCaseInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => ShelfWhereUniqueInputSchema), z.lazy(() => ShelfWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const ShelfUncheckedCreateNestedManyWithoutCaseInputSchema: z.ZodType<PrismaClient.Prisma.ShelfUncheckedCreateNestedManyWithoutCaseInput> = z.object({
  create: z.union([z.lazy(() => ShelfCreateWithoutCaseInputSchema), z.lazy(() => ShelfCreateWithoutCaseInputSchema).array(), z.lazy(() => ShelfUncheckedCreateWithoutCaseInputSchema), z.lazy(() => ShelfUncheckedCreateWithoutCaseInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ShelfCreateOrConnectWithoutCaseInputSchema), z.lazy(() => ShelfCreateOrConnectWithoutCaseInputSchema).array()]).optional(),
  createMany: z.lazy(() => ShelfCreateManyCaseInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => ShelfWhereUniqueInputSchema), z.lazy(() => ShelfWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutCasesCreatedNestedInputSchema: z.ZodType<PrismaClient.Prisma.UserUpdateOneRequiredWithoutCasesCreatedNestedInput> = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutCasesCreatedInputSchema), z.lazy(() => UserUncheckedCreateWithoutCasesCreatedInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCasesCreatedInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCasesCreatedInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateWithoutCasesCreatedInputSchema), z.lazy(() => UserUncheckedUpdateWithoutCasesCreatedInputSchema)]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutCasesLastEditedNestedInputSchema: z.ZodType<PrismaClient.Prisma.UserUpdateOneRequiredWithoutCasesLastEditedNestedInput> = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutCasesLastEditedInputSchema), z.lazy(() => UserUncheckedCreateWithoutCasesLastEditedInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCasesLastEditedInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCasesLastEditedInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateWithoutCasesLastEditedInputSchema), z.lazy(() => UserUncheckedUpdateWithoutCasesLastEditedInputSchema)]).optional(),
}).strict();

export const ShelfUpdateManyWithoutCaseNestedInputSchema: z.ZodType<PrismaClient.Prisma.ShelfUpdateManyWithoutCaseNestedInput> = z.object({
  create: z.union([z.lazy(() => ShelfCreateWithoutCaseInputSchema), z.lazy(() => ShelfCreateWithoutCaseInputSchema).array(), z.lazy(() => ShelfUncheckedCreateWithoutCaseInputSchema), z.lazy(() => ShelfUncheckedCreateWithoutCaseInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ShelfCreateOrConnectWithoutCaseInputSchema), z.lazy(() => ShelfCreateOrConnectWithoutCaseInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ShelfUpsertWithWhereUniqueWithoutCaseInputSchema), z.lazy(() => ShelfUpsertWithWhereUniqueWithoutCaseInputSchema).array()]).optional(),
  createMany: z.lazy(() => ShelfCreateManyCaseInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => ShelfWhereUniqueInputSchema), z.lazy(() => ShelfWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ShelfWhereUniqueInputSchema), z.lazy(() => ShelfWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ShelfWhereUniqueInputSchema), z.lazy(() => ShelfWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ShelfWhereUniqueInputSchema), z.lazy(() => ShelfWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => ShelfUpdateWithWhereUniqueWithoutCaseInputSchema), z.lazy(() => ShelfUpdateWithWhereUniqueWithoutCaseInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ShelfUpdateManyWithWhereWithoutCaseInputSchema), z.lazy(() => ShelfUpdateManyWithWhereWithoutCaseInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ShelfScalarWhereInputSchema), z.lazy(() => ShelfScalarWhereInputSchema).array()]).optional(),
}).strict();

export const ShelfUncheckedUpdateManyWithoutCaseNestedInputSchema: z.ZodType<PrismaClient.Prisma.ShelfUncheckedUpdateManyWithoutCaseNestedInput> = z.object({
  create: z.union([z.lazy(() => ShelfCreateWithoutCaseInputSchema), z.lazy(() => ShelfCreateWithoutCaseInputSchema).array(), z.lazy(() => ShelfUncheckedCreateWithoutCaseInputSchema), z.lazy(() => ShelfUncheckedCreateWithoutCaseInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ShelfCreateOrConnectWithoutCaseInputSchema), z.lazy(() => ShelfCreateOrConnectWithoutCaseInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ShelfUpsertWithWhereUniqueWithoutCaseInputSchema), z.lazy(() => ShelfUpsertWithWhereUniqueWithoutCaseInputSchema).array()]).optional(),
  createMany: z.lazy(() => ShelfCreateManyCaseInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => ShelfWhereUniqueInputSchema), z.lazy(() => ShelfWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ShelfWhereUniqueInputSchema), z.lazy(() => ShelfWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ShelfWhereUniqueInputSchema), z.lazy(() => ShelfWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ShelfWhereUniqueInputSchema), z.lazy(() => ShelfWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => ShelfUpdateWithWhereUniqueWithoutCaseInputSchema), z.lazy(() => ShelfUpdateWithWhereUniqueWithoutCaseInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ShelfUpdateManyWithWhereWithoutCaseInputSchema), z.lazy(() => ShelfUpdateManyWithWhereWithoutCaseInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ShelfScalarWhereInputSchema), z.lazy(() => ShelfScalarWhereInputSchema).array()]).optional(),
}).strict();

export const CaseCreateNestedOneWithoutShelvesInputSchema: z.ZodType<PrismaClient.Prisma.CaseCreateNestedOneWithoutShelvesInput> = z.object({
  create: z.union([z.lazy(() => CaseCreateWithoutShelvesInputSchema), z.lazy(() => CaseUncheckedCreateWithoutShelvesInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => CaseCreateOrConnectWithoutShelvesInputSchema).optional(),
  connect: z.lazy(() => CaseWhereUniqueInputSchema).optional(),
}).strict();

<<<<<<< HEAD
export const BookOnShelfCreateNestedManyWithoutShelfInputSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfCreateNestedManyWithoutShelfInput> = z.object({
  create: z.union([z.lazy(() => BookOnShelfCreateWithoutShelfInputSchema), z.lazy(() => BookOnShelfCreateWithoutShelfInputSchema).array(), z.lazy(() => BookOnShelfUncheckedCreateWithoutShelfInputSchema), z.lazy(() => BookOnShelfUncheckedCreateWithoutShelfInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BookOnShelfCreateOrConnectWithoutShelfInputSchema), z.lazy(() => BookOnShelfCreateOrConnectWithoutShelfInputSchema).array()]).optional(),
  createMany: z.lazy(() => BookOnShelfCreateManyShelfInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => BookOnShelfWhereUniqueInputSchema), z.lazy(() => BookOnShelfWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const BookOnShelfUncheckedCreateNestedManyWithoutShelfInputSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfUncheckedCreateNestedManyWithoutShelfInput> = z.object({
  create: z.union([z.lazy(() => BookOnShelfCreateWithoutShelfInputSchema), z.lazy(() => BookOnShelfCreateWithoutShelfInputSchema).array(), z.lazy(() => BookOnShelfUncheckedCreateWithoutShelfInputSchema), z.lazy(() => BookOnShelfUncheckedCreateWithoutShelfInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BookOnShelfCreateOrConnectWithoutShelfInputSchema), z.lazy(() => BookOnShelfCreateOrConnectWithoutShelfInputSchema).array()]).optional(),
  createMany: z.lazy(() => BookOnShelfCreateManyShelfInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => BookOnShelfWhereUniqueInputSchema), z.lazy(() => BookOnShelfWhereUniqueInputSchema).array()]).optional(),
=======
export const BookCreateNestedManyWithoutShelvesInputSchema: z.ZodType<PrismaClient.Prisma.BookCreateNestedManyWithoutShelvesInput> = z.object({
  create: z.union([z.lazy(() => BookCreateWithoutShelvesInputSchema), z.lazy(() => BookCreateWithoutShelvesInputSchema).array(), z.lazy(() => BookUncheckedCreateWithoutShelvesInputSchema), z.lazy(() => BookUncheckedCreateWithoutShelvesInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BookCreateOrConnectWithoutShelvesInputSchema), z.lazy(() => BookCreateOrConnectWithoutShelvesInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => BookWhereUniqueInputSchema), z.lazy(() => BookWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const BookUncheckedCreateNestedManyWithoutShelvesInputSchema: z.ZodType<PrismaClient.Prisma.BookUncheckedCreateNestedManyWithoutShelvesInput> = z.object({
  create: z.union([z.lazy(() => BookCreateWithoutShelvesInputSchema), z.lazy(() => BookCreateWithoutShelvesInputSchema).array(), z.lazy(() => BookUncheckedCreateWithoutShelvesInputSchema), z.lazy(() => BookUncheckedCreateWithoutShelvesInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BookCreateOrConnectWithoutShelvesInputSchema), z.lazy(() => BookCreateOrConnectWithoutShelvesInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => BookWhereUniqueInputSchema), z.lazy(() => BookWhereUniqueInputSchema).array()]).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const CaseUpdateOneRequiredWithoutShelvesNestedInputSchema: z.ZodType<PrismaClient.Prisma.CaseUpdateOneRequiredWithoutShelvesNestedInput> = z.object({
  create: z.union([z.lazy(() => CaseCreateWithoutShelvesInputSchema), z.lazy(() => CaseUncheckedCreateWithoutShelvesInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => CaseCreateOrConnectWithoutShelvesInputSchema).optional(),
  upsert: z.lazy(() => CaseUpsertWithoutShelvesInputSchema).optional(),
  connect: z.lazy(() => CaseWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => CaseUpdateWithoutShelvesInputSchema), z.lazy(() => CaseUncheckedUpdateWithoutShelvesInputSchema)]).optional(),
}).strict();

<<<<<<< HEAD
export const BookOnShelfUpdateManyWithoutShelfNestedInputSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfUpdateManyWithoutShelfNestedInput> = z.object({
  create: z.union([z.lazy(() => BookOnShelfCreateWithoutShelfInputSchema), z.lazy(() => BookOnShelfCreateWithoutShelfInputSchema).array(), z.lazy(() => BookOnShelfUncheckedCreateWithoutShelfInputSchema), z.lazy(() => BookOnShelfUncheckedCreateWithoutShelfInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BookOnShelfCreateOrConnectWithoutShelfInputSchema), z.lazy(() => BookOnShelfCreateOrConnectWithoutShelfInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => BookOnShelfUpsertWithWhereUniqueWithoutShelfInputSchema), z.lazy(() => BookOnShelfUpsertWithWhereUniqueWithoutShelfInputSchema).array()]).optional(),
  createMany: z.lazy(() => BookOnShelfCreateManyShelfInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => BookOnShelfWhereUniqueInputSchema), z.lazy(() => BookOnShelfWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => BookOnShelfWhereUniqueInputSchema), z.lazy(() => BookOnShelfWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => BookOnShelfWhereUniqueInputSchema), z.lazy(() => BookOnShelfWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => BookOnShelfWhereUniqueInputSchema), z.lazy(() => BookOnShelfWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => BookOnShelfUpdateWithWhereUniqueWithoutShelfInputSchema), z.lazy(() => BookOnShelfUpdateWithWhereUniqueWithoutShelfInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => BookOnShelfUpdateManyWithWhereWithoutShelfInputSchema), z.lazy(() => BookOnShelfUpdateManyWithWhereWithoutShelfInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => BookOnShelfScalarWhereInputSchema), z.lazy(() => BookOnShelfScalarWhereInputSchema).array()]).optional(),
}).strict();

export const BookOnShelfUncheckedUpdateManyWithoutShelfNestedInputSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfUncheckedUpdateManyWithoutShelfNestedInput> = z.object({
  create: z.union([z.lazy(() => BookOnShelfCreateWithoutShelfInputSchema), z.lazy(() => BookOnShelfCreateWithoutShelfInputSchema).array(), z.lazy(() => BookOnShelfUncheckedCreateWithoutShelfInputSchema), z.lazy(() => BookOnShelfUncheckedCreateWithoutShelfInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BookOnShelfCreateOrConnectWithoutShelfInputSchema), z.lazy(() => BookOnShelfCreateOrConnectWithoutShelfInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => BookOnShelfUpsertWithWhereUniqueWithoutShelfInputSchema), z.lazy(() => BookOnShelfUpsertWithWhereUniqueWithoutShelfInputSchema).array()]).optional(),
  createMany: z.lazy(() => BookOnShelfCreateManyShelfInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => BookOnShelfWhereUniqueInputSchema), z.lazy(() => BookOnShelfWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => BookOnShelfWhereUniqueInputSchema), z.lazy(() => BookOnShelfWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => BookOnShelfWhereUniqueInputSchema), z.lazy(() => BookOnShelfWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => BookOnShelfWhereUniqueInputSchema), z.lazy(() => BookOnShelfWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => BookOnShelfUpdateWithWhereUniqueWithoutShelfInputSchema), z.lazy(() => BookOnShelfUpdateWithWhereUniqueWithoutShelfInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => BookOnShelfUpdateManyWithWhereWithoutShelfInputSchema), z.lazy(() => BookOnShelfUpdateManyWithWhereWithoutShelfInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => BookOnShelfScalarWhereInputSchema), z.lazy(() => BookOnShelfScalarWhereInputSchema).array()]).optional(),
}).strict();

export const BookCreateNestedOneWithoutBooksOnShelvesInputSchema: z.ZodType<PrismaClient.Prisma.BookCreateNestedOneWithoutBooksOnShelvesInput> = z.object({
  create: z.union([z.lazy(() => BookCreateWithoutBooksOnShelvesInputSchema), z.lazy(() => BookUncheckedCreateWithoutBooksOnShelvesInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => BookCreateOrConnectWithoutBooksOnShelvesInputSchema).optional(),
  connect: z.lazy(() => BookWhereUniqueInputSchema).optional(),
}).strict();

export const ShelfCreateNestedOneWithoutBooksOnShelfInputSchema: z.ZodType<PrismaClient.Prisma.ShelfCreateNestedOneWithoutBooksOnShelfInput> = z.object({
  create: z.union([z.lazy(() => ShelfCreateWithoutBooksOnShelfInputSchema), z.lazy(() => ShelfUncheckedCreateWithoutBooksOnShelfInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => ShelfCreateOrConnectWithoutBooksOnShelfInputSchema).optional(),
  connect: z.lazy(() => ShelfWhereUniqueInputSchema).optional(),
}).strict();

export const BookUpdateOneRequiredWithoutBooksOnShelvesNestedInputSchema: z.ZodType<PrismaClient.Prisma.BookUpdateOneRequiredWithoutBooksOnShelvesNestedInput> = z.object({
  create: z.union([z.lazy(() => BookCreateWithoutBooksOnShelvesInputSchema), z.lazy(() => BookUncheckedCreateWithoutBooksOnShelvesInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => BookCreateOrConnectWithoutBooksOnShelvesInputSchema).optional(),
  upsert: z.lazy(() => BookUpsertWithoutBooksOnShelvesInputSchema).optional(),
  connect: z.lazy(() => BookWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => BookUpdateWithoutBooksOnShelvesInputSchema), z.lazy(() => BookUncheckedUpdateWithoutBooksOnShelvesInputSchema)]).optional(),
}).strict();

export const ShelfUpdateOneRequiredWithoutBooksOnShelfNestedInputSchema: z.ZodType<PrismaClient.Prisma.ShelfUpdateOneRequiredWithoutBooksOnShelfNestedInput> = z.object({
  create: z.union([z.lazy(() => ShelfCreateWithoutBooksOnShelfInputSchema), z.lazy(() => ShelfUncheckedCreateWithoutBooksOnShelfInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => ShelfCreateOrConnectWithoutBooksOnShelfInputSchema).optional(),
  upsert: z.lazy(() => ShelfUpsertWithoutBooksOnShelfInputSchema).optional(),
  connect: z.lazy(() => ShelfWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => ShelfUpdateWithoutBooksOnShelfInputSchema), z.lazy(() => ShelfUncheckedUpdateWithoutBooksOnShelfInputSchema)]).optional(),
=======
export const BookUpdateManyWithoutShelvesNestedInputSchema: z.ZodType<PrismaClient.Prisma.BookUpdateManyWithoutShelvesNestedInput> = z.object({
  create: z.union([z.lazy(() => BookCreateWithoutShelvesInputSchema), z.lazy(() => BookCreateWithoutShelvesInputSchema).array(), z.lazy(() => BookUncheckedCreateWithoutShelvesInputSchema), z.lazy(() => BookUncheckedCreateWithoutShelvesInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BookCreateOrConnectWithoutShelvesInputSchema), z.lazy(() => BookCreateOrConnectWithoutShelvesInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => BookUpsertWithWhereUniqueWithoutShelvesInputSchema), z.lazy(() => BookUpsertWithWhereUniqueWithoutShelvesInputSchema).array()]).optional(),
  set: z.union([z.lazy(() => BookWhereUniqueInputSchema), z.lazy(() => BookWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => BookWhereUniqueInputSchema), z.lazy(() => BookWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => BookWhereUniqueInputSchema), z.lazy(() => BookWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => BookWhereUniqueInputSchema), z.lazy(() => BookWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => BookUpdateWithWhereUniqueWithoutShelvesInputSchema), z.lazy(() => BookUpdateWithWhereUniqueWithoutShelvesInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => BookUpdateManyWithWhereWithoutShelvesInputSchema), z.lazy(() => BookUpdateManyWithWhereWithoutShelvesInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => BookScalarWhereInputSchema), z.lazy(() => BookScalarWhereInputSchema).array()]).optional(),
}).strict();

export const BookUncheckedUpdateManyWithoutShelvesNestedInputSchema: z.ZodType<PrismaClient.Prisma.BookUncheckedUpdateManyWithoutShelvesNestedInput> = z.object({
  create: z.union([z.lazy(() => BookCreateWithoutShelvesInputSchema), z.lazy(() => BookCreateWithoutShelvesInputSchema).array(), z.lazy(() => BookUncheckedCreateWithoutShelvesInputSchema), z.lazy(() => BookUncheckedCreateWithoutShelvesInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BookCreateOrConnectWithoutShelvesInputSchema), z.lazy(() => BookCreateOrConnectWithoutShelvesInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => BookUpsertWithWhereUniqueWithoutShelvesInputSchema), z.lazy(() => BookUpsertWithWhereUniqueWithoutShelvesInputSchema).array()]).optional(),
  set: z.union([z.lazy(() => BookWhereUniqueInputSchema), z.lazy(() => BookWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => BookWhereUniqueInputSchema), z.lazy(() => BookWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => BookWhereUniqueInputSchema), z.lazy(() => BookWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => BookWhereUniqueInputSchema), z.lazy(() => BookWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => BookUpdateWithWhereUniqueWithoutShelvesInputSchema), z.lazy(() => BookUpdateWithWhereUniqueWithoutShelvesInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => BookUpdateManyWithWhereWithoutShelvesInputSchema), z.lazy(() => BookUpdateManyWithWhereWithoutShelvesInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => BookScalarWhereInputSchema), z.lazy(() => BookScalarWhereInputSchema).array()]).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const UserCreateNestedOneWithoutAccountsInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateNestedOneWithoutAccountsInput> = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutAccountsInputSchema), z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
}).strict();

export const UserUpdateOneRequiredWithoutAccountsNestedInputSchema: z.ZodType<PrismaClient.Prisma.UserUpdateOneRequiredWithoutAccountsNestedInput> = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutAccountsInputSchema), z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateWithoutAccountsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema)]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSessionsInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateNestedOneWithoutSessionsInput> = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutSessionsInputSchema), z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutSessionsNestedInputSchema: z.ZodType<PrismaClient.Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput> = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutSessionsInputSchema), z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateWithoutSessionsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema)]).optional(),
}).strict();

export const AccountCreateNestedManyWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.AccountCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([z.lazy(() => AccountCreateWithoutUserInputSchema), z.lazy(() => AccountCreateWithoutUserInputSchema).array(), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema), z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array()]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const SessionCreateNestedManyWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.SessionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([z.lazy(() => SessionCreateWithoutUserInputSchema), z.lazy(() => SessionCreateWithoutUserInputSchema).array(), z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema), z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema), z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array()]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const CorrectionCreateNestedManyWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.CorrectionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([z.lazy(() => CorrectionCreateWithoutUserInputSchema), z.lazy(() => CorrectionCreateWithoutUserInputSchema).array(), z.lazy(() => CorrectionUncheckedCreateWithoutUserInputSchema), z.lazy(() => CorrectionUncheckedCreateWithoutUserInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CorrectionCreateOrConnectWithoutUserInputSchema), z.lazy(() => CorrectionCreateOrConnectWithoutUserInputSchema).array()]).optional(),
  createMany: z.lazy(() => CorrectionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => CorrectionWhereUniqueInputSchema), z.lazy(() => CorrectionWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const PurchaseOrderCreateNestedManyWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([z.lazy(() => PurchaseOrderCreateWithoutUserInputSchema), z.lazy(() => PurchaseOrderCreateWithoutUserInputSchema).array(), z.lazy(() => PurchaseOrderUncheckedCreateWithoutUserInputSchema), z.lazy(() => PurchaseOrderUncheckedCreateWithoutUserInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PurchaseOrderCreateOrConnectWithoutUserInputSchema), z.lazy(() => PurchaseOrderCreateOrConnectWithoutUserInputSchema).array()]).optional(),
  createMany: z.lazy(() => PurchaseOrderCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => PurchaseOrderWhereUniqueInputSchema), z.lazy(() => PurchaseOrderWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const BuybackOrderCreateNestedManyWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([z.lazy(() => BuybackOrderCreateWithoutUserInputSchema), z.lazy(() => BuybackOrderCreateWithoutUserInputSchema).array(), z.lazy(() => BuybackOrderUncheckedCreateWithoutUserInputSchema), z.lazy(() => BuybackOrderUncheckedCreateWithoutUserInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BuybackOrderCreateOrConnectWithoutUserInputSchema), z.lazy(() => BuybackOrderCreateOrConnectWithoutUserInputSchema).array()]).optional(),
  createMany: z.lazy(() => BuybackOrderCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => BuybackOrderWhereUniqueInputSchema), z.lazy(() => BuybackOrderWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const CaseCreateNestedManyWithoutCreatorInputSchema: z.ZodType<PrismaClient.Prisma.CaseCreateNestedManyWithoutCreatorInput> = z.object({
  create: z.union([z.lazy(() => CaseCreateWithoutCreatorInputSchema), z.lazy(() => CaseCreateWithoutCreatorInputSchema).array(), z.lazy(() => CaseUncheckedCreateWithoutCreatorInputSchema), z.lazy(() => CaseUncheckedCreateWithoutCreatorInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseCreateOrConnectWithoutCreatorInputSchema), z.lazy(() => CaseCreateOrConnectWithoutCreatorInputSchema).array()]).optional(),
  createMany: z.lazy(() => CaseCreateManyCreatorInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => CaseWhereUniqueInputSchema), z.lazy(() => CaseWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const CaseCreateNestedManyWithoutEditorInputSchema: z.ZodType<PrismaClient.Prisma.CaseCreateNestedManyWithoutEditorInput> = z.object({
  create: z.union([z.lazy(() => CaseCreateWithoutEditorInputSchema), z.lazy(() => CaseCreateWithoutEditorInputSchema).array(), z.lazy(() => CaseUncheckedCreateWithoutEditorInputSchema), z.lazy(() => CaseUncheckedCreateWithoutEditorInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseCreateOrConnectWithoutEditorInputSchema), z.lazy(() => CaseCreateOrConnectWithoutEditorInputSchema).array()]).optional(),
  createMany: z.lazy(() => CaseCreateManyEditorInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => CaseWhereUniqueInputSchema), z.lazy(() => CaseWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const AccountUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.AccountUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([z.lazy(() => AccountCreateWithoutUserInputSchema), z.lazy(() => AccountCreateWithoutUserInputSchema).array(), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema), z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array()]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const SessionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.SessionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([z.lazy(() => SessionCreateWithoutUserInputSchema), z.lazy(() => SessionCreateWithoutUserInputSchema).array(), z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema), z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema), z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array()]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const CorrectionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.CorrectionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([z.lazy(() => CorrectionCreateWithoutUserInputSchema), z.lazy(() => CorrectionCreateWithoutUserInputSchema).array(), z.lazy(() => CorrectionUncheckedCreateWithoutUserInputSchema), z.lazy(() => CorrectionUncheckedCreateWithoutUserInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CorrectionCreateOrConnectWithoutUserInputSchema), z.lazy(() => CorrectionCreateOrConnectWithoutUserInputSchema).array()]).optional(),
  createMany: z.lazy(() => CorrectionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => CorrectionWhereUniqueInputSchema), z.lazy(() => CorrectionWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const PurchaseOrderUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([z.lazy(() => PurchaseOrderCreateWithoutUserInputSchema), z.lazy(() => PurchaseOrderCreateWithoutUserInputSchema).array(), z.lazy(() => PurchaseOrderUncheckedCreateWithoutUserInputSchema), z.lazy(() => PurchaseOrderUncheckedCreateWithoutUserInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PurchaseOrderCreateOrConnectWithoutUserInputSchema), z.lazy(() => PurchaseOrderCreateOrConnectWithoutUserInputSchema).array()]).optional(),
  createMany: z.lazy(() => PurchaseOrderCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => PurchaseOrderWhereUniqueInputSchema), z.lazy(() => PurchaseOrderWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const BuybackOrderUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([z.lazy(() => BuybackOrderCreateWithoutUserInputSchema), z.lazy(() => BuybackOrderCreateWithoutUserInputSchema).array(), z.lazy(() => BuybackOrderUncheckedCreateWithoutUserInputSchema), z.lazy(() => BuybackOrderUncheckedCreateWithoutUserInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BuybackOrderCreateOrConnectWithoutUserInputSchema), z.lazy(() => BuybackOrderCreateOrConnectWithoutUserInputSchema).array()]).optional(),
  createMany: z.lazy(() => BuybackOrderCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => BuybackOrderWhereUniqueInputSchema), z.lazy(() => BuybackOrderWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const CaseUncheckedCreateNestedManyWithoutCreatorInputSchema: z.ZodType<PrismaClient.Prisma.CaseUncheckedCreateNestedManyWithoutCreatorInput> = z.object({
  create: z.union([z.lazy(() => CaseCreateWithoutCreatorInputSchema), z.lazy(() => CaseCreateWithoutCreatorInputSchema).array(), z.lazy(() => CaseUncheckedCreateWithoutCreatorInputSchema), z.lazy(() => CaseUncheckedCreateWithoutCreatorInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseCreateOrConnectWithoutCreatorInputSchema), z.lazy(() => CaseCreateOrConnectWithoutCreatorInputSchema).array()]).optional(),
  createMany: z.lazy(() => CaseCreateManyCreatorInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => CaseWhereUniqueInputSchema), z.lazy(() => CaseWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const CaseUncheckedCreateNestedManyWithoutEditorInputSchema: z.ZodType<PrismaClient.Prisma.CaseUncheckedCreateNestedManyWithoutEditorInput> = z.object({
  create: z.union([z.lazy(() => CaseCreateWithoutEditorInputSchema), z.lazy(() => CaseCreateWithoutEditorInputSchema).array(), z.lazy(() => CaseUncheckedCreateWithoutEditorInputSchema), z.lazy(() => CaseUncheckedCreateWithoutEditorInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseCreateOrConnectWithoutEditorInputSchema), z.lazy(() => CaseCreateOrConnectWithoutEditorInputSchema).array()]).optional(),
  createMany: z.lazy(() => CaseCreateManyEditorInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => CaseWhereUniqueInputSchema), z.lazy(() => CaseWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const AccountUpdateManyWithoutUserNestedInputSchema: z.ZodType<PrismaClient.Prisma.AccountUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([z.lazy(() => AccountCreateWithoutUserInputSchema), z.lazy(() => AccountCreateWithoutUserInputSchema).array(), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema), z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => AccountScalarWhereInputSchema), z.lazy(() => AccountScalarWhereInputSchema).array()]).optional(),
}).strict();

export const SessionUpdateManyWithoutUserNestedInputSchema: z.ZodType<PrismaClient.Prisma.SessionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([z.lazy(() => SessionCreateWithoutUserInputSchema), z.lazy(() => SessionCreateWithoutUserInputSchema).array(), z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema), z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema), z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => SessionScalarWhereInputSchema), z.lazy(() => SessionScalarWhereInputSchema).array()]).optional(),
}).strict();

export const CorrectionUpdateManyWithoutUserNestedInputSchema: z.ZodType<PrismaClient.Prisma.CorrectionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([z.lazy(() => CorrectionCreateWithoutUserInputSchema), z.lazy(() => CorrectionCreateWithoutUserInputSchema).array(), z.lazy(() => CorrectionUncheckedCreateWithoutUserInputSchema), z.lazy(() => CorrectionUncheckedCreateWithoutUserInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CorrectionCreateOrConnectWithoutUserInputSchema), z.lazy(() => CorrectionCreateOrConnectWithoutUserInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CorrectionUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => CorrectionUpsertWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
  createMany: z.lazy(() => CorrectionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => CorrectionWhereUniqueInputSchema), z.lazy(() => CorrectionWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CorrectionWhereUniqueInputSchema), z.lazy(() => CorrectionWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CorrectionWhereUniqueInputSchema), z.lazy(() => CorrectionWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CorrectionWhereUniqueInputSchema), z.lazy(() => CorrectionWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => CorrectionUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => CorrectionUpdateWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CorrectionUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => CorrectionUpdateManyWithWhereWithoutUserInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CorrectionScalarWhereInputSchema), z.lazy(() => CorrectionScalarWhereInputSchema).array()]).optional(),
}).strict();

export const PurchaseOrderUpdateManyWithoutUserNestedInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([z.lazy(() => PurchaseOrderCreateWithoutUserInputSchema), z.lazy(() => PurchaseOrderCreateWithoutUserInputSchema).array(), z.lazy(() => PurchaseOrderUncheckedCreateWithoutUserInputSchema), z.lazy(() => PurchaseOrderUncheckedCreateWithoutUserInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PurchaseOrderCreateOrConnectWithoutUserInputSchema), z.lazy(() => PurchaseOrderCreateOrConnectWithoutUserInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => PurchaseOrderUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => PurchaseOrderUpsertWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
  createMany: z.lazy(() => PurchaseOrderCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => PurchaseOrderWhereUniqueInputSchema), z.lazy(() => PurchaseOrderWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => PurchaseOrderWhereUniqueInputSchema), z.lazy(() => PurchaseOrderWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => PurchaseOrderWhereUniqueInputSchema), z.lazy(() => PurchaseOrderWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => PurchaseOrderWhereUniqueInputSchema), z.lazy(() => PurchaseOrderWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => PurchaseOrderUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => PurchaseOrderUpdateWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => PurchaseOrderUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => PurchaseOrderUpdateManyWithWhereWithoutUserInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => PurchaseOrderScalarWhereInputSchema), z.lazy(() => PurchaseOrderScalarWhereInputSchema).array()]).optional(),
}).strict();

export const BuybackOrderUpdateManyWithoutUserNestedInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([z.lazy(() => BuybackOrderCreateWithoutUserInputSchema), z.lazy(() => BuybackOrderCreateWithoutUserInputSchema).array(), z.lazy(() => BuybackOrderUncheckedCreateWithoutUserInputSchema), z.lazy(() => BuybackOrderUncheckedCreateWithoutUserInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BuybackOrderCreateOrConnectWithoutUserInputSchema), z.lazy(() => BuybackOrderCreateOrConnectWithoutUserInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => BuybackOrderUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => BuybackOrderUpsertWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
  createMany: z.lazy(() => BuybackOrderCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => BuybackOrderWhereUniqueInputSchema), z.lazy(() => BuybackOrderWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => BuybackOrderWhereUniqueInputSchema), z.lazy(() => BuybackOrderWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => BuybackOrderWhereUniqueInputSchema), z.lazy(() => BuybackOrderWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => BuybackOrderWhereUniqueInputSchema), z.lazy(() => BuybackOrderWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => BuybackOrderUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => BuybackOrderUpdateWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => BuybackOrderUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => BuybackOrderUpdateManyWithWhereWithoutUserInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => BuybackOrderScalarWhereInputSchema), z.lazy(() => BuybackOrderScalarWhereInputSchema).array()]).optional(),
}).strict();

export const CaseUpdateManyWithoutCreatorNestedInputSchema: z.ZodType<PrismaClient.Prisma.CaseUpdateManyWithoutCreatorNestedInput> = z.object({
  create: z.union([z.lazy(() => CaseCreateWithoutCreatorInputSchema), z.lazy(() => CaseCreateWithoutCreatorInputSchema).array(), z.lazy(() => CaseUncheckedCreateWithoutCreatorInputSchema), z.lazy(() => CaseUncheckedCreateWithoutCreatorInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseCreateOrConnectWithoutCreatorInputSchema), z.lazy(() => CaseCreateOrConnectWithoutCreatorInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CaseUpsertWithWhereUniqueWithoutCreatorInputSchema), z.lazy(() => CaseUpsertWithWhereUniqueWithoutCreatorInputSchema).array()]).optional(),
  createMany: z.lazy(() => CaseCreateManyCreatorInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => CaseWhereUniqueInputSchema), z.lazy(() => CaseWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CaseWhereUniqueInputSchema), z.lazy(() => CaseWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CaseWhereUniqueInputSchema), z.lazy(() => CaseWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CaseWhereUniqueInputSchema), z.lazy(() => CaseWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => CaseUpdateWithWhereUniqueWithoutCreatorInputSchema), z.lazy(() => CaseUpdateWithWhereUniqueWithoutCreatorInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CaseUpdateManyWithWhereWithoutCreatorInputSchema), z.lazy(() => CaseUpdateManyWithWhereWithoutCreatorInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CaseScalarWhereInputSchema), z.lazy(() => CaseScalarWhereInputSchema).array()]).optional(),
}).strict();

export const CaseUpdateManyWithoutEditorNestedInputSchema: z.ZodType<PrismaClient.Prisma.CaseUpdateManyWithoutEditorNestedInput> = z.object({
  create: z.union([z.lazy(() => CaseCreateWithoutEditorInputSchema), z.lazy(() => CaseCreateWithoutEditorInputSchema).array(), z.lazy(() => CaseUncheckedCreateWithoutEditorInputSchema), z.lazy(() => CaseUncheckedCreateWithoutEditorInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseCreateOrConnectWithoutEditorInputSchema), z.lazy(() => CaseCreateOrConnectWithoutEditorInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CaseUpsertWithWhereUniqueWithoutEditorInputSchema), z.lazy(() => CaseUpsertWithWhereUniqueWithoutEditorInputSchema).array()]).optional(),
  createMany: z.lazy(() => CaseCreateManyEditorInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => CaseWhereUniqueInputSchema), z.lazy(() => CaseWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CaseWhereUniqueInputSchema), z.lazy(() => CaseWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CaseWhereUniqueInputSchema), z.lazy(() => CaseWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CaseWhereUniqueInputSchema), z.lazy(() => CaseWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => CaseUpdateWithWhereUniqueWithoutEditorInputSchema), z.lazy(() => CaseUpdateWithWhereUniqueWithoutEditorInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CaseUpdateManyWithWhereWithoutEditorInputSchema), z.lazy(() => CaseUpdateManyWithWhereWithoutEditorInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CaseScalarWhereInputSchema), z.lazy(() => CaseScalarWhereInputSchema).array()]).optional(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<PrismaClient.Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([z.lazy(() => AccountCreateWithoutUserInputSchema), z.lazy(() => AccountCreateWithoutUserInputSchema).array(), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema), z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => AccountScalarWhereInputSchema), z.lazy(() => AccountScalarWhereInputSchema).array()]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<PrismaClient.Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([z.lazy(() => SessionCreateWithoutUserInputSchema), z.lazy(() => SessionCreateWithoutUserInputSchema).array(), z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema), z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema), z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => SessionScalarWhereInputSchema), z.lazy(() => SessionScalarWhereInputSchema).array()]).optional(),
}).strict();

export const CorrectionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<PrismaClient.Prisma.CorrectionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([z.lazy(() => CorrectionCreateWithoutUserInputSchema), z.lazy(() => CorrectionCreateWithoutUserInputSchema).array(), z.lazy(() => CorrectionUncheckedCreateWithoutUserInputSchema), z.lazy(() => CorrectionUncheckedCreateWithoutUserInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CorrectionCreateOrConnectWithoutUserInputSchema), z.lazy(() => CorrectionCreateOrConnectWithoutUserInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CorrectionUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => CorrectionUpsertWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
  createMany: z.lazy(() => CorrectionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => CorrectionWhereUniqueInputSchema), z.lazy(() => CorrectionWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CorrectionWhereUniqueInputSchema), z.lazy(() => CorrectionWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CorrectionWhereUniqueInputSchema), z.lazy(() => CorrectionWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CorrectionWhereUniqueInputSchema), z.lazy(() => CorrectionWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => CorrectionUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => CorrectionUpdateWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CorrectionUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => CorrectionUpdateManyWithWhereWithoutUserInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CorrectionScalarWhereInputSchema), z.lazy(() => CorrectionScalarWhereInputSchema).array()]).optional(),
}).strict();

export const PurchaseOrderUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([z.lazy(() => PurchaseOrderCreateWithoutUserInputSchema), z.lazy(() => PurchaseOrderCreateWithoutUserInputSchema).array(), z.lazy(() => PurchaseOrderUncheckedCreateWithoutUserInputSchema), z.lazy(() => PurchaseOrderUncheckedCreateWithoutUserInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PurchaseOrderCreateOrConnectWithoutUserInputSchema), z.lazy(() => PurchaseOrderCreateOrConnectWithoutUserInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => PurchaseOrderUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => PurchaseOrderUpsertWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
  createMany: z.lazy(() => PurchaseOrderCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => PurchaseOrderWhereUniqueInputSchema), z.lazy(() => PurchaseOrderWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => PurchaseOrderWhereUniqueInputSchema), z.lazy(() => PurchaseOrderWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => PurchaseOrderWhereUniqueInputSchema), z.lazy(() => PurchaseOrderWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => PurchaseOrderWhereUniqueInputSchema), z.lazy(() => PurchaseOrderWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => PurchaseOrderUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => PurchaseOrderUpdateWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => PurchaseOrderUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => PurchaseOrderUpdateManyWithWhereWithoutUserInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => PurchaseOrderScalarWhereInputSchema), z.lazy(() => PurchaseOrderScalarWhereInputSchema).array()]).optional(),
}).strict();

export const BuybackOrderUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([z.lazy(() => BuybackOrderCreateWithoutUserInputSchema), z.lazy(() => BuybackOrderCreateWithoutUserInputSchema).array(), z.lazy(() => BuybackOrderUncheckedCreateWithoutUserInputSchema), z.lazy(() => BuybackOrderUncheckedCreateWithoutUserInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BuybackOrderCreateOrConnectWithoutUserInputSchema), z.lazy(() => BuybackOrderCreateOrConnectWithoutUserInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => BuybackOrderUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => BuybackOrderUpsertWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
  createMany: z.lazy(() => BuybackOrderCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => BuybackOrderWhereUniqueInputSchema), z.lazy(() => BuybackOrderWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => BuybackOrderWhereUniqueInputSchema), z.lazy(() => BuybackOrderWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => BuybackOrderWhereUniqueInputSchema), z.lazy(() => BuybackOrderWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => BuybackOrderWhereUniqueInputSchema), z.lazy(() => BuybackOrderWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => BuybackOrderUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => BuybackOrderUpdateWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => BuybackOrderUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => BuybackOrderUpdateManyWithWhereWithoutUserInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => BuybackOrderScalarWhereInputSchema), z.lazy(() => BuybackOrderScalarWhereInputSchema).array()]).optional(),
}).strict();

export const CaseUncheckedUpdateManyWithoutCreatorNestedInputSchema: z.ZodType<PrismaClient.Prisma.CaseUncheckedUpdateManyWithoutCreatorNestedInput> = z.object({
  create: z.union([z.lazy(() => CaseCreateWithoutCreatorInputSchema), z.lazy(() => CaseCreateWithoutCreatorInputSchema).array(), z.lazy(() => CaseUncheckedCreateWithoutCreatorInputSchema), z.lazy(() => CaseUncheckedCreateWithoutCreatorInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseCreateOrConnectWithoutCreatorInputSchema), z.lazy(() => CaseCreateOrConnectWithoutCreatorInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CaseUpsertWithWhereUniqueWithoutCreatorInputSchema), z.lazy(() => CaseUpsertWithWhereUniqueWithoutCreatorInputSchema).array()]).optional(),
  createMany: z.lazy(() => CaseCreateManyCreatorInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => CaseWhereUniqueInputSchema), z.lazy(() => CaseWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CaseWhereUniqueInputSchema), z.lazy(() => CaseWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CaseWhereUniqueInputSchema), z.lazy(() => CaseWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CaseWhereUniqueInputSchema), z.lazy(() => CaseWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => CaseUpdateWithWhereUniqueWithoutCreatorInputSchema), z.lazy(() => CaseUpdateWithWhereUniqueWithoutCreatorInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CaseUpdateManyWithWhereWithoutCreatorInputSchema), z.lazy(() => CaseUpdateManyWithWhereWithoutCreatorInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CaseScalarWhereInputSchema), z.lazy(() => CaseScalarWhereInputSchema).array()]).optional(),
}).strict();

export const CaseUncheckedUpdateManyWithoutEditorNestedInputSchema: z.ZodType<PrismaClient.Prisma.CaseUncheckedUpdateManyWithoutEditorNestedInput> = z.object({
  create: z.union([z.lazy(() => CaseCreateWithoutEditorInputSchema), z.lazy(() => CaseCreateWithoutEditorInputSchema).array(), z.lazy(() => CaseUncheckedCreateWithoutEditorInputSchema), z.lazy(() => CaseUncheckedCreateWithoutEditorInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseCreateOrConnectWithoutEditorInputSchema), z.lazy(() => CaseCreateOrConnectWithoutEditorInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CaseUpsertWithWhereUniqueWithoutEditorInputSchema), z.lazy(() => CaseUpsertWithWhereUniqueWithoutEditorInputSchema).array()]).optional(),
  createMany: z.lazy(() => CaseCreateManyEditorInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => CaseWhereUniqueInputSchema), z.lazy(() => CaseWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CaseWhereUniqueInputSchema), z.lazy(() => CaseWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CaseWhereUniqueInputSchema), z.lazy(() => CaseWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CaseWhereUniqueInputSchema), z.lazy(() => CaseWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => CaseUpdateWithWhereUniqueWithoutEditorInputSchema), z.lazy(() => CaseUpdateWithWhereUniqueWithoutEditorInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CaseUpdateManyWithWhereWithoutEditorInputSchema), z.lazy(() => CaseUpdateManyWithWhereWithoutEditorInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CaseScalarWhereInputSchema), z.lazy(() => CaseScalarWhereInputSchema).array()]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<PrismaClient.Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([z.string(), z.lazy(() => NestedStringFilterSchema)]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<PrismaClient.Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)]).optional().nullable(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<PrismaClient.Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
}).strict();

export const NestedFloatFilterSchema: z.ZodType<PrismaClient.Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedFloatFilterSchema)]).optional(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<PrismaClient.Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([z.boolean(), z.lazy(() => NestedBoolFilterSchema)]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([z.string(), z.lazy(() => NestedStringWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([z.string(), z.lazy(() => NestedStringNullableWithAggregatesFilterSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<PrismaClient.Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)]).optional().nullable(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional(),
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedFloatWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([z.boolean(), z.lazy(() => NestedBoolWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<PrismaClient.Prisma.NestedDateTimeFilter> = z.object({
  equals: z.date().optional(),
  in: z.date().array().optional(),
  notIn: z.date().array().optional(),
  lt: z.date().optional(),
  lte: z.date().optional(),
  gt: z.date().optional(),
  gte: z.date().optional(),
  not: z.union([z.date(), z.lazy(() => NestedDateTimeFilterSchema)]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.date().optional(),
  in: z.date().array().optional(),
  notIn: z.date().array().optional(),
  lt: z.date().optional(),
  lte: z.date().optional(),
  gt: z.date().optional(),
  gte: z.date().optional(),
  not: z.union([z.date(), z.lazy(() => NestedDateTimeWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntNullableWithAggregatesFilterSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<PrismaClient.Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedFloatNullableFilterSchema)]).optional().nullable(),
}).strict();

export const AuthorCreateWithoutBooksInputSchema: z.ZodType<PrismaClient.Prisma.AuthorCreateWithoutBooksInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  display: z.boolean().optional(),
}).strict();

export const AuthorUncheckedCreateWithoutBooksInputSchema: z.ZodType<PrismaClient.Prisma.AuthorUncheckedCreateWithoutBooksInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  display: z.boolean().optional(),
}).strict();

export const AuthorCreateOrConnectWithoutBooksInputSchema: z.ZodType<PrismaClient.Prisma.AuthorCreateOrConnectWithoutBooksInput> = z.object({
  where: z.lazy(() => AuthorWhereUniqueInputSchema),
  create: z.union([z.lazy(() => AuthorCreateWithoutBooksInputSchema), z.lazy(() => AuthorUncheckedCreateWithoutBooksInputSchema)]),
}).strict();

export const GenreCreateWithoutBooksInputSchema: z.ZodType<PrismaClient.Prisma.GenreCreateWithoutBooksInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  display: z.boolean().optional(),
}).strict();

export const GenreUncheckedCreateWithoutBooksInputSchema: z.ZodType<PrismaClient.Prisma.GenreUncheckedCreateWithoutBooksInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  display: z.boolean().optional(),
}).strict();

export const GenreCreateOrConnectWithoutBooksInputSchema: z.ZodType<PrismaClient.Prisma.GenreCreateOrConnectWithoutBooksInput> = z.object({
  where: z.lazy(() => GenreWhereUniqueInputSchema),
  create: z.union([z.lazy(() => GenreCreateWithoutBooksInputSchema), z.lazy(() => GenreUncheckedCreateWithoutBooksInputSchema)]),
}).strict();

export const PurchaseLineCreateWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineCreateWithoutBookInput> = z.object({
  id: z.string().optional(),
  quantity: z.number(),
  unitWholesalePrice: z.number(),
  display: z.boolean().optional(),
  purchaseOrder: z.lazy(() => PurchaseOrderCreateNestedOneWithoutPurchaseLinesInputSchema),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorCreateNestedOneWithoutPurchaseLineInputSchema).optional(),
}).strict();

export const PurchaseLineUncheckedCreateWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineUncheckedCreateWithoutBookInput> = z.object({
  id: z.string().optional(),
  quantity: z.number(),
  unitWholesalePrice: z.number(),
  purchaseOrderId: z.string(),
  display: z.boolean().optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUncheckedCreateNestedOneWithoutPurchaseLineInputSchema).optional(),
}).strict();

export const PurchaseLineCreateOrConnectWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineCreateOrConnectWithoutBookInput> = z.object({
  where: z.lazy(() => PurchaseLineWhereUniqueInputSchema),
  create: z.union([z.lazy(() => PurchaseLineCreateWithoutBookInputSchema), z.lazy(() => PurchaseLineUncheckedCreateWithoutBookInputSchema)]),
}).strict();

export const PurchaseLineCreateManyBookInputEnvelopeSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineCreateManyBookInputEnvelope> = z.object({
  data: z.union([z.lazy(() => PurchaseLineCreateManyBookInputSchema), z.lazy(() => PurchaseLineCreateManyBookInputSchema).array()]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const SalesLineCreateWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineCreateWithoutBookInput> = z.object({
  id: z.string().optional(),
  quantity: z.number(),
  unitWholesalePrice: z.number(),
  display: z.boolean().optional(),
  salesReconciliation: z.lazy(() => SalesReconciliationCreateNestedOneWithoutSalesLinesInputSchema),
}).strict();

export const SalesLineUncheckedCreateWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineUncheckedCreateWithoutBookInput> = z.object({
  id: z.string().optional(),
  quantity: z.number(),
  unitWholesalePrice: z.number(),
  salesReconciliationId: z.string(),
  display: z.boolean().optional(),
}).strict();

export const SalesLineCreateOrConnectWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineCreateOrConnectWithoutBookInput> = z.object({
  where: z.lazy(() => SalesLineWhereUniqueInputSchema),
  create: z.union([z.lazy(() => SalesLineCreateWithoutBookInputSchema), z.lazy(() => SalesLineUncheckedCreateWithoutBookInputSchema)]),
}).strict();

export const SalesLineCreateManyBookInputEnvelopeSchema: z.ZodType<PrismaClient.Prisma.SalesLineCreateManyBookInputEnvelope> = z.object({
  data: z.union([z.lazy(() => SalesLineCreateManyBookInputSchema), z.lazy(() => SalesLineCreateManyBookInputSchema).array()]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const BuybackLineCreateWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.BuybackLineCreateWithoutBookInput> = z.object({
  id: z.string().optional(),
  quantity: z.number(),
  unitBuybackPrice: z.number(),
  display: z.boolean().optional(),
  buybackOrder: z.lazy(() => BuybackOrderCreateNestedOneWithoutBuybackLinesInputSchema),
}).strict();

export const BuybackLineUncheckedCreateWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.BuybackLineUncheckedCreateWithoutBookInput> = z.object({
  id: z.string().optional(),
  quantity: z.number(),
  unitBuybackPrice: z.number(),
  buybackOrderId: z.string(),
  display: z.boolean().optional(),
}).strict();

export const BuybackLineCreateOrConnectWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.BuybackLineCreateOrConnectWithoutBookInput> = z.object({
  where: z.lazy(() => BuybackLineWhereUniqueInputSchema),
  create: z.union([z.lazy(() => BuybackLineCreateWithoutBookInputSchema), z.lazy(() => BuybackLineUncheckedCreateWithoutBookInputSchema)]),
}).strict();

export const BuybackLineCreateManyBookInputEnvelopeSchema: z.ZodType<PrismaClient.Prisma.BuybackLineCreateManyBookInputEnvelope> = z.object({
  data: z.union([z.lazy(() => BuybackLineCreateManyBookInputSchema), z.lazy(() => BuybackLineCreateManyBookInputSchema).array()]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const CostMostRecentVendorCreateWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorCreateWithoutBookInput> = z.object({
  id: z.string().optional(),
  vendor: z.lazy(() => VendorCreateNestedOneWithoutCostMostRecentVendorInputSchema),
  purchaseLine: z.lazy(() => PurchaseLineCreateNestedOneWithoutCostMostRecentVendorInputSchema),
  purchaseOrder: z.lazy(() => PurchaseOrderCreateNestedOneWithoutCostMostRecentVendorInputSchema),
}).strict();

export const CostMostRecentVendorUncheckedCreateWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorUncheckedCreateWithoutBookInput> = z.object({
  id: z.string().optional(),
  vendorId: z.string(),
  purchaseLineId: z.string(),
  purchaseOrderId: z.string(),
}).strict();

export const CostMostRecentVendorCreateOrConnectWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorCreateOrConnectWithoutBookInput> = z.object({
  where: z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema),
  create: z.union([z.lazy(() => CostMostRecentVendorCreateWithoutBookInputSchema), z.lazy(() => CostMostRecentVendorUncheckedCreateWithoutBookInputSchema)]),
}).strict();

export const CostMostRecentVendorCreateManyBookInputEnvelopeSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorCreateManyBookInputEnvelope> = z.object({
  data: z.union([z.lazy(() => CostMostRecentVendorCreateManyBookInputSchema), z.lazy(() => CostMostRecentVendorCreateManyBookInputSchema).array()]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const CorrectionCreateWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.CorrectionCreateWithoutBookInput> = z.object({
  id: z.string().optional(),
  date: z.date(),
  quantity: z.number(),
  user: z.lazy(() => UserCreateNestedOneWithoutCorrectionInputSchema).optional(),
}).strict();

export const CorrectionUncheckedCreateWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.CorrectionUncheckedCreateWithoutBookInput> = z.object({
  id: z.string().optional(),
  userId: z.string().optional().nullable(),
  date: z.date(),
  quantity: z.number(),
}).strict();

export const CorrectionCreateOrConnectWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.CorrectionCreateOrConnectWithoutBookInput> = z.object({
  where: z.lazy(() => CorrectionWhereUniqueInputSchema),
  create: z.union([z.lazy(() => CorrectionCreateWithoutBookInputSchema), z.lazy(() => CorrectionUncheckedCreateWithoutBookInputSchema)]),
}).strict();

export const CorrectionCreateManyBookInputEnvelopeSchema: z.ZodType<PrismaClient.Prisma.CorrectionCreateManyBookInputEnvelope> = z.object({
  data: z.union([z.lazy(() => CorrectionCreateManyBookInputSchema), z.lazy(() => CorrectionCreateManyBookInputSchema).array()]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const BookCreateWithoutSymmetricRelatedBooksInputSchema: z.ZodType<PrismaClient.Prisma.BookCreateWithoutSymmetricRelatedBooksInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  isbn_13: z.string(),
  isbn_10: z.string().optional().nullable(),
  publisher: z.string(),
  publicationYear: z.number(),
  pageCount: z.number(),
  width: z.number(),
  height: z.number(),
  thickness: z.number(),
  retailPrice: z.number(),
  inventoryCount: z.number(),
  display: z.boolean().optional(),
  imgUrl: z.string().optional().nullable(),
  authors: z.lazy(() => AuthorCreateNestedManyWithoutBooksInputSchema).optional(),
  genre: z.lazy(() => GenreCreateNestedOneWithoutBooksInputSchema),
  purchaseLines: z.lazy(() => PurchaseLineCreateNestedManyWithoutBookInputSchema).optional(),
  salesLines: z.lazy(() => SalesLineCreateNestedManyWithoutBookInputSchema).optional(),
  buybackLines: z.lazy(() => BuybackLineCreateNestedManyWithoutBookInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorCreateNestedManyWithoutBookInputSchema).optional(),
  correction: z.lazy(() => CorrectionCreateNestedManyWithoutBookInputSchema).optional(),
  relatedBooks: z.lazy(() => BookCreateNestedManyWithoutSymmetricRelatedBooksInputSchema).optional(),
<<<<<<< HEAD
  booksOnShelves: z.lazy(() => BookOnShelfCreateNestedManyWithoutBookInputSchema).optional(),
=======
  shelves: z.lazy(() => ShelfCreateNestedManyWithoutBooksInputSchema).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const BookUncheckedCreateWithoutSymmetricRelatedBooksInputSchema: z.ZodType<PrismaClient.Prisma.BookUncheckedCreateWithoutSymmetricRelatedBooksInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  isbn_13: z.string(),
  isbn_10: z.string().optional().nullable(),
  publisher: z.string(),
  publicationYear: z.number(),
  pageCount: z.number(),
  width: z.number(),
  height: z.number(),
  thickness: z.number(),
  retailPrice: z.number(),
  genreId: z.string(),
  inventoryCount: z.number(),
  display: z.boolean().optional(),
  imgUrl: z.string().optional().nullable(),
  authors: z.lazy(() => AuthorUncheckedCreateNestedManyWithoutBooksInputSchema).optional(),
  purchaseLines: z.lazy(() => PurchaseLineUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  salesLines: z.lazy(() => SalesLineUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  buybackLines: z.lazy(() => BuybackLineUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  correction: z.lazy(() => CorrectionUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  relatedBooks: z.lazy(() => BookUncheckedCreateNestedManyWithoutSymmetricRelatedBooksInputSchema).optional(),
<<<<<<< HEAD
  booksOnShelves: z.lazy(() => BookOnShelfUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
=======
  shelves: z.lazy(() => ShelfUncheckedCreateNestedManyWithoutBooksInputSchema).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const BookCreateOrConnectWithoutSymmetricRelatedBooksInputSchema: z.ZodType<PrismaClient.Prisma.BookCreateOrConnectWithoutSymmetricRelatedBooksInput> = z.object({
  where: z.lazy(() => BookWhereUniqueInputSchema),
  create: z.union([z.lazy(() => BookCreateWithoutSymmetricRelatedBooksInputSchema), z.lazy(() => BookUncheckedCreateWithoutSymmetricRelatedBooksInputSchema)]),
}).strict();

export const BookCreateWithoutRelatedBooksInputSchema: z.ZodType<PrismaClient.Prisma.BookCreateWithoutRelatedBooksInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  isbn_13: z.string(),
  isbn_10: z.string().optional().nullable(),
  publisher: z.string(),
  publicationYear: z.number(),
  pageCount: z.number(),
  width: z.number(),
  height: z.number(),
  thickness: z.number(),
  retailPrice: z.number(),
  inventoryCount: z.number(),
  display: z.boolean().optional(),
  imgUrl: z.string().optional().nullable(),
  authors: z.lazy(() => AuthorCreateNestedManyWithoutBooksInputSchema).optional(),
  genre: z.lazy(() => GenreCreateNestedOneWithoutBooksInputSchema),
  purchaseLines: z.lazy(() => PurchaseLineCreateNestedManyWithoutBookInputSchema).optional(),
  salesLines: z.lazy(() => SalesLineCreateNestedManyWithoutBookInputSchema).optional(),
  buybackLines: z.lazy(() => BuybackLineCreateNestedManyWithoutBookInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorCreateNestedManyWithoutBookInputSchema).optional(),
  correction: z.lazy(() => CorrectionCreateNestedManyWithoutBookInputSchema).optional(),
  symmetricRelatedBooks: z.lazy(() => BookCreateNestedManyWithoutRelatedBooksInputSchema).optional(),
<<<<<<< HEAD
  booksOnShelves: z.lazy(() => BookOnShelfCreateNestedManyWithoutBookInputSchema).optional(),
=======
  shelves: z.lazy(() => ShelfCreateNestedManyWithoutBooksInputSchema).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const BookUncheckedCreateWithoutRelatedBooksInputSchema: z.ZodType<PrismaClient.Prisma.BookUncheckedCreateWithoutRelatedBooksInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  isbn_13: z.string(),
  isbn_10: z.string().optional().nullable(),
  publisher: z.string(),
  publicationYear: z.number(),
  pageCount: z.number(),
  width: z.number(),
  height: z.number(),
  thickness: z.number(),
  retailPrice: z.number(),
  genreId: z.string(),
  inventoryCount: z.number(),
  display: z.boolean().optional(),
  imgUrl: z.string().optional().nullable(),
  authors: z.lazy(() => AuthorUncheckedCreateNestedManyWithoutBooksInputSchema).optional(),
  purchaseLines: z.lazy(() => PurchaseLineUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  salesLines: z.lazy(() => SalesLineUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  buybackLines: z.lazy(() => BuybackLineUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  correction: z.lazy(() => CorrectionUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  symmetricRelatedBooks: z.lazy(() => BookUncheckedCreateNestedManyWithoutRelatedBooksInputSchema).optional(),
<<<<<<< HEAD
  booksOnShelves: z.lazy(() => BookOnShelfUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
=======
  shelves: z.lazy(() => ShelfUncheckedCreateNestedManyWithoutBooksInputSchema).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const BookCreateOrConnectWithoutRelatedBooksInputSchema: z.ZodType<PrismaClient.Prisma.BookCreateOrConnectWithoutRelatedBooksInput> = z.object({
  where: z.lazy(() => BookWhereUniqueInputSchema),
  create: z.union([z.lazy(() => BookCreateWithoutRelatedBooksInputSchema), z.lazy(() => BookUncheckedCreateWithoutRelatedBooksInputSchema)]),
}).strict();

export const BookOnShelfCreateWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfCreateWithoutBookInput> = z.object({
  id: z.string().optional(),
  orientation: z.string(),
  shelf: z.lazy(() => ShelfCreateNestedOneWithoutBooksOnShelfInputSchema),
}).strict();

export const BookOnShelfUncheckedCreateWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfUncheckedCreateWithoutBookInput> = z.object({
  id: z.string().optional(),
  shelfId: z.string(),
  orientation: z.string(),
}).strict();

export const BookOnShelfCreateOrConnectWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfCreateOrConnectWithoutBookInput> = z.object({
  where: z.lazy(() => BookOnShelfWhereUniqueInputSchema),
  create: z.union([z.lazy(() => BookOnShelfCreateWithoutBookInputSchema), z.lazy(() => BookOnShelfUncheckedCreateWithoutBookInputSchema)]),
}).strict();

export const BookOnShelfCreateManyBookInputEnvelopeSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfCreateManyBookInputEnvelope> = z.object({
  data: z.union([z.lazy(() => BookOnShelfCreateManyBookInputSchema), z.lazy(() => BookOnShelfCreateManyBookInputSchema).array()]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const AuthorUpsertWithWhereUniqueWithoutBooksInputSchema: z.ZodType<PrismaClient.Prisma.AuthorUpsertWithWhereUniqueWithoutBooksInput> = z.object({
  where: z.lazy(() => AuthorWhereUniqueInputSchema),
  update: z.union([z.lazy(() => AuthorUpdateWithoutBooksInputSchema), z.lazy(() => AuthorUncheckedUpdateWithoutBooksInputSchema)]),
  create: z.union([z.lazy(() => AuthorCreateWithoutBooksInputSchema), z.lazy(() => AuthorUncheckedCreateWithoutBooksInputSchema)]),
}).strict();

export const AuthorUpdateWithWhereUniqueWithoutBooksInputSchema: z.ZodType<PrismaClient.Prisma.AuthorUpdateWithWhereUniqueWithoutBooksInput> = z.object({
  where: z.lazy(() => AuthorWhereUniqueInputSchema),
  data: z.union([z.lazy(() => AuthorUpdateWithoutBooksInputSchema), z.lazy(() => AuthorUncheckedUpdateWithoutBooksInputSchema)]),
}).strict();

export const AuthorUpdateManyWithWhereWithoutBooksInputSchema: z.ZodType<PrismaClient.Prisma.AuthorUpdateManyWithWhereWithoutBooksInput> = z.object({
  where: z.lazy(() => AuthorScalarWhereInputSchema),
  data: z.union([z.lazy(() => AuthorUpdateManyMutationInputSchema), z.lazy(() => AuthorUncheckedUpdateManyWithoutAuthorsInputSchema)]),
}).strict();

export const AuthorScalarWhereInputSchema: z.ZodType<PrismaClient.Prisma.AuthorScalarWhereInput> = z.object({
  AND: z.union([z.lazy(() => AuthorScalarWhereInputSchema), z.lazy(() => AuthorScalarWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => AuthorScalarWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => AuthorScalarWhereInputSchema), z.lazy(() => AuthorScalarWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  display: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
}).strict();

export const GenreUpsertWithoutBooksInputSchema: z.ZodType<PrismaClient.Prisma.GenreUpsertWithoutBooksInput> = z.object({
  update: z.union([z.lazy(() => GenreUpdateWithoutBooksInputSchema), z.lazy(() => GenreUncheckedUpdateWithoutBooksInputSchema)]),
  create: z.union([z.lazy(() => GenreCreateWithoutBooksInputSchema), z.lazy(() => GenreUncheckedCreateWithoutBooksInputSchema)]),
}).strict();

export const GenreUpdateWithoutBooksInputSchema: z.ZodType<PrismaClient.Prisma.GenreUpdateWithoutBooksInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const GenreUncheckedUpdateWithoutBooksInputSchema: z.ZodType<PrismaClient.Prisma.GenreUncheckedUpdateWithoutBooksInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const PurchaseLineUpsertWithWhereUniqueWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineUpsertWithWhereUniqueWithoutBookInput> = z.object({
  where: z.lazy(() => PurchaseLineWhereUniqueInputSchema),
  update: z.union([z.lazy(() => PurchaseLineUpdateWithoutBookInputSchema), z.lazy(() => PurchaseLineUncheckedUpdateWithoutBookInputSchema)]),
  create: z.union([z.lazy(() => PurchaseLineCreateWithoutBookInputSchema), z.lazy(() => PurchaseLineUncheckedCreateWithoutBookInputSchema)]),
}).strict();

export const PurchaseLineUpdateWithWhereUniqueWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineUpdateWithWhereUniqueWithoutBookInput> = z.object({
  where: z.lazy(() => PurchaseLineWhereUniqueInputSchema),
  data: z.union([z.lazy(() => PurchaseLineUpdateWithoutBookInputSchema), z.lazy(() => PurchaseLineUncheckedUpdateWithoutBookInputSchema)]),
}).strict();

export const PurchaseLineUpdateManyWithWhereWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineUpdateManyWithWhereWithoutBookInput> = z.object({
  where: z.lazy(() => PurchaseLineScalarWhereInputSchema),
  data: z.union([z.lazy(() => PurchaseLineUpdateManyMutationInputSchema), z.lazy(() => PurchaseLineUncheckedUpdateManyWithoutPurchaseLinesInputSchema)]),
}).strict();

export const PurchaseLineScalarWhereInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineScalarWhereInput> = z.object({
  AND: z.union([z.lazy(() => PurchaseLineScalarWhereInputSchema), z.lazy(() => PurchaseLineScalarWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => PurchaseLineScalarWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => PurchaseLineScalarWhereInputSchema), z.lazy(() => PurchaseLineScalarWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  bookId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  quantity: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
  unitWholesalePrice: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
  purchaseOrderId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  display: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
}).strict();

export const SalesLineUpsertWithWhereUniqueWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineUpsertWithWhereUniqueWithoutBookInput> = z.object({
  where: z.lazy(() => SalesLineWhereUniqueInputSchema),
  update: z.union([z.lazy(() => SalesLineUpdateWithoutBookInputSchema), z.lazy(() => SalesLineUncheckedUpdateWithoutBookInputSchema)]),
  create: z.union([z.lazy(() => SalesLineCreateWithoutBookInputSchema), z.lazy(() => SalesLineUncheckedCreateWithoutBookInputSchema)]),
}).strict();

export const SalesLineUpdateWithWhereUniqueWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineUpdateWithWhereUniqueWithoutBookInput> = z.object({
  where: z.lazy(() => SalesLineWhereUniqueInputSchema),
  data: z.union([z.lazy(() => SalesLineUpdateWithoutBookInputSchema), z.lazy(() => SalesLineUncheckedUpdateWithoutBookInputSchema)]),
}).strict();

export const SalesLineUpdateManyWithWhereWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineUpdateManyWithWhereWithoutBookInput> = z.object({
  where: z.lazy(() => SalesLineScalarWhereInputSchema),
  data: z.union([z.lazy(() => SalesLineUpdateManyMutationInputSchema), z.lazy(() => SalesLineUncheckedUpdateManyWithoutSalesLinesInputSchema)]),
}).strict();

export const SalesLineScalarWhereInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineScalarWhereInput> = z.object({
  AND: z.union([z.lazy(() => SalesLineScalarWhereInputSchema), z.lazy(() => SalesLineScalarWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => SalesLineScalarWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => SalesLineScalarWhereInputSchema), z.lazy(() => SalesLineScalarWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  bookId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  quantity: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
  unitWholesalePrice: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
  salesReconciliationId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  display: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
}).strict();

export const BuybackLineUpsertWithWhereUniqueWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.BuybackLineUpsertWithWhereUniqueWithoutBookInput> = z.object({
  where: z.lazy(() => BuybackLineWhereUniqueInputSchema),
  update: z.union([z.lazy(() => BuybackLineUpdateWithoutBookInputSchema), z.lazy(() => BuybackLineUncheckedUpdateWithoutBookInputSchema)]),
  create: z.union([z.lazy(() => BuybackLineCreateWithoutBookInputSchema), z.lazy(() => BuybackLineUncheckedCreateWithoutBookInputSchema)]),
}).strict();

export const BuybackLineUpdateWithWhereUniqueWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.BuybackLineUpdateWithWhereUniqueWithoutBookInput> = z.object({
  where: z.lazy(() => BuybackLineWhereUniqueInputSchema),
  data: z.union([z.lazy(() => BuybackLineUpdateWithoutBookInputSchema), z.lazy(() => BuybackLineUncheckedUpdateWithoutBookInputSchema)]),
}).strict();

export const BuybackLineUpdateManyWithWhereWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.BuybackLineUpdateManyWithWhereWithoutBookInput> = z.object({
  where: z.lazy(() => BuybackLineScalarWhereInputSchema),
  data: z.union([z.lazy(() => BuybackLineUpdateManyMutationInputSchema), z.lazy(() => BuybackLineUncheckedUpdateManyWithoutBuybackLinesInputSchema)]),
}).strict();

export const BuybackLineScalarWhereInputSchema: z.ZodType<PrismaClient.Prisma.BuybackLineScalarWhereInput> = z.object({
  AND: z.union([z.lazy(() => BuybackLineScalarWhereInputSchema), z.lazy(() => BuybackLineScalarWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => BuybackLineScalarWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => BuybackLineScalarWhereInputSchema), z.lazy(() => BuybackLineScalarWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  bookId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  quantity: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
  unitBuybackPrice: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
  buybackOrderId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  display: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
}).strict();

export const CostMostRecentVendorUpsertWithWhereUniqueWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorUpsertWithWhereUniqueWithoutBookInput> = z.object({
  where: z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema),
  update: z.union([z.lazy(() => CostMostRecentVendorUpdateWithoutBookInputSchema), z.lazy(() => CostMostRecentVendorUncheckedUpdateWithoutBookInputSchema)]),
  create: z.union([z.lazy(() => CostMostRecentVendorCreateWithoutBookInputSchema), z.lazy(() => CostMostRecentVendorUncheckedCreateWithoutBookInputSchema)]),
}).strict();

export const CostMostRecentVendorUpdateWithWhereUniqueWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorUpdateWithWhereUniqueWithoutBookInput> = z.object({
  where: z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema),
  data: z.union([z.lazy(() => CostMostRecentVendorUpdateWithoutBookInputSchema), z.lazy(() => CostMostRecentVendorUncheckedUpdateWithoutBookInputSchema)]),
}).strict();

export const CostMostRecentVendorUpdateManyWithWhereWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorUpdateManyWithWhereWithoutBookInput> = z.object({
  where: z.lazy(() => CostMostRecentVendorScalarWhereInputSchema),
  data: z.union([z.lazy(() => CostMostRecentVendorUpdateManyMutationInputSchema), z.lazy(() => CostMostRecentVendorUncheckedUpdateManyWithoutCostMostRecentVendorInputSchema)]),
}).strict();

export const CostMostRecentVendorScalarWhereInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorScalarWhereInput> = z.object({
  AND: z.union([z.lazy(() => CostMostRecentVendorScalarWhereInputSchema), z.lazy(() => CostMostRecentVendorScalarWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => CostMostRecentVendorScalarWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => CostMostRecentVendorScalarWhereInputSchema), z.lazy(() => CostMostRecentVendorScalarWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  bookId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  vendorId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  purchaseLineId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  purchaseOrderId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
}).strict();

export const CorrectionUpsertWithWhereUniqueWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.CorrectionUpsertWithWhereUniqueWithoutBookInput> = z.object({
  where: z.lazy(() => CorrectionWhereUniqueInputSchema),
  update: z.union([z.lazy(() => CorrectionUpdateWithoutBookInputSchema), z.lazy(() => CorrectionUncheckedUpdateWithoutBookInputSchema)]),
  create: z.union([z.lazy(() => CorrectionCreateWithoutBookInputSchema), z.lazy(() => CorrectionUncheckedCreateWithoutBookInputSchema)]),
}).strict();

export const CorrectionUpdateWithWhereUniqueWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.CorrectionUpdateWithWhereUniqueWithoutBookInput> = z.object({
  where: z.lazy(() => CorrectionWhereUniqueInputSchema),
  data: z.union([z.lazy(() => CorrectionUpdateWithoutBookInputSchema), z.lazy(() => CorrectionUncheckedUpdateWithoutBookInputSchema)]),
}).strict();

export const CorrectionUpdateManyWithWhereWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.CorrectionUpdateManyWithWhereWithoutBookInput> = z.object({
  where: z.lazy(() => CorrectionScalarWhereInputSchema),
  data: z.union([z.lazy(() => CorrectionUpdateManyMutationInputSchema), z.lazy(() => CorrectionUncheckedUpdateManyWithoutCorrectionInputSchema)]),
}).strict();

export const CorrectionScalarWhereInputSchema: z.ZodType<PrismaClient.Prisma.CorrectionScalarWhereInput> = z.object({
  AND: z.union([z.lazy(() => CorrectionScalarWhereInputSchema), z.lazy(() => CorrectionScalarWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => CorrectionScalarWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => CorrectionScalarWhereInputSchema), z.lazy(() => CorrectionScalarWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  date: z.union([z.lazy(() => DateTimeFilterSchema), z.date()]).optional(),
  bookId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  quantity: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
}).strict();

export const BookUpsertWithWhereUniqueWithoutSymmetricRelatedBooksInputSchema: z.ZodType<PrismaClient.Prisma.BookUpsertWithWhereUniqueWithoutSymmetricRelatedBooksInput> = z.object({
  where: z.lazy(() => BookWhereUniqueInputSchema),
  update: z.union([z.lazy(() => BookUpdateWithoutSymmetricRelatedBooksInputSchema), z.lazy(() => BookUncheckedUpdateWithoutSymmetricRelatedBooksInputSchema)]),
  create: z.union([z.lazy(() => BookCreateWithoutSymmetricRelatedBooksInputSchema), z.lazy(() => BookUncheckedCreateWithoutSymmetricRelatedBooksInputSchema)]),
}).strict();

export const BookUpdateWithWhereUniqueWithoutSymmetricRelatedBooksInputSchema: z.ZodType<PrismaClient.Prisma.BookUpdateWithWhereUniqueWithoutSymmetricRelatedBooksInput> = z.object({
  where: z.lazy(() => BookWhereUniqueInputSchema),
  data: z.union([z.lazy(() => BookUpdateWithoutSymmetricRelatedBooksInputSchema), z.lazy(() => BookUncheckedUpdateWithoutSymmetricRelatedBooksInputSchema)]),
}).strict();

export const BookUpdateManyWithWhereWithoutSymmetricRelatedBooksInputSchema: z.ZodType<PrismaClient.Prisma.BookUpdateManyWithWhereWithoutSymmetricRelatedBooksInput> = z.object({
  where: z.lazy(() => BookScalarWhereInputSchema),
  data: z.union([z.lazy(() => BookUpdateManyMutationInputSchema), z.lazy(() => BookUncheckedUpdateManyWithoutRelatedBooksInputSchema)]),
}).strict();

export const BookScalarWhereInputSchema: z.ZodType<PrismaClient.Prisma.BookScalarWhereInput> = z.object({
  AND: z.union([z.lazy(() => BookScalarWhereInputSchema), z.lazy(() => BookScalarWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => BookScalarWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => BookScalarWhereInputSchema), z.lazy(() => BookScalarWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  title: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  isbn_13: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  isbn_10: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  publisher: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  publicationYear: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
  pageCount: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
  width: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
  height: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
  thickness: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
  retailPrice: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
  genreId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  inventoryCount: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
  display: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
  imgUrl: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
}).strict();

export const BookUpsertWithWhereUniqueWithoutRelatedBooksInputSchema: z.ZodType<PrismaClient.Prisma.BookUpsertWithWhereUniqueWithoutRelatedBooksInput> = z.object({
  where: z.lazy(() => BookWhereUniqueInputSchema),
  update: z.union([z.lazy(() => BookUpdateWithoutRelatedBooksInputSchema), z.lazy(() => BookUncheckedUpdateWithoutRelatedBooksInputSchema)]),
  create: z.union([z.lazy(() => BookCreateWithoutRelatedBooksInputSchema), z.lazy(() => BookUncheckedCreateWithoutRelatedBooksInputSchema)]),
}).strict();

export const BookUpdateWithWhereUniqueWithoutRelatedBooksInputSchema: z.ZodType<PrismaClient.Prisma.BookUpdateWithWhereUniqueWithoutRelatedBooksInput> = z.object({
  where: z.lazy(() => BookWhereUniqueInputSchema),
  data: z.union([z.lazy(() => BookUpdateWithoutRelatedBooksInputSchema), z.lazy(() => BookUncheckedUpdateWithoutRelatedBooksInputSchema)]),
}).strict();

export const BookUpdateManyWithWhereWithoutRelatedBooksInputSchema: z.ZodType<PrismaClient.Prisma.BookUpdateManyWithWhereWithoutRelatedBooksInput> = z.object({
  where: z.lazy(() => BookScalarWhereInputSchema),
  data: z.union([z.lazy(() => BookUpdateManyMutationInputSchema), z.lazy(() => BookUncheckedUpdateManyWithoutSymmetricRelatedBooksInputSchema)]),
}).strict();

<<<<<<< HEAD
export const BookOnShelfUpsertWithWhereUniqueWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfUpsertWithWhereUniqueWithoutBookInput> = z.object({
  where: z.lazy(() => BookOnShelfWhereUniqueInputSchema),
  update: z.union([z.lazy(() => BookOnShelfUpdateWithoutBookInputSchema), z.lazy(() => BookOnShelfUncheckedUpdateWithoutBookInputSchema)]),
  create: z.union([z.lazy(() => BookOnShelfCreateWithoutBookInputSchema), z.lazy(() => BookOnShelfUncheckedCreateWithoutBookInputSchema)]),
}).strict();

export const BookOnShelfUpdateWithWhereUniqueWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfUpdateWithWhereUniqueWithoutBookInput> = z.object({
  where: z.lazy(() => BookOnShelfWhereUniqueInputSchema),
  data: z.union([z.lazy(() => BookOnShelfUpdateWithoutBookInputSchema), z.lazy(() => BookOnShelfUncheckedUpdateWithoutBookInputSchema)]),
}).strict();

export const BookOnShelfUpdateManyWithWhereWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfUpdateManyWithWhereWithoutBookInput> = z.object({
  where: z.lazy(() => BookOnShelfScalarWhereInputSchema),
  data: z.union([z.lazy(() => BookOnShelfUpdateManyMutationInputSchema), z.lazy(() => BookOnShelfUncheckedUpdateManyWithoutBooksOnShelvesInputSchema)]),
}).strict();

export const BookOnShelfScalarWhereInputSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfScalarWhereInput> = z.object({
  AND: z.union([z.lazy(() => BookOnShelfScalarWhereInputSchema), z.lazy(() => BookOnShelfScalarWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => BookOnShelfScalarWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => BookOnShelfScalarWhereInputSchema), z.lazy(() => BookOnShelfScalarWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  bookId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  shelfId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  orientation: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
=======
export const ShelfUpsertWithWhereUniqueWithoutBooksInputSchema: z.ZodType<PrismaClient.Prisma.ShelfUpsertWithWhereUniqueWithoutBooksInput> = z.object({
  where: z.lazy(() => ShelfWhereUniqueInputSchema),
  update: z.union([z.lazy(() => ShelfUpdateWithoutBooksInputSchema), z.lazy(() => ShelfUncheckedUpdateWithoutBooksInputSchema)]),
  create: z.union([z.lazy(() => ShelfCreateWithoutBooksInputSchema), z.lazy(() => ShelfUncheckedCreateWithoutBooksInputSchema)]),
}).strict();

export const ShelfUpdateWithWhereUniqueWithoutBooksInputSchema: z.ZodType<PrismaClient.Prisma.ShelfUpdateWithWhereUniqueWithoutBooksInput> = z.object({
  where: z.lazy(() => ShelfWhereUniqueInputSchema),
  data: z.union([z.lazy(() => ShelfUpdateWithoutBooksInputSchema), z.lazy(() => ShelfUncheckedUpdateWithoutBooksInputSchema)]),
}).strict();

export const ShelfUpdateManyWithWhereWithoutBooksInputSchema: z.ZodType<PrismaClient.Prisma.ShelfUpdateManyWithWhereWithoutBooksInput> = z.object({
  where: z.lazy(() => ShelfScalarWhereInputSchema),
  data: z.union([z.lazy(() => ShelfUpdateManyMutationInputSchema), z.lazy(() => ShelfUncheckedUpdateManyWithoutShelvesInputSchema)]),
}).strict();

export const ShelfScalarWhereInputSchema: z.ZodType<PrismaClient.Prisma.ShelfScalarWhereInput> = z.object({
  AND: z.union([z.lazy(() => ShelfScalarWhereInputSchema), z.lazy(() => ShelfScalarWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => ShelfScalarWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => ShelfScalarWhereInputSchema), z.lazy(() => ShelfScalarWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  caseId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  spaceUsed: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const BookCreateWithoutGenreInputSchema: z.ZodType<PrismaClient.Prisma.BookCreateWithoutGenreInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  isbn_13: z.string(),
  isbn_10: z.string().optional().nullable(),
  publisher: z.string(),
  publicationYear: z.number(),
  pageCount: z.number(),
  width: z.number(),
  height: z.number(),
  thickness: z.number(),
  retailPrice: z.number(),
  inventoryCount: z.number(),
  display: z.boolean().optional(),
  imgUrl: z.string().optional().nullable(),
  authors: z.lazy(() => AuthorCreateNestedManyWithoutBooksInputSchema).optional(),
  purchaseLines: z.lazy(() => PurchaseLineCreateNestedManyWithoutBookInputSchema).optional(),
  salesLines: z.lazy(() => SalesLineCreateNestedManyWithoutBookInputSchema).optional(),
  buybackLines: z.lazy(() => BuybackLineCreateNestedManyWithoutBookInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorCreateNestedManyWithoutBookInputSchema).optional(),
  correction: z.lazy(() => CorrectionCreateNestedManyWithoutBookInputSchema).optional(),
  relatedBooks: z.lazy(() => BookCreateNestedManyWithoutSymmetricRelatedBooksInputSchema).optional(),
  symmetricRelatedBooks: z.lazy(() => BookCreateNestedManyWithoutRelatedBooksInputSchema).optional(),
<<<<<<< HEAD
  booksOnShelves: z.lazy(() => BookOnShelfCreateNestedManyWithoutBookInputSchema).optional(),
=======
  shelves: z.lazy(() => ShelfCreateNestedManyWithoutBooksInputSchema).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const BookUncheckedCreateWithoutGenreInputSchema: z.ZodType<PrismaClient.Prisma.BookUncheckedCreateWithoutGenreInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  isbn_13: z.string(),
  isbn_10: z.string().optional().nullable(),
  publisher: z.string(),
  publicationYear: z.number(),
  pageCount: z.number(),
  width: z.number(),
  height: z.number(),
  thickness: z.number(),
  retailPrice: z.number(),
  inventoryCount: z.number(),
  display: z.boolean().optional(),
  imgUrl: z.string().optional().nullable(),
  authors: z.lazy(() => AuthorUncheckedCreateNestedManyWithoutBooksInputSchema).optional(),
  purchaseLines: z.lazy(() => PurchaseLineUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  salesLines: z.lazy(() => SalesLineUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  buybackLines: z.lazy(() => BuybackLineUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  correction: z.lazy(() => CorrectionUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  relatedBooks: z.lazy(() => BookUncheckedCreateNestedManyWithoutSymmetricRelatedBooksInputSchema).optional(),
  symmetricRelatedBooks: z.lazy(() => BookUncheckedCreateNestedManyWithoutRelatedBooksInputSchema).optional(),
<<<<<<< HEAD
  booksOnShelves: z.lazy(() => BookOnShelfUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
=======
  shelves: z.lazy(() => ShelfUncheckedCreateNestedManyWithoutBooksInputSchema).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const BookCreateOrConnectWithoutGenreInputSchema: z.ZodType<PrismaClient.Prisma.BookCreateOrConnectWithoutGenreInput> = z.object({
  where: z.lazy(() => BookWhereUniqueInputSchema),
  create: z.union([z.lazy(() => BookCreateWithoutGenreInputSchema), z.lazy(() => BookUncheckedCreateWithoutGenreInputSchema)]),
}).strict();

export const BookCreateManyGenreInputEnvelopeSchema: z.ZodType<PrismaClient.Prisma.BookCreateManyGenreInputEnvelope> = z.object({
  data: z.union([z.lazy(() => BookCreateManyGenreInputSchema), z.lazy(() => BookCreateManyGenreInputSchema).array()]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const BookUpsertWithWhereUniqueWithoutGenreInputSchema: z.ZodType<PrismaClient.Prisma.BookUpsertWithWhereUniqueWithoutGenreInput> = z.object({
  where: z.lazy(() => BookWhereUniqueInputSchema),
  update: z.union([z.lazy(() => BookUpdateWithoutGenreInputSchema), z.lazy(() => BookUncheckedUpdateWithoutGenreInputSchema)]),
  create: z.union([z.lazy(() => BookCreateWithoutGenreInputSchema), z.lazy(() => BookUncheckedCreateWithoutGenreInputSchema)]),
}).strict();

export const BookUpdateWithWhereUniqueWithoutGenreInputSchema: z.ZodType<PrismaClient.Prisma.BookUpdateWithWhereUniqueWithoutGenreInput> = z.object({
  where: z.lazy(() => BookWhereUniqueInputSchema),
  data: z.union([z.lazy(() => BookUpdateWithoutGenreInputSchema), z.lazy(() => BookUncheckedUpdateWithoutGenreInputSchema)]),
}).strict();

export const BookUpdateManyWithWhereWithoutGenreInputSchema: z.ZodType<PrismaClient.Prisma.BookUpdateManyWithWhereWithoutGenreInput> = z.object({
  where: z.lazy(() => BookScalarWhereInputSchema),
  data: z.union([z.lazy(() => BookUpdateManyMutationInputSchema), z.lazy(() => BookUncheckedUpdateManyWithoutBooksInputSchema)]),
}).strict();

export const BookCreateWithoutAuthorsInputSchema: z.ZodType<PrismaClient.Prisma.BookCreateWithoutAuthorsInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  isbn_13: z.string(),
  isbn_10: z.string().optional().nullable(),
  publisher: z.string(),
  publicationYear: z.number(),
  pageCount: z.number(),
  width: z.number(),
  height: z.number(),
  thickness: z.number(),
  retailPrice: z.number(),
  inventoryCount: z.number(),
  display: z.boolean().optional(),
  imgUrl: z.string().optional().nullable(),
  genre: z.lazy(() => GenreCreateNestedOneWithoutBooksInputSchema),
  purchaseLines: z.lazy(() => PurchaseLineCreateNestedManyWithoutBookInputSchema).optional(),
  salesLines: z.lazy(() => SalesLineCreateNestedManyWithoutBookInputSchema).optional(),
  buybackLines: z.lazy(() => BuybackLineCreateNestedManyWithoutBookInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorCreateNestedManyWithoutBookInputSchema).optional(),
  correction: z.lazy(() => CorrectionCreateNestedManyWithoutBookInputSchema).optional(),
  relatedBooks: z.lazy(() => BookCreateNestedManyWithoutSymmetricRelatedBooksInputSchema).optional(),
  symmetricRelatedBooks: z.lazy(() => BookCreateNestedManyWithoutRelatedBooksInputSchema).optional(),
<<<<<<< HEAD
  booksOnShelves: z.lazy(() => BookOnShelfCreateNestedManyWithoutBookInputSchema).optional(),
=======
  shelves: z.lazy(() => ShelfCreateNestedManyWithoutBooksInputSchema).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const BookUncheckedCreateWithoutAuthorsInputSchema: z.ZodType<PrismaClient.Prisma.BookUncheckedCreateWithoutAuthorsInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  isbn_13: z.string(),
  isbn_10: z.string().optional().nullable(),
  publisher: z.string(),
  publicationYear: z.number(),
  pageCount: z.number(),
  width: z.number(),
  height: z.number(),
  thickness: z.number(),
  retailPrice: z.number(),
  genreId: z.string(),
  inventoryCount: z.number(),
  display: z.boolean().optional(),
  imgUrl: z.string().optional().nullable(),
  purchaseLines: z.lazy(() => PurchaseLineUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  salesLines: z.lazy(() => SalesLineUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  buybackLines: z.lazy(() => BuybackLineUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  correction: z.lazy(() => CorrectionUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  relatedBooks: z.lazy(() => BookUncheckedCreateNestedManyWithoutSymmetricRelatedBooksInputSchema).optional(),
  symmetricRelatedBooks: z.lazy(() => BookUncheckedCreateNestedManyWithoutRelatedBooksInputSchema).optional(),
<<<<<<< HEAD
  booksOnShelves: z.lazy(() => BookOnShelfUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
=======
  shelves: z.lazy(() => ShelfUncheckedCreateNestedManyWithoutBooksInputSchema).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const BookCreateOrConnectWithoutAuthorsInputSchema: z.ZodType<PrismaClient.Prisma.BookCreateOrConnectWithoutAuthorsInput> = z.object({
  where: z.lazy(() => BookWhereUniqueInputSchema),
  create: z.union([z.lazy(() => BookCreateWithoutAuthorsInputSchema), z.lazy(() => BookUncheckedCreateWithoutAuthorsInputSchema)]),
}).strict();

export const BookUpsertWithWhereUniqueWithoutAuthorsInputSchema: z.ZodType<PrismaClient.Prisma.BookUpsertWithWhereUniqueWithoutAuthorsInput> = z.object({
  where: z.lazy(() => BookWhereUniqueInputSchema),
  update: z.union([z.lazy(() => BookUpdateWithoutAuthorsInputSchema), z.lazy(() => BookUncheckedUpdateWithoutAuthorsInputSchema)]),
  create: z.union([z.lazy(() => BookCreateWithoutAuthorsInputSchema), z.lazy(() => BookUncheckedCreateWithoutAuthorsInputSchema)]),
}).strict();

export const BookUpdateWithWhereUniqueWithoutAuthorsInputSchema: z.ZodType<PrismaClient.Prisma.BookUpdateWithWhereUniqueWithoutAuthorsInput> = z.object({
  where: z.lazy(() => BookWhereUniqueInputSchema),
  data: z.union([z.lazy(() => BookUpdateWithoutAuthorsInputSchema), z.lazy(() => BookUncheckedUpdateWithoutAuthorsInputSchema)]),
}).strict();

export const BookUpdateManyWithWhereWithoutAuthorsInputSchema: z.ZodType<PrismaClient.Prisma.BookUpdateManyWithWhereWithoutAuthorsInput> = z.object({
  where: z.lazy(() => BookScalarWhereInputSchema),
  data: z.union([z.lazy(() => BookUpdateManyMutationInputSchema), z.lazy(() => BookUncheckedUpdateManyWithoutBooksInputSchema)]),
}).strict();

export const PurchaseOrderCreateWithoutVendorInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderCreateWithoutVendorInput> = z.object({
  id: z.string().optional(),
  date: z.date(),
  display: z.boolean().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutPurchaseOrderInputSchema).optional(),
  purchaseLines: z.lazy(() => PurchaseLineCreateNestedManyWithoutPurchaseOrderInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorCreateNestedManyWithoutPurchaseOrderInputSchema).optional(),
}).strict();

export const PurchaseOrderUncheckedCreateWithoutVendorInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderUncheckedCreateWithoutVendorInput> = z.object({
  id: z.string().optional(),
  date: z.date(),
  userId: z.string().optional().nullable(),
  display: z.boolean().optional(),
  purchaseLines: z.lazy(() => PurchaseLineUncheckedCreateNestedManyWithoutPurchaseOrderInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUncheckedCreateNestedManyWithoutPurchaseOrderInputSchema).optional(),
}).strict();

export const PurchaseOrderCreateOrConnectWithoutVendorInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderCreateOrConnectWithoutVendorInput> = z.object({
  where: z.lazy(() => PurchaseOrderWhereUniqueInputSchema),
  create: z.union([z.lazy(() => PurchaseOrderCreateWithoutVendorInputSchema), z.lazy(() => PurchaseOrderUncheckedCreateWithoutVendorInputSchema)]),
}).strict();

export const PurchaseOrderCreateManyVendorInputEnvelopeSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderCreateManyVendorInputEnvelope> = z.object({
  data: z.union([z.lazy(() => PurchaseOrderCreateManyVendorInputSchema), z.lazy(() => PurchaseOrderCreateManyVendorInputSchema).array()]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const BuybackOrderCreateWithoutVendorInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderCreateWithoutVendorInput> = z.object({
  id: z.string().optional(),
  date: z.date(),
  display: z.boolean().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutBuybackOrderInputSchema).optional(),
  buybackLines: z.lazy(() => BuybackLineCreateNestedManyWithoutBuybackOrderInputSchema).optional(),
}).strict();

export const BuybackOrderUncheckedCreateWithoutVendorInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderUncheckedCreateWithoutVendorInput> = z.object({
  id: z.string().optional(),
  date: z.date(),
  userId: z.string().optional().nullable(),
  display: z.boolean().optional(),
  buybackLines: z.lazy(() => BuybackLineUncheckedCreateNestedManyWithoutBuybackOrderInputSchema).optional(),
}).strict();

export const BuybackOrderCreateOrConnectWithoutVendorInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderCreateOrConnectWithoutVendorInput> = z.object({
  where: z.lazy(() => BuybackOrderWhereUniqueInputSchema),
  create: z.union([z.lazy(() => BuybackOrderCreateWithoutVendorInputSchema), z.lazy(() => BuybackOrderUncheckedCreateWithoutVendorInputSchema)]),
}).strict();

export const BuybackOrderCreateManyVendorInputEnvelopeSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderCreateManyVendorInputEnvelope> = z.object({
  data: z.union([z.lazy(() => BuybackOrderCreateManyVendorInputSchema), z.lazy(() => BuybackOrderCreateManyVendorInputSchema).array()]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const CostMostRecentVendorCreateWithoutVendorInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorCreateWithoutVendorInput> = z.object({
  id: z.string().optional(),
  book: z.lazy(() => BookCreateNestedOneWithoutCostMostRecentVendorInputSchema),
  purchaseLine: z.lazy(() => PurchaseLineCreateNestedOneWithoutCostMostRecentVendorInputSchema),
  purchaseOrder: z.lazy(() => PurchaseOrderCreateNestedOneWithoutCostMostRecentVendorInputSchema),
}).strict();

export const CostMostRecentVendorUncheckedCreateWithoutVendorInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorUncheckedCreateWithoutVendorInput> = z.object({
  id: z.string().optional(),
  bookId: z.string(),
  purchaseLineId: z.string(),
  purchaseOrderId: z.string(),
}).strict();

export const CostMostRecentVendorCreateOrConnectWithoutVendorInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorCreateOrConnectWithoutVendorInput> = z.object({
  where: z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema),
  create: z.union([z.lazy(() => CostMostRecentVendorCreateWithoutVendorInputSchema), z.lazy(() => CostMostRecentVendorUncheckedCreateWithoutVendorInputSchema)]),
}).strict();

export const CostMostRecentVendorCreateManyVendorInputEnvelopeSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorCreateManyVendorInputEnvelope> = z.object({
  data: z.union([z.lazy(() => CostMostRecentVendorCreateManyVendorInputSchema), z.lazy(() => CostMostRecentVendorCreateManyVendorInputSchema).array()]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const PurchaseOrderUpsertWithWhereUniqueWithoutVendorInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderUpsertWithWhereUniqueWithoutVendorInput> = z.object({
  where: z.lazy(() => PurchaseOrderWhereUniqueInputSchema),
  update: z.union([z.lazy(() => PurchaseOrderUpdateWithoutVendorInputSchema), z.lazy(() => PurchaseOrderUncheckedUpdateWithoutVendorInputSchema)]),
  create: z.union([z.lazy(() => PurchaseOrderCreateWithoutVendorInputSchema), z.lazy(() => PurchaseOrderUncheckedCreateWithoutVendorInputSchema)]),
}).strict();

export const PurchaseOrderUpdateWithWhereUniqueWithoutVendorInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderUpdateWithWhereUniqueWithoutVendorInput> = z.object({
  where: z.lazy(() => PurchaseOrderWhereUniqueInputSchema),
  data: z.union([z.lazy(() => PurchaseOrderUpdateWithoutVendorInputSchema), z.lazy(() => PurchaseOrderUncheckedUpdateWithoutVendorInputSchema)]),
}).strict();

export const PurchaseOrderUpdateManyWithWhereWithoutVendorInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderUpdateManyWithWhereWithoutVendorInput> = z.object({
  where: z.lazy(() => PurchaseOrderScalarWhereInputSchema),
  data: z.union([z.lazy(() => PurchaseOrderUpdateManyMutationInputSchema), z.lazy(() => PurchaseOrderUncheckedUpdateManyWithoutPurchaseOrderInputSchema)]),
}).strict();

export const PurchaseOrderScalarWhereInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderScalarWhereInput> = z.object({
  AND: z.union([z.lazy(() => PurchaseOrderScalarWhereInputSchema), z.lazy(() => PurchaseOrderScalarWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => PurchaseOrderScalarWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => PurchaseOrderScalarWhereInputSchema), z.lazy(() => PurchaseOrderScalarWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  date: z.union([z.lazy(() => DateTimeFilterSchema), z.date()]).optional(),
  userId: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  vendorId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  display: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
}).strict();

export const BuybackOrderUpsertWithWhereUniqueWithoutVendorInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderUpsertWithWhereUniqueWithoutVendorInput> = z.object({
  where: z.lazy(() => BuybackOrderWhereUniqueInputSchema),
  update: z.union([z.lazy(() => BuybackOrderUpdateWithoutVendorInputSchema), z.lazy(() => BuybackOrderUncheckedUpdateWithoutVendorInputSchema)]),
  create: z.union([z.lazy(() => BuybackOrderCreateWithoutVendorInputSchema), z.lazy(() => BuybackOrderUncheckedCreateWithoutVendorInputSchema)]),
}).strict();

export const BuybackOrderUpdateWithWhereUniqueWithoutVendorInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderUpdateWithWhereUniqueWithoutVendorInput> = z.object({
  where: z.lazy(() => BuybackOrderWhereUniqueInputSchema),
  data: z.union([z.lazy(() => BuybackOrderUpdateWithoutVendorInputSchema), z.lazy(() => BuybackOrderUncheckedUpdateWithoutVendorInputSchema)]),
}).strict();

export const BuybackOrderUpdateManyWithWhereWithoutVendorInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderUpdateManyWithWhereWithoutVendorInput> = z.object({
  where: z.lazy(() => BuybackOrderScalarWhereInputSchema),
  data: z.union([z.lazy(() => BuybackOrderUpdateManyMutationInputSchema), z.lazy(() => BuybackOrderUncheckedUpdateManyWithoutBuybackOrdersInputSchema)]),
}).strict();

export const BuybackOrderScalarWhereInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderScalarWhereInput> = z.object({
  AND: z.union([z.lazy(() => BuybackOrderScalarWhereInputSchema), z.lazy(() => BuybackOrderScalarWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => BuybackOrderScalarWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => BuybackOrderScalarWhereInputSchema), z.lazy(() => BuybackOrderScalarWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  date: z.union([z.lazy(() => DateTimeFilterSchema), z.date()]).optional(),
  userId: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  vendorId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  display: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
}).strict();

export const CostMostRecentVendorUpsertWithWhereUniqueWithoutVendorInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorUpsertWithWhereUniqueWithoutVendorInput> = z.object({
  where: z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema),
  update: z.union([z.lazy(() => CostMostRecentVendorUpdateWithoutVendorInputSchema), z.lazy(() => CostMostRecentVendorUncheckedUpdateWithoutVendorInputSchema)]),
  create: z.union([z.lazy(() => CostMostRecentVendorCreateWithoutVendorInputSchema), z.lazy(() => CostMostRecentVendorUncheckedCreateWithoutVendorInputSchema)]),
}).strict();

export const CostMostRecentVendorUpdateWithWhereUniqueWithoutVendorInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorUpdateWithWhereUniqueWithoutVendorInput> = z.object({
  where: z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema),
  data: z.union([z.lazy(() => CostMostRecentVendorUpdateWithoutVendorInputSchema), z.lazy(() => CostMostRecentVendorUncheckedUpdateWithoutVendorInputSchema)]),
}).strict();

export const CostMostRecentVendorUpdateManyWithWhereWithoutVendorInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorUpdateManyWithWhereWithoutVendorInput> = z.object({
  where: z.lazy(() => CostMostRecentVendorScalarWhereInputSchema),
  data: z.union([z.lazy(() => CostMostRecentVendorUpdateManyMutationInputSchema), z.lazy(() => CostMostRecentVendorUncheckedUpdateManyWithoutCostMostRecentVendorInputSchema)]),
}).strict();

export const UserCreateWithoutPurchaseOrderInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateWithoutPurchaseOrderInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  password: z.string(),
  role: z.string().optional(),
  display: z.boolean().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  Correction: z.lazy(() => CorrectionCreateNestedManyWithoutUserInputSchema).optional(),
  BuybackOrder: z.lazy(() => BuybackOrderCreateNestedManyWithoutUserInputSchema).optional(),
  casesCreated: z.lazy(() => CaseCreateNestedManyWithoutCreatorInputSchema).optional(),
  casesLastEdited: z.lazy(() => CaseCreateNestedManyWithoutEditorInputSchema).optional(),
}).strict();

export const UserUncheckedCreateWithoutPurchaseOrderInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedCreateWithoutPurchaseOrderInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  password: z.string(),
  role: z.string().optional(),
  display: z.boolean().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Correction: z.lazy(() => CorrectionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  BuybackOrder: z.lazy(() => BuybackOrderUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  casesCreated: z.lazy(() => CaseUncheckedCreateNestedManyWithoutCreatorInputSchema).optional(),
  casesLastEdited: z.lazy(() => CaseUncheckedCreateNestedManyWithoutEditorInputSchema).optional(),
}).strict();

export const UserCreateOrConnectWithoutPurchaseOrderInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateOrConnectWithoutPurchaseOrderInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([z.lazy(() => UserCreateWithoutPurchaseOrderInputSchema), z.lazy(() => UserUncheckedCreateWithoutPurchaseOrderInputSchema)]),
}).strict();

export const VendorCreateWithoutPurchaseOrderInputSchema: z.ZodType<PrismaClient.Prisma.VendorCreateWithoutPurchaseOrderInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  buybackRate: z.number().optional(),
  display: z.boolean().optional(),
  buybackOrders: z.lazy(() => BuybackOrderCreateNestedManyWithoutVendorInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorCreateNestedManyWithoutVendorInputSchema).optional(),
}).strict();

export const VendorUncheckedCreateWithoutPurchaseOrderInputSchema: z.ZodType<PrismaClient.Prisma.VendorUncheckedCreateWithoutPurchaseOrderInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  buybackRate: z.number().optional(),
  display: z.boolean().optional(),
  buybackOrders: z.lazy(() => BuybackOrderUncheckedCreateNestedManyWithoutVendorInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUncheckedCreateNestedManyWithoutVendorInputSchema).optional(),
}).strict();

export const VendorCreateOrConnectWithoutPurchaseOrderInputSchema: z.ZodType<PrismaClient.Prisma.VendorCreateOrConnectWithoutPurchaseOrderInput> = z.object({
  where: z.lazy(() => VendorWhereUniqueInputSchema),
  create: z.union([z.lazy(() => VendorCreateWithoutPurchaseOrderInputSchema), z.lazy(() => VendorUncheckedCreateWithoutPurchaseOrderInputSchema)]),
}).strict();

export const PurchaseLineCreateWithoutPurchaseOrderInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineCreateWithoutPurchaseOrderInput> = z.object({
  id: z.string().optional(),
  quantity: z.number(),
  unitWholesalePrice: z.number(),
  display: z.boolean().optional(),
  book: z.lazy(() => BookCreateNestedOneWithoutPurchaseLinesInputSchema),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorCreateNestedOneWithoutPurchaseLineInputSchema).optional(),
}).strict();

export const PurchaseLineUncheckedCreateWithoutPurchaseOrderInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineUncheckedCreateWithoutPurchaseOrderInput> = z.object({
  id: z.string().optional(),
  bookId: z.string(),
  quantity: z.number(),
  unitWholesalePrice: z.number(),
  display: z.boolean().optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUncheckedCreateNestedOneWithoutPurchaseLineInputSchema).optional(),
}).strict();

export const PurchaseLineCreateOrConnectWithoutPurchaseOrderInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineCreateOrConnectWithoutPurchaseOrderInput> = z.object({
  where: z.lazy(() => PurchaseLineWhereUniqueInputSchema),
  create: z.union([z.lazy(() => PurchaseLineCreateWithoutPurchaseOrderInputSchema), z.lazy(() => PurchaseLineUncheckedCreateWithoutPurchaseOrderInputSchema)]),
}).strict();

export const PurchaseLineCreateManyPurchaseOrderInputEnvelopeSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineCreateManyPurchaseOrderInputEnvelope> = z.object({
  data: z.union([z.lazy(() => PurchaseLineCreateManyPurchaseOrderInputSchema), z.lazy(() => PurchaseLineCreateManyPurchaseOrderInputSchema).array()]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const CostMostRecentVendorCreateWithoutPurchaseOrderInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorCreateWithoutPurchaseOrderInput> = z.object({
  id: z.string().optional(),
  book: z.lazy(() => BookCreateNestedOneWithoutCostMostRecentVendorInputSchema),
  vendor: z.lazy(() => VendorCreateNestedOneWithoutCostMostRecentVendorInputSchema),
  purchaseLine: z.lazy(() => PurchaseLineCreateNestedOneWithoutCostMostRecentVendorInputSchema),
}).strict();

export const CostMostRecentVendorUncheckedCreateWithoutPurchaseOrderInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorUncheckedCreateWithoutPurchaseOrderInput> = z.object({
  id: z.string().optional(),
  bookId: z.string(),
  vendorId: z.string(),
  purchaseLineId: z.string(),
}).strict();

export const CostMostRecentVendorCreateOrConnectWithoutPurchaseOrderInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorCreateOrConnectWithoutPurchaseOrderInput> = z.object({
  where: z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema),
  create: z.union([z.lazy(() => CostMostRecentVendorCreateWithoutPurchaseOrderInputSchema), z.lazy(() => CostMostRecentVendorUncheckedCreateWithoutPurchaseOrderInputSchema)]),
}).strict();

export const CostMostRecentVendorCreateManyPurchaseOrderInputEnvelopeSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorCreateManyPurchaseOrderInputEnvelope> = z.object({
  data: z.union([z.lazy(() => CostMostRecentVendorCreateManyPurchaseOrderInputSchema), z.lazy(() => CostMostRecentVendorCreateManyPurchaseOrderInputSchema).array()]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const UserUpsertWithoutPurchaseOrderInputSchema: z.ZodType<PrismaClient.Prisma.UserUpsertWithoutPurchaseOrderInput> = z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutPurchaseOrderInputSchema), z.lazy(() => UserUncheckedUpdateWithoutPurchaseOrderInputSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutPurchaseOrderInputSchema), z.lazy(() => UserUncheckedCreateWithoutPurchaseOrderInputSchema)]),
}).strict();

export const UserUpdateWithoutPurchaseOrderInputSchema: z.ZodType<PrismaClient.Prisma.UserUpdateWithoutPurchaseOrderInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  password: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  role: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  Correction: z.lazy(() => CorrectionUpdateManyWithoutUserNestedInputSchema).optional(),
  BuybackOrder: z.lazy(() => BuybackOrderUpdateManyWithoutUserNestedInputSchema).optional(),
  casesCreated: z.lazy(() => CaseUpdateManyWithoutCreatorNestedInputSchema).optional(),
  casesLastEdited: z.lazy(() => CaseUpdateManyWithoutEditorNestedInputSchema).optional(),
}).strict();

export const UserUncheckedUpdateWithoutPurchaseOrderInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedUpdateWithoutPurchaseOrderInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  password: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  role: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Correction: z.lazy(() => CorrectionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  BuybackOrder: z.lazy(() => BuybackOrderUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  casesCreated: z.lazy(() => CaseUncheckedUpdateManyWithoutCreatorNestedInputSchema).optional(),
  casesLastEdited: z.lazy(() => CaseUncheckedUpdateManyWithoutEditorNestedInputSchema).optional(),
}).strict();

export const VendorUpsertWithoutPurchaseOrderInputSchema: z.ZodType<PrismaClient.Prisma.VendorUpsertWithoutPurchaseOrderInput> = z.object({
  update: z.union([z.lazy(() => VendorUpdateWithoutPurchaseOrderInputSchema), z.lazy(() => VendorUncheckedUpdateWithoutPurchaseOrderInputSchema)]),
  create: z.union([z.lazy(() => VendorCreateWithoutPurchaseOrderInputSchema), z.lazy(() => VendorUncheckedCreateWithoutPurchaseOrderInputSchema)]),
}).strict();

export const VendorUpdateWithoutPurchaseOrderInputSchema: z.ZodType<PrismaClient.Prisma.VendorUpdateWithoutPurchaseOrderInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  buybackRate: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  buybackOrders: z.lazy(() => BuybackOrderUpdateManyWithoutVendorNestedInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUpdateManyWithoutVendorNestedInputSchema).optional(),
}).strict();

export const VendorUncheckedUpdateWithoutPurchaseOrderInputSchema: z.ZodType<PrismaClient.Prisma.VendorUncheckedUpdateWithoutPurchaseOrderInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  buybackRate: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  buybackOrders: z.lazy(() => BuybackOrderUncheckedUpdateManyWithoutVendorNestedInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUncheckedUpdateManyWithoutVendorNestedInputSchema).optional(),
}).strict();

export const PurchaseLineUpsertWithWhereUniqueWithoutPurchaseOrderInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineUpsertWithWhereUniqueWithoutPurchaseOrderInput> = z.object({
  where: z.lazy(() => PurchaseLineWhereUniqueInputSchema),
  update: z.union([z.lazy(() => PurchaseLineUpdateWithoutPurchaseOrderInputSchema), z.lazy(() => PurchaseLineUncheckedUpdateWithoutPurchaseOrderInputSchema)]),
  create: z.union([z.lazy(() => PurchaseLineCreateWithoutPurchaseOrderInputSchema), z.lazy(() => PurchaseLineUncheckedCreateWithoutPurchaseOrderInputSchema)]),
}).strict();

export const PurchaseLineUpdateWithWhereUniqueWithoutPurchaseOrderInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineUpdateWithWhereUniqueWithoutPurchaseOrderInput> = z.object({
  where: z.lazy(() => PurchaseLineWhereUniqueInputSchema),
  data: z.union([z.lazy(() => PurchaseLineUpdateWithoutPurchaseOrderInputSchema), z.lazy(() => PurchaseLineUncheckedUpdateWithoutPurchaseOrderInputSchema)]),
}).strict();

export const PurchaseLineUpdateManyWithWhereWithoutPurchaseOrderInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineUpdateManyWithWhereWithoutPurchaseOrderInput> = z.object({
  where: z.lazy(() => PurchaseLineScalarWhereInputSchema),
  data: z.union([z.lazy(() => PurchaseLineUpdateManyMutationInputSchema), z.lazy(() => PurchaseLineUncheckedUpdateManyWithoutPurchaseLinesInputSchema)]),
}).strict();

export const CostMostRecentVendorUpsertWithWhereUniqueWithoutPurchaseOrderInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorUpsertWithWhereUniqueWithoutPurchaseOrderInput> = z.object({
  where: z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema),
  update: z.union([z.lazy(() => CostMostRecentVendorUpdateWithoutPurchaseOrderInputSchema), z.lazy(() => CostMostRecentVendorUncheckedUpdateWithoutPurchaseOrderInputSchema)]),
  create: z.union([z.lazy(() => CostMostRecentVendorCreateWithoutPurchaseOrderInputSchema), z.lazy(() => CostMostRecentVendorUncheckedCreateWithoutPurchaseOrderInputSchema)]),
}).strict();

export const CostMostRecentVendorUpdateWithWhereUniqueWithoutPurchaseOrderInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorUpdateWithWhereUniqueWithoutPurchaseOrderInput> = z.object({
  where: z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema),
  data: z.union([z.lazy(() => CostMostRecentVendorUpdateWithoutPurchaseOrderInputSchema), z.lazy(() => CostMostRecentVendorUncheckedUpdateWithoutPurchaseOrderInputSchema)]),
}).strict();

export const CostMostRecentVendorUpdateManyWithWhereWithoutPurchaseOrderInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorUpdateManyWithWhereWithoutPurchaseOrderInput> = z.object({
  where: z.lazy(() => CostMostRecentVendorScalarWhereInputSchema),
  data: z.union([z.lazy(() => CostMostRecentVendorUpdateManyMutationInputSchema), z.lazy(() => CostMostRecentVendorUncheckedUpdateManyWithoutCostMostRecentVendorInputSchema)]),
}).strict();

export const BookCreateWithoutPurchaseLinesInputSchema: z.ZodType<PrismaClient.Prisma.BookCreateWithoutPurchaseLinesInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  isbn_13: z.string(),
  isbn_10: z.string().optional().nullable(),
  publisher: z.string(),
  publicationYear: z.number(),
  pageCount: z.number(),
  width: z.number(),
  height: z.number(),
  thickness: z.number(),
  retailPrice: z.number(),
  inventoryCount: z.number(),
  display: z.boolean().optional(),
  imgUrl: z.string().optional().nullable(),
  authors: z.lazy(() => AuthorCreateNestedManyWithoutBooksInputSchema).optional(),
  genre: z.lazy(() => GenreCreateNestedOneWithoutBooksInputSchema),
  salesLines: z.lazy(() => SalesLineCreateNestedManyWithoutBookInputSchema).optional(),
  buybackLines: z.lazy(() => BuybackLineCreateNestedManyWithoutBookInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorCreateNestedManyWithoutBookInputSchema).optional(),
  correction: z.lazy(() => CorrectionCreateNestedManyWithoutBookInputSchema).optional(),
  relatedBooks: z.lazy(() => BookCreateNestedManyWithoutSymmetricRelatedBooksInputSchema).optional(),
  symmetricRelatedBooks: z.lazy(() => BookCreateNestedManyWithoutRelatedBooksInputSchema).optional(),
<<<<<<< HEAD
  booksOnShelves: z.lazy(() => BookOnShelfCreateNestedManyWithoutBookInputSchema).optional(),
=======
  shelves: z.lazy(() => ShelfCreateNestedManyWithoutBooksInputSchema).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const BookUncheckedCreateWithoutPurchaseLinesInputSchema: z.ZodType<PrismaClient.Prisma.BookUncheckedCreateWithoutPurchaseLinesInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  isbn_13: z.string(),
  isbn_10: z.string().optional().nullable(),
  publisher: z.string(),
  publicationYear: z.number(),
  pageCount: z.number(),
  width: z.number(),
  height: z.number(),
  thickness: z.number(),
  retailPrice: z.number(),
  genreId: z.string(),
  inventoryCount: z.number(),
  display: z.boolean().optional(),
  imgUrl: z.string().optional().nullable(),
  authors: z.lazy(() => AuthorUncheckedCreateNestedManyWithoutBooksInputSchema).optional(),
  salesLines: z.lazy(() => SalesLineUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  buybackLines: z.lazy(() => BuybackLineUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  correction: z.lazy(() => CorrectionUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  relatedBooks: z.lazy(() => BookUncheckedCreateNestedManyWithoutSymmetricRelatedBooksInputSchema).optional(),
  symmetricRelatedBooks: z.lazy(() => BookUncheckedCreateNestedManyWithoutRelatedBooksInputSchema).optional(),
<<<<<<< HEAD
  booksOnShelves: z.lazy(() => BookOnShelfUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
=======
  shelves: z.lazy(() => ShelfUncheckedCreateNestedManyWithoutBooksInputSchema).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const BookCreateOrConnectWithoutPurchaseLinesInputSchema: z.ZodType<PrismaClient.Prisma.BookCreateOrConnectWithoutPurchaseLinesInput> = z.object({
  where: z.lazy(() => BookWhereUniqueInputSchema),
  create: z.union([z.lazy(() => BookCreateWithoutPurchaseLinesInputSchema), z.lazy(() => BookUncheckedCreateWithoutPurchaseLinesInputSchema)]),
}).strict();

export const PurchaseOrderCreateWithoutPurchaseLinesInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderCreateWithoutPurchaseLinesInput> = z.object({
  id: z.string().optional(),
  date: z.date(),
  display: z.boolean().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutPurchaseOrderInputSchema).optional(),
  vendor: z.lazy(() => VendorCreateNestedOneWithoutPurchaseOrderInputSchema),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorCreateNestedManyWithoutPurchaseOrderInputSchema).optional(),
}).strict();

export const PurchaseOrderUncheckedCreateWithoutPurchaseLinesInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderUncheckedCreateWithoutPurchaseLinesInput> = z.object({
  id: z.string().optional(),
  date: z.date(),
  userId: z.string().optional().nullable(),
  vendorId: z.string(),
  display: z.boolean().optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUncheckedCreateNestedManyWithoutPurchaseOrderInputSchema).optional(),
}).strict();

export const PurchaseOrderCreateOrConnectWithoutPurchaseLinesInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderCreateOrConnectWithoutPurchaseLinesInput> = z.object({
  where: z.lazy(() => PurchaseOrderWhereUniqueInputSchema),
  create: z.union([z.lazy(() => PurchaseOrderCreateWithoutPurchaseLinesInputSchema), z.lazy(() => PurchaseOrderUncheckedCreateWithoutPurchaseLinesInputSchema)]),
}).strict();

export const CostMostRecentVendorCreateWithoutPurchaseLineInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorCreateWithoutPurchaseLineInput> = z.object({
  id: z.string().optional(),
  book: z.lazy(() => BookCreateNestedOneWithoutCostMostRecentVendorInputSchema),
  vendor: z.lazy(() => VendorCreateNestedOneWithoutCostMostRecentVendorInputSchema),
  purchaseOrder: z.lazy(() => PurchaseOrderCreateNestedOneWithoutCostMostRecentVendorInputSchema),
}).strict();

export const CostMostRecentVendorUncheckedCreateWithoutPurchaseLineInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorUncheckedCreateWithoutPurchaseLineInput> = z.object({
  id: z.string().optional(),
  bookId: z.string(),
  vendorId: z.string(),
  purchaseOrderId: z.string(),
}).strict();

export const CostMostRecentVendorCreateOrConnectWithoutPurchaseLineInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorCreateOrConnectWithoutPurchaseLineInput> = z.object({
  where: z.lazy(() => CostMostRecentVendorWhereUniqueInputSchema),
  create: z.union([z.lazy(() => CostMostRecentVendorCreateWithoutPurchaseLineInputSchema), z.lazy(() => CostMostRecentVendorUncheckedCreateWithoutPurchaseLineInputSchema)]),
}).strict();

export const BookUpsertWithoutPurchaseLinesInputSchema: z.ZodType<PrismaClient.Prisma.BookUpsertWithoutPurchaseLinesInput> = z.object({
  update: z.union([z.lazy(() => BookUpdateWithoutPurchaseLinesInputSchema), z.lazy(() => BookUncheckedUpdateWithoutPurchaseLinesInputSchema)]),
  create: z.union([z.lazy(() => BookCreateWithoutPurchaseLinesInputSchema), z.lazy(() => BookUncheckedCreateWithoutPurchaseLinesInputSchema)]),
}).strict();

export const BookUpdateWithoutPurchaseLinesInputSchema: z.ZodType<PrismaClient.Prisma.BookUpdateWithoutPurchaseLinesInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_13: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_10: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  publisher: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  publicationYear: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  pageCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  width: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  height: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  thickness: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  retailPrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  inventoryCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  imgUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  authors: z.lazy(() => AuthorUpdateManyWithoutBooksNestedInputSchema).optional(),
  genre: z.lazy(() => GenreUpdateOneRequiredWithoutBooksNestedInputSchema).optional(),
  salesLines: z.lazy(() => SalesLineUpdateManyWithoutBookNestedInputSchema).optional(),
  buybackLines: z.lazy(() => BuybackLineUpdateManyWithoutBookNestedInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUpdateManyWithoutBookNestedInputSchema).optional(),
  correction: z.lazy(() => CorrectionUpdateManyWithoutBookNestedInputSchema).optional(),
  relatedBooks: z.lazy(() => BookUpdateManyWithoutSymmetricRelatedBooksNestedInputSchema).optional(),
  symmetricRelatedBooks: z.lazy(() => BookUpdateManyWithoutRelatedBooksNestedInputSchema).optional(),
<<<<<<< HEAD
  booksOnShelves: z.lazy(() => BookOnShelfUpdateManyWithoutBookNestedInputSchema).optional(),
=======
  shelves: z.lazy(() => ShelfUpdateManyWithoutBooksNestedInputSchema).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const BookUncheckedUpdateWithoutPurchaseLinesInputSchema: z.ZodType<PrismaClient.Prisma.BookUncheckedUpdateWithoutPurchaseLinesInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_13: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_10: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  publisher: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  publicationYear: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  pageCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  width: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  height: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  thickness: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  retailPrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  genreId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  inventoryCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  imgUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  authors: z.lazy(() => AuthorUncheckedUpdateManyWithoutBooksNestedInputSchema).optional(),
  salesLines: z.lazy(() => SalesLineUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  buybackLines: z.lazy(() => BuybackLineUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  correction: z.lazy(() => CorrectionUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  relatedBooks: z.lazy(() => BookUncheckedUpdateManyWithoutSymmetricRelatedBooksNestedInputSchema).optional(),
  symmetricRelatedBooks: z.lazy(() => BookUncheckedUpdateManyWithoutRelatedBooksNestedInputSchema).optional(),
<<<<<<< HEAD
  booksOnShelves: z.lazy(() => BookOnShelfUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
=======
  shelves: z.lazy(() => ShelfUncheckedUpdateManyWithoutBooksNestedInputSchema).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const PurchaseOrderUpsertWithoutPurchaseLinesInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderUpsertWithoutPurchaseLinesInput> = z.object({
  update: z.union([z.lazy(() => PurchaseOrderUpdateWithoutPurchaseLinesInputSchema), z.lazy(() => PurchaseOrderUncheckedUpdateWithoutPurchaseLinesInputSchema)]),
  create: z.union([z.lazy(() => PurchaseOrderCreateWithoutPurchaseLinesInputSchema), z.lazy(() => PurchaseOrderUncheckedCreateWithoutPurchaseLinesInputSchema)]),
}).strict();

export const PurchaseOrderUpdateWithoutPurchaseLinesInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderUpdateWithoutPurchaseLinesInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutPurchaseOrderNestedInputSchema).optional(),
  vendor: z.lazy(() => VendorUpdateOneRequiredWithoutPurchaseOrderNestedInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUpdateManyWithoutPurchaseOrderNestedInputSchema).optional(),
}).strict();

export const PurchaseOrderUncheckedUpdateWithoutPurchaseLinesInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderUncheckedUpdateWithoutPurchaseLinesInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  vendorId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUncheckedUpdateManyWithoutPurchaseOrderNestedInputSchema).optional(),
}).strict();

export const CostMostRecentVendorUpsertWithoutPurchaseLineInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorUpsertWithoutPurchaseLineInput> = z.object({
  update: z.union([z.lazy(() => CostMostRecentVendorUpdateWithoutPurchaseLineInputSchema), z.lazy(() => CostMostRecentVendorUncheckedUpdateWithoutPurchaseLineInputSchema)]),
  create: z.union([z.lazy(() => CostMostRecentVendorCreateWithoutPurchaseLineInputSchema), z.lazy(() => CostMostRecentVendorUncheckedCreateWithoutPurchaseLineInputSchema)]),
}).strict();

export const CostMostRecentVendorUpdateWithoutPurchaseLineInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorUpdateWithoutPurchaseLineInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  book: z.lazy(() => BookUpdateOneRequiredWithoutCostMostRecentVendorNestedInputSchema).optional(),
  vendor: z.lazy(() => VendorUpdateOneRequiredWithoutCostMostRecentVendorNestedInputSchema).optional(),
  purchaseOrder: z.lazy(() => PurchaseOrderUpdateOneRequiredWithoutCostMostRecentVendorNestedInputSchema).optional(),
}).strict();

export const CostMostRecentVendorUncheckedUpdateWithoutPurchaseLineInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorUncheckedUpdateWithoutPurchaseLineInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  bookId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  vendorId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  purchaseOrderId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const SalesLineCreateWithoutSalesReconciliationInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineCreateWithoutSalesReconciliationInput> = z.object({
  id: z.string().optional(),
  quantity: z.number(),
  unitWholesalePrice: z.number(),
  display: z.boolean().optional(),
  book: z.lazy(() => BookCreateNestedOneWithoutSalesLinesInputSchema),
}).strict();

export const SalesLineUncheckedCreateWithoutSalesReconciliationInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineUncheckedCreateWithoutSalesReconciliationInput> = z.object({
  id: z.string().optional(),
  bookId: z.string(),
  quantity: z.number(),
  unitWholesalePrice: z.number(),
  display: z.boolean().optional(),
}).strict();

export const SalesLineCreateOrConnectWithoutSalesReconciliationInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineCreateOrConnectWithoutSalesReconciliationInput> = z.object({
  where: z.lazy(() => SalesLineWhereUniqueInputSchema),
  create: z.union([z.lazy(() => SalesLineCreateWithoutSalesReconciliationInputSchema), z.lazy(() => SalesLineUncheckedCreateWithoutSalesReconciliationInputSchema)]),
}).strict();

export const SalesLineCreateManySalesReconciliationInputEnvelopeSchema: z.ZodType<PrismaClient.Prisma.SalesLineCreateManySalesReconciliationInputEnvelope> = z.object({
  data: z.union([z.lazy(() => SalesLineCreateManySalesReconciliationInputSchema), z.lazy(() => SalesLineCreateManySalesReconciliationInputSchema).array()]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const SalesLineUpsertWithWhereUniqueWithoutSalesReconciliationInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineUpsertWithWhereUniqueWithoutSalesReconciliationInput> = z.object({
  where: z.lazy(() => SalesLineWhereUniqueInputSchema),
  update: z.union([z.lazy(() => SalesLineUpdateWithoutSalesReconciliationInputSchema), z.lazy(() => SalesLineUncheckedUpdateWithoutSalesReconciliationInputSchema)]),
  create: z.union([z.lazy(() => SalesLineCreateWithoutSalesReconciliationInputSchema), z.lazy(() => SalesLineUncheckedCreateWithoutSalesReconciliationInputSchema)]),
}).strict();

export const SalesLineUpdateWithWhereUniqueWithoutSalesReconciliationInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineUpdateWithWhereUniqueWithoutSalesReconciliationInput> = z.object({
  where: z.lazy(() => SalesLineWhereUniqueInputSchema),
  data: z.union([z.lazy(() => SalesLineUpdateWithoutSalesReconciliationInputSchema), z.lazy(() => SalesLineUncheckedUpdateWithoutSalesReconciliationInputSchema)]),
}).strict();

export const SalesLineUpdateManyWithWhereWithoutSalesReconciliationInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineUpdateManyWithWhereWithoutSalesReconciliationInput> = z.object({
  where: z.lazy(() => SalesLineScalarWhereInputSchema),
  data: z.union([z.lazy(() => SalesLineUpdateManyMutationInputSchema), z.lazy(() => SalesLineUncheckedUpdateManyWithoutSalesLinesInputSchema)]),
}).strict();

export const BookCreateWithoutSalesLinesInputSchema: z.ZodType<PrismaClient.Prisma.BookCreateWithoutSalesLinesInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  isbn_13: z.string(),
  isbn_10: z.string().optional().nullable(),
  publisher: z.string(),
  publicationYear: z.number(),
  pageCount: z.number(),
  width: z.number(),
  height: z.number(),
  thickness: z.number(),
  retailPrice: z.number(),
  inventoryCount: z.number(),
  display: z.boolean().optional(),
  imgUrl: z.string().optional().nullable(),
  authors: z.lazy(() => AuthorCreateNestedManyWithoutBooksInputSchema).optional(),
  genre: z.lazy(() => GenreCreateNestedOneWithoutBooksInputSchema),
  purchaseLines: z.lazy(() => PurchaseLineCreateNestedManyWithoutBookInputSchema).optional(),
  buybackLines: z.lazy(() => BuybackLineCreateNestedManyWithoutBookInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorCreateNestedManyWithoutBookInputSchema).optional(),
  correction: z.lazy(() => CorrectionCreateNestedManyWithoutBookInputSchema).optional(),
  relatedBooks: z.lazy(() => BookCreateNestedManyWithoutSymmetricRelatedBooksInputSchema).optional(),
  symmetricRelatedBooks: z.lazy(() => BookCreateNestedManyWithoutRelatedBooksInputSchema).optional(),
<<<<<<< HEAD
  booksOnShelves: z.lazy(() => BookOnShelfCreateNestedManyWithoutBookInputSchema).optional(),
=======
  shelves: z.lazy(() => ShelfCreateNestedManyWithoutBooksInputSchema).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const BookUncheckedCreateWithoutSalesLinesInputSchema: z.ZodType<PrismaClient.Prisma.BookUncheckedCreateWithoutSalesLinesInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  isbn_13: z.string(),
  isbn_10: z.string().optional().nullable(),
  publisher: z.string(),
  publicationYear: z.number(),
  pageCount: z.number(),
  width: z.number(),
  height: z.number(),
  thickness: z.number(),
  retailPrice: z.number(),
  genreId: z.string(),
  inventoryCount: z.number(),
  display: z.boolean().optional(),
  imgUrl: z.string().optional().nullable(),
  authors: z.lazy(() => AuthorUncheckedCreateNestedManyWithoutBooksInputSchema).optional(),
  purchaseLines: z.lazy(() => PurchaseLineUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  buybackLines: z.lazy(() => BuybackLineUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  correction: z.lazy(() => CorrectionUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  relatedBooks: z.lazy(() => BookUncheckedCreateNestedManyWithoutSymmetricRelatedBooksInputSchema).optional(),
  symmetricRelatedBooks: z.lazy(() => BookUncheckedCreateNestedManyWithoutRelatedBooksInputSchema).optional(),
<<<<<<< HEAD
  booksOnShelves: z.lazy(() => BookOnShelfUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
=======
  shelves: z.lazy(() => ShelfUncheckedCreateNestedManyWithoutBooksInputSchema).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const BookCreateOrConnectWithoutSalesLinesInputSchema: z.ZodType<PrismaClient.Prisma.BookCreateOrConnectWithoutSalesLinesInput> = z.object({
  where: z.lazy(() => BookWhereUniqueInputSchema),
  create: z.union([z.lazy(() => BookCreateWithoutSalesLinesInputSchema), z.lazy(() => BookUncheckedCreateWithoutSalesLinesInputSchema)]),
}).strict();

export const SalesReconciliationCreateWithoutSalesLinesInputSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationCreateWithoutSalesLinesInput> = z.object({
  id: z.string().optional(),
  date: z.date(),
  display: z.boolean().optional(),
}).strict();

export const SalesReconciliationUncheckedCreateWithoutSalesLinesInputSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationUncheckedCreateWithoutSalesLinesInput> = z.object({
  id: z.string().optional(),
  date: z.date(),
  display: z.boolean().optional(),
}).strict();

export const SalesReconciliationCreateOrConnectWithoutSalesLinesInputSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationCreateOrConnectWithoutSalesLinesInput> = z.object({
  where: z.lazy(() => SalesReconciliationWhereUniqueInputSchema),
  create: z.union([z.lazy(() => SalesReconciliationCreateWithoutSalesLinesInputSchema), z.lazy(() => SalesReconciliationUncheckedCreateWithoutSalesLinesInputSchema)]),
}).strict();

export const BookUpsertWithoutSalesLinesInputSchema: z.ZodType<PrismaClient.Prisma.BookUpsertWithoutSalesLinesInput> = z.object({
  update: z.union([z.lazy(() => BookUpdateWithoutSalesLinesInputSchema), z.lazy(() => BookUncheckedUpdateWithoutSalesLinesInputSchema)]),
  create: z.union([z.lazy(() => BookCreateWithoutSalesLinesInputSchema), z.lazy(() => BookUncheckedCreateWithoutSalesLinesInputSchema)]),
}).strict();

export const BookUpdateWithoutSalesLinesInputSchema: z.ZodType<PrismaClient.Prisma.BookUpdateWithoutSalesLinesInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_13: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_10: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  publisher: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  publicationYear: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  pageCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  width: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  height: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  thickness: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  retailPrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  inventoryCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  imgUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  authors: z.lazy(() => AuthorUpdateManyWithoutBooksNestedInputSchema).optional(),
  genre: z.lazy(() => GenreUpdateOneRequiredWithoutBooksNestedInputSchema).optional(),
  purchaseLines: z.lazy(() => PurchaseLineUpdateManyWithoutBookNestedInputSchema).optional(),
  buybackLines: z.lazy(() => BuybackLineUpdateManyWithoutBookNestedInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUpdateManyWithoutBookNestedInputSchema).optional(),
  correction: z.lazy(() => CorrectionUpdateManyWithoutBookNestedInputSchema).optional(),
  relatedBooks: z.lazy(() => BookUpdateManyWithoutSymmetricRelatedBooksNestedInputSchema).optional(),
  symmetricRelatedBooks: z.lazy(() => BookUpdateManyWithoutRelatedBooksNestedInputSchema).optional(),
<<<<<<< HEAD
  booksOnShelves: z.lazy(() => BookOnShelfUpdateManyWithoutBookNestedInputSchema).optional(),
=======
  shelves: z.lazy(() => ShelfUpdateManyWithoutBooksNestedInputSchema).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const BookUncheckedUpdateWithoutSalesLinesInputSchema: z.ZodType<PrismaClient.Prisma.BookUncheckedUpdateWithoutSalesLinesInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_13: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_10: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  publisher: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  publicationYear: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  pageCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  width: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  height: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  thickness: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  retailPrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  genreId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  inventoryCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  imgUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  authors: z.lazy(() => AuthorUncheckedUpdateManyWithoutBooksNestedInputSchema).optional(),
  purchaseLines: z.lazy(() => PurchaseLineUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  buybackLines: z.lazy(() => BuybackLineUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  correction: z.lazy(() => CorrectionUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  relatedBooks: z.lazy(() => BookUncheckedUpdateManyWithoutSymmetricRelatedBooksNestedInputSchema).optional(),
  symmetricRelatedBooks: z.lazy(() => BookUncheckedUpdateManyWithoutRelatedBooksNestedInputSchema).optional(),
<<<<<<< HEAD
  booksOnShelves: z.lazy(() => BookOnShelfUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
=======
  shelves: z.lazy(() => ShelfUncheckedUpdateManyWithoutBooksNestedInputSchema).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const SalesReconciliationUpsertWithoutSalesLinesInputSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationUpsertWithoutSalesLinesInput> = z.object({
  update: z.union([z.lazy(() => SalesReconciliationUpdateWithoutSalesLinesInputSchema), z.lazy(() => SalesReconciliationUncheckedUpdateWithoutSalesLinesInputSchema)]),
  create: z.union([z.lazy(() => SalesReconciliationCreateWithoutSalesLinesInputSchema), z.lazy(() => SalesReconciliationUncheckedCreateWithoutSalesLinesInputSchema)]),
}).strict();

export const SalesReconciliationUpdateWithoutSalesLinesInputSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationUpdateWithoutSalesLinesInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const SalesReconciliationUncheckedUpdateWithoutSalesLinesInputSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationUncheckedUpdateWithoutSalesLinesInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const UserCreateWithoutBuybackOrderInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateWithoutBuybackOrderInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  password: z.string(),
  role: z.string().optional(),
  display: z.boolean().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  Correction: z.lazy(() => CorrectionCreateNestedManyWithoutUserInputSchema).optional(),
  PurchaseOrder: z.lazy(() => PurchaseOrderCreateNestedManyWithoutUserInputSchema).optional(),
  casesCreated: z.lazy(() => CaseCreateNestedManyWithoutCreatorInputSchema).optional(),
  casesLastEdited: z.lazy(() => CaseCreateNestedManyWithoutEditorInputSchema).optional(),
}).strict();

export const UserUncheckedCreateWithoutBuybackOrderInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedCreateWithoutBuybackOrderInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  password: z.string(),
  role: z.string().optional(),
  display: z.boolean().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Correction: z.lazy(() => CorrectionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  PurchaseOrder: z.lazy(() => PurchaseOrderUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  casesCreated: z.lazy(() => CaseUncheckedCreateNestedManyWithoutCreatorInputSchema).optional(),
  casesLastEdited: z.lazy(() => CaseUncheckedCreateNestedManyWithoutEditorInputSchema).optional(),
}).strict();

export const UserCreateOrConnectWithoutBuybackOrderInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateOrConnectWithoutBuybackOrderInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([z.lazy(() => UserCreateWithoutBuybackOrderInputSchema), z.lazy(() => UserUncheckedCreateWithoutBuybackOrderInputSchema)]),
}).strict();

export const VendorCreateWithoutBuybackOrdersInputSchema: z.ZodType<PrismaClient.Prisma.VendorCreateWithoutBuybackOrdersInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  buybackRate: z.number().optional(),
  display: z.boolean().optional(),
  purchaseOrder: z.lazy(() => PurchaseOrderCreateNestedManyWithoutVendorInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorCreateNestedManyWithoutVendorInputSchema).optional(),
}).strict();

export const VendorUncheckedCreateWithoutBuybackOrdersInputSchema: z.ZodType<PrismaClient.Prisma.VendorUncheckedCreateWithoutBuybackOrdersInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  buybackRate: z.number().optional(),
  display: z.boolean().optional(),
  purchaseOrder: z.lazy(() => PurchaseOrderUncheckedCreateNestedManyWithoutVendorInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUncheckedCreateNestedManyWithoutVendorInputSchema).optional(),
}).strict();

export const VendorCreateOrConnectWithoutBuybackOrdersInputSchema: z.ZodType<PrismaClient.Prisma.VendorCreateOrConnectWithoutBuybackOrdersInput> = z.object({
  where: z.lazy(() => VendorWhereUniqueInputSchema),
  create: z.union([z.lazy(() => VendorCreateWithoutBuybackOrdersInputSchema), z.lazy(() => VendorUncheckedCreateWithoutBuybackOrdersInputSchema)]),
}).strict();

export const BuybackLineCreateWithoutBuybackOrderInputSchema: z.ZodType<PrismaClient.Prisma.BuybackLineCreateWithoutBuybackOrderInput> = z.object({
  id: z.string().optional(),
  quantity: z.number(),
  unitBuybackPrice: z.number(),
  display: z.boolean().optional(),
  book: z.lazy(() => BookCreateNestedOneWithoutBuybackLinesInputSchema),
}).strict();

export const BuybackLineUncheckedCreateWithoutBuybackOrderInputSchema: z.ZodType<PrismaClient.Prisma.BuybackLineUncheckedCreateWithoutBuybackOrderInput> = z.object({
  id: z.string().optional(),
  bookId: z.string(),
  quantity: z.number(),
  unitBuybackPrice: z.number(),
  display: z.boolean().optional(),
}).strict();

export const BuybackLineCreateOrConnectWithoutBuybackOrderInputSchema: z.ZodType<PrismaClient.Prisma.BuybackLineCreateOrConnectWithoutBuybackOrderInput> = z.object({
  where: z.lazy(() => BuybackLineWhereUniqueInputSchema),
  create: z.union([z.lazy(() => BuybackLineCreateWithoutBuybackOrderInputSchema), z.lazy(() => BuybackLineUncheckedCreateWithoutBuybackOrderInputSchema)]),
}).strict();

export const BuybackLineCreateManyBuybackOrderInputEnvelopeSchema: z.ZodType<PrismaClient.Prisma.BuybackLineCreateManyBuybackOrderInputEnvelope> = z.object({
  data: z.union([z.lazy(() => BuybackLineCreateManyBuybackOrderInputSchema), z.lazy(() => BuybackLineCreateManyBuybackOrderInputSchema).array()]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const UserUpsertWithoutBuybackOrderInputSchema: z.ZodType<PrismaClient.Prisma.UserUpsertWithoutBuybackOrderInput> = z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutBuybackOrderInputSchema), z.lazy(() => UserUncheckedUpdateWithoutBuybackOrderInputSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutBuybackOrderInputSchema), z.lazy(() => UserUncheckedCreateWithoutBuybackOrderInputSchema)]),
}).strict();

export const UserUpdateWithoutBuybackOrderInputSchema: z.ZodType<PrismaClient.Prisma.UserUpdateWithoutBuybackOrderInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  password: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  role: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  Correction: z.lazy(() => CorrectionUpdateManyWithoutUserNestedInputSchema).optional(),
  PurchaseOrder: z.lazy(() => PurchaseOrderUpdateManyWithoutUserNestedInputSchema).optional(),
  casesCreated: z.lazy(() => CaseUpdateManyWithoutCreatorNestedInputSchema).optional(),
  casesLastEdited: z.lazy(() => CaseUpdateManyWithoutEditorNestedInputSchema).optional(),
}).strict();

export const UserUncheckedUpdateWithoutBuybackOrderInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedUpdateWithoutBuybackOrderInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  password: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  role: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Correction: z.lazy(() => CorrectionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  PurchaseOrder: z.lazy(() => PurchaseOrderUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  casesCreated: z.lazy(() => CaseUncheckedUpdateManyWithoutCreatorNestedInputSchema).optional(),
  casesLastEdited: z.lazy(() => CaseUncheckedUpdateManyWithoutEditorNestedInputSchema).optional(),
}).strict();

export const VendorUpsertWithoutBuybackOrdersInputSchema: z.ZodType<PrismaClient.Prisma.VendorUpsertWithoutBuybackOrdersInput> = z.object({
  update: z.union([z.lazy(() => VendorUpdateWithoutBuybackOrdersInputSchema), z.lazy(() => VendorUncheckedUpdateWithoutBuybackOrdersInputSchema)]),
  create: z.union([z.lazy(() => VendorCreateWithoutBuybackOrdersInputSchema), z.lazy(() => VendorUncheckedCreateWithoutBuybackOrdersInputSchema)]),
}).strict();

export const VendorUpdateWithoutBuybackOrdersInputSchema: z.ZodType<PrismaClient.Prisma.VendorUpdateWithoutBuybackOrdersInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  buybackRate: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  purchaseOrder: z.lazy(() => PurchaseOrderUpdateManyWithoutVendorNestedInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUpdateManyWithoutVendorNestedInputSchema).optional(),
}).strict();

export const VendorUncheckedUpdateWithoutBuybackOrdersInputSchema: z.ZodType<PrismaClient.Prisma.VendorUncheckedUpdateWithoutBuybackOrdersInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  buybackRate: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  purchaseOrder: z.lazy(() => PurchaseOrderUncheckedUpdateManyWithoutVendorNestedInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUncheckedUpdateManyWithoutVendorNestedInputSchema).optional(),
}).strict();

export const BuybackLineUpsertWithWhereUniqueWithoutBuybackOrderInputSchema: z.ZodType<PrismaClient.Prisma.BuybackLineUpsertWithWhereUniqueWithoutBuybackOrderInput> = z.object({
  where: z.lazy(() => BuybackLineWhereUniqueInputSchema),
  update: z.union([z.lazy(() => BuybackLineUpdateWithoutBuybackOrderInputSchema), z.lazy(() => BuybackLineUncheckedUpdateWithoutBuybackOrderInputSchema)]),
  create: z.union([z.lazy(() => BuybackLineCreateWithoutBuybackOrderInputSchema), z.lazy(() => BuybackLineUncheckedCreateWithoutBuybackOrderInputSchema)]),
}).strict();

export const BuybackLineUpdateWithWhereUniqueWithoutBuybackOrderInputSchema: z.ZodType<PrismaClient.Prisma.BuybackLineUpdateWithWhereUniqueWithoutBuybackOrderInput> = z.object({
  where: z.lazy(() => BuybackLineWhereUniqueInputSchema),
  data: z.union([z.lazy(() => BuybackLineUpdateWithoutBuybackOrderInputSchema), z.lazy(() => BuybackLineUncheckedUpdateWithoutBuybackOrderInputSchema)]),
}).strict();

export const BuybackLineUpdateManyWithWhereWithoutBuybackOrderInputSchema: z.ZodType<PrismaClient.Prisma.BuybackLineUpdateManyWithWhereWithoutBuybackOrderInput> = z.object({
  where: z.lazy(() => BuybackLineScalarWhereInputSchema),
  data: z.union([z.lazy(() => BuybackLineUpdateManyMutationInputSchema), z.lazy(() => BuybackLineUncheckedUpdateManyWithoutBuybackLinesInputSchema)]),
}).strict();

export const BookCreateWithoutBuybackLinesInputSchema: z.ZodType<PrismaClient.Prisma.BookCreateWithoutBuybackLinesInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  isbn_13: z.string(),
  isbn_10: z.string().optional().nullable(),
  publisher: z.string(),
  publicationYear: z.number(),
  pageCount: z.number(),
  width: z.number(),
  height: z.number(),
  thickness: z.number(),
  retailPrice: z.number(),
  inventoryCount: z.number(),
  display: z.boolean().optional(),
  imgUrl: z.string().optional().nullable(),
  authors: z.lazy(() => AuthorCreateNestedManyWithoutBooksInputSchema).optional(),
  genre: z.lazy(() => GenreCreateNestedOneWithoutBooksInputSchema),
  purchaseLines: z.lazy(() => PurchaseLineCreateNestedManyWithoutBookInputSchema).optional(),
  salesLines: z.lazy(() => SalesLineCreateNestedManyWithoutBookInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorCreateNestedManyWithoutBookInputSchema).optional(),
  correction: z.lazy(() => CorrectionCreateNestedManyWithoutBookInputSchema).optional(),
  relatedBooks: z.lazy(() => BookCreateNestedManyWithoutSymmetricRelatedBooksInputSchema).optional(),
  symmetricRelatedBooks: z.lazy(() => BookCreateNestedManyWithoutRelatedBooksInputSchema).optional(),
<<<<<<< HEAD
  booksOnShelves: z.lazy(() => BookOnShelfCreateNestedManyWithoutBookInputSchema).optional(),
=======
  shelves: z.lazy(() => ShelfCreateNestedManyWithoutBooksInputSchema).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const BookUncheckedCreateWithoutBuybackLinesInputSchema: z.ZodType<PrismaClient.Prisma.BookUncheckedCreateWithoutBuybackLinesInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  isbn_13: z.string(),
  isbn_10: z.string().optional().nullable(),
  publisher: z.string(),
  publicationYear: z.number(),
  pageCount: z.number(),
  width: z.number(),
  height: z.number(),
  thickness: z.number(),
  retailPrice: z.number(),
  genreId: z.string(),
  inventoryCount: z.number(),
  display: z.boolean().optional(),
  imgUrl: z.string().optional().nullable(),
  authors: z.lazy(() => AuthorUncheckedCreateNestedManyWithoutBooksInputSchema).optional(),
  purchaseLines: z.lazy(() => PurchaseLineUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  salesLines: z.lazy(() => SalesLineUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  correction: z.lazy(() => CorrectionUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  relatedBooks: z.lazy(() => BookUncheckedCreateNestedManyWithoutSymmetricRelatedBooksInputSchema).optional(),
  symmetricRelatedBooks: z.lazy(() => BookUncheckedCreateNestedManyWithoutRelatedBooksInputSchema).optional(),
<<<<<<< HEAD
  booksOnShelves: z.lazy(() => BookOnShelfUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
=======
  shelves: z.lazy(() => ShelfUncheckedCreateNestedManyWithoutBooksInputSchema).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const BookCreateOrConnectWithoutBuybackLinesInputSchema: z.ZodType<PrismaClient.Prisma.BookCreateOrConnectWithoutBuybackLinesInput> = z.object({
  where: z.lazy(() => BookWhereUniqueInputSchema),
  create: z.union([z.lazy(() => BookCreateWithoutBuybackLinesInputSchema), z.lazy(() => BookUncheckedCreateWithoutBuybackLinesInputSchema)]),
}).strict();

export const BuybackOrderCreateWithoutBuybackLinesInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderCreateWithoutBuybackLinesInput> = z.object({
  id: z.string().optional(),
  date: z.date(),
  display: z.boolean().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutBuybackOrderInputSchema).optional(),
  vendor: z.lazy(() => VendorCreateNestedOneWithoutBuybackOrdersInputSchema),
}).strict();

export const BuybackOrderUncheckedCreateWithoutBuybackLinesInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderUncheckedCreateWithoutBuybackLinesInput> = z.object({
  id: z.string().optional(),
  date: z.date(),
  userId: z.string().optional().nullable(),
  vendorId: z.string(),
  display: z.boolean().optional(),
}).strict();

export const BuybackOrderCreateOrConnectWithoutBuybackLinesInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderCreateOrConnectWithoutBuybackLinesInput> = z.object({
  where: z.lazy(() => BuybackOrderWhereUniqueInputSchema),
  create: z.union([z.lazy(() => BuybackOrderCreateWithoutBuybackLinesInputSchema), z.lazy(() => BuybackOrderUncheckedCreateWithoutBuybackLinesInputSchema)]),
}).strict();

export const BookUpsertWithoutBuybackLinesInputSchema: z.ZodType<PrismaClient.Prisma.BookUpsertWithoutBuybackLinesInput> = z.object({
  update: z.union([z.lazy(() => BookUpdateWithoutBuybackLinesInputSchema), z.lazy(() => BookUncheckedUpdateWithoutBuybackLinesInputSchema)]),
  create: z.union([z.lazy(() => BookCreateWithoutBuybackLinesInputSchema), z.lazy(() => BookUncheckedCreateWithoutBuybackLinesInputSchema)]),
}).strict();

export const BookUpdateWithoutBuybackLinesInputSchema: z.ZodType<PrismaClient.Prisma.BookUpdateWithoutBuybackLinesInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_13: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_10: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  publisher: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  publicationYear: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  pageCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  width: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  height: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  thickness: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  retailPrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  inventoryCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  imgUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  authors: z.lazy(() => AuthorUpdateManyWithoutBooksNestedInputSchema).optional(),
  genre: z.lazy(() => GenreUpdateOneRequiredWithoutBooksNestedInputSchema).optional(),
  purchaseLines: z.lazy(() => PurchaseLineUpdateManyWithoutBookNestedInputSchema).optional(),
  salesLines: z.lazy(() => SalesLineUpdateManyWithoutBookNestedInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUpdateManyWithoutBookNestedInputSchema).optional(),
  correction: z.lazy(() => CorrectionUpdateManyWithoutBookNestedInputSchema).optional(),
  relatedBooks: z.lazy(() => BookUpdateManyWithoutSymmetricRelatedBooksNestedInputSchema).optional(),
  symmetricRelatedBooks: z.lazy(() => BookUpdateManyWithoutRelatedBooksNestedInputSchema).optional(),
<<<<<<< HEAD
  booksOnShelves: z.lazy(() => BookOnShelfUpdateManyWithoutBookNestedInputSchema).optional(),
=======
  shelves: z.lazy(() => ShelfUpdateManyWithoutBooksNestedInputSchema).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const BookUncheckedUpdateWithoutBuybackLinesInputSchema: z.ZodType<PrismaClient.Prisma.BookUncheckedUpdateWithoutBuybackLinesInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_13: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_10: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  publisher: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  publicationYear: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  pageCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  width: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  height: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  thickness: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  retailPrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  genreId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  inventoryCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  imgUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  authors: z.lazy(() => AuthorUncheckedUpdateManyWithoutBooksNestedInputSchema).optional(),
  purchaseLines: z.lazy(() => PurchaseLineUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  salesLines: z.lazy(() => SalesLineUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  correction: z.lazy(() => CorrectionUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  relatedBooks: z.lazy(() => BookUncheckedUpdateManyWithoutSymmetricRelatedBooksNestedInputSchema).optional(),
  symmetricRelatedBooks: z.lazy(() => BookUncheckedUpdateManyWithoutRelatedBooksNestedInputSchema).optional(),
<<<<<<< HEAD
  booksOnShelves: z.lazy(() => BookOnShelfUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
=======
  shelves: z.lazy(() => ShelfUncheckedUpdateManyWithoutBooksNestedInputSchema).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const BuybackOrderUpsertWithoutBuybackLinesInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderUpsertWithoutBuybackLinesInput> = z.object({
  update: z.union([z.lazy(() => BuybackOrderUpdateWithoutBuybackLinesInputSchema), z.lazy(() => BuybackOrderUncheckedUpdateWithoutBuybackLinesInputSchema)]),
  create: z.union([z.lazy(() => BuybackOrderCreateWithoutBuybackLinesInputSchema), z.lazy(() => BuybackOrderUncheckedCreateWithoutBuybackLinesInputSchema)]),
}).strict();

export const BuybackOrderUpdateWithoutBuybackLinesInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderUpdateWithoutBuybackLinesInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutBuybackOrderNestedInputSchema).optional(),
  vendor: z.lazy(() => VendorUpdateOneRequiredWithoutBuybackOrdersNestedInputSchema).optional(),
}).strict();

export const BuybackOrderUncheckedUpdateWithoutBuybackLinesInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderUncheckedUpdateWithoutBuybackLinesInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  vendorId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const UserCreateWithoutCorrectionInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateWithoutCorrectionInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  password: z.string(),
  role: z.string().optional(),
  display: z.boolean().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  PurchaseOrder: z.lazy(() => PurchaseOrderCreateNestedManyWithoutUserInputSchema).optional(),
  BuybackOrder: z.lazy(() => BuybackOrderCreateNestedManyWithoutUserInputSchema).optional(),
  casesCreated: z.lazy(() => CaseCreateNestedManyWithoutCreatorInputSchema).optional(),
  casesLastEdited: z.lazy(() => CaseCreateNestedManyWithoutEditorInputSchema).optional(),
}).strict();

export const UserUncheckedCreateWithoutCorrectionInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedCreateWithoutCorrectionInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  password: z.string(),
  role: z.string().optional(),
  display: z.boolean().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  PurchaseOrder: z.lazy(() => PurchaseOrderUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  BuybackOrder: z.lazy(() => BuybackOrderUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  casesCreated: z.lazy(() => CaseUncheckedCreateNestedManyWithoutCreatorInputSchema).optional(),
  casesLastEdited: z.lazy(() => CaseUncheckedCreateNestedManyWithoutEditorInputSchema).optional(),
}).strict();

export const UserCreateOrConnectWithoutCorrectionInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateOrConnectWithoutCorrectionInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([z.lazy(() => UserCreateWithoutCorrectionInputSchema), z.lazy(() => UserUncheckedCreateWithoutCorrectionInputSchema)]),
}).strict();

export const BookCreateWithoutCorrectionInputSchema: z.ZodType<PrismaClient.Prisma.BookCreateWithoutCorrectionInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  isbn_13: z.string(),
  isbn_10: z.string().optional().nullable(),
  publisher: z.string(),
  publicationYear: z.number(),
  pageCount: z.number(),
  width: z.number(),
  height: z.number(),
  thickness: z.number(),
  retailPrice: z.number(),
  inventoryCount: z.number(),
  display: z.boolean().optional(),
  imgUrl: z.string().optional().nullable(),
  authors: z.lazy(() => AuthorCreateNestedManyWithoutBooksInputSchema).optional(),
  genre: z.lazy(() => GenreCreateNestedOneWithoutBooksInputSchema),
  purchaseLines: z.lazy(() => PurchaseLineCreateNestedManyWithoutBookInputSchema).optional(),
  salesLines: z.lazy(() => SalesLineCreateNestedManyWithoutBookInputSchema).optional(),
  buybackLines: z.lazy(() => BuybackLineCreateNestedManyWithoutBookInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorCreateNestedManyWithoutBookInputSchema).optional(),
  relatedBooks: z.lazy(() => BookCreateNestedManyWithoutSymmetricRelatedBooksInputSchema).optional(),
  symmetricRelatedBooks: z.lazy(() => BookCreateNestedManyWithoutRelatedBooksInputSchema).optional(),
<<<<<<< HEAD
  booksOnShelves: z.lazy(() => BookOnShelfCreateNestedManyWithoutBookInputSchema).optional(),
=======
  shelves: z.lazy(() => ShelfCreateNestedManyWithoutBooksInputSchema).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const BookUncheckedCreateWithoutCorrectionInputSchema: z.ZodType<PrismaClient.Prisma.BookUncheckedCreateWithoutCorrectionInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  isbn_13: z.string(),
  isbn_10: z.string().optional().nullable(),
  publisher: z.string(),
  publicationYear: z.number(),
  pageCount: z.number(),
  width: z.number(),
  height: z.number(),
  thickness: z.number(),
  retailPrice: z.number(),
  genreId: z.string(),
  inventoryCount: z.number(),
  display: z.boolean().optional(),
  imgUrl: z.string().optional().nullable(),
  authors: z.lazy(() => AuthorUncheckedCreateNestedManyWithoutBooksInputSchema).optional(),
  purchaseLines: z.lazy(() => PurchaseLineUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  salesLines: z.lazy(() => SalesLineUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  buybackLines: z.lazy(() => BuybackLineUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  relatedBooks: z.lazy(() => BookUncheckedCreateNestedManyWithoutSymmetricRelatedBooksInputSchema).optional(),
  symmetricRelatedBooks: z.lazy(() => BookUncheckedCreateNestedManyWithoutRelatedBooksInputSchema).optional(),
<<<<<<< HEAD
  booksOnShelves: z.lazy(() => BookOnShelfUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
=======
  shelves: z.lazy(() => ShelfUncheckedCreateNestedManyWithoutBooksInputSchema).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const BookCreateOrConnectWithoutCorrectionInputSchema: z.ZodType<PrismaClient.Prisma.BookCreateOrConnectWithoutCorrectionInput> = z.object({
  where: z.lazy(() => BookWhereUniqueInputSchema),
  create: z.union([z.lazy(() => BookCreateWithoutCorrectionInputSchema), z.lazy(() => BookUncheckedCreateWithoutCorrectionInputSchema)]),
}).strict();

export const UserUpsertWithoutCorrectionInputSchema: z.ZodType<PrismaClient.Prisma.UserUpsertWithoutCorrectionInput> = z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutCorrectionInputSchema), z.lazy(() => UserUncheckedUpdateWithoutCorrectionInputSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutCorrectionInputSchema), z.lazy(() => UserUncheckedCreateWithoutCorrectionInputSchema)]),
}).strict();

export const UserUpdateWithoutCorrectionInputSchema: z.ZodType<PrismaClient.Prisma.UserUpdateWithoutCorrectionInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  password: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  role: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  PurchaseOrder: z.lazy(() => PurchaseOrderUpdateManyWithoutUserNestedInputSchema).optional(),
  BuybackOrder: z.lazy(() => BuybackOrderUpdateManyWithoutUserNestedInputSchema).optional(),
  casesCreated: z.lazy(() => CaseUpdateManyWithoutCreatorNestedInputSchema).optional(),
  casesLastEdited: z.lazy(() => CaseUpdateManyWithoutEditorNestedInputSchema).optional(),
}).strict();

export const UserUncheckedUpdateWithoutCorrectionInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedUpdateWithoutCorrectionInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  password: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  role: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  PurchaseOrder: z.lazy(() => PurchaseOrderUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  BuybackOrder: z.lazy(() => BuybackOrderUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  casesCreated: z.lazy(() => CaseUncheckedUpdateManyWithoutCreatorNestedInputSchema).optional(),
  casesLastEdited: z.lazy(() => CaseUncheckedUpdateManyWithoutEditorNestedInputSchema).optional(),
}).strict();

export const BookUpsertWithoutCorrectionInputSchema: z.ZodType<PrismaClient.Prisma.BookUpsertWithoutCorrectionInput> = z.object({
  update: z.union([z.lazy(() => BookUpdateWithoutCorrectionInputSchema), z.lazy(() => BookUncheckedUpdateWithoutCorrectionInputSchema)]),
  create: z.union([z.lazy(() => BookCreateWithoutCorrectionInputSchema), z.lazy(() => BookUncheckedCreateWithoutCorrectionInputSchema)]),
}).strict();

export const BookUpdateWithoutCorrectionInputSchema: z.ZodType<PrismaClient.Prisma.BookUpdateWithoutCorrectionInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_13: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_10: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  publisher: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  publicationYear: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  pageCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  width: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  height: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  thickness: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  retailPrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  inventoryCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  imgUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  authors: z.lazy(() => AuthorUpdateManyWithoutBooksNestedInputSchema).optional(),
  genre: z.lazy(() => GenreUpdateOneRequiredWithoutBooksNestedInputSchema).optional(),
  purchaseLines: z.lazy(() => PurchaseLineUpdateManyWithoutBookNestedInputSchema).optional(),
  salesLines: z.lazy(() => SalesLineUpdateManyWithoutBookNestedInputSchema).optional(),
  buybackLines: z.lazy(() => BuybackLineUpdateManyWithoutBookNestedInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUpdateManyWithoutBookNestedInputSchema).optional(),
  relatedBooks: z.lazy(() => BookUpdateManyWithoutSymmetricRelatedBooksNestedInputSchema).optional(),
  symmetricRelatedBooks: z.lazy(() => BookUpdateManyWithoutRelatedBooksNestedInputSchema).optional(),
<<<<<<< HEAD
  booksOnShelves: z.lazy(() => BookOnShelfUpdateManyWithoutBookNestedInputSchema).optional(),
=======
  shelves: z.lazy(() => ShelfUpdateManyWithoutBooksNestedInputSchema).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const BookUncheckedUpdateWithoutCorrectionInputSchema: z.ZodType<PrismaClient.Prisma.BookUncheckedUpdateWithoutCorrectionInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_13: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_10: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  publisher: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  publicationYear: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  pageCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  width: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  height: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  thickness: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  retailPrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  genreId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  inventoryCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  imgUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  authors: z.lazy(() => AuthorUncheckedUpdateManyWithoutBooksNestedInputSchema).optional(),
  purchaseLines: z.lazy(() => PurchaseLineUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  salesLines: z.lazy(() => SalesLineUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  buybackLines: z.lazy(() => BuybackLineUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  relatedBooks: z.lazy(() => BookUncheckedUpdateManyWithoutSymmetricRelatedBooksNestedInputSchema).optional(),
  symmetricRelatedBooks: z.lazy(() => BookUncheckedUpdateManyWithoutRelatedBooksNestedInputSchema).optional(),
<<<<<<< HEAD
  booksOnShelves: z.lazy(() => BookOnShelfUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
=======
  shelves: z.lazy(() => ShelfUncheckedUpdateManyWithoutBooksNestedInputSchema).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const BookCreateWithoutCostMostRecentVendorInputSchema: z.ZodType<PrismaClient.Prisma.BookCreateWithoutCostMostRecentVendorInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  isbn_13: z.string(),
  isbn_10: z.string().optional().nullable(),
  publisher: z.string(),
  publicationYear: z.number(),
  pageCount: z.number(),
  width: z.number(),
  height: z.number(),
  thickness: z.number(),
  retailPrice: z.number(),
  inventoryCount: z.number(),
  display: z.boolean().optional(),
  imgUrl: z.string().optional().nullable(),
  authors: z.lazy(() => AuthorCreateNestedManyWithoutBooksInputSchema).optional(),
  genre: z.lazy(() => GenreCreateNestedOneWithoutBooksInputSchema),
  purchaseLines: z.lazy(() => PurchaseLineCreateNestedManyWithoutBookInputSchema).optional(),
  salesLines: z.lazy(() => SalesLineCreateNestedManyWithoutBookInputSchema).optional(),
  buybackLines: z.lazy(() => BuybackLineCreateNestedManyWithoutBookInputSchema).optional(),
  correction: z.lazy(() => CorrectionCreateNestedManyWithoutBookInputSchema).optional(),
  relatedBooks: z.lazy(() => BookCreateNestedManyWithoutSymmetricRelatedBooksInputSchema).optional(),
  symmetricRelatedBooks: z.lazy(() => BookCreateNestedManyWithoutRelatedBooksInputSchema).optional(),
<<<<<<< HEAD
  booksOnShelves: z.lazy(() => BookOnShelfCreateNestedManyWithoutBookInputSchema).optional(),
=======
  shelves: z.lazy(() => ShelfCreateNestedManyWithoutBooksInputSchema).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const BookUncheckedCreateWithoutCostMostRecentVendorInputSchema: z.ZodType<PrismaClient.Prisma.BookUncheckedCreateWithoutCostMostRecentVendorInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  isbn_13: z.string(),
  isbn_10: z.string().optional().nullable(),
  publisher: z.string(),
  publicationYear: z.number(),
  pageCount: z.number(),
  width: z.number(),
  height: z.number(),
  thickness: z.number(),
  retailPrice: z.number(),
  genreId: z.string(),
  inventoryCount: z.number(),
  display: z.boolean().optional(),
  imgUrl: z.string().optional().nullable(),
  authors: z.lazy(() => AuthorUncheckedCreateNestedManyWithoutBooksInputSchema).optional(),
  purchaseLines: z.lazy(() => PurchaseLineUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  salesLines: z.lazy(() => SalesLineUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  buybackLines: z.lazy(() => BuybackLineUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  correction: z.lazy(() => CorrectionUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  relatedBooks: z.lazy(() => BookUncheckedCreateNestedManyWithoutSymmetricRelatedBooksInputSchema).optional(),
  symmetricRelatedBooks: z.lazy(() => BookUncheckedCreateNestedManyWithoutRelatedBooksInputSchema).optional(),
<<<<<<< HEAD
  booksOnShelves: z.lazy(() => BookOnShelfUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
=======
  shelves: z.lazy(() => ShelfUncheckedCreateNestedManyWithoutBooksInputSchema).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const BookCreateOrConnectWithoutCostMostRecentVendorInputSchema: z.ZodType<PrismaClient.Prisma.BookCreateOrConnectWithoutCostMostRecentVendorInput> = z.object({
  where: z.lazy(() => BookWhereUniqueInputSchema),
  create: z.union([z.lazy(() => BookCreateWithoutCostMostRecentVendorInputSchema), z.lazy(() => BookUncheckedCreateWithoutCostMostRecentVendorInputSchema)]),
}).strict();

export const VendorCreateWithoutCostMostRecentVendorInputSchema: z.ZodType<PrismaClient.Prisma.VendorCreateWithoutCostMostRecentVendorInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  buybackRate: z.number().optional(),
  display: z.boolean().optional(),
  purchaseOrder: z.lazy(() => PurchaseOrderCreateNestedManyWithoutVendorInputSchema).optional(),
  buybackOrders: z.lazy(() => BuybackOrderCreateNestedManyWithoutVendorInputSchema).optional(),
}).strict();

export const VendorUncheckedCreateWithoutCostMostRecentVendorInputSchema: z.ZodType<PrismaClient.Prisma.VendorUncheckedCreateWithoutCostMostRecentVendorInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  buybackRate: z.number().optional(),
  display: z.boolean().optional(),
  purchaseOrder: z.lazy(() => PurchaseOrderUncheckedCreateNestedManyWithoutVendorInputSchema).optional(),
  buybackOrders: z.lazy(() => BuybackOrderUncheckedCreateNestedManyWithoutVendorInputSchema).optional(),
}).strict();

export const VendorCreateOrConnectWithoutCostMostRecentVendorInputSchema: z.ZodType<PrismaClient.Prisma.VendorCreateOrConnectWithoutCostMostRecentVendorInput> = z.object({
  where: z.lazy(() => VendorWhereUniqueInputSchema),
  create: z.union([z.lazy(() => VendorCreateWithoutCostMostRecentVendorInputSchema), z.lazy(() => VendorUncheckedCreateWithoutCostMostRecentVendorInputSchema)]),
}).strict();

export const PurchaseLineCreateWithoutCostMostRecentVendorInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineCreateWithoutCostMostRecentVendorInput> = z.object({
  id: z.string().optional(),
  quantity: z.number(),
  unitWholesalePrice: z.number(),
  display: z.boolean().optional(),
  book: z.lazy(() => BookCreateNestedOneWithoutPurchaseLinesInputSchema),
  purchaseOrder: z.lazy(() => PurchaseOrderCreateNestedOneWithoutPurchaseLinesInputSchema),
}).strict();

export const PurchaseLineUncheckedCreateWithoutCostMostRecentVendorInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineUncheckedCreateWithoutCostMostRecentVendorInput> = z.object({
  id: z.string().optional(),
  bookId: z.string(),
  quantity: z.number(),
  unitWholesalePrice: z.number(),
  purchaseOrderId: z.string(),
  display: z.boolean().optional(),
}).strict();

export const PurchaseLineCreateOrConnectWithoutCostMostRecentVendorInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineCreateOrConnectWithoutCostMostRecentVendorInput> = z.object({
  where: z.lazy(() => PurchaseLineWhereUniqueInputSchema),
  create: z.union([z.lazy(() => PurchaseLineCreateWithoutCostMostRecentVendorInputSchema), z.lazy(() => PurchaseLineUncheckedCreateWithoutCostMostRecentVendorInputSchema)]),
}).strict();

export const PurchaseOrderCreateWithoutCostMostRecentVendorInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderCreateWithoutCostMostRecentVendorInput> = z.object({
  id: z.string().optional(),
  date: z.date(),
  display: z.boolean().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutPurchaseOrderInputSchema).optional(),
  vendor: z.lazy(() => VendorCreateNestedOneWithoutPurchaseOrderInputSchema),
  purchaseLines: z.lazy(() => PurchaseLineCreateNestedManyWithoutPurchaseOrderInputSchema).optional(),
}).strict();

export const PurchaseOrderUncheckedCreateWithoutCostMostRecentVendorInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderUncheckedCreateWithoutCostMostRecentVendorInput> = z.object({
  id: z.string().optional(),
  date: z.date(),
  userId: z.string().optional().nullable(),
  vendorId: z.string(),
  display: z.boolean().optional(),
  purchaseLines: z.lazy(() => PurchaseLineUncheckedCreateNestedManyWithoutPurchaseOrderInputSchema).optional(),
}).strict();

export const PurchaseOrderCreateOrConnectWithoutCostMostRecentVendorInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderCreateOrConnectWithoutCostMostRecentVendorInput> = z.object({
  where: z.lazy(() => PurchaseOrderWhereUniqueInputSchema),
  create: z.union([z.lazy(() => PurchaseOrderCreateWithoutCostMostRecentVendorInputSchema), z.lazy(() => PurchaseOrderUncheckedCreateWithoutCostMostRecentVendorInputSchema)]),
}).strict();

export const BookUpsertWithoutCostMostRecentVendorInputSchema: z.ZodType<PrismaClient.Prisma.BookUpsertWithoutCostMostRecentVendorInput> = z.object({
  update: z.union([z.lazy(() => BookUpdateWithoutCostMostRecentVendorInputSchema), z.lazy(() => BookUncheckedUpdateWithoutCostMostRecentVendorInputSchema)]),
  create: z.union([z.lazy(() => BookCreateWithoutCostMostRecentVendorInputSchema), z.lazy(() => BookUncheckedCreateWithoutCostMostRecentVendorInputSchema)]),
}).strict();

export const BookUpdateWithoutCostMostRecentVendorInputSchema: z.ZodType<PrismaClient.Prisma.BookUpdateWithoutCostMostRecentVendorInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_13: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_10: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  publisher: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  publicationYear: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  pageCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  width: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  height: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  thickness: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  retailPrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  inventoryCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  imgUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  authors: z.lazy(() => AuthorUpdateManyWithoutBooksNestedInputSchema).optional(),
  genre: z.lazy(() => GenreUpdateOneRequiredWithoutBooksNestedInputSchema).optional(),
  purchaseLines: z.lazy(() => PurchaseLineUpdateManyWithoutBookNestedInputSchema).optional(),
  salesLines: z.lazy(() => SalesLineUpdateManyWithoutBookNestedInputSchema).optional(),
  buybackLines: z.lazy(() => BuybackLineUpdateManyWithoutBookNestedInputSchema).optional(),
  correction: z.lazy(() => CorrectionUpdateManyWithoutBookNestedInputSchema).optional(),
  relatedBooks: z.lazy(() => BookUpdateManyWithoutSymmetricRelatedBooksNestedInputSchema).optional(),
  symmetricRelatedBooks: z.lazy(() => BookUpdateManyWithoutRelatedBooksNestedInputSchema).optional(),
<<<<<<< HEAD
  booksOnShelves: z.lazy(() => BookOnShelfUpdateManyWithoutBookNestedInputSchema).optional(),
=======
  shelves: z.lazy(() => ShelfUpdateManyWithoutBooksNestedInputSchema).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const BookUncheckedUpdateWithoutCostMostRecentVendorInputSchema: z.ZodType<PrismaClient.Prisma.BookUncheckedUpdateWithoutCostMostRecentVendorInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_13: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_10: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  publisher: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  publicationYear: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  pageCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  width: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  height: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  thickness: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  retailPrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  genreId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  inventoryCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  imgUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  authors: z.lazy(() => AuthorUncheckedUpdateManyWithoutBooksNestedInputSchema).optional(),
  purchaseLines: z.lazy(() => PurchaseLineUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  salesLines: z.lazy(() => SalesLineUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  buybackLines: z.lazy(() => BuybackLineUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  correction: z.lazy(() => CorrectionUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  relatedBooks: z.lazy(() => BookUncheckedUpdateManyWithoutSymmetricRelatedBooksNestedInputSchema).optional(),
  symmetricRelatedBooks: z.lazy(() => BookUncheckedUpdateManyWithoutRelatedBooksNestedInputSchema).optional(),
<<<<<<< HEAD
  booksOnShelves: z.lazy(() => BookOnShelfUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
=======
  shelves: z.lazy(() => ShelfUncheckedUpdateManyWithoutBooksNestedInputSchema).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const VendorUpsertWithoutCostMostRecentVendorInputSchema: z.ZodType<PrismaClient.Prisma.VendorUpsertWithoutCostMostRecentVendorInput> = z.object({
  update: z.union([z.lazy(() => VendorUpdateWithoutCostMostRecentVendorInputSchema), z.lazy(() => VendorUncheckedUpdateWithoutCostMostRecentVendorInputSchema)]),
  create: z.union([z.lazy(() => VendorCreateWithoutCostMostRecentVendorInputSchema), z.lazy(() => VendorUncheckedCreateWithoutCostMostRecentVendorInputSchema)]),
}).strict();

export const VendorUpdateWithoutCostMostRecentVendorInputSchema: z.ZodType<PrismaClient.Prisma.VendorUpdateWithoutCostMostRecentVendorInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  buybackRate: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  purchaseOrder: z.lazy(() => PurchaseOrderUpdateManyWithoutVendorNestedInputSchema).optional(),
  buybackOrders: z.lazy(() => BuybackOrderUpdateManyWithoutVendorNestedInputSchema).optional(),
}).strict();

export const VendorUncheckedUpdateWithoutCostMostRecentVendorInputSchema: z.ZodType<PrismaClient.Prisma.VendorUncheckedUpdateWithoutCostMostRecentVendorInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  buybackRate: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  purchaseOrder: z.lazy(() => PurchaseOrderUncheckedUpdateManyWithoutVendorNestedInputSchema).optional(),
  buybackOrders: z.lazy(() => BuybackOrderUncheckedUpdateManyWithoutVendorNestedInputSchema).optional(),
}).strict();

export const PurchaseLineUpsertWithoutCostMostRecentVendorInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineUpsertWithoutCostMostRecentVendorInput> = z.object({
  update: z.union([z.lazy(() => PurchaseLineUpdateWithoutCostMostRecentVendorInputSchema), z.lazy(() => PurchaseLineUncheckedUpdateWithoutCostMostRecentVendorInputSchema)]),
  create: z.union([z.lazy(() => PurchaseLineCreateWithoutCostMostRecentVendorInputSchema), z.lazy(() => PurchaseLineUncheckedCreateWithoutCostMostRecentVendorInputSchema)]),
}).strict();

export const PurchaseLineUpdateWithoutCostMostRecentVendorInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineUpdateWithoutCostMostRecentVendorInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  unitWholesalePrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  book: z.lazy(() => BookUpdateOneRequiredWithoutPurchaseLinesNestedInputSchema).optional(),
  purchaseOrder: z.lazy(() => PurchaseOrderUpdateOneRequiredWithoutPurchaseLinesNestedInputSchema).optional(),
}).strict();

export const PurchaseLineUncheckedUpdateWithoutCostMostRecentVendorInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineUncheckedUpdateWithoutCostMostRecentVendorInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  bookId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  unitWholesalePrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  purchaseOrderId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const PurchaseOrderUpsertWithoutCostMostRecentVendorInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderUpsertWithoutCostMostRecentVendorInput> = z.object({
  update: z.union([z.lazy(() => PurchaseOrderUpdateWithoutCostMostRecentVendorInputSchema), z.lazy(() => PurchaseOrderUncheckedUpdateWithoutCostMostRecentVendorInputSchema)]),
  create: z.union([z.lazy(() => PurchaseOrderCreateWithoutCostMostRecentVendorInputSchema), z.lazy(() => PurchaseOrderUncheckedCreateWithoutCostMostRecentVendorInputSchema)]),
}).strict();

export const PurchaseOrderUpdateWithoutCostMostRecentVendorInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderUpdateWithoutCostMostRecentVendorInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutPurchaseOrderNestedInputSchema).optional(),
  vendor: z.lazy(() => VendorUpdateOneRequiredWithoutPurchaseOrderNestedInputSchema).optional(),
  purchaseLines: z.lazy(() => PurchaseLineUpdateManyWithoutPurchaseOrderNestedInputSchema).optional(),
}).strict();

export const PurchaseOrderUncheckedUpdateWithoutCostMostRecentVendorInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderUncheckedUpdateWithoutCostMostRecentVendorInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  vendorId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  purchaseLines: z.lazy(() => PurchaseLineUncheckedUpdateManyWithoutPurchaseOrderNestedInputSchema).optional(),
}).strict();

export const UserCreateWithoutCasesCreatedInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateWithoutCasesCreatedInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  password: z.string(),
  role: z.string().optional(),
  display: z.boolean().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  Correction: z.lazy(() => CorrectionCreateNestedManyWithoutUserInputSchema).optional(),
  PurchaseOrder: z.lazy(() => PurchaseOrderCreateNestedManyWithoutUserInputSchema).optional(),
  BuybackOrder: z.lazy(() => BuybackOrderCreateNestedManyWithoutUserInputSchema).optional(),
  casesLastEdited: z.lazy(() => CaseCreateNestedManyWithoutEditorInputSchema).optional(),
}).strict();

export const UserUncheckedCreateWithoutCasesCreatedInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedCreateWithoutCasesCreatedInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  password: z.string(),
  role: z.string().optional(),
  display: z.boolean().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Correction: z.lazy(() => CorrectionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  PurchaseOrder: z.lazy(() => PurchaseOrderUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  BuybackOrder: z.lazy(() => BuybackOrderUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  casesLastEdited: z.lazy(() => CaseUncheckedCreateNestedManyWithoutEditorInputSchema).optional(),
}).strict();

export const UserCreateOrConnectWithoutCasesCreatedInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateOrConnectWithoutCasesCreatedInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([z.lazy(() => UserCreateWithoutCasesCreatedInputSchema), z.lazy(() => UserUncheckedCreateWithoutCasesCreatedInputSchema)]),
}).strict();

export const UserCreateWithoutCasesLastEditedInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateWithoutCasesLastEditedInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  password: z.string(),
  role: z.string().optional(),
  display: z.boolean().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  Correction: z.lazy(() => CorrectionCreateNestedManyWithoutUserInputSchema).optional(),
  PurchaseOrder: z.lazy(() => PurchaseOrderCreateNestedManyWithoutUserInputSchema).optional(),
  BuybackOrder: z.lazy(() => BuybackOrderCreateNestedManyWithoutUserInputSchema).optional(),
  casesCreated: z.lazy(() => CaseCreateNestedManyWithoutCreatorInputSchema).optional(),
}).strict();

export const UserUncheckedCreateWithoutCasesLastEditedInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedCreateWithoutCasesLastEditedInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  password: z.string(),
  role: z.string().optional(),
  display: z.boolean().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Correction: z.lazy(() => CorrectionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  PurchaseOrder: z.lazy(() => PurchaseOrderUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  BuybackOrder: z.lazy(() => BuybackOrderUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  casesCreated: z.lazy(() => CaseUncheckedCreateNestedManyWithoutCreatorInputSchema).optional(),
}).strict();

export const UserCreateOrConnectWithoutCasesLastEditedInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateOrConnectWithoutCasesLastEditedInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([z.lazy(() => UserCreateWithoutCasesLastEditedInputSchema), z.lazy(() => UserUncheckedCreateWithoutCasesLastEditedInputSchema)]),
}).strict();

export const ShelfCreateWithoutCaseInputSchema: z.ZodType<PrismaClient.Prisma.ShelfCreateWithoutCaseInput> = z.object({
  id: z.string().optional(),
  spaceUsed: z.number(),
<<<<<<< HEAD
  booksOnShelf: z.lazy(() => BookOnShelfCreateNestedManyWithoutShelfInputSchema).optional(),
=======
  books: z.lazy(() => BookCreateNestedManyWithoutShelvesInputSchema).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const ShelfUncheckedCreateWithoutCaseInputSchema: z.ZodType<PrismaClient.Prisma.ShelfUncheckedCreateWithoutCaseInput> = z.object({
  id: z.string().optional(),
  spaceUsed: z.number(),
<<<<<<< HEAD
  booksOnShelf: z.lazy(() => BookOnShelfUncheckedCreateNestedManyWithoutShelfInputSchema).optional(),
=======
  books: z.lazy(() => BookUncheckedCreateNestedManyWithoutShelvesInputSchema).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const ShelfCreateOrConnectWithoutCaseInputSchema: z.ZodType<PrismaClient.Prisma.ShelfCreateOrConnectWithoutCaseInput> = z.object({
  where: z.lazy(() => ShelfWhereUniqueInputSchema),
  create: z.union([z.lazy(() => ShelfCreateWithoutCaseInputSchema), z.lazy(() => ShelfUncheckedCreateWithoutCaseInputSchema)]),
}).strict();

export const ShelfCreateManyCaseInputEnvelopeSchema: z.ZodType<PrismaClient.Prisma.ShelfCreateManyCaseInputEnvelope> = z.object({
  data: z.union([z.lazy(() => ShelfCreateManyCaseInputSchema), z.lazy(() => ShelfCreateManyCaseInputSchema).array()]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const UserUpsertWithoutCasesCreatedInputSchema: z.ZodType<PrismaClient.Prisma.UserUpsertWithoutCasesCreatedInput> = z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutCasesCreatedInputSchema), z.lazy(() => UserUncheckedUpdateWithoutCasesCreatedInputSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutCasesCreatedInputSchema), z.lazy(() => UserUncheckedCreateWithoutCasesCreatedInputSchema)]),
}).strict();

export const UserUpdateWithoutCasesCreatedInputSchema: z.ZodType<PrismaClient.Prisma.UserUpdateWithoutCasesCreatedInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  password: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  role: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  Correction: z.lazy(() => CorrectionUpdateManyWithoutUserNestedInputSchema).optional(),
  PurchaseOrder: z.lazy(() => PurchaseOrderUpdateManyWithoutUserNestedInputSchema).optional(),
  BuybackOrder: z.lazy(() => BuybackOrderUpdateManyWithoutUserNestedInputSchema).optional(),
  casesLastEdited: z.lazy(() => CaseUpdateManyWithoutEditorNestedInputSchema).optional(),
}).strict();

export const UserUncheckedUpdateWithoutCasesCreatedInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedUpdateWithoutCasesCreatedInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  password: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  role: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Correction: z.lazy(() => CorrectionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  PurchaseOrder: z.lazy(() => PurchaseOrderUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  BuybackOrder: z.lazy(() => BuybackOrderUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  casesLastEdited: z.lazy(() => CaseUncheckedUpdateManyWithoutEditorNestedInputSchema).optional(),
}).strict();

export const UserUpsertWithoutCasesLastEditedInputSchema: z.ZodType<PrismaClient.Prisma.UserUpsertWithoutCasesLastEditedInput> = z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutCasesLastEditedInputSchema), z.lazy(() => UserUncheckedUpdateWithoutCasesLastEditedInputSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutCasesLastEditedInputSchema), z.lazy(() => UserUncheckedCreateWithoutCasesLastEditedInputSchema)]),
}).strict();

export const UserUpdateWithoutCasesLastEditedInputSchema: z.ZodType<PrismaClient.Prisma.UserUpdateWithoutCasesLastEditedInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  password: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  role: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  Correction: z.lazy(() => CorrectionUpdateManyWithoutUserNestedInputSchema).optional(),
  PurchaseOrder: z.lazy(() => PurchaseOrderUpdateManyWithoutUserNestedInputSchema).optional(),
  BuybackOrder: z.lazy(() => BuybackOrderUpdateManyWithoutUserNestedInputSchema).optional(),
  casesCreated: z.lazy(() => CaseUpdateManyWithoutCreatorNestedInputSchema).optional(),
}).strict();

export const UserUncheckedUpdateWithoutCasesLastEditedInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedUpdateWithoutCasesLastEditedInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  password: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  role: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Correction: z.lazy(() => CorrectionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  PurchaseOrder: z.lazy(() => PurchaseOrderUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  BuybackOrder: z.lazy(() => BuybackOrderUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  casesCreated: z.lazy(() => CaseUncheckedUpdateManyWithoutCreatorNestedInputSchema).optional(),
}).strict();

export const ShelfUpsertWithWhereUniqueWithoutCaseInputSchema: z.ZodType<PrismaClient.Prisma.ShelfUpsertWithWhereUniqueWithoutCaseInput> = z.object({
  where: z.lazy(() => ShelfWhereUniqueInputSchema),
  update: z.union([z.lazy(() => ShelfUpdateWithoutCaseInputSchema), z.lazy(() => ShelfUncheckedUpdateWithoutCaseInputSchema)]),
  create: z.union([z.lazy(() => ShelfCreateWithoutCaseInputSchema), z.lazy(() => ShelfUncheckedCreateWithoutCaseInputSchema)]),
}).strict();

export const ShelfUpdateWithWhereUniqueWithoutCaseInputSchema: z.ZodType<PrismaClient.Prisma.ShelfUpdateWithWhereUniqueWithoutCaseInput> = z.object({
  where: z.lazy(() => ShelfWhereUniqueInputSchema),
  data: z.union([z.lazy(() => ShelfUpdateWithoutCaseInputSchema), z.lazy(() => ShelfUncheckedUpdateWithoutCaseInputSchema)]),
}).strict();

export const ShelfUpdateManyWithWhereWithoutCaseInputSchema: z.ZodType<PrismaClient.Prisma.ShelfUpdateManyWithWhereWithoutCaseInput> = z.object({
  where: z.lazy(() => ShelfScalarWhereInputSchema),
  data: z.union([z.lazy(() => ShelfUpdateManyMutationInputSchema), z.lazy(() => ShelfUncheckedUpdateManyWithoutShelvesInputSchema)]),
}).strict();

export const CaseCreateWithoutShelvesInputSchema: z.ZodType<PrismaClient.Prisma.CaseCreateWithoutShelvesInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  editedAt: z.date().optional(),
  width: z.number(),
  shelfCount: z.number(),
  creator: z.lazy(() => UserCreateNestedOneWithoutCasesCreatedInputSchema),
  editor: z.lazy(() => UserCreateNestedOneWithoutCasesLastEditedInputSchema),
}).strict();

export const CaseUncheckedCreateWithoutShelvesInputSchema: z.ZodType<PrismaClient.Prisma.CaseUncheckedCreateWithoutShelvesInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  creatorId: z.string(),
  editorId: z.string(),
  editedAt: z.date().optional(),
  width: z.number(),
  shelfCount: z.number(),
}).strict();

export const CaseCreateOrConnectWithoutShelvesInputSchema: z.ZodType<PrismaClient.Prisma.CaseCreateOrConnectWithoutShelvesInput> = z.object({
  where: z.lazy(() => CaseWhereUniqueInputSchema),
  create: z.union([z.lazy(() => CaseCreateWithoutShelvesInputSchema), z.lazy(() => CaseUncheckedCreateWithoutShelvesInputSchema)]),
}).strict();

<<<<<<< HEAD
export const BookOnShelfCreateWithoutShelfInputSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfCreateWithoutShelfInput> = z.object({
  id: z.string().optional(),
  orientation: z.string(),
  book: z.lazy(() => BookCreateNestedOneWithoutBooksOnShelvesInputSchema),
}).strict();

export const BookOnShelfUncheckedCreateWithoutShelfInputSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfUncheckedCreateWithoutShelfInput> = z.object({
  id: z.string().optional(),
  bookId: z.string(),
  orientation: z.string(),
}).strict();

export const BookOnShelfCreateOrConnectWithoutShelfInputSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfCreateOrConnectWithoutShelfInput> = z.object({
  where: z.lazy(() => BookOnShelfWhereUniqueInputSchema),
  create: z.union([z.lazy(() => BookOnShelfCreateWithoutShelfInputSchema), z.lazy(() => BookOnShelfUncheckedCreateWithoutShelfInputSchema)]),
}).strict();

export const BookOnShelfCreateManyShelfInputEnvelopeSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfCreateManyShelfInputEnvelope> = z.object({
  data: z.union([z.lazy(() => BookOnShelfCreateManyShelfInputSchema), z.lazy(() => BookOnShelfCreateManyShelfInputSchema).array()]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const CaseUpsertWithoutShelvesInputSchema: z.ZodType<PrismaClient.Prisma.CaseUpsertWithoutShelvesInput> = z.object({
  update: z.union([z.lazy(() => CaseUpdateWithoutShelvesInputSchema), z.lazy(() => CaseUncheckedUpdateWithoutShelvesInputSchema)]),
  create: z.union([z.lazy(() => CaseCreateWithoutShelvesInputSchema), z.lazy(() => CaseUncheckedCreateWithoutShelvesInputSchema)]),
}).strict();

export const CaseUpdateWithoutShelvesInputSchema: z.ZodType<PrismaClient.Prisma.CaseUpdateWithoutShelvesInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  editedAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  width: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  shelfCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  creator: z.lazy(() => UserUpdateOneRequiredWithoutCasesCreatedNestedInputSchema).optional(),
  editor: z.lazy(() => UserUpdateOneRequiredWithoutCasesLastEditedNestedInputSchema).optional(),
}).strict();

export const CaseUncheckedUpdateWithoutShelvesInputSchema: z.ZodType<PrismaClient.Prisma.CaseUncheckedUpdateWithoutShelvesInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  creatorId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  editorId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  editedAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  width: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  shelfCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const BookOnShelfUpsertWithWhereUniqueWithoutShelfInputSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfUpsertWithWhereUniqueWithoutShelfInput> = z.object({
  where: z.lazy(() => BookOnShelfWhereUniqueInputSchema),
  update: z.union([z.lazy(() => BookOnShelfUpdateWithoutShelfInputSchema), z.lazy(() => BookOnShelfUncheckedUpdateWithoutShelfInputSchema)]),
  create: z.union([z.lazy(() => BookOnShelfCreateWithoutShelfInputSchema), z.lazy(() => BookOnShelfUncheckedCreateWithoutShelfInputSchema)]),
}).strict();

export const BookOnShelfUpdateWithWhereUniqueWithoutShelfInputSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfUpdateWithWhereUniqueWithoutShelfInput> = z.object({
  where: z.lazy(() => BookOnShelfWhereUniqueInputSchema),
  data: z.union([z.lazy(() => BookOnShelfUpdateWithoutShelfInputSchema), z.lazy(() => BookOnShelfUncheckedUpdateWithoutShelfInputSchema)]),
}).strict();

export const BookOnShelfUpdateManyWithWhereWithoutShelfInputSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfUpdateManyWithWhereWithoutShelfInput> = z.object({
  where: z.lazy(() => BookOnShelfScalarWhereInputSchema),
  data: z.union([z.lazy(() => BookOnShelfUpdateManyMutationInputSchema), z.lazy(() => BookOnShelfUncheckedUpdateManyWithoutBooksOnShelfInputSchema)]),
}).strict();

export const BookCreateWithoutBooksOnShelvesInputSchema: z.ZodType<PrismaClient.Prisma.BookCreateWithoutBooksOnShelvesInput> = z.object({
=======
export const BookCreateWithoutShelvesInputSchema: z.ZodType<PrismaClient.Prisma.BookCreateWithoutShelvesInput> = z.object({
>>>>>>> tempCaseDesignerBranch
  id: z.string().optional(),
  title: z.string(),
  isbn_13: z.string(),
  isbn_10: z.string().optional().nullable(),
  publisher: z.string(),
  publicationYear: z.number(),
  pageCount: z.number(),
  width: z.number(),
  height: z.number(),
  thickness: z.number(),
  retailPrice: z.number(),
  inventoryCount: z.number(),
  display: z.boolean().optional(),
  imgUrl: z.string().optional().nullable(),
  authors: z.lazy(() => AuthorCreateNestedManyWithoutBooksInputSchema).optional(),
  genre: z.lazy(() => GenreCreateNestedOneWithoutBooksInputSchema),
  purchaseLines: z.lazy(() => PurchaseLineCreateNestedManyWithoutBookInputSchema).optional(),
  salesLines: z.lazy(() => SalesLineCreateNestedManyWithoutBookInputSchema).optional(),
  buybackLines: z.lazy(() => BuybackLineCreateNestedManyWithoutBookInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorCreateNestedManyWithoutBookInputSchema).optional(),
  correction: z.lazy(() => CorrectionCreateNestedManyWithoutBookInputSchema).optional(),
  relatedBooks: z.lazy(() => BookCreateNestedManyWithoutSymmetricRelatedBooksInputSchema).optional(),
  symmetricRelatedBooks: z.lazy(() => BookCreateNestedManyWithoutRelatedBooksInputSchema).optional(),
}).strict();

<<<<<<< HEAD
export const BookUncheckedCreateWithoutBooksOnShelvesInputSchema: z.ZodType<PrismaClient.Prisma.BookUncheckedCreateWithoutBooksOnShelvesInput> = z.object({
=======
export const BookUncheckedCreateWithoutShelvesInputSchema: z.ZodType<PrismaClient.Prisma.BookUncheckedCreateWithoutShelvesInput> = z.object({
>>>>>>> tempCaseDesignerBranch
  id: z.string().optional(),
  title: z.string(),
  isbn_13: z.string(),
  isbn_10: z.string().optional().nullable(),
  publisher: z.string(),
  publicationYear: z.number(),
  pageCount: z.number(),
  width: z.number(),
  height: z.number(),
  thickness: z.number(),
  retailPrice: z.number(),
  genreId: z.string(),
  inventoryCount: z.number(),
  display: z.boolean().optional(),
  imgUrl: z.string().optional().nullable(),
  authors: z.lazy(() => AuthorUncheckedCreateNestedManyWithoutBooksInputSchema).optional(),
  purchaseLines: z.lazy(() => PurchaseLineUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  salesLines: z.lazy(() => SalesLineUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  buybackLines: z.lazy(() => BuybackLineUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  correction: z.lazy(() => CorrectionUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  relatedBooks: z.lazy(() => BookUncheckedCreateNestedManyWithoutSymmetricRelatedBooksInputSchema).optional(),
  symmetricRelatedBooks: z.lazy(() => BookUncheckedCreateNestedManyWithoutRelatedBooksInputSchema).optional(),
}).strict();

<<<<<<< HEAD
export const BookCreateOrConnectWithoutBooksOnShelvesInputSchema: z.ZodType<PrismaClient.Prisma.BookCreateOrConnectWithoutBooksOnShelvesInput> = z.object({
  where: z.lazy(() => BookWhereUniqueInputSchema),
  create: z.union([z.lazy(() => BookCreateWithoutBooksOnShelvesInputSchema), z.lazy(() => BookUncheckedCreateWithoutBooksOnShelvesInputSchema)]),
}).strict();

export const ShelfCreateWithoutBooksOnShelfInputSchema: z.ZodType<PrismaClient.Prisma.ShelfCreateWithoutBooksOnShelfInput> = z.object({
  id: z.string().optional(),
  spaceUsed: z.number(),
  case: z.lazy(() => CaseCreateNestedOneWithoutShelvesInputSchema),
=======
export const BookCreateOrConnectWithoutShelvesInputSchema: z.ZodType<PrismaClient.Prisma.BookCreateOrConnectWithoutShelvesInput> = z.object({
  where: z.lazy(() => BookWhereUniqueInputSchema),
  create: z.union([z.lazy(() => BookCreateWithoutShelvesInputSchema), z.lazy(() => BookUncheckedCreateWithoutShelvesInputSchema)]),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const ShelfUncheckedCreateWithoutBooksOnShelfInputSchema: z.ZodType<PrismaClient.Prisma.ShelfUncheckedCreateWithoutBooksOnShelfInput> = z.object({
  id: z.string().optional(),
  caseId: z.string(),
  spaceUsed: z.number(),
}).strict();

export const ShelfCreateOrConnectWithoutBooksOnShelfInputSchema: z.ZodType<PrismaClient.Prisma.ShelfCreateOrConnectWithoutBooksOnShelfInput> = z.object({
  where: z.lazy(() => ShelfWhereUniqueInputSchema),
  create: z.union([z.lazy(() => ShelfCreateWithoutBooksOnShelfInputSchema), z.lazy(() => ShelfUncheckedCreateWithoutBooksOnShelfInputSchema)]),
}).strict();

export const BookUpsertWithoutBooksOnShelvesInputSchema: z.ZodType<PrismaClient.Prisma.BookUpsertWithoutBooksOnShelvesInput> = z.object({
  update: z.union([z.lazy(() => BookUpdateWithoutBooksOnShelvesInputSchema), z.lazy(() => BookUncheckedUpdateWithoutBooksOnShelvesInputSchema)]),
  create: z.union([z.lazy(() => BookCreateWithoutBooksOnShelvesInputSchema), z.lazy(() => BookUncheckedCreateWithoutBooksOnShelvesInputSchema)]),
}).strict();

export const BookUpdateWithoutBooksOnShelvesInputSchema: z.ZodType<PrismaClient.Prisma.BookUpdateWithoutBooksOnShelvesInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_13: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_10: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  publisher: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  publicationYear: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  pageCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  width: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  height: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  thickness: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  retailPrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  inventoryCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  imgUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  authors: z.lazy(() => AuthorUpdateManyWithoutBooksNestedInputSchema).optional(),
  genre: z.lazy(() => GenreUpdateOneRequiredWithoutBooksNestedInputSchema).optional(),
  purchaseLines: z.lazy(() => PurchaseLineUpdateManyWithoutBookNestedInputSchema).optional(),
  salesLines: z.lazy(() => SalesLineUpdateManyWithoutBookNestedInputSchema).optional(),
  buybackLines: z.lazy(() => BuybackLineUpdateManyWithoutBookNestedInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUpdateManyWithoutBookNestedInputSchema).optional(),
  correction: z.lazy(() => CorrectionUpdateManyWithoutBookNestedInputSchema).optional(),
  relatedBooks: z.lazy(() => BookUpdateManyWithoutSymmetricRelatedBooksNestedInputSchema).optional(),
  symmetricRelatedBooks: z.lazy(() => BookUpdateManyWithoutRelatedBooksNestedInputSchema).optional(),
}).strict();

export const BookUncheckedUpdateWithoutBooksOnShelvesInputSchema: z.ZodType<PrismaClient.Prisma.BookUncheckedUpdateWithoutBooksOnShelvesInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_13: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_10: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  publisher: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  publicationYear: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  pageCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  width: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  height: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  thickness: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  retailPrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  genreId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  inventoryCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  imgUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  authors: z.lazy(() => AuthorUncheckedUpdateManyWithoutBooksNestedInputSchema).optional(),
  purchaseLines: z.lazy(() => PurchaseLineUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  salesLines: z.lazy(() => SalesLineUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  buybackLines: z.lazy(() => BuybackLineUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  correction: z.lazy(() => CorrectionUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  relatedBooks: z.lazy(() => BookUncheckedUpdateManyWithoutSymmetricRelatedBooksNestedInputSchema).optional(),
  symmetricRelatedBooks: z.lazy(() => BookUncheckedUpdateManyWithoutRelatedBooksNestedInputSchema).optional(),
}).strict();

<<<<<<< HEAD
export const ShelfUpsertWithoutBooksOnShelfInputSchema: z.ZodType<PrismaClient.Prisma.ShelfUpsertWithoutBooksOnShelfInput> = z.object({
  update: z.union([z.lazy(() => ShelfUpdateWithoutBooksOnShelfInputSchema), z.lazy(() => ShelfUncheckedUpdateWithoutBooksOnShelfInputSchema)]),
  create: z.union([z.lazy(() => ShelfCreateWithoutBooksOnShelfInputSchema), z.lazy(() => ShelfUncheckedCreateWithoutBooksOnShelfInputSchema)]),
}).strict();

export const ShelfUpdateWithoutBooksOnShelfInputSchema: z.ZodType<PrismaClient.Prisma.ShelfUpdateWithoutBooksOnShelfInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  spaceUsed: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  case: z.lazy(() => CaseUpdateOneRequiredWithoutShelvesNestedInputSchema).optional(),
}).strict();

export const ShelfUncheckedUpdateWithoutBooksOnShelfInputSchema: z.ZodType<PrismaClient.Prisma.ShelfUncheckedUpdateWithoutBooksOnShelfInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  caseId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  spaceUsed: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
=======
export const BookUpsertWithWhereUniqueWithoutShelvesInputSchema: z.ZodType<PrismaClient.Prisma.BookUpsertWithWhereUniqueWithoutShelvesInput> = z.object({
  where: z.lazy(() => BookWhereUniqueInputSchema),
  update: z.union([z.lazy(() => BookUpdateWithoutShelvesInputSchema), z.lazy(() => BookUncheckedUpdateWithoutShelvesInputSchema)]),
  create: z.union([z.lazy(() => BookCreateWithoutShelvesInputSchema), z.lazy(() => BookUncheckedCreateWithoutShelvesInputSchema)]),
}).strict();

export const BookUpdateWithWhereUniqueWithoutShelvesInputSchema: z.ZodType<PrismaClient.Prisma.BookUpdateWithWhereUniqueWithoutShelvesInput> = z.object({
  where: z.lazy(() => BookWhereUniqueInputSchema),
  data: z.union([z.lazy(() => BookUpdateWithoutShelvesInputSchema), z.lazy(() => BookUncheckedUpdateWithoutShelvesInputSchema)]),
}).strict();

export const BookUpdateManyWithWhereWithoutShelvesInputSchema: z.ZodType<PrismaClient.Prisma.BookUpdateManyWithWhereWithoutShelvesInput> = z.object({
  where: z.lazy(() => BookScalarWhereInputSchema),
  data: z.union([z.lazy(() => BookUpdateManyMutationInputSchema), z.lazy(() => BookUncheckedUpdateManyWithoutBooksInputSchema)]),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const UserCreateWithoutAccountsInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateWithoutAccountsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  password: z.string(),
  role: z.string().optional(),
  display: z.boolean().optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  Correction: z.lazy(() => CorrectionCreateNestedManyWithoutUserInputSchema).optional(),
  PurchaseOrder: z.lazy(() => PurchaseOrderCreateNestedManyWithoutUserInputSchema).optional(),
  BuybackOrder: z.lazy(() => BuybackOrderCreateNestedManyWithoutUserInputSchema).optional(),
  casesCreated: z.lazy(() => CaseCreateNestedManyWithoutCreatorInputSchema).optional(),
  casesLastEdited: z.lazy(() => CaseCreateNestedManyWithoutEditorInputSchema).optional(),
}).strict();

export const UserUncheckedCreateWithoutAccountsInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedCreateWithoutAccountsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  password: z.string(),
  role: z.string().optional(),
  display: z.boolean().optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Correction: z.lazy(() => CorrectionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  PurchaseOrder: z.lazy(() => PurchaseOrderUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  BuybackOrder: z.lazy(() => BuybackOrderUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  casesCreated: z.lazy(() => CaseUncheckedCreateNestedManyWithoutCreatorInputSchema).optional(),
  casesLastEdited: z.lazy(() => CaseUncheckedCreateNestedManyWithoutEditorInputSchema).optional(),
}).strict();

export const UserCreateOrConnectWithoutAccountsInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateOrConnectWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([z.lazy(() => UserCreateWithoutAccountsInputSchema), z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema)]),
}).strict();

export const UserUpsertWithoutAccountsInputSchema: z.ZodType<PrismaClient.Prisma.UserUpsertWithoutAccountsInput> = z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutAccountsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutAccountsInputSchema), z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema)]),
}).strict();

export const UserUpdateWithoutAccountsInputSchema: z.ZodType<PrismaClient.Prisma.UserUpdateWithoutAccountsInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  password: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  role: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  Correction: z.lazy(() => CorrectionUpdateManyWithoutUserNestedInputSchema).optional(),
  PurchaseOrder: z.lazy(() => PurchaseOrderUpdateManyWithoutUserNestedInputSchema).optional(),
  BuybackOrder: z.lazy(() => BuybackOrderUpdateManyWithoutUserNestedInputSchema).optional(),
  casesCreated: z.lazy(() => CaseUpdateManyWithoutCreatorNestedInputSchema).optional(),
  casesLastEdited: z.lazy(() => CaseUpdateManyWithoutEditorNestedInputSchema).optional(),
}).strict();

export const UserUncheckedUpdateWithoutAccountsInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedUpdateWithoutAccountsInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  password: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  role: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Correction: z.lazy(() => CorrectionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  PurchaseOrder: z.lazy(() => PurchaseOrderUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  BuybackOrder: z.lazy(() => BuybackOrderUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  casesCreated: z.lazy(() => CaseUncheckedUpdateManyWithoutCreatorNestedInputSchema).optional(),
  casesLastEdited: z.lazy(() => CaseUncheckedUpdateManyWithoutEditorNestedInputSchema).optional(),
}).strict();

export const UserCreateWithoutSessionsInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateWithoutSessionsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  password: z.string(),
  role: z.string().optional(),
  display: z.boolean().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  Correction: z.lazy(() => CorrectionCreateNestedManyWithoutUserInputSchema).optional(),
  PurchaseOrder: z.lazy(() => PurchaseOrderCreateNestedManyWithoutUserInputSchema).optional(),
  BuybackOrder: z.lazy(() => BuybackOrderCreateNestedManyWithoutUserInputSchema).optional(),
  casesCreated: z.lazy(() => CaseCreateNestedManyWithoutCreatorInputSchema).optional(),
  casesLastEdited: z.lazy(() => CaseCreateNestedManyWithoutEditorInputSchema).optional(),
}).strict();

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedCreateWithoutSessionsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  password: z.string(),
  role: z.string().optional(),
  display: z.boolean().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Correction: z.lazy(() => CorrectionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  PurchaseOrder: z.lazy(() => PurchaseOrderUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  BuybackOrder: z.lazy(() => BuybackOrderUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  casesCreated: z.lazy(() => CaseUncheckedCreateNestedManyWithoutCreatorInputSchema).optional(),
  casesLastEdited: z.lazy(() => CaseUncheckedCreateNestedManyWithoutEditorInputSchema).optional(),
}).strict();

export const UserCreateOrConnectWithoutSessionsInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateOrConnectWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([z.lazy(() => UserCreateWithoutSessionsInputSchema), z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema)]),
}).strict();

export const UserUpsertWithoutSessionsInputSchema: z.ZodType<PrismaClient.Prisma.UserUpsertWithoutSessionsInput> = z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutSessionsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutSessionsInputSchema), z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema)]),
}).strict();

export const UserUpdateWithoutSessionsInputSchema: z.ZodType<PrismaClient.Prisma.UserUpdateWithoutSessionsInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  password: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  role: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  Correction: z.lazy(() => CorrectionUpdateManyWithoutUserNestedInputSchema).optional(),
  PurchaseOrder: z.lazy(() => PurchaseOrderUpdateManyWithoutUserNestedInputSchema).optional(),
  BuybackOrder: z.lazy(() => BuybackOrderUpdateManyWithoutUserNestedInputSchema).optional(),
  casesCreated: z.lazy(() => CaseUpdateManyWithoutCreatorNestedInputSchema).optional(),
  casesLastEdited: z.lazy(() => CaseUpdateManyWithoutEditorNestedInputSchema).optional(),
}).strict();

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedUpdateWithoutSessionsInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  password: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  role: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Correction: z.lazy(() => CorrectionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  PurchaseOrder: z.lazy(() => PurchaseOrderUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  BuybackOrder: z.lazy(() => BuybackOrderUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  casesCreated: z.lazy(() => CaseUncheckedUpdateManyWithoutCreatorNestedInputSchema).optional(),
  casesLastEdited: z.lazy(() => CaseUncheckedUpdateManyWithoutEditorNestedInputSchema).optional(),
}).strict();

export const AccountCreateWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.AccountCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
}).strict();

export const AccountUncheckedCreateWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.AccountUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
}).strict();

export const AccountCreateOrConnectWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.AccountCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  create: z.union([z.lazy(() => AccountCreateWithoutUserInputSchema), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema)]),
}).strict();

export const AccountCreateManyUserInputEnvelopeSchema: z.ZodType<PrismaClient.Prisma.AccountCreateManyUserInputEnvelope> = z.object({
  data: z.union([z.lazy(() => AccountCreateManyUserInputSchema), z.lazy(() => AccountCreateManyUserInputSchema).array()]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const SessionCreateWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.SessionCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  expires: z.date(),
}).strict();

export const SessionUncheckedCreateWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.SessionUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  expires: z.date(),
}).strict();

export const SessionCreateOrConnectWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.SessionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  create: z.union([z.lazy(() => SessionCreateWithoutUserInputSchema), z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema)]),
}).strict();

export const SessionCreateManyUserInputEnvelopeSchema: z.ZodType<PrismaClient.Prisma.SessionCreateManyUserInputEnvelope> = z.object({
  data: z.union([z.lazy(() => SessionCreateManyUserInputSchema), z.lazy(() => SessionCreateManyUserInputSchema).array()]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const CorrectionCreateWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.CorrectionCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  date: z.date(),
  quantity: z.number(),
  book: z.lazy(() => BookCreateNestedOneWithoutCorrectionInputSchema),
}).strict();

export const CorrectionUncheckedCreateWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.CorrectionUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  date: z.date(),
  bookId: z.string(),
  quantity: z.number(),
}).strict();

export const CorrectionCreateOrConnectWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.CorrectionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => CorrectionWhereUniqueInputSchema),
  create: z.union([z.lazy(() => CorrectionCreateWithoutUserInputSchema), z.lazy(() => CorrectionUncheckedCreateWithoutUserInputSchema)]),
}).strict();

export const CorrectionCreateManyUserInputEnvelopeSchema: z.ZodType<PrismaClient.Prisma.CorrectionCreateManyUserInputEnvelope> = z.object({
  data: z.union([z.lazy(() => CorrectionCreateManyUserInputSchema), z.lazy(() => CorrectionCreateManyUserInputSchema).array()]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const PurchaseOrderCreateWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  date: z.date(),
  display: z.boolean().optional(),
  vendor: z.lazy(() => VendorCreateNestedOneWithoutPurchaseOrderInputSchema),
  purchaseLines: z.lazy(() => PurchaseLineCreateNestedManyWithoutPurchaseOrderInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorCreateNestedManyWithoutPurchaseOrderInputSchema).optional(),
}).strict();

export const PurchaseOrderUncheckedCreateWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  date: z.date(),
  vendorId: z.string(),
  display: z.boolean().optional(),
  purchaseLines: z.lazy(() => PurchaseLineUncheckedCreateNestedManyWithoutPurchaseOrderInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUncheckedCreateNestedManyWithoutPurchaseOrderInputSchema).optional(),
}).strict();

export const PurchaseOrderCreateOrConnectWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => PurchaseOrderWhereUniqueInputSchema),
  create: z.union([z.lazy(() => PurchaseOrderCreateWithoutUserInputSchema), z.lazy(() => PurchaseOrderUncheckedCreateWithoutUserInputSchema)]),
}).strict();

export const PurchaseOrderCreateManyUserInputEnvelopeSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderCreateManyUserInputEnvelope> = z.object({
  data: z.union([z.lazy(() => PurchaseOrderCreateManyUserInputSchema), z.lazy(() => PurchaseOrderCreateManyUserInputSchema).array()]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const BuybackOrderCreateWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  date: z.date(),
  display: z.boolean().optional(),
  vendor: z.lazy(() => VendorCreateNestedOneWithoutBuybackOrdersInputSchema),
  buybackLines: z.lazy(() => BuybackLineCreateNestedManyWithoutBuybackOrderInputSchema).optional(),
}).strict();

export const BuybackOrderUncheckedCreateWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  date: z.date(),
  vendorId: z.string(),
  display: z.boolean().optional(),
  buybackLines: z.lazy(() => BuybackLineUncheckedCreateNestedManyWithoutBuybackOrderInputSchema).optional(),
}).strict();

export const BuybackOrderCreateOrConnectWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => BuybackOrderWhereUniqueInputSchema),
  create: z.union([z.lazy(() => BuybackOrderCreateWithoutUserInputSchema), z.lazy(() => BuybackOrderUncheckedCreateWithoutUserInputSchema)]),
}).strict();

export const BuybackOrderCreateManyUserInputEnvelopeSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderCreateManyUserInputEnvelope> = z.object({
  data: z.union([z.lazy(() => BuybackOrderCreateManyUserInputSchema), z.lazy(() => BuybackOrderCreateManyUserInputSchema).array()]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const CaseCreateWithoutCreatorInputSchema: z.ZodType<PrismaClient.Prisma.CaseCreateWithoutCreatorInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  editedAt: z.date().optional(),
  width: z.number(),
  shelfCount: z.number(),
  editor: z.lazy(() => UserCreateNestedOneWithoutCasesLastEditedInputSchema),
  shelves: z.lazy(() => ShelfCreateNestedManyWithoutCaseInputSchema).optional(),
}).strict();

export const CaseUncheckedCreateWithoutCreatorInputSchema: z.ZodType<PrismaClient.Prisma.CaseUncheckedCreateWithoutCreatorInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  editorId: z.string(),
  editedAt: z.date().optional(),
  width: z.number(),
  shelfCount: z.number(),
  shelves: z.lazy(() => ShelfUncheckedCreateNestedManyWithoutCaseInputSchema).optional(),
}).strict();

export const CaseCreateOrConnectWithoutCreatorInputSchema: z.ZodType<PrismaClient.Prisma.CaseCreateOrConnectWithoutCreatorInput> = z.object({
  where: z.lazy(() => CaseWhereUniqueInputSchema),
  create: z.union([z.lazy(() => CaseCreateWithoutCreatorInputSchema), z.lazy(() => CaseUncheckedCreateWithoutCreatorInputSchema)]),
}).strict();

export const CaseCreateManyCreatorInputEnvelopeSchema: z.ZodType<PrismaClient.Prisma.CaseCreateManyCreatorInputEnvelope> = z.object({
  data: z.union([z.lazy(() => CaseCreateManyCreatorInputSchema), z.lazy(() => CaseCreateManyCreatorInputSchema).array()]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const CaseCreateWithoutEditorInputSchema: z.ZodType<PrismaClient.Prisma.CaseCreateWithoutEditorInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  editedAt: z.date().optional(),
  width: z.number(),
  shelfCount: z.number(),
  creator: z.lazy(() => UserCreateNestedOneWithoutCasesCreatedInputSchema),
  shelves: z.lazy(() => ShelfCreateNestedManyWithoutCaseInputSchema).optional(),
}).strict();

export const CaseUncheckedCreateWithoutEditorInputSchema: z.ZodType<PrismaClient.Prisma.CaseUncheckedCreateWithoutEditorInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  creatorId: z.string(),
  editedAt: z.date().optional(),
  width: z.number(),
  shelfCount: z.number(),
  shelves: z.lazy(() => ShelfUncheckedCreateNestedManyWithoutCaseInputSchema).optional(),
}).strict();

export const CaseCreateOrConnectWithoutEditorInputSchema: z.ZodType<PrismaClient.Prisma.CaseCreateOrConnectWithoutEditorInput> = z.object({
  where: z.lazy(() => CaseWhereUniqueInputSchema),
  create: z.union([z.lazy(() => CaseCreateWithoutEditorInputSchema), z.lazy(() => CaseUncheckedCreateWithoutEditorInputSchema)]),
}).strict();

export const CaseCreateManyEditorInputEnvelopeSchema: z.ZodType<PrismaClient.Prisma.CaseCreateManyEditorInputEnvelope> = z.object({
  data: z.union([z.lazy(() => CaseCreateManyEditorInputSchema), z.lazy(() => CaseCreateManyEditorInputSchema).array()]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const AccountUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.AccountUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  update: z.union([z.lazy(() => AccountUpdateWithoutUserInputSchema), z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema)]),
  create: z.union([z.lazy(() => AccountCreateWithoutUserInputSchema), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema)]),
}).strict();

export const AccountUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.AccountUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  data: z.union([z.lazy(() => AccountUpdateWithoutUserInputSchema), z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema)]),
}).strict();

export const AccountUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.AccountUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AccountScalarWhereInputSchema),
  data: z.union([z.lazy(() => AccountUpdateManyMutationInputSchema), z.lazy(() => AccountUncheckedUpdateManyWithoutAccountsInputSchema)]),
}).strict();

export const AccountScalarWhereInputSchema: z.ZodType<PrismaClient.Prisma.AccountScalarWhereInput> = z.object({
  AND: z.union([z.lazy(() => AccountScalarWhereInputSchema), z.lazy(() => AccountScalarWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => AccountScalarWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => AccountScalarWhereInputSchema), z.lazy(() => AccountScalarWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  type: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  provider: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  providerAccountId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  refresh_token: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  access_token: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  expires_at: z.union([z.lazy(() => IntNullableFilterSchema), z.number()]).optional().nullable(),
  token_type: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  scope: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  id_token: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  session_state: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
}).strict();

export const SessionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  update: z.union([z.lazy(() => SessionUpdateWithoutUserInputSchema), z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema)]),
  create: z.union([z.lazy(() => SessionCreateWithoutUserInputSchema), z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema)]),
}).strict();

export const SessionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  data: z.union([z.lazy(() => SessionUpdateWithoutUserInputSchema), z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema)]),
}).strict();

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.SessionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SessionScalarWhereInputSchema),
  data: z.union([z.lazy(() => SessionUpdateManyMutationInputSchema), z.lazy(() => SessionUncheckedUpdateManyWithoutSessionsInputSchema)]),
}).strict();

export const SessionScalarWhereInputSchema: z.ZodType<PrismaClient.Prisma.SessionScalarWhereInput> = z.object({
  AND: z.union([z.lazy(() => SessionScalarWhereInputSchema), z.lazy(() => SessionScalarWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => SessionScalarWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => SessionScalarWhereInputSchema), z.lazy(() => SessionScalarWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  sessionToken: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  expires: z.union([z.lazy(() => DateTimeFilterSchema), z.date()]).optional(),
}).strict();

export const CorrectionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.CorrectionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => CorrectionWhereUniqueInputSchema),
  update: z.union([z.lazy(() => CorrectionUpdateWithoutUserInputSchema), z.lazy(() => CorrectionUncheckedUpdateWithoutUserInputSchema)]),
  create: z.union([z.lazy(() => CorrectionCreateWithoutUserInputSchema), z.lazy(() => CorrectionUncheckedCreateWithoutUserInputSchema)]),
}).strict();

export const CorrectionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.CorrectionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => CorrectionWhereUniqueInputSchema),
  data: z.union([z.lazy(() => CorrectionUpdateWithoutUserInputSchema), z.lazy(() => CorrectionUncheckedUpdateWithoutUserInputSchema)]),
}).strict();

export const CorrectionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.CorrectionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => CorrectionScalarWhereInputSchema),
  data: z.union([z.lazy(() => CorrectionUpdateManyMutationInputSchema), z.lazy(() => CorrectionUncheckedUpdateManyWithoutCorrectionInputSchema)]),
}).strict();

export const PurchaseOrderUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => PurchaseOrderWhereUniqueInputSchema),
  update: z.union([z.lazy(() => PurchaseOrderUpdateWithoutUserInputSchema), z.lazy(() => PurchaseOrderUncheckedUpdateWithoutUserInputSchema)]),
  create: z.union([z.lazy(() => PurchaseOrderCreateWithoutUserInputSchema), z.lazy(() => PurchaseOrderUncheckedCreateWithoutUserInputSchema)]),
}).strict();

export const PurchaseOrderUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => PurchaseOrderWhereUniqueInputSchema),
  data: z.union([z.lazy(() => PurchaseOrderUpdateWithoutUserInputSchema), z.lazy(() => PurchaseOrderUncheckedUpdateWithoutUserInputSchema)]),
}).strict();

export const PurchaseOrderUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => PurchaseOrderScalarWhereInputSchema),
  data: z.union([z.lazy(() => PurchaseOrderUpdateManyMutationInputSchema), z.lazy(() => PurchaseOrderUncheckedUpdateManyWithoutPurchaseOrderInputSchema)]),
}).strict();

export const BuybackOrderUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => BuybackOrderWhereUniqueInputSchema),
  update: z.union([z.lazy(() => BuybackOrderUpdateWithoutUserInputSchema), z.lazy(() => BuybackOrderUncheckedUpdateWithoutUserInputSchema)]),
  create: z.union([z.lazy(() => BuybackOrderCreateWithoutUserInputSchema), z.lazy(() => BuybackOrderUncheckedCreateWithoutUserInputSchema)]),
}).strict();

export const BuybackOrderUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => BuybackOrderWhereUniqueInputSchema),
  data: z.union([z.lazy(() => BuybackOrderUpdateWithoutUserInputSchema), z.lazy(() => BuybackOrderUncheckedUpdateWithoutUserInputSchema)]),
}).strict();

export const BuybackOrderUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => BuybackOrderScalarWhereInputSchema),
  data: z.union([z.lazy(() => BuybackOrderUpdateManyMutationInputSchema), z.lazy(() => BuybackOrderUncheckedUpdateManyWithoutBuybackOrderInputSchema)]),
}).strict();

export const CaseUpsertWithWhereUniqueWithoutCreatorInputSchema: z.ZodType<PrismaClient.Prisma.CaseUpsertWithWhereUniqueWithoutCreatorInput> = z.object({
  where: z.lazy(() => CaseWhereUniqueInputSchema),
  update: z.union([z.lazy(() => CaseUpdateWithoutCreatorInputSchema), z.lazy(() => CaseUncheckedUpdateWithoutCreatorInputSchema)]),
  create: z.union([z.lazy(() => CaseCreateWithoutCreatorInputSchema), z.lazy(() => CaseUncheckedCreateWithoutCreatorInputSchema)]),
}).strict();

export const CaseUpdateWithWhereUniqueWithoutCreatorInputSchema: z.ZodType<PrismaClient.Prisma.CaseUpdateWithWhereUniqueWithoutCreatorInput> = z.object({
  where: z.lazy(() => CaseWhereUniqueInputSchema),
  data: z.union([z.lazy(() => CaseUpdateWithoutCreatorInputSchema), z.lazy(() => CaseUncheckedUpdateWithoutCreatorInputSchema)]),
}).strict();

export const CaseUpdateManyWithWhereWithoutCreatorInputSchema: z.ZodType<PrismaClient.Prisma.CaseUpdateManyWithWhereWithoutCreatorInput> = z.object({
  where: z.lazy(() => CaseScalarWhereInputSchema),
  data: z.union([z.lazy(() => CaseUpdateManyMutationInputSchema), z.lazy(() => CaseUncheckedUpdateManyWithoutCasesCreatedInputSchema)]),
}).strict();

export const CaseScalarWhereInputSchema: z.ZodType<PrismaClient.Prisma.CaseScalarWhereInput> = z.object({
  AND: z.union([z.lazy(() => CaseScalarWhereInputSchema), z.lazy(() => CaseScalarWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => CaseScalarWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => CaseScalarWhereInputSchema), z.lazy(() => CaseScalarWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  creatorId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  editorId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  editedAt: z.union([z.lazy(() => DateTimeFilterSchema), z.date()]).optional(),
  width: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
  shelfCount: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
}).strict();

export const CaseUpsertWithWhereUniqueWithoutEditorInputSchema: z.ZodType<PrismaClient.Prisma.CaseUpsertWithWhereUniqueWithoutEditorInput> = z.object({
  where: z.lazy(() => CaseWhereUniqueInputSchema),
  update: z.union([z.lazy(() => CaseUpdateWithoutEditorInputSchema), z.lazy(() => CaseUncheckedUpdateWithoutEditorInputSchema)]),
  create: z.union([z.lazy(() => CaseCreateWithoutEditorInputSchema), z.lazy(() => CaseUncheckedCreateWithoutEditorInputSchema)]),
}).strict();

export const CaseUpdateWithWhereUniqueWithoutEditorInputSchema: z.ZodType<PrismaClient.Prisma.CaseUpdateWithWhereUniqueWithoutEditorInput> = z.object({
  where: z.lazy(() => CaseWhereUniqueInputSchema),
  data: z.union([z.lazy(() => CaseUpdateWithoutEditorInputSchema), z.lazy(() => CaseUncheckedUpdateWithoutEditorInputSchema)]),
}).strict();

export const CaseUpdateManyWithWhereWithoutEditorInputSchema: z.ZodType<PrismaClient.Prisma.CaseUpdateManyWithWhereWithoutEditorInput> = z.object({
  where: z.lazy(() => CaseScalarWhereInputSchema),
  data: z.union([z.lazy(() => CaseUpdateManyMutationInputSchema), z.lazy(() => CaseUncheckedUpdateManyWithoutCasesLastEditedInputSchema)]),
}).strict();

export const PurchaseLineCreateManyBookInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineCreateManyBookInput> = z.object({
  id: z.string().cuid().optional(),
  quantity: z.number(),
  unitWholesalePrice: z.number(),
  purchaseOrderId: z.string(),
  display: z.boolean().optional(),
}).strict();

export const SalesLineCreateManyBookInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineCreateManyBookInput> = z.object({
  id: z.string().cuid().optional(),
  quantity: z.number(),
  unitWholesalePrice: z.number(),
  salesReconciliationId: z.string(),
  display: z.boolean().optional(),
}).strict();

export const BuybackLineCreateManyBookInputSchema: z.ZodType<PrismaClient.Prisma.BuybackLineCreateManyBookInput> = z.object({
  id: z.string().cuid().optional(),
  quantity: z.number(),
  unitBuybackPrice: z.number(),
  buybackOrderId: z.string(),
  display: z.boolean().optional(),
}).strict();

export const CostMostRecentVendorCreateManyBookInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorCreateManyBookInput> = z.object({
  id: z.string().cuid().optional(),
  vendorId: z.string(),
  purchaseLineId: z.string(),
  purchaseOrderId: z.string(),
}).strict();

export const CorrectionCreateManyBookInputSchema: z.ZodType<PrismaClient.Prisma.CorrectionCreateManyBookInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string().optional().nullable(),
  date: z.date(),
  quantity: z.number(),
}).strict();

export const BookOnShelfCreateManyBookInputSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfCreateManyBookInput> = z.object({
  id: z.string().cuid().optional(),
  shelfId: z.string(),
  orientation: z.string(),
}).strict();

export const AuthorUpdateWithoutBooksInputSchema: z.ZodType<PrismaClient.Prisma.AuthorUpdateWithoutBooksInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const AuthorUncheckedUpdateWithoutBooksInputSchema: z.ZodType<PrismaClient.Prisma.AuthorUncheckedUpdateWithoutBooksInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const AuthorUncheckedUpdateManyWithoutAuthorsInputSchema: z.ZodType<PrismaClient.Prisma.AuthorUncheckedUpdateManyWithoutAuthorsInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const PurchaseLineUpdateWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineUpdateWithoutBookInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  unitWholesalePrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  purchaseOrder: z.lazy(() => PurchaseOrderUpdateOneRequiredWithoutPurchaseLinesNestedInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUpdateOneWithoutPurchaseLineNestedInputSchema).optional(),
}).strict();

export const PurchaseLineUncheckedUpdateWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineUncheckedUpdateWithoutBookInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  unitWholesalePrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  purchaseOrderId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUncheckedUpdateOneWithoutPurchaseLineNestedInputSchema).optional(),
}).strict();

export const PurchaseLineUncheckedUpdateManyWithoutPurchaseLinesInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineUncheckedUpdateManyWithoutPurchaseLinesInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  unitWholesalePrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  purchaseOrderId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const SalesLineUpdateWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineUpdateWithoutBookInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  unitWholesalePrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  salesReconciliation: z.lazy(() => SalesReconciliationUpdateOneRequiredWithoutSalesLinesNestedInputSchema).optional(),
}).strict();

export const SalesLineUncheckedUpdateWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineUncheckedUpdateWithoutBookInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  unitWholesalePrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  salesReconciliationId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const SalesLineUncheckedUpdateManyWithoutSalesLinesInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineUncheckedUpdateManyWithoutSalesLinesInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  unitWholesalePrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  salesReconciliationId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const BuybackLineUpdateWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.BuybackLineUpdateWithoutBookInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  unitBuybackPrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  buybackOrder: z.lazy(() => BuybackOrderUpdateOneRequiredWithoutBuybackLinesNestedInputSchema).optional(),
}).strict();

export const BuybackLineUncheckedUpdateWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.BuybackLineUncheckedUpdateWithoutBookInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  unitBuybackPrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  buybackOrderId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const BuybackLineUncheckedUpdateManyWithoutBuybackLinesInputSchema: z.ZodType<PrismaClient.Prisma.BuybackLineUncheckedUpdateManyWithoutBuybackLinesInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  unitBuybackPrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  buybackOrderId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const CostMostRecentVendorUpdateWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorUpdateWithoutBookInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  vendor: z.lazy(() => VendorUpdateOneRequiredWithoutCostMostRecentVendorNestedInputSchema).optional(),
  purchaseLine: z.lazy(() => PurchaseLineUpdateOneRequiredWithoutCostMostRecentVendorNestedInputSchema).optional(),
  purchaseOrder: z.lazy(() => PurchaseOrderUpdateOneRequiredWithoutCostMostRecentVendorNestedInputSchema).optional(),
}).strict();

export const CostMostRecentVendorUncheckedUpdateWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorUncheckedUpdateWithoutBookInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  vendorId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  purchaseLineId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  purchaseOrderId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const CostMostRecentVendorUncheckedUpdateManyWithoutCostMostRecentVendorInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorUncheckedUpdateManyWithoutCostMostRecentVendorInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  vendorId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  purchaseLineId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  purchaseOrderId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const CorrectionUpdateWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.CorrectionUpdateWithoutBookInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutCorrectionNestedInputSchema).optional(),
}).strict();

export const CorrectionUncheckedUpdateWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.CorrectionUncheckedUpdateWithoutBookInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const CorrectionUncheckedUpdateManyWithoutCorrectionInputSchema: z.ZodType<PrismaClient.Prisma.CorrectionUncheckedUpdateManyWithoutCorrectionInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const BookUpdateWithoutSymmetricRelatedBooksInputSchema: z.ZodType<PrismaClient.Prisma.BookUpdateWithoutSymmetricRelatedBooksInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_13: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_10: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  publisher: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  publicationYear: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  pageCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  width: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  height: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  thickness: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  retailPrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  inventoryCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  imgUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  authors: z.lazy(() => AuthorUpdateManyWithoutBooksNestedInputSchema).optional(),
  genre: z.lazy(() => GenreUpdateOneRequiredWithoutBooksNestedInputSchema).optional(),
  purchaseLines: z.lazy(() => PurchaseLineUpdateManyWithoutBookNestedInputSchema).optional(),
  salesLines: z.lazy(() => SalesLineUpdateManyWithoutBookNestedInputSchema).optional(),
  buybackLines: z.lazy(() => BuybackLineUpdateManyWithoutBookNestedInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUpdateManyWithoutBookNestedInputSchema).optional(),
  correction: z.lazy(() => CorrectionUpdateManyWithoutBookNestedInputSchema).optional(),
  relatedBooks: z.lazy(() => BookUpdateManyWithoutSymmetricRelatedBooksNestedInputSchema).optional(),
<<<<<<< HEAD
  booksOnShelves: z.lazy(() => BookOnShelfUpdateManyWithoutBookNestedInputSchema).optional(),
=======
  shelves: z.lazy(() => ShelfUpdateManyWithoutBooksNestedInputSchema).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const BookUncheckedUpdateWithoutSymmetricRelatedBooksInputSchema: z.ZodType<PrismaClient.Prisma.BookUncheckedUpdateWithoutSymmetricRelatedBooksInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_13: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_10: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  publisher: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  publicationYear: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  pageCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  width: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  height: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  thickness: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  retailPrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  genreId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  inventoryCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  imgUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  authors: z.lazy(() => AuthorUncheckedUpdateManyWithoutBooksNestedInputSchema).optional(),
  purchaseLines: z.lazy(() => PurchaseLineUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  salesLines: z.lazy(() => SalesLineUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  buybackLines: z.lazy(() => BuybackLineUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  correction: z.lazy(() => CorrectionUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  relatedBooks: z.lazy(() => BookUncheckedUpdateManyWithoutSymmetricRelatedBooksNestedInputSchema).optional(),
<<<<<<< HEAD
  booksOnShelves: z.lazy(() => BookOnShelfUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
=======
  shelves: z.lazy(() => ShelfUncheckedUpdateManyWithoutBooksNestedInputSchema).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const BookUncheckedUpdateManyWithoutRelatedBooksInputSchema: z.ZodType<PrismaClient.Prisma.BookUncheckedUpdateManyWithoutRelatedBooksInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_13: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_10: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  publisher: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  publicationYear: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  pageCount: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  width: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  height: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  thickness: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  retailPrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  genreId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  inventoryCount: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  imgUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const BookUpdateWithoutRelatedBooksInputSchema: z.ZodType<PrismaClient.Prisma.BookUpdateWithoutRelatedBooksInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_13: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_10: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  publisher: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  publicationYear: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  pageCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  width: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  height: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  thickness: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  retailPrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  inventoryCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  imgUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  authors: z.lazy(() => AuthorUpdateManyWithoutBooksNestedInputSchema).optional(),
  genre: z.lazy(() => GenreUpdateOneRequiredWithoutBooksNestedInputSchema).optional(),
  purchaseLines: z.lazy(() => PurchaseLineUpdateManyWithoutBookNestedInputSchema).optional(),
  salesLines: z.lazy(() => SalesLineUpdateManyWithoutBookNestedInputSchema).optional(),
  buybackLines: z.lazy(() => BuybackLineUpdateManyWithoutBookNestedInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUpdateManyWithoutBookNestedInputSchema).optional(),
  correction: z.lazy(() => CorrectionUpdateManyWithoutBookNestedInputSchema).optional(),
  symmetricRelatedBooks: z.lazy(() => BookUpdateManyWithoutRelatedBooksNestedInputSchema).optional(),
<<<<<<< HEAD
  booksOnShelves: z.lazy(() => BookOnShelfUpdateManyWithoutBookNestedInputSchema).optional(),
=======
  shelves: z.lazy(() => ShelfUpdateManyWithoutBooksNestedInputSchema).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const BookUncheckedUpdateWithoutRelatedBooksInputSchema: z.ZodType<PrismaClient.Prisma.BookUncheckedUpdateWithoutRelatedBooksInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_13: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_10: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  publisher: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  publicationYear: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  pageCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  width: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  height: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  thickness: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  retailPrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  genreId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  inventoryCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  imgUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  authors: z.lazy(() => AuthorUncheckedUpdateManyWithoutBooksNestedInputSchema).optional(),
  purchaseLines: z.lazy(() => PurchaseLineUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  salesLines: z.lazy(() => SalesLineUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  buybackLines: z.lazy(() => BuybackLineUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  correction: z.lazy(() => CorrectionUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  symmetricRelatedBooks: z.lazy(() => BookUncheckedUpdateManyWithoutRelatedBooksNestedInputSchema).optional(),
<<<<<<< HEAD
  booksOnShelves: z.lazy(() => BookOnShelfUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
=======
  shelves: z.lazy(() => ShelfUncheckedUpdateManyWithoutBooksNestedInputSchema).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const BookUncheckedUpdateManyWithoutSymmetricRelatedBooksInputSchema: z.ZodType<PrismaClient.Prisma.BookUncheckedUpdateManyWithoutSymmetricRelatedBooksInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_13: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_10: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  publisher: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  publicationYear: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  pageCount: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  width: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  height: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  thickness: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  retailPrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  genreId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  inventoryCount: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  imgUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

<<<<<<< HEAD
export const BookOnShelfUpdateWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfUpdateWithoutBookInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  orientation: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  shelf: z.lazy(() => ShelfUpdateOneRequiredWithoutBooksOnShelfNestedInputSchema).optional(),
}).strict();

export const BookOnShelfUncheckedUpdateWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfUncheckedUpdateWithoutBookInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  shelfId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  orientation: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const BookOnShelfUncheckedUpdateManyWithoutBooksOnShelvesInputSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfUncheckedUpdateManyWithoutBooksOnShelvesInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  shelfId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  orientation: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
=======
export const ShelfUpdateWithoutBooksInputSchema: z.ZodType<PrismaClient.Prisma.ShelfUpdateWithoutBooksInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  spaceUsed: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  case: z.lazy(() => CaseUpdateOneRequiredWithoutShelvesNestedInputSchema).optional(),
}).strict();

export const ShelfUncheckedUpdateWithoutBooksInputSchema: z.ZodType<PrismaClient.Prisma.ShelfUncheckedUpdateWithoutBooksInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  caseId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  spaceUsed: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const ShelfUncheckedUpdateManyWithoutShelvesInputSchema: z.ZodType<PrismaClient.Prisma.ShelfUncheckedUpdateManyWithoutShelvesInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  caseId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  spaceUsed: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const BookCreateManyGenreInputSchema: z.ZodType<PrismaClient.Prisma.BookCreateManyGenreInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  isbn_13: z.string(),
  isbn_10: z.string().optional().nullable(),
  publisher: z.string(),
  publicationYear: z.number().int(),
  pageCount: z.number().int(),
  width: z.number(),
  height: z.number(),
  thickness: z.number(),
  retailPrice: z.number(),
  inventoryCount: z.number().int(),
  display: z.boolean().optional(),
  imgUrl: z.string().optional().nullable(),
}).strict();

export const BookUpdateWithoutGenreInputSchema: z.ZodType<PrismaClient.Prisma.BookUpdateWithoutGenreInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_13: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_10: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  publisher: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  publicationYear: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  pageCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  width: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  height: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  thickness: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  retailPrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  inventoryCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  imgUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  authors: z.lazy(() => AuthorUpdateManyWithoutBooksNestedInputSchema).optional(),
  purchaseLines: z.lazy(() => PurchaseLineUpdateManyWithoutBookNestedInputSchema).optional(),
  salesLines: z.lazy(() => SalesLineUpdateManyWithoutBookNestedInputSchema).optional(),
  buybackLines: z.lazy(() => BuybackLineUpdateManyWithoutBookNestedInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUpdateManyWithoutBookNestedInputSchema).optional(),
  correction: z.lazy(() => CorrectionUpdateManyWithoutBookNestedInputSchema).optional(),
  relatedBooks: z.lazy(() => BookUpdateManyWithoutSymmetricRelatedBooksNestedInputSchema).optional(),
  symmetricRelatedBooks: z.lazy(() => BookUpdateManyWithoutRelatedBooksNestedInputSchema).optional(),
<<<<<<< HEAD
  booksOnShelves: z.lazy(() => BookOnShelfUpdateManyWithoutBookNestedInputSchema).optional(),
=======
  shelves: z.lazy(() => ShelfUpdateManyWithoutBooksNestedInputSchema).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const BookUncheckedUpdateWithoutGenreInputSchema: z.ZodType<PrismaClient.Prisma.BookUncheckedUpdateWithoutGenreInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_13: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_10: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  publisher: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  publicationYear: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  pageCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  width: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  height: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  thickness: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  retailPrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  inventoryCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  imgUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  authors: z.lazy(() => AuthorUncheckedUpdateManyWithoutBooksNestedInputSchema).optional(),
  purchaseLines: z.lazy(() => PurchaseLineUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  salesLines: z.lazy(() => SalesLineUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  buybackLines: z.lazy(() => BuybackLineUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  correction: z.lazy(() => CorrectionUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  relatedBooks: z.lazy(() => BookUncheckedUpdateManyWithoutSymmetricRelatedBooksNestedInputSchema).optional(),
  symmetricRelatedBooks: z.lazy(() => BookUncheckedUpdateManyWithoutRelatedBooksNestedInputSchema).optional(),
<<<<<<< HEAD
  booksOnShelves: z.lazy(() => BookOnShelfUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
=======
  shelves: z.lazy(() => ShelfUncheckedUpdateManyWithoutBooksNestedInputSchema).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const BookUncheckedUpdateManyWithoutBooksInputSchema: z.ZodType<PrismaClient.Prisma.BookUncheckedUpdateManyWithoutBooksInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_13: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_10: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  publisher: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  publicationYear: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  pageCount: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  width: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  height: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  thickness: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  retailPrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  inventoryCount: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  imgUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const BookUpdateWithoutAuthorsInputSchema: z.ZodType<PrismaClient.Prisma.BookUpdateWithoutAuthorsInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_13: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_10: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  publisher: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  publicationYear: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  pageCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  width: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  height: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  thickness: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  retailPrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  inventoryCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  imgUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  genre: z.lazy(() => GenreUpdateOneRequiredWithoutBooksNestedInputSchema).optional(),
  purchaseLines: z.lazy(() => PurchaseLineUpdateManyWithoutBookNestedInputSchema).optional(),
  salesLines: z.lazy(() => SalesLineUpdateManyWithoutBookNestedInputSchema).optional(),
  buybackLines: z.lazy(() => BuybackLineUpdateManyWithoutBookNestedInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUpdateManyWithoutBookNestedInputSchema).optional(),
  correction: z.lazy(() => CorrectionUpdateManyWithoutBookNestedInputSchema).optional(),
  relatedBooks: z.lazy(() => BookUpdateManyWithoutSymmetricRelatedBooksNestedInputSchema).optional(),
  symmetricRelatedBooks: z.lazy(() => BookUpdateManyWithoutRelatedBooksNestedInputSchema).optional(),
<<<<<<< HEAD
  booksOnShelves: z.lazy(() => BookOnShelfUpdateManyWithoutBookNestedInputSchema).optional(),
=======
  shelves: z.lazy(() => ShelfUpdateManyWithoutBooksNestedInputSchema).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const BookUncheckedUpdateWithoutAuthorsInputSchema: z.ZodType<PrismaClient.Prisma.BookUncheckedUpdateWithoutAuthorsInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_13: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_10: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  publisher: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  publicationYear: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  pageCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  width: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  height: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  thickness: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  retailPrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  genreId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  inventoryCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  imgUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  purchaseLines: z.lazy(() => PurchaseLineUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  salesLines: z.lazy(() => SalesLineUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  buybackLines: z.lazy(() => BuybackLineUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  correction: z.lazy(() => CorrectionUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  relatedBooks: z.lazy(() => BookUncheckedUpdateManyWithoutSymmetricRelatedBooksNestedInputSchema).optional(),
  symmetricRelatedBooks: z.lazy(() => BookUncheckedUpdateManyWithoutRelatedBooksNestedInputSchema).optional(),
<<<<<<< HEAD
  booksOnShelves: z.lazy(() => BookOnShelfUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
=======
  shelves: z.lazy(() => ShelfUncheckedUpdateManyWithoutBooksNestedInputSchema).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const PurchaseOrderCreateManyVendorInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderCreateManyVendorInput> = z.object({
  id: z.string().cuid().optional(),
  date: z.date(),
  userId: z.string().optional().nullable(),
  display: z.boolean().optional(),
}).strict();

export const BuybackOrderCreateManyVendorInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderCreateManyVendorInput> = z.object({
  id: z.string().cuid().optional(),
  date: z.date(),
  userId: z.string().optional().nullable(),
  display: z.boolean().optional(),
}).strict();

export const CostMostRecentVendorCreateManyVendorInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorCreateManyVendorInput> = z.object({
  id: z.string().cuid().optional(),
  bookId: z.string(),
  purchaseLineId: z.string(),
  purchaseOrderId: z.string(),
}).strict();

export const PurchaseOrderUpdateWithoutVendorInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderUpdateWithoutVendorInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutPurchaseOrderNestedInputSchema).optional(),
  purchaseLines: z.lazy(() => PurchaseLineUpdateManyWithoutPurchaseOrderNestedInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUpdateManyWithoutPurchaseOrderNestedInputSchema).optional(),
}).strict();

export const PurchaseOrderUncheckedUpdateWithoutVendorInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderUncheckedUpdateWithoutVendorInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  purchaseLines: z.lazy(() => PurchaseLineUncheckedUpdateManyWithoutPurchaseOrderNestedInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUncheckedUpdateManyWithoutPurchaseOrderNestedInputSchema).optional(),
}).strict();

export const PurchaseOrderUncheckedUpdateManyWithoutPurchaseOrderInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderUncheckedUpdateManyWithoutPurchaseOrderInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const BuybackOrderUpdateWithoutVendorInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderUpdateWithoutVendorInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutBuybackOrderNestedInputSchema).optional(),
  buybackLines: z.lazy(() => BuybackLineUpdateManyWithoutBuybackOrderNestedInputSchema).optional(),
}).strict();

export const BuybackOrderUncheckedUpdateWithoutVendorInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderUncheckedUpdateWithoutVendorInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  buybackLines: z.lazy(() => BuybackLineUncheckedUpdateManyWithoutBuybackOrderNestedInputSchema).optional(),
}).strict();

export const BuybackOrderUncheckedUpdateManyWithoutBuybackOrdersInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderUncheckedUpdateManyWithoutBuybackOrdersInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const CostMostRecentVendorUpdateWithoutVendorInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorUpdateWithoutVendorInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  book: z.lazy(() => BookUpdateOneRequiredWithoutCostMostRecentVendorNestedInputSchema).optional(),
  purchaseLine: z.lazy(() => PurchaseLineUpdateOneRequiredWithoutCostMostRecentVendorNestedInputSchema).optional(),
  purchaseOrder: z.lazy(() => PurchaseOrderUpdateOneRequiredWithoutCostMostRecentVendorNestedInputSchema).optional(),
}).strict();

export const CostMostRecentVendorUncheckedUpdateWithoutVendorInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorUncheckedUpdateWithoutVendorInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  bookId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  purchaseLineId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  purchaseOrderId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const PurchaseLineCreateManyPurchaseOrderInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineCreateManyPurchaseOrderInput> = z.object({
  id: z.string().cuid().optional(),
  bookId: z.string(),
  quantity: z.number(),
  unitWholesalePrice: z.number(),
  display: z.boolean().optional(),
}).strict();

export const CostMostRecentVendorCreateManyPurchaseOrderInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorCreateManyPurchaseOrderInput> = z.object({
  id: z.string().cuid().optional(),
  bookId: z.string(),
  vendorId: z.string(),
  purchaseLineId: z.string(),
}).strict();

export const PurchaseLineUpdateWithoutPurchaseOrderInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineUpdateWithoutPurchaseOrderInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  unitWholesalePrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  book: z.lazy(() => BookUpdateOneRequiredWithoutPurchaseLinesNestedInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUpdateOneWithoutPurchaseLineNestedInputSchema).optional(),
}).strict();

export const PurchaseLineUncheckedUpdateWithoutPurchaseOrderInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineUncheckedUpdateWithoutPurchaseOrderInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  bookId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  unitWholesalePrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUncheckedUpdateOneWithoutPurchaseLineNestedInputSchema).optional(),
}).strict();

export const CostMostRecentVendorUpdateWithoutPurchaseOrderInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorUpdateWithoutPurchaseOrderInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  book: z.lazy(() => BookUpdateOneRequiredWithoutCostMostRecentVendorNestedInputSchema).optional(),
  vendor: z.lazy(() => VendorUpdateOneRequiredWithoutCostMostRecentVendorNestedInputSchema).optional(),
  purchaseLine: z.lazy(() => PurchaseLineUpdateOneRequiredWithoutCostMostRecentVendorNestedInputSchema).optional(),
}).strict();

export const CostMostRecentVendorUncheckedUpdateWithoutPurchaseOrderInputSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorUncheckedUpdateWithoutPurchaseOrderInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  bookId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  vendorId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  purchaseLineId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const SalesLineCreateManySalesReconciliationInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineCreateManySalesReconciliationInput> = z.object({
  id: z.string().cuid().optional(),
  bookId: z.string(),
  quantity: z.number(),
  unitWholesalePrice: z.number(),
  display: z.boolean().optional(),
}).strict();

export const SalesLineUpdateWithoutSalesReconciliationInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineUpdateWithoutSalesReconciliationInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  unitWholesalePrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  book: z.lazy(() => BookUpdateOneRequiredWithoutSalesLinesNestedInputSchema).optional(),
}).strict();

export const SalesLineUncheckedUpdateWithoutSalesReconciliationInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineUncheckedUpdateWithoutSalesReconciliationInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  bookId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  unitWholesalePrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const BuybackLineCreateManyBuybackOrderInputSchema: z.ZodType<PrismaClient.Prisma.BuybackLineCreateManyBuybackOrderInput> = z.object({
  id: z.string().cuid().optional(),
  bookId: z.string(),
  quantity: z.number(),
  unitBuybackPrice: z.number(),
  display: z.boolean().optional(),
}).strict();

export const BuybackLineUpdateWithoutBuybackOrderInputSchema: z.ZodType<PrismaClient.Prisma.BuybackLineUpdateWithoutBuybackOrderInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  unitBuybackPrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  book: z.lazy(() => BookUpdateOneRequiredWithoutBuybackLinesNestedInputSchema).optional(),
}).strict();

export const BuybackLineUncheckedUpdateWithoutBuybackOrderInputSchema: z.ZodType<PrismaClient.Prisma.BuybackLineUncheckedUpdateWithoutBuybackOrderInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  bookId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  unitBuybackPrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const ShelfCreateManyCaseInputSchema: z.ZodType<PrismaClient.Prisma.ShelfCreateManyCaseInput> = z.object({
  id: z.string().cuid().optional(),
  spaceUsed: z.number(),
}).strict();

export const ShelfUpdateWithoutCaseInputSchema: z.ZodType<PrismaClient.Prisma.ShelfUpdateWithoutCaseInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  spaceUsed: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
<<<<<<< HEAD
  booksOnShelf: z.lazy(() => BookOnShelfUpdateManyWithoutShelfNestedInputSchema).optional(),
=======
  books: z.lazy(() => BookUpdateManyWithoutShelvesNestedInputSchema).optional(),
>>>>>>> tempCaseDesignerBranch
}).strict();

export const ShelfUncheckedUpdateWithoutCaseInputSchema: z.ZodType<PrismaClient.Prisma.ShelfUncheckedUpdateWithoutCaseInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  spaceUsed: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
<<<<<<< HEAD
  booksOnShelf: z.lazy(() => BookOnShelfUncheckedUpdateManyWithoutShelfNestedInputSchema).optional(),
}).strict();

export const ShelfUncheckedUpdateManyWithoutShelvesInputSchema: z.ZodType<PrismaClient.Prisma.ShelfUncheckedUpdateManyWithoutShelvesInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  spaceUsed: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const BookOnShelfCreateManyShelfInputSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfCreateManyShelfInput> = z.object({
  id: z.string().cuid().optional(),
  bookId: z.string(),
  orientation: z.string(),
}).strict();

export const BookOnShelfUpdateWithoutShelfInputSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfUpdateWithoutShelfInput> = z.object({
=======
  books: z.lazy(() => BookUncheckedUpdateManyWithoutShelvesNestedInputSchema).optional(),
}).strict();

export const BookUpdateWithoutShelvesInputSchema: z.ZodType<PrismaClient.Prisma.BookUpdateWithoutShelvesInput> = z.object({
>>>>>>> tempCaseDesignerBranch
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  orientation: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  book: z.lazy(() => BookUpdateOneRequiredWithoutBooksOnShelvesNestedInputSchema).optional(),
}).strict();

<<<<<<< HEAD
export const BookOnShelfUncheckedUpdateWithoutShelfInputSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfUncheckedUpdateWithoutShelfInput> = z.object({
=======
export const BookUncheckedUpdateWithoutShelvesInputSchema: z.ZodType<PrismaClient.Prisma.BookUncheckedUpdateWithoutShelvesInput> = z.object({
>>>>>>> tempCaseDesignerBranch
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  bookId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  orientation: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const BookOnShelfUncheckedUpdateManyWithoutBooksOnShelfInputSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfUncheckedUpdateManyWithoutBooksOnShelfInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  bookId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  orientation: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const AccountCreateManyUserInputSchema: z.ZodType<PrismaClient.Prisma.AccountCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
}).strict();

export const SessionCreateManyUserInputSchema: z.ZodType<PrismaClient.Prisma.SessionCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.date(),
}).strict();

export const CorrectionCreateManyUserInputSchema: z.ZodType<PrismaClient.Prisma.CorrectionCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  date: z.date(),
  bookId: z.string(),
  quantity: z.number().int(),
}).strict();

export const PurchaseOrderCreateManyUserInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  date: z.date(),
  vendorId: z.string(),
  display: z.boolean().optional(),
}).strict();

export const BuybackOrderCreateManyUserInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  date: z.date(),
  vendorId: z.string(),
  display: z.boolean().optional(),
}).strict();

export const CaseCreateManyCreatorInputSchema: z.ZodType<PrismaClient.Prisma.CaseCreateManyCreatorInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  editorId: z.string(),
  editedAt: z.date().optional(),
  width: z.number(),
  shelfCount: z.number().int(),
}).strict();

export const CaseCreateManyEditorInputSchema: z.ZodType<PrismaClient.Prisma.CaseCreateManyEditorInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  creatorId: z.string(),
  editedAt: z.date().optional(),
  width: z.number(),
  shelfCount: z.number().int(),
}).strict();

export const AccountUpdateWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.AccountUpdateWithoutUserInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  type: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  provider: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  providerAccountId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  refresh_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  access_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  expires_at: z.union([z.number(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  token_type: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  scope: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  id_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  session_state: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.AccountUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  type: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  provider: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  providerAccountId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  refresh_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  access_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  expires_at: z.union([z.number(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  token_type: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  scope: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  id_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  session_state: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateManyWithoutAccountsInputSchema: z.ZodType<PrismaClient.Prisma.AccountUncheckedUpdateManyWithoutAccountsInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  type: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  provider: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  providerAccountId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  refresh_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  access_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  expires_at: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  token_type: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  scope: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  id_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  session_state: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const SessionUpdateWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.SessionUpdateWithoutUserInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  sessionToken: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  expires: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const SessionUncheckedUpdateWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.SessionUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  sessionToken: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  expires: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutSessionsInputSchema: z.ZodType<PrismaClient.Prisma.SessionUncheckedUpdateManyWithoutSessionsInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  sessionToken: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  expires: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const CorrectionUpdateWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.CorrectionUpdateWithoutUserInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  book: z.lazy(() => BookUpdateOneRequiredWithoutCorrectionNestedInputSchema).optional(),
}).strict();

export const CorrectionUncheckedUpdateWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.CorrectionUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  bookId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const PurchaseOrderUpdateWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderUpdateWithoutUserInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  vendor: z.lazy(() => VendorUpdateOneRequiredWithoutPurchaseOrderNestedInputSchema).optional(),
  purchaseLines: z.lazy(() => PurchaseLineUpdateManyWithoutPurchaseOrderNestedInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUpdateManyWithoutPurchaseOrderNestedInputSchema).optional(),
}).strict();

export const PurchaseOrderUncheckedUpdateWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  vendorId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  purchaseLines: z.lazy(() => PurchaseLineUncheckedUpdateManyWithoutPurchaseOrderNestedInputSchema).optional(),
  costMostRecentVendor: z.lazy(() => CostMostRecentVendorUncheckedUpdateManyWithoutPurchaseOrderNestedInputSchema).optional(),
}).strict();

export const BuybackOrderUpdateWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderUpdateWithoutUserInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  vendor: z.lazy(() => VendorUpdateOneRequiredWithoutBuybackOrdersNestedInputSchema).optional(),
  buybackLines: z.lazy(() => BuybackLineUpdateManyWithoutBuybackOrderNestedInputSchema).optional(),
}).strict();

export const BuybackOrderUncheckedUpdateWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  vendorId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  buybackLines: z.lazy(() => BuybackLineUncheckedUpdateManyWithoutBuybackOrderNestedInputSchema).optional(),
}).strict();

export const BuybackOrderUncheckedUpdateManyWithoutBuybackOrderInputSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderUncheckedUpdateManyWithoutBuybackOrderInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  vendorId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  display: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const CaseUpdateWithoutCreatorInputSchema: z.ZodType<PrismaClient.Prisma.CaseUpdateWithoutCreatorInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  editedAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  width: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  shelfCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  editor: z.lazy(() => UserUpdateOneRequiredWithoutCasesLastEditedNestedInputSchema).optional(),
  shelves: z.lazy(() => ShelfUpdateManyWithoutCaseNestedInputSchema).optional(),
}).strict();

export const CaseUncheckedUpdateWithoutCreatorInputSchema: z.ZodType<PrismaClient.Prisma.CaseUncheckedUpdateWithoutCreatorInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  editorId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  editedAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  width: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  shelfCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  shelves: z.lazy(() => ShelfUncheckedUpdateManyWithoutCaseNestedInputSchema).optional(),
}).strict();

export const CaseUncheckedUpdateManyWithoutCasesCreatedInputSchema: z.ZodType<PrismaClient.Prisma.CaseUncheckedUpdateManyWithoutCasesCreatedInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  editorId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  editedAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  width: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  shelfCount: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const CaseUpdateWithoutEditorInputSchema: z.ZodType<PrismaClient.Prisma.CaseUpdateWithoutEditorInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  editedAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  width: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  shelfCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  creator: z.lazy(() => UserUpdateOneRequiredWithoutCasesCreatedNestedInputSchema).optional(),
  shelves: z.lazy(() => ShelfUpdateManyWithoutCaseNestedInputSchema).optional(),
}).strict();

export const CaseUncheckedUpdateWithoutEditorInputSchema: z.ZodType<PrismaClient.Prisma.CaseUncheckedUpdateWithoutEditorInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  creatorId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  editedAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  width: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  shelfCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  shelves: z.lazy(() => ShelfUncheckedUpdateManyWithoutCaseNestedInputSchema).optional(),
}).strict();

export const CaseUncheckedUpdateManyWithoutCasesLastEditedInputSchema: z.ZodType<PrismaClient.Prisma.CaseUncheckedUpdateManyWithoutCasesLastEditedInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  creatorId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  editedAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  width: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  shelfCount: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const BookFindFirstArgsSchema: z.ZodType<PrismaClient.Prisma.BookFindFirstArgs> = z.object({
  select: BookSelectSchema.optional(),
  include: BookIncludeSchema.optional(),
  where: BookWhereInputSchema.optional(),
  orderBy: z.union([BookOrderByWithRelationInputSchema.array(), BookOrderByWithRelationInputSchema]).optional(),
  cursor: BookWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: BookScalarFieldEnumSchema.array().optional(),
}).strict();

export const BookFindFirstOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.BookFindFirstOrThrowArgs> = z.object({
  select: BookSelectSchema.optional(),
  include: BookIncludeSchema.optional(),
  where: BookWhereInputSchema.optional(),
  orderBy: z.union([BookOrderByWithRelationInputSchema.array(), BookOrderByWithRelationInputSchema]).optional(),
  cursor: BookWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: BookScalarFieldEnumSchema.array().optional(),
}).strict();

export const BookFindManyArgsSchema: z.ZodType<PrismaClient.Prisma.BookFindManyArgs> = z.object({
  select: BookSelectSchema.optional(),
  include: BookIncludeSchema.optional(),
  where: BookWhereInputSchema.optional(),
  orderBy: z.union([BookOrderByWithRelationInputSchema.array(), BookOrderByWithRelationInputSchema]).optional(),
  cursor: BookWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: BookScalarFieldEnumSchema.array().optional(),
}).strict();

export const BookAggregateArgsSchema: z.ZodType<PrismaClient.Prisma.BookAggregateArgs> = z.object({
  select: BookSelectSchema.optional(),
  include: BookIncludeSchema.optional(),
  where: BookWhereInputSchema.optional(),
  orderBy: z.union([BookOrderByWithRelationInputSchema.array(), BookOrderByWithRelationInputSchema]).optional(),
  cursor: BookWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const BookGroupByArgsSchema: z.ZodType<PrismaClient.Prisma.BookGroupByArgs> = z.object({
  select: BookSelectSchema.optional(),
  include: BookIncludeSchema.optional(),
  where: BookWhereInputSchema.optional(),
  orderBy: z.union([BookOrderByWithAggregationInputSchema.array(), BookOrderByWithAggregationInputSchema]).optional(),
  by: BookScalarFieldEnumSchema.array(),
  having: BookScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const BookFindUniqueArgsSchema: z.ZodType<PrismaClient.Prisma.BookFindUniqueArgs> = z.object({
  select: BookSelectSchema.optional(),
  include: BookIncludeSchema.optional(),
  where: BookWhereUniqueInputSchema,
}).strict();

export const BookFindUniqueOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.BookFindUniqueOrThrowArgs> = z.object({
  select: BookSelectSchema.optional(),
  include: BookIncludeSchema.optional(),
  where: BookWhereUniqueInputSchema,
}).strict();

export const GenreFindFirstArgsSchema: z.ZodType<PrismaClient.Prisma.GenreFindFirstArgs> = z.object({
  select: GenreSelectSchema.optional(),
  include: GenreIncludeSchema.optional(),
  where: GenreWhereInputSchema.optional(),
  orderBy: z.union([GenreOrderByWithRelationInputSchema.array(), GenreOrderByWithRelationInputSchema]).optional(),
  cursor: GenreWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: GenreScalarFieldEnumSchema.array().optional(),
}).strict();

export const GenreFindFirstOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.GenreFindFirstOrThrowArgs> = z.object({
  select: GenreSelectSchema.optional(),
  include: GenreIncludeSchema.optional(),
  where: GenreWhereInputSchema.optional(),
  orderBy: z.union([GenreOrderByWithRelationInputSchema.array(), GenreOrderByWithRelationInputSchema]).optional(),
  cursor: GenreWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: GenreScalarFieldEnumSchema.array().optional(),
}).strict();

export const GenreFindManyArgsSchema: z.ZodType<PrismaClient.Prisma.GenreFindManyArgs> = z.object({
  select: GenreSelectSchema.optional(),
  include: GenreIncludeSchema.optional(),
  where: GenreWhereInputSchema.optional(),
  orderBy: z.union([GenreOrderByWithRelationInputSchema.array(), GenreOrderByWithRelationInputSchema]).optional(),
  cursor: GenreWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: GenreScalarFieldEnumSchema.array().optional(),
}).strict();

export const GenreAggregateArgsSchema: z.ZodType<PrismaClient.Prisma.GenreAggregateArgs> = z.object({
  select: GenreSelectSchema.optional(),
  include: GenreIncludeSchema.optional(),
  where: GenreWhereInputSchema.optional(),
  orderBy: z.union([GenreOrderByWithRelationInputSchema.array(), GenreOrderByWithRelationInputSchema]).optional(),
  cursor: GenreWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const GenreGroupByArgsSchema: z.ZodType<PrismaClient.Prisma.GenreGroupByArgs> = z.object({
  select: GenreSelectSchema.optional(),
  include: GenreIncludeSchema.optional(),
  where: GenreWhereInputSchema.optional(),
  orderBy: z.union([GenreOrderByWithAggregationInputSchema.array(), GenreOrderByWithAggregationInputSchema]).optional(),
  by: GenreScalarFieldEnumSchema.array(),
  having: GenreScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const GenreFindUniqueArgsSchema: z.ZodType<PrismaClient.Prisma.GenreFindUniqueArgs> = z.object({
  select: GenreSelectSchema.optional(),
  include: GenreIncludeSchema.optional(),
  where: GenreWhereUniqueInputSchema,
}).strict();

export const GenreFindUniqueOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.GenreFindUniqueOrThrowArgs> = z.object({
  select: GenreSelectSchema.optional(),
  include: GenreIncludeSchema.optional(),
  where: GenreWhereUniqueInputSchema,
}).strict();

export const AuthorFindFirstArgsSchema: z.ZodType<PrismaClient.Prisma.AuthorFindFirstArgs> = z.object({
  select: AuthorSelectSchema.optional(),
  include: AuthorIncludeSchema.optional(),
  where: AuthorWhereInputSchema.optional(),
  orderBy: z.union([AuthorOrderByWithRelationInputSchema.array(), AuthorOrderByWithRelationInputSchema]).optional(),
  cursor: AuthorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: AuthorScalarFieldEnumSchema.array().optional(),
}).strict();

export const AuthorFindFirstOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.AuthorFindFirstOrThrowArgs> = z.object({
  select: AuthorSelectSchema.optional(),
  include: AuthorIncludeSchema.optional(),
  where: AuthorWhereInputSchema.optional(),
  orderBy: z.union([AuthorOrderByWithRelationInputSchema.array(), AuthorOrderByWithRelationInputSchema]).optional(),
  cursor: AuthorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: AuthorScalarFieldEnumSchema.array().optional(),
}).strict();

export const AuthorFindManyArgsSchema: z.ZodType<PrismaClient.Prisma.AuthorFindManyArgs> = z.object({
  select: AuthorSelectSchema.optional(),
  include: AuthorIncludeSchema.optional(),
  where: AuthorWhereInputSchema.optional(),
  orderBy: z.union([AuthorOrderByWithRelationInputSchema.array(), AuthorOrderByWithRelationInputSchema]).optional(),
  cursor: AuthorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: AuthorScalarFieldEnumSchema.array().optional(),
}).strict();

export const AuthorAggregateArgsSchema: z.ZodType<PrismaClient.Prisma.AuthorAggregateArgs> = z.object({
  select: AuthorSelectSchema.optional(),
  include: AuthorIncludeSchema.optional(),
  where: AuthorWhereInputSchema.optional(),
  orderBy: z.union([AuthorOrderByWithRelationInputSchema.array(), AuthorOrderByWithRelationInputSchema]).optional(),
  cursor: AuthorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const AuthorGroupByArgsSchema: z.ZodType<PrismaClient.Prisma.AuthorGroupByArgs> = z.object({
  select: AuthorSelectSchema.optional(),
  include: AuthorIncludeSchema.optional(),
  where: AuthorWhereInputSchema.optional(),
  orderBy: z.union([AuthorOrderByWithAggregationInputSchema.array(), AuthorOrderByWithAggregationInputSchema]).optional(),
  by: AuthorScalarFieldEnumSchema.array(),
  having: AuthorScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const AuthorFindUniqueArgsSchema: z.ZodType<PrismaClient.Prisma.AuthorFindUniqueArgs> = z.object({
  select: AuthorSelectSchema.optional(),
  include: AuthorIncludeSchema.optional(),
  where: AuthorWhereUniqueInputSchema,
}).strict();

export const AuthorFindUniqueOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.AuthorFindUniqueOrThrowArgs> = z.object({
  select: AuthorSelectSchema.optional(),
  include: AuthorIncludeSchema.optional(),
  where: AuthorWhereUniqueInputSchema,
}).strict();

export const VendorFindFirstArgsSchema: z.ZodType<PrismaClient.Prisma.VendorFindFirstArgs> = z.object({
  select: VendorSelectSchema.optional(),
  include: VendorIncludeSchema.optional(),
  where: VendorWhereInputSchema.optional(),
  orderBy: z.union([VendorOrderByWithRelationInputSchema.array(), VendorOrderByWithRelationInputSchema]).optional(),
  cursor: VendorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: VendorScalarFieldEnumSchema.array().optional(),
}).strict();

export const VendorFindFirstOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.VendorFindFirstOrThrowArgs> = z.object({
  select: VendorSelectSchema.optional(),
  include: VendorIncludeSchema.optional(),
  where: VendorWhereInputSchema.optional(),
  orderBy: z.union([VendorOrderByWithRelationInputSchema.array(), VendorOrderByWithRelationInputSchema]).optional(),
  cursor: VendorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: VendorScalarFieldEnumSchema.array().optional(),
}).strict();

export const VendorFindManyArgsSchema: z.ZodType<PrismaClient.Prisma.VendorFindManyArgs> = z.object({
  select: VendorSelectSchema.optional(),
  include: VendorIncludeSchema.optional(),
  where: VendorWhereInputSchema.optional(),
  orderBy: z.union([VendorOrderByWithRelationInputSchema.array(), VendorOrderByWithRelationInputSchema]).optional(),
  cursor: VendorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: VendorScalarFieldEnumSchema.array().optional(),
}).strict();

export const VendorAggregateArgsSchema: z.ZodType<PrismaClient.Prisma.VendorAggregateArgs> = z.object({
  select: VendorSelectSchema.optional(),
  include: VendorIncludeSchema.optional(),
  where: VendorWhereInputSchema.optional(),
  orderBy: z.union([VendorOrderByWithRelationInputSchema.array(), VendorOrderByWithRelationInputSchema]).optional(),
  cursor: VendorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const VendorGroupByArgsSchema: z.ZodType<PrismaClient.Prisma.VendorGroupByArgs> = z.object({
  select: VendorSelectSchema.optional(),
  include: VendorIncludeSchema.optional(),
  where: VendorWhereInputSchema.optional(),
  orderBy: z.union([VendorOrderByWithAggregationInputSchema.array(), VendorOrderByWithAggregationInputSchema]).optional(),
  by: VendorScalarFieldEnumSchema.array(),
  having: VendorScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const VendorFindUniqueArgsSchema: z.ZodType<PrismaClient.Prisma.VendorFindUniqueArgs> = z.object({
  select: VendorSelectSchema.optional(),
  include: VendorIncludeSchema.optional(),
  where: VendorWhereUniqueInputSchema,
}).strict();

export const VendorFindUniqueOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.VendorFindUniqueOrThrowArgs> = z.object({
  select: VendorSelectSchema.optional(),
  include: VendorIncludeSchema.optional(),
  where: VendorWhereUniqueInputSchema,
}).strict();

export const PurchaseOrderFindFirstArgsSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderFindFirstArgs> = z.object({
  select: PurchaseOrderSelectSchema.optional(),
  include: PurchaseOrderIncludeSchema.optional(),
  where: PurchaseOrderWhereInputSchema.optional(),
  orderBy: z.union([PurchaseOrderOrderByWithRelationInputSchema.array(), PurchaseOrderOrderByWithRelationInputSchema]).optional(),
  cursor: PurchaseOrderWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: PurchaseOrderScalarFieldEnumSchema.array().optional(),
}).strict();

export const PurchaseOrderFindFirstOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderFindFirstOrThrowArgs> = z.object({
  select: PurchaseOrderSelectSchema.optional(),
  include: PurchaseOrderIncludeSchema.optional(),
  where: PurchaseOrderWhereInputSchema.optional(),
  orderBy: z.union([PurchaseOrderOrderByWithRelationInputSchema.array(), PurchaseOrderOrderByWithRelationInputSchema]).optional(),
  cursor: PurchaseOrderWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: PurchaseOrderScalarFieldEnumSchema.array().optional(),
}).strict();

export const PurchaseOrderFindManyArgsSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderFindManyArgs> = z.object({
  select: PurchaseOrderSelectSchema.optional(),
  include: PurchaseOrderIncludeSchema.optional(),
  where: PurchaseOrderWhereInputSchema.optional(),
  orderBy: z.union([PurchaseOrderOrderByWithRelationInputSchema.array(), PurchaseOrderOrderByWithRelationInputSchema]).optional(),
  cursor: PurchaseOrderWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: PurchaseOrderScalarFieldEnumSchema.array().optional(),
}).strict();

export const PurchaseOrderAggregateArgsSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderAggregateArgs> = z.object({
  select: PurchaseOrderSelectSchema.optional(),
  include: PurchaseOrderIncludeSchema.optional(),
  where: PurchaseOrderWhereInputSchema.optional(),
  orderBy: z.union([PurchaseOrderOrderByWithRelationInputSchema.array(), PurchaseOrderOrderByWithRelationInputSchema]).optional(),
  cursor: PurchaseOrderWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const PurchaseOrderGroupByArgsSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderGroupByArgs> = z.object({
  select: PurchaseOrderSelectSchema.optional(),
  include: PurchaseOrderIncludeSchema.optional(),
  where: PurchaseOrderWhereInputSchema.optional(),
  orderBy: z.union([PurchaseOrderOrderByWithAggregationInputSchema.array(), PurchaseOrderOrderByWithAggregationInputSchema]).optional(),
  by: PurchaseOrderScalarFieldEnumSchema.array(),
  having: PurchaseOrderScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const PurchaseOrderFindUniqueArgsSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderFindUniqueArgs> = z.object({
  select: PurchaseOrderSelectSchema.optional(),
  include: PurchaseOrderIncludeSchema.optional(),
  where: PurchaseOrderWhereUniqueInputSchema,
}).strict();

export const PurchaseOrderFindUniqueOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderFindUniqueOrThrowArgs> = z.object({
  select: PurchaseOrderSelectSchema.optional(),
  include: PurchaseOrderIncludeSchema.optional(),
  where: PurchaseOrderWhereUniqueInputSchema,
}).strict();

export const PurchaseLineFindFirstArgsSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineFindFirstArgs> = z.object({
  select: PurchaseLineSelectSchema.optional(),
  include: PurchaseLineIncludeSchema.optional(),
  where: PurchaseLineWhereInputSchema.optional(),
  orderBy: z.union([PurchaseLineOrderByWithRelationInputSchema.array(), PurchaseLineOrderByWithRelationInputSchema]).optional(),
  cursor: PurchaseLineWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: PurchaseLineScalarFieldEnumSchema.array().optional(),
}).strict();

export const PurchaseLineFindFirstOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineFindFirstOrThrowArgs> = z.object({
  select: PurchaseLineSelectSchema.optional(),
  include: PurchaseLineIncludeSchema.optional(),
  where: PurchaseLineWhereInputSchema.optional(),
  orderBy: z.union([PurchaseLineOrderByWithRelationInputSchema.array(), PurchaseLineOrderByWithRelationInputSchema]).optional(),
  cursor: PurchaseLineWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: PurchaseLineScalarFieldEnumSchema.array().optional(),
}).strict();

export const PurchaseLineFindManyArgsSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineFindManyArgs> = z.object({
  select: PurchaseLineSelectSchema.optional(),
  include: PurchaseLineIncludeSchema.optional(),
  where: PurchaseLineWhereInputSchema.optional(),
  orderBy: z.union([PurchaseLineOrderByWithRelationInputSchema.array(), PurchaseLineOrderByWithRelationInputSchema]).optional(),
  cursor: PurchaseLineWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: PurchaseLineScalarFieldEnumSchema.array().optional(),
}).strict();

export const PurchaseLineAggregateArgsSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineAggregateArgs> = z.object({
  select: PurchaseLineSelectSchema.optional(),
  include: PurchaseLineIncludeSchema.optional(),
  where: PurchaseLineWhereInputSchema.optional(),
  orderBy: z.union([PurchaseLineOrderByWithRelationInputSchema.array(), PurchaseLineOrderByWithRelationInputSchema]).optional(),
  cursor: PurchaseLineWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const PurchaseLineGroupByArgsSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineGroupByArgs> = z.object({
  select: PurchaseLineSelectSchema.optional(),
  include: PurchaseLineIncludeSchema.optional(),
  where: PurchaseLineWhereInputSchema.optional(),
  orderBy: z.union([PurchaseLineOrderByWithAggregationInputSchema.array(), PurchaseLineOrderByWithAggregationInputSchema]).optional(),
  by: PurchaseLineScalarFieldEnumSchema.array(),
  having: PurchaseLineScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const PurchaseLineFindUniqueArgsSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineFindUniqueArgs> = z.object({
  select: PurchaseLineSelectSchema.optional(),
  include: PurchaseLineIncludeSchema.optional(),
  where: PurchaseLineWhereUniqueInputSchema,
}).strict();

export const PurchaseLineFindUniqueOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineFindUniqueOrThrowArgs> = z.object({
  select: PurchaseLineSelectSchema.optional(),
  include: PurchaseLineIncludeSchema.optional(),
  where: PurchaseLineWhereUniqueInputSchema,
}).strict();

export const SalesReconciliationFindFirstArgsSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationFindFirstArgs> = z.object({
  select: SalesReconciliationSelectSchema.optional(),
  include: SalesReconciliationIncludeSchema.optional(),
  where: SalesReconciliationWhereInputSchema.optional(),
  orderBy: z.union([SalesReconciliationOrderByWithRelationInputSchema.array(), SalesReconciliationOrderByWithRelationInputSchema]).optional(),
  cursor: SalesReconciliationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SalesReconciliationScalarFieldEnumSchema.array().optional(),
}).strict();

export const SalesReconciliationFindFirstOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationFindFirstOrThrowArgs> = z.object({
  select: SalesReconciliationSelectSchema.optional(),
  include: SalesReconciliationIncludeSchema.optional(),
  where: SalesReconciliationWhereInputSchema.optional(),
  orderBy: z.union([SalesReconciliationOrderByWithRelationInputSchema.array(), SalesReconciliationOrderByWithRelationInputSchema]).optional(),
  cursor: SalesReconciliationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SalesReconciliationScalarFieldEnumSchema.array().optional(),
}).strict();

export const SalesReconciliationFindManyArgsSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationFindManyArgs> = z.object({
  select: SalesReconciliationSelectSchema.optional(),
  include: SalesReconciliationIncludeSchema.optional(),
  where: SalesReconciliationWhereInputSchema.optional(),
  orderBy: z.union([SalesReconciliationOrderByWithRelationInputSchema.array(), SalesReconciliationOrderByWithRelationInputSchema]).optional(),
  cursor: SalesReconciliationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SalesReconciliationScalarFieldEnumSchema.array().optional(),
}).strict();

export const SalesReconciliationAggregateArgsSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationAggregateArgs> = z.object({
  select: SalesReconciliationSelectSchema.optional(),
  include: SalesReconciliationIncludeSchema.optional(),
  where: SalesReconciliationWhereInputSchema.optional(),
  orderBy: z.union([SalesReconciliationOrderByWithRelationInputSchema.array(), SalesReconciliationOrderByWithRelationInputSchema]).optional(),
  cursor: SalesReconciliationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const SalesReconciliationGroupByArgsSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationGroupByArgs> = z.object({
  select: SalesReconciliationSelectSchema.optional(),
  include: SalesReconciliationIncludeSchema.optional(),
  where: SalesReconciliationWhereInputSchema.optional(),
  orderBy: z.union([SalesReconciliationOrderByWithAggregationInputSchema.array(), SalesReconciliationOrderByWithAggregationInputSchema]).optional(),
  by: SalesReconciliationScalarFieldEnumSchema.array(),
  having: SalesReconciliationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const SalesReconciliationFindUniqueArgsSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationFindUniqueArgs> = z.object({
  select: SalesReconciliationSelectSchema.optional(),
  include: SalesReconciliationIncludeSchema.optional(),
  where: SalesReconciliationWhereUniqueInputSchema,
}).strict();

export const SalesReconciliationFindUniqueOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationFindUniqueOrThrowArgs> = z.object({
  select: SalesReconciliationSelectSchema.optional(),
  include: SalesReconciliationIncludeSchema.optional(),
  where: SalesReconciliationWhereUniqueInputSchema,
}).strict();

export const SalesLineFindFirstArgsSchema: z.ZodType<PrismaClient.Prisma.SalesLineFindFirstArgs> = z.object({
  select: SalesLineSelectSchema.optional(),
  include: SalesLineIncludeSchema.optional(),
  where: SalesLineWhereInputSchema.optional(),
  orderBy: z.union([SalesLineOrderByWithRelationInputSchema.array(), SalesLineOrderByWithRelationInputSchema]).optional(),
  cursor: SalesLineWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SalesLineScalarFieldEnumSchema.array().optional(),
}).strict();

export const SalesLineFindFirstOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.SalesLineFindFirstOrThrowArgs> = z.object({
  select: SalesLineSelectSchema.optional(),
  include: SalesLineIncludeSchema.optional(),
  where: SalesLineWhereInputSchema.optional(),
  orderBy: z.union([SalesLineOrderByWithRelationInputSchema.array(), SalesLineOrderByWithRelationInputSchema]).optional(),
  cursor: SalesLineWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SalesLineScalarFieldEnumSchema.array().optional(),
}).strict();

export const SalesLineFindManyArgsSchema: z.ZodType<PrismaClient.Prisma.SalesLineFindManyArgs> = z.object({
  select: SalesLineSelectSchema.optional(),
  include: SalesLineIncludeSchema.optional(),
  where: SalesLineWhereInputSchema.optional(),
  orderBy: z.union([SalesLineOrderByWithRelationInputSchema.array(), SalesLineOrderByWithRelationInputSchema]).optional(),
  cursor: SalesLineWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SalesLineScalarFieldEnumSchema.array().optional(),
}).strict();

export const SalesLineAggregateArgsSchema: z.ZodType<PrismaClient.Prisma.SalesLineAggregateArgs> = z.object({
  select: SalesLineSelectSchema.optional(),
  include: SalesLineIncludeSchema.optional(),
  where: SalesLineWhereInputSchema.optional(),
  orderBy: z.union([SalesLineOrderByWithRelationInputSchema.array(), SalesLineOrderByWithRelationInputSchema]).optional(),
  cursor: SalesLineWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const SalesLineGroupByArgsSchema: z.ZodType<PrismaClient.Prisma.SalesLineGroupByArgs> = z.object({
  select: SalesLineSelectSchema.optional(),
  include: SalesLineIncludeSchema.optional(),
  where: SalesLineWhereInputSchema.optional(),
  orderBy: z.union([SalesLineOrderByWithAggregationInputSchema.array(), SalesLineOrderByWithAggregationInputSchema]).optional(),
  by: SalesLineScalarFieldEnumSchema.array(),
  having: SalesLineScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const SalesLineFindUniqueArgsSchema: z.ZodType<PrismaClient.Prisma.SalesLineFindUniqueArgs> = z.object({
  select: SalesLineSelectSchema.optional(),
  include: SalesLineIncludeSchema.optional(),
  where: SalesLineWhereUniqueInputSchema,
}).strict();

export const SalesLineFindUniqueOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.SalesLineFindUniqueOrThrowArgs> = z.object({
  select: SalesLineSelectSchema.optional(),
  include: SalesLineIncludeSchema.optional(),
  where: SalesLineWhereUniqueInputSchema,
}).strict();

export const BuybackOrderFindFirstArgsSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderFindFirstArgs> = z.object({
  select: BuybackOrderSelectSchema.optional(),
  include: BuybackOrderIncludeSchema.optional(),
  where: BuybackOrderWhereInputSchema.optional(),
  orderBy: z.union([BuybackOrderOrderByWithRelationInputSchema.array(), BuybackOrderOrderByWithRelationInputSchema]).optional(),
  cursor: BuybackOrderWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: BuybackOrderScalarFieldEnumSchema.array().optional(),
}).strict();

export const BuybackOrderFindFirstOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderFindFirstOrThrowArgs> = z.object({
  select: BuybackOrderSelectSchema.optional(),
  include: BuybackOrderIncludeSchema.optional(),
  where: BuybackOrderWhereInputSchema.optional(),
  orderBy: z.union([BuybackOrderOrderByWithRelationInputSchema.array(), BuybackOrderOrderByWithRelationInputSchema]).optional(),
  cursor: BuybackOrderWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: BuybackOrderScalarFieldEnumSchema.array().optional(),
}).strict();

export const BuybackOrderFindManyArgsSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderFindManyArgs> = z.object({
  select: BuybackOrderSelectSchema.optional(),
  include: BuybackOrderIncludeSchema.optional(),
  where: BuybackOrderWhereInputSchema.optional(),
  orderBy: z.union([BuybackOrderOrderByWithRelationInputSchema.array(), BuybackOrderOrderByWithRelationInputSchema]).optional(),
  cursor: BuybackOrderWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: BuybackOrderScalarFieldEnumSchema.array().optional(),
}).strict();

export const BuybackOrderAggregateArgsSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderAggregateArgs> = z.object({
  select: BuybackOrderSelectSchema.optional(),
  include: BuybackOrderIncludeSchema.optional(),
  where: BuybackOrderWhereInputSchema.optional(),
  orderBy: z.union([BuybackOrderOrderByWithRelationInputSchema.array(), BuybackOrderOrderByWithRelationInputSchema]).optional(),
  cursor: BuybackOrderWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const BuybackOrderGroupByArgsSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderGroupByArgs> = z.object({
  select: BuybackOrderSelectSchema.optional(),
  include: BuybackOrderIncludeSchema.optional(),
  where: BuybackOrderWhereInputSchema.optional(),
  orderBy: z.union([BuybackOrderOrderByWithAggregationInputSchema.array(), BuybackOrderOrderByWithAggregationInputSchema]).optional(),
  by: BuybackOrderScalarFieldEnumSchema.array(),
  having: BuybackOrderScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const BuybackOrderFindUniqueArgsSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderFindUniqueArgs> = z.object({
  select: BuybackOrderSelectSchema.optional(),
  include: BuybackOrderIncludeSchema.optional(),
  where: BuybackOrderWhereUniqueInputSchema,
}).strict();

export const BuybackOrderFindUniqueOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderFindUniqueOrThrowArgs> = z.object({
  select: BuybackOrderSelectSchema.optional(),
  include: BuybackOrderIncludeSchema.optional(),
  where: BuybackOrderWhereUniqueInputSchema,
}).strict();

export const BuybackLineFindFirstArgsSchema: z.ZodType<PrismaClient.Prisma.BuybackLineFindFirstArgs> = z.object({
  select: BuybackLineSelectSchema.optional(),
  include: BuybackLineIncludeSchema.optional(),
  where: BuybackLineWhereInputSchema.optional(),
  orderBy: z.union([BuybackLineOrderByWithRelationInputSchema.array(), BuybackLineOrderByWithRelationInputSchema]).optional(),
  cursor: BuybackLineWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: BuybackLineScalarFieldEnumSchema.array().optional(),
}).strict();

export const BuybackLineFindFirstOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.BuybackLineFindFirstOrThrowArgs> = z.object({
  select: BuybackLineSelectSchema.optional(),
  include: BuybackLineIncludeSchema.optional(),
  where: BuybackLineWhereInputSchema.optional(),
  orderBy: z.union([BuybackLineOrderByWithRelationInputSchema.array(), BuybackLineOrderByWithRelationInputSchema]).optional(),
  cursor: BuybackLineWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: BuybackLineScalarFieldEnumSchema.array().optional(),
}).strict();

export const BuybackLineFindManyArgsSchema: z.ZodType<PrismaClient.Prisma.BuybackLineFindManyArgs> = z.object({
  select: BuybackLineSelectSchema.optional(),
  include: BuybackLineIncludeSchema.optional(),
  where: BuybackLineWhereInputSchema.optional(),
  orderBy: z.union([BuybackLineOrderByWithRelationInputSchema.array(), BuybackLineOrderByWithRelationInputSchema]).optional(),
  cursor: BuybackLineWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: BuybackLineScalarFieldEnumSchema.array().optional(),
}).strict();

export const BuybackLineAggregateArgsSchema: z.ZodType<PrismaClient.Prisma.BuybackLineAggregateArgs> = z.object({
  select: BuybackLineSelectSchema.optional(),
  include: BuybackLineIncludeSchema.optional(),
  where: BuybackLineWhereInputSchema.optional(),
  orderBy: z.union([BuybackLineOrderByWithRelationInputSchema.array(), BuybackLineOrderByWithRelationInputSchema]).optional(),
  cursor: BuybackLineWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const BuybackLineGroupByArgsSchema: z.ZodType<PrismaClient.Prisma.BuybackLineGroupByArgs> = z.object({
  select: BuybackLineSelectSchema.optional(),
  include: BuybackLineIncludeSchema.optional(),
  where: BuybackLineWhereInputSchema.optional(),
  orderBy: z.union([BuybackLineOrderByWithAggregationInputSchema.array(), BuybackLineOrderByWithAggregationInputSchema]).optional(),
  by: BuybackLineScalarFieldEnumSchema.array(),
  having: BuybackLineScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const BuybackLineFindUniqueArgsSchema: z.ZodType<PrismaClient.Prisma.BuybackLineFindUniqueArgs> = z.object({
  select: BuybackLineSelectSchema.optional(),
  include: BuybackLineIncludeSchema.optional(),
  where: BuybackLineWhereUniqueInputSchema,
}).strict();

export const BuybackLineFindUniqueOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.BuybackLineFindUniqueOrThrowArgs> = z.object({
  select: BuybackLineSelectSchema.optional(),
  include: BuybackLineIncludeSchema.optional(),
  where: BuybackLineWhereUniqueInputSchema,
}).strict();

export const CorrectionFindFirstArgsSchema: z.ZodType<PrismaClient.Prisma.CorrectionFindFirstArgs> = z.object({
  select: CorrectionSelectSchema.optional(),
  include: CorrectionIncludeSchema.optional(),
  where: CorrectionWhereInputSchema.optional(),
  orderBy: z.union([CorrectionOrderByWithRelationInputSchema.array(), CorrectionOrderByWithRelationInputSchema]).optional(),
  cursor: CorrectionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CorrectionScalarFieldEnumSchema.array().optional(),
}).strict();

export const CorrectionFindFirstOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.CorrectionFindFirstOrThrowArgs> = z.object({
  select: CorrectionSelectSchema.optional(),
  include: CorrectionIncludeSchema.optional(),
  where: CorrectionWhereInputSchema.optional(),
  orderBy: z.union([CorrectionOrderByWithRelationInputSchema.array(), CorrectionOrderByWithRelationInputSchema]).optional(),
  cursor: CorrectionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CorrectionScalarFieldEnumSchema.array().optional(),
}).strict();

export const CorrectionFindManyArgsSchema: z.ZodType<PrismaClient.Prisma.CorrectionFindManyArgs> = z.object({
  select: CorrectionSelectSchema.optional(),
  include: CorrectionIncludeSchema.optional(),
  where: CorrectionWhereInputSchema.optional(),
  orderBy: z.union([CorrectionOrderByWithRelationInputSchema.array(), CorrectionOrderByWithRelationInputSchema]).optional(),
  cursor: CorrectionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CorrectionScalarFieldEnumSchema.array().optional(),
}).strict();

export const CorrectionAggregateArgsSchema: z.ZodType<PrismaClient.Prisma.CorrectionAggregateArgs> = z.object({
  select: CorrectionSelectSchema.optional(),
  include: CorrectionIncludeSchema.optional(),
  where: CorrectionWhereInputSchema.optional(),
  orderBy: z.union([CorrectionOrderByWithRelationInputSchema.array(), CorrectionOrderByWithRelationInputSchema]).optional(),
  cursor: CorrectionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const CorrectionGroupByArgsSchema: z.ZodType<PrismaClient.Prisma.CorrectionGroupByArgs> = z.object({
  select: CorrectionSelectSchema.optional(),
  include: CorrectionIncludeSchema.optional(),
  where: CorrectionWhereInputSchema.optional(),
  orderBy: z.union([CorrectionOrderByWithAggregationInputSchema.array(), CorrectionOrderByWithAggregationInputSchema]).optional(),
  by: CorrectionScalarFieldEnumSchema.array(),
  having: CorrectionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const CorrectionFindUniqueArgsSchema: z.ZodType<PrismaClient.Prisma.CorrectionFindUniqueArgs> = z.object({
  select: CorrectionSelectSchema.optional(),
  include: CorrectionIncludeSchema.optional(),
  where: CorrectionWhereUniqueInputSchema,
}).strict();

export const CorrectionFindUniqueOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.CorrectionFindUniqueOrThrowArgs> = z.object({
  select: CorrectionSelectSchema.optional(),
  include: CorrectionIncludeSchema.optional(),
  where: CorrectionWhereUniqueInputSchema,
}).strict();

export const CostMostRecentVendorFindFirstArgsSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorFindFirstArgs> = z.object({
  select: CostMostRecentVendorSelectSchema.optional(),
  include: CostMostRecentVendorIncludeSchema.optional(),
  where: CostMostRecentVendorWhereInputSchema.optional(),
  orderBy: z.union([CostMostRecentVendorOrderByWithRelationInputSchema.array(), CostMostRecentVendorOrderByWithRelationInputSchema]).optional(),
  cursor: CostMostRecentVendorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CostMostRecentVendorScalarFieldEnumSchema.array().optional(),
}).strict();

export const CostMostRecentVendorFindFirstOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorFindFirstOrThrowArgs> = z.object({
  select: CostMostRecentVendorSelectSchema.optional(),
  include: CostMostRecentVendorIncludeSchema.optional(),
  where: CostMostRecentVendorWhereInputSchema.optional(),
  orderBy: z.union([CostMostRecentVendorOrderByWithRelationInputSchema.array(), CostMostRecentVendorOrderByWithRelationInputSchema]).optional(),
  cursor: CostMostRecentVendorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CostMostRecentVendorScalarFieldEnumSchema.array().optional(),
}).strict();

export const CostMostRecentVendorFindManyArgsSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorFindManyArgs> = z.object({
  select: CostMostRecentVendorSelectSchema.optional(),
  include: CostMostRecentVendorIncludeSchema.optional(),
  where: CostMostRecentVendorWhereInputSchema.optional(),
  orderBy: z.union([CostMostRecentVendorOrderByWithRelationInputSchema.array(), CostMostRecentVendorOrderByWithRelationInputSchema]).optional(),
  cursor: CostMostRecentVendorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CostMostRecentVendorScalarFieldEnumSchema.array().optional(),
}).strict();

export const CostMostRecentVendorAggregateArgsSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorAggregateArgs> = z.object({
  select: CostMostRecentVendorSelectSchema.optional(),
  include: CostMostRecentVendorIncludeSchema.optional(),
  where: CostMostRecentVendorWhereInputSchema.optional(),
  orderBy: z.union([CostMostRecentVendorOrderByWithRelationInputSchema.array(), CostMostRecentVendorOrderByWithRelationInputSchema]).optional(),
  cursor: CostMostRecentVendorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const CostMostRecentVendorGroupByArgsSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorGroupByArgs> = z.object({
  select: CostMostRecentVendorSelectSchema.optional(),
  include: CostMostRecentVendorIncludeSchema.optional(),
  where: CostMostRecentVendorWhereInputSchema.optional(),
  orderBy: z.union([CostMostRecentVendorOrderByWithAggregationInputSchema.array(), CostMostRecentVendorOrderByWithAggregationInputSchema]).optional(),
  by: CostMostRecentVendorScalarFieldEnumSchema.array(),
  having: CostMostRecentVendorScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const CostMostRecentVendorFindUniqueArgsSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorFindUniqueArgs> = z.object({
  select: CostMostRecentVendorSelectSchema.optional(),
  include: CostMostRecentVendorIncludeSchema.optional(),
  where: CostMostRecentVendorWhereUniqueInputSchema,
}).strict();

export const CostMostRecentVendorFindUniqueOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorFindUniqueOrThrowArgs> = z.object({
  select: CostMostRecentVendorSelectSchema.optional(),
  include: CostMostRecentVendorIncludeSchema.optional(),
  where: CostMostRecentVendorWhereUniqueInputSchema,
}).strict();

export const CaseFindFirstArgsSchema: z.ZodType<PrismaClient.Prisma.CaseFindFirstArgs> = z.object({
  select: CaseSelectSchema.optional(),
  include: CaseIncludeSchema.optional(),
  where: CaseWhereInputSchema.optional(),
  orderBy: z.union([CaseOrderByWithRelationInputSchema.array(), CaseOrderByWithRelationInputSchema]).optional(),
  cursor: CaseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CaseScalarFieldEnumSchema.array().optional(),
}).strict();

export const CaseFindFirstOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.CaseFindFirstOrThrowArgs> = z.object({
  select: CaseSelectSchema.optional(),
  include: CaseIncludeSchema.optional(),
  where: CaseWhereInputSchema.optional(),
  orderBy: z.union([CaseOrderByWithRelationInputSchema.array(), CaseOrderByWithRelationInputSchema]).optional(),
  cursor: CaseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CaseScalarFieldEnumSchema.array().optional(),
}).strict();

export const CaseFindManyArgsSchema: z.ZodType<PrismaClient.Prisma.CaseFindManyArgs> = z.object({
  select: CaseSelectSchema.optional(),
  include: CaseIncludeSchema.optional(),
  where: CaseWhereInputSchema.optional(),
  orderBy: z.union([CaseOrderByWithRelationInputSchema.array(), CaseOrderByWithRelationInputSchema]).optional(),
  cursor: CaseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CaseScalarFieldEnumSchema.array().optional(),
}).strict();

export const CaseAggregateArgsSchema: z.ZodType<PrismaClient.Prisma.CaseAggregateArgs> = z.object({
  select: CaseSelectSchema.optional(),
  include: CaseIncludeSchema.optional(),
  where: CaseWhereInputSchema.optional(),
  orderBy: z.union([CaseOrderByWithRelationInputSchema.array(), CaseOrderByWithRelationInputSchema]).optional(),
  cursor: CaseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const CaseGroupByArgsSchema: z.ZodType<PrismaClient.Prisma.CaseGroupByArgs> = z.object({
  select: CaseSelectSchema.optional(),
  include: CaseIncludeSchema.optional(),
  where: CaseWhereInputSchema.optional(),
  orderBy: z.union([CaseOrderByWithAggregationInputSchema.array(), CaseOrderByWithAggregationInputSchema]).optional(),
  by: CaseScalarFieldEnumSchema.array(),
  having: CaseScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const CaseFindUniqueArgsSchema: z.ZodType<PrismaClient.Prisma.CaseFindUniqueArgs> = z.object({
  select: CaseSelectSchema.optional(),
  include: CaseIncludeSchema.optional(),
  where: CaseWhereUniqueInputSchema,
}).strict();

export const CaseFindUniqueOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.CaseFindUniqueOrThrowArgs> = z.object({
  select: CaseSelectSchema.optional(),
  include: CaseIncludeSchema.optional(),
  where: CaseWhereUniqueInputSchema,
}).strict();

export const ShelfFindFirstArgsSchema: z.ZodType<PrismaClient.Prisma.ShelfFindFirstArgs> = z.object({
  select: ShelfSelectSchema.optional(),
  include: ShelfIncludeSchema.optional(),
  where: ShelfWhereInputSchema.optional(),
  orderBy: z.union([ShelfOrderByWithRelationInputSchema.array(), ShelfOrderByWithRelationInputSchema]).optional(),
  cursor: ShelfWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ShelfScalarFieldEnumSchema.array().optional(),
}).strict();

export const ShelfFindFirstOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.ShelfFindFirstOrThrowArgs> = z.object({
  select: ShelfSelectSchema.optional(),
  include: ShelfIncludeSchema.optional(),
  where: ShelfWhereInputSchema.optional(),
  orderBy: z.union([ShelfOrderByWithRelationInputSchema.array(), ShelfOrderByWithRelationInputSchema]).optional(),
  cursor: ShelfWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ShelfScalarFieldEnumSchema.array().optional(),
}).strict();

export const ShelfFindManyArgsSchema: z.ZodType<PrismaClient.Prisma.ShelfFindManyArgs> = z.object({
  select: ShelfSelectSchema.optional(),
  include: ShelfIncludeSchema.optional(),
  where: ShelfWhereInputSchema.optional(),
  orderBy: z.union([ShelfOrderByWithRelationInputSchema.array(), ShelfOrderByWithRelationInputSchema]).optional(),
  cursor: ShelfWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ShelfScalarFieldEnumSchema.array().optional(),
}).strict();

export const ShelfAggregateArgsSchema: z.ZodType<PrismaClient.Prisma.ShelfAggregateArgs> = z.object({
  select: ShelfSelectSchema.optional(),
  include: ShelfIncludeSchema.optional(),
  where: ShelfWhereInputSchema.optional(),
  orderBy: z.union([ShelfOrderByWithRelationInputSchema.array(), ShelfOrderByWithRelationInputSchema]).optional(),
  cursor: ShelfWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ShelfGroupByArgsSchema: z.ZodType<PrismaClient.Prisma.ShelfGroupByArgs> = z.object({
  select: ShelfSelectSchema.optional(),
  include: ShelfIncludeSchema.optional(),
  where: ShelfWhereInputSchema.optional(),
  orderBy: z.union([ShelfOrderByWithAggregationInputSchema.array(), ShelfOrderByWithAggregationInputSchema]).optional(),
  by: ShelfScalarFieldEnumSchema.array(),
  having: ShelfScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ShelfFindUniqueArgsSchema: z.ZodType<PrismaClient.Prisma.ShelfFindUniqueArgs> = z.object({
  select: ShelfSelectSchema.optional(),
  include: ShelfIncludeSchema.optional(),
  where: ShelfWhereUniqueInputSchema,
}).strict();

export const ShelfFindUniqueOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.ShelfFindUniqueOrThrowArgs> = z.object({
  select: ShelfSelectSchema.optional(),
  include: ShelfIncludeSchema.optional(),
  where: ShelfWhereUniqueInputSchema,
}).strict();

export const BookOnShelfFindFirstArgsSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfFindFirstArgs> = z.object({
  select: BookOnShelfSelectSchema.optional(),
  include: BookOnShelfIncludeSchema.optional(),
  where: BookOnShelfWhereInputSchema.optional(),
  orderBy: z.union([BookOnShelfOrderByWithRelationInputSchema.array(), BookOnShelfOrderByWithRelationInputSchema]).optional(),
  cursor: BookOnShelfWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: BookOnShelfScalarFieldEnumSchema.array().optional(),
}).strict();

export const BookOnShelfFindFirstOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfFindFirstOrThrowArgs> = z.object({
  select: BookOnShelfSelectSchema.optional(),
  include: BookOnShelfIncludeSchema.optional(),
  where: BookOnShelfWhereInputSchema.optional(),
  orderBy: z.union([BookOnShelfOrderByWithRelationInputSchema.array(), BookOnShelfOrderByWithRelationInputSchema]).optional(),
  cursor: BookOnShelfWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: BookOnShelfScalarFieldEnumSchema.array().optional(),
}).strict();

export const BookOnShelfFindManyArgsSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfFindManyArgs> = z.object({
  select: BookOnShelfSelectSchema.optional(),
  include: BookOnShelfIncludeSchema.optional(),
  where: BookOnShelfWhereInputSchema.optional(),
  orderBy: z.union([BookOnShelfOrderByWithRelationInputSchema.array(), BookOnShelfOrderByWithRelationInputSchema]).optional(),
  cursor: BookOnShelfWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: BookOnShelfScalarFieldEnumSchema.array().optional(),
}).strict();

export const BookOnShelfAggregateArgsSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfAggregateArgs> = z.object({
  select: BookOnShelfSelectSchema.optional(),
  include: BookOnShelfIncludeSchema.optional(),
  where: BookOnShelfWhereInputSchema.optional(),
  orderBy: z.union([BookOnShelfOrderByWithRelationInputSchema.array(), BookOnShelfOrderByWithRelationInputSchema]).optional(),
  cursor: BookOnShelfWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const BookOnShelfGroupByArgsSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfGroupByArgs> = z.object({
  select: BookOnShelfSelectSchema.optional(),
  include: BookOnShelfIncludeSchema.optional(),
  where: BookOnShelfWhereInputSchema.optional(),
  orderBy: z.union([BookOnShelfOrderByWithAggregationInputSchema.array(), BookOnShelfOrderByWithAggregationInputSchema]).optional(),
  by: BookOnShelfScalarFieldEnumSchema.array(),
  having: BookOnShelfScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const BookOnShelfFindUniqueArgsSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfFindUniqueArgs> = z.object({
  select: BookOnShelfSelectSchema.optional(),
  include: BookOnShelfIncludeSchema.optional(),
  where: BookOnShelfWhereUniqueInputSchema,
}).strict();

export const BookOnShelfFindUniqueOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfFindUniqueOrThrowArgs> = z.object({
  select: BookOnShelfSelectSchema.optional(),
  include: BookOnShelfIncludeSchema.optional(),
  where: BookOnShelfWhereUniqueInputSchema,
}).strict();

export const ExampleFindFirstArgsSchema: z.ZodType<PrismaClient.Prisma.ExampleFindFirstArgs> = z.object({
  select: ExampleSelectSchema.optional(),
  where: ExampleWhereInputSchema.optional(),
  orderBy: z.union([ExampleOrderByWithRelationInputSchema.array(), ExampleOrderByWithRelationInputSchema]).optional(),
  cursor: ExampleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ExampleScalarFieldEnumSchema.array().optional(),
}).strict();

export const ExampleFindFirstOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.ExampleFindFirstOrThrowArgs> = z.object({
  select: ExampleSelectSchema.optional(),
  where: ExampleWhereInputSchema.optional(),
  orderBy: z.union([ExampleOrderByWithRelationInputSchema.array(), ExampleOrderByWithRelationInputSchema]).optional(),
  cursor: ExampleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ExampleScalarFieldEnumSchema.array().optional(),
}).strict();

export const ExampleFindManyArgsSchema: z.ZodType<PrismaClient.Prisma.ExampleFindManyArgs> = z.object({
  select: ExampleSelectSchema.optional(),
  where: ExampleWhereInputSchema.optional(),
  orderBy: z.union([ExampleOrderByWithRelationInputSchema.array(), ExampleOrderByWithRelationInputSchema]).optional(),
  cursor: ExampleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ExampleScalarFieldEnumSchema.array().optional(),
}).strict();

export const ExampleAggregateArgsSchema: z.ZodType<PrismaClient.Prisma.ExampleAggregateArgs> = z.object({
  select: ExampleSelectSchema.optional(),
  where: ExampleWhereInputSchema.optional(),
  orderBy: z.union([ExampleOrderByWithRelationInputSchema.array(), ExampleOrderByWithRelationInputSchema]).optional(),
  cursor: ExampleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ExampleGroupByArgsSchema: z.ZodType<PrismaClient.Prisma.ExampleGroupByArgs> = z.object({
  select: ExampleSelectSchema.optional(),
  where: ExampleWhereInputSchema.optional(),
  orderBy: z.union([ExampleOrderByWithAggregationInputSchema.array(), ExampleOrderByWithAggregationInputSchema]).optional(),
  by: ExampleScalarFieldEnumSchema.array(),
  having: ExampleScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ExampleFindUniqueArgsSchema: z.ZodType<PrismaClient.Prisma.ExampleFindUniqueArgs> = z.object({
  select: ExampleSelectSchema.optional(),
  where: ExampleWhereUniqueInputSchema,
}).strict();

export const ExampleFindUniqueOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.ExampleFindUniqueOrThrowArgs> = z.object({
  select: ExampleSelectSchema.optional(),
  where: ExampleWhereUniqueInputSchema,
}).strict();

export const AccountFindFirstArgsSchema: z.ZodType<PrismaClient.Prisma.AccountFindFirstArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([AccountOrderByWithRelationInputSchema.array(), AccountOrderByWithRelationInputSchema]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: AccountScalarFieldEnumSchema.array().optional(),
}).strict();

export const AccountFindFirstOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.AccountFindFirstOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([AccountOrderByWithRelationInputSchema.array(), AccountOrderByWithRelationInputSchema]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: AccountScalarFieldEnumSchema.array().optional(),
}).strict();

export const AccountFindManyArgsSchema: z.ZodType<PrismaClient.Prisma.AccountFindManyArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([AccountOrderByWithRelationInputSchema.array(), AccountOrderByWithRelationInputSchema]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: AccountScalarFieldEnumSchema.array().optional(),
}).strict();

export const AccountAggregateArgsSchema: z.ZodType<PrismaClient.Prisma.AccountAggregateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([AccountOrderByWithRelationInputSchema.array(), AccountOrderByWithRelationInputSchema]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const AccountGroupByArgsSchema: z.ZodType<PrismaClient.Prisma.AccountGroupByArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([AccountOrderByWithAggregationInputSchema.array(), AccountOrderByWithAggregationInputSchema]).optional(),
  by: AccountScalarFieldEnumSchema.array(),
  having: AccountScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const AccountFindUniqueArgsSchema: z.ZodType<PrismaClient.Prisma.AccountFindUniqueArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict();

export const AccountFindUniqueOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.AccountFindUniqueOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict();

export const SessionFindFirstArgsSchema: z.ZodType<PrismaClient.Prisma.SessionFindFirstArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([SessionOrderByWithRelationInputSchema.array(), SessionOrderByWithRelationInputSchema]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SessionScalarFieldEnumSchema.array().optional(),
}).strict();

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.SessionFindFirstOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([SessionOrderByWithRelationInputSchema.array(), SessionOrderByWithRelationInputSchema]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SessionScalarFieldEnumSchema.array().optional(),
}).strict();

export const SessionFindManyArgsSchema: z.ZodType<PrismaClient.Prisma.SessionFindManyArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([SessionOrderByWithRelationInputSchema.array(), SessionOrderByWithRelationInputSchema]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SessionScalarFieldEnumSchema.array().optional(),
}).strict();

export const SessionAggregateArgsSchema: z.ZodType<PrismaClient.Prisma.SessionAggregateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([SessionOrderByWithRelationInputSchema.array(), SessionOrderByWithRelationInputSchema]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const SessionGroupByArgsSchema: z.ZodType<PrismaClient.Prisma.SessionGroupByArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([SessionOrderByWithAggregationInputSchema.array(), SessionOrderByWithAggregationInputSchema]).optional(),
  by: SessionScalarFieldEnumSchema.array(),
  having: SessionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const SessionFindUniqueArgsSchema: z.ZodType<PrismaClient.Prisma.SessionFindUniqueArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict();

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.SessionFindUniqueOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict();

export const UserFindFirstArgsSchema: z.ZodType<PrismaClient.Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserScalarFieldEnumSchema.array().optional(),
}).strict();

export const UserFindFirstOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserScalarFieldEnumSchema.array().optional(),
}).strict();

export const UserFindManyArgsSchema: z.ZodType<PrismaClient.Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserScalarFieldEnumSchema.array().optional(),
}).strict();

export const UserAggregateArgsSchema: z.ZodType<PrismaClient.Prisma.UserAggregateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const UserGroupByArgsSchema: z.ZodType<PrismaClient.Prisma.UserGroupByArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([UserOrderByWithAggregationInputSchema.array(), UserOrderByWithAggregationInputSchema]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const UserFindUniqueArgsSchema: z.ZodType<PrismaClient.Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict();

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict();

export const VerificationTokenFindFirstArgsSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenFindFirstArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([VerificationTokenOrderByWithRelationInputSchema.array(), VerificationTokenOrderByWithRelationInputSchema]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: VerificationTokenScalarFieldEnumSchema.array().optional(),
}).strict();

export const VerificationTokenFindFirstOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenFindFirstOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([VerificationTokenOrderByWithRelationInputSchema.array(), VerificationTokenOrderByWithRelationInputSchema]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: VerificationTokenScalarFieldEnumSchema.array().optional(),
}).strict();

export const VerificationTokenFindManyArgsSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenFindManyArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([VerificationTokenOrderByWithRelationInputSchema.array(), VerificationTokenOrderByWithRelationInputSchema]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: VerificationTokenScalarFieldEnumSchema.array().optional(),
}).strict();

export const VerificationTokenAggregateArgsSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenAggregateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([VerificationTokenOrderByWithRelationInputSchema.array(), VerificationTokenOrderByWithRelationInputSchema]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const VerificationTokenGroupByArgsSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenGroupByArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([VerificationTokenOrderByWithAggregationInputSchema.array(), VerificationTokenOrderByWithAggregationInputSchema]).optional(),
  by: VerificationTokenScalarFieldEnumSchema.array(),
  having: VerificationTokenScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const VerificationTokenFindUniqueArgsSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenFindUniqueArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict();

export const VerificationTokenFindUniqueOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenFindUniqueOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict();

export const ImageFindFirstArgsSchema: z.ZodType<PrismaClient.Prisma.ImageFindFirstArgs> = z.object({
  select: ImageSelectSchema.optional(),
  where: ImageWhereInputSchema.optional(),
  orderBy: z.union([ImageOrderByWithRelationInputSchema.array(), ImageOrderByWithRelationInputSchema]).optional(),
  cursor: ImageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ImageScalarFieldEnumSchema.array().optional(),
}).strict();

export const ImageFindFirstOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.ImageFindFirstOrThrowArgs> = z.object({
  select: ImageSelectSchema.optional(),
  where: ImageWhereInputSchema.optional(),
  orderBy: z.union([ImageOrderByWithRelationInputSchema.array(), ImageOrderByWithRelationInputSchema]).optional(),
  cursor: ImageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ImageScalarFieldEnumSchema.array().optional(),
}).strict();

export const ImageFindManyArgsSchema: z.ZodType<PrismaClient.Prisma.ImageFindManyArgs> = z.object({
  select: ImageSelectSchema.optional(),
  where: ImageWhereInputSchema.optional(),
  orderBy: z.union([ImageOrderByWithRelationInputSchema.array(), ImageOrderByWithRelationInputSchema]).optional(),
  cursor: ImageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ImageScalarFieldEnumSchema.array().optional(),
}).strict();

export const ImageAggregateArgsSchema: z.ZodType<PrismaClient.Prisma.ImageAggregateArgs> = z.object({
  select: ImageSelectSchema.optional(),
  where: ImageWhereInputSchema.optional(),
  orderBy: z.union([ImageOrderByWithRelationInputSchema.array(), ImageOrderByWithRelationInputSchema]).optional(),
  cursor: ImageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ImageGroupByArgsSchema: z.ZodType<PrismaClient.Prisma.ImageGroupByArgs> = z.object({
  select: ImageSelectSchema.optional(),
  where: ImageWhereInputSchema.optional(),
  orderBy: z.union([ImageOrderByWithAggregationInputSchema.array(), ImageOrderByWithAggregationInputSchema]).optional(),
  by: ImageScalarFieldEnumSchema.array(),
  having: ImageScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ImageFindUniqueArgsSchema: z.ZodType<PrismaClient.Prisma.ImageFindUniqueArgs> = z.object({
  select: ImageSelectSchema.optional(),
  where: ImageWhereUniqueInputSchema,
}).strict();

export const ImageFindUniqueOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.ImageFindUniqueOrThrowArgs> = z.object({
  select: ImageSelectSchema.optional(),
  where: ImageWhereUniqueInputSchema,
}).strict();

export const BookCreateArgsSchema: z.ZodType<PrismaClient.Prisma.BookCreateArgs> = z.object({
  select: BookSelectSchema.optional(),
  include: BookIncludeSchema.optional(),
  data: z.union([BookCreateInputSchema, BookUncheckedCreateInputSchema]),
}).strict();

export const BookUpsertArgsSchema: z.ZodType<PrismaClient.Prisma.BookUpsertArgs> = z.object({
  select: BookSelectSchema.optional(),
  include: BookIncludeSchema.optional(),
  where: BookWhereUniqueInputSchema,
  create: z.union([BookCreateInputSchema, BookUncheckedCreateInputSchema]),
  update: z.union([BookUpdateInputSchema, BookUncheckedUpdateInputSchema]),
}).strict();

export const BookCreateManyArgsSchema: z.ZodType<PrismaClient.Prisma.BookCreateManyArgs> = z.object({
  data: z.union([BookCreateManyInputSchema, BookCreateManyInputSchema.array()]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const BookDeleteArgsSchema: z.ZodType<PrismaClient.Prisma.BookDeleteArgs> = z.object({
  select: BookSelectSchema.optional(),
  include: BookIncludeSchema.optional(),
  where: BookWhereUniqueInputSchema,
}).strict();

export const BookUpdateArgsSchema: z.ZodType<PrismaClient.Prisma.BookUpdateArgs> = z.object({
  select: BookSelectSchema.optional(),
  include: BookIncludeSchema.optional(),
  data: z.union([BookUpdateInputSchema, BookUncheckedUpdateInputSchema]),
  where: BookWhereUniqueInputSchema,
}).strict();

export const BookUpdateManyArgsSchema: z.ZodType<PrismaClient.Prisma.BookUpdateManyArgs> = z.object({
  data: z.union([BookUpdateManyMutationInputSchema, BookUncheckedUpdateManyInputSchema]),
  where: BookWhereInputSchema.optional(),
}).strict();

export const BookDeleteManyArgsSchema: z.ZodType<PrismaClient.Prisma.BookDeleteManyArgs> = z.object({
  where: BookWhereInputSchema.optional(),
}).strict();

export const GenreCreateArgsSchema: z.ZodType<PrismaClient.Prisma.GenreCreateArgs> = z.object({
  select: GenreSelectSchema.optional(),
  include: GenreIncludeSchema.optional(),
  data: z.union([GenreCreateInputSchema, GenreUncheckedCreateInputSchema]),
}).strict();

export const GenreUpsertArgsSchema: z.ZodType<PrismaClient.Prisma.GenreUpsertArgs> = z.object({
  select: GenreSelectSchema.optional(),
  include: GenreIncludeSchema.optional(),
  where: GenreWhereUniqueInputSchema,
  create: z.union([GenreCreateInputSchema, GenreUncheckedCreateInputSchema]),
  update: z.union([GenreUpdateInputSchema, GenreUncheckedUpdateInputSchema]),
}).strict();

export const GenreCreateManyArgsSchema: z.ZodType<PrismaClient.Prisma.GenreCreateManyArgs> = z.object({
  data: z.union([GenreCreateManyInputSchema, GenreCreateManyInputSchema.array()]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const GenreDeleteArgsSchema: z.ZodType<PrismaClient.Prisma.GenreDeleteArgs> = z.object({
  select: GenreSelectSchema.optional(),
  include: GenreIncludeSchema.optional(),
  where: GenreWhereUniqueInputSchema,
}).strict();

export const GenreUpdateArgsSchema: z.ZodType<PrismaClient.Prisma.GenreUpdateArgs> = z.object({
  select: GenreSelectSchema.optional(),
  include: GenreIncludeSchema.optional(),
  data: z.union([GenreUpdateInputSchema, GenreUncheckedUpdateInputSchema]),
  where: GenreWhereUniqueInputSchema,
}).strict();

export const GenreUpdateManyArgsSchema: z.ZodType<PrismaClient.Prisma.GenreUpdateManyArgs> = z.object({
  data: z.union([GenreUpdateManyMutationInputSchema, GenreUncheckedUpdateManyInputSchema]),
  where: GenreWhereInputSchema.optional(),
}).strict();

export const GenreDeleteManyArgsSchema: z.ZodType<PrismaClient.Prisma.GenreDeleteManyArgs> = z.object({
  where: GenreWhereInputSchema.optional(),
}).strict();

export const AuthorCreateArgsSchema: z.ZodType<PrismaClient.Prisma.AuthorCreateArgs> = z.object({
  select: AuthorSelectSchema.optional(),
  include: AuthorIncludeSchema.optional(),
  data: z.union([AuthorCreateInputSchema, AuthorUncheckedCreateInputSchema]),
}).strict();

export const AuthorUpsertArgsSchema: z.ZodType<PrismaClient.Prisma.AuthorUpsertArgs> = z.object({
  select: AuthorSelectSchema.optional(),
  include: AuthorIncludeSchema.optional(),
  where: AuthorWhereUniqueInputSchema,
  create: z.union([AuthorCreateInputSchema, AuthorUncheckedCreateInputSchema]),
  update: z.union([AuthorUpdateInputSchema, AuthorUncheckedUpdateInputSchema]),
}).strict();

export const AuthorCreateManyArgsSchema: z.ZodType<PrismaClient.Prisma.AuthorCreateManyArgs> = z.object({
  data: z.union([AuthorCreateManyInputSchema, AuthorCreateManyInputSchema.array()]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const AuthorDeleteArgsSchema: z.ZodType<PrismaClient.Prisma.AuthorDeleteArgs> = z.object({
  select: AuthorSelectSchema.optional(),
  include: AuthorIncludeSchema.optional(),
  where: AuthorWhereUniqueInputSchema,
}).strict();

export const AuthorUpdateArgsSchema: z.ZodType<PrismaClient.Prisma.AuthorUpdateArgs> = z.object({
  select: AuthorSelectSchema.optional(),
  include: AuthorIncludeSchema.optional(),
  data: z.union([AuthorUpdateInputSchema, AuthorUncheckedUpdateInputSchema]),
  where: AuthorWhereUniqueInputSchema,
}).strict();

export const AuthorUpdateManyArgsSchema: z.ZodType<PrismaClient.Prisma.AuthorUpdateManyArgs> = z.object({
  data: z.union([AuthorUpdateManyMutationInputSchema, AuthorUncheckedUpdateManyInputSchema]),
  where: AuthorWhereInputSchema.optional(),
}).strict();

export const AuthorDeleteManyArgsSchema: z.ZodType<PrismaClient.Prisma.AuthorDeleteManyArgs> = z.object({
  where: AuthorWhereInputSchema.optional(),
}).strict();

export const VendorCreateArgsSchema: z.ZodType<PrismaClient.Prisma.VendorCreateArgs> = z.object({
  select: VendorSelectSchema.optional(),
  include: VendorIncludeSchema.optional(),
  data: z.union([VendorCreateInputSchema, VendorUncheckedCreateInputSchema]),
}).strict();

export const VendorUpsertArgsSchema: z.ZodType<PrismaClient.Prisma.VendorUpsertArgs> = z.object({
  select: VendorSelectSchema.optional(),
  include: VendorIncludeSchema.optional(),
  where: VendorWhereUniqueInputSchema,
  create: z.union([VendorCreateInputSchema, VendorUncheckedCreateInputSchema]),
  update: z.union([VendorUpdateInputSchema, VendorUncheckedUpdateInputSchema]),
}).strict();

export const VendorCreateManyArgsSchema: z.ZodType<PrismaClient.Prisma.VendorCreateManyArgs> = z.object({
  data: z.union([VendorCreateManyInputSchema, VendorCreateManyInputSchema.array()]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const VendorDeleteArgsSchema: z.ZodType<PrismaClient.Prisma.VendorDeleteArgs> = z.object({
  select: VendorSelectSchema.optional(),
  include: VendorIncludeSchema.optional(),
  where: VendorWhereUniqueInputSchema,
}).strict();

export const VendorUpdateArgsSchema: z.ZodType<PrismaClient.Prisma.VendorUpdateArgs> = z.object({
  select: VendorSelectSchema.optional(),
  include: VendorIncludeSchema.optional(),
  data: z.union([VendorUpdateInputSchema, VendorUncheckedUpdateInputSchema]),
  where: VendorWhereUniqueInputSchema,
}).strict();

export const VendorUpdateManyArgsSchema: z.ZodType<PrismaClient.Prisma.VendorUpdateManyArgs> = z.object({
  data: z.union([VendorUpdateManyMutationInputSchema, VendorUncheckedUpdateManyInputSchema]),
  where: VendorWhereInputSchema.optional(),
}).strict();

export const VendorDeleteManyArgsSchema: z.ZodType<PrismaClient.Prisma.VendorDeleteManyArgs> = z.object({
  where: VendorWhereInputSchema.optional(),
}).strict();

export const PurchaseOrderCreateArgsSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderCreateArgs> = z.object({
  select: PurchaseOrderSelectSchema.optional(),
  include: PurchaseOrderIncludeSchema.optional(),
  data: z.union([PurchaseOrderCreateInputSchema, PurchaseOrderUncheckedCreateInputSchema]),
}).strict();

export const PurchaseOrderUpsertArgsSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderUpsertArgs> = z.object({
  select: PurchaseOrderSelectSchema.optional(),
  include: PurchaseOrderIncludeSchema.optional(),
  where: PurchaseOrderWhereUniqueInputSchema,
  create: z.union([PurchaseOrderCreateInputSchema, PurchaseOrderUncheckedCreateInputSchema]),
  update: z.union([PurchaseOrderUpdateInputSchema, PurchaseOrderUncheckedUpdateInputSchema]),
}).strict();

export const PurchaseOrderCreateManyArgsSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderCreateManyArgs> = z.object({
  data: z.union([PurchaseOrderCreateManyInputSchema, PurchaseOrderCreateManyInputSchema.array()]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const PurchaseOrderDeleteArgsSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderDeleteArgs> = z.object({
  select: PurchaseOrderSelectSchema.optional(),
  include: PurchaseOrderIncludeSchema.optional(),
  where: PurchaseOrderWhereUniqueInputSchema,
}).strict();

export const PurchaseOrderUpdateArgsSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderUpdateArgs> = z.object({
  select: PurchaseOrderSelectSchema.optional(),
  include: PurchaseOrderIncludeSchema.optional(),
  data: z.union([PurchaseOrderUpdateInputSchema, PurchaseOrderUncheckedUpdateInputSchema]),
  where: PurchaseOrderWhereUniqueInputSchema,
}).strict();

export const PurchaseOrderUpdateManyArgsSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderUpdateManyArgs> = z.object({
  data: z.union([PurchaseOrderUpdateManyMutationInputSchema, PurchaseOrderUncheckedUpdateManyInputSchema]),
  where: PurchaseOrderWhereInputSchema.optional(),
}).strict();

export const PurchaseOrderDeleteManyArgsSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderDeleteManyArgs> = z.object({
  where: PurchaseOrderWhereInputSchema.optional(),
}).strict();

export const PurchaseLineCreateArgsSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineCreateArgs> = z.object({
  select: PurchaseLineSelectSchema.optional(),
  include: PurchaseLineIncludeSchema.optional(),
  data: z.union([PurchaseLineCreateInputSchema, PurchaseLineUncheckedCreateInputSchema]),
}).strict();

export const PurchaseLineUpsertArgsSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineUpsertArgs> = z.object({
  select: PurchaseLineSelectSchema.optional(),
  include: PurchaseLineIncludeSchema.optional(),
  where: PurchaseLineWhereUniqueInputSchema,
  create: z.union([PurchaseLineCreateInputSchema, PurchaseLineUncheckedCreateInputSchema]),
  update: z.union([PurchaseLineUpdateInputSchema, PurchaseLineUncheckedUpdateInputSchema]),
}).strict();

export const PurchaseLineCreateManyArgsSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineCreateManyArgs> = z.object({
  data: z.union([PurchaseLineCreateManyInputSchema, PurchaseLineCreateManyInputSchema.array()]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const PurchaseLineDeleteArgsSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineDeleteArgs> = z.object({
  select: PurchaseLineSelectSchema.optional(),
  include: PurchaseLineIncludeSchema.optional(),
  where: PurchaseLineWhereUniqueInputSchema,
}).strict();

export const PurchaseLineUpdateArgsSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineUpdateArgs> = z.object({
  select: PurchaseLineSelectSchema.optional(),
  include: PurchaseLineIncludeSchema.optional(),
  data: z.union([PurchaseLineUpdateInputSchema, PurchaseLineUncheckedUpdateInputSchema]),
  where: PurchaseLineWhereUniqueInputSchema,
}).strict();

export const PurchaseLineUpdateManyArgsSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineUpdateManyArgs> = z.object({
  data: z.union([PurchaseLineUpdateManyMutationInputSchema, PurchaseLineUncheckedUpdateManyInputSchema]),
  where: PurchaseLineWhereInputSchema.optional(),
}).strict();

export const PurchaseLineDeleteManyArgsSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineDeleteManyArgs> = z.object({
  where: PurchaseLineWhereInputSchema.optional(),
}).strict();

export const SalesReconciliationCreateArgsSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationCreateArgs> = z.object({
  select: SalesReconciliationSelectSchema.optional(),
  include: SalesReconciliationIncludeSchema.optional(),
  data: z.union([SalesReconciliationCreateInputSchema, SalesReconciliationUncheckedCreateInputSchema]),
}).strict();

export const SalesReconciliationUpsertArgsSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationUpsertArgs> = z.object({
  select: SalesReconciliationSelectSchema.optional(),
  include: SalesReconciliationIncludeSchema.optional(),
  where: SalesReconciliationWhereUniqueInputSchema,
  create: z.union([SalesReconciliationCreateInputSchema, SalesReconciliationUncheckedCreateInputSchema]),
  update: z.union([SalesReconciliationUpdateInputSchema, SalesReconciliationUncheckedUpdateInputSchema]),
}).strict();

export const SalesReconciliationCreateManyArgsSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationCreateManyArgs> = z.object({
  data: z.union([SalesReconciliationCreateManyInputSchema, SalesReconciliationCreateManyInputSchema.array()]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const SalesReconciliationDeleteArgsSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationDeleteArgs> = z.object({
  select: SalesReconciliationSelectSchema.optional(),
  include: SalesReconciliationIncludeSchema.optional(),
  where: SalesReconciliationWhereUniqueInputSchema,
}).strict();

export const SalesReconciliationUpdateArgsSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationUpdateArgs> = z.object({
  select: SalesReconciliationSelectSchema.optional(),
  include: SalesReconciliationIncludeSchema.optional(),
  data: z.union([SalesReconciliationUpdateInputSchema, SalesReconciliationUncheckedUpdateInputSchema]),
  where: SalesReconciliationWhereUniqueInputSchema,
}).strict();

export const SalesReconciliationUpdateManyArgsSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationUpdateManyArgs> = z.object({
  data: z.union([SalesReconciliationUpdateManyMutationInputSchema, SalesReconciliationUncheckedUpdateManyInputSchema]),
  where: SalesReconciliationWhereInputSchema.optional(),
}).strict();

export const SalesReconciliationDeleteManyArgsSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationDeleteManyArgs> = z.object({
  where: SalesReconciliationWhereInputSchema.optional(),
}).strict();

export const SalesLineCreateArgsSchema: z.ZodType<PrismaClient.Prisma.SalesLineCreateArgs> = z.object({
  select: SalesLineSelectSchema.optional(),
  include: SalesLineIncludeSchema.optional(),
  data: z.union([SalesLineCreateInputSchema, SalesLineUncheckedCreateInputSchema]),
}).strict();

export const SalesLineUpsertArgsSchema: z.ZodType<PrismaClient.Prisma.SalesLineUpsertArgs> = z.object({
  select: SalesLineSelectSchema.optional(),
  include: SalesLineIncludeSchema.optional(),
  where: SalesLineWhereUniqueInputSchema,
  create: z.union([SalesLineCreateInputSchema, SalesLineUncheckedCreateInputSchema]),
  update: z.union([SalesLineUpdateInputSchema, SalesLineUncheckedUpdateInputSchema]),
}).strict();

export const SalesLineCreateManyArgsSchema: z.ZodType<PrismaClient.Prisma.SalesLineCreateManyArgs> = z.object({
  data: z.union([SalesLineCreateManyInputSchema, SalesLineCreateManyInputSchema.array()]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const SalesLineDeleteArgsSchema: z.ZodType<PrismaClient.Prisma.SalesLineDeleteArgs> = z.object({
  select: SalesLineSelectSchema.optional(),
  include: SalesLineIncludeSchema.optional(),
  where: SalesLineWhereUniqueInputSchema,
}).strict();

export const SalesLineUpdateArgsSchema: z.ZodType<PrismaClient.Prisma.SalesLineUpdateArgs> = z.object({
  select: SalesLineSelectSchema.optional(),
  include: SalesLineIncludeSchema.optional(),
  data: z.union([SalesLineUpdateInputSchema, SalesLineUncheckedUpdateInputSchema]),
  where: SalesLineWhereUniqueInputSchema,
}).strict();

export const SalesLineUpdateManyArgsSchema: z.ZodType<PrismaClient.Prisma.SalesLineUpdateManyArgs> = z.object({
  data: z.union([SalesLineUpdateManyMutationInputSchema, SalesLineUncheckedUpdateManyInputSchema]),
  where: SalesLineWhereInputSchema.optional(),
}).strict();

export const SalesLineDeleteManyArgsSchema: z.ZodType<PrismaClient.Prisma.SalesLineDeleteManyArgs> = z.object({
  where: SalesLineWhereInputSchema.optional(),
}).strict();

export const BuybackOrderCreateArgsSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderCreateArgs> = z.object({
  select: BuybackOrderSelectSchema.optional(),
  include: BuybackOrderIncludeSchema.optional(),
  data: z.union([BuybackOrderCreateInputSchema, BuybackOrderUncheckedCreateInputSchema]),
}).strict();

export const BuybackOrderUpsertArgsSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderUpsertArgs> = z.object({
  select: BuybackOrderSelectSchema.optional(),
  include: BuybackOrderIncludeSchema.optional(),
  where: BuybackOrderWhereUniqueInputSchema,
  create: z.union([BuybackOrderCreateInputSchema, BuybackOrderUncheckedCreateInputSchema]),
  update: z.union([BuybackOrderUpdateInputSchema, BuybackOrderUncheckedUpdateInputSchema]),
}).strict();

export const BuybackOrderCreateManyArgsSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderCreateManyArgs> = z.object({
  data: z.union([BuybackOrderCreateManyInputSchema, BuybackOrderCreateManyInputSchema.array()]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const BuybackOrderDeleteArgsSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderDeleteArgs> = z.object({
  select: BuybackOrderSelectSchema.optional(),
  include: BuybackOrderIncludeSchema.optional(),
  where: BuybackOrderWhereUniqueInputSchema,
}).strict();

export const BuybackOrderUpdateArgsSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderUpdateArgs> = z.object({
  select: BuybackOrderSelectSchema.optional(),
  include: BuybackOrderIncludeSchema.optional(),
  data: z.union([BuybackOrderUpdateInputSchema, BuybackOrderUncheckedUpdateInputSchema]),
  where: BuybackOrderWhereUniqueInputSchema,
}).strict();

export const BuybackOrderUpdateManyArgsSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderUpdateManyArgs> = z.object({
  data: z.union([BuybackOrderUpdateManyMutationInputSchema, BuybackOrderUncheckedUpdateManyInputSchema]),
  where: BuybackOrderWhereInputSchema.optional(),
}).strict();

export const BuybackOrderDeleteManyArgsSchema: z.ZodType<PrismaClient.Prisma.BuybackOrderDeleteManyArgs> = z.object({
  where: BuybackOrderWhereInputSchema.optional(),
}).strict();

export const BuybackLineCreateArgsSchema: z.ZodType<PrismaClient.Prisma.BuybackLineCreateArgs> = z.object({
  select: BuybackLineSelectSchema.optional(),
  include: BuybackLineIncludeSchema.optional(),
  data: z.union([BuybackLineCreateInputSchema, BuybackLineUncheckedCreateInputSchema]),
}).strict();

export const BuybackLineUpsertArgsSchema: z.ZodType<PrismaClient.Prisma.BuybackLineUpsertArgs> = z.object({
  select: BuybackLineSelectSchema.optional(),
  include: BuybackLineIncludeSchema.optional(),
  where: BuybackLineWhereUniqueInputSchema,
  create: z.union([BuybackLineCreateInputSchema, BuybackLineUncheckedCreateInputSchema]),
  update: z.union([BuybackLineUpdateInputSchema, BuybackLineUncheckedUpdateInputSchema]),
}).strict();

export const BuybackLineCreateManyArgsSchema: z.ZodType<PrismaClient.Prisma.BuybackLineCreateManyArgs> = z.object({
  data: z.union([BuybackLineCreateManyInputSchema, BuybackLineCreateManyInputSchema.array()]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const BuybackLineDeleteArgsSchema: z.ZodType<PrismaClient.Prisma.BuybackLineDeleteArgs> = z.object({
  select: BuybackLineSelectSchema.optional(),
  include: BuybackLineIncludeSchema.optional(),
  where: BuybackLineWhereUniqueInputSchema,
}).strict();

export const BuybackLineUpdateArgsSchema: z.ZodType<PrismaClient.Prisma.BuybackLineUpdateArgs> = z.object({
  select: BuybackLineSelectSchema.optional(),
  include: BuybackLineIncludeSchema.optional(),
  data: z.union([BuybackLineUpdateInputSchema, BuybackLineUncheckedUpdateInputSchema]),
  where: BuybackLineWhereUniqueInputSchema,
}).strict();

export const BuybackLineUpdateManyArgsSchema: z.ZodType<PrismaClient.Prisma.BuybackLineUpdateManyArgs> = z.object({
  data: z.union([BuybackLineUpdateManyMutationInputSchema, BuybackLineUncheckedUpdateManyInputSchema]),
  where: BuybackLineWhereInputSchema.optional(),
}).strict();

export const BuybackLineDeleteManyArgsSchema: z.ZodType<PrismaClient.Prisma.BuybackLineDeleteManyArgs> = z.object({
  where: BuybackLineWhereInputSchema.optional(),
}).strict();

export const CorrectionCreateArgsSchema: z.ZodType<PrismaClient.Prisma.CorrectionCreateArgs> = z.object({
  select: CorrectionSelectSchema.optional(),
  include: CorrectionIncludeSchema.optional(),
  data: z.union([CorrectionCreateInputSchema, CorrectionUncheckedCreateInputSchema]),
}).strict();

export const CorrectionUpsertArgsSchema: z.ZodType<PrismaClient.Prisma.CorrectionUpsertArgs> = z.object({
  select: CorrectionSelectSchema.optional(),
  include: CorrectionIncludeSchema.optional(),
  where: CorrectionWhereUniqueInputSchema,
  create: z.union([CorrectionCreateInputSchema, CorrectionUncheckedCreateInputSchema]),
  update: z.union([CorrectionUpdateInputSchema, CorrectionUncheckedUpdateInputSchema]),
}).strict();

export const CorrectionCreateManyArgsSchema: z.ZodType<PrismaClient.Prisma.CorrectionCreateManyArgs> = z.object({
  data: z.union([CorrectionCreateManyInputSchema, CorrectionCreateManyInputSchema.array()]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const CorrectionDeleteArgsSchema: z.ZodType<PrismaClient.Prisma.CorrectionDeleteArgs> = z.object({
  select: CorrectionSelectSchema.optional(),
  include: CorrectionIncludeSchema.optional(),
  where: CorrectionWhereUniqueInputSchema,
}).strict();

export const CorrectionUpdateArgsSchema: z.ZodType<PrismaClient.Prisma.CorrectionUpdateArgs> = z.object({
  select: CorrectionSelectSchema.optional(),
  include: CorrectionIncludeSchema.optional(),
  data: z.union([CorrectionUpdateInputSchema, CorrectionUncheckedUpdateInputSchema]),
  where: CorrectionWhereUniqueInputSchema,
}).strict();

export const CorrectionUpdateManyArgsSchema: z.ZodType<PrismaClient.Prisma.CorrectionUpdateManyArgs> = z.object({
  data: z.union([CorrectionUpdateManyMutationInputSchema, CorrectionUncheckedUpdateManyInputSchema]),
  where: CorrectionWhereInputSchema.optional(),
}).strict();

export const CorrectionDeleteManyArgsSchema: z.ZodType<PrismaClient.Prisma.CorrectionDeleteManyArgs> = z.object({
  where: CorrectionWhereInputSchema.optional(),
}).strict();

export const CostMostRecentVendorCreateArgsSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorCreateArgs> = z.object({
  select: CostMostRecentVendorSelectSchema.optional(),
  include: CostMostRecentVendorIncludeSchema.optional(),
  data: z.union([CostMostRecentVendorCreateInputSchema, CostMostRecentVendorUncheckedCreateInputSchema]),
}).strict();

export const CostMostRecentVendorUpsertArgsSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorUpsertArgs> = z.object({
  select: CostMostRecentVendorSelectSchema.optional(),
  include: CostMostRecentVendorIncludeSchema.optional(),
  where: CostMostRecentVendorWhereUniqueInputSchema,
  create: z.union([CostMostRecentVendorCreateInputSchema, CostMostRecentVendorUncheckedCreateInputSchema]),
  update: z.union([CostMostRecentVendorUpdateInputSchema, CostMostRecentVendorUncheckedUpdateInputSchema]),
}).strict();

export const CostMostRecentVendorCreateManyArgsSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorCreateManyArgs> = z.object({
  data: z.union([CostMostRecentVendorCreateManyInputSchema, CostMostRecentVendorCreateManyInputSchema.array()]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const CostMostRecentVendorDeleteArgsSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorDeleteArgs> = z.object({
  select: CostMostRecentVendorSelectSchema.optional(),
  include: CostMostRecentVendorIncludeSchema.optional(),
  where: CostMostRecentVendorWhereUniqueInputSchema,
}).strict();

export const CostMostRecentVendorUpdateArgsSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorUpdateArgs> = z.object({
  select: CostMostRecentVendorSelectSchema.optional(),
  include: CostMostRecentVendorIncludeSchema.optional(),
  data: z.union([CostMostRecentVendorUpdateInputSchema, CostMostRecentVendorUncheckedUpdateInputSchema]),
  where: CostMostRecentVendorWhereUniqueInputSchema,
}).strict();

export const CostMostRecentVendorUpdateManyArgsSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorUpdateManyArgs> = z.object({
  data: z.union([CostMostRecentVendorUpdateManyMutationInputSchema, CostMostRecentVendorUncheckedUpdateManyInputSchema]),
  where: CostMostRecentVendorWhereInputSchema.optional(),
}).strict();

export const CostMostRecentVendorDeleteManyArgsSchema: z.ZodType<PrismaClient.Prisma.CostMostRecentVendorDeleteManyArgs> = z.object({
  where: CostMostRecentVendorWhereInputSchema.optional(),
}).strict();

export const CaseCreateArgsSchema: z.ZodType<PrismaClient.Prisma.CaseCreateArgs> = z.object({
  select: CaseSelectSchema.optional(),
  include: CaseIncludeSchema.optional(),
  data: z.union([CaseCreateInputSchema, CaseUncheckedCreateInputSchema]),
}).strict();

export const CaseUpsertArgsSchema: z.ZodType<PrismaClient.Prisma.CaseUpsertArgs> = z.object({
  select: CaseSelectSchema.optional(),
  include: CaseIncludeSchema.optional(),
  where: CaseWhereUniqueInputSchema,
  create: z.union([CaseCreateInputSchema, CaseUncheckedCreateInputSchema]),
  update: z.union([CaseUpdateInputSchema, CaseUncheckedUpdateInputSchema]),
}).strict();

export const CaseCreateManyArgsSchema: z.ZodType<PrismaClient.Prisma.CaseCreateManyArgs> = z.object({
  data: z.union([CaseCreateManyInputSchema, CaseCreateManyInputSchema.array()]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const CaseDeleteArgsSchema: z.ZodType<PrismaClient.Prisma.CaseDeleteArgs> = z.object({
  select: CaseSelectSchema.optional(),
  include: CaseIncludeSchema.optional(),
  where: CaseWhereUniqueInputSchema,
}).strict();

export const CaseUpdateArgsSchema: z.ZodType<PrismaClient.Prisma.CaseUpdateArgs> = z.object({
  select: CaseSelectSchema.optional(),
  include: CaseIncludeSchema.optional(),
  data: z.union([CaseUpdateInputSchema, CaseUncheckedUpdateInputSchema]),
  where: CaseWhereUniqueInputSchema,
}).strict();

export const CaseUpdateManyArgsSchema: z.ZodType<PrismaClient.Prisma.CaseUpdateManyArgs> = z.object({
  data: z.union([CaseUpdateManyMutationInputSchema, CaseUncheckedUpdateManyInputSchema]),
  where: CaseWhereInputSchema.optional(),
}).strict();

export const CaseDeleteManyArgsSchema: z.ZodType<PrismaClient.Prisma.CaseDeleteManyArgs> = z.object({
  where: CaseWhereInputSchema.optional(),
}).strict();

export const ShelfCreateArgsSchema: z.ZodType<PrismaClient.Prisma.ShelfCreateArgs> = z.object({
  select: ShelfSelectSchema.optional(),
  include: ShelfIncludeSchema.optional(),
  data: z.union([ShelfCreateInputSchema, ShelfUncheckedCreateInputSchema]),
}).strict();

export const ShelfUpsertArgsSchema: z.ZodType<PrismaClient.Prisma.ShelfUpsertArgs> = z.object({
  select: ShelfSelectSchema.optional(),
  include: ShelfIncludeSchema.optional(),
  where: ShelfWhereUniqueInputSchema,
  create: z.union([ShelfCreateInputSchema, ShelfUncheckedCreateInputSchema]),
  update: z.union([ShelfUpdateInputSchema, ShelfUncheckedUpdateInputSchema]),
}).strict();

export const ShelfCreateManyArgsSchema: z.ZodType<PrismaClient.Prisma.ShelfCreateManyArgs> = z.object({
  data: z.union([ShelfCreateManyInputSchema, ShelfCreateManyInputSchema.array()]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const ShelfDeleteArgsSchema: z.ZodType<PrismaClient.Prisma.ShelfDeleteArgs> = z.object({
  select: ShelfSelectSchema.optional(),
  include: ShelfIncludeSchema.optional(),
  where: ShelfWhereUniqueInputSchema,
}).strict();

export const ShelfUpdateArgsSchema: z.ZodType<PrismaClient.Prisma.ShelfUpdateArgs> = z.object({
  select: ShelfSelectSchema.optional(),
  include: ShelfIncludeSchema.optional(),
  data: z.union([ShelfUpdateInputSchema, ShelfUncheckedUpdateInputSchema]),
  where: ShelfWhereUniqueInputSchema,
}).strict();

export const ShelfUpdateManyArgsSchema: z.ZodType<PrismaClient.Prisma.ShelfUpdateManyArgs> = z.object({
  data: z.union([ShelfUpdateManyMutationInputSchema, ShelfUncheckedUpdateManyInputSchema]),
  where: ShelfWhereInputSchema.optional(),
}).strict();

export const ShelfDeleteManyArgsSchema: z.ZodType<PrismaClient.Prisma.ShelfDeleteManyArgs> = z.object({
  where: ShelfWhereInputSchema.optional(),
}).strict();

export const BookOnShelfCreateArgsSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfCreateArgs> = z.object({
  select: BookOnShelfSelectSchema.optional(),
  include: BookOnShelfIncludeSchema.optional(),
  data: z.union([BookOnShelfCreateInputSchema, BookOnShelfUncheckedCreateInputSchema]),
}).strict();

export const BookOnShelfUpsertArgsSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfUpsertArgs> = z.object({
  select: BookOnShelfSelectSchema.optional(),
  include: BookOnShelfIncludeSchema.optional(),
  where: BookOnShelfWhereUniqueInputSchema,
  create: z.union([BookOnShelfCreateInputSchema, BookOnShelfUncheckedCreateInputSchema]),
  update: z.union([BookOnShelfUpdateInputSchema, BookOnShelfUncheckedUpdateInputSchema]),
}).strict();

export const BookOnShelfCreateManyArgsSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfCreateManyArgs> = z.object({
  data: z.union([BookOnShelfCreateManyInputSchema, BookOnShelfCreateManyInputSchema.array()]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const BookOnShelfDeleteArgsSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfDeleteArgs> = z.object({
  select: BookOnShelfSelectSchema.optional(),
  include: BookOnShelfIncludeSchema.optional(),
  where: BookOnShelfWhereUniqueInputSchema,
}).strict();

export const BookOnShelfUpdateArgsSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfUpdateArgs> = z.object({
  select: BookOnShelfSelectSchema.optional(),
  include: BookOnShelfIncludeSchema.optional(),
  data: z.union([BookOnShelfUpdateInputSchema, BookOnShelfUncheckedUpdateInputSchema]),
  where: BookOnShelfWhereUniqueInputSchema,
}).strict();

export const BookOnShelfUpdateManyArgsSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfUpdateManyArgs> = z.object({
  data: z.union([BookOnShelfUpdateManyMutationInputSchema, BookOnShelfUncheckedUpdateManyInputSchema]),
  where: BookOnShelfWhereInputSchema.optional(),
}).strict();

export const BookOnShelfDeleteManyArgsSchema: z.ZodType<PrismaClient.Prisma.BookOnShelfDeleteManyArgs> = z.object({
  where: BookOnShelfWhereInputSchema.optional(),
}).strict();

export const ExampleCreateArgsSchema: z.ZodType<PrismaClient.Prisma.ExampleCreateArgs> = z.object({
  select: ExampleSelectSchema.optional(),
  data: z.union([ExampleCreateInputSchema, ExampleUncheckedCreateInputSchema]),
}).strict();

export const ExampleUpsertArgsSchema: z.ZodType<PrismaClient.Prisma.ExampleUpsertArgs> = z.object({
  select: ExampleSelectSchema.optional(),
  where: ExampleWhereUniqueInputSchema,
  create: z.union([ExampleCreateInputSchema, ExampleUncheckedCreateInputSchema]),
  update: z.union([ExampleUpdateInputSchema, ExampleUncheckedUpdateInputSchema]),
}).strict();

export const ExampleCreateManyArgsSchema: z.ZodType<PrismaClient.Prisma.ExampleCreateManyArgs> = z.object({
  data: z.union([ExampleCreateManyInputSchema, ExampleCreateManyInputSchema.array()]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const ExampleDeleteArgsSchema: z.ZodType<PrismaClient.Prisma.ExampleDeleteArgs> = z.object({
  select: ExampleSelectSchema.optional(),
  where: ExampleWhereUniqueInputSchema,
}).strict();

export const ExampleUpdateArgsSchema: z.ZodType<PrismaClient.Prisma.ExampleUpdateArgs> = z.object({
  select: ExampleSelectSchema.optional(),
  data: z.union([ExampleUpdateInputSchema, ExampleUncheckedUpdateInputSchema]),
  where: ExampleWhereUniqueInputSchema,
}).strict();

export const ExampleUpdateManyArgsSchema: z.ZodType<PrismaClient.Prisma.ExampleUpdateManyArgs> = z.object({
  data: z.union([ExampleUpdateManyMutationInputSchema, ExampleUncheckedUpdateManyInputSchema]),
  where: ExampleWhereInputSchema.optional(),
}).strict();

export const ExampleDeleteManyArgsSchema: z.ZodType<PrismaClient.Prisma.ExampleDeleteManyArgs> = z.object({
  where: ExampleWhereInputSchema.optional(),
}).strict();

export const AccountCreateArgsSchema: z.ZodType<PrismaClient.Prisma.AccountCreateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([AccountCreateInputSchema, AccountUncheckedCreateInputSchema]),
}).strict();

export const AccountUpsertArgsSchema: z.ZodType<PrismaClient.Prisma.AccountUpsertArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
  create: z.union([AccountCreateInputSchema, AccountUncheckedCreateInputSchema]),
  update: z.union([AccountUpdateInputSchema, AccountUncheckedUpdateInputSchema]),
}).strict();

export const AccountCreateManyArgsSchema: z.ZodType<PrismaClient.Prisma.AccountCreateManyArgs> = z.object({
  data: z.union([AccountCreateManyInputSchema, AccountCreateManyInputSchema.array()]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const AccountDeleteArgsSchema: z.ZodType<PrismaClient.Prisma.AccountDeleteArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict();

export const AccountUpdateArgsSchema: z.ZodType<PrismaClient.Prisma.AccountUpdateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([AccountUpdateInputSchema, AccountUncheckedUpdateInputSchema]),
  where: AccountWhereUniqueInputSchema,
}).strict();

export const AccountUpdateManyArgsSchema: z.ZodType<PrismaClient.Prisma.AccountUpdateManyArgs> = z.object({
  data: z.union([AccountUpdateManyMutationInputSchema, AccountUncheckedUpdateManyInputSchema]),
  where: AccountWhereInputSchema.optional(),
}).strict();

export const AccountDeleteManyArgsSchema: z.ZodType<PrismaClient.Prisma.AccountDeleteManyArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
}).strict();

export const SessionCreateArgsSchema: z.ZodType<PrismaClient.Prisma.SessionCreateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([SessionCreateInputSchema, SessionUncheckedCreateInputSchema]),
}).strict();

export const SessionUpsertArgsSchema: z.ZodType<PrismaClient.Prisma.SessionUpsertArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
  create: z.union([SessionCreateInputSchema, SessionUncheckedCreateInputSchema]),
  update: z.union([SessionUpdateInputSchema, SessionUncheckedUpdateInputSchema]),
}).strict();

export const SessionCreateManyArgsSchema: z.ZodType<PrismaClient.Prisma.SessionCreateManyArgs> = z.object({
  data: z.union([SessionCreateManyInputSchema, SessionCreateManyInputSchema.array()]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const SessionDeleteArgsSchema: z.ZodType<PrismaClient.Prisma.SessionDeleteArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict();

export const SessionUpdateArgsSchema: z.ZodType<PrismaClient.Prisma.SessionUpdateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([SessionUpdateInputSchema, SessionUncheckedUpdateInputSchema]),
  where: SessionWhereUniqueInputSchema,
}).strict();

export const SessionUpdateManyArgsSchema: z.ZodType<PrismaClient.Prisma.SessionUpdateManyArgs> = z.object({
  data: z.union([SessionUpdateManyMutationInputSchema, SessionUncheckedUpdateManyInputSchema]),
  where: SessionWhereInputSchema.optional(),
}).strict();

export const SessionDeleteManyArgsSchema: z.ZodType<PrismaClient.Prisma.SessionDeleteManyArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
}).strict();

export const UserCreateArgsSchema: z.ZodType<PrismaClient.Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
}).strict();

export const UserUpsertArgsSchema: z.ZodType<PrismaClient.Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
  update: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
}).strict();

export const UserCreateManyArgsSchema: z.ZodType<PrismaClient.Prisma.UserCreateManyArgs> = z.object({
  data: z.union([UserCreateManyInputSchema, UserCreateManyInputSchema.array()]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const UserDeleteArgsSchema: z.ZodType<PrismaClient.Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict();

export const UserUpdateArgsSchema: z.ZodType<PrismaClient.Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
  where: UserWhereUniqueInputSchema,
}).strict();

export const UserUpdateManyArgsSchema: z.ZodType<PrismaClient.Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([UserUpdateManyMutationInputSchema, UserUncheckedUpdateManyInputSchema]),
  where: UserWhereInputSchema.optional(),
}).strict();

export const UserDeleteManyArgsSchema: z.ZodType<PrismaClient.Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict();

export const VerificationTokenCreateArgsSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenCreateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([VerificationTokenCreateInputSchema, VerificationTokenUncheckedCreateInputSchema]),
}).strict();

export const VerificationTokenUpsertArgsSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenUpsertArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
  create: z.union([VerificationTokenCreateInputSchema, VerificationTokenUncheckedCreateInputSchema]),
  update: z.union([VerificationTokenUpdateInputSchema, VerificationTokenUncheckedUpdateInputSchema]),
}).strict();

export const VerificationTokenCreateManyArgsSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenCreateManyArgs> = z.object({
  data: z.union([VerificationTokenCreateManyInputSchema, VerificationTokenCreateManyInputSchema.array()]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const VerificationTokenDeleteArgsSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenDeleteArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict();

export const VerificationTokenUpdateArgsSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenUpdateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([VerificationTokenUpdateInputSchema, VerificationTokenUncheckedUpdateInputSchema]),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict();

export const VerificationTokenUpdateManyArgsSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenUpdateManyArgs> = z.object({
  data: z.union([VerificationTokenUpdateManyMutationInputSchema, VerificationTokenUncheckedUpdateManyInputSchema]),
  where: VerificationTokenWhereInputSchema.optional(),
}).strict();

export const VerificationTokenDeleteManyArgsSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenDeleteManyArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
}).strict();

export const ImageCreateArgsSchema: z.ZodType<PrismaClient.Prisma.ImageCreateArgs> = z.object({
  select: ImageSelectSchema.optional(),
  data: z.union([ImageCreateInputSchema, ImageUncheckedCreateInputSchema]),
}).strict();

export const ImageUpsertArgsSchema: z.ZodType<PrismaClient.Prisma.ImageUpsertArgs> = z.object({
  select: ImageSelectSchema.optional(),
  where: ImageWhereUniqueInputSchema,
  create: z.union([ImageCreateInputSchema, ImageUncheckedCreateInputSchema]),
  update: z.union([ImageUpdateInputSchema, ImageUncheckedUpdateInputSchema]),
}).strict();

export const ImageCreateManyArgsSchema: z.ZodType<PrismaClient.Prisma.ImageCreateManyArgs> = z.object({
  data: z.union([ImageCreateManyInputSchema, ImageCreateManyInputSchema.array()]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const ImageDeleteArgsSchema: z.ZodType<PrismaClient.Prisma.ImageDeleteArgs> = z.object({
  select: ImageSelectSchema.optional(),
  where: ImageWhereUniqueInputSchema,
}).strict();

export const ImageUpdateArgsSchema: z.ZodType<PrismaClient.Prisma.ImageUpdateArgs> = z.object({
  select: ImageSelectSchema.optional(),
  data: z.union([ImageUpdateInputSchema, ImageUncheckedUpdateInputSchema]),
  where: ImageWhereUniqueInputSchema,
}).strict();

export const ImageUpdateManyArgsSchema: z.ZodType<PrismaClient.Prisma.ImageUpdateManyArgs> = z.object({
  data: z.union([ImageUpdateManyMutationInputSchema, ImageUncheckedUpdateManyInputSchema]),
  where: ImageWhereInputSchema.optional(),
}).strict();

export const ImageDeleteManyArgsSchema: z.ZodType<PrismaClient.Prisma.ImageDeleteManyArgs> = z.object({
  where: ImageWhereInputSchema.optional(),
}).strict();
