import { UseFormReturn } from "react-hook-form"
import { enumFormType } from "./config/formConfig"
import { Card } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TMenuPermission } from "@/lib/type/tmenu"

interface EnumFormProps {
  form: UseFormReturn<enumFormType>
  EventHandler: {
    onSubmit: (values:enumFormType) => void
    onCancel: ()=> void
  }
  permission: TMenuPermission
}

const EnumForm = ({form,EventHandler,permission}:EnumFormProps) => {
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
                                <Input placeholder="Unit Name..." {...field} disabled={form.formState.isSubmitting || !permission.add} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input placeholder="Description..." {...field} disabled={form.formState.isSubmitting || !permission.add} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className="flex px-5 h-20 items-center justify-end">
                <div className="grid grid-cols-2 gap-3">
                    <Button type="button" onClick={()=> EventHandler.onCancel()} disabled={form.formState.isSubmitting || !permission.add}>Cancel</Button>
                    <Button type="submit" disabled={form.formState.isSubmitting || !permission.add}>Save</Button>
                </div>
            </div>
        </form>
      </Form>
    </Card>
  );
}

export default EnumForm