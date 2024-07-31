"use client";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-4 items-center space-x-2 lg:mr-6">
        <span className="hidden font-bold lg:inline-block">{siteConfig.name}</span>
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        <Link
          href="/dashboard"
          className={cn("transition-colors hover:text-foreground/80", 
          pathname === "/dashboard" ? "text-foreground font-semibold" : "text-foreground/60")}
          >
          Dashboard
        </Link>
        <Link
          href="/customers"
          className={cn("transition-colors hover:text-foreground/80", 
          pathname === "/customers" ? "text-foreground font-semibold" : "text-foreground/60")}
          >
          Customers
        </Link>
        <Link
          href="/products"
          className={cn("transition-colors hover:text-foreground/80", 
          pathname === "/products" ? "text-foreground font-semibold" : "text-foreground/60")}
          >
          Products
        </Link>
        <Link
          href="/settings"
          className={cn("transition-colors hover:text-foreground/80", 
          pathname === "/settings" ? "text-foreground font-semibold" : "text-foreground/60")}
          >
          Settings
        </Link>
      </nav>
    </div>
  )
}
