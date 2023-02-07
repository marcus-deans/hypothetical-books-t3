import { z } from "zod";
import * as PrismaClient from "@prisma/client";

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

// PRISMA GENERATED ENUMS
//------------------------------------------------------

export const AccountScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.AccountScalarFieldEnum);

export const AuthorScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.AuthorScalarFieldEnum);

export const BookScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.BookScalarFieldEnum);

export const ExampleScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.ExampleScalarFieldEnum);

export const GenreScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.GenreScalarFieldEnum);

export const PurchaseLineScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.PurchaseLineScalarFieldEnum);

export const PurchaseOrderScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.PurchaseOrderScalarFieldEnum);

export const QueryModeSchema = z.nativeEnum(PrismaClient.Prisma.QueryMode);

export const SalesLineScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.SalesLineScalarFieldEnum);

export const SalesReconciliationScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.SalesReconciliationScalarFieldEnum);

export const SessionScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.SessionScalarFieldEnum);

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
});

// GENRE
//------------------------------------------------------

export const GenreSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
});

// AUTHOR
//------------------------------------------------------

export const AuthorSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
});

// VENDOR
//------------------------------------------------------

export const VendorSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
});

// PURCHASE ORDER
//------------------------------------------------------

export const PurchaseOrderSchema = z.object({
  id: z.string().cuid(),
  date: z.date(),
  vendorId: z.string(),
});

// PURCHASE LINE
//------------------------------------------------------

export const PurchaseLineSchema = z.object({
  id: z.string().cuid(),
  bookId: z.string(),
  quantity: z.number().int(),
  unitWholesalePrice: z.number(),
  purchaseOrderId: z.string(),
});

// SALES RECONCILIATION
//------------------------------------------------------

export const SalesReconciliationSchema = z.object({
  id: z.string().cuid(),
  date: z.date(),
});

// SALES LINE
//------------------------------------------------------

export const SalesLineSchema = z.object({
  id: z.string().cuid(),
  bookId: z.string(),
  quantity: z.number().int(),
  unitWholesalePrice: z.number(),
  salesReconciliationId: z.string(),
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
  password: z.string(),
});

// VERIFICATION TOKEN
//------------------------------------------------------

