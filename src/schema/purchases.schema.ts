import z from 'zod'

export const purchaseOrdersWithMetricsSchema = z.array(
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
					}),
					quantity: z.number()
				})
			)
		}),
		totalPrice: z.number(),
		totalQuantity: z.number(),
		totalUniqueBooks: z.number()
	})
)

export type purchaseOrders = z.TypeOf<typeof purchaseOrdersWithMetricsSchema>
