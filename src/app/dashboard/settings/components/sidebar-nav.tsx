'use client';

import { IconX } from '@/components/icon-x';
import { buttonVariants } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import App from '@/types/app';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: App.Layout.NavItem[];
}

export default function SidebarNav({
  className,
  items,
  ...props
}: SidebarNavProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [val, setVal] = useState(pathname ?? '/settings');

  const handleSelect = (e: string) => {
    setVal(e);
    router.push(e);
  };

  return (
    <>
      <div className='p-1 md:hidden'>
        <Select value={val} onValueChange={handleSelect}>
          <SelectTrigger className='h-12 sm:w-48'>
            <SelectValue placeholder='Theme' />
          </SelectTrigger>
          <SelectContent>
            {items.map((item) => (
              <SelectItem key={item.url} value={item.url}>
                <div className='flex items-center gap-x-3 px-2 py-1'>
                  <span>{item.icon && <IconX icon={item.icon} />}</span>
                  <span className='text-md'>{item.title}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <ScrollArea
        type='always'
        className='bg-background hidden w-full min-w-40 px-1 py-2 md:block'
      >
        <nav
          className={cn(
            'flex space-x-2 py-1 lg:flex-col lg:space-y-1 lg:space-x-0',
            className
          )}
          {...props}
        >
          {items.map((item) => (
            <Link
              key={item.url}
              href={item.url}
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                pathname === item.url
                  ? 'bg-muted hover:bg-muted'
                  : 'hover:bg-transparent hover:underline',
                'justify-start'
              )}
            >
              <span className='mr-1'>
                {item.icon && <IconX icon={item.icon} />}
              </span>
              {item.title}
            </Link>
          ))}
        </nav>
      </ScrollArea>
    </>
  );
}
