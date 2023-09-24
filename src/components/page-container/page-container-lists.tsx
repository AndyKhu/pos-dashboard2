import Link from "next/link";
import { Card } from "../ui/card";
import { Menuicon, TMenuiconname } from "../ui/menuIcon";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";
import { Separator } from "../ui/separator";
import { PropsWithChildren } from "react";
import { TMenuPermission } from "@/lib/type/tmenu";

interface PageContainerListsProps extends PropsWithChildren {
  headerOption: {title: string,icon: TMenuiconname}
  permission: TMenuPermission
}
const PageContainerLists = ({headerOption,permission,children}:PageContainerListsProps) => {
  if(!permission.view)
    return (<div>You got no access here.</div>)
  return (
    <div className="h-[calc(100vh-70px)] overflow-y-auto" >
      <div className="p-5">
        <Card className="mb-5">
          <div className="p-5 flex justify-between items-center">
            <span className="flex items-center space-x-3">
              <Menuicon name={headerOption.icon}/>
              <h2 className="font-semibold text-xl">{headerOption.title}</h2>
            </span>
            <Link href={`${headerOption.title.toLowerCase()}/form/add`} className={permission.add?"":"hidden"}>
              <Button>
                <PlusCircle className="mr-2" size={20}/>
                <span>Add {headerOption.title}</span>
              </Button>
            </Link>
          </div>
          <Separator/>
        </Card>
        {children}
      </div>
    </div>
  );
}

export default PageContainerLists;