import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Row } from '@tanstack/react-table'
import { Trash } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

import { taskSchema, useTasks } from '@/features/tasks'
import { LABEL_OPTIONS } from '@/features/tasks/components/task-tables/options'

interface DataTableRowActionsProps<TData> {
   row: Row<TData>
}

export function CellActions<TData>({ row }: DataTableRowActionsProps<TData>) {
   const task = taskSchema.parse(row.original)

   const { setOpen, setCurrentRow } = useTasks()

   return (
      <DropdownMenu modal={false}>
         <DropdownMenuTrigger asChild>
            <Button
               className="data-[state=open]:bg-muted flex h-8 w-8 p-0"
               variant="ghost"
            >
               <DotsHorizontalIcon className="h-4 w-4" />
               <span className="sr-only">Open menu</span>
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuItem
               onClick={() => {
                  setCurrentRow(task)
                  setOpen('update')
               }}
            >
               Edit
            </DropdownMenuItem>
            <DropdownMenuItem disabled>Make a copy</DropdownMenuItem>
            <DropdownMenuItem disabled>Favorite</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
               <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
               <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup value={task.label}>
                     {LABEL_OPTIONS.map((label) => (
                        <DropdownMenuRadioItem key={label.value} value={label.value}>
                           {label.label}
                        </DropdownMenuRadioItem>
                     ))}
                  </DropdownMenuRadioGroup>
               </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem
               onClick={() => {
                  setCurrentRow(task)
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
   )
}
