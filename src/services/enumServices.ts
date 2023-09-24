import { BASE_URL } from "@/lib/defaultConfig"
import { TEnumDB } from "@/lib/type/tenumdb"

export const saveEnum = (data: TEnumDB,token?:string) => {
  return fetch(`${BASE_URL}/enum`,{
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
}

export const updateEnum = (data: TEnumDB,token?:string) => {
  return fetch(`${BASE_URL}/enum`,{
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
}

export const deleteEnum = (listId: string[],token?:string) => {
  return fetch(`${BASE_URL}/enum`,{
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(listId)
  })
}

export const getEnumLists = (type:string,token?:string) => {
  return fetch(`${BASE_URL}/enum?type=${type}`,{
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
  })
}