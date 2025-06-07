import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Row } from '@tanstack/react-table'
import { Edit, Trash } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

import { UserType, useUsers } from '@/features/users'

interface DataTableRowActionsProps {
   row: Row<UserType>
}

export function CellActions({ row }: DataTableRowActionsProps) {
   const { setOpen, setCurrentRow } = useUsers()
   return (
      <>
         <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
               <Button className="data-[state=open]:bg-muted flex h-8 w-8 p-0" variant="ghost">
                  <DotsHorizontalIcon className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
               <DropdownMenuItem
                  onClick={() => {
                     setCurrentRow(row.original)
                     setOpen('edit')
                  }}
               >
                  Edit
                  <DropdownMenuShortcut>
                     <Edit size={16} />
                  </DropdownMenuShortcut>
               </DropdownMenuItem>
               <DropdownMenuSeparator />
               <DropdownMenuItem
                  className="text-red-500!"
                  onClick={() => {
                     setCurrentRow(row.original)
                     setOpen('delete')
                  }}
               >
                  Delete
                  <DropdownMenuShortcut>
                     <Trash size={16} />
                  </DropdownMenuShortcut>
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
      </>
   )
}
