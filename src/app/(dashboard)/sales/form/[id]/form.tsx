"use client"

import { useForm } from "react-hook-form";
import { saleFormConfig, saleFormType } from "../../config/formConfig";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Datepicker from "@/components/ui/datepicker";
import InputNumber from "@/components/ui/inputNumber";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { TSale, TSaleProduct } from "@/lib/type/tsale";
import { saleProductTableConfigEdit } from "../../config/saleProductColumnEdit";
import Table from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import ProductAddItem from "./addItem";
import { TProduct, TProducts } from "@/lib/type/tproduct";
import { Card } from "@/components/ui/card";
import { Menuicon } from "@/components/ui/menuIcon";
import { THeaderOption } from "@/components/page-container";
import { cn } from "@/lib/utils";
import { getSale, saveSale, updateSale } from "@/services/saleServices";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { TMenuPermission } from "@/lib/type/tmenu";
import { saleProductTableConfig } from "../../config/saleProductColumn";
import { useRouter } from "next/navigation";

interface SaleFormProps{
  sale?: TSale
  permission: TMenuPermission
}

const SalesForm = ({sale,permission}:SaleFormProps) => {
  const {data:session} = useSession()
  const { toast } = useToast()
  const router = useRouter()
  const token = session?.user.token.accessToken || ""

  const headerOption:THeaderOption = {
    icon: "ShoppingBag",
    title: "Sales"
  }
  const [rowSelection, setRowSelection] = useState({})
  const form = useForm<saleFormType>(saleFormConfig)
  const EventHandler = {
    onSubmit: async(values: saleFormType) => {
      values.saleProduct = saleProduct
      let res 
      if(values.id)
          res = await updateSale(values,token)
        else
          res = await saveSale(values,token)
      const resData = await res.json()
      if(res.ok){
        toast({
          title: `Sales ${values.id?"Updated":"Saved"}!`,
          description: `Your data has been ${values.id?"Update":"Save"} successfully.`,
          variant: "success",
          duration: 1000
        })
        form.reset(values)
        router.push("/sales")
      }else{
        toast({
          title: `Failed to ${values.id?"Update":"Save"} Sales!`,
          description: `Error: ${resData.err}`,
          variant: "destructive",
          duration: 1000
        })
      }
    },
    onCancel: () => {
      form.reset()
      setSaleProduct([])
      router.push("/sales")
    }
  }
  const [saleProduct,setSaleProduct] = useState<TSaleProduct[]>([])
  const editable = (!sale && permission.add) || (sale && permission.edit)
  const handlerAddItem = (items:TProducts[]) => {
    items.map(pro => {
      setSaleProduct(old=> [...old,{productId:pro.id,price:pro.sellprice,qty:1,product:pro}])
    })
    setdialog(false)
  }
  const handleUpdateTable = (rowIndex: number, columnId: string, value: unknown) => {
    setSaleProduct(old => old.map((row, index) => {
      if (index === rowIndex) {
        return {
          ...old[rowIndex]!,
          [columnId]: value,
        }
      }
      return row
    }))
  }
  const handleDelete = ()=> {
    const selected = Object.keys(rowSelection).map(str => parseInt(str))
    setSaleProduct(old => old.filter((pro,index) => !selected.includes(index)))
    setRowSelection({})
  }
  const [dialog,setdialog] = useState(false)
  useEffect(()=>{
    const totalvalue = saleProduct.reduce((accumulator, pro) => {
      return accumulator + (pro.price *pro.qty);
    }, 0)
    form.setValue("total",totalvalue)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[saleProduct])
  const fetchData = async (id?:string)=> {
    if(id){
      const resData = await getSale(id,token)
      form.reset(resData)
      setSaleProduct(resData.saleProduct)
    }
  }
  useEffect(()=>{
    if(token && sale){
      fetchData(sale.id)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[token])
  return (
    <Form {...form}>
      <form onSubmit={(e)=>e.preventDefault()}>
        <Card className="mb-2">
          <div className="flex items-center px-5 h-14 md:h-20 justify-between">
            <span className="flex items-center space-x-3">
              <Menuicon name={headerOption.icon}/>
              <h2 className="font-semibold text-lg md:text-xl capitalize">{headerOption.title}</h2>
            </span>
            <div className="grid grid-cols-2 gap-3">
              <Button size="sm" onClick={EventHandler.onCancel} disabled={form.formState.isSubmitting}>Cancel</Button>
              <Button size="sm" onClick={()=>EventHandler.onSubmit(form.getValues())} disabled={!editable || form.formState.isSubmitting}>Save</Button>
            </div>
          </div>
        </Card>
        <Card>
            <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-5">
                <FormField
                  control={form.control}
                  name="notrx"
                  render={({ field }) => (
                    <FormItem>
                        <FormLabel>Transaction No.</FormLabel>
                        <FormControl>
                            <Input placeholder="Transaction no..." {...field} disabled/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                            <Datepicker {...field} disabled={!editable || form.formState.isSubmitting}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="total"
                  render={({ field }) => (
                    <FormItem>
                        <FormLabel>Total</FormLabel>
                        <FormControl>
                        <InputNumber placeholder="Total" {...field} onValueChange={field.onChange} currency disabled/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
        <Separator/>
        <div className="p-5">
          <Table data={saleProduct} columns={editable?saleProductTableConfigEdit:saleProductTableConfig} caption="sale product tabel" empty="No Item Added." selection={{rowSelection,setRowSelection}} selectable={editable} handleUpdateTable={handleUpdateTable}>
            <div className="pb-5 flex items-center gap-3">
              <Dialog open={dialog} onOpenChange={setdialog}>
                <DialogTrigger asChild>
                  <Button size="sm" disabled={!editable || form.formState.isSubmitting}>Add Item</Button>
                </DialogTrigger>
                <DialogContent>
                  <ProductAddItem handlerAddItem={handlerAddItem}/>
                </DialogContent>
              </Dialog>
              <Button size="sm" variant="destructive" className={cn(Object.keys(rowSelection).length > 0?"":"hidden")} onClick={handleDelete}>Delete</Button>
            </div>
          </Table>
          <div className="mt-2 px-2">
            <p className="text-sm text-muted-foreground">Total Item: {saleProduct.length}</p>
          </div>
        </div>
      </Card>
      </form>
    </Form>
  );
}

export default SalesForm;