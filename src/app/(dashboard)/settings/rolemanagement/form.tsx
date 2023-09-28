"use client"
import { UseFormReturn } from "react-hook-form"
import { roleFormType } from "./config/formConfig"
import { Card } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TMenuPermission } from "@/lib/type/tmenu"
import Table from "@/components/ui/table"
import { useState } from "react"
import { menuAccessTableConfig } from "./config/menuAccessTableConfig"

interface RoleFormProps {
  form: UseFormReturn<roleFormType>
  EventHandler: {
    onSubmit: (values:roleFormType) => void
    onCancel: ()=> void
    handleUpdateTable: (rowIndex: number, columnId: string, value: unknown) => void
  }
  permission: TMenuPermission
  menuAccessLists: TMenuPermission[]
}

const RoleForm = ({form,EventHandler,permission,menuAccessLists}:RoleFormProps) => {
  const [rowSelection, setRowSelection] = useState({})
  const editable = (!form.getValues("id") && permission.add) || (form.getValues("id") && permission.edit)
  return (
    <Card className="md:border-none md:bg-transparent md:shadow-none">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(EventHandler.onSubmit)}>
            <div className="p-5 md:pt-0 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Role Name..." {...field} disabled={form.formState.isSubmitting || !editable} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                )}/>
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input placeholder="Description..." {...field} disabled={form.formState.isSubmitting || !editable} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                )}/>
                <div className="col-span-1 sm:col-span-2">
                  <Table data={menuAccessLists} columns={menuAccessTableConfig} caption="sale product tabel" empty="No Item Added." selection={{rowSelection,setRowSelection}} handleUpdateTable={EventHandler.handleUpdateTable}>
                  
                  </Table>
                </div>
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

export default RoleForm