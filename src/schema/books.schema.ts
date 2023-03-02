import z from 'zod'

export const bookSchema = z.object({
    isbn_13: z.string(),
    title: z.string()
})

export const bookDetailSchema = z.object({
    title: z.string().optional(),
    authors: z.array(z.string()).optional(),
    isbn_13: z.string().optional(),
    isbn_10: z.string().optional().nullish(),
    publisher: z.string().optional(),
    publication_year: z.number().optional(),
    page_count: z.number().optional(),
    height: z.number().optional(),
    width: z.number().optional(),
    thickness: z.number().optional(),
    retail_price: z.number().optional(),
    genre: z.string().optional(),
    inventory_count: z.number().optional(),
})


export type book = z.TypeOf<typeof bookSchema>
export type bookDetail = z.TypeOf<typeof bookDetailSchema>