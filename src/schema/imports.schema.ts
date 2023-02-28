import z from 'zod'

export const purchaseOrdersInputSchema = z.object({
	isbn_13: z.number(),
    quantity: z.number(),
    unit_wholesale_price: z.number(),
})

export const purchaseOrdersInputIdSchema = z.object({
    bookId: z.string(),
    quantity: z.number().gt(0),
    unit_wholesale_price: z.number().gt(0),
})


export const purchaseOrdersInputUnknownSchema = z.array(
    z.unknown()
)

export type purchaseOrdersInput = z.TypeOf<typeof purchaseOrdersInputSchema>
export type purchaseOrdersInputId = z.TypeOf<typeof purchaseOrdersInputIdSchema>
export type purchaseOrdersInputUnknown = z.TypeOf<typeof purchaseOrdersInputUnknownSchema>