export const VerificationTokenSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.date(),
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
  saleReconciliationLines: z.union([z.boolean(), z.lazy(() => SalesLineFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => BookCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const BookCountOutputTypeArgsSchema: z.ZodType<PrismaClient.Prisma.BookCountOutputTypeArgs> = z.object({
  select: z.lazy(() => BookCountOutputTypeSelectSchema).nullish(),
}).strict();

export const BookCountOutputTypeSelectSchema: z.ZodType<PrismaClient.Prisma.BookCountOutputTypeSelect> = z.object({
  authors: z.boolean().optional(),
  purchaseLines: z.boolean().optional(),
  saleReconciliationLines: z.boolean().optional(),
}).strict();

export const BookSelectSchema: z.ZodType<PrismaClient.Prisma.BookSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  authors: z.union([z.boolean(), z.lazy(() => AuthorFindManyArgsSchema)]).optional(),
  isbn_13: z.boolean().optional(),
  isbn_10: z.boolean().optional(),
  publisher: z.boolean().optional(),
  publicationYear: z.boolean().optional(),
  pageCount: z.boolean().optional(),
  width: z.boolean().optional(),
  height: z.boolean().optional(),
  thickness: z.boolean().optional(),
  retailPrice: z.boolean().optional(),
  genre: z.union([z.boolean(), z.lazy(() => GenreArgsSchema)]).optional(),
  genreId: z.boolean().optional(),
  purchaseLines: z.union([z.boolean(), z.lazy(() => PurchaseLineFindManyArgsSchema)]).optional(),
  saleReconciliationLines: z.union([z.boolean(), z.lazy(() => SalesLineFindManyArgsSchema)]).optional(),
  inventoryCount: z.boolean().optional(),
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
  _count: z.union([z.boolean(), z.lazy(() => VendorCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const VendorCountOutputTypeArgsSchema: z.ZodType<PrismaClient.Prisma.VendorCountOutputTypeArgs> = z.object({
  select: z.lazy(() => VendorCountOutputTypeSelectSchema).nullish(),
}).strict();

export const VendorCountOutputTypeSelectSchema: z.ZodType<PrismaClient.Prisma.VendorCountOutputTypeSelect> = z.object({
  purchaseOrder: z.boolean().optional(),
}).strict();

export const VendorSelectSchema: z.ZodType<PrismaClient.Prisma.VendorSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  purchaseOrder: z.union([z.boolean(), z.lazy(() => PurchaseOrderFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => VendorCountOutputTypeArgsSchema)]).optional(),
}).strict();

// PURCHASE ORDER
//------------------------------------------------------

export const PurchaseOrderArgsSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderArgs> = z.object({
  select: z.lazy(() => PurchaseOrderSelectSchema).optional(),
  include: z.lazy(() => PurchaseOrderIncludeSchema).optional(),
}).strict();

export const PurchaseOrderIncludeSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderInclude> = z.object({
  vendor: z.union([z.boolean(), z.lazy(() => VendorArgsSchema)]).optional(),
  purchaseLines: z.union([z.boolean(), z.lazy(() => PurchaseLineFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => PurchaseOrderCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const PurchaseOrderCountOutputTypeArgsSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderCountOutputTypeArgs> = z.object({
  select: z.lazy(() => PurchaseOrderCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PurchaseOrderCountOutputTypeSelectSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderCountOutputTypeSelect> = z.object({
  purchaseLines: z.boolean().optional(),
}).strict();

export const PurchaseOrderSelectSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderSelect> = z.object({
  id: z.boolean().optional(),
  date: z.boolean().optional(),
  vendor: z.union([z.boolean(), z.lazy(() => VendorArgsSchema)]).optional(),
  vendorId: z.boolean().optional(),
  purchaseLines: z.union([z.boolean(), z.lazy(() => PurchaseLineFindManyArgsSchema)]).optional(),
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
}).strict();

export const PurchaseLineSelectSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineSelect> = z.object({
  id: z.boolean().optional(),
  book: z.union([z.boolean(), z.lazy(() => BookArgsSchema)]).optional(),
  bookId: z.boolean().optional(),
  quantity: z.boolean().optional(),
  unitWholesalePrice: z.boolean().optional(),
  purchaseOrder: z.union([z.boolean(), z.lazy(() => PurchaseOrderArgsSchema)]).optional(),
  purchaseOrderId: z.boolean().optional(),
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
  book: z.union([z.boolean(), z.lazy(() => BookArgsSchema)]).optional(),
  bookId: z.boolean().optional(),
  quantity: z.boolean().optional(),
  unitWholesalePrice: z.boolean().optional(),
  salesReconciliation: z.union([z.boolean(), z.lazy(() => SalesReconciliationArgsSchema)]).optional(),
  salesReconciliationId: z.boolean().optional(),
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
  _count: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<PrismaClient.Prisma.UserCountOutputTypeArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<PrismaClient.Prisma.UserCountOutputTypeSelect> = z.object({
  accounts: z.boolean().optional(),
  sessions: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<PrismaClient.Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  password: z.boolean().optional(),
  accounts: z.union([z.boolean(), z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(), z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict();

// VERIFICATION TOKEN
//------------------------------------------------------

export const VerificationTokenSelectSchema: z.ZodType<PrismaClient.Prisma.VerificationTokenSelect> = z.object({
  identifier: z.boolean().optional(),
  token: z.boolean().optional(),
  expires: z.boolean().optional(),
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
  authors: z.lazy(() => AuthorListRelationFilterSchema).optional(),
  isbn_13: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  isbn_10: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  publisher: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  publicationYear: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
  pageCount: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
  width: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
  height: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
  thickness: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
  retailPrice: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
  genre: z.union([z.lazy(() => GenreRelationFilterSchema), z.lazy(() => GenreWhereInputSchema)]).optional(),
  genreId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  purchaseLines: z.lazy(() => PurchaseLineListRelationFilterSchema).optional(),
  saleReconciliationLines: z.lazy(() => SalesLineListRelationFilterSchema).optional(),
  inventoryCount: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
}).strict();

export const BookOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.BookOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  authors: z.lazy(() => AuthorOrderByRelationAggregateInputSchema).optional(),
  isbn_13: z.lazy(() => SortOrderSchema).optional(),
  isbn_10: z.lazy(() => SortOrderSchema).optional(),
  publisher: z.lazy(() => SortOrderSchema).optional(),
  publicationYear: z.lazy(() => SortOrderSchema).optional(),
  pageCount: z.lazy(() => SortOrderSchema).optional(),
  width: z.lazy(() => SortOrderSchema).optional(),
  height: z.lazy(() => SortOrderSchema).optional(),
  thickness: z.lazy(() => SortOrderSchema).optional(),
  retailPrice: z.lazy(() => SortOrderSchema).optional(),
  genre: z.lazy(() => GenreOrderByWithRelationInputSchema).optional(),
  genreId: z.lazy(() => SortOrderSchema).optional(),
  purchaseLines: z.lazy(() => PurchaseLineOrderByRelationAggregateInputSchema).optional(),
  saleReconciliationLines: z.lazy(() => SalesLineOrderByRelationAggregateInputSchema).optional(),
  inventoryCount: z.lazy(() => SortOrderSchema).optional(),
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
}).strict();

export const GenreWhereInputSchema: z.ZodType<PrismaClient.Prisma.GenreWhereInput> = z.object({
  AND: z.union([z.lazy(() => GenreWhereInputSchema), z.lazy(() => GenreWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => GenreWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => GenreWhereInputSchema), z.lazy(() => GenreWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  books: z.lazy(() => BookListRelationFilterSchema).optional(),
}).strict();

export const GenreOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.GenreOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  books: z.lazy(() => BookOrderByRelationAggregateInputSchema).optional(),
}).strict();

export const GenreWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.GenreWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
}).strict();

export const GenreOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.GenreOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
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
}).strict();

export const AuthorWhereInputSchema: z.ZodType<PrismaClient.Prisma.AuthorWhereInput> = z.object({
  AND: z.union([z.lazy(() => AuthorWhereInputSchema), z.lazy(() => AuthorWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => AuthorWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => AuthorWhereInputSchema), z.lazy(() => AuthorWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  books: z.lazy(() => BookListRelationFilterSchema).optional(),
}).strict();

export const AuthorOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.AuthorOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  books: z.lazy(() => BookOrderByRelationAggregateInputSchema).optional(),
}).strict();

export const AuthorWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.AuthorWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
}).strict();

export const AuthorOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.AuthorOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
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
}).strict();

export const VendorWhereInputSchema: z.ZodType<PrismaClient.Prisma.VendorWhereInput> = z.object({
  AND: z.union([z.lazy(() => VendorWhereInputSchema), z.lazy(() => VendorWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => VendorWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => VendorWhereInputSchema), z.lazy(() => VendorWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  purchaseOrder: z.lazy(() => PurchaseOrderListRelationFilterSchema).optional(),
}).strict();

export const VendorOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.VendorOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  purchaseOrder: z.lazy(() => PurchaseOrderOrderByRelationAggregateInputSchema).optional(),
}).strict();

export const VendorWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.VendorWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
}).strict();

export const VendorOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.VendorOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => VendorCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VendorMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VendorMinOrderByAggregateInputSchema).optional(),
}).strict();

export const VendorScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.VendorScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => VendorScalarWhereWithAggregatesInputSchema), z.lazy(() => VendorScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => VendorScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => VendorScalarWhereWithAggregatesInputSchema), z.lazy(() => VendorScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
}).strict();

export const PurchaseOrderWhereInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderWhereInput> = z.object({
  AND: z.union([z.lazy(() => PurchaseOrderWhereInputSchema), z.lazy(() => PurchaseOrderWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => PurchaseOrderWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => PurchaseOrderWhereInputSchema), z.lazy(() => PurchaseOrderWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  date: z.union([z.lazy(() => DateTimeFilterSchema), z.date()]).optional(),
  vendor: z.union([z.lazy(() => VendorRelationFilterSchema), z.lazy(() => VendorWhereInputSchema)]).optional(),
  vendorId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  purchaseLines: z.lazy(() => PurchaseLineListRelationFilterSchema).optional(),
}).strict();

export const PurchaseOrderOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  vendor: z.lazy(() => VendorOrderByWithRelationInputSchema).optional(),
  vendorId: z.lazy(() => SortOrderSchema).optional(),
  purchaseLines: z.lazy(() => PurchaseLineOrderByRelationAggregateInputSchema).optional(),
}).strict();

export const PurchaseOrderWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
}).strict();

export const PurchaseOrderOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  vendorId: z.lazy(() => SortOrderSchema).optional(),
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
  vendorId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
}).strict();

export const PurchaseLineWhereInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineWhereInput> = z.object({
  AND: z.union([z.lazy(() => PurchaseLineWhereInputSchema), z.lazy(() => PurchaseLineWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => PurchaseLineWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => PurchaseLineWhereInputSchema), z.lazy(() => PurchaseLineWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  book: z.union([z.lazy(() => BookRelationFilterSchema), z.lazy(() => BookWhereInputSchema)]).optional(),
  bookId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  quantity: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
  unitWholesalePrice: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
  purchaseOrder: z.union([z.lazy(() => PurchaseOrderRelationFilterSchema), z.lazy(() => PurchaseOrderWhereInputSchema)]).optional(),
  purchaseOrderId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
}).strict();

export const PurchaseLineOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  book: z.lazy(() => BookOrderByWithRelationInputSchema).optional(),
  bookId: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  unitWholesalePrice: z.lazy(() => SortOrderSchema).optional(),
  purchaseOrder: z.lazy(() => PurchaseOrderOrderByWithRelationInputSchema).optional(),
  purchaseOrderId: z.lazy(() => SortOrderSchema).optional(),
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
}).strict();

export const SalesReconciliationWhereInputSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationWhereInput> = z.object({
  AND: z.union([z.lazy(() => SalesReconciliationWhereInputSchema), z.lazy(() => SalesReconciliationWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => SalesReconciliationWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => SalesReconciliationWhereInputSchema), z.lazy(() => SalesReconciliationWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  date: z.union([z.lazy(() => DateTimeFilterSchema), z.date()]).optional(),
  salesLines: z.lazy(() => SalesLineListRelationFilterSchema).optional(),
}).strict();

export const SalesReconciliationOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  salesLines: z.lazy(() => SalesLineOrderByRelationAggregateInputSchema).optional(),
}).strict();

export const SalesReconciliationWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
}).strict();

export const SalesReconciliationOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
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
}).strict();

export const SalesLineWhereInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineWhereInput> = z.object({
  AND: z.union([z.lazy(() => SalesLineWhereInputSchema), z.lazy(() => SalesLineWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => SalesLineWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => SalesLineWhereInputSchema), z.lazy(() => SalesLineWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  book: z.union([z.lazy(() => BookRelationFilterSchema), z.lazy(() => BookWhereInputSchema)]).optional(),
  bookId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  quantity: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
  unitWholesalePrice: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
  salesReconciliation: z.union([z.lazy(() => SalesReconciliationRelationFilterSchema), z.lazy(() => SalesReconciliationWhereInputSchema)]).optional(),
  salesReconciliationId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
}).strict();

export const SalesLineOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  book: z.lazy(() => BookOrderByWithRelationInputSchema).optional(),
  bookId: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  unitWholesalePrice: z.lazy(() => SortOrderSchema).optional(),
  salesReconciliation: z.lazy(() => SalesReconciliationOrderByWithRelationInputSchema).optional(),
  salesReconciliationId: z.lazy(() => SortOrderSchema).optional(),
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
  password: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  accounts: z.lazy(() => AccountOrderByRelationAggregateInputSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.UserWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
}).strict();

export const UserOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => UserScalarWhereWithAggregatesInputSchema), z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => UserScalarWhereWithAggregatesInputSchema), z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  password: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
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

export const BookCreateInputSchema: z.ZodType<PrismaClient.Prisma.BookCreateInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  authors: z.lazy(() => AuthorCreateNestedManyWithoutBooksInputSchema).optional(),
  isbn_13: z.string(),
  isbn_10: z.string().optional().nullable(),
  publisher: z.string(),
  publicationYear: z.number().int(),
  pageCount: z.number().int(),
  width: z.number(),
  height: z.number(),
  thickness: z.number(),
  retailPrice: z.number(),
  genre: z.lazy(() => GenreCreateNestedOneWithoutBooksInputSchema),
  purchaseLines: z.lazy(() => PurchaseLineCreateNestedManyWithoutBookInputSchema).optional(),
  saleReconciliationLines: z.lazy(() => SalesLineCreateNestedManyWithoutBookInputSchema).optional(),
  inventoryCount: z.number().int(),
}).strict();

