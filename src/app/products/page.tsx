import { auth } from '@/drizzle/auth';
import { redirect } from 'next/navigation';


import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import ProductsDataTable from './_components/ProductsDataTable';
import { Button } from '@/components/ui/button';
import AddProduct from './_components/add-product';
import { Category } from '@/app/actions';

export default async function ProductsPage() {
  const session = await auth();
  const categories: Category[] = await fetch(process.env.BASE_URL+'/api/products/category', {
    cache: 'no-store',
    next: {
      tags: ['category']
    }
  }).then(res => res.json())

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
        <ProductsDataTable />
      </div>
    </div>
  )
}
