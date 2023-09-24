import { zodResolver } from '@hookform/resolvers/zod'
import * as z from "zod"
const ZodOption = {
    id: z.string().optional(),
    code: z.string(),
    name: z
        .string()
        .min(3, {
        message: "name must be at least 3 characters long",
        })
        .max(100),
    stock: z.number(),
    unitId: z.string(),
    categoryId: z.string(),
    brandId: z.string(),
    buyprice: z.number(),
    sellprice: z.number(),
    description: z.string().optional()
}
export const productSchema = z.object(ZodOption)

export type productFormType = z.infer<typeof productSchema>

export const productFormConfig = {
    resolver: zodResolver(productSchema),
    defaultValues:  {
        id: undefined,
      code: '',
      name: '',
      stock: 0,
      buyprice: 0,
      sellprice: 0,
      description: '',
  }
}