export const BookUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.BookUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  authors: z.lazy(() => AuthorUncheckedCreateNestedManyWithoutBooksInputSchema).optional(),
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
  purchaseLines: z.lazy(() => PurchaseLineUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  saleReconciliationLines: z.lazy(() => SalesLineUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  inventoryCount: z.number().int(),
}).strict();

export const BookUpdateInputSchema: z.ZodType<PrismaClient.Prisma.BookUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  authors: z.lazy(() => AuthorUpdateManyWithoutBooksNestedInputSchema).optional(),
  isbn_13: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_10: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  publisher: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  publicationYear: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  pageCount: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  width: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  height: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  thickness: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  retailPrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  genre: z.lazy(() => GenreUpdateOneRequiredWithoutBooksNestedInputSchema).optional(),
  purchaseLines: z.lazy(() => PurchaseLineUpdateManyWithoutBookNestedInputSchema).optional(),
  saleReconciliationLines: z.lazy(() => SalesLineUpdateManyWithoutBookNestedInputSchema).optional(),
  inventoryCount: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const BookUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.BookUncheckedUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  authors: z.lazy(() => AuthorUncheckedUpdateManyWithoutBooksNestedInputSchema).optional(),
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
  purchaseLines: z.lazy(() => PurchaseLineUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  saleReconciliationLines: z.lazy(() => SalesLineUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  inventoryCount: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
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
}).strict();

export const GenreCreateInputSchema: z.ZodType<PrismaClient.Prisma.GenreCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  books: z.lazy(() => BookCreateNestedManyWithoutGenreInputSchema).optional(),
}).strict();

export const GenreUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.GenreUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  books: z.lazy(() => BookUncheckedCreateNestedManyWithoutGenreInputSchema).optional(),
}).strict();

export const GenreUpdateInputSchema: z.ZodType<PrismaClient.Prisma.GenreUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  books: z.lazy(() => BookUpdateManyWithoutGenreNestedInputSchema).optional(),
}).strict();

export const GenreUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.GenreUncheckedUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  books: z.lazy(() => BookUncheckedUpdateManyWithoutGenreNestedInputSchema).optional(),
}).strict();

export const GenreCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.GenreCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
}).strict();

export const GenreUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.GenreUpdateManyMutationInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const GenreUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.GenreUncheckedUpdateManyInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const AuthorCreateInputSchema: z.ZodType<PrismaClient.Prisma.AuthorCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  books: z.lazy(() => BookCreateNestedManyWithoutAuthorsInputSchema).optional(),
}).strict();

export const AuthorUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.AuthorUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  books: z.lazy(() => BookUncheckedCreateNestedManyWithoutAuthorsInputSchema).optional(),
}).strict();

export const AuthorUpdateInputSchema: z.ZodType<PrismaClient.Prisma.AuthorUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  books: z.lazy(() => BookUpdateManyWithoutAuthorsNestedInputSchema).optional(),
}).strict();

export const AuthorUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.AuthorUncheckedUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  books: z.lazy(() => BookUncheckedUpdateManyWithoutAuthorsNestedInputSchema).optional(),
}).strict();

export const AuthorCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.AuthorCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
}).strict();

export const AuthorUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.AuthorUpdateManyMutationInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const AuthorUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.AuthorUncheckedUpdateManyInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const VendorCreateInputSchema: z.ZodType<PrismaClient.Prisma.VendorCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  purchaseOrder: z.lazy(() => PurchaseOrderCreateNestedManyWithoutVendorInputSchema).optional(),
}).strict();

export const VendorUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.VendorUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  purchaseOrder: z.lazy(() => PurchaseOrderUncheckedCreateNestedManyWithoutVendorInputSchema).optional(),
}).strict();

export const VendorUpdateInputSchema: z.ZodType<PrismaClient.Prisma.VendorUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  purchaseOrder: z.lazy(() => PurchaseOrderUpdateManyWithoutVendorNestedInputSchema).optional(),
}).strict();

export const VendorUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.VendorUncheckedUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  purchaseOrder: z.lazy(() => PurchaseOrderUncheckedUpdateManyWithoutVendorNestedInputSchema).optional(),
}).strict();

export const VendorCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.VendorCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
}).strict();

export const VendorUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.VendorUpdateManyMutationInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const VendorUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.VendorUncheckedUpdateManyInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const PurchaseOrderCreateInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderCreateInput> = z.object({
  id: z.string().cuid().optional(),
  date: z.date(),
  vendor: z.lazy(() => VendorCreateNestedOneWithoutPurchaseOrderInputSchema),
  purchaseLines: z.lazy(() => PurchaseLineCreateNestedManyWithoutPurchaseOrderInputSchema).optional(),
}).strict();

export const PurchaseOrderUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  date: z.date(),
  vendorId: z.string(),
  purchaseLines: z.lazy(() => PurchaseLineUncheckedCreateNestedManyWithoutPurchaseOrderInputSchema).optional(),
}).strict();

export const PurchaseOrderUpdateInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  vendor: z.lazy(() => VendorUpdateOneRequiredWithoutPurchaseOrderNestedInputSchema).optional(),
  purchaseLines: z.lazy(() => PurchaseLineUpdateManyWithoutPurchaseOrderNestedInputSchema).optional(),
}).strict();

export const PurchaseOrderUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderUncheckedUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  vendorId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  purchaseLines: z.lazy(() => PurchaseLineUncheckedUpdateManyWithoutPurchaseOrderNestedInputSchema).optional(),
}).strict();

export const PurchaseOrderCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  date: z.date(),
  vendorId: z.string(),
}).strict();

export const PurchaseOrderUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderUpdateManyMutationInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const PurchaseOrderUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderUncheckedUpdateManyInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  vendorId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const PurchaseLineCreateInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineCreateInput> = z.object({
  id: z.string().cuid().optional(),
  book: z.lazy(() => BookCreateNestedOneWithoutPurchaseLinesInputSchema),
  quantity: z.number().int(),
  unitWholesalePrice: z.number(),
  purchaseOrder: z.lazy(() => PurchaseOrderCreateNestedOneWithoutPurchaseLinesInputSchema),
}).strict();

export const PurchaseLineUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  bookId: z.string(),
  quantity: z.number().int(),
  unitWholesalePrice: z.number(),
  purchaseOrderId: z.string(),
}).strict();

export const PurchaseLineUpdateInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  book: z.lazy(() => BookUpdateOneRequiredWithoutPurchaseLinesNestedInputSchema).optional(),
  quantity: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  unitWholesalePrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  purchaseOrder: z.lazy(() => PurchaseOrderUpdateOneRequiredWithoutPurchaseLinesNestedInputSchema).optional(),
}).strict();

export const PurchaseLineUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineUncheckedUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  bookId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  unitWholesalePrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  purchaseOrderId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const PurchaseLineCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  bookId: z.string(),
  quantity: z.number().int(),
  unitWholesalePrice: z.number(),
  purchaseOrderId: z.string(),
}).strict();

export const PurchaseLineUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineUpdateManyMutationInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  unitWholesalePrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const PurchaseLineUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineUncheckedUpdateManyInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  bookId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  unitWholesalePrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  purchaseOrderId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const SalesReconciliationCreateInputSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationCreateInput> = z.object({
  id: z.string().cuid().optional(),
  date: z.date(),
  salesLines: z.lazy(() => SalesLineCreateNestedManyWithoutSalesReconciliationInputSchema).optional(),
}).strict();

export const SalesReconciliationUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  date: z.date(),
  salesLines: z.lazy(() => SalesLineUncheckedCreateNestedManyWithoutSalesReconciliationInputSchema).optional(),
}).strict();

export const SalesReconciliationUpdateInputSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  salesLines: z.lazy(() => SalesLineUpdateManyWithoutSalesReconciliationNestedInputSchema).optional(),
}).strict();

export const SalesReconciliationUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationUncheckedUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  salesLines: z.lazy(() => SalesLineUncheckedUpdateManyWithoutSalesReconciliationNestedInputSchema).optional(),
}).strict();

export const SalesReconciliationCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  date: z.date(),
}).strict();

export const SalesReconciliationUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationUpdateManyMutationInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const SalesReconciliationUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationUncheckedUpdateManyInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const SalesLineCreateInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineCreateInput> = z.object({
  id: z.string().cuid().optional(),
  book: z.lazy(() => BookCreateNestedOneWithoutSaleReconciliationLinesInputSchema),
  quantity: z.number().int(),
  unitWholesalePrice: z.number(),
  salesReconciliation: z.lazy(() => SalesReconciliationCreateNestedOneWithoutSalesLinesInputSchema),
}).strict();

