'use client'

import React from 'react'

import { EllipsisVertical, Folder, Share, Trash } from 'lucide-react'

import { IconX } from '@/components/icon-x'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar'

import App from '@/types/app'

export function NavProjects({ projects }: { projects: App.Biz.Project[] }) {
   const { isMobile } = useSidebar()

   return (
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
         <SidebarGroupLabel>Projects</SidebarGroupLabel>
         <SidebarMenu>
            {projects.map((item) => (
               <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                     <a href={item.url}>
                        <IconX icon={item.icon} />
                        <span>{item.name}</span>
                     </a>
                  </SidebarMenuButton>
                  <DropdownMenu>
                     <DropdownMenuTrigger asChild>
                        <SidebarMenuAction showOnHover>
                           <EllipsisVertical />
                           <span className="sr-only">More</span>
                        </SidebarMenuAction>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent
                        align={isMobile ? 'end' : 'start'}
                        className="w-48 rounded-lg"
                        side={isMobile ? 'bottom' : 'right'}
                     >
                        <DropdownMenuItem>
                           <Folder className="text-muted-foreground mr-2 h-4 w-4" />
                           <span>View Project</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                           <Share className="text-muted-foreground mr-2 h-4 w-4" />
                           <span>Share Project</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                           <Trash className="text-muted-foreground mr-2 h-4 w-4" />
                           <span>Delete Project</span>
                        </DropdownMenuItem>
                     </DropdownMenuContent>
                  </DropdownMenu>
               </SidebarMenuItem>
            ))}
            <SidebarMenuItem>
               <SidebarMenuButton className="text-sidebar-foreground/70">
                  <EllipsisVertical className="text-sidebar-foreground/70" />
                  <span>More</span>
               </SidebarMenuButton>
            </SidebarMenuItem>
         </SidebarMenu>
      </SidebarGroup>
   )
}
