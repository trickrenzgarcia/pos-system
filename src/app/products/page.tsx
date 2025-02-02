import { auth } from '@/drizzle/auth';
import { redirect } from 'next/navigation';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import {
  AddProduct,
  ProductsDataTable
} from '@/app/products/_components';
import { getCategories, getProducts } from '@/app/actions';

export default async function ProductsPage() {
  const session = await auth();
  const categories = await getCategories()
  const products = await getProducts()

  if(!session) {
    redirect("/auth/login?redirect=products");
  }

  return (
    <div className='w-full py-4 px-5'>
      <div className='flex justify-between'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage className='font-bold'>Products</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <AddProduct categories={categories} />
      </div>
      
      <div className='flex'>
        <ProductsDataTable products={products} />
      </div>
    </div>
  )
}
