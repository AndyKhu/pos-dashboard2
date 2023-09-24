import { 
  LucideIcon,
  LucideProps,
  LayoutDashboardIcon,
  ShoppingBag,
  Package,
  Settings,
  SplitSquareHorizontal,
  Search,
  Building2
} from "lucide-react"

interface ICONPROPS extends LucideProps{
  name?: keyof ICONBANK 
}
type ICONBANK = {
  Home: LucideIcon
  ShoppingBag: LucideIcon
  Package: LucideIcon
  Settings: LucideIcon
  Category: LucideIcon
  Search: LucideIcon
  Brand: LucideIcon
}
const IconBank:ICONBANK = {
  Home: LayoutDashboardIcon,
  ShoppingBag,
  Package,
  Settings,
  Search,
  Category: SplitSquareHorizontal,
  Brand: Building2
}

export type TMenuiconname = keyof ICONBANK
export const Menuicon = ({name,size=20,...props}:ICONPROPS) => {
  if(!name)
      return <></>
  const LucideIcon = IconBank[name]
  return <LucideIcon {...props} width={size} height={size}/>
}