import { Suspense } from 'react'

import { SearchParams } from 'nuqs/server'

import PageContainer from '@/components/layout/page-container'
import { DataTableSkeleton } from '@/components/table/data-table-skeleton'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'

import { UserListing, UsersDialogs, userSearch, UsersPrimaryButtons, UsersProvider } from '@/features/users'

export const metadata = {
   title: 'Dashboard: Users',
}

type pageProps = {
   searchParams: Promise<SearchParams>
}

export default async function Page(props: pageProps) {
   const searchParams = await props.searchParams
   // Allow nested RSCs to access the search params (in a type-safe way)
   userSearch.parse(searchParams)

   // This key is used for invoke suspense if any of the search params changed (used for filters).
   // const key = serialize({ ...searchParams });

   return (
      <UsersProvider>
         <PageContainer scrollable={false}>
            <div className="flex flex-1 flex-col space-y-4">
               <div className="flex items-start justify-between">
                  <Heading
                     description="Manage your users and their roles here."
                     title="User List"
                  />
                  <UsersPrimaryButtons />
               </div>
               <Separator />
               <Suspense fallback={<DataTableSkeleton columnCount={5} filterCount={2} rowCount={8} />}>
                  <UserListing />
               </Suspense>
            </div>
         </PageContainer>
         <UsersDialogs />
      </UsersProvider>
   )
}
