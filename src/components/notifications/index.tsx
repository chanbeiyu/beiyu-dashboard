'use client'

import * as React from 'react'

import { Bell, CheckCheck, Settings } from 'lucide-react'

import { BadgeMark } from '@/components/badge-mark'
import { NotificationsPanel } from '@/components/notifications/notifications-panel'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

export function Notifications() {
   return (
      <Sheet>
         <SheetTrigger asChild>
            <Button
               aria-label="Notifications"
               size="icon"
               variant="ghost"
            >
               <div className="relative inline-block">
                  <Bell />
                  <span className="sr-only">Notifications</span>
                  <BadgeMark position="top-right">
                     9
                  </BadgeMark>
               </div>
            </Button>
         </SheetTrigger>
         <SheetContent
            aria-description="Theme customizer"
            className="h-full w-full gap-0 sm:max-w-[400px] [&>button]:hidden"
         >
            <SheetHeader className="min-h-(--header-height) flex-row items-center justify-between px-6">
               <div>
                  <SheetTitle>Notifications</SheetTitle>
                  <SheetDescription>
                     {/* Customize the appearance of the app */}
                  </SheetDescription>
               </div>
               <div className="flex gap-2">
                  <Button
                     aria-label="Readily all notifications"
                     size="sm"
                     variant="ghost"
                  >
                     <CheckCheck className="text-primary" />
                  </Button>
                  <Button
                     aria-label="Setting notifications"
                     size="icon"
                     variant="ghost"
                  >
                     <Settings />
                  </Button>
               </div>
            </SheetHeader>
            <NotificationsPanel />
         </SheetContent>
      </Sheet>
   )
}