export const SalesLineUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  bookId: z.string(),
  quantity: z.number().int(),
  unitWholesalePrice: z.number(),
  salesReconciliationId: z.string(),
}).strict();

export const SalesLineUpdateInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  book: z.lazy(() => BookUpdateOneRequiredWithoutSaleReconciliationLinesNestedInputSchema).optional(),
  quantity: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  unitWholesalePrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  salesReconciliation: z.lazy(() => SalesReconciliationUpdateOneRequiredWithoutSalesLinesNestedInputSchema).optional(),
}).strict();

export const SalesLineUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineUncheckedUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  bookId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  unitWholesalePrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  salesReconciliationId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const SalesLineCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  bookId: z.string(),
  quantity: z.number().int(),
  unitWholesalePrice: z.number(),
  salesReconciliationId: z.string(),
}).strict();

export const SalesLineUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineUpdateManyMutationInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  unitWholesalePrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const SalesLineUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineUncheckedUpdateManyInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  bookId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  unitWholesalePrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  salesReconciliationId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
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
  password: z.string(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  password: z.string(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
}).strict();

export const UserUpdateInputSchema: z.ZodType<PrismaClient.Prisma.UserUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  password: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  password: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
}).strict();

export const UserCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  password: z.string(),
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  password: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  password: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
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

