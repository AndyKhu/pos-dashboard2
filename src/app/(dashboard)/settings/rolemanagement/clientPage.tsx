"use client"
import { DefaultPageContainer, THeaderOption } from "@/components/page-container";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { TMenuPermission } from "@/lib/type/tmenu";
import RoleForm from "./form";
import RoleLists from "./lists";
import { roleFormConfig, roleFormType } from "./config/formConfig";
import { TRole } from "@/lib/type/trole";
import { deleteRoles, saveRole, updateRole } from "@/services/roleServices";

interface ClientRolePageProps {
  headerOption: THeaderOption
  accessToken?: string
  permission: TMenuPermission
  menuAccessFormD: TMenuPermission[]
  Lists: TRole[]
}

const ClientRolePage = ({headerOption,accessToken,permission,Lists,menuAccessFormD}:ClientRolePageProps) => {
  const [tab,setTab] = useState("list")
  //Form Setup
  const form = useForm<roleFormType>(roleFormConfig)
  const [menuAccessForm,setMenuAccessForm] = useState<TMenuPermission[]>(menuAccessFormD)
  const EventHandler = {
    onSubmit: async (values: roleFormType) => {
      const roleData:TRole = {...values,menuAccess:menuAccessForm}
      let res
      if(roleData.id)
        res = await updateRole(roleData,accessToken)
      else
        res = await saveRole(roleData,accessToken)
      const resData = await res.json()
      if(res.ok){
        toast({
          title: `Role ${values.id?"Updated":"Saved"}!`,
          description: `Your data has been ${values.id?"Update":"Save"} successfully.`,
          variant: "success",
          duration: 1000
        })
        if(roleData.id)
          setRoleLists(old => {
            const index = old.findIndex(i => i.id === roleData.id)
            if(index === -1)
              return old
            else{
              old[index] = roleData
              return old
            }
          })
        else
          setRoleLists(old => [...old, resData.data])
        form.reset()
        setMenuAccessForm(menuAccessFormD)
      }else{
        toast({
          title: `Failed to ${values.id?"Update":"Save"} Role!`,
          description: `Error: ${resData.err}`,
          variant: "destructive",
          duration: 1000
        })
      }
    },
    onCancel: () => {
      form.reset()
      setMenuAccessForm(menuAccessFormD)
      setTab("list")
    },
    handleUpdateTable: (rowIndex: number, columnId: string, value: unknown)=> {
      setMenuAccessForm(old => old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex]!,
            [columnId]: value,
          }
        }
        return row
      }))
    }
  }
  // Lists Setup
  const [rowSelection, setRowSelection] = useState({})
  const [roleLists, setRoleLists] = useState<TRole[]>(Lists)
  const EventHandlerTable = {
    handleSelectedDelete: async ()=> {
      //delete Selected Row on Table Function
      const SelectedRow = Object.keys(rowSelection)
      const res = await deleteRoles(SelectedRow,accessToken)
      const resData = await res.json()
      if(res.ok){
        toast({
          title: `Role Deleted!`,
          description: `Your data has been Delete successfully.`,
          variant: "success",
          duration: 1000
        })
        setRoleLists(old => old.filter(i => !SelectedRow.includes(i.id||"")))
        form.reset()
      }else{
        toast({
          title: `Failed to Delete Role!`,
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
        const selectedData = roleLists.find(item => item.id === SelectedRow[0])
        form.reset(selectedData,{keepDefaultValues:true})
        setMenuAccessForm(selectedData?.menuAccess || menuAccessFormD)
        setTab("form")
        setRowSelection({})
      }
    }
  }
  if(!permission.view)
    return (<div>You got no access here.</div>)
  return (
    <DefaultPageContainer headerOption={headerOption} tabs={{tab,setTab}}
    list={<RoleLists data={roleLists} headerOption={headerOption} selection={{rowSelection,setRowSelection}} eventHandler={EventHandlerTable} permission={permission}/>}
    form={<RoleForm form={form} EventHandler={EventHandler} permission={permission} menuAccessLists={menuAccessForm}/>} 
  />
  );
}

export default ClientRolePage;