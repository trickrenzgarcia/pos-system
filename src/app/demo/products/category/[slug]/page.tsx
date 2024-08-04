import React from 'react'
import { ProductBreadcrumb } from '@/app/demo/products/_components'
import { Category } from '@/app/actions'

type CategoryItemParams = {
  params: { slug: string }
}

export default async function CategoryItem({ params: { slug }}: CategoryItemParams) {
  const category = await fetch(process.env.BASE_URL+`/api/products/category/${slug}`, {
    next: {
      tags: ['category']
    }
  }).then(res => res.json()) as Category[]


  if (!category.length) {
    return <div>Category not found</div>
  }

  return (
    <div className='w-full space-y-4 py-4 px-5'>
      <ProductBreadcrumb list={["Category"]} page={category[0].category} />
    </div>
  )
}