export const AuthorListRelationFilterSchema: z.ZodType<PrismaClient.Prisma.AuthorListRelationFilter> = z.object({
  every: z.lazy(() => AuthorWhereInputSchema).optional(),
  some: z.lazy(() => AuthorWhereInputSchema).optional(),
  none: z.lazy(() => AuthorWhereInputSchema).optional(),
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

export const AuthorOrderByRelationAggregateInputSchema: z.ZodType<PrismaClient.Prisma.AuthorOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const PurchaseLineOrderByRelationAggregateInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SalesLineOrderByRelationAggregateInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineOrderByRelationAggregateInput> = z.object({
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

export const BookListRelationFilterSchema: z.ZodType<PrismaClient.Prisma.BookListRelationFilter> = z.object({
  every: z.lazy(() => BookWhereInputSchema).optional(),
  some: z.lazy(() => BookWhereInputSchema).optional(),
  none: z.lazy(() => BookWhereInputSchema).optional(),
}).strict();

export const BookOrderByRelationAggregateInputSchema: z.ZodType<PrismaClient.Prisma.BookOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const GenreCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.GenreCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const GenreMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.GenreMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const GenreMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.GenreMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const AuthorCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.AuthorCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const AuthorMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.AuthorMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const AuthorMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.AuthorMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const PurchaseOrderListRelationFilterSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderListRelationFilter> = z.object({
  every: z.lazy(() => PurchaseOrderWhereInputSchema).optional(),
  some: z.lazy(() => PurchaseOrderWhereInputSchema).optional(),
  none: z.lazy(() => PurchaseOrderWhereInputSchema).optional(),
}).strict();

export const PurchaseOrderOrderByRelationAggregateInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const VendorCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.VendorCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const VendorMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.VendorMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const VendorMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.VendorMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
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

export const VendorRelationFilterSchema: z.ZodType<PrismaClient.Prisma.VendorRelationFilter> = z.object({
  is: z.lazy(() => VendorWhereInputSchema).optional(),
  isNot: z.lazy(() => VendorWhereInputSchema).optional(),
}).strict();

export const PurchaseOrderCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  vendorId: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const PurchaseOrderMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  vendorId: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const PurchaseOrderMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  vendorId: z.lazy(() => SortOrderSchema).optional(),
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

export const PurchaseLineCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bookId: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  unitWholesalePrice: z.lazy(() => SortOrderSchema).optional(),
  purchaseOrderId: z.lazy(() => SortOrderSchema).optional(),
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
}).strict();

export const PurchaseLineMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bookId: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  unitWholesalePrice: z.lazy(() => SortOrderSchema).optional(),
  purchaseOrderId: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const PurchaseLineSumOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineSumOrderByAggregateInput> = z.object({
  quantity: z.lazy(() => SortOrderSchema).optional(),
  unitWholesalePrice: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SalesReconciliationCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SalesReconciliationMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SalesReconciliationMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
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
}).strict();

export const SalesLineMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bookId: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  unitWholesalePrice: z.lazy(() => SortOrderSchema).optional(),
  salesReconciliationId: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SalesLineSumOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineSumOrderByAggregateInput> = z.object({
  quantity: z.lazy(() => SortOrderSchema).optional(),
  unitWholesalePrice: z.lazy(() => SortOrderSchema).optional(),
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

export const UserRelationFilterSchema: z.ZodType<PrismaClient.Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional(),
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

export const AccountOrderByRelationAggregateInputSchema: z.ZodType<PrismaClient.Prisma.AccountOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<PrismaClient.Prisma.SessionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
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

export const StringFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional(),
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

export const PurchaseOrderUncheckedCreateNestedManyWithoutVendorInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderUncheckedCreateNestedManyWithoutVendorInput> = z.object({
  create: z.union([z.lazy(() => PurchaseOrderCreateWithoutVendorInputSchema), z.lazy(() => PurchaseOrderCreateWithoutVendorInputSchema).array(), z.lazy(() => PurchaseOrderUncheckedCreateWithoutVendorInputSchema), z.lazy(() => PurchaseOrderUncheckedCreateWithoutVendorInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PurchaseOrderCreateOrConnectWithoutVendorInputSchema), z.lazy(() => PurchaseOrderCreateOrConnectWithoutVendorInputSchema).array()]).optional(),
  createMany: z.lazy(() => PurchaseOrderCreateManyVendorInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => PurchaseOrderWhereUniqueInputSchema), z.lazy(() => PurchaseOrderWhereUniqueInputSchema).array()]).optional(),
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

export const PurchaseLineUncheckedCreateNestedManyWithoutPurchaseOrderInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineUncheckedCreateNestedManyWithoutPurchaseOrderInput> = z.object({
  create: z.union([z.lazy(() => PurchaseLineCreateWithoutPurchaseOrderInputSchema), z.lazy(() => PurchaseLineCreateWithoutPurchaseOrderInputSchema).array(), z.lazy(() => PurchaseLineUncheckedCreateWithoutPurchaseOrderInputSchema), z.lazy(() => PurchaseLineUncheckedCreateWithoutPurchaseOrderInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PurchaseLineCreateOrConnectWithoutPurchaseOrderInputSchema), z.lazy(() => PurchaseLineCreateOrConnectWithoutPurchaseOrderInputSchema).array()]).optional(),
  createMany: z.lazy(() => PurchaseLineCreateManyPurchaseOrderInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => PurchaseLineWhereUniqueInputSchema), z.lazy(() => PurchaseLineWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.date().optional(),
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

export const BookCreateNestedOneWithoutSaleReconciliationLinesInputSchema: z.ZodType<PrismaClient.Prisma.BookCreateNestedOneWithoutSaleReconciliationLinesInput> = z.object({
  create: z.union([z.lazy(() => BookCreateWithoutSaleReconciliationLinesInputSchema), z.lazy(() => BookUncheckedCreateWithoutSaleReconciliationLinesInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => BookCreateOrConnectWithoutSaleReconciliationLinesInputSchema).optional(),
  connect: z.lazy(() => BookWhereUniqueInputSchema).optional(),
}).strict();

export const SalesReconciliationCreateNestedOneWithoutSalesLinesInputSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationCreateNestedOneWithoutSalesLinesInput> = z.object({
  create: z.union([z.lazy(() => SalesReconciliationCreateWithoutSalesLinesInputSchema), z.lazy(() => SalesReconciliationUncheckedCreateWithoutSalesLinesInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => SalesReconciliationCreateOrConnectWithoutSalesLinesInputSchema).optional(),
  connect: z.lazy(() => SalesReconciliationWhereUniqueInputSchema).optional(),
}).strict();

export const BookUpdateOneRequiredWithoutSaleReconciliationLinesNestedInputSchema: z.ZodType<PrismaClient.Prisma.BookUpdateOneRequiredWithoutSaleReconciliationLinesNestedInput> = z.object({
  create: z.union([z.lazy(() => BookCreateWithoutSaleReconciliationLinesInputSchema), z.lazy(() => BookUncheckedCreateWithoutSaleReconciliationLinesInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => BookCreateOrConnectWithoutSaleReconciliationLinesInputSchema).optional(),
  upsert: z.lazy(() => BookUpsertWithoutSaleReconciliationLinesInputSchema).optional(),
  connect: z.lazy(() => BookWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => BookUpdateWithoutSaleReconciliationLinesInputSchema), z.lazy(() => BookUncheckedUpdateWithoutSaleReconciliationLinesInputSchema)]).optional(),
}).strict();

export const SalesReconciliationUpdateOneRequiredWithoutSalesLinesNestedInputSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationUpdateOneRequiredWithoutSalesLinesNestedInput> = z.object({
  create: z.union([z.lazy(() => SalesReconciliationCreateWithoutSalesLinesInputSchema), z.lazy(() => SalesReconciliationUncheckedCreateWithoutSalesLinesInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => SalesReconciliationCreateOrConnectWithoutSalesLinesInputSchema).optional(),
  upsert: z.lazy(() => SalesReconciliationUpsertWithoutSalesLinesInputSchema).optional(),
  connect: z.lazy(() => SalesReconciliationWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => SalesReconciliationUpdateWithoutSalesLinesInputSchema), z.lazy(() => SalesReconciliationUncheckedUpdateWithoutSalesLinesInputSchema)]).optional(),
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
}).strict();

export const AuthorUncheckedCreateWithoutBooksInputSchema: z.ZodType<PrismaClient.Prisma.AuthorUncheckedCreateWithoutBooksInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
}).strict();

export const AuthorCreateOrConnectWithoutBooksInputSchema: z.ZodType<PrismaClient.Prisma.AuthorCreateOrConnectWithoutBooksInput> = z.object({
  where: z.lazy(() => AuthorWhereUniqueInputSchema),
  create: z.union([z.lazy(() => AuthorCreateWithoutBooksInputSchema), z.lazy(() => AuthorUncheckedCreateWithoutBooksInputSchema)]),
}).strict();

export const GenreCreateWithoutBooksInputSchema: z.ZodType<PrismaClient.Prisma.GenreCreateWithoutBooksInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
}).strict();

export const GenreUncheckedCreateWithoutBooksInputSchema: z.ZodType<PrismaClient.Prisma.GenreUncheckedCreateWithoutBooksInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
}).strict();

export const GenreCreateOrConnectWithoutBooksInputSchema: z.ZodType<PrismaClient.Prisma.GenreCreateOrConnectWithoutBooksInput> = z.object({
  where: z.lazy(() => GenreWhereUniqueInputSchema),
  create: z.union([z.lazy(() => GenreCreateWithoutBooksInputSchema), z.lazy(() => GenreUncheckedCreateWithoutBooksInputSchema)]),
}).strict();

export const PurchaseLineCreateWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineCreateWithoutBookInput> = z.object({
  id: z.string().optional(),
  quantity: z.number(),
  unitWholesalePrice: z.number(),
  purchaseOrder: z.lazy(() => PurchaseOrderCreateNestedOneWithoutPurchaseLinesInputSchema),
}).strict();

export const PurchaseLineUncheckedCreateWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineUncheckedCreateWithoutBookInput> = z.object({
  id: z.string().optional(),
  quantity: z.number(),
  unitWholesalePrice: z.number(),
  purchaseOrderId: z.string(),
}).strict();

export const PurchaseLineCreateOrConnectWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineCreateOrConnectWithoutBookInput> = z.object({
  where: z.lazy(() => PurchaseLineWhereUniqueInputSchema),
  create: z.union([z.lazy(() => PurchaseLineCreateWithoutBookInputSchema), z.lazy(() => PurchaseLineUncheckedCreateWithoutBookInputSchema)]),
}).strict();

export const PurchaseLineCreateManyBookInputEnvelopeSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineCreateManyBookInputEnvelope> = z.object({
  data: z.lazy(() => PurchaseLineCreateManyBookInputSchema).array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const SalesLineCreateWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineCreateWithoutBookInput> = z.object({
  id: z.string().optional(),
  quantity: z.number(),
  unitWholesalePrice: z.number(),
  salesReconciliation: z.lazy(() => SalesReconciliationCreateNestedOneWithoutSalesLinesInputSchema),
}).strict();

export const SalesLineUncheckedCreateWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineUncheckedCreateWithoutBookInput> = z.object({
  id: z.string().optional(),
  quantity: z.number(),
  unitWholesalePrice: z.number(),
  salesReconciliationId: z.string(),
}).strict();

export const SalesLineCreateOrConnectWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineCreateOrConnectWithoutBookInput> = z.object({
  where: z.lazy(() => SalesLineWhereUniqueInputSchema),
  create: z.union([z.lazy(() => SalesLineCreateWithoutBookInputSchema), z.lazy(() => SalesLineUncheckedCreateWithoutBookInputSchema)]),
}).strict();

export const SalesLineCreateManyBookInputEnvelopeSchema: z.ZodType<PrismaClient.Prisma.SalesLineCreateManyBookInputEnvelope> = z.object({
  data: z.lazy(() => SalesLineCreateManyBookInputSchema).array(),
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
}).strict();

export const GenreUpsertWithoutBooksInputSchema: z.ZodType<PrismaClient.Prisma.GenreUpsertWithoutBooksInput> = z.object({
  update: z.union([z.lazy(() => GenreUpdateWithoutBooksInputSchema), z.lazy(() => GenreUncheckedUpdateWithoutBooksInputSchema)]),
  create: z.union([z.lazy(() => GenreCreateWithoutBooksInputSchema), z.lazy(() => GenreUncheckedCreateWithoutBooksInputSchema)]),
}).strict();

export const GenreUpdateWithoutBooksInputSchema: z.ZodType<PrismaClient.Prisma.GenreUpdateWithoutBooksInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const GenreUncheckedUpdateWithoutBooksInputSchema: z.ZodType<PrismaClient.Prisma.GenreUncheckedUpdateWithoutBooksInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
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
  data: z.union([z.lazy(() => SalesLineUpdateManyMutationInputSchema), z.lazy(() => SalesLineUncheckedUpdateManyWithoutSaleReconciliationLinesInputSchema)]),
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
}).strict();

export const BookCreateWithoutGenreInputSchema: z.ZodType<PrismaClient.Prisma.BookCreateWithoutGenreInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  authors: z.lazy(() => AuthorCreateNestedManyWithoutBooksInputSchema).optional(),
  isbn_13: z.string(),
  isbn_10: z.string().optional().nullable(),
  publisher: z.string(),
  publicationYear: z.number(),
  pageCount: z.number(),
  width: z.number(),
  height: z.number(),
  thickness: z.number(),
  retailPrice: z.number(),
  purchaseLines: z.lazy(() => PurchaseLineCreateNestedManyWithoutBookInputSchema).optional(),
  saleReconciliationLines: z.lazy(() => SalesLineCreateNestedManyWithoutBookInputSchema).optional(),
  inventoryCount: z.number(),
}).strict();

export const BookUncheckedCreateWithoutGenreInputSchema: z.ZodType<PrismaClient.Prisma.BookUncheckedCreateWithoutGenreInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  authors: z.lazy(() => AuthorUncheckedCreateNestedManyWithoutBooksInputSchema).optional(),
  isbn_13: z.string(),
  isbn_10: z.string().optional().nullable(),
  publisher: z.string(),
  publicationYear: z.number(),
  pageCount: z.number(),
  width: z.number(),
  height: z.number(),
  thickness: z.number(),
  retailPrice: z.number(),
  purchaseLines: z.lazy(() => PurchaseLineUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  saleReconciliationLines: z.lazy(() => SalesLineUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  inventoryCount: z.number(),
}).strict();

export const BookCreateOrConnectWithoutGenreInputSchema: z.ZodType<PrismaClient.Prisma.BookCreateOrConnectWithoutGenreInput> = z.object({
  where: z.lazy(() => BookWhereUniqueInputSchema),
  create: z.union([z.lazy(() => BookCreateWithoutGenreInputSchema), z.lazy(() => BookUncheckedCreateWithoutGenreInputSchema)]),
}).strict();

export const BookCreateManyGenreInputEnvelopeSchema: z.ZodType<PrismaClient.Prisma.BookCreateManyGenreInputEnvelope> = z.object({
  data: z.lazy(() => BookCreateManyGenreInputSchema).array(),
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
  genre: z.lazy(() => GenreCreateNestedOneWithoutBooksInputSchema),
  purchaseLines: z.lazy(() => PurchaseLineCreateNestedManyWithoutBookInputSchema).optional(),
  saleReconciliationLines: z.lazy(() => SalesLineCreateNestedManyWithoutBookInputSchema).optional(),
  inventoryCount: z.number(),
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
  purchaseLines: z.lazy(() => PurchaseLineUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  saleReconciliationLines: z.lazy(() => SalesLineUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  inventoryCount: z.number(),
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
  purchaseLines: z.lazy(() => PurchaseLineCreateNestedManyWithoutPurchaseOrderInputSchema).optional(),
}).strict();

export const PurchaseOrderUncheckedCreateWithoutVendorInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderUncheckedCreateWithoutVendorInput> = z.object({
  id: z.string().optional(),
  date: z.date(),
  purchaseLines: z.lazy(() => PurchaseLineUncheckedCreateNestedManyWithoutPurchaseOrderInputSchema).optional(),
}).strict();

export const PurchaseOrderCreateOrConnectWithoutVendorInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderCreateOrConnectWithoutVendorInput> = z.object({
  where: z.lazy(() => PurchaseOrderWhereUniqueInputSchema),
  create: z.union([z.lazy(() => PurchaseOrderCreateWithoutVendorInputSchema), z.lazy(() => PurchaseOrderUncheckedCreateWithoutVendorInputSchema)]),
}).strict();

export const PurchaseOrderCreateManyVendorInputEnvelopeSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderCreateManyVendorInputEnvelope> = z.object({
  data: z.lazy(() => PurchaseOrderCreateManyVendorInputSchema).array(),
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
  vendorId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
}).strict();

export const VendorCreateWithoutPurchaseOrderInputSchema: z.ZodType<PrismaClient.Prisma.VendorCreateWithoutPurchaseOrderInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
}).strict();

export const VendorUncheckedCreateWithoutPurchaseOrderInputSchema: z.ZodType<PrismaClient.Prisma.VendorUncheckedCreateWithoutPurchaseOrderInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
}).strict();

export const VendorCreateOrConnectWithoutPurchaseOrderInputSchema: z.ZodType<PrismaClient.Prisma.VendorCreateOrConnectWithoutPurchaseOrderInput> = z.object({
  where: z.lazy(() => VendorWhereUniqueInputSchema),
  create: z.union([z.lazy(() => VendorCreateWithoutPurchaseOrderInputSchema), z.lazy(() => VendorUncheckedCreateWithoutPurchaseOrderInputSchema)]),
}).strict();

export const PurchaseLineCreateWithoutPurchaseOrderInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineCreateWithoutPurchaseOrderInput> = z.object({
  id: z.string().optional(),
  book: z.lazy(() => BookCreateNestedOneWithoutPurchaseLinesInputSchema),
  quantity: z.number(),
  unitWholesalePrice: z.number(),
}).strict();

export const PurchaseLineUncheckedCreateWithoutPurchaseOrderInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineUncheckedCreateWithoutPurchaseOrderInput> = z.object({
  id: z.string().optional(),
  bookId: z.string(),
  quantity: z.number(),
  unitWholesalePrice: z.number(),
}).strict();

export const PurchaseLineCreateOrConnectWithoutPurchaseOrderInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineCreateOrConnectWithoutPurchaseOrderInput> = z.object({
  where: z.lazy(() => PurchaseLineWhereUniqueInputSchema),
  create: z.union([z.lazy(() => PurchaseLineCreateWithoutPurchaseOrderInputSchema), z.lazy(() => PurchaseLineUncheckedCreateWithoutPurchaseOrderInputSchema)]),
}).strict();

export const PurchaseLineCreateManyPurchaseOrderInputEnvelopeSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineCreateManyPurchaseOrderInputEnvelope> = z.object({
  data: z.lazy(() => PurchaseLineCreateManyPurchaseOrderInputSchema).array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const VendorUpsertWithoutPurchaseOrderInputSchema: z.ZodType<PrismaClient.Prisma.VendorUpsertWithoutPurchaseOrderInput> = z.object({
  update: z.union([z.lazy(() => VendorUpdateWithoutPurchaseOrderInputSchema), z.lazy(() => VendorUncheckedUpdateWithoutPurchaseOrderInputSchema)]),
  create: z.union([z.lazy(() => VendorCreateWithoutPurchaseOrderInputSchema), z.lazy(() => VendorUncheckedCreateWithoutPurchaseOrderInputSchema)]),
}).strict();

export const VendorUpdateWithoutPurchaseOrderInputSchema: z.ZodType<PrismaClient.Prisma.VendorUpdateWithoutPurchaseOrderInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const VendorUncheckedUpdateWithoutPurchaseOrderInputSchema: z.ZodType<PrismaClient.Prisma.VendorUncheckedUpdateWithoutPurchaseOrderInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
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

export const BookCreateWithoutPurchaseLinesInputSchema: z.ZodType<PrismaClient.Prisma.BookCreateWithoutPurchaseLinesInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  authors: z.lazy(() => AuthorCreateNestedManyWithoutBooksInputSchema).optional(),
  isbn_13: z.string(),
  isbn_10: z.string().optional().nullable(),
  publisher: z.string(),
  publicationYear: z.number(),
  pageCount: z.number(),
  width: z.number(),
  height: z.number(),
  thickness: z.number(),
  retailPrice: z.number(),
  genre: z.lazy(() => GenreCreateNestedOneWithoutBooksInputSchema),
  saleReconciliationLines: z.lazy(() => SalesLineCreateNestedManyWithoutBookInputSchema).optional(),
  inventoryCount: z.number(),
}).strict();

export const BookUncheckedCreateWithoutPurchaseLinesInputSchema: z.ZodType<PrismaClient.Prisma.BookUncheckedCreateWithoutPurchaseLinesInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  authors: z.lazy(() => AuthorUncheckedCreateNestedManyWithoutBooksInputSchema).optional(),
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
  saleReconciliationLines: z.lazy(() => SalesLineUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  inventoryCount: z.number(),
}).strict();

