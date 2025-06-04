import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { apps } from '@/constants/data';
import AppIntegrations from '@/features/apps/app-integrations';
import { AppSkeleton } from '@/features/apps/app-skeleton';
import { cn } from '@/lib/utils';
import { delay } from '@/utils/common';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

const fetchValues = async () => {
  await delay(1000);
  return apps;
};

export default function Apps() {
  const items = fetchValues();

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='App Integrations'
            description="Here's a list of your apps for the integration!"
          />
          <Link
            href='/dashboard/product/new'
            className={cn(buttonVariants(), 'text-xs md:text-sm')}
          >
            <Plus className='mr-2 h-4 w-4' /> Add New
          </Link>
        </div>
        <Separator />
        <Suspense fallback={<AppSkeleton />}>
          <AppIntegrations items={items} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
