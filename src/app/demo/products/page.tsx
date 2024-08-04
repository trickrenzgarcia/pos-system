import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import {
  AddProduct,
  ProductsDataTable
} from '@/app/demo/products/_components';
import { getCategories, getProducts } from '@/app/actions';

export default async function ProductsPage() {
  const categories = await getCategories()
  const products = await getProducts()

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
