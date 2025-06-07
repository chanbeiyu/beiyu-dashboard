'use client'

import React, { type ReactNode } from 'react'

import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

import { Mode, ModeSettings, UISettingsProvider } from '@/contexts/ui-settings-context'
import { UIThemeProvider } from '@/contexts/ui-theme-context'

export default function UIProviders({
   children,
   settingsCookie,
   mode,
}: {
   children: ReactNode
   mode?: Mode
   settingsCookie?: ModeSettings
}) {
   return (
      <>
         <UISettingsProvider mode={mode} settingsCookie={settingsCookie}>
            <UIThemeProvider>
               <ClerkProvider
                  appearance={{
                     baseTheme: mode === 'dark' ? dark : undefined,
                  }}
               >
                  {children}
               </ClerkProvider>
            </UIThemeProvider>
         </UISettingsProvider>
      </>
   )
}
