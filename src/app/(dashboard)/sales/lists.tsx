"use client"

import TableData from "@/components/ui/table-data";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PenSquare, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { useSession } from "next-auth/react";
import { useDebounce } from 'use-debounce';
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { TMenuPermission } from "@/lib/type/tmenu";
import { saleTableConfig } from "./config/saleTableConfig";
import { TSale } from "@/lib/type/tsale";
import { deleteSales, getSales } from "@/services/saleServices";

interface SalesListsProps {
  data: {
    data: TSale[],
    count: number,
    totalPage: number
  }
  permission: TMenuPermission
}
const SalesLists = ({data,permission}:SalesListsProps) => {
  const {data:session} = useSession()
  const router = useRouter()
  const accessToken = session?.user.token.accessToken || "";
  const isMobile = useMediaQuery(640)


  const [rowSelection, setRowSelection] = useState({})
  const [state, setState] = useState({
    searchFilter: "",
    salesLists: data.data,
    currentPage: 1,
    totalData: data.count,
    totalPage: data.totalPage,
  })
  const [searchDebounce] = useDebounce(state.searchFilter,1000)
  const updateSalesLists = async (type:boolean) => {
    const updatedPage = type ? state.currentPage + 1 : state.currentPage - 1;
    const res = await getSales(accessToken,(updatedPage-1)*10,searchDebounce)
    const resData = await res.json()
    if (res.ok) {
      setState((prevState) => ({
        ...prevState,
        salesLists: resData.data,
        currentPage: prevState.currentPage + (type ? 1 : -1),
      }))
    }
  }
  const handleEdit = () => {
    const selected = Object.keys(rowSelection)
    router.push(`/sales/form/${selected[0]}`)
  }
  const handleDelete = async () => {
    const selected = Object.keys(rowSelection)
    const res = await deleteSales(selected,accessToken)
      const resData = await res.json()
      if(res.ok){
        toast({
          title: `Sales Deleted!`,
          description: `Your data has been Delete successfully.`,
          variant: "success",
          duration: 1000
        })
        updateSales()
      }else{
        toast({
          title: `Failed to Delete Sales!`,
          description: `Error: ${resData.err}`,
          variant: "destructive",
          duration: 3000
        })
      }
      setRowSelection({})
  }
  const updateSales = async () => {
    const res = await getSales(accessToken, undefined, searchDebounce);
    const resData = await res.json()
    if(res.ok){
      setState((prevState) => ({
        ...prevState,
        salesLists: resData.data,
        currentPage: 1,
        totalData: resData.count,
        totalPage: resData.totalPage,
      }))
    }
  }
  useEffect(()=>{
    if(accessToken)
      updateSales()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[searchDebounce])
  return (
    <Card>
      <div className="flex justify-between items-center flex-wrap p-3">
        <Input icon="Search" placeholder="Search...." value={state.searchFilter} onChange={(e)=>setState((prevState) => ({ ...prevState, searchFilter: e.target.value }))} className="w-full sm:w-96"/>
        <div className={cn("w-full sm:w-auto mt-3 sm:mt-0 gap-3",isMobile?"grid grid-cols-2":"flex")}>
          <Button size="sm" variant="success" className={cn(Object.keys(rowSelection).length === 1 && permission.edit?"":"hidden","space-x-2")} onClick={handleEdit}>
            <PenSquare size={18}/>
            {isMobile?<span>EDIT</span>:null}
          </Button>
          <Button size="sm" variant="destructive" className={cn(Object.keys(rowSelection).length > 0 && permission.delete?"":"hidden","space-x-2")} onClick={handleDelete}>
            <Trash2 size={18}/>
            {isMobile?<span>DELETE</span>:null}
          </Button>
        </div>
      </div>
      <TableData data={state.salesLists || []} columns={saleTableConfig} selectable sorting selection={{rowSelection,setRowSelection}} />
      <div className="flex items-center justify-between p-3">
        <p className="text-sm text-muted-foreground">
          {state.currentPage === 0? 1 : (state.currentPage-1)*10+1}-{state.currentPage*10 > state.totalData ? state.totalData : state.currentPage*10} of {state.totalData}
        </p>
        <div className="grid grid-cols-2 gap-3">
          <Button disabled={state.currentPage===1} onClick={()=> updateSalesLists(false)} size="sm">
            Previous
          </Button>
          <Button disabled={state.currentPage=== state.totalPage} onClick={()=> updateSalesLists(true)} size="sm">
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default SalesLists;