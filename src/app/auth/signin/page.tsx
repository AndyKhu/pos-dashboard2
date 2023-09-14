import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SignInForm from "./form";

const page = () => {
  return (
    <section className='flex min-h-screen justify-center items-center bg-slate-100'>
      <div className='relative w-[36rem]'>
        <div className='absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-lg'/>
        <Card className="relative border-none dark:bg-white dark:border-slate-200 dark:text-slate-950">
          <CardHeader className="text-center">
              <CardTitle>Welcome back!</CardTitle>
              <CardDescription className="dark:text-slate-500">It&apos;s greet to see u again</CardDescription>
          </CardHeader>
          <CardContent className="px-24">
              <SignInForm></SignInForm>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default page;