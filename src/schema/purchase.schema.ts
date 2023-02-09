import z, { string } from 'zod'

export const purchaseLineSchema = z.object({
	bookId: z.string(),
	quantity: z.number(),
	unitWholesalePrice: z.number()
})

export const purchaseOrderSchema_ = z.object({
	date: z.date(),
	purchaseLines: z.array(
        purchaseLineSchema
    )
})



export const purchaseOrderWithMetricsSchema = z.array(
	z.object({
		purchaseOrder: z.object({
			vendor: z.object({
				name: z.string()
			}),
			date: z.date(),
			purchaseLines: z.array(
				z.object({
					book: z.object({
						title: z.string(),
						isbn_13: z.string()
					})
				})
			)
		}),
		totalPrice: z.number(),
		totalQuantity: z.number(),
		totalUniqueBooks: z.number()
	})
)

export type purchaseLine = z.TypeOf<typeof purchaseLineSchema>

export type purchaseOrder = z.TypeOf<typeof purchaseOrderWithMetricsSchema>
