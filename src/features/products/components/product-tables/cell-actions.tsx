'use client'

import React, { useState } from 'react'

import { Edit, EllipsisVertical, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { AlertModal } from '@/components/modal/alert-modal'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

import { ProductType } from '@/features/products/data/schema'

interface CellActionProps {
   data: ProductType
}

export const CellActions: React.FC<CellActionProps> = ({ data }) => {
   const [loading] = useState(false)
   const [open, setOpen] = useState(false)
   const router = useRouter()

   const onConfirm = async () => {}

   return (
      <>
         <AlertModal
            isOpen={open}
            loading={loading}
            onCloseAction={() => setOpen(false)}
            onConfirmAction={onConfirm}
         />
         <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
               <Button className="h-8 w-8 p-0" variant="ghost">
                  <span className="sr-only">Open menu</span>
                  <EllipsisVertical className="h-4 w-4" />
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
               <DropdownMenuLabel>Actions</DropdownMenuLabel>
               <DropdownMenuItem
                  onClick={() => router.push(`/dashboard/product/${data.id}`)}
               >
                  <Edit className="mr-2 h-4 w-4" />
                  {' '}
                  Update
               </DropdownMenuItem>
               <DropdownMenuItem onClick={() => setOpen(true)}>
                  <Trash className="mr-2 h-4 w-4" />
                  {' '}
                  Delete
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
      </>
   )
}
