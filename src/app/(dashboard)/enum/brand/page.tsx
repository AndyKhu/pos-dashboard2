"use client"
import { DefaultPageContainer, THeaderOption } from "@/components/page-container";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { enumFormConfig, enumFormType } from "../config/formConfig";
import { TEnumDB } from "@/lib/type/tenumdb";
import EnumForm from "../form";
import EnumLists from "../lists";
import { useSession } from "next-auth/react";
import { deleteEnum, getEnumLists, saveEnum,  updateEnum } from "@/services/enumServices";
import { useToast } from "@/components/ui/use-toast";
import { TMenuPermission } from "@/lib/type/tmenu";
import { getMenuPermission } from "@/services/authServices";



const BrandPage = () => {
  const {data:session} = useSession()
  const { toast } = useToast()
  const token = session?.user.token.accessToken || ""
  const [menupermission,setMenuPermission] = useState<TMenuPermission>({roleId: "-",menuId: "-",view:false,edit:false,add:false,delete:false})

  const headerOption:THeaderOption = {
    icon: "Brand",
    title: "brand"
  }
  const [tab,setTab] = useState("list")
  //Form Setup
  const form = useForm<enumFormType>(enumFormConfig)
  const EventHandler = {
    onSubmit: async (values: enumFormType) => {
      values.type = "BRAND"
      let res
      if(values.id)
        res = await updateEnum(values,token)
      else
        res = await saveEnum(values,token)
      const resData = await res.json()
      if(res.ok){
        toast({
          title: `Brand ${values.id?"Updated":"Saved"}!`,
          description: `Your data has been ${values.id?"Update":"Save"} successfully.`,
          variant: "success",
          duration: 1000
        })
        if(values.id)
          setBrandLists(old => {
            const index = old.findIndex(i => i.id === values.id)
            if(index === -1)
              return old
            else{
              old[index] = values
              return old
            }
          })
        else
          setBrandLists(old => [...old, resData.data])
        form.reset()
      }else{
        toast({
          title: `Failed to ${values.id?"Update":"Save"} Brand!`,
          description: `Error: ${resData.err}`,
          variant: "destructive",
          duration: 1000
        })
      }
    },
    onCancel: () => {
      form.reset()
      setTab("list")
    }
  }
  // Lists Setup
  const [rowSelection, setRowSelection] = useState({})
  const [brandLists, setBrandLists] = useState<TEnumDB[]>([])
  const EventHandlerTable = {
    handleSelectedDelete: async ()=> {
      //delete Selected Row on Table Function
      const SelectedRow = Object.keys(rowSelection)
      const res = await deleteEnum(SelectedRow,token)
      const resData = await res.json()
      if(res.ok){
        toast({
          title: `Brand Deleted!`,
          description: `Your data has been Delete successfully.`,
          variant: "success",
          duration: 1000
        })
        setBrandLists(old => old.filter(i => !SelectedRow.includes(i.id||"")))
        form.reset()
      }else{
        toast({
          title: `Failed to Delete Category!`,
          description: `Error: ${resData.err}`,
          variant: "destructive",
          duration: 1000
        })
      }
      setRowSelection({})
    },
    handleSelectedEdit: ()=> {
      const SelectedRow = Object.keys(rowSelection)
      if(SelectedRow.length > 1 ||  SelectedRow.length === 0){
        setRowSelection({})
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please Select Only 1 Data",
        })
      }else{
        const selectedData = brandLists.find(item => item.id === SelectedRow[0])
        form.reset(selectedData,{keepDefaultValues:true})
        setTab("form")
        setRowSelection({})
      }
    }
  }
  useEffect(()=> {
    const fetchdata = async () => {
      const res = await getEnumLists("BRAND",token)
      const perm = await getMenuPermission("Category",token)
      if(res.ok){
        const resData = await res.json()
        setBrandLists(resData.data)
      }
      if(perm.ok){
        const permData = await perm.json()
        setMenuPermission(permData.permission)
      }
    }
    if(token){
      fetchdata()
    }
  },[token])
  if(!menupermission.view)
    return (<div>You got no access here.</div>)
  return (
    <DefaultPageContainer headerOption={headerOption} tabs={{tab,setTab}}
    list={<EnumLists data={brandLists} headerOption={headerOption} selection={{rowSelection,setRowSelection}} eventHandler={EventHandlerTable} permission={menupermission}/>}
    form={<EnumForm form={form} EventHandler={EventHandler} permission={menupermission}/>} 
  />
  );
}

export default BrandPage;