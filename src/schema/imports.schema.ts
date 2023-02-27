import z from 'zod'

export const purchaseOrdersInputSchema = z.object({
	isbn_13: z.number(),
    quantity: z.number(),
    unit_wholesale_price: z.number(),
})


export const purchaseOrdersInputUnknownSchema = z.array(
    z.unknown()
)

export type purchaseOrdersInput = z.TypeOf<typeof purchaseOrdersInputSchema>
export type purchaseOrdersInputUnknown = z.TypeOf<typeof purchaseOrdersInputUnknownSchema>
