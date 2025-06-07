import React, { CSSProperties } from 'react'

import { closestCenter, DndContext, DragEndEvent, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Column, ColumnPinningPosition, Table } from '@tanstack/react-table'
import { ChevronFirst, ChevronLast, GripVertical, Settings2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

import { cn } from '@/lib/utils'

interface DataTableColumnVisableProps<TData> {
   table: Table<TData>
}

// 列切换：用于切换列可见性的组件
export function DataTableViewAdvancedOptions<TData>({ table }: DataTableColumnVisableProps<TData>) {
   const DragColumnItem = ({ column }: { column: Column<TData, unknown> }) => {
      const { attributes, isDragging, listeners, setNodeRef, transform } = useSortable({ id: column.id })
      const style: CSSProperties = {
         opacity: isDragging ? 0.8 : 1,
         position: 'relative',
         transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
         transition: 'height transform 1s ease-in-out',
         zIndex: isDragging ? 1 : 0,
      }
      return (
         <div className="hover:bg-muted flex h-10 items-center justify-between gap-2 px-2" ref={setNodeRef} style={style}>
            <DropdownMenuCheckboxItem
               checked={column.getIsVisible()}
               className="grow capitalize"
               disabled={!column.getCanHide()}
               key={column.id}
               onCheckedChange={(value) => column.toggleVisibility(value)}
               onSelect={(event) => event.preventDefault()}
            >
               {column.columnDef.meta?.label || column.id}
            </DropdownMenuCheckboxItem>
            <ToggleGroup
               disabled={!column.getCanPin()}
               onValueChange={(value) => {
                  column.pin((value ?? false) as ColumnPinningPosition)
               }}
               type="single"
               value={column.getIsPinned() === 'left' ? 'left' : column.getIsPinned() === 'right' ? 'right' : ''}
            >
               <ToggleGroupItem aria-label="Ping Left" className={cn('text-muted-foreground/80 h-8')} value="left" variant="outline">
                  <ChevronFirst />
               </ToggleGroupItem>
               <ToggleGroupItem aria-label="Ping Right" className={cn('text-muted-foreground/80 h-8')} value="right" variant="outline">
                  <ChevronLast />
               </ToggleGroupItem>
            </ToggleGroup>
            <GripVertical className="cursor-move stroke-2 opacity-90" size={20} {...attributes} {...listeners} />
         </div>
      )
   }

   // reorder columns after drag & drop
   function handleDragEnd(event: DragEndEvent) {
      const { active, over } = event
      if (active && over && active.id !== over.id) {
         table.setColumnOrder((columnOrder) => {
            const oldIndex = columnOrder.indexOf(active.id as string)
            const newIndex = columnOrder.indexOf(over.id as string)
            return arrayMove(columnOrder, oldIndex, newIndex)
         })
      }
   }

   const sensors = useSensors(useSensor(MouseSensor, {}), useSensor(TouchSensor, {}), useSensor(KeyboardSensor, {}))

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button className="hidden h-8 lg:flex" size="sm" variant="outline">
               <Settings2 />
               {' '}
               列选项
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="end" className="">
            <DndContext collisionDetection={closestCenter} modifiers={[restrictToVerticalAxis]} onDragEnd={handleDragEnd} sensors={sensors}>
               {table.getAllLeafColumns().map((column) => {
                  return (
                     <SortableContext items={table.getState().columnOrder} key={column.id} strategy={verticalListSortingStrategy}>
                        <DragColumnItem column={column} />
                     </SortableContext>
                  )
               })}
            </DndContext>
         </DropdownMenuContent>
      </DropdownMenu>
   )
}
