'use client'

import { SignOutButton, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { UserAvatarProfile } from '@/components/user-avatar-profile'

export function UserNav() {
   const { user } = useUser()
   const router = useRouter()

   if (!user) {
      return null
   }

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button className="relative h-8 w-8 rounded-full" variant="ghost">
               <UserAvatarProfile user={user} />
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent
            align="end"
            className="w-56"
            forceMount
            sideOffset={10}
         >
            <DropdownMenuLabel className="font-normal">
               <div className="flex flex-col space-y-1">
                  <p className="text-sm leading-none font-medium">
                     {user.fullName || user.username}
                  </p>
                  <p className="text-muted-foreground text-xs leading-none">
                     {user.emailAddresses[0].emailAddress}
                  </p>
               </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
               <DropdownMenuItem onClick={() => router.push('/dashboard/profile')}>
                  Profile
               </DropdownMenuItem>
               <DropdownMenuItem>Billing</DropdownMenuItem>
               <DropdownMenuItem>Settings</DropdownMenuItem>
               <DropdownMenuItem>New Team</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
               <SignOutButton redirectUrl="/auth/sign-in" />
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   )
}
