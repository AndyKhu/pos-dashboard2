import { TEnumDB } from "./tenumdb"

export type TProduct = {
  id?: string
  code: string
  name: string
  stock: number
  unitId: string
  categoryId: string
  brandId: string
  buyprice: number
  sellprice: number
  description?: string
}

export type TProducts = {
  id:string,
  code: string,
  name: string,
  stock: number,
  unit: TEnumDB,
  category: TEnumDB,
  brand: TEnumDB,
  buyprice: number,
  sellprice: number,
  description?:string
}