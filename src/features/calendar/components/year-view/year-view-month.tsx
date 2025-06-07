import { useMemo } from 'react'

import { format, getDaysInMonth, isSameDay, parseISO, startOfMonth } from 'date-fns'
import { useRouter } from 'next/navigation'

import type { IEvent } from '../../types/interfaces'

import { useCalendar } from '../../contexts/calendar-context'
import { YearViewDayCell } from './year-view-day-cell'

interface IProps {
   month: Date
   events: IEvent[]
}

export function YearViewMonth({ month, events }: IProps) {
   const { push } = useRouter()
   const { setSelectedDate } = useCalendar()

   const monthName = format(month, 'MMMM')

   const daysInMonth = useMemo(() => {
      const totalDays = getDaysInMonth(month)
      const firstDay = startOfMonth(month).getDay()

      const days = Array.from({ length: totalDays }, (_, i) => i + 1)
      const blanks = Array(firstDay).fill(null)

      return [...blanks, ...days]
   }, [month])

   const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

   const handleClick = () => {
      setSelectedDate(new Date(month.getFullYear(), month.getMonth(), 1))
      push('/month-view')
   }

   return (
      <div className="flex flex-col">
         <button
            className="w-full rounded-t-lg border px-3 py-2 text-sm font-semibold hover:bg-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            onClick={handleClick}
            type="button"
         >
            {monthName}
         </button>

         <div className="flex-1 space-y-2 rounded-b-lg border border-t-0 p-3">
            <div className="grid grid-cols-7 gap-x-0.5 text-center">
               {weekDays.map((day, index) => (
                  <div className="text-xs font-medium text-muted-foreground" key={index}>
                     {day}
                  </div>
               ))}
            </div>

            <div className="grid grid-cols-7 gap-x-0.5 gap-y-2">
               {daysInMonth.map((day, index) => {
                  if (day === null) return <div className="h-10" key={`blank-${index}`} />

                  const date = new Date(month.getFullYear(), month.getMonth(), day)
                  const dayEvents = events.filter((event) => isSameDay(parseISO(event.startDate), date) || isSameDay(parseISO(event.endDate), date))

                  return <YearViewDayCell date={date} day={day} events={dayEvents} key={`day-${day}`} />
               })}
            </div>
         </div>
      </div>
   )
}
