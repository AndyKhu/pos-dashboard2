import { zodResolver } from '@hookform/resolvers/zod'
import * as z from "zod"

const genderSchema = z.enum(["MALE","FEMALE"])
const profielSchema = z.object({
  id: z.string().optional(),
  name: z
        .string()
        .min(3, {
          message: "name must be at least 3 characters long",
          })
        .max(100),
  gender: genderSchema,
  job: z.string(),
  email: z.string(),
  img: z.string()
})

export const userSchema = z.object({
    id: z.string().optional(),
    username: z
        .string()
        .min(3, {
        message: "username must be at least 3 characters long",
        })
        .max(100),
    password: z
        .string()
        .min(3, {
        message: "Password must be at least 3 characters long",
        })
        .max(100),
        // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{3,})/, {
        // message:
        //     "Password must contain at least 3 characters, one uppercase, one lowercase, one number and one special character",
        // }),
    roleId: z.string(),
    status: z.boolean(),
    profile: profielSchema

})

export type userFormType = z.infer<typeof userSchema>

export const userFormConfig = {
  resolver: zodResolver(userSchema),
  defaultValues: {
    id: undefined,
    username: '',
    password: '',
    status: true,
    profile: {
      id: undefined,
      name: '',
      gender: genderSchema.enum.MALE,
      job: '',
      email: '',
      img: '',
    }
  }
}