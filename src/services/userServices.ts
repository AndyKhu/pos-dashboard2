import { BASE_URL } from "@/lib/defaultConfig"
import { TUser } from "@/lib/type/tuser"

export const getUserLists = async (token?:string) => {
  const res =  await fetch(`${BASE_URL}/users`,{
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

export const deleteUsers = (listId: string[],token?:string) => {
  return fetch(`${BASE_URL}/users`,{
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(listId)
  })
}

export const saveUser = (data: TUser,token?:string) => {
  return fetch(`${BASE_URL}/user`,{
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
}

export const updateUser = (data: TUser,token?:string) => {
  return fetch(`${BASE_URL}/user`,{
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
}