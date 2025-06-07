import React from 'react'

import type { Table } from '@tanstack/react-table'

import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { ChevronsLeft, ChevronsRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { cn } from '@/lib/utils'

interface DataTablePaginationProps<TData> extends React.ComponentProps<'div'> {
   table: Table<TData>
   pageSizeOptions?: number[]
}

export function DataTablePagination<TData>({
   table,
   pageSizeOptions = [10, 20, 30, 40, 50],
   className,
   ...props
}: DataTablePaginationProps<TData>) {
   return (
      <div
         className={cn(
            'flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto p-1 sm:flex-row sm:gap-8',
            className,
         )}
         {...props}
      >
         <div className="text-muted-foreground flex-1 text-sm whitespace-nowrap">
            {table.getFilteredSelectedRowModel().rows.length > 0
               ? (
                     <>
                        {table.getFilteredSelectedRowModel().rows.length}
                        {' of  '}
                        {table.getFilteredRowModel().rows.length}
                        {' '}
                        row(s) selected.
                     </>
                  )
               : (
                     <>
                        {table.getFilteredRowModel().rows.length}
                        {' '}
                        row(s) total.
                     </>
                  )}
         </div>
         <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
            <div className="flex items-center space-x-2">
               <p className="text-sm font-medium whitespace-nowrap">Rows per page</p>
               <Select
                  onValueChange={(value) => { table.setPageSize(Number(value)) }}
                  value={`${table.getState().pagination.pageSize}`}
               >
                  <SelectTrigger className="h-8 w-[4.5rem] [&[data-size]]:h-8">
                     <SelectValue placeholder={table.getState().pagination.pageSize} />
                  </SelectTrigger>
                  <SelectContent side="top">
                     {pageSizeOptions.map((pageSize) => (
                        <SelectItem key={pageSize} value={`${pageSize}`}>
                           {pageSize}
                        </SelectItem>
                     ))}
                  </SelectContent>
               </Select>
            </div>
            <div className="flex items-center justify-center text-sm font-medium">
               Page
               {' '}
               {table.getState().pagination.pageIndex + 1}
               {' of '}
               {table.getPageCount()}
            </div>
            <div className="flex items-center space-x-2">
               <Button
                  aria-label="Go to first page"
                  className="hidden size-8 lg:flex"
                  disabled={!table.getCanPreviousPage()}
                  onClick={() => table.setPageIndex(0)}
                  size="icon"
                  variant="outline"
               >
                  <ChevronsLeft />
               </Button>
               <Button
                  aria-label="Go to previous page"
                  className="size-8"
                  disabled={!table.getCanPreviousPage()}
                  onClick={() => table.previousPage()}
                  size="icon"
                  variant="outline"
               >
                  <ChevronLeftIcon />
               </Button>
               <Button
                  aria-label="Go to next page"
                  className="size-8"
                  disabled={!table.getCanNextPage()}
                  onClick={() => table.nextPage()}
                  size="icon"
                  variant="outline"
               >
                  <ChevronRightIcon />
               </Button>
               <Button
                  aria-label="Go to last page"
                  className="hidden size-8 lg:flex"
                  disabled={!table.getCanNextPage()}
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  size="icon"
                  variant="outline"
               >
                  <ChevronsRight />
               </Button>
            </div>
         </div>
      </div>
   )
}
