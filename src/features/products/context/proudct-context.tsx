'use client'

import React, { useState } from 'react'

import useDialogState from '@/hooks/use-dialog-state'

import { ProductType } from '../data/schema'

type TasksDialogType = 'create' | 'update' | 'delete' | 'import'

interface TasksContextType {
   open: TasksDialogType | null
   setOpen: (str: TasksDialogType | null) => void
   currentRow: ProductType | null
   setCurrentRow: React.Dispatch<React.SetStateAction<ProductType | null>>
}

const ProudctContext = React.createContext<TasksContextType | null>(null)

interface Props {
   children: React.ReactNode
}

export function ProductsProvider({ children }: Props) {
   const [open, setOpen] = useDialogState<TasksDialogType>(null)
   const [currentRow, setCurrentRow] = useState<ProductType | null>(null)
   return (
      <ProudctContext value={{ open, setOpen, currentRow, setCurrentRow }}>
         {children}
      </ProudctContext>
   )
}

export const useProducts = () => {
   const productsContext = React.useContext(ProudctContext)

   if (!productsContext) {
      throw new Error('useTasks has to be used within <TasksContext>')
   }

   return productsContext
}
