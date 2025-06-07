'use client'

import { Plus } from 'lucide-react'
import Link from 'next/link'

import { Button, buttonVariants } from '@/components/ui/button'

import { cn } from '@/lib/utils'

import { useProducts } from '../context/proudct-context'

export function ProductPrimaryButtons() {
   const { setOpen } = useProducts()
   return (
      <div className="flex gap-2">
         <Link
            className={cn(buttonVariants(), 'text-xs md:text-sm')}
            href="/dashboard/product/new"
         >
            <Plus className="mr-2 h-4 w-4" />
            {' '}
            Add New
         </Link>
         <Button className="space-x-1" onClick={() => setOpen('create')}>
            <span>Create</span>
            {' '}
            <Plus size={18} />
         </Button>
      </div>
   )
}
