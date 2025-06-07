'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Text } from 'lucide-react'

import LongText from '@/components/long-text'
import { DataTableColumnHeader } from '@/components/table/data-table-column-header'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'

import { CellActions, USER_ROLE_OPTIONS, USER_STATUS_OPTIONS, UserType } from '@/features/users'
import { cn } from '@/lib/utils'

export const columns: ColumnDef<UserType>[] = [
   {
      id: 'select',
      header: ({ table }) => (
         <Checkbox
            aria-label="Select all"
            checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
            className="translate-y-[2px]"
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
         />
      ),
      cell: ({ row }) => (
         <Checkbox
            aria-label="Select row"
            checked={row.getIsSelected()}
            className="translate-y-[2px]"
            onCheckedChange={(value) => row.toggleSelected(!!value)}
         />
      ),
      enableSorting: false,
      enableHiding: false,
      meta: {
         className: cn(
            'sticky md:table-cell left-0 z-10 rounded-tl',
            'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
         ),
      },
   },
   {
      id: 'username',
      accessorKey: 'username',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Username" />
      ),
      cell: ({ row }) => (
         <LongText className="max-w-36">{row.getValue('username')}</LongText>
      ),
      enableHiding: false,
      meta: {
         className: cn(
            'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none',
            'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
            'sticky left-6 md:table-cell',
         ),
      },
   },
   {
      id: 'fullName',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => {
         const { firstName, lastName } = row.original
         const fullName = `${firstName} ${lastName}`
         return <LongText className="max-w-36">{fullName}</LongText>
      },
      meta: { className: 'w-36' },
   },
   {
      id: 'email',
      accessorKey: 'email',
      header: ({ column }) => (<DataTableColumnHeader column={column} title="Email" />),
      cell: ({ row }) => (
         <div className="w-fit text-nowrap">{row.getValue('email')}</div>
      ),
      meta: { icon: Text },
   },
   {
      id: 'phoneNumber',
      accessorKey: 'phoneNumber',
      header: ({ column }) => (<DataTableColumnHeader column={column} title="Phone Number" />),
      cell: ({ row }) => <div>{row.getValue('phoneNumber')}</div>,
      enableSorting: false,
   },
   {
      id: 'status',
      accessorKey: 'status',
      header: ({ column }) => (<DataTableColumnHeader column={column} title="Status" />),
      cell: ({ row }) => {
         const { status } = row.original
         const badgeColor = USER_STATUS_OPTIONS.find((option) => option.value === status)?.className
         return (
            <div className="flex space-x-2">
               <Badge className={cn('capitalize', badgeColor)} variant="outline">
                  {row.getValue('status')}
               </Badge>
            </div>
         )
      },
      enableHiding: false,
      enableSorting: false,
      enableColumnFilter: true,
      meta: {
         label: 'statuses',
         variant: 'multiSelect',
         options: USER_STATUS_OPTIONS,
      },
      // filterFn: (row, id, value) => {
      //    return value.includes(row.getValue(id))
      // },
   },
   {
      id: 'role',
      accessorKey: 'role',
      header: ({ column }) => (<DataTableColumnHeader column={column} title="Role" />),
      cell: ({ row }) => {
         const { role } = row.original
         const userType = USER_ROLE_OPTIONS.find(({ value }) => value === role)
         if (!userType) {
            return null
         }
         return (
            <div className="flex items-center gap-x-2">
               {userType.icon && (<userType.icon className="text-muted-foreground size-4" />)}
               <span className="text-sm capitalize">{row.getValue('role')}</span>
            </div>
         )
      },
      enableSorting: false,
      enableHiding: false,
      enableColumnFilter: true,
      meta: {
         label: 'roles',
         variant: 'multiSelect',
         options: USER_ROLE_OPTIONS,
      },
      filterFn: (row, id, value) => { return value.includes(row.getValue(id)) },
   },
   {
      id: 'actions',
      cell: CellActions,
   },
]
