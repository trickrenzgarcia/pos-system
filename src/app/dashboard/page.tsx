import { auth } from '@/drizzle/auth'
import { redirect } from 'next/navigation';
import React from 'react'

export default async function Dashboard() {
  const session = await auth();

  if(!session) {
    redirect("/auth/login?redirect=dashboard");
  }

  return (
    <div>Dashboard</div>
  )
}
