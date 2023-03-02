import z from 'zod'

export const CSVBookExportEntrySchema = z.object({
    title: z.string(),
    authors: z.string(),
    isbn_13: z.string(),
    isbn_10: z.string(),
    publisher: z.string(),
    publication_year: z.number(),
    page_count: z.number(),
    height: z.number(),
    width: z.number(),
    thickness: z.number(),
    retail_price: z.number(),
    genre: z.string(),
    inventory_count: z.number(),
    shelf_space_inches: z.number(),
    last_month_sales: z.number(),
    days_of_supply: z.number(),
    best_buyback_price: z.number(),
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
