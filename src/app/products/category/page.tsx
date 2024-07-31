"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import CategoryItems from './category-items'
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"



export default function Category() {
  const router = useRouter()
  const session = useSession()

  if (!session.data) {
    router.push('/auth/login')
  } else if (session.data.user.role !== 'admin'){
    router.push('/access-denied');
  } else {
    return (
      <div className='w-full space-y-4 py-4 px-5'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink className="cursor-pointer" onClick={() => router.push('/products')}>Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className='font-bold'>Category</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className='w-full'>
          <CategoryItems />
        </div>
      </div>
    )
  }

  
}
