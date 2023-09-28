import { TRole } from "@/lib/type/trole"
import {ColumnDef} from "@tanstack/react-table"

export const RoleTableConfig:ColumnDef<TRole>[] = [
  {
    accessorKey: "name",
    header: "Item Name",
  },
  {
    accessorKey: "description",
    header: "Description"
  },
]