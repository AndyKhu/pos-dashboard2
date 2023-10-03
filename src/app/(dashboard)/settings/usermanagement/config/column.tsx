import { TUser } from "@/lib/type/tuser"
import {ColumnDef} from "@tanstack/react-table"

export const UserTableConfig:ColumnDef<TUser>[] = [
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "role.name",
    header: "Role"
  },
  {
    accessorKey: "status",
    header: "Status"
  }
]