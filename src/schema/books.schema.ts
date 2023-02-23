import z from 'zod'

export const bookSchema = z.object({
    isbn_13: z.string(),
    title: z.string()
})


export type book = z.TypeOf<typeof bookSchema>