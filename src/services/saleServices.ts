import { BASE_URL } from "@/lib/defaultConfig"
import { TSale } from "@/lib/type/tsale"

export const saveSale = (data: TSale,token?:string) => {
  return fetch(`${BASE_URL}/sale`,{
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
}

export const getSale = async (id:string, token?:string) => {
  const res = await fetch(`${BASE_URL}/sale?id=${id}`,{
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
export const getSales = (token?:string,skip?:number,search?:string) => {
  return fetch(`${BASE_URL}/sales?limit=10&skip=${skip || 0}&search=${search||""}`,{
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
  })
}

export const updateSale = (data: TSale,token?:string) => {
  return fetch(`${BASE_URL}/sale`,{
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
}

export const deleteSales = (listId: string[],token?:string) => {
  return fetch(`${BASE_URL}/sales`,{
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(listId)
  })
}