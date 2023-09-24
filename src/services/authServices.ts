import { BASE_URL } from "@/lib/defaultConfig";

type TLoginProps = {
  username?: string,
  password?: string
}

export const Login = (data:TLoginProps) => {
  return fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    });
  
}


export const verifiedToken = (token?:string) => {
  return fetch(`${BASE_URL}/auth/verifiedtoken`,{
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
      }
  })
}

export const getMenuAccess = (token:string) => {
  return fetch(`${BASE_URL}/menuaccess`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });
}

export const getMenuPermission = (menutittle:string,token:string) => {
  return fetch(`${BASE_URL}/menupermission?title=${menutittle}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });
}