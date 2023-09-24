import { TEnumDB } from "@/lib/type/tenumdb"
import {ColumnDef} from "@tanstack/react-table"

export const enumTableConfig:ColumnDef<TEnumDB>[] = [
  {
    accessorKey: "name",
    header: "Item Name",
  },
  {
    accessorKey: "description",
    header: "Description"
  },
]