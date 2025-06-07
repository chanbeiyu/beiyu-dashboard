import type { InputHTMLAttributes } from 'react'
import { useCallback, useEffect, useState } from 'react'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

import { useUISettings } from '@/contexts/ui-settings-context'
import type { ThemePreset, ThemeStyleProps } from '@/types/theme'
import { colorFormatter } from '@/utils/color-converter'

type ColorSwatchProps = {
   label: string
   value: string
   onChange: (value: string) => void
}

type DebouncedInputProps = {
   value: string
   onChange: (value: string) => void
   debounce?: number
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>

const DebouncedInput = ({
   value: initialValue,
   onChange,
   debounce = 300,
   ...props
}: DebouncedInputProps) => {
   // States
   const [value, setValue] = useState(initialValue)

   useEffect(() => {
      setValue(initialValue)
   }, [initialValue])

   useEffect(() => {
      const timeout = setTimeout(() => {
         onChange(value)
      }, debounce)

      return () => clearTimeout(timeout)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [value])

   return (
      <input
         {...props}
         onChange={(e) => setValue(e.target.value)}
         type="color"
         value={value}
      />
   )
}

export const ColorSwatch = ({ label, value, onChange }: ColorSwatchProps) => {
   // States
   const [localValue, setLocalValue] = useState(value)

   // Update local value when theme value changes
   useEffect(() => {
      setLocalValue(value)
   }, [value])

   // Convert color to hex for display
   const hexColor = colorFormatter(localValue, 'hex')

   return (
      <div className="flex flex-col gap-2">
         <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{label}</span>
            <span className="text-muted-foreground font-mono text-xs">
               {hexColor}
            </span>
         </div>
         <div className="flex items-center gap-2">
            <div
               className="relative flex size-9.5 cursor-pointer items-center justify-center overflow-hidden rounded border"
               style={{ backgroundColor: localValue }}
            >
               <DebouncedInput
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  id={`color-${label.replace(/\s+/g, '-').toLowerCase()}`}
                  onChange={(localValue) => {
                     setLocalValue(localValue)
                     onChange(localValue)
                  }}
                  value={localValue}
               />
            </div>
            <input
               className="flex-1 rounded-md border px-3 py-2 text-sm"
               onChange={(e) => {
                  setLocalValue(e.target.value)
                  onChange(e.target.value)
               }}
               type="text"
               value={localValue}
            />
         </div>
      </div>
   )
}

const ThemeColorPanel = () => {
   // Hooks
   const { settings, updateSettings } = useUISettings()

   const currentTheme = settings.theme.styles?.[
      settings.mode === 'system' ? 'light' : settings.mode
   ] as Partial<ThemeStyleProps> | undefined

   const updateColor = useCallback(
      (key: keyof ThemeStyleProps, value: string) => {
         if (!currentTheme) return

         // apply common styles to both light and dark modes
         if (
            key === 'font-sans'
            || key === 'font-serif'
            || key === 'font-mono'
            || key === 'radius'
         ) {
            updateSettings({
               theme: {
                  ...settings.theme,
                  styles: {
                     ...settings.theme.styles,
                     light: { ...settings.theme.styles?.light, [key]: value },
                     dark: { ...settings.theme.styles?.dark, [key]: value },
                  },
               },
            })

            return
         }

         updateSettings({
            theme: {
               ...settings.theme,
               styles: {
                  ...settings.theme.styles,
                  [settings.mode]: {
                     ...settings.theme.styles?.[settings.mode as keyof ThemePreset],
                     [key]: value,
                  },
               },
            },
         })
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [currentTheme, settings.theme.styles],
   )

   return (
      <div className="space-y-6">
         <Accordion
            className="w-full space-y-4"
            defaultValue={['brand']}
            type="multiple"
         >
            {/* Brand Colors */}
            <AccordionItem className="rounded-lg border px-4" value="brand">
               <AccordionTrigger className="cursor-pointer py-3">
                  Brand Colors
               </AccordionTrigger>
               <AccordionContent className="space-y-3 pt-2 pb-4">
                  <ColorSwatch
                     label="Primary"
                     onChange={(value) => updateColor('primary', value)}
                     value={currentTheme?.primary || ''}
                  />
                  <ColorSwatch
                     label="Primary Foreground"
                     onChange={(value) => updateColor('primary-foreground', value)}
                     value={currentTheme?.['primary-foreground'] || ''}
                  />
                  <ColorSwatch
                     label="Secondary"
                     onChange={(value) => updateColor('secondary', value)}
                     value={currentTheme?.secondary || ''}
                  />
                  <ColorSwatch
                     label="Secondary Foreground"
                     onChange={(value) => updateColor('secondary-foreground', value)}
                     value={currentTheme?.['secondary-foreground'] || ''}
                  />
                  <ColorSwatch
                     label="Destructive"
                     onChange={(value) => updateColor('destructive', value)}
                     value={currentTheme?.destructive || ''}
                  />
               </AccordionContent>
            </AccordionItem>

            {/* Base Colors */}
            <AccordionItem className="rounded-lg border px-4" value="base">
               <AccordionTrigger className="cursor-pointer py-3">
                  Base Colors
               </AccordionTrigger>
               <AccordionContent className="space-y-3 pt-2 pb-4">
                  <ColorSwatch
                     label="Background"
                     onChange={(value) => updateColor('background', value)}
                     value={currentTheme?.background || ''}
                  />
                  <ColorSwatch
                     label="Foreground"
                     onChange={(value) => updateColor('foreground', value)}
                     value={currentTheme?.foreground || ''}
                  />
                  <ColorSwatch
                     label="Card"
                     onChange={(value) => updateColor('card', value)}
                     value={currentTheme?.card || ''}
                  />
                  <ColorSwatch
                     label="Card Foreground"
                     onChange={(value) => updateColor('card-foreground', value)}
                     value={currentTheme?.['card-foreground'] || ''}
                  />
                  <ColorSwatch
                     label="Popover"
                     onChange={(value) => updateColor('popover', value)}
                     value={currentTheme?.popover || ''}
                  />
                  <ColorSwatch
                     label="Popover Foreground"
                     onChange={(value) => updateColor('popover-foreground', value)}
                     value={currentTheme?.['popover-foreground'] || ''}
                  />
               </AccordionContent>
            </AccordionItem>

            {/* Other Colors */}
            <AccordionItem className="rounded-lg !border px-4" value="other">
               <AccordionTrigger className="cursor-pointer py-3">
                  Other Colors
               </AccordionTrigger>
               <AccordionContent className="space-y-3 pt-2 pb-4">
                  <ColorSwatch
                     label="Muted"
                     onChange={(value) => updateColor('muted', value)}
                     value={currentTheme?.muted || ''}
                  />
                  <ColorSwatch
                     label="Muted Foreground"
                     onChange={(value) => updateColor('muted-foreground', value)}
                     value={currentTheme?.['muted-foreground'] || ''}
                  />
                  <ColorSwatch
                     label="Accent"
                     onChange={(value) => updateColor('accent', value)}
                     value={currentTheme?.accent || ''}
                  />
                  <ColorSwatch
                     label="Accent Foreground"
                     onChange={(value) => updateColor('accent-foreground', value)}
                     value={currentTheme?.['accent-foreground'] || ''}
                  />
                  <ColorSwatch
                     label="Border"
                     onChange={(value) => updateColor('border', value)}
                     value={currentTheme?.border || ''}
                  />
                  <ColorSwatch
                     label="Input"
                     onChange={(value) => updateColor('input', value)}
                     value={currentTheme?.input || ''}
                  />
                  <ColorSwatch
                     label="Ring"
                     onChange={(value) => updateColor('ring', value)}
                     value={currentTheme?.ring || ''}
                  />
               </AccordionContent>
            </AccordionItem>

            {/* Sidebar Colors */}
            <AccordionItem className="rounded-lg !border px-4" value="sidebar">
               <AccordionTrigger className="cursor-pointer py-3">
                  Sidebar Colors
               </AccordionTrigger>
               <AccordionContent className="space-y-3 pt-2 pb-4">
                  <ColorSwatch
                     label="Sidebar"
                     onChange={(value) => updateColor('sidebar', value)}
                     value={currentTheme?.sidebar || ''}
                  />
                  <ColorSwatch
                     label="Sidebar Foreground"
                     onChange={(value) => updateColor('sidebar-foreground', value)}
                     value={currentTheme?.['sidebar-foreground'] || ''}
                  />
                  <ColorSwatch
                     label="Sidebar Primary"
                     onChange={(value) => updateColor('sidebar-primary', value)}
                     value={currentTheme?.['sidebar-primary'] || ''}
                  />
                  <ColorSwatch
                     label="Sidebar Primary Foreground"
                     onChange={(value) =>
                        updateColor('sidebar-primary-foreground', value)}
                     value={currentTheme?.['sidebar-primary-foreground'] || ''}
                  />
                  <ColorSwatch
                     label="Sidebar Accent"
                     onChange={(value) => updateColor('sidebar-accent', value)}
                     value={currentTheme?.['sidebar-accent'] || ''}
                  />
                  <ColorSwatch
                     label="Sidebar Accent Foreground"
                     onChange={(value) =>
                        updateColor('sidebar-accent-foreground', value)}
                     value={currentTheme?.['sidebar-accent-foreground'] || ''}
                  />
                  <ColorSwatch
                     label="Sidebar Border"
                     onChange={(value) => updateColor('sidebar-border', value)}
                     value={currentTheme?.['sidebar-border'] || ''}
                  />
                  <ColorSwatch
                     label="Sidebar Ring"
                     onChange={(value) => updateColor('sidebar-ring', value)}
                     value={currentTheme?.['sidebar-ring'] || ''}
                  />
               </AccordionContent>
            </AccordionItem>

            {/* Chart Colors */}
            <AccordionItem className="rounded-lg !border px-4" value="chart">
               <AccordionTrigger className="cursor-pointer py-3">
                  Chart Colors
               </AccordionTrigger>
               <AccordionContent className="space-y-3 pt-2 pb-4">
                  <ColorSwatch
                     label="Chart 1"
                     onChange={(value) => updateColor('chart-1', value)}
                     value={currentTheme?.['chart-1'] || ''}
                  />
                  <ColorSwatch
                     label="Chart 2"
                     onChange={(value) => updateColor('chart-2', value)}
                     value={currentTheme?.['chart-2'] || ''}
                  />
                  <ColorSwatch
                     label="Chart 3"
                     onChange={(value) => updateColor('chart-3', value)}
                     value={currentTheme?.['chart-3'] || ''}
                  />
                  <ColorSwatch
                     label="Chart 4"
                     onChange={(value) => updateColor('chart-4', value)}
                     value={currentTheme?.['chart-4'] || ''}
                  />
                  <ColorSwatch
                     label="Chart 5"
                     onChange={(value) => updateColor('chart-5', value)}
                     value={currentTheme?.['chart-5'] || ''}
                  />
               </AccordionContent>
            </AccordionItem>
         </Accordion>
      </div>
   )
}

export default ThemeColorPanel
