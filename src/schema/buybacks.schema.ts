import z from 'zod'

export const buybackOrdersWithMetricsSchema = z.array(
	z.object({
        buybackOrder: z.object({
            date: z.date(),
            vendor: z.object({
                name: z.string(),
            }),
            buybackLines: z.array(
                z.object({
                    book: z.object({
                        title: z.string(),
                        isbn_13: z.string()
                    }),
                    quantity: z.number(),
                })
            )
        }),
        totalPrice: z.number(),
        totalQuantity: z.number(),
        totalUniqueBooks: z.number()
    })
)

export type buyBackOrders = z.TypeOf<typeof buybackOrdersWithMetricsSchema>
