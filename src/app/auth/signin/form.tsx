"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { authFormType, authFormConfig } from "./formConfig"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/passwordInput"
import { Button } from "@/components/ui/button"
import { useState } from 'react'
import { signIn } from "next-auth/react"
import { redirect, useRouter, useSearchParams } from 'next/navigation'

const SignInForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const form = useForm<authFormType>(authFormConfig)
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    const onSubmit = async (values: authFormType) => {
        try{
            setLoading(true)
            const res = await signIn('credentials', {
                redirect: false,
                username: values.username,
                password: values.password,
                callbackUrl
            })
            setLoading(false)
            if (!res?.error) {
                router.push(callbackUrl);
            } else {
                setError(res.error);
            }
        } catch(err: any){
            console.log(err)
            setLoading(false);
            setError(err.message);
        }
    }
    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col space-y-6">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="username..." {...field} darkmode={false}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <PasswordInput placeholder="**********" {...field} darkmode={false}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {error != '' && <div className='text-red-500 font-medium'>{error}</div>}
                </div>
                <div className='flex mt-9 justify-center'>
                    <Button className='w-32 bg-slate-950 text-slate-50 hover:bg-slate-900/90' type='submit' loading={loading} disabled={loading} variant="nocolor">
                        <span>Submit</span>
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default SignInForm