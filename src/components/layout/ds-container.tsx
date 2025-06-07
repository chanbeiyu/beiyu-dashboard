import React from 'react'

import { Heading } from '@/components/ui/heading'
import { ScrollArea } from '@/components/ui/scroll-area'

interface DsContainerProps {
   title?: string
   description?: string
   children: React.ReactNode
   scrollable?: boolean
}

export default function DsContainer({
   title,
   description,
   children,
   scrollable = true,
}: DsContainerProps) {
   return (
      <>
         {scrollable
            ? (
                  <ScrollArea className="h-[calc(100dvh-64px)] w-[calc(100dvw-255px)]">
                     <div className="space-y-4">
                        <div className="flex items-start justify-between">
                           <Heading description={description ?? ''} title={title ?? ''} />
                        </div>
                        <div className="flex flex-1 p-4 md:px-6">{children}</div>
                     </div>
                  </ScrollArea>
               )
            : (
                  <div className="flex flex-1 p-4 md:px-6">{children}</div>
               )}
      </>
   )
}
