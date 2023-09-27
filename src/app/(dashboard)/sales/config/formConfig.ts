import { zodResolver } from '@hookform/resolvers/zod'
import * as z from "zod"
const ZodOption = {
    id: z.string().optional(),
    notrx: z.string().optional(),
    date: z.date(),
    total: z.number(),
    saleProduct: z.array(z.object({id:z.string().optional(),parentId: z.string().optional(),productId: z.string(),qty: z.number(),price: z.number()}))
}
export const SaleSchema = z.object(ZodOption)

export type saleFormType = z.infer<typeof SaleSchema>

export const saleFormConfig = {
    resolver: zodResolver(SaleSchema),
    defaultValues:  {
      id: undefined,
      notrx: '',
      date: new Date(),
      total: 0
  }
}