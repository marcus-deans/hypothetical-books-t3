import z from 'zod'

export const CSVPurchaseInputSchema = z.object({
	isbn: z.string(),
    quantity: z.string(),
    unit_wholesale_price: z.string(),
})

export const CSVSaleInputSchema = z.object({
	isbn: z.string(),
    quantity: z.string(),
    unit_retail_price: z.string(),
})

export const CSVBuybackInputSchema = z.object({
	isbn: z.string(),
    quantity: z.string(),
    unit_buyback_price: z.string(),
})

export const CSVPurchaseInputIdSchema = z.object({
    bookId: z.string(),
    quantity: z.number().gt(0),
    unit_wholesale_price: z.number().gt(0),
})

export const CSVSaleInputIdSchema = z.object({
    bookId: z.string(),
    quantity: z.number().gt(0),
    unit_retail_price: z.number().gt(0),
})

export const CSVBuybackInputIdSchema = z.object({
    bookId: z.string(),
    quantity: z.number().gt(0),
    unit_buyback_price: z.number().gt(0),
})


export const purchaseOrdersInputUnknownSchema = z.array(
    z.unknown()
)

export type CSVPurchaseInput = z.TypeOf<typeof CSVPurchaseInputSchema>
export type CSVSaleInput = z.TypeOf<typeof CSVSaleInputSchema>
export type CSVBuybackInput = z.TypeOf<typeof CSVBuybackInputSchema>
export type CSVPurchaseInputId = z.TypeOf<typeof CSVPurchaseInputIdSchema>
export type CSVSaleInputId = z.TypeOf<typeof CSVSaleInputIdSchema>
export type CSVBuybackInputId = z.TypeOf<typeof CSVBuybackInputIdSchema>
export type purchaseOrdersInputUnknown = z.TypeOf<typeof purchaseOrdersInputUnknownSchema>
