import { formatCurrency } from "@/components/ui/inputNumber"
import { TSale, TSaleProduct } from "@/lib/type/tsale"
import {ColumnDef} from "@tanstack/react-table"
import { format } from "date-fns"

export const saleTableConfig:ColumnDef<TSale>[] = [
  {
    accessorKey: "notrx",
    header: "Transaction No."
  },
  {
    accessorKey: "date",
    header: "Transaction Date",
    cell: ({getValue}) => (
      <>{format(new Date(getValue() as string), "PPP")}</>
    )
  },
  {
    accessorKey: "saleProduct",
    header: "Total Item",
    meta: {
      align: "center"
    },
    cell: ({getValue}) => {
      const data = getValue() as TSaleProduct[]
      const totalItem = data.reduce((accumulator, pro) => {
        return accumulator + pro.qty;
      }, 0)
      return <>{totalItem}</>
    }
  },
  {
    accessorKey: "total",
    header: "Total Price",
    cell: ({getValue}) => (
      <>{formatCurrency(getValue() as number,true)}</>
    )
  }
]