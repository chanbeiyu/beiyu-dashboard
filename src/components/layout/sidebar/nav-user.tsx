'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar';
import { UserAvatarProfile } from '@/components/user-avatar-profile';
import { SignOutButton } from '@clerk/nextjs';
import {
  Bell,
  ChevronsUpDown,
  CircleCheck,
  CreditCard,
  LogOut,
  Sparkles
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

type NavUserItems =
  | {
      id: string;
      name: string;
      url: string;
      type?: 'redirect' | 'push' | 'replace';
      icon?: React.ElementType;
    }
  | {
      id: string;
      name: string;
      clickHandle: (id: string) => void;
      icon?: React.ElementType;
    };

interface NavUserProps {
  user?: {
    avatar?: string;
    fullName?: string | null;
    username?: string | null;
    emailAddresses: Array<{ emailAddress: string }>;
  } | null;
  items?: NavUserItems;
}

export function NavUser({ user, items }: NavUserProps) {
  const { isMobile } = useSidebar();
  const router = useRouter();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              {user && (
                <UserAvatarProfile
                  className='h-8 w-8 rounded-lg'
                  showInfo
                  user={user}
                />
              )}
              <ChevronsUpDown className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
            side={isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={4}
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                {user && (
                  <UserAvatarProfile
                    className='h-8 w-8 rounded-lg'
                    showInfo
                    user={user}
                  />
                )}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles className='mr-2 h-4 w-4' />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => router.push('/dashboard/settings/account')}
              >
                <CircleCheck className='mr-2 h-4 w-4' />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className='mr-2 h-4 w-4' />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className='mr-2 h-4 w-4' />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className='mr-2 h-4 w-4' />
              <SignOutButton redirectUrl='/auth/sign-in' />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
