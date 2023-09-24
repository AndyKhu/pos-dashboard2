"use client"
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import useMeasure from "react-use-measure";
import { usePathname } from 'next/navigation';
import {useState} from "react"
import { Menuicon } from "@/components/ui/menuIcon";
import { ChevronDown, Circle } from "lucide-react";
import { useLayoutState } from "@/state/layoutstate";
import { Menu } from "@/lib/type/tmenu";

type TMenuItem = {
  collapse: boolean
  item: Menu
}
const SingleMenu = ({collapse,item}:TMenuItem) => {
  const pathname = usePathname()
  const isActive = item.url === "/"? pathname === item.url : pathname.includes(item.url || "")
  return (
    <li>
      <Link href={item.url || ""}>
        <div className={cn("flex items-center space-x-3 py-2 rounded-md text-sm whitespace-nowrap",isActive?"bg-blue-500 text-white":"text-gray-900 dark:text-white hover:bg-blue-400/10  hover:text-blue-500",collapse?"px-3 lg:p-3 lg:justify-center lg:group-hover:justify-start lg:group-hover:px-3":"px-3 md:p-3 md:justify-center md:group-hover:justify-start md:group-hover:px-3 lg:justify-start lg:px-3")}>
          <Menuicon name={item.icon} size={26}/>
          <span className={collapse?"lg:hidden lg:group-hover:block":"md:hidden md:group-hover:block lg:block"}>{item.title}</span>
        </div>
      </Link>
    </li>
  )
}
const MenuWithChildren = ({collapse,item}:TMenuItem) => {
  const pathname = usePathname()
  let isActive = false
  const {menuCollapse,setMenuCollapse} = useLayoutState()
  item.child?.map(child => {
    if(pathname.includes(child.url || "")){
      isActive = true
    }
  })
  const [isOpen,setIsOpen] = useState(menuCollapse === item.id || isActive)
  const handleChange = (isOpen:boolean) => {
    setIsOpen(isOpen)
    if(isOpen)
        setMenuCollapse(item.id)
    else
        setMenuCollapse("")
  }
  const [measureRef, { height }] = useMeasure();
  return (
    <Collapsible 
      open={isOpen}
      onOpenChange={handleChange} className={cn("rounded-md",isOpen && (collapse?"bg-gray-50 lg:bg-inherit lg:group-hover:bg-gray-50 dark:bg-neutral-800 dark:lg:group-hover:bg-neutral-800":"md:group-hover:bg-gray-50 lg:bg-gray-50 dark:md:group-hover:bg-neutral-800 dark:lg:bg-neutral-800"))}>
      <CollapsibleTrigger className={cn("w-full rounded-md",isOpen && (collapse?"bg-white shadow lg:bg-inherit lg:shadow-none lg:group-hover:bg-white lg:group-hover:shadow dark:bg-neutral-700 dark:lg:bg-neutral-900 dark:lg:group-hover:bg-neutral-700":"md:group-hover:bg-white md:group-hover:shadow lg:bg-white lg:shadow dark:md:group-hover:bg-neutral-700 dark:lg:bg-neutral-700"))}>
        <div className={cn("flex items-center space-x-3 py-2 rounded-md text-sm whitespace-nowrap relative",isActive?"bg-blue-500 text-white":"text-gray-900 hover:bg-blue-400/10 hover:text-blue-500 dark:text-white ",collapse?"px-3 lg:p-3 lg:justify-center lg:group-hover:justify-start lg:group-hover:px-3":"px-3 md:p-3 md:justify-center md:group-hover:justify-start md:group-hover:px-3 lg:justify-start lg:px-3")}>
          <Menuicon name={item.icon} size={26}/>
          <span className={collapse?"lg:hidden lg:group-hover:block":"md:hidden md:group-hover:block lg:block"}>{item.title}</span>
          <div className={cn("absolute right-3 transition-transform duration-300",isOpen && "rotate-180",collapse?"lg:hidden lg:group-hover:block":"md:hidden md:group-hover:block lg:block")}>
            <ChevronDown/>
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent forceMount>
        <div style={{height:isOpen? height : 0,opacity:isOpen? 1:0}} className={cn(`overflow-hidden transition-all duration-300`,collapse?"lg:hidden lg:group-hover:block":"md:hidden md:group-hover:block lg:block")}>
          <ul ref={measureRef}>
            {item.child?.map(child => {
              return (
                <li key={child.id}>
                  <Link href={child.url || ""}>
                    <div className={cn("flex items-center space-x-3 rounded-md px-4 py-2 text-sm whitespace-nowrap capitalize",pathname.includes(child.url || "")?"text-blue-600 dark:text-blue-300":"text-gray-900 dark:text-white")}>
                      <Circle size={8}/>
                      <span>{child.title}</span>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
const MenuItem = ({collapse,item}:TMenuItem) => {
  return (
    <>
    {
    item.child && item.child?.length > 0?
        <MenuWithChildren collapse={collapse} item={item}/>
      :
        <SingleMenu collapse={collapse} item={item}/>
    }
    </>
  );
}

export default MenuItem;