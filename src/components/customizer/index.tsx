'use client'

import * as React from 'react'

import { Palette } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

import ThemeControlPanel from './theme-control-panel'

export function ThemeCustomizer() {
   return (
      <Sheet>
         <SheetTrigger asChild>
            <Button
               aria-label="Theme customizer"
               data-tour="theme-customizer"
               size="icon"
               variant="ghost"
            >
               <Palette />
               <span className="sr-only">Theme Customizer</span>
            </Button>
         </SheetTrigger>
         <SheetContent
            aria-description="Theme customizer"
            className="h-full w-full gap-0 sm:max-w-[400px] [&>button]:hidden"
         >
            <SheetHeader className="min-h-(--header-height) flex-row items-center justify-betweenpx-6">
               <div>
                  <SheetTitle>Theme Customizer</SheetTitle>
                  <SheetDescription>Customize the theme of the app</SheetDescription>
               </div>
               <SheetClose className="hover:bg-muted flex size-7 cursor-pointer items-center justify-center rounded transition-colors"></SheetClose>
            </SheetHeader>
            <ThemeControlPanel />
         </SheetContent>
      </Sheet>
   )
}