export const BookCreateOrConnectWithoutPurchaseLinesInputSchema: z.ZodType<PrismaClient.Prisma.BookCreateOrConnectWithoutPurchaseLinesInput> = z.object({
  where: z.lazy(() => BookWhereUniqueInputSchema),
  create: z.union([z.lazy(() => BookCreateWithoutPurchaseLinesInputSchema), z.lazy(() => BookUncheckedCreateWithoutPurchaseLinesInputSchema)]),
}).strict();

export const PurchaseOrderCreateWithoutPurchaseLinesInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderCreateWithoutPurchaseLinesInput> = z.object({
  id: z.string().optional(),
  date: z.date(),
  vendor: z.lazy(() => VendorCreateNestedOneWithoutPurchaseOrderInputSchema),
}).strict();

export const PurchaseOrderUncheckedCreateWithoutPurchaseLinesInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderUncheckedCreateWithoutPurchaseLinesInput> = z.object({
  id: z.string().optional(),
  date: z.date(),
  vendorId: z.string(),
}).strict();

export const PurchaseOrderCreateOrConnectWithoutPurchaseLinesInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderCreateOrConnectWithoutPurchaseLinesInput> = z.object({
  where: z.lazy(() => PurchaseOrderWhereUniqueInputSchema),
  create: z.union([z.lazy(() => PurchaseOrderCreateWithoutPurchaseLinesInputSchema), z.lazy(() => PurchaseOrderUncheckedCreateWithoutPurchaseLinesInputSchema)]),
}).strict();

export const BookUpsertWithoutPurchaseLinesInputSchema: z.ZodType<PrismaClient.Prisma.BookUpsertWithoutPurchaseLinesInput> = z.object({
  update: z.union([z.lazy(() => BookUpdateWithoutPurchaseLinesInputSchema), z.lazy(() => BookUncheckedUpdateWithoutPurchaseLinesInputSchema)]),
  create: z.union([z.lazy(() => BookCreateWithoutPurchaseLinesInputSchema), z.lazy(() => BookUncheckedCreateWithoutPurchaseLinesInputSchema)]),
}).strict();

