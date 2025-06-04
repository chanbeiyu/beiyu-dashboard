import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { settingsNavItems } from '@/constants/data';
import React from 'react';
import SidebarNav from './components/sidebar-nav';

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='Settings'
            description='Manage your account settings and set e-mail preferences.'
          />
        </div>
        <Separator />
        <div className='flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <aside className='top-0 lg:sticky lg:w-1/5'>
            <SidebarNav items={settingsNavItems} />
          </aside>
          <div className='flex w-full overflow-y-hidden p-1'>{children}</div>
        </div>
      </div>
    </PageContainer>
  );
}
