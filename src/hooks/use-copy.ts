import { useState } from 'react'

import { toast } from 'sonner'

export const useCopy = (duration = 1500, toastMessage?: string) => {
   // States
   const [copied, setCopied] = useState<boolean>(false)

   const copy = async (text: string) => {
      try {
         await navigator.clipboard.writeText(text)
         setCopied(true)
         setTimeout(() => setCopied(false), duration)
         toastMessage
         && toast.success(`${toastMessage} copied to clipboard`, {
            position: 'top-right',
         })

         return true
      }
      catch (err) {
         console.error(`${toastMessage} failed to copy to clipboard`, err)
         toastMessage
         && toast.error(`${toastMessage} failed to copy to clipboard`, {
            position: 'top-right',
         })

         return false
      }
   }

   return { copied, copy }
}
