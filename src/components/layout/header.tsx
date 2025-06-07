import React from 'react'

import { ThemeCustomizer } from '@/components/customizer'
import { Notifications } from '@/components/notifications'
import { Breadcrumbs } from '@/components/theme/breadcrumbs'
import { LangSelector } from '@/components/theme/lang-selector'
import { SearchInput } from '@/components/theme/search-input'
import { ModeToggle } from '@/components/theme/theme-toggle'

import { Separator } from '../ui/separator'
import { SidebarTrigger } from '../ui/sidebar'
import CtaGithub from './cta-github'
import { UserNav } from './user-nav'

export default function Header() {
   return (
      <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
         <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator className="mr-2 h-4" orientation="vertical" />
            <Breadcrumbs />
         </div>

         <div className="flex items-center gap-2 px-4">
            <div className="hidden md:flex">
               <SearchInput />
            </div>
            <CtaGithub />
            <ModeToggle />
            <Notifications />
            <LangSelector />
            <ThemeCustomizer />
            <UserNav />
         </div>
      </header>
   )
}
