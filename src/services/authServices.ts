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

export const getMenuAccess = (token:string) => {
  return fetch(`${BASE_URL}/menuaccess`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });
}