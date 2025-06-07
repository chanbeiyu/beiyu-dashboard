import { useMemo } from 'react'

import { formatDate } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import type { IEvent } from '@/types/calendar/interfaces'
import type { TCalendarView } from '@/types/calendar/types'

import { useCalendar } from '../../contexts/calendar-context'
import { getEventsCount, navigateDate, rangeText } from '../../types/helpers'

interface IProps {
   view: TCalendarView
   events: IEvent[]
}

export function DateNavigator({ view, events }: IProps) {
   const { selectedDate, setSelectedDate } = useCalendar()

   const month = formatDate(selectedDate, 'MMMM')
   const year = selectedDate.getFullYear()

   const eventCount = useMemo(() => getEventsCount(events, selectedDate, view), [events, selectedDate, view])

   const handlePrevious = () => setSelectedDate(navigateDate(selectedDate, view, 'previous'))
   const handleNext = () => setSelectedDate(navigateDate(selectedDate, view, 'next'))

   return (
      <div className="space-y-0.5">
         <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">
               {month}
               {' '}
               {year}
            </span>
            <Badge className="px-1.5" variant="outline">
               {eventCount}
               {' '}
               events
            </Badge>
         </div>

         <div className="flex items-center gap-2">
            <Button className="size-6.5 px-0 [&_svg]:size-4.5" onClick={handlePrevious} variant="outline">
               <ChevronLeft />
            </Button>

            <p className="text-sm text-muted-foreground">{rangeText(view, selectedDate)}</p>

            <Button className="size-6.5 px-0 [&_svg]:size-4.5" onClick={handleNext} variant="outline">
               <ChevronRight />
            </Button>
         </div>
      </div>
   )
}
