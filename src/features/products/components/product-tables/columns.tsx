'use client'

import { Column, ColumnDef } from '@tanstack/react-table'
import { CheckCircle2, Text, XCircle } from 'lucide-react'
import Image from 'next/image'

import { DataTableColumnHeader } from '@/components/table/data-table-column-header'
import { Badge } from '@/components/ui/badge'

import { ProductType } from '@/features/products/data/schema'

import { CellActions } from './cell-actions'
import { CATEGORY_OPTIONS } from './options'

export const columns: ColumnDef<ProductType>[] = [
   {
      accessorKey: 'photo_url',
      header: 'IMAGE',
      cell: ({ row }) => {
         return (
            <div className="relative aspect-square h-10">
               <Image
                  alt={row.getValue('name')}
                  className="rounded-lg"
                  fill
                  src={row.getValue('photo_url')}
               />
            </div>
         )
      },
   },
   {
      id: 'name',
      accessorKey: 'name',
      header: ({ column }: { column: Column<ProductType, unknown> }) => (
         <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ cell }) => <div>{cell.getValue<ProductType['name']>()}</div>,
   },
   {
      id: 'category',
      accessorKey: 'category',
      header: ({ column }: { column: Column<ProductType, unknown> }) => (
         <DataTableColumnHeader column={column} title="Category" />
      ),
      cell: ({ cell }) => {
         const status = cell.getValue<ProductType['category']>()
         const Icon = status === 'active' ? CheckCircle2 : XCircle

         return (
            <Badge className="capitalize" variant="outline">
               <Icon />
               {status}
            </Badge>
         )
      },
      enableColumnFilter: true,
      meta: {
         label: 'categories',
         variant: 'multiSelect',
         options: CATEGORY_OPTIONS,
         className: '',
      },
   },
   {
      accessorKey: 'price',
      header: 'PRICE',
   },
   {
      accessorKey: 'description',
      header: 'DESCRIPTION',
   },

   {
      id: 'actions',
      cell: ({ row }) => <CellActions data={row.original} />,
   },
]
