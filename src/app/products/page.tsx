import { auth } from '@/drizzle/auth';
import { redirect } from 'next/navigation';
import React from 'react'
import SideNav from './side-nav';

export default async function ProductsPage() {
  const session = await auth();

  if(!session) {
    redirect("/auth/login?redirect=products");
  }

  return (
    <div>
      asdasd
    </div>
  )
}
