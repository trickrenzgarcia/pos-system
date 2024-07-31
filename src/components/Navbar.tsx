"use client"

import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import MainNav from "./main-nav"
import MobileNav from "./mobile-nav"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import SignOutButton from "./button/SignOutButton"


export default function Navbar() {
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div></div>
          <nav className="flex items-center gap-4">
            <Avatar className="w-8 h-8">
              <AvatarImage  src={session?.user.image!} />
              <AvatarFallback>{session?.user.name}</AvatarFallback>
            </Avatar>
            <SignOutButton variant="outline" size="sm" />
          </nav>
        </div>
      </div>
    </header>
  )
}