import { auth } from "@/drizzle/auth";
import ProductBreadcrumb from "../_components/breadcrumb"
import { redirect } from "next/navigation";

export default async function TrashPage() {
  const session = await auth();

  if (!session) {
    redirect('/auth/login')
  } else if (session.user.role !== 'admin'){
    redirect('/access-denied');
  } else {
    return (
      <div className='w-full space-y-4 py-4 px-5'>
        <ProductBreadcrumb page='Trash' />
      </div>
    )
  }
}
