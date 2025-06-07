'use client'

import { UsersActionDialog, UsersDeleteDialog, UsersInviteDialog, useUsers } from '@/features/users'

export function UsersDialogs() {
   const { open, setOpen, currentRow, setCurrentRow } = useUsers()
   return (
      <>
         <UsersActionDialog key="user-add" onOpenChange={() => setOpen('add')} open={open === 'add'} />
         <UsersInviteDialog key="user-invite" onOpenChange={() => setOpen('invite')} open={open === 'invite'} />
         {currentRow && (
            <>
               <UsersActionDialog
                  currentRow={currentRow}
                  key={`user-edit-${currentRow.id}`}
                  onOpenChange={() => {
                     setOpen('edit')
                     setTimeout(() => {
                        setCurrentRow(null)
                     }, 500)
                  }}
                  open={open === 'edit'}
               />

               <UsersDeleteDialog
                  currentRow={currentRow}
                  key={`user-delete-${currentRow.id}`}
                  onOpenChange={() => {
                     setOpen('delete')
                     setTimeout(() => {
                        setCurrentRow(null)
                     }, 500)
                  }}
                  open={open === 'delete'}
               />
            </>
         )}
      </>
   )
}
