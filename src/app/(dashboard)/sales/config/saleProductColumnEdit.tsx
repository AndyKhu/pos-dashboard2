import InputNumber, { formatCurrency } from "@/components/ui/inputNumber"
import { TSaleProduct } from "@/lib/type/tsale"
import {ColumnDef} from "@tanstack/react-table"
import React from "react"

export const saleProductTableConfigEdit:ColumnDef<TSaleProduct>[] = [
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
    cell: ({ getValue, row: { index }, column: { id }, table }) => {
      const Input = () => {
        const initialValue = getValue()
        // We need to keep and update the state of the cell normally
        const [value, setValue] = React.useState(initialValue)
    
        // When the input is blurred, we'll call our table meta's updateData function
        const onBlur = () => {
          table.options.meta?.updateData(index, id, value)
        }
    
        // If the initialValue is changed external, sync it up with our state
        React.useEffect(() => {
          setValue(initialValue)
        }, [initialValue])
    
        return (
          <div className="flex justify-center items-center">
            <InputNumber className="w-16"
              value={value as number}
              onValueChange={e => setValue(e)}
              onBlur={onBlur}
            />
          </div>
        )
      }
      return <Input/>
    }
  },
  {
    accessorKey: "price",
    header: "Price",
    meta:{
      align: "center"
    },
    cell: ({ getValue, row: { index }, column: { id }, table }) => {
      const Input = () => {
        const initialValue = getValue()
        // We need to keep and update the state of the cell normally
        const [value, setValue] = React.useState(initialValue)
    
        // When the input is blurred, we'll call our table meta's updateData function
        const onBlur = () => {
          table.options.meta?.updateData(index, id, value)
        }
    
        // If the initialValue is changed external, sync it up with our state
        React.useEffect(() => {
          setValue(initialValue)
        }, [initialValue])
    
        return (
          <div className="flex justify-center items-center">
            <InputNumber className="w-36"
              value={value as number}
              onValueChange={e => setValue(e)}
              onBlur={onBlur}
            />
          </div>
        )
      }
      return <Input/>
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