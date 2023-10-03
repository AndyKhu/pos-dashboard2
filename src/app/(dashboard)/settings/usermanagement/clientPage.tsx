"use client"

import { DefaultPageContainer, THeaderOption } from "@/components/page-container"
import { TMenuPermission } from "@/lib/type/tmenu"
import { useState } from "react"
import UserForm from "./form"
import { userFormConfig, userFormType } from "./config/formConfig"
import { useForm } from "react-hook-form"
import { TRole } from "@/lib/type/trole"
import { toast } from "@/components/ui/use-toast"
import { TUser } from "@/lib/type/tuser"
import { saveUser, updateUser } from "@/services/userServices"

interface ClientUserPageProps {
  headerOption: THeaderOption
  accessToken?: string
  permission: TMenuPermission
  roleLists: TRole[]
  Lists: TUser[]
}

const ClientUserPage = ({headerOption,accessToken,permission,roleLists,Lists}:ClientUserPageProps) => {
  const [tab,setTab] = useState("list")

  //Form Setup
  const form = useForm<userFormType>(userFormConfig)
  const EventHandler = {
    onSubmit: async (values: userFormType) => {
      let res
      if(values.id)
        res = await updateUser(values,accessToken)
      else
        res = await saveUser(values,accessToken)
      const resData = await res.json()
      if(res.ok){
        toast({
          title: `User ${values.id?"Updated":"Saved"}!`,
          description: `Your data has been ${values.id?"Update":"Save"} successfully.`,
          variant: "success",
          duration: 1000
        })
        if(values.id)
          setUsersLists(old => {
            const index = old.findIndex(i => i.id === values.id)
            if(index === -1)
              return old
            else{
              old[index] = values
              return old
            }
          })
        else
          setUsersLists(old => [...old, resData.data])
        form.reset()
      }else{
        toast({
          title: `Failed to ${values.id?"Update":"Save"} User!`,
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
  const [userLists, setUsersLists] = useState<TUser[]>(Lists)
  if(!permission.view)
    return (<div>You got no access here.</div>)
  return (
    <DefaultPageContainer headerOption={headerOption} tabs={{tab,setTab}}
    list={<></>}
    form={<UserForm EventHandler={EventHandler} form={form} permission={permission} roleLists={roleLists}/>}
  />
  )
}

export default ClientUserPage;