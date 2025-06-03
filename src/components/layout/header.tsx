import { Breadcrumbs } from '@/components/theme/breadcrumbs';
import { LangSelector } from '@/components/theme/lang-selector';
import { SearchInput } from '@/components/theme/search-input';
import { ThemeSelector } from '@/components/theme/theme-selector';
import { ModeToggle } from '@/components/theme/theme-toggle';
import React from 'react';
import { Separator } from '../ui/separator';
import { SidebarTrigger } from '../ui/sidebar';
import CtaGithub from './cta-github';
import { UserNav } from './user-nav';

export default function Header() {
  return (
    <header className='flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
      <div className='flex items-center gap-2 px-4'>
        <SidebarTrigger className='-ml-1' />
        <Separator orientation='vertical' className='mr-2 h-4' />
        <Breadcrumbs />
      </div>

      <div className='flex items-center gap-2 px-4'>
        <CtaGithub />
        <div className='hidden md:flex'>
          <SearchInput />
        </div>
        <ThemeSelector />
        <ModeToggle />
        <LangSelector />
        <UserNav />
      </div>
    </header>
  );
}
