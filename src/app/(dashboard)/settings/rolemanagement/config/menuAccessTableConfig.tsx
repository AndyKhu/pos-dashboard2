import { Checkbox } from "@/components/ui/checkbox"
import { TMenuPermission } from "@/lib/type/tmenu"
import {ColumnDef} from "@tanstack/react-table"

export const menuAccessTableConfig:ColumnDef<TMenuPermission>[] = [
  {
    accessorKey: "menu.title",
    header: "Menu Name",
  },
  {
    accessorKey: "add",
    header: "ADD",
    cell: ({getValue,row:{index},column:{id},table}) => {
      const initialValue = !!getValue()
      return <Checkbox checked={initialValue} onCheckedChange={(e)=> {table.options.meta?.updateData(index,id,e)}}></Checkbox>
    }
  },
  {
    accessorKey: "view",
    header: "VIEW",
    cell: ({getValue,row:{index},column:{id},table}) => {
      const initialValue = !!getValue()
      return <Checkbox checked={initialValue} onCheckedChange={(e)=> {table.options.meta?.updateData(index,id,e)}}></Checkbox>
    }
  },
  {
    accessorKey: "edit",
    header: "EDIT",
    cell: ({getValue,row:{index},column:{id},table}) => {
      const initialValue = !!getValue()
      return <Checkbox checked={initialValue} onCheckedChange={(e)=> {table.options.meta?.updateData(index,id,e)}}></Checkbox>
    }
  },
  {
    accessorKey: "delete",
    header: "DELETE",
    cell: ({getValue,row:{index},column:{id},table}) => {
      const initialValue = !!getValue()
      return <Checkbox checked={initialValue} onCheckedChange={(e)=> {table.options.meta?.updateData(index,id,e)}}></Checkbox>
    }
  }
]