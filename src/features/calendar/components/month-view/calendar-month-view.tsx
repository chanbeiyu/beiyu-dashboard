import { useMemo } from 'react'

import type { IEvent } from '../../types/interfaces'

import { useCalendar } from '../../contexts/calendar-context'
import { calculateMonthEventPositions, getCalendarCells } from '../../types/helpers'
import { DayCell } from './day-cell'

interface IProps {
   singleDayEvents: IEvent[]
   multiDayEvents: IEvent[]
}

const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function CalendarMonthView({ singleDayEvents, multiDayEvents }: IProps) {
   const { selectedDate } = useCalendar()

   const allEvents = [...multiDayEvents, ...singleDayEvents]

   const cells = useMemo(() => getCalendarCells(selectedDate), [selectedDate])

   const eventPositions = useMemo(
      () => calculateMonthEventPositions(multiDayEvents, singleDayEvents, selectedDate),
      [multiDayEvents, singleDayEvents, selectedDate],
   )

   return (
      <div>
         <div className="grid grid-cols-7 divide-x">
            {WEEK_DAYS.map((day) => (
               <div className="flex items-center justify-center py-2" key={day}>
                  <span className="text-xs font-medium text-muted-foreground">{day}</span>
               </div>
            ))}
         </div>

         <div className="grid grid-cols-7 overflow-hidden">
            {cells.map((cell) => (
               <DayCell cell={cell} eventPositions={eventPositions} events={allEvents} key={cell.date.toISOString()} />
            ))}
         </div>
      </div>
   )
}
