'use client';

import { NotificationsPanel } from '@/components/notifications/notifications-panel';
import { Button } from '@/components/ui/button';
import { BadgeMark } from '@/components/ui/customer/badge-mark';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { Bell, CheckCheck, Settings } from 'lucide-react';
import * as React from 'react';

export function Notifications() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          aria-label='Notifications'
        >
        <div className="relative inline-block">
            <Bell />
            <span className='sr-only'>Notifications</span>
          <BadgeMark position='top-right'>
            9
          </BadgeMark>
        </div>
        </Button>
      </SheetTrigger>
      <SheetContent
        className='h-full w-full gap-0 sm:max-w-[400px] [&>button]:hidden'
        aria-description='Theme customizer'
      >
        <SheetHeader className='min-h-(--header-height) flex-row items-center justify-between px-6'>
          <div>
            <SheetTitle>Notifications</SheetTitle>
            <SheetDescription>
              {/*Customize the appearance of the app*/}
            </SheetDescription>
          </div>
          <div className='flex gap-2'>
            <Button
              variant='ghost'
              size='sm'
              aria-label='Readily all notifications'
            >
              <CheckCheck className='text-primary' />
            </Button>
            <Button
              variant='ghost'
              size='icon'
              aria-label='Setting notifications'
            >
              <Settings />
            </Button>
          </div>
        </SheetHeader>
        <NotificationsPanel />
      </SheetContent>
    </Sheet>
  );
}
