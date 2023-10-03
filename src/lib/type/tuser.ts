import { TRole } from "./trole"

export type TUser = {
  id?: string
  username: string
  password: string
  roleId: string
  status: boolean
  profile: TUserProfile
  role?: TRole
}

export type TUserProfile = {
  id?: string
  name: string
  gender: "MALE" | "FEMALE"
  job: string
  email: string
  img: string
  user?: TUser
}