"use client"

import MainNav from "./main-nav"
import MobileNav from "./mobile-nav"
import UserNav from "./user-nav"
import { Search } from "./search"
import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation"


export default function Navbar() {
  const session = useSession()
  const pathname = usePathname()
  const isDemo = pathname.includes("/demo")

  if((session && session.data?.user.role === "admin") || isDemo) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <MainNav />
          <MobileNav />
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div></div>
            <nav className="flex items-center gap-4">
              <Search />
              <UserNav />
            </nav>
          </div>
        </div>
      </header>
    )
  }
}