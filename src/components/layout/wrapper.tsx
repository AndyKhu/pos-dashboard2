"use client"
import { useLayoutState } from "@/state/layoutstate";
import Header from "./header";
import { cn } from "@/lib/utils";

const LayoutWrapper = ({children}:React.PropsWithChildren) => {
  const {collapse, toggleCollapse} = useLayoutState()
  return (
    <main className={cn("min-h-screen bg-slate-100 dark:bg-neutral-700 transition-all duration-300 overflow-hidden",collapse?"md:ml-64 lg:ml-20":"md:ml-20 lg:ml-64")}>
      {collapse && <div className={"bg-slate-900 bg-opacity-70 backdrop-filter backdrop-blur-[3px] backdrop-brightness-10 fixed inset-0 md:hidden z-[998]"} onClick={toggleCollapse}/>}
      <Header toggleCollapse={toggleCollapse}/>
      <section>
        {children}
      </section>
    </main>
  );
}

export default LayoutWrapper;