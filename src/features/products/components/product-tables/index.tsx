'use client'

import { ColumnDef } from '@tanstack/react-table'
import { parseAsInteger, useQueryState } from 'nuqs'

import { DataTable } from '@/components/table/data-table'
import { DataTableToolbar } from '@/components/table/data-table-toolbar'

import { useDataTable } from '@/hooks/use-data-table'
interface ProductTableParams<TData, TValue> {
   data: TData[]
   total: number
   columns: ColumnDef<TData, TValue>[]
}
export function ProductTable<TData, TValue>({
   data,
   total,
   columns,
}: ProductTableParams<TData, TValue>) {
   const [pageSize] = useQueryState('perPage', parseAsInteger.withDefault(10))

   const pageCount = Math.ceil(total / pageSize)

   const { table } = useDataTable({
      data,
      columns,
      pageCount: pageCount,
      shallow: false,
      debounceMs: 500,
   })

   return (
      <DataTable table={table}>
         <DataTableToolbar table={table} />
      </DataTable>
   )
}
