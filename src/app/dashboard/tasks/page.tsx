import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { delay } from '@/utils/common';
import { Suspense } from 'react';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { TasksDialogs } from './components/tasks-dialogs';
import { TasksPrimaryButtons } from './components/tasks-primary-buttons';
import TasksProvider from './context/tasks-context';
import { tasks } from './data/tasks';

const fetchDataValues = async () => {
  await delay(2000);
  return tasks;
};
const fetchColumnsValues = async () => {
  await delay(2000);
  return columns;
};

export default function Tasks() {
  const data = fetchDataValues();
  const columns = fetchColumnsValues();

  return (
    <TasksProvider>
      <PageContainer scrollable={false}>
        <div className='flex flex-1 flex-col space-y-4'>
          <div className='flex items-start justify-between'>
            <Heading
              title='Tasks'
              description="Here's a list of your tasks for this month!"
            />
            <TasksPrimaryButtons />
          </div>
          <Separator />
          <Suspense
            // key={key}
            fallback={
              <DataTableSkeleton columnCount={5} rowCount={8} filterCount={2} />
            }
          >
            <DataTable dataPromise={data} columnsPromise={columns} />
          </Suspense>
        </div>
      </PageContainer>
      <TasksDialogs />
    </TasksProvider>
  );
}
