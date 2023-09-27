"use client"

import TableData from "@/components/ui/table-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { useSession } from "next-auth/react";
import { getProducts } from "@/services/productServices";
import { useDebounce } from 'use-debounce';
import { productTableConfig } from "../../config/productColumn";
import { TProducts } from "@/lib/type/tproduct";

interface ProductListsProps {
  handlerAddItem: (e:TProducts[]) => void
}
interface ProductState {
  searchFilter: string
  productLists: TProducts[]
  currentPage: number
  totalData: number
  totalPage: number
}
const ProductAddItem = ({handlerAddItem}:ProductListsProps) => {
  const {data:session} = useSession()
  const accessToken = session?.user.token.accessToken || "";
  const isMobile = useMediaQuery(640)


  const [rowSelection, setRowSelection] = useState({})
  const [state, setState] = useState<ProductState>({
    searchFilter: "",
    productLists: [],
    currentPage: 1,
    totalData: 0,
    totalPage: 0,
  })
  const [searchDebounce] = useDebounce(state.searchFilter,1000)
  const updateProductLists = async (type:boolean) => {
    const updatedPage = type ? state.currentPage + 1 : state.currentPage - 1;
    const res = await getProducts(accessToken,(updatedPage-1)*10,searchDebounce)
    const resData = await res.json()
    if (res.ok) {
      setState((prevState) => ({
        ...prevState,
        productLists: resData.data,
        currentPage: prevState.currentPage + (type ? 1 : -1),
      }))
    }
  }
  const updateProduct = async () => {
    const res = await getProducts(accessToken, undefined, searchDebounce);
    const resData = await res.json()
    if(res.ok){
      setState((prevState) => ({
        ...prevState,
        productLists: resData.data,
        currentPage: 1,
        totalData: resData.count,
        totalPage: resData.totalPage,
      }))
    }
  }
  const handleClick = ()=> {
    const selected = state.productLists.filter(pro => Object.keys(rowSelection).includes(pro.id))
    handlerAddItem(selected)
  }
  useEffect(()=>{
    if(accessToken)
      updateProduct()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[searchDebounce])
  return (
    <>
      <div className="flex justify-between items-center flex-wrap p-3">
        <Input icon="Search" placeholder="Search...." value={state.searchFilter} onChange={(e)=>setState((prevState) => ({ ...prevState, searchFilter: e.target.value }))} className="w-full sm:w-96"/>
        <div className={cn("w-full sm:w-auto mt-3 sm:mt-0 gap-3",isMobile?"grid grid-cols-2":"flex")}>
          <Button size="sm" variant="success" onClick={handleClick}>
            Select Item
          </Button>
        </div>
      </div>
      <TableData data={state.productLists || []} columns={productTableConfig} selectable sorting selection={{rowSelection,setRowSelection}} />
      <div className="flex items-center justify-between p-3">
        <p className="text-sm text-muted-foreground">
          {state.currentPage === 0? 1 : (state.currentPage-1)*10+1}-{state.currentPage*10 > state.totalData ? state.totalData : state.currentPage*10} of {state.totalData}
        </p>
        <div className="grid grid-cols-2 gap-3">
          <Button disabled={state.currentPage===1} onClick={()=> updateProductLists(false)} size="sm">
            Previous
          </Button>
          <Button disabled={state.currentPage=== state.totalPage} onClick={()=> updateProductLists(true)} size="sm">
            Next
          </Button>
        </div>
      </div>
    </>
  );
}

export default ProductAddItem;