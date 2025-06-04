import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { columns } from '@/features/users/components/users-columns';
import { UsersDialogs } from '@/features/users/components/users-dialogs';
import { UsersPrimaryButtons } from '@/features/users/components/users-primary-buttons';
import { UsersTable } from '@/features/users/components/users-table';
import UsersProvider from '@/features/users/context/users-context';
import { userListSchema } from '@/features/users/data/schema';
import { fetchUsers } from '@/features/users/data/data';
import { Suspense } from 'react';

export default function Page() {
  // Parse user list
  const userList = userListSchema.parse(fetchUsers);

  return (
    <UsersProvider>
      <PageContainer scrollable={false}>
        <div className='flex flex-1 flex-col space-y-4'>
          <div className='flex items-start justify-between'>
            <Heading
              title='User List'
              description='Manage your users and their roles here.'
            />
            <UsersPrimaryButtons />
          </div>
          <Separator />
          <Suspense
            // key={key}
            fallback={
              <DataTableSkeleton columnCount={5} rowCount={8} filterCount={2} />
            }
          >
            <UsersTable data={userList} columns={columns} />
          </Suspense>
        </div>
      </PageContainer>
      <UsersDialogs />
    </UsersProvider>
  );
}
