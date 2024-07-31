"use client"

import React from 'react'
import seedColor from "seed-color"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Pizza, CupSoda, Shirt, Plug2, Plus } from "lucide-react"


export default function CategoryItems() {
  const productCategories = [
    {
      title: 'Food',
      description: 'Food Category Description',
      Icon: Pizza
    },
    {
      title: 'Drinks',
      description: 'Category 2 Description',
      Icon: CupSoda
    },
    {
      title: 'Clothes',
      description: 'Category 3 Description',
      Icon: Shirt
    },
    {
      title: 'Electronics',
      description: 'Category 4 Description',
      Icon: Plug2
    },
  ]
  return (
    <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {productCategories.map((category, index) => (
        <Card 
          key={index}
          className={cn('h-36 md:h-48 lg:h-52')}
        >
          <CardHeader>
            
          </CardHeader>
          <CardContent className='w-full gap-2 flex flex-col items-center justify-center'>
            {<category.Icon className='w-10 h-10 lg:w-16 lg:h-16' />}
            <p className='font-bold'>{category.title}</p>
          </CardContent>
        </Card>
      ))}
        <Card 
          className={cn('h-36 md:h-48 lg:h-52', 'hover:bg-blue-600 cursor-pointer hover:text-white')}
          >
          <CardHeader>
            
          </CardHeader>
          <CardContent className='w-full gap-2 flex flex-col items-center justify-center'>
            <Plus className='w-10 h-10 lg:w-16 lg:h-16' />
            <p className='font-bold'>Add Category</p>
          </CardContent>
        </Card>
    </div>
  )
}
