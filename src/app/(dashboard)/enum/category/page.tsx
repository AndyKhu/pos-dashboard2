"use client"
import { DefaultPageContainer, THeaderOption } from "@/components/page-container";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { enumFormConfig, enumFormType } from "../config/formConfig";
import { TEnumDB } from "@/lib/type/tenumdb";
import EnumForm from "../form";
import EnumLists from "../lists";
import { useSession } from "next-auth/react";
import { deleteEnum, getEnumLists, saveEnum, updateEnum } from "@/services/enumServices";
import { useToast } from "@/components/ui/use-toast";
import { TMenuPermission } from "@/lib/type/tmenu";
import { getMenuPermission } from "@/services/authServices";



const CategoryPage = () => {
  const {data:session} = useSession()
  const { toast } = useToast()
  const token = session?.user.token.accessToken || ""
  const [menupermission,setMenuPermission] = useState<TMenuPermission>({roleId: "-",menuId: "-",view:false,edit:false,add:false,delete:false})
  const headerOption:THeaderOption = {
    icon: "Category",
    title: "category"
  }
  const [tab,setTab] = useState("list")

  //Form Setup
  const form = useForm<enumFormType>(enumFormConfig)
  const EventHandler = {
    onSubmit: async (values: enumFormType) => {
      let res
      if(values.id)
        res = await updateEnum(values,token)
      else
        res = await saveEnum(values,token)
      const resData = await res.json()
      if(res.ok){
        toast({
          title: `Category ${values.id?"Updated":"Saved"}!`,
          description: `Your data has been ${values.id?"Update":"Save"} successfully.`,
          variant: "success",
          duration: 1000
        })
        if(values.id)
          setCategoryLists(old => {
            const index = old.findIndex(i => i.id === values.id)
            if(index === -1)
              return old
            else{
              old[index] = values
              return old
            }
          })
        else
          setCategoryLists(old => [...old, resData.data])
        form.reset()
      }else{
        toast({
          title: `Failed to ${values.id?"Update":"Save"} Category!`,
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
  const [categoryLists, setCategoryLists] = useState<TEnumDB[]>([])
  const EventHandlerTable = {
    handleSelectedDelete: async ()=> {
      //delete Selected Row on Table Function
      const SelectedRow = Object.keys(rowSelection)
      const res = await deleteEnum(SelectedRow,token)
      const resData = await res.json()
      if(res.ok){
        toast({
          title: `Category Deleted!`,
          description: `Your data has been Delete successfully.`,
          variant: "success",
          duration: 1000
        })
        setCategoryLists(old => old.filter(i => !SelectedRow.includes(i.id||"")))
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
        const selectedData = categoryLists.find(item => item.id === SelectedRow[0])
        form.reset(selectedData,{keepDefaultValues:true})
        setTab("form")
        setRowSelection({})
      }
    }
  }
  useEffect(()=> {
    const fetchdata = async () => {
      const lists = await getEnumLists("CATEGORY",token)
      const permission = await getMenuPermission("Category",token)
      setMenuPermission(permission)
      setCategoryLists(lists)
    }
    if(token){
      fetchdata()
    }
  },[token])
  if(!menupermission.view)
    return (<div>You got no access here.</div>)
  return (
    <DefaultPageContainer headerOption={headerOption} tabs={{tab,setTab}}
    list={<EnumLists data={categoryLists} headerOption={headerOption} selection={{rowSelection,setRowSelection}} eventHandler={EventHandlerTable} permission={menupermission}/>}
    form={<EnumForm form={form} EventHandler={EventHandler} permission={menupermission}/>} 
  />
  );
}

export default CategoryPage;