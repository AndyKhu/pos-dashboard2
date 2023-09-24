import { TEnumDB } from "@/lib/type/tenumdb"
import { TProducts } from "@/lib/type/tproduct"
import {ColumnDef} from "@tanstack/react-table"

export const productTableConfig:ColumnDef<TProducts>[] = [
  {
    accessorKey: "code",
    header: "Item Code"
  },
  {
    accessorKey: "name",
    header: "Item Name",
  },
  {
    accessorKey: "stock",
    header: "Stock"
  },
  {
    accessorKey: "unit",
    header: "Unit",
    cell: ({row}) => {
      const unit = row.getValue("unit") as TEnumDB
      return <>{unit?unit.name:""}</>
    }
  },
  {
    accessorKey: "brand",
    header: "Brand",
    cell: ({row}) => {
      const brand = row.getValue("brand") as TEnumDB
      return <>{brand?brand.name:""}</>
    }
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({row}) => {
      const category = row.getValue("category") as TEnumDB
      return <>{category?category.name:""}</>
    }
  },
  {
    accessorKey: "buyprice",
    header: "Buyprice"
  },
  {
    accessorKey: "sellprice",
    header: "SellPrice"
  },
  {
    accessorKey: "description",
    header: "Description"
  },
]