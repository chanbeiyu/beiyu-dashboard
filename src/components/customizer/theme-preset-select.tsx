import { useCallback, useMemo, useState } from 'react'

import { Dices, FileCode } from 'lucide-react'
import { toast } from 'sonner'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'

import { defaultThemeState } from '@/config/theme'
import { useUISettings } from '@/contexts/ui-settings-context'
import { cn } from '@/lib/utils'
import type { ThemePreset, ThemeStyleProps } from '@/types/theme'
import { parseLetterSpacing, parseShadowVariables, themeParseCss } from '@/utils/theme-parse-css'

import CssImportDialog from './css-import-dialog'

type ThemePresetSelectProps = {
   presets: Record<string, ThemePreset>
   currentPreset: string | null
   onPresetChange: (preset: string) => void
}

const ThemePresetSelect = ({
   presets,
   currentPreset,
   onPresetChange,
}: ThemePresetSelectProps) => {
   // States
   const [cssImportOpen, setCssImportOpen] = useState(false)

   // Hooks
   const { settings, updateSettings } = useUISettings()

   const presetNames = useMemo(() => {
      // First get all preset names
      const allPresets = Object.keys(presets)

      // Separate presets with badges and those without
      const presetsWithBadges = allPresets.filter(
         (name) => presets[name]?.meta?.badge,
      )
      const presetsWithoutBadges = allPresets.filter(
         (name) => !presets[name]?.meta?.badge,
      )

      // Sort each group alphabetically
      presetsWithBadges.sort((a, b) =>
         a.localeCompare(b, undefined, { sensitivity: 'base' }),
      )
      presetsWithoutBadges.sort((a, b) =>
         a.localeCompare(b, undefined, { sensitivity: 'base' }),
      )

      // Always keep 'default' as the first item in the list without badges
      return [
         'default',
         ...presetsWithBadges,
         ...presetsWithoutBadges.filter((name) => name !== 'default'),
      ]
   }, [presets])

   const value = presetNames?.find((name) => name === currentPreset)

   // Helper function to get theme color
   const getThemeColor = (themeName: string, color: keyof ThemeStyleProps) => {
      // If it's default theme, use the first preset as default
      const theme
      = themeName === 'default' ? defaultThemeState : presets[themeName]

      return theme?.light?.[color] || theme?.dark?.[color] || '#000000'
   }

   // Helper function to get badge for a theme
   const getThemeBadge = (themeName: string) => {
      if (themeName === 'default') return null

      return presets[themeName]?.meta?.badge || null
   }

   // Randomize the preset
   const randomize = useCallback(() => {
      const random = Math.floor(Math.random() * presetNames.length)

      onPresetChange(presetNames[random])
   }, [onPresetChange, presetNames])

   const handleCssImport = (css: string) => {
      const { lightColors, darkColors } = themeParseCss(css)
      const { lightShadows, darkShadows } = parseShadowVariables(css)
      const letterSpacing = parseLetterSpacing(css)

      // Always preserve both themes and merge with new ones
      const currentLightStyles = settings.theme.styles?.light || {}
      const currentDarkStyles = settings.theme.styles?.dark || {}

      const updatedSettings = {
         ...settings,
         theme: {
            ...settings.theme,
            preset: null, // Reset preset as we're using custom theme
            styles: {
               light: {
                  ...currentLightStyles,
                  ...lightColors,
                  ...lightShadows,
                  'letter-spacing': letterSpacing,
               },
               dark: {
                  ...currentDarkStyles,
                  ...darkColors,
                  ...darkShadows,
               },
            },
         },
      }

      // Update settings and persist to storage
      updateSettings(updatedSettings)

      // Show success message with details
      toast.success('Theme imported successfully', {
         description: 'Both light and dark mode styles have been updated',
         position: 'top-right',
      })
   }

   return (
      <div className="flex flex-col gap-4">
         <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Themes</h3>
            <div className="flex items-center gap-2">
               <Button
                  className="cursor-pointer"
                  onClick={() => setCssImportOpen(true)}
                  size="sm"
                  variant="outline"
               >
                  <FileCode className="size-4" />
                  Import
               </Button>
               <CssImportDialog
                  onImport={handleCssImport}
                  onOpenChange={setCssImportOpen}
                  open={cssImportOpen}
               />
               <Button
                  className="cursor-pointer"
                  onClick={randomize}
                  size="sm"
                  variant="outline"
               >
                  <Dices className="size-4" />
                  Random
               </Button>
            </div>
         </div>
         <Select onValueChange={onPresetChange} value={value || ''}>
            <SelectTrigger className="h-12 w-full cursor-pointer">
               <SelectValue placeholder="Choose Theme" />
            </SelectTrigger>
            <SelectContent>
               <SelectGroup>
                  <SelectLabel>Pre Built Themes</SelectLabel>
                  {presetNames.map((name) => {
                     const badge = getThemeBadge(name)

                     return (
                        <SelectItem
                           className="flex items-center gap-3"
                           key={name}
                           value={name}
                        >
                           {/* Theme Color Grid Icon */}
                           <div className="flex items-center">
                              <div className="bg-background relative size-[26px] rounded border p-1">
                                 <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-[2px]">
                                    <div
                                       className="rounded-[2px]"
                                       style={{
                                          backgroundColor: getThemeColor(name, 'primary'),
                                       }}
                                    />
                                    <div
                                       className="rounded-[2px]"
                                       style={{
                                          backgroundColor: getThemeColor(name, 'destructive'),
                                       }}
                                    />
                                    <div
                                       className="rounded-[2px]"
                                       style={{
                                          backgroundColor: getThemeColor(name, 'secondary'),
                                       }}
                                    />
                                    <div
                                       className="rounded-full"
                                       style={{
                                          backgroundColor: getThemeColor(name, 'accent'),
                                       }}
                                    />
                                 </div>
                              </div>
                           </div>
                           <div className="flex items-center gap-2">
                              <span>
                                 {name
                                    .replace(/-/g, ' ')
                                    .replace(/\b\w/g, (char) => char.toUpperCase())}
                              </span>
                              {badge && (
                                 <Badge
                                    className={cn('rounded-full', {
                                       'bg-destructive/10 text-destructive border-destructive':
                            badge === 'Trending',
                                    })}
                                    variant={badge === 'New' ? 'default' : 'outline'}
                                 >
                                    {badge}
                                 </Badge>
                              )}
                           </div>
                        </SelectItem>
                     )
                  })}
               </SelectGroup>
            </SelectContent>
         </Select>
      </div>
   )
}

export default ThemePresetSelect
