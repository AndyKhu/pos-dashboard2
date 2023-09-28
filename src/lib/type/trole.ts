import { TMenuPermission } from "./tmenu"

export type TRole = {
  id?:string
  name: string
  description?:string
  menuAccess: TMenuPermission[]
}