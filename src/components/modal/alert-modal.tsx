'use client'

import React, { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'

interface AlertModalProps {
   isOpen: boolean
   onCloseAction: () => void
   onConfirmAction: () => void
   loading: boolean
}

export const AlertModal: React.FC<AlertModalProps> = ({
   isOpen,
   onCloseAction,
   onConfirmAction,
   loading,
}) => {
   const [isMounted, setIsMounted] = useState(false)

   useEffect(() => {
      setIsMounted(true)
   }, [])

   if (!isMounted) {
      return null
   }

   return (
      <Modal
         description="This action cannot be undone."
         isOpen={isOpen}
         onClose={onCloseAction}
         title="Are you sure?"
      >
         <div className="flex w-full items-center justify-end space-x-2 pt-6">
            <Button disabled={loading} onClick={onCloseAction} variant="outline">
               Cancel
            </Button>
            <Button disabled={loading} onClick={onConfirmAction} variant="destructive">
               Continue
            </Button>
         </div>
      </Modal>
   )
}
