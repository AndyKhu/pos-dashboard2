import InputNumber, { formatCurrency } from "@/components/ui/inputNumber"
import { TSaleProduct } from "@/lib/type/tsale"
import {ColumnDef} from "@tanstack/react-table"
import React from "react"

export const saleProductTableConfig:ColumnDef<TSaleProduct>[] = [
  {
    accessorKey: "product.code",
    header: "Product Code",
  },
  {
    accessorKey: "product.name",
    header: "Product Name"
  },
  {
    accessorKey: "product.unit.name",
    header: "UNIT"
  },
  {
    accessorKey: "qty",
    header: "QTY",
    meta:{
      align: "center"
    },
    cell: ({getValue}) => {
      return (<>{formatCurrency(getValue() as number ,false)}</>)
    }
  },
  {
    accessorKey: "price",
    header: "Price",
    meta:{
      align: "center"
    },
    cell: ({getValue}) => {
      return (<>{formatCurrency(getValue() as number ,false)}</>)
    }
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({row})=>{
      const price = row.getValue("price") as number
      const qty = row.getValue("qty") as number
      return (<>{formatCurrency(price*qty,true)}</>)
    }
  },
]