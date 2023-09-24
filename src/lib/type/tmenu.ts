import { TMenuiconname } from "@/components/ui/menuIcon"

export type Menu = {
  id: string
  title: string
  icon: TMenuiconname
  url?: string
  child?: Omit<Menu,"icon"|"children">[]
}

export type TMenuPermission = {
  roleId: string
  menuId: string
  add: boolean
  view: boolean
  edit: boolean
  delete: boolean
}