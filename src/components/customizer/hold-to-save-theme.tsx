import { useState } from 'react'
import type { MouseEvent } from 'react'

import { Hand, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

import { useUISettings } from '@/contexts/ui-settings-context'
import type { ThemePreset, ThemeStyleProps } from '@/types/theme'
import { presets } from '@/utils/theme-presets'

type SaveThemeDialogProps = {
   isOpen: boolean
   onClose: () => void
   onSave: (name: string) => boolean
}

const SaveThemeDialog = ({ isOpen, onClose, onSave }: SaveThemeDialogProps) => {
   // States
   const [name, setName] = useState('')

   const handleSave = () => {
      if (!name.trim()) {
         toast.error('Please enter a theme name', {
            position: 'top-right',
         })

         return
      }

      const saveSuccessful = onSave(name.trim())

      // Only close the dialog and reset the name if save was successful
      if (saveSuccessful) {
         setName('')
         onClose()
      }
   }

   return (
      <Dialog onOpenChange={onClose} open={isOpen}>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Save Theme</DialogTitle>
               <DialogDescription>
                  Give your theme a name to save it for later use.
               </DialogDescription>
            </DialogHeader>
            <Input
               className="mt-4"
               onChange={(e) => setName(e.target.value)}
               onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                     handleSave()
                  }
               }}
               placeholder="Enter theme name"
               value={name}
            />
            <DialogFooter className="mt-6">
               <Button onClick={onClose} variant="outline">
                  Cancel
               </Button>
               <Button onClick={handleSave}>Save Theme</Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}

