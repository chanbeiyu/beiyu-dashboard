'use client'
import * as React from 'react'

import { useUser } from '@clerk/nextjs'

import { NavMenu } from '@/components/layout/sidebar/nav-menu'
import { NavProjects } from '@/components/layout/sidebar/nav-projects'
import { NavSecondary } from '@/components/layout/sidebar/nav-secondary'
import { NavUser } from '@/components/layout/sidebar/nav-user'
import { TenantSwitcher } from '@/components/layout/sidebar/tenant-switcher'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail, SidebarSeparator } from '@/components/ui/sidebar'

import { navManagement, navMisc, navOverview, navSecondary, projects, tenants } from '@/constants/data'
import { useMediaQuery } from '@/hooks/use-media-query'

export default function AppSidebar() {
   const { isOpen } = useMediaQuery()
   const { user } = useUser()

   const handleSwitchTenant = (tenantId: string) => {
      console.log('Switching to tenant:', tenantId)
   }

   const activeTenant = tenants[0]

   React.useEffect(() => {
      // Side effects based on sidebar state changes
   }, [isOpen])

   return (
      <Sidebar collapsible="icon">
         <SidebarHeader>
            <TenantSwitcher
               defaultTenant={activeTenant}
               onTenantSwitch={handleSwitchTenant}
               tenants={tenants}
            />
         </SidebarHeader>
         <SidebarContent className="overflow-x-hidden">
            <NavMenu items={navOverview} label="Overview" />
            <NavMenu items={navManagement} label="Management" />
            <NavMenu items={navMisc} label="Misc" />
            <SidebarSeparator />
            <NavProjects projects={projects} />
         </SidebarContent>
         <SidebarFooter>
            <NavSecondary items={navSecondary} />
            <NavUser user={user} />
         </SidebarFooter>
         <SidebarRail />
      </Sidebar>
   )
}
