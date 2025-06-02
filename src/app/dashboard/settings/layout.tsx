import SidebarNav from '@/app/dashboard/settings/components/sidebar-nav';
import { SettingsSkeleton } from '@/app/dashboard/settings/settings-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import {
  BellDot,
  CircleUser,
  Contrast,
  SunMoon,
  User,
  UserPen
} from 'lucide-react';
import React, { Suspense } from 'react';

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
        <Suspense fallback={<SettingsSkeleton />}>
          <div className='flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-y-0 lg:space-x-12'>
            <aside className='top-0 lg:sticky lg:w-1/5'>
              <SidebarNav items={sidebarNavItems} />
            </aside>
            <div className='flex w-full overflow-y-hidden p-1'>{children}</div>
          </div>
        </Suspense>
      </div>
    </PageContainer>
  );
}

const sidebarNavItems = [
  {
    title: 'Profile',
    icon: <UserPen size={18} />,
    href: '/dashboard/settings'
  },
  {
    title: 'Account',
    icon: <CircleUser size={18} />,
    href: '/dashboard/settings/account'
  },
  {
    title: 'Appearance',
    icon: <SunMoon size={18} />,
    href: '/dashboard/settings/appearance'
  },
  {
    title: 'Notifications',
    icon: <BellDot size={18} />,
    href: '/dashboard/settings/notifications'
  },
  {
    title: 'Display',
    icon: <Contrast size={18} />,
    href: '/dashboard/settings/display'
  }
];
