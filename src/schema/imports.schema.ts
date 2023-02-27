import z from 'zod'

export const purchaseOrdersInputSchema = z.object({
	isbn_13: z.string(),
    quantity: z.string(),
    unit_wholesale_price: z.string(),
})


export const purchaseOrdersInputUnknownSchema = z.array(
    z.unknown()
)

export type purchaseOrdersInput = z.TypeOf<typeof purchaseOrdersInputSchema>
export type purchaseOrdersInputUnknown = z.TypeOf<typeof purchaseOrdersInputUnknownSchema>
