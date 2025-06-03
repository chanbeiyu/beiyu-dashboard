'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Palette, X } from 'lucide-react';
import ThemeControlPanel from './theme-control-panel';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetDescription
} from '@/components/ui/sheet';

export function ThemeCustomizer() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} modal={false}>
      <SheetTrigger asChild onClick={() => setOpen(true)}>
        <Button
          variant='default'
          size='icon'
          aria-label='Theme customizer'
          data-tour='theme-customizer'
        >
          <Palette className='h-4 w-4' />
        </Button>
      </SheetTrigger>
      <SheetContent
        className='h-full w-full gap-0 sm:max-w-[400px] [&>button]:hidden'
        aria-description='Theme customizer'
      >
        <SheetHeader className='min-h-(--header-height) flex-row items-center justify-between border-b border-dashed px-6'>
          <div>
            <SheetTitle>Appearance</SheetTitle>
            <SheetDescription>
              Customize the appearance of the app
            </SheetDescription>
          </div>
          <SheetClose
            className='hover:bg-muted flex size-7 cursor-pointer items-center justify-center rounded transition-colors'
            onClick={() => setOpen(false)}
          >
            <X className='size-4' />
          </SheetClose>
        </SheetHeader>
        <ThemeControlPanel />
      </SheetContent>
    </Sheet>
  );
}
