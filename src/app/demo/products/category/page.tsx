import { getCategories } from '@/app/actions'
import CategoryItems from './category-items'
import ProductBreadcrumb from "@/app/demo/products/_components/breadcrumb"

export default async function Category() {
  const categories = await getCategories()

  return (
    <div className='w-full space-y-4 py-4 px-5'>
      <ProductBreadcrumb page='Category' />
      <div className='w-full'>
        <CategoryItems categories={categories} />
      </div>
    </div>
  )
}
