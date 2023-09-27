import { TProducts } from "./tproduct"

export type TSale = {
  id?: string,
  notrx?: string,
  date: Date,
  total: number,
  saleProduct: TSaleProduct[]
}

export type TSaleProduct = {
  id?: string
  parentId?: string
  productId: string
  qty: number
  price: number
  product?: TProducts
}
