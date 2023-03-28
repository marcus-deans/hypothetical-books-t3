import z from 'zod'

export const CSVInputSchema = z.object({
    isbn: z.string(),
    quantity: z.string(),
    unit_price: z.string(),
})

export const CSVInputIdSchema = z.object({
    id: z.number(),
    bookId: z.string(),
    title: z.string(),
    isbn: z.string(),
    quantity: z.number(),
    unit_price: z.number(),
    verified: z.boolean(),
    reason: z.string(),
})


export type CSVInput = z.TypeOf<typeof CSVInputSchema>
export type CSVInputId = z.TypeOf<typeof CSVInputIdSchema>
