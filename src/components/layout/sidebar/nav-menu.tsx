import { IconX } from '@/components/icon-x';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from '@/components/ui/sidebar';
import App from '@/types/app';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

interface NavMenuProps {
  label?: string;
  items: App.Layout.NavItem[];
}

export function NavMenu({ label, items }: NavMenuProps) {
  const pathname = usePathname();

  const sidebarMenuButtonChildren = React.useCallback(
    (item: App.Layout.NavItem) => {
      const icon = item?.icon ? <IconX icon={item.icon} /> : null;
      return (
        <>
          {icon}
          <div className='flex flex-col'>
            <span>{item.title}</span>
            <span className='text-muted-foreground truncate text-xs max-w-36'>
              {item.description}
            </span>
          </div>
        </>
      );
    },
    []
  );

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          return item?.items && item?.items?.length > 0 ? (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className='group/collapsible'
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={pathname === item.url}
                  >
                    {sidebarMenuButtonChildren(item)}
                    <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={pathname === subItem.url}
                        >
                          <Link href={subItem.url} target={ subItem.external ? '_blank' : ''}>
                            {sidebarMenuButtonChildren(subItem)}
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                isActive={pathname === item.url}
              >
                {item.disabled ? (
                  <span className='text-muted-foreground group hover:text-muted-foreground cursor-not-allowed'>
                    {sidebarMenuButtonChildren(item)}
                  </span>
                ) : (
                  <Link href={item.url} target={ item.external ? '_blank' : ''}>{sidebarMenuButtonChildren(item)}</Link>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
