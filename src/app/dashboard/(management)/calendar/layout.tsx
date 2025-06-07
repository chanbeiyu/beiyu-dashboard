import { Settings } from 'lucide-react'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

import { ChangeBadgeVariantInput } from '@/features/calendar/components/change-badge-variant-input'
import { ChangeVisibleHoursInput } from '@/features/calendar/components/change-visible-hours-input'
import { ChangeWorkingHoursInput } from '@/features/calendar/components/change-working-hours-input'
import { CalendarProvider } from '@/features/calendar/contexts/calendar-context'
import { getEvents, getUsers } from '@/features/calendar/types/requests'

export default async function Layout({ children }: { children: React.ReactNode }) {
   const [events, users] = await Promise.all([getEvents(), getUsers()])

   return (
      <CalendarProvider events={events} users={users}>
         <div className="mx-auto flex max-w-screen-2xl flex-col gap-4 px-8 py-4">
            {children}

            <Accordion collapsible type="single">
               <AccordionItem className="border-none" value="item-1">
                  <AccordionTrigger className="flex-none gap-2 py-0 hover:no-underline">
                     <div className="flex items-center gap-2">
                        <Settings className="size-4" />
                        <p className="text-base font-semibold">Calendar settings</p>
                     </div>
                  </AccordionTrigger>

                  <AccordionContent>
                     <div className="mt-4 flex flex-col gap-6">
                        <ChangeBadgeVariantInput />
                        <ChangeVisibleHoursInput />
                        <ChangeWorkingHoursInput />
                     </div>
                  </AccordionContent>
               </AccordionItem>
            </Accordion>
         </div>
      </CalendarProvider>
   )
}
