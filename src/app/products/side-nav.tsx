import Link from 'next/link'
import React from 'react'


const productsMenu = [
  {
    label: "Products",
    link: "/products",
  }, 
  {
    label: "Category",
    link: "/products/category"
  }
]

export default function SideNav() {
  return (
    <div className='hidden md:flex w-60 border-r h-screen'>
      <div className='flex flex-col space-y-2 w-full px-6'>
        {productsMenu.map((item, index) => (
          <Link key={index} href={item.link}>
            {item.label}
          </Link>)
        )}
      </div>
    </div>
  )
}
