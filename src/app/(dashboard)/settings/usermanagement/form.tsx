"use client"
import { UseFormReturn } from "react-hook-form"
import { Card } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TMenuPermission } from "@/lib/type/tmenu"
import { userFormType } from "./config/formConfig"
import { PasswordInput } from "@/components/ui/passwordInput"
import { TRole } from "@/lib/type/trole"
import Combobox from "@/components/ui/combobox"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Cog } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface UserFormProps {
  form: UseFormReturn<userFormType>
  EventHandler: {
    onSubmit: (values:userFormType) => void
    onCancel: ()=> void
  }
  permission: TMenuPermission
  roleLists: TRole[]
}

const UserForm = ({form,EventHandler,permission,roleLists}:UserFormProps) => {
  const editable = (!form.getValues("id") && permission.add) || (form.getValues("id") && permission.edit)
  return (
    <Card className="md:border-none md:bg-transparent md:shadow-none">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(EventHandler.onSubmit)}>
            <div className="p-5 md:pt-0 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                              <Input placeholder="Username..." {...field} disabled={form.formState.isSubmitting || !editable} />
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                )}/>
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                              <PasswordInput placeholder="Password..." {...field} disabled={form.formState.isSubmitting || !editable} />
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                )}/>
                <FormField
                    control={form.control}
                    name="roleId"
                    render={({ field }) => (
                      <FormItem>
                          <FormLabel>Role</FormLabel>
                          <FormControl>
                            <Combobox Lists={roleLists} {...field} name="Role" disabled={form.formState.isSubmitting || !editable}/>
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                )}/>
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                          <FormLabel>Status</FormLabel>
                          <FormControl>
                              <Checkbox cbtype="form" checked={field.value} onCheckedChange={field.onChange}/>
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                )}/>
                <Separator className="col-span-1 sm:col-span-2"/>
                <div className="col-span-1 sm:col-span-2 flex flex-row space-x-2">
                  <Cog/>
                  <Label className="text-lg font-bold">Profile</Label>
                </div>
                <FormField
                    control={form.control}
                    name="profile.name"
                    render={({ field }) => (
                      <FormItem>
                          <FormLabel>name</FormLabel>
                          <FormControl>
                              <Input placeholder="name..." {...field} disabled={form.formState.isSubmitting || !editable} />
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                )}/>
                <FormField
                    control={form.control}
                    name="profile.gender"
                    render={({ field }) => (
                      <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <div>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Gender" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="MALE">Male</SelectItem>
                                <SelectItem value="FEMALE">Female</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <FormMessage />
                      </FormItem>
                )}/>
                <FormField
                    control={form.control}
                    name="profile.job"
                    render={({ field }) => (
                      <FormItem>
                          <FormLabel>Job</FormLabel>
                          <FormControl>
                              <Input placeholder="job..." {...field} disabled={form.formState.isSubmitting || !editable} />
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                )}/>
                <FormField
                    control={form.control}
                    name="profile.email"
                    render={({ field }) => (
                      <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                              <Input placeholder="Email..." {...field} disabled={form.formState.isSubmitting || !editable} />
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                )}/>
                <FormField
                    control={form.control}
                    name="profile.img"
                    render={({ field }) => (
                      <FormItem>
                          <FormLabel>IMG url</FormLabel>
                          <FormControl>
                              <Input placeholder="img url..." {...field} disabled={form.formState.isSubmitting || !editable} />
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                )}/>
            </div>
            <div className="flex px-5 h-20 items-center justify-end">
                <div className="grid grid-cols-2 gap-3">
                    <Button type="button" onClick={()=> EventHandler.onCancel()} disabled={form.formState.isSubmitting || !editable}>Cancel</Button>
                    <Button type="submit" disabled={form.formState.isSubmitting || !editable}>Save</Button>
                </div>
            </div>
        </form>
      </Form>
    </Card>
  );
}

export default UserForm