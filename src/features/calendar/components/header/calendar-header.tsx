import { CalendarRange, Columns, Grid2x2, Grid3x3, List, Plus } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

import type { IEvent } from '../../types/interfaces'
import type { TCalendarView } from '../../types/types'

import { AddEventDialog } from '../dialogs/add-event-dialog'
import { DateNavigator } from './date-navigator'
import { TodayButton } from './today-button'
import { UserSelect } from './user-select'

interface IProps {
   view: TCalendarView
   events: IEvent[]
}

export function CalendarHeader({ view, events }: IProps) {
   return (
      <div className="flex flex-col gap-4 border-b p-4 lg:flex-row lg:items-center lg:justify-between">
         <div className="flex items-center gap-3">
            <TodayButton />
            <DateNavigator events={events} view={view} />
         </div>

         <div className="flex flex-col items-center gap-1.5 sm:flex-row sm:justify-between">
            <div className="flex w-full items-center gap-1.5">
               <div className="inline-flex first:rounded-r-none last:rounded-l-none [&:not(:first-child):not(:last-child)]:rounded-none">
                  <Button aria-label="View by day" asChild className="rounded-r-none [&_svg]:size-5" size="icon" variant={view === 'day' ? 'default' : 'outline'}>
                     <Link href="/dashboard/calendar/day-view">
                        <List strokeWidth={1.8} />
                     </Link>
                  </Button>

                  <Button
                     aria-label="View by week"
                     asChild
                     className="-ml-px rounded-none [&_svg]:size-5"
                     size="icon"
                     variant={view === 'week' ? 'default' : 'outline'}
                  >
                     <Link href="/dashboard/calendar/week-view">
                        <Columns strokeWidth={1.8} />
                     </Link>
                  </Button>

                  <Button
                     aria-label="View by month"
                     asChild
                     className="-ml-px rounded-none [&_svg]:size-5"
                     size="icon"
                     variant={view === 'month' ? 'default' : 'outline'}
                  >
                     <Link href="/dashboard/calendar/month-view">
                        <Grid2x2 strokeWidth={1.8} />
                     </Link>
                  </Button>

                  <Button
                     aria-label="View by year"
                     asChild
                     className="-ml-px rounded-none [&_svg]:size-5"
                     size="icon"
                     variant={view === 'year' ? 'default' : 'outline'}
                  >
                     <Link href="/dashboard/calendar/year-view">
                        <Grid3x3 strokeWidth={1.8} />
                     </Link>
                  </Button>

                  <Button
                     aria-label="View by agenda"
                     asChild
                     className="-ml-px rounded-l-none [&_svg]:size-5"
                     size="icon"
                     variant={view === 'agenda' ? 'default' : 'outline'}
                  >
                     <Link href="/dashboard/calendar/agenda-view">
                        <CalendarRange strokeWidth={1.8} />
                     </Link>
                  </Button>
               </div>

               <UserSelect />
            </div>

            <AddEventDialog>
               <Button className="w-full sm:w-auto">
                  <Plus />
                  Add Event
               </Button>
            </AddEventDialog>
         </div>
      </div>
   )
}
