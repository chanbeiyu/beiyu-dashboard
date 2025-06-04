'use client';
import { NavMenu } from '@/components/layout/sidebar/nav-menu';
import { NavProjects } from '@/components/layout/sidebar/nav-projects';
import { NavSecondary } from '@/components/layout/sidebar/nav-secondary';
import { NavUser } from '@/components/layout/sidebar/nav-user';
import { TenantSwitcher } from '@/components/layout/sidebar/tenant-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail, SidebarSeparator
} from '@/components/ui/sidebar';
import { navManagement, navMisc, navOverview, navSecondary, projects, tenants } from '@/constants/data';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useUser } from '@clerk/nextjs';
import * as React from 'react';

export default function AppSidebar() {
  const { isOpen } = useMediaQuery();
  const { user } = useUser();

  const handleSwitchTenant = (tenantId: string) => {
    console.log('Switching to tenant:', tenantId);
  };

  const activeTenant = tenants[0];

  React.useEffect(() => {
    // Side effects based on sidebar state changes
  }, [isOpen]);

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader>
        <TenantSwitcher
          tenants={tenants}
          defaultTenant={activeTenant}
          onTenantSwitch={handleSwitchTenant}
        />
      </SidebarHeader>
      <SidebarContent className='overflow-x-hidden'>
        <NavMenu label='Overview' items={navOverview} />
        <NavMenu label='Management' items={navManagement} />
        <NavMenu label='Misc' items={navMisc} />
        <SidebarSeparator />
        <NavProjects projects={projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavSecondary items={navSecondary} />
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
