import React from 'react'
import SideNav from './side-nav'

export default function ProductsLayout(
  { children }: { children: Readonly<React.ReactNode> }
) {
  return (
    <div className='flex'>
      <SideNav />
      {children}
    </div>
  )
}
