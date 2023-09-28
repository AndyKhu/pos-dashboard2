import { BASE_URL } from "@/lib/defaultConfig"
import { TRole } from "@/lib/type/trole"

export const getMenuAccessForm = async (token:string) => {
  const res = await fetch(`${BASE_URL}/menuaccessform`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
  if(!res.ok) {
    throw new Error('Failed to Fetch data')
  }
  const data = await res.json()
  
  return data.menuAccessList
}

export const getRoleLists = async (token?:string) => {
  const res =  await fetch(`${BASE_URL}/roles`,{
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
  })
  if(!res.ok) {
    throw new Error('Failed to Fetch data')
  }
  const data = await res.json()
  
  return data.data
}

export const deleteRoles = (listId: string[],token?:string) => {
  return fetch(`${BASE_URL}/roles`,{
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(listId)
  })
}

export const saveRole = (data: TRole,token?:string) => {
  return fetch(`${BASE_URL}/role`,{
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
}

export const updateRole = (data: TRole,token?:string) => {
  return fetch(`${BASE_URL}/role`,{
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
}