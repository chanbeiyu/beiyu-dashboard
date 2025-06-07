'use client'

import * as React from 'react'

import { Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { useUITheme } from '@/contexts/ui-theme-context'

export function ModeToggle() {
   const { setTheme, theme } = useUITheme()

   const handleThemeToggle = React.useCallback(
      (e?: React.MouseEvent) => {
         const newMode = theme === 'dark' ? 'light' : 'dark'
         const root = document.documentElement

         if (!document.startViewTransition) {
            setTheme(newMode)
            return
         }

         // Set coordinates from the click event
         if (e) {
            root.style.setProperty('--x', `${e.clientX}px`)
            root.style.setProperty('--y', `${e.clientY}px`)
         }

         document.startViewTransition(() => {
            setTheme(newMode)
         })
      },
      [theme, setTheme],
   )

   return (
      <Button
         onClick={handleThemeToggle}
         size="icon"
         variant="ghost"
      >
         {theme === 'dark' ? <Moon /> : <Sun />}
         <span className="sr-only">Toggle theme</span>
      </Button>
   )
}
