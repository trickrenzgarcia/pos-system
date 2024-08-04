export type ReqProduct = {
  name: string
  category: string
  image: string
  price: number
  stock: number
}

export type Product = {
  id: string
  slug: string
  created_at: string
} & ReqProduct