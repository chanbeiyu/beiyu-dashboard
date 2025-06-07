import { useState } from 'react'
import type { ReactNode } from 'react'

import CodeBlock from '@/components/code-block'
import ComponentCli from '@/components/component-cli'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { defaultDarkThemeStyles, defaultLightThemeStyles } from '@/config/theme'
import type { ThemeStyleProps, ThemeStyles } from '@/types/theme'
import type { ColorFormat } from '@/utils/color-converter'
import { presets } from '@/utils/theme-presets'
import { generateThemeCode } from '@/utils/theme-style-generator'

import CopyButton from '../copy-button'

type ThemeVariablesDialogProps = {
   lightTheme?: Partial<ThemeStyleProps>
   darkTheme?: Partial<ThemeStyleProps>
   trigger?: ReactNode
   activeTheme?: string | null
}

const ThemeVariablesDialog = ({
   lightTheme,
   darkTheme,
   trigger,
   activeTheme,
}: ThemeVariablesDialogProps) => {
   // States
   const [colorFormat, setColorFormat] = useState<ColorFormat>('oklch')

   const themeStyles: ThemeStyles = {
      light: { ...defaultLightThemeStyles, ...lightTheme },
      dark: { ...defaultDarkThemeStyles, ...darkTheme },
   }

   const themeCSS = generateThemeCode(themeStyles, colorFormat)

   // Check if the active theme exists in presets
   const isPresetTheme = activeTheme ? activeTheme in presets : false

   return (
      <Dialog>
         <DialogTrigger asChild>{trigger}</DialogTrigger>
         <DialogContent className="sm:max-w-[780px]">
            <DialogHeader>
               <DialogTitle>Theme Variables</DialogTitle>
               <DialogDescription>
                  Copy these CSS variables to use your theme in other projects.
               </DialogDescription>
            </DialogHeader>
            <div className="flex min-w-0 flex-col gap-6">
               {/* Theme Installation Command - Only show for preset themes */}
               {activeTheme && isPresetTheme && (
                  <ComponentCli
                     name={`themes/${activeTheme}`}
                     toast="Installation command"
                  />
               )}

               <div className="relative rounded-md bg-zinc-950 dark:bg-zinc-900">
                  <div className="sticky top-0 w-full p-2">
                     <Select
                        onValueChange={(value: ColorFormat) => setColorFormat(value)}
                        value={colorFormat}
                     >
                        <SelectTrigger className="w-fit cursor-pointer gap-1 border-none bg-white outline-hidden focus:border-none focus:ring-transparent">
                           <SelectValue placeholder="Format" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="oklch">OKLCH</SelectItem>
                           <SelectItem value="hsl">HSL</SelectItem>
                           <SelectItem value="rgb">RGB</SelectItem>
                           <SelectItem value="hex">HEX</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>
                  <CodeBlock code={themeCSS} lang="css" />
                  <CopyButton
                     className="dark"
                     source={themeCSS}
                     toast="Theme variables"
                  />
               </div>
            </div>
         </DialogContent>
      </Dialog>
   )
}

export default ThemeVariablesDialog
