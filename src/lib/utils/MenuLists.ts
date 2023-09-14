import { TMenuiconname } from "@/components/ui/menuIcon"

export type Menu = {
  id: string
  title: string
  icon: TMenuiconname
  link?: string
  children?: Omit<Menu,"icon"|"children">[]
}

export const MenuLists:Menu[] = [
  {
    id: "M1",
    title: "Dashboard",
    icon: "Home",
    link: "/"
  },
  {
    id: "M4",
    title: "Sales",
    icon: "ShoppingBag",
    link: "/sales"
  },
  {
    id: "M2",
    title: 'Master Data',
    icon: 'Package',
    children: [
      { id: "M2_1", link: '/product', title: 'Product'},
      { id: "M2_2", link: '/category', title: 'Category'},
      { id: "M2_3", link: '/enum/unit', title: 'Unit'},
      { id: "M2_4", link: '/enum/brand', title: 'Brand'},
    ]
  },
  {
    id: "M3",
    title: 'Settings',
    icon: 'Settings',
    children: [
      { id: "M3_1", link: '/settings/usermanagement', title: 'user management'},
      { id: "M3_2", link: '/settings/rolemanagement', title: 'role management'},
    ]
  },
]
