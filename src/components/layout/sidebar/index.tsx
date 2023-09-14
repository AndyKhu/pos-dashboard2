"use client"

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import MenuItem from "./sidebar-item";
import { Gitlab } from "lucide-react";
import { useLayoutState } from "@/state/layoutstate";
import { useEffect, useState } from "react";
import { getMenuAccess } from "@/services/authServices";
import { useSession } from "next-auth/react";
import { Menu } from "@/lib/utils/type/tmenu";

const Sidebar = () => {
  const {collapse} = useLayoutState()
  const {data:session} = useSession()
  const [menuLists,setMenuLists] = useState<Menu[]>([])
  const token = session?.user.token.accessToken || ""
  useEffect(()=> {
    const fetchdata = async () => {
      const res = await getMenuAccess(token)
      if(res.ok){
        const resData = await res.json()
        setMenuLists(resData.menus)
      }
    }
    if(token){
      fetchdata()
    }
  },[token])
  return (
    <aside className={cn("fixed inset-y-0 left-0 bg-white dark:bg-neutral-900 z-[999] transition-all duration-300 shadow-sm group overflow-hidden",collapse?"w-64 opacity-100 lg:w-20 lg:hover:w-64":"w-0 opacity-0 md:w-20 md:hover:w-64 md:opacity-100 lg:w-64")}>
      {/* Header */}
      <div className={cn("h-[70px] items-center space-x-3 shadow-sm dark:shadow-neutral-700 overflow-hidden md:flex px-8 flex",collapse?"lg:justify-center lg:group-hover:justify-normal":"md:justify-center md:group-hover:justify-normal lg:justify-normal")}>
        <div className="p-2 rounded-md bg-black text-white dark:bg-white dark:text-neutral-900">
          <Gitlab className="fill-white dark:fill-neutral-900"/>
        </div>
        <span className={cn("font-bold text-lg whitespace-nowrap",collapse?"lg:hidden lg:group-hover:inline-block":"md:hidden md:group-hover:inline-block  lg:inline-block")}>POS</span>
      </div>
      {/* Sidebar Item */}
      <ScrollArea className={cn("h-[calc(100%-70px)] py-4",collapse?"px-6 lg:px-3 lg:group-hover:px-6":"px-6 md:px-3 md:group-hover:px-6 lg:px-6")}>
        <ul className="space-y-3">
          {menuLists.map(item => {
            return (
              <MenuItem key={item.id} item={item} collapse={collapse}/>
            )
          })}
        </ul>
      </ScrollArea>
    </aside>
  );
}

export default Sidebar;