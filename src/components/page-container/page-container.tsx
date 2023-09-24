"use client"
import { Card} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { PropsWithChildren, ReactNode} from "react";
import { Menuicon } from "../ui/menuIcon";
import { FileText, Table } from "lucide-react";
import { THeaderOption } from ".";

interface IDefaultPageContainer {
  headerOption: THeaderOption
  tabs: {
    tab: string
    setTab: (e:string) => void
  }
  list: ReactNode
  form: ReactNode
}

const DefaultPageContainer = ({headerOption,tabs,list,form}:IDefaultPageContainer) => {
  const isMobile = useMediaQuery(768)

  return (
    <>
      {isMobile?
      <Tabs value={tabs.tab} onValueChange={tabs.setTab} className="p-2">
        <Card className="flex px-5 h-20 items-center justify-between">
          <span className="flex items-center space-x-3">
            <Menuicon name={headerOption.icon}/>
            <h2 className="font-semibold text-xl capitalize">{headerOption.title} {tabs.tab}</h2>
          </span>
          <TabsList>
            <TabsTrigger value="form"><FileText size={16} className="mr-1"/> Form</TabsTrigger>
            <TabsTrigger value="list"><Table size={16} className="mr-1"/> Lists</TabsTrigger>
          </TabsList>
        </Card>
        <TabsContent value="form">
          <div className="h-[calc(100vh-174px)]">
            <ScrollArea className="h-full w-full rounded-lg">
              {form}
            </ScrollArea>
          </div>
        </TabsContent>
        <TabsContent value="list">
        <div className="h-[calc(100vh-174px)]">
          <ScrollArea className="h-full w-full rounded-lg">
            {list}
          </ScrollArea>
        </div>
        </TabsContent>
      </Tabs>
      :
      <div className="h-[calc(100vh-70px)]">
        <ScrollArea className="h-full w-full rounded-lg">
          <div className="grid grid-cols-2 gap-5 p-5">
            <div>
              <Card>
                <div className="flex px-5 h-20 items-center space-x-3">
                  <Menuicon name={headerOption.icon}/>
                  <h2 className="font-semibold text-xl capitalize">{headerOption.title} Form</h2>
                </div>
                {form}
              </Card>
            </div>
            <div>
              {list}
            </div>
          </div>
        </ScrollArea>
      </div>
      }
    </>
  );
}

export default DefaultPageContainer;