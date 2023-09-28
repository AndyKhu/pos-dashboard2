import { zodResolver } from '@hookform/resolvers/zod'
import * as z from "zod"

export const roleSchema = z.object({
    id: z.string().optional(),
    name: z
        .string()
        .min(3, {
        message: "name must be at least 3 characters long",
        })
        .max(100),
    description:  z
        .string()
        .max(100,{
          message: "Description max 100 characters long"
        })
        .optional(),
})

export type roleFormType = z.infer<typeof roleSchema>

export const roleFormConfig = {
  resolver: zodResolver(roleSchema),
  defaultValues: {
    id: undefined,
    name: '',
    description: ''
  }
}