const HoldToSaveTheme = () => {
   const { settings, updateSettings, hasStateChanged } = useUISettings()
   const [isHolding, setIsHolding] = useState(false)
   const [holdTimeout, setHoldTimeout] = useState<NodeJS.Timeout | null>(null)
   const [isDialogOpen, setIsDialogOpen] = useState(false)

   const handleHoldStart = () => {
      // Check for theme changes first
      if (!hasStateChanged()) {
         toast.info('No theme changes to save. Make some changes first!', {
            position: 'top-right',
         })

         return
      }

      setIsHolding(true)

      const timeout = setTimeout(() => {
         setIsDialogOpen(true)
         setIsHolding(false)
      }, 1000)

      setHoldTimeout(timeout)
   }

   const handleHoldEnd = () => {
      setIsHolding(false)

      if (holdTimeout) {
         clearTimeout(holdTimeout)
      }
   }

   const handleSaveTheme = (name: string): boolean => {
      // Ensure we have styles to save and they're different from default
      if (!settings.theme.styles) {
         toast.error('No theme styles to save', {
            position: 'top-right',
         })

         return false
      }

      if (!hasStateChanged()) {
         toast.error('No changes detected in the theme', {
            position: 'top-right',
         })

         return false
      }

      // Normalize the input name by removing extra spaces and converting to lowercase
      const normalizedInputName = name.trim().toLowerCase().replace(/\s+/g, '-')

      const newTheme = {
         name: name.trim(), // Keep the original name for display
         styles: settings.theme.styles as ThemePreset,
      }

      // Get existing saved themes
      const savedThemes = settings.savedThemes || []

      // Check for duplicate names in saved themes (normalized comparison)
      const savedThemeExists = savedThemes.some(
         (theme) =>
            theme.name.toLowerCase().replace(/\s+/g, '-') === normalizedInputName,
      )

      // Check for duplicate names in presets (normalized comparison)
      const presetExists = Object.keys(presets).some(
         (presetName) =>
            presetName.toLowerCase().replace(/\s+/g, '-') === normalizedInputName,
      )

      // Check if it matches the default theme name
      const isDefault = 'default' === normalizedInputName

      if (savedThemeExists || presetExists || isDefault) {
         toast.error('Theme name already exists in saved themes or presets', {
            position: 'top-right',
         })

         return false
      }

      // Add new theme and update settings
      updateSettings({
         theme: {
            ...settings.theme,
            preset: name.trim(), // Add theme name to preset when saving
         },
         savedThemes: [...savedThemes, newTheme],
      })

      toast.success(`Your theme "${name.trim()}" has been saved.`, {
         position: 'top-right',
      })

      return true
   }

   const handleApplyTheme = (theme: { name: string, styles: ThemePreset }) => {
      updateSettings({
         theme: {
            preset: theme.name, // Set the preset to theme name when applying
            styles: theme.styles,
         },
      })

      toast.success(`Theme "${theme.name}" has been applied.`, {
         position: 'top-right',
      })
   }

   const handleDeleteTheme = (e: MouseEvent, themeName: string) => {
      e.stopPropagation() // Prevent theme application when deleting
      const savedThemes = settings.savedThemes || []
      const updatedThemes = savedThemes.filter(
         (theme) => theme.name !== themeName,
      )

      // If the deleted theme was the current preset, just remove the preset name but keep the styles
      if (settings.theme.preset === themeName) {
         updateSettings({
            theme: {
               ...settings.theme,
               preset: null, // Remove the preset name but keep the styles
            },
            savedThemes: updatedThemes,
         })
      }
      else {
      // Just update the saved themes list
         updateSettings({
            savedThemes: updatedThemes,
         })
      }

      toast.success(`Theme "${themeName}" has been removed.`, {
         position: 'top-right',
      })
   }

   const getThemeColor = (
      theme: { styles: ThemePreset },
      color: keyof ThemeStyleProps,
   ) => {
      return (
         theme.styles?.light?.[color] || theme.styles?.dark?.[color] || '#000000'
      )
   }

   return (
      <>
         <Button
            className={`bg-muted/50 hover:bg-muted/80 relative w-full cursor-pointer gap-2 overflow-hidden ${
               isHolding ? 'bg-primary/10' : ''
            }`}
            onMouseDown={handleHoldStart}
            onMouseLeave={handleHoldEnd}
            onMouseUp={handleHoldEnd}
            onTouchEnd={handleHoldEnd}
            onTouchStart={handleHoldStart}
            variant="outline"
         >
            <Hand className="h-4 w-4" />
            Hold to save theme
            {isHolding && (
               <div
                  className="bg-primary/20 absolute inset-0"
                  style={{
                     animation: 'water-rise 1s linear',
                     clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
                     animationFillMode: 'forwards',
                  }}
               />
            )}
            <style jsx>
               {`
          @keyframes water-rise {
            0% {
              clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%);
            }
            100% {
              clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            }
          }
        `}
            </style>
         </Button>

         {settings.savedThemes && settings.savedThemes.length > 0 && (
            <div className="space-y-3">
               <h3 className="text-muted-foreground text-sm font-medium">
                  My themes
               </h3>
               <div className="grid gap-2">
                  {settings.savedThemes.map((theme) => (
                     <div
                        className="bg-card hover:bg-accent/5 group flex w-full cursor-pointer items-center gap-3 overflow-hidden rounded-lg border px-2 py-1 transition-colors sm:max-w-[22rem]"
                        key={theme.name}
                        onClick={() => handleApplyTheme(theme)}
                     >
                        {/* Theme Color Grid Icon */}
                        <div className="flex items-center">
                           <div className="bg-background relative size-[26px] rounded border p-1">
                              <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-[2px]">
                                 <div
                                    className="rounded-[2px]"
                                    style={{
                                       backgroundColor: getThemeColor(theme, 'primary'),
                                    }}
                                 />
                                 <div
                                    className="rounded-[2px]"
                                    style={{
                                       backgroundColor: getThemeColor(theme, 'destructive'),
                                    }}
                                 />
                                 <div
                                    className="rounded-[2px]"
                                    style={{
                                       backgroundColor: getThemeColor(theme, 'secondary'),
                                    }}
                                 />
                                 <div
                                    className="rounded-full"
                                    style={{
                                       backgroundColor: getThemeColor(theme, 'accent'),
                                    }}
                                 />
                              </div>
                           </div>
                        </div>
                        <span className="flex-1 truncate text-[13px] font-medium">
                           {theme.name}
                        </span>
                        <Button
                           className="text-muted-foreground/60 hover:text-destructive h-8 w-8"
                           onClick={(e) => handleDeleteTheme(e, theme.name)}
                           size="icon"
                           variant="ghost"
                        >
                           <Trash2 className="h-4 w-4" />
                        </Button>
                     </div>
                  ))}
               </div>
            </div>
         )}

         <SaveThemeDialog
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            onSave={handleSaveTheme}
         />
      </>
   )
}

export default HoldToSaveTheme
