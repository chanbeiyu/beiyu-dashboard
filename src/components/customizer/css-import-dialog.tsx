import { useState } from 'react'

import { AlertCircle } from 'lucide-react'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'

type CssImportDialogProps = {
   open: boolean
   onOpenChange: (open: boolean) => void
   onImport: (css: string) => void
}

const CssImportDialog = ({
   open,
   onOpenChange,
   onImport,
}: CssImportDialogProps) => {
   // States
   const [cssText, setCssText] = useState('')
   const [error, setError] = useState<string | null>(null)

   const handleImport = () => {
      // Basic validation - check if the CSS contains some expected variables
      if (!cssText.trim()) {
         setError('Please enter CSS content')

         return
      }

      try {
      // Here you would add more sophisticated CSS parsing validation
      // For now we'll just do a simple check
         if (!cssText.includes('--') || !cssText.includes(':')) {
            setError(
               'Invalid CSS format. CSS should contain variable definitions like --primary: #color',
            )

            return
         }

         onImport(cssText)
         setCssText('')
         setError(null)
         onOpenChange(false)
      }
      catch (err) {
         setError('Failed to parse CSS. Please check your syntax.')
      }
   }

   const handleClose = () => {
      setCssText('')
      setError(null)
      onOpenChange(false)
   }

   return (
      <Dialog onOpenChange={onOpenChange} open={open}>
         <DialogContent className="max-h-[90vh] sm:max-w-[600px]">
            <DialogHeader>
               <DialogTitle className="text-foreground">
                  Import Custom CSS
               </DialogTitle>
               <DialogDescription>
                  Paste your CSS file below to customize the theme colors. Make sure
                  to include variables like --primary, --background, etc.
               </DialogDescription>
            </DialogHeader>

            {error && (
               <Alert className="mb-4" variant="destructive">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
               </Alert>
            )}

            <div className="grid gap-4 py-4">
               <Textarea
                  className="text-foreground max-h-[500px] min-h-[300px] font-mono text-sm"
                  onChange={(e) => {
                     setCssText(e.target.value)
                     if (error) setError(null)
                  }}
                  placeholder={`:root {
  --background: 0 0% 100%;
  --foreground: oklch(0.52 0.13 144.17);
  --primary: #3e2723;
  /* And more */
}
.dark {
  --background: 222.2 84% 4.9%;
  --foreground: hsl(37.50 36.36% 95.69%);
  --primary: rgb(46, 125, 50);
  /* And more */
}
  `}
                  value={cssText}
               />
            </div>
            <DialogFooter>
               <Button
                  className="text-foreground cursor-pointer"
                  onClick={handleClose}
                  variant="outline"
               >
                  Cancel
               </Button>
               <Button className="cursor-pointer" onClick={handleImport}>
                  Import
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}

export default CssImportDialog
