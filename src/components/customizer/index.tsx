'use client';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { Palette } from 'lucide-react';
import * as React from 'react';
import ThemeControlPanel from './theme-control-panel';

export function ThemeCustomizer() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          aria-label='Theme customizer'
          data-tour='theme-customizer'
        >
          <Palette />
          <span className='sr-only'>Theme Customizer</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        className='h-full w-full gap-0 sm:max-w-[400px] [&>button]:hidden'
        aria-description='Theme customizer'
      >
        <SheetHeader className='min-h-(--header-height) flex-row items-center justify-betweenpx-6'>
          <div>
            <SheetTitle>Theme Customizer</SheetTitle>
            <SheetDescription>Customize the theme of the app</SheetDescription>
          </div>
          <SheetClose className='hover:bg-muted flex size-7 cursor-pointer items-center justify-center rounded transition-colors'></SheetClose>
        </SheetHeader>
        <ThemeControlPanel />
      </SheetContent>
    </Sheet>
  );
}
