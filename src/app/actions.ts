'use server'

import { revalidateTag } from 'next/cache'

export type Product = {
  id: string
  slug: string
  name: string
  price: number
  stock: number
  category: string
  image: string
  created_at: string
}

export type Category = {
  id: string
  slug: string
  category: string
  icon: string
  created_at: string
}

export async function getCategories() {
  return await fetch(process.env.BASE_URL+'/api/products/category', {
    cache: 'no-store',
    next: {
      tags: ['category']
    }
  }).then(res => res.json()) as Category[]
}

export async function createCategory(data: { category: string, icon: string }) {
  const res = await fetch(process.env.BASE_URL+"/api/products/category", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      category: data.category,
      icon: data.icon,
    }),
  })
  revalidateTag('category')
  const returnData = await res.json()
  return returnData;
}

export async function createProduct(data: Omit<Product, 'id' | 'slug' | 'created_at'>) {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('category', data.category);
  formData.append('price', data.price.toString());
  formData.append('stock', data.stock.toString());
  formData.append('image', data.image);
  const res = await fetch(process.env.BASE_URL+"/api/product", {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData
  })
  revalidateTag('product')
  const returnData = await res.json()
  return returnData;
}