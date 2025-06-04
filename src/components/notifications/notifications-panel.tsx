import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUser } from '@clerk/nextjs';
import { Dot } from 'lucide-react';
import * as React from 'react';

export const NotificationsPanel = () => {
  const { user } = useUser()
  return (
    <>
      <Tabs defaultValue='all'  className='h-full w-full'>
        <TabsList className='grid grid-cols-3 w-[calc(100%-2)] mx-6'>
          <TabsTrigger value='all' className='cursor-pointer'>
            All
            <Badge variant='outline' className='size-5'>
              43
            </Badge>
          </TabsTrigger>
          <TabsTrigger value='unread' className='cursor-pointer'>
            Unread
            <Badge variant='destructive' className='size-5'>
              10
            </Badge>
          </TabsTrigger>
          <TabsTrigger value='archived' className='cursor-pointer'>
            Archived
            <Badge variant='default' className='size-5'>
              33
            </Badge>
          </TabsTrigger>
        </TabsList>
        <TabsContent value='all' className=''>
          <ScrollArea className='h-[calc(100vh-11rem)]'>
            {Array.from({ length: 10 }, (_, i) => {
              return (
                <div
                  key={i}
                  className='border-b-muted flex min-w-fit justify-between gap-4 border-dashed border-b-1 px-6 py-4'
                >
                  <Avatar>
                    <AvatarImage src={user?.imageUrl} alt={user?.fullName || user?.username ||  ''} />
                    <AvatarFallback>X</AvatarFallback>
                  </Avatar>
                  <div className='flex grow flex-col gap-2 text-sm'>
                    <div className='flex gap-2'>
                      <strong>Deja Brady</strong>
                      sent you a friend request
                    </div>
                    <div className={'text-muted-foreground flex gap-2 text-xs'}>
                      <span>2 小时</span>
                      <span className='dot'></span>
                      <span>Communication</span>
                    </div>
                    <div className='flex gap-4 mt-2'>
                      <Button variant='default' size='sm'>
                        Reply
                      </Button>
                      <Button variant='secondary' size='sm'>
                        Decline
                      </Button>
                    </div>
                  </div>
                  <Dot className='text-primary size-8' />
                </div>
              );
            })}
          </ScrollArea>
        </TabsContent>

        <TabsContent value='unread'>
          <ScrollArea className='h-[calc(100vh-6rem)] w-full'></ScrollArea>
        </TabsContent>

        <TabsContent value='archived'>
          <ScrollArea className='h-[calc(100vh-6rem)] w-full'></ScrollArea>
        </TabsContent>
      </Tabs>
     <span className='p-4'>
       <Button variant='link' className='h-12 hover:bg-accent hover:cursor-pointer w-full font-bold text-foreground hover:no-underline'>
         View all
       </Button>
     </span>
    </>
  );
};
