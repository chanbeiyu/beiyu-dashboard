'use client'

import { ConfirmDialog } from '@/components/confirm-dialog'

import { useTasks } from '@/features/tasks'
import { TaskImportDialog } from '@/features/tasks'
import { TaskMutateDrawer } from '@/features/tasks'
import { showSubmittedData } from '@/utils/show-submitted-data'

export function TaskDialogs() {
   const { open, setOpen, currentRow, setCurrentRow } = useTasks()
   return (
      <>
         <TaskMutateDrawer
            key="task-create"
            onOpenChange={() => setOpen('create')}
            open={open === 'create'}
         />

         <TaskImportDialog
            key="tasks-import"
            onOpenChange={() => setOpen('import')}
            open={open === 'import'}
         />

         {currentRow && (
            <>
               <TaskMutateDrawer
                  currentRow={currentRow}
                  key={`task-update-${currentRow.id}`}
                  onOpenChange={() => {
                     setOpen('update')
                     setTimeout(() => {
                        setCurrentRow(null)
                     }, 500)
                  }}
                  open={open === 'update'}
               />

               <ConfirmDialog
                  className="max-w-md"
                  confirmText="Delete"
                  desc={(
                     <>
                        You are about to delete a task with the ID
                        {' '}
                        <strong>{currentRow.id}</strong>
                        .
                        <br />
                        This action cannot be undone.
                     </>
                  )}
                  destructive
                  handleConfirm={() => {
                     setOpen(null)
                     setTimeout(() => {
                        setCurrentRow(null)
                     }, 500)
                     showSubmittedData(
                        currentRow,
                        'The following task has been deleted:',
                     )
                  }}
                  key="task-delete"
                  onOpenChange={() => {
                     setOpen('delete')
                     setTimeout(() => {
                        setCurrentRow(null)
                     }, 500)
                  }}
                  open={open === 'delete'}
                  title={`Delete this task: ${currentRow.id} ?`}
               />
            </>
         )}
      </>
   )
}
