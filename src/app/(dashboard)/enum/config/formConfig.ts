import { zodResolver } from '@hookform/resolvers/zod'
import * as z from "zod"

export const enumSchema = z.object({
    id: z.string().optional(),
    name: z
        .string()
        .min(3, {
        message: "name must be at least 3 characters long",
        })
        .max(100),
    type: z.enum(["CATEGORY","UNIT","BRAND"]).default("CATEGORY"),
    description:  z
        .string()
        .max(100,{
          message: "Description max 100 characters long"
        })
        .optional(),
})

export type enumFormType = z.infer<typeof enumSchema>

export const enumFormConfig = {
  resolver: zodResolver(enumSchema),
  defaultValues: {
    id: undefined,
    name: '',
    description: ''
  }
}