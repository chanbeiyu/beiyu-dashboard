'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Text } from 'lucide-react'

import { DataTableColumnHeader } from '@/components/table/data-table-column-header'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'

import { CellActions, TaskType } from '@/features/tasks'
import { LABEL_OPTIONS, TASK_PRIORITY_OPTIONS, TASK_STATUS_OPTIONS } from '@/features/tasks/components/task-tables/options'

export const columns: ColumnDef<TaskType>[] = [
   {
      id: 'select',
      header: ({ table }) => (
         <Checkbox
            aria-label="Select all"
            checked={
               table.getIsAllPageRowsSelected()
               || (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
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
   },
   {
      id: 'id',
      accessorKey: 'id',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Task" />
      ),
      cell: ({ row }) => <div className="w-[80px]">{row.getValue('id')}</div>,
      enableSorting: false,
      enableHiding: false,
   },
   {
      id: 'title',
      accessorKey: 'title',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Title" />
      ),
      cell: ({ row }) => {
         const label = LABEL_OPTIONS.find((label) => label.value === row.original.label)
         return (
            <div className="flex space-x-2">
               {label && <Badge variant="outline">{label.label}</Badge>}
               <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
                  {row.getValue('title')}
               </span>
            </div>
         )
      },
   },
   {
      id: 'status',
      accessorKey: 'status',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
         const status = TASK_STATUS_OPTIONS.find(
            (status) => status.value === row.getValue('status'),
         )
         if (!status) {
            return null
         }
         return (
            <div className="flex w-[100px] items-center">
               {status.icon && (
                  <status.icon className="text-muted-foreground mr-2 h-4 w-4" />
               )}
               <span>{status.label}</span>
            </div>
         )
      },
      enableColumnFilter: true,
      meta: {
         label: 'statuses',
         variant: 'multiSelect',
         options: TASK_STATUS_OPTIONS,
      },
      // filterFn: (row, id, value) => {
      //    return value.includes(row.getValue(id))
      // },
   },
   {
      id: 'priority',
      accessorKey: 'priority',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Priority" />
      ),
      cell: ({ row }) => {
         const priority = TASK_PRIORITY_OPTIONS.find(
            (priority) => priority.value === row.getValue('priority'),
         )

         if (!priority) {
            return null
         }

         return (
            <div className="flex items-center">
               {priority.icon && (
                  <priority.icon className="text-muted-foreground mr-2 h-4 w-4" />
               )}
               <span>{priority.label}</span>
            </div>
         )
      },
      enableColumnFilter: true,
      meta: {
         label: 'priorities',
         variant: 'multiSelect',
         options: TASK_PRIORITY_OPTIONS,
      },
      // filterFn: (row, id, value) => {
      //    return value.includes(row.getValue(id))
      // },
   },
   {
      id: 'actions',
      cell: ({ row }) => <CellActions row={row} />,
   },
]
