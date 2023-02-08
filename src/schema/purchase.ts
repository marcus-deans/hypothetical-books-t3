import z, { string } from 'zod'

export const purchaseLineSchema = z.object({
	bookId: z.string(),
	quantity: z.number(),
	unitWholesalePrice: z.number()
})

export const purchaseOrderSchema = z.object({
	date: z.date(),
	purchaseLines: z.array(
        purchaseLineSchema
    )
})



export type purchaseLine = z.TypeOf<typeof purchaseLineSchema>

export type purchaseOrder = z.TypeOf<typeof purchaseOrderSchema>
