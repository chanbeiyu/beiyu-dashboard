import * as React from 'react'

import { useUser } from '@clerk/nextjs'
import { Dot } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const NotificationsPanel = () => {
   const { user } = useUser()
   return (
      <>
         <Tabs className="h-full w-full" defaultValue="all">
            <TabsList className="grid grid-cols-3 w-[calc(100%-2)] mx-6">
               <TabsTrigger className="cursor-pointer" value="all">
                  All
                  <Badge className="size-5" variant="outline">
                     43
                  </Badge>
               </TabsTrigger>
               <TabsTrigger className="cursor-pointer" value="unread">
                  Unread
                  <Badge className="size-5" variant="destructive">
                     10
                  </Badge>
               </TabsTrigger>
               <TabsTrigger className="cursor-pointer" value="archived">
                  Archived
                  <Badge className="size-5" variant="default">
                     33
                  </Badge>
               </TabsTrigger>
            </TabsList>
            <TabsContent className="" value="all">
               <ScrollArea className="h-[calc(100vh-11rem)]">
                  {Array.from({ length: 10 }, (_, i) => {
                     return (
                        <div
                           className="border-b-muted flex min-w-fit justify-between gap-4 border-dashed border-b-1 px-6 py-4"
                           key={i}
                        >
                           <Avatar>
                              <AvatarImage alt={user?.fullName || user?.username || ''} src={user?.imageUrl} />
                              <AvatarFallback>X</AvatarFallback>
                           </Avatar>
                           <div className="flex grow flex-col gap-2 text-sm">
                              <div className="flex gap-2">
                                 <strong>Deja Brady</strong>
                                 sent you a friend request
                              </div>
                              <div className="text-muted-foreground flex gap-2 text-xs">
                                 <span>2 小时</span>
                                 <span className="dot"></span>
                                 <span>Communication</span>
                              </div>
                              <div className="flex gap-4 mt-2">
                                 <Button size="sm" variant="default">
                                    Reply
                                 </Button>
                                 <Button size="sm" variant="secondary">
                                    Decline
                                 </Button>
                              </div>
                           </div>
                           <Dot className="text-primary size-8" />
                        </div>
                     )
                  })}
               </ScrollArea>
            </TabsContent>

            <TabsContent value="unread">
               <ScrollArea className="h-[calc(100vh-6rem)] w-full"></ScrollArea>
            </TabsContent>

            <TabsContent value="archived">
               <ScrollArea className="h-[calc(100vh-6rem)] w-full"></ScrollArea>
            </TabsContent>
         </Tabs>
         <span className="p-4">
            <Button className="h-12 hover:bg-accent hover:cursor-pointer w-full font-bold text-foreground hover:no-underline" variant="link">
               View all
            </Button>
         </span>
      </>
   )
}
