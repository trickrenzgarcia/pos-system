"use client"

import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import * as Icon from "lucide-react"
import AddCategory from './add-category'
import seedColor from "seed-color"
import Link from 'next/link'
import { Category } from '@/app/actions'

type IconType = keyof typeof Icon

export default function CategoryItems({ categories }: { categories: Category[] }) {
  
  return (
    <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {categories.map((cat, index) => {
        const IconComp = Icon[cat.icon as IconType] as React.FC<React.SVGProps<SVGSVGElement>>
        return (
          <Link
            href={`/demo/products/category/${cat.slug}`}
            key={index}
          >
            <Card
              className={cn('h-36 md:h-48 lg:h-52 hover:bg-muted')}
            >
              <CardHeader></CardHeader>
              <CardContent className='w-full gap-2 flex flex-col items-center justify-center'>
                {<IconComp className='w-10 h-10 lg:w-16 lg:h-16' style={{
                  color: seedColor(cat.slug+cat.id).toHex()
                }} />}
                <p className='font-bold'>{cat.category}</p>
              </CardContent>
            </Card>
          </Link>
        )}
      )}
      <AddCategory />
    </div>
  )
}
