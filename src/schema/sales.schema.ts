import z from 'zod'


export const salesReconciliationWithMetricsSchema = z.array(
    z.object({
        salesReconciliation: z.object({
            date: z.date(),
            salesLines: z.array(
                z.object({
                    book: z.object({
                        title: z.string(),
                        isbn_13: z.string()
                    }),
                    quantity: z.number(),
                    unitWholesalePrice: z.number()
                })
            )
        }),
        totalPrice: z.number(),
        totalQuantity: z.number(),
        totalUniqueBooks: z.number()
    })
)



export type salesReconciliation = z.TypeOf<typeof salesReconciliationWithMetricsSchema>