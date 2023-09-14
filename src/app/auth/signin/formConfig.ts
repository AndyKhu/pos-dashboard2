import { zodResolver } from '@hookform/resolvers/zod'
import * as z from "zod"

const authSchema = z.object({
    username: z.string().min(3, {
        message: "Username must be at least 3 charcters long"
        }).max(100),
    password: z
        .string()
        .min(3, {
        message: "Password must be at least 3 characters long",
        })
        .max(100)
        // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{3,})/, {
        // message:
        //     "Password must contain at least 3 characters, one uppercase, one lowercase, one number and one special character",
        // }),
})

export type authFormType = z.infer<typeof authSchema>

export const authFormConfig = {
    resolver: zodResolver(authSchema),
    defaultValues: {
        username: '',
        password: ''
    }
}