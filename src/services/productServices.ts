import { BASE_URL } from "@/lib/defaultConfig"
import { TProduct } from "@/lib/type/tproduct"

export const saveProduct = (data: TProduct,token?:string) => {
  return fetch(`${BASE_URL}/product`,{
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
}

export const getProduct = (id:string, token?:string) => {
  return fetch(`${BASE_URL}/product?id=${id}`,{
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
  })
}

export const getProducts = (token?:string,skip?:number,search?:string) => {
  return fetch(`${BASE_URL}/products?limit=10&skip=${skip || 0}&search=${search||""}`,{
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
  })
}

export const updateProduct = (data: TProduct,token?:string) => {
  return fetch(`${BASE_URL}/product`,{
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
}

export const deleteProduct = (listId: string[],token?:string) => {
  return fetch(`${BASE_URL}/product`,{
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(listId)
  })
}