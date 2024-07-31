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
export default async function ProductsPage() {
  const session = await auth();

  if(!session) {
    redirect("/auth/login?redirect=products");
  }

  return (
    <div className='w-full space-y-4 py-4 px-5'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage className='font-bold'>Products</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
