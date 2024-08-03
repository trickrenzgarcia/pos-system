import CategoryItems, { type Category } from './category-items'
import { redirect } from "next/navigation"
import ProductBreadcrumb from "../_components/breadcrumb"
import { auth } from '@/drizzle/auth'

export default async function Category() {
  const session = await auth();
  const categories: Category[] = await fetch(process.env.BASE_URL+'/api/products/category', {
    cache: 'no-store',
    next: {
      tags: ['category']
    }
  }).then(res => res.json())

  if (!session) {
    redirect('/auth/login')
  } else if (session.user.role !== 'admin'){
    redirect('/access-denied');
  } else {
    return (
      <div className='w-full space-y-4 py-4 px-5'>
        <ProductBreadcrumb page='Category' />
        <div className='w-full'>
          <CategoryItems categories={categories} />
        </div>
      </div>
    )
  }
}
