import PageContainer from '@/components/layout/page-container'
import { Heading } from '@/components/ui/heading'

import { ClientContainer } from '@/features/calendar/components/client-container'
import type { TCalendarView } from '@/features/calendar/types/types'

export function CalendarViewPage({ view }: { view: TCalendarView }) {
   return (
      <PageContainer>
         <div className="space-y-4">
            <div className="flex items-start justify-between">
               <Heading description="Manage calendar" title="Calendar" />
            </div>
            <ClientContainer view={view} />
         </div>
      </PageContainer>
   )
}
