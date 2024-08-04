"use client"

import { Edit } from 'lucide-react'
import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Product } from '@/app/actions'

export default function EditMode({ product }: { product: Product }) {
  const [open, setOpen] = React.useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="relative flex cursor-pointer hover:bg-accent select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground">
          <Edit className="text-blue-500 mr-2 h-4 w-4" />
          Edit
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Product name
            </Label>
            <Input
              id="name"
              defaultValue={product.name}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Category
            </Label>
            <Input
              id="username"
              defaultValue={product.category}
              className="col-span-3"
              disabled
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => {
            setOpen(false)
          }}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
