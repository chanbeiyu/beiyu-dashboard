'use client'

import { useState } from 'react'

import { AlertTriangle } from 'lucide-react'

import { ConfirmDialog } from '@/components/confirm-dialog'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { UserType } from '@/features/users'
import { showSubmittedData } from '@/utils/show-submitted-data'

interface Props {
   open: boolean
   onOpenChange: (open: boolean) => void
   currentRow: UserType
}

export function UsersDeleteDialog({ open, onOpenChange, currentRow }: Props) {
   const [value, setValue] = useState('')

   const handleDelete = () => {
      if (value.trim() !== currentRow.username) return

      onOpenChange(false)
      showSubmittedData(currentRow, 'The following user has been deleted:')
   }

   return (
      <ConfirmDialog
         confirmText="Delete"
         desc={(
            <div className="space-y-4">
               <p className="mb-2">
                  Are you sure you want to delete
                  {' '}
                  <span className="font-bold">{currentRow.username}</span>
                  ?
                  <br />
                  This action will permanently remove the user with the role of
                  {' '}
                  <span className="font-bold">
                     {currentRow.role.toUpperCase()}
                  </span>
                  {' '}
                  from the system. This cannot be undone.
               </p>

               <Label className="my-2">
                  Username:
                  <Input
                     onChange={(e) => setValue(e.target.value)}
                     placeholder="Enter username to confirm deletion."
                     value={value}
                  />
               </Label>

               <Alert variant="destructive">
                  <AlertTitle>Warning!</AlertTitle>
                  <AlertDescription>
                     Please be carefull, this operation can not be rolled back.
                  </AlertDescription>
               </Alert>
            </div>
         )}
         destructive
         disabled={value.trim() !== currentRow.username}
         handleConfirm={handleDelete}
         onOpenChange={onOpenChange}
         open={open}
         title={(
            <span className="text-destructive">
               <AlertTriangle
                  className="stroke-destructive mr-1 inline-block"
                  size={18}
               />
               {' '}
               Delete User
            </span>
         )}
      />
   )
}
