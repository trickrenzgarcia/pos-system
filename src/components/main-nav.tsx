"use client";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function MainNav() {
  const pathname = usePathname()
  const isDemo = pathname.includes("/demo")

  return (
    <div className="mr-4 hidden md:flex">
      <Link href={`/${isDemo && "demo"}`} className="mr-4 items-center space-x-2 lg:mr-6">
        <span className="hidden font-bold lg:inline-block">{siteConfig.name}</span>
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        <Link
          href={`/${isDemo && "demo"}/dashboard`}
          className={cn("transition-colors hover:text-foreground/80", 
          pathname === `/${isDemo && "demo"}/dashboard` ? "text-foreground font-semibold" : "text-foreground/60")}
          >
          Dashboard
        </Link>
        <Link
          href={`/${isDemo && "demo"}/inventory`}
          className={cn("transition-colors hover:text-foreground/80", 
          pathname === `/${isDemo && "demo"}/inventory` ? "text-foreground font-semibold" : "text-foreground/60")}
          >
          Inventory
        </Link>
        <Link
          href={`/${isDemo && "demo"}/products`}
          className={cn("transition-colors hover:text-foreground/80", 
          pathname === `/${isDemo && "demo"}/products` || pathname.includes("/products") ? "text-foreground font-semibold" : "text-foreground/60")}
          >
          Products
        </Link>
        <Link
          href={`/${isDemo && "demo"}/settings`}
          className={cn("transition-colors hover:text-foreground/80", 
          pathname === `/${isDemo && "demo"}/settings` ? "text-foreground font-semibold" : "text-foreground/60")}
          >
          Settings
        </Link>
      </nav>
    </div>
  )
}
