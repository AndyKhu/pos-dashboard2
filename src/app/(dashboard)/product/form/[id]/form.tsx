"use client"
import { TEnumDB } from "@/lib/type/tenumdb";
import { TProduct } from "@/lib/type/tproduct";
import { useForm } from "react-hook-form";
import { productFormConfig, productFormType } from "../../config/formConfig";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Link from "next/link";
import Combobox from "@/components/ui/combobox";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { saveProduct, updateProduct } from "@/services/productServices";
import InputNumber from "@/components/ui/inputNumber";
import { TMenuPermission } from "@/lib/type/tmenu";
import { useRouter } from "next/navigation";

interface ProductFormProps {
  product?: TProduct,
  lists: {
    categoryLists: TEnumDB[],
    unitLists: TEnumDB[],
    brandLists: TEnumDB[]
  }
  permission: TMenuPermission
}
const ProductForm = ({product,lists,permission}:ProductFormProps) => {
  const {data:session} = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const token = session?.user.token.accessToken || ""
  const form = useForm<productFormType>(productFormConfig)
  const editable = (!product && permission.add) || (product && permission.edit)
  const EventHandler = {
    onSubmit: async(values: productFormType) => {
        let res
        if(values.id)
          res = await updateProduct(values,token)
        else
          res = await saveProduct(values,token)
        const resData = await res.json()
        if(res.ok){
          toast({
            title: `Product ${values.id?"Updated":"Saved"}!`,
            description: `Your data has been ${values.id?"Update":"Save"} successfully.`,
            variant: "success",
            duration: 1000
          })
          form.reset(values)
          router.push("/product")
        }else{
          toast({
            title: `Failed to ${values.id?"Update":"Save"} Product!`,
            description: `Error: ${resData.err}`,
            variant: "destructive",
            duration: 1000
          })
        }
    },
    onCancel: () => {
      form.reset()
    }
  }
  useEffect(()=>{
    form.setValue("unitId",lists.unitLists[0].id || "")
    form.setValue("categoryId",lists.categoryLists[0].id || "")
    form.setValue("brandId",lists.brandLists[0].id || "")
    if(product)
        form.reset(product)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(EventHandler.onSubmit)}>
            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Product Name..." {...field} disabled={!editable || form.formState.isSubmitting }/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product Code</FormLabel>
                            <FormControl>
                                <Input placeholder="Product Code..." {...field} disabled={!editable || form.formState.isSubmitting }/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Stock</FormLabel>
                            <FormControl>
                                <InputNumber placeholder="Product Stock..." {...field} onValueChange={field.onChange} disabled={!editable || form.formState.isSubmitting } />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="unitId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Unit</FormLabel>
                            <FormControl>
                                <Combobox Lists={lists.unitLists} {...field} name="Unit" disabled={!editable || form.formState.isSubmitting }/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                                <Combobox Lists={lists.categoryLists} {...field} name="Category" disabled={!editable || form.formState.isSubmitting }/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="brandId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Brand</FormLabel>
                            <FormControl>
                                <Combobox Lists={lists.brandLists} {...field} name="Brand" disabled={!editable || form.formState.isSubmitting }/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="buyprice"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Buy Price</FormLabel>
                            <FormControl>
                                <InputNumber placeholder="Buy Price..." {...field} onValueChange={field.onChange} currency disabled={!editable || form.formState.isSubmitting }/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="sellprice"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Sell Price</FormLabel>
                            <FormControl>
                                <InputNumber placeholder="Sell Price..." {...field} onValueChange={field.onChange}  currency disabled={!editable || form.formState.isSubmitting }/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="col-span-1 sm:col-span-2">
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Description..." {...field} disabled={!editable || form.formState.isSubmitting }/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>
            <div className="flex px-5 h-20 items-center justify-end">
                <div className="grid grid-cols-2 gap-3">
                    <Link href="/product"><Button type="button" onClick={()=> EventHandler.onCancel()}>Cancel</Button></Link>
                    <Button type="submit" disabled={!editable || form.formState.isSubmitting }>Save</Button>
                </div>
            </div>
        </form>
    </Form>
  );
}

export default ProductForm;