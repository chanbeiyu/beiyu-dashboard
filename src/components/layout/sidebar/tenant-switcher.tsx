'use client';

import { IconX } from '@/components/icon-x';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar';
import App from '@/types/app';
import { ChevronsUpDown, Plus } from 'lucide-react';
import * as React from 'react';

interface TenantSwitcherProps {
  defaultTenant?: App.Biz.Tenant;
  onTenantSwitch?: (tenantId: string) => void;
  tenants: App.Biz.Tenant[];
}

// TODO： DropdownMenuShortcut 快捷键处理

export function TenantSwitcher({
  tenants,
  defaultTenant,
  onTenantSwitch
}: TenantSwitcherProps) {
  const { isMobile } = useSidebar();
  const [activeTenant, setActiveTenant] = React.useState(
    defaultTenant || (tenants.length > 0 ? tenants[0] : undefined)
  );

  const handleTenantSwitch = (tenant: App.Biz.Tenant) => {
    setActiveTenant(tenant);
    if (onTenantSwitch) {
      onTenantSwitch(tenant.id);
    }
  };

  if (!activeTenant) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
                <IconX icon={activeTenant.logo} size={16} />
              </div>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-medium'>
                  {activeTenant.name}
                </span>
                <span className='truncate text-xs'>{activeTenant.plan}</span>
              </div>
              <ChevronsUpDown className='ml-auto' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
            align='start'
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className='text-muted-foreground text-xs'>
              Tenant
            </DropdownMenuLabel>
            {tenants.map((tenant, index) => (
              <DropdownMenuItem
                key={tenant.name}
                disabled={tenant.id === activeTenant.id}
                onClick={() => handleTenantSwitch(tenant)}
                className='gap-2 p-2'
              >
                <div className='flex size-6 items-center justify-center rounded-md border'>
                  <IconX icon={tenant.logo} size={14} className={'shrink-0'} />
                </div>
                {tenant.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className='gap-2 p-2'>
              <div className='flex size-6 items-center justify-center rounded-md border bg-transparent'>
                <Plus className='size-4' />
              </div>
              <div className='text-muted-foreground font-medium'>Add team</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
