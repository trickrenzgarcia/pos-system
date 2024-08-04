"use client"
import { 
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Switch } from "./ui/switch"
import { Label } from "./ui/label"
import { useState } from "react"
import { useTheme } from "next-themes"

export default function UserNav() {
  const { data: session } = useSession()
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(theme === 'dark');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="w-8 h-8">
            <AvatarImage src={session?.user.image!} />
            <AvatarFallback>{session?.user.name ? session.user.name : ""}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none flex items-center gap-1">
              {session?.user.name ? session.user.name : "Demo User"}
              <span className="text-[11px] dark:text-black bg-purple-300 px-[3px] rounded-sm py-[2px]">
                {session?.user.role ? session.user.role : "Admin"}
              </span>
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session?.user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/settings')}>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          
        </DropdownMenuGroup>
        <div className="flex items-center space-x-2 my-2 mx-1">
          <Switch id="mode" checked={isDarkMode} onCheckedChange={(checked) => {
            if(checked) {
              setTheme("dark")
              setIsDarkMode(true)
            } else {
              setTheme("light")
              setIsDarkMode(false)
            }
          }} />
          <Label htmlFor="mode" className="text-sm">Dark Mode</Label>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => {
          if(!session?.user.role) {
            router.push('/auth/login')
            router.refresh()
          } else {
            signOut()
            router.push('/auth/login')
            router.refresh()
          }
        }}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
        
          
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
