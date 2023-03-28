import z from 'zod'

export const CSVBookExportEntrySchema = z.object({
    title: z.string(),
    authors: z.string(),
    isbn_13: z.string(),
    isbn_10: z.string(),
    publisher: z.string(),
    publication_year: z.string(),
    page_count: z.string(),
    height: z.string(),
    width: z.string(),
    thickness: z.string(),
    retail_price: z.string(),
    genre: z.string(),
    inventory_count: z.string(),
    shelf_space_inches: z.string(),
    last_month_sales: z.string(),
    days_of_supply: z.string(),
    best_buyback_price: z.string(),
    num_related_books: z.string(),
})

export const CSVBookExportSchema = z.object({
    headers: z.array(
        z.string(),
    ),
    data: z.array(
        CSVBookExportEntrySchema
    )
})


export type CSVBookExportEntry = z.TypeOf<typeof CSVBookExportEntrySchema>
export type CSVBookExport = z.TypeOf<typeof CSVBookExportSchema>
