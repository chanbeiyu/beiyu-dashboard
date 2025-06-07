import 'server-only'

import { cookies } from 'next/headers'

import { Mode, ModeSettings } from '@/contexts/ui-settings-context'

export const getMode = async (): Promise<Mode> => {
   try {
      const cookieStore = await cookies()
      const settings = cookieStore.get('shadcn-studio-mode')

      if (!settings?.value) return 'light'

      try {
         const parsedSettings = JSON.parse(settings.value) as ModeSettings

         return parsedSettings.mode || 'light'
      }
      catch {
         return 'light'
      }
   }
   catch {
      return 'light'
   }
}

export const getSettingsFromCookie = async (): Promise<ModeSettings> => {
   try {
      const cookieStore = await cookies()
      const settings = cookieStore.get('shadcn-studio-mode')

      if (!settings?.value) {
         return {
            mode: 'light',
         }
      }

      try {
         return JSON.parse(settings.value) as ModeSettings
      }
      catch {
         return {
            mode: 'light',
         }
      }
   }
   catch {
      return {
         mode: 'light',
      }
   }
}