export const BookUpdateWithoutPurchaseLinesInputSchema: z.ZodType<PrismaClient.Prisma.BookUpdateWithoutPurchaseLinesInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  authors: z.lazy(() => AuthorUpdateManyWithoutBooksNestedInputSchema).optional(),
  isbn_13: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_10: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  publisher: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  publicationYear: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  pageCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  width: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  height: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  thickness: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  retailPrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  genre: z.lazy(() => GenreUpdateOneRequiredWithoutBooksNestedInputSchema).optional(),
  saleReconciliationLines: z.lazy(() => SalesLineUpdateManyWithoutBookNestedInputSchema).optional(),
  inventoryCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const BookUncheckedUpdateWithoutPurchaseLinesInputSchema: z.ZodType<PrismaClient.Prisma.BookUncheckedUpdateWithoutPurchaseLinesInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  authors: z.lazy(() => AuthorUncheckedUpdateManyWithoutBooksNestedInputSchema).optional(),
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
  saleReconciliationLines: z.lazy(() => SalesLineUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  inventoryCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const PurchaseOrderUpsertWithoutPurchaseLinesInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderUpsertWithoutPurchaseLinesInput> = z.object({
  update: z.union([z.lazy(() => PurchaseOrderUpdateWithoutPurchaseLinesInputSchema), z.lazy(() => PurchaseOrderUncheckedUpdateWithoutPurchaseLinesInputSchema)]),
  create: z.union([z.lazy(() => PurchaseOrderCreateWithoutPurchaseLinesInputSchema), z.lazy(() => PurchaseOrderUncheckedCreateWithoutPurchaseLinesInputSchema)]),
}).strict();

export const PurchaseOrderUpdateWithoutPurchaseLinesInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderUpdateWithoutPurchaseLinesInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  vendor: z.lazy(() => VendorUpdateOneRequiredWithoutPurchaseOrderNestedInputSchema).optional(),
}).strict();

export const PurchaseOrderUncheckedUpdateWithoutPurchaseLinesInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderUncheckedUpdateWithoutPurchaseLinesInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  vendorId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const SalesLineCreateWithoutSalesReconciliationInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineCreateWithoutSalesReconciliationInput> = z.object({
  id: z.string().optional(),
  book: z.lazy(() => BookCreateNestedOneWithoutSaleReconciliationLinesInputSchema),
  quantity: z.number(),
  unitWholesalePrice: z.number(),
}).strict();

export const SalesLineUncheckedCreateWithoutSalesReconciliationInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineUncheckedCreateWithoutSalesReconciliationInput> = z.object({
  id: z.string().optional(),
  bookId: z.string(),
  quantity: z.number(),
  unitWholesalePrice: z.number(),
}).strict();

export const SalesLineCreateOrConnectWithoutSalesReconciliationInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineCreateOrConnectWithoutSalesReconciliationInput> = z.object({
  where: z.lazy(() => SalesLineWhereUniqueInputSchema),
  create: z.union([z.lazy(() => SalesLineCreateWithoutSalesReconciliationInputSchema), z.lazy(() => SalesLineUncheckedCreateWithoutSalesReconciliationInputSchema)]),
}).strict();

export const SalesLineCreateManySalesReconciliationInputEnvelopeSchema: z.ZodType<PrismaClient.Prisma.SalesLineCreateManySalesReconciliationInputEnvelope> = z.object({
  data: z.lazy(() => SalesLineCreateManySalesReconciliationInputSchema).array(),
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

export const BookCreateWithoutSaleReconciliationLinesInputSchema: z.ZodType<PrismaClient.Prisma.BookCreateWithoutSaleReconciliationLinesInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  authors: z.lazy(() => AuthorCreateNestedManyWithoutBooksInputSchema).optional(),
  isbn_13: z.string(),
  isbn_10: z.string().optional().nullable(),
  publisher: z.string(),
  publicationYear: z.number(),
  pageCount: z.number(),
  width: z.number(),
  height: z.number(),
  thickness: z.number(),
  retailPrice: z.number(),
  genre: z.lazy(() => GenreCreateNestedOneWithoutBooksInputSchema),
  purchaseLines: z.lazy(() => PurchaseLineCreateNestedManyWithoutBookInputSchema).optional(),
  inventoryCount: z.number(),
}).strict();

export const BookUncheckedCreateWithoutSaleReconciliationLinesInputSchema: z.ZodType<PrismaClient.Prisma.BookUncheckedCreateWithoutSaleReconciliationLinesInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  authors: z.lazy(() => AuthorUncheckedCreateNestedManyWithoutBooksInputSchema).optional(),
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
  purchaseLines: z.lazy(() => PurchaseLineUncheckedCreateNestedManyWithoutBookInputSchema).optional(),
  inventoryCount: z.number(),
}).strict();

export const BookCreateOrConnectWithoutSaleReconciliationLinesInputSchema: z.ZodType<PrismaClient.Prisma.BookCreateOrConnectWithoutSaleReconciliationLinesInput> = z.object({
  where: z.lazy(() => BookWhereUniqueInputSchema),
  create: z.union([z.lazy(() => BookCreateWithoutSaleReconciliationLinesInputSchema), z.lazy(() => BookUncheckedCreateWithoutSaleReconciliationLinesInputSchema)]),
}).strict();

export const SalesReconciliationCreateWithoutSalesLinesInputSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationCreateWithoutSalesLinesInput> = z.object({
  id: z.string().optional(),
  date: z.date(),
}).strict();

export const SalesReconciliationUncheckedCreateWithoutSalesLinesInputSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationUncheckedCreateWithoutSalesLinesInput> = z.object({
  id: z.string().optional(),
  date: z.date(),
}).strict();

export const SalesReconciliationCreateOrConnectWithoutSalesLinesInputSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationCreateOrConnectWithoutSalesLinesInput> = z.object({
  where: z.lazy(() => SalesReconciliationWhereUniqueInputSchema),
  create: z.union([z.lazy(() => SalesReconciliationCreateWithoutSalesLinesInputSchema), z.lazy(() => SalesReconciliationUncheckedCreateWithoutSalesLinesInputSchema)]),
}).strict();

export const BookUpsertWithoutSaleReconciliationLinesInputSchema: z.ZodType<PrismaClient.Prisma.BookUpsertWithoutSaleReconciliationLinesInput> = z.object({
  update: z.union([z.lazy(() => BookUpdateWithoutSaleReconciliationLinesInputSchema), z.lazy(() => BookUncheckedUpdateWithoutSaleReconciliationLinesInputSchema)]),
  create: z.union([z.lazy(() => BookCreateWithoutSaleReconciliationLinesInputSchema), z.lazy(() => BookUncheckedCreateWithoutSaleReconciliationLinesInputSchema)]),
}).strict();

