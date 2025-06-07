import * as React from 'react'

import { IconX } from '@/components/icon-x'
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'

import App from '@/types/app'

interface NavSecondaryProps
   extends React.ComponentPropsWithoutRef<typeof SidebarGroup> {
   items: App.Biz.Secondary[]
}

export function NavSecondary({ items, ...props }: NavSecondaryProps) {
   return (
      <SidebarGroup {...props}>
         <SidebarGroupContent>
            <SidebarMenu>
               {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                     <SidebarMenuButton asChild size="sm">
                        <a href={item.url}>
                           <IconX icon={item.icon} />
                           <span>{item.title}</span>
                        </a>
                     </SidebarMenuButton>
                  </SidebarMenuItem>
               ))}
            </SidebarMenu>
         </SidebarGroupContent>
      </SidebarGroup>
   )
}
