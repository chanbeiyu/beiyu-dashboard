import React from 'react'

import { Skeleton } from '@/components/ui/skeleton'

export function AppSkeleton() {
   return (
      <div className="flex h-full w-full flex-col space-y-4">
         <div className="my-4 flex items-end justify-between sm:my-0 sm:items-center">
            <div className="flex flex-col gap-4 sm:my-4 sm:flex-row">
               <Skeleton className="h-9 w-40 lg:w-[250px]" />
               <Skeleton className="h-9 w-30" />
            </div>
            <Skeleton className="h-9 w-20" />
         </div>
         <ul className="grid h-full w-full grid-cols-3 gap-4 pt-4 pb-16">
            {Array.from({ length: 9 }).map((_, index) => (
               <li className="rounded-lg border p-4 hover:shadow-md" key={index}>
                  <div className="mb-8 flex items-center justify-between">
                     <Skeleton className="h-14 w-14 rounded-lg" />
                     <Skeleton className="h-10 w-26" />
                  </div>
                  <div className="flex flex-col gap-2">
                     <Skeleton className="h-6 w-1/2" />
                     <Skeleton className="h-4 w-2/3" />
                  </div>
               </li>
            ))}
         </ul>
      </div>
   )
}