export const BookUpdateWithoutSaleReconciliationLinesInputSchema: z.ZodType<PrismaClient.Prisma.BookUpdateWithoutSaleReconciliationLinesInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  authors: z.lazy(() => AuthorUpdateManyWithoutBooksNestedInputSchema).optional(),
  isbn_13: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_10: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  publisher: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  publicationYear: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  pageCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  width: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  height: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  thickness: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  retailPrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  genre: z.lazy(() => GenreUpdateOneRequiredWithoutBooksNestedInputSchema).optional(),
  purchaseLines: z.lazy(() => PurchaseLineUpdateManyWithoutBookNestedInputSchema).optional(),
  inventoryCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const BookUncheckedUpdateWithoutSaleReconciliationLinesInputSchema: z.ZodType<PrismaClient.Prisma.BookUncheckedUpdateWithoutSaleReconciliationLinesInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  authors: z.lazy(() => AuthorUncheckedUpdateManyWithoutBooksNestedInputSchema).optional(),
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
  purchaseLines: z.lazy(() => PurchaseLineUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  inventoryCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const SalesReconciliationUpsertWithoutSalesLinesInputSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationUpsertWithoutSalesLinesInput> = z.object({
  update: z.union([z.lazy(() => SalesReconciliationUpdateWithoutSalesLinesInputSchema), z.lazy(() => SalesReconciliationUncheckedUpdateWithoutSalesLinesInputSchema)]),
  create: z.union([z.lazy(() => SalesReconciliationCreateWithoutSalesLinesInputSchema), z.lazy(() => SalesReconciliationUncheckedCreateWithoutSalesLinesInputSchema)]),
}).strict();

export const SalesReconciliationUpdateWithoutSalesLinesInputSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationUpdateWithoutSalesLinesInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const SalesReconciliationUncheckedUpdateWithoutSalesLinesInputSchema: z.ZodType<PrismaClient.Prisma.SalesReconciliationUncheckedUpdateWithoutSalesLinesInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const UserCreateWithoutAccountsInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateWithoutAccountsInput> = z.object({
  id: z.string().optional(),
  password: z.string(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
}).strict();

export const UserUncheckedCreateWithoutAccountsInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedCreateWithoutAccountsInput> = z.object({
  id: z.string().optional(),
  password: z.string(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
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
  password: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
}).strict();

export const UserUncheckedUpdateWithoutAccountsInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedUpdateWithoutAccountsInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  password: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
}).strict();

export const UserCreateWithoutSessionsInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateWithoutSessionsInput> = z.object({
  id: z.string().optional(),
  password: z.string(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
}).strict();

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedCreateWithoutSessionsInput> = z.object({
  id: z.string().optional(),
  password: z.string(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
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
  password: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
}).strict();

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedUpdateWithoutSessionsInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  password: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
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
  data: z.lazy(() => AccountCreateManyUserInputSchema).array(),
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
  data: z.lazy(() => SessionCreateManyUserInputSchema).array(),
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

export const PurchaseLineCreateManyBookInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineCreateManyBookInput> = z.object({
  id: z.string().cuid().optional(),
  quantity: z.number(),
  unitWholesalePrice: z.number(),
  purchaseOrderId: z.string(),
}).strict();

export const SalesLineCreateManyBookInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineCreateManyBookInput> = z.object({
  id: z.string().cuid().optional(),
  quantity: z.number(),
  unitWholesalePrice: z.number(),
  salesReconciliationId: z.string(),
}).strict();

export const AuthorUpdateWithoutBooksInputSchema: z.ZodType<PrismaClient.Prisma.AuthorUpdateWithoutBooksInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const AuthorUncheckedUpdateWithoutBooksInputSchema: z.ZodType<PrismaClient.Prisma.AuthorUncheckedUpdateWithoutBooksInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const AuthorUncheckedUpdateManyWithoutAuthorsInputSchema: z.ZodType<PrismaClient.Prisma.AuthorUncheckedUpdateManyWithoutAuthorsInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const PurchaseLineUpdateWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineUpdateWithoutBookInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  unitWholesalePrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  purchaseOrder: z.lazy(() => PurchaseOrderUpdateOneRequiredWithoutPurchaseLinesNestedInputSchema).optional(),
}).strict();

export const PurchaseLineUncheckedUpdateWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineUncheckedUpdateWithoutBookInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  unitWholesalePrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  purchaseOrderId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const PurchaseLineUncheckedUpdateManyWithoutPurchaseLinesInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineUncheckedUpdateManyWithoutPurchaseLinesInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  unitWholesalePrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  purchaseOrderId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const SalesLineUpdateWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineUpdateWithoutBookInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  unitWholesalePrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  salesReconciliation: z.lazy(() => SalesReconciliationUpdateOneRequiredWithoutSalesLinesNestedInputSchema).optional(),
}).strict();

export const SalesLineUncheckedUpdateWithoutBookInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineUncheckedUpdateWithoutBookInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  unitWholesalePrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  salesReconciliationId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const SalesLineUncheckedUpdateManyWithoutSaleReconciliationLinesInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineUncheckedUpdateManyWithoutSaleReconciliationLinesInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  unitWholesalePrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  salesReconciliationId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
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
}).strict();

export const BookUpdateWithoutGenreInputSchema: z.ZodType<PrismaClient.Prisma.BookUpdateWithoutGenreInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  authors: z.lazy(() => AuthorUpdateManyWithoutBooksNestedInputSchema).optional(),
  isbn_13: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_10: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  publisher: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  publicationYear: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  pageCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  width: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  height: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  thickness: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  retailPrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  purchaseLines: z.lazy(() => PurchaseLineUpdateManyWithoutBookNestedInputSchema).optional(),
  saleReconciliationLines: z.lazy(() => SalesLineUpdateManyWithoutBookNestedInputSchema).optional(),
  inventoryCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const BookUncheckedUpdateWithoutGenreInputSchema: z.ZodType<PrismaClient.Prisma.BookUncheckedUpdateWithoutGenreInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  authors: z.lazy(() => AuthorUncheckedUpdateManyWithoutBooksNestedInputSchema).optional(),
  isbn_13: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  isbn_10: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  publisher: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  publicationYear: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  pageCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  width: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  height: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  thickness: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  retailPrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  purchaseLines: z.lazy(() => PurchaseLineUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  saleReconciliationLines: z.lazy(() => SalesLineUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  inventoryCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
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
  genre: z.lazy(() => GenreUpdateOneRequiredWithoutBooksNestedInputSchema).optional(),
  purchaseLines: z.lazy(() => PurchaseLineUpdateManyWithoutBookNestedInputSchema).optional(),
  saleReconciliationLines: z.lazy(() => SalesLineUpdateManyWithoutBookNestedInputSchema).optional(),
  inventoryCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
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
  purchaseLines: z.lazy(() => PurchaseLineUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  saleReconciliationLines: z.lazy(() => SalesLineUncheckedUpdateManyWithoutBookNestedInputSchema).optional(),
  inventoryCount: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const PurchaseOrderCreateManyVendorInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderCreateManyVendorInput> = z.object({
  id: z.string().cuid().optional(),
  date: z.date(),
}).strict();

export const PurchaseOrderUpdateWithoutVendorInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderUpdateWithoutVendorInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  purchaseLines: z.lazy(() => PurchaseLineUpdateManyWithoutPurchaseOrderNestedInputSchema).optional(),
}).strict();

export const PurchaseOrderUncheckedUpdateWithoutVendorInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderUncheckedUpdateWithoutVendorInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  purchaseLines: z.lazy(() => PurchaseLineUncheckedUpdateManyWithoutPurchaseOrderNestedInputSchema).optional(),
}).strict();

export const PurchaseOrderUncheckedUpdateManyWithoutPurchaseOrderInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseOrderUncheckedUpdateManyWithoutPurchaseOrderInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const PurchaseLineCreateManyPurchaseOrderInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineCreateManyPurchaseOrderInput> = z.object({
  id: z.string().cuid().optional(),
  bookId: z.string(),
  quantity: z.number(),
  unitWholesalePrice: z.number(),
}).strict();

export const PurchaseLineUpdateWithoutPurchaseOrderInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineUpdateWithoutPurchaseOrderInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  book: z.lazy(() => BookUpdateOneRequiredWithoutPurchaseLinesNestedInputSchema).optional(),
  quantity: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  unitWholesalePrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const PurchaseLineUncheckedUpdateWithoutPurchaseOrderInputSchema: z.ZodType<PrismaClient.Prisma.PurchaseLineUncheckedUpdateWithoutPurchaseOrderInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  bookId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  unitWholesalePrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const SalesLineCreateManySalesReconciliationInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineCreateManySalesReconciliationInput> = z.object({
  id: z.string().cuid().optional(),
  bookId: z.string(),
  quantity: z.number(),
  unitWholesalePrice: z.number(),
}).strict();

export const SalesLineUpdateWithoutSalesReconciliationInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineUpdateWithoutSalesReconciliationInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  book: z.lazy(() => BookUpdateOneRequiredWithoutSaleReconciliationLinesNestedInputSchema).optional(),
  quantity: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  unitWholesalePrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const SalesLineUncheckedUpdateWithoutSalesReconciliationInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineUncheckedUpdateWithoutSalesReconciliationInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  bookId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  unitWholesalePrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const SalesLineUncheckedUpdateManyWithoutSalesLinesInputSchema: z.ZodType<PrismaClient.Prisma.SalesLineUncheckedUpdateManyWithoutSalesLinesInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  bookId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  quantity: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  unitWholesalePrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
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
  data: BookCreateManyInputSchema.array(),
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
  data: GenreCreateManyInputSchema.array(),
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
  data: AuthorCreateManyInputSchema.array(),
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
  data: VendorCreateManyInputSchema.array(),
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
  data: PurchaseOrderCreateManyInputSchema.array(),
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
  data: PurchaseLineCreateManyInputSchema.array(),
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
  data: SalesReconciliationCreateManyInputSchema.array(),
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
  data: SalesLineCreateManyInputSchema.array(),
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
  data: ExampleCreateManyInputSchema.array(),
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
  data: AccountCreateManyInputSchema.array(),
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
  data: SessionCreateManyInputSchema.array(),
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
  data: UserCreateManyInputSchema.array(),
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
  data: VerificationTokenCreateManyInputSchema.array(),
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
