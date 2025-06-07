'use server'

import { cookies } from 'next/headers'

import { defaultLocale } from '@/i18n/locale'
import App from '@/types/app'

const COOKIE_NAME = 'NEXT_LOCALE'

export async function getUserLocale() {
   return (
      ((await cookies()).get(COOKIE_NAME)?.value as App.I18n.LangType)
      || defaultLocale
   )
}

export async function setUserLocale(locale: App.I18n.LangType) {
   (await cookies()).set(COOKIE_NAME, locale)
}
