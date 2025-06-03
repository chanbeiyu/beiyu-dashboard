'use client';

import { IconX } from '@/components/icon-x';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import App from '@/types/app';
import { ArrowUpAz, ArrowUpZa, SlidersHorizontal } from 'lucide-react';
import React, { use, useState } from 'react';

const appText = new Map<string, string>([
  ['all', 'All Apps'],
  ['connected', 'Connected'],
  ['notConnected', 'Not Connected']
]);

interface AppItemsProps {
  items: Promise<App.Biz.App[]>;
}

export default function AppIntegrations({ items }: AppItemsProps) {
  const [sort, setSort] = useState('ascending');
  const [appType, setAppType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const apps = use(items);

  const filteredApps = apps
    .sort((a, b) =>
      sort === 'ascending'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    )
    .filter((app) =>
      appType === 'connected'
        ? app.connected
        : appType === 'notConnected'
          ? !app.connected
          : true
    )
    .filter((app) => app.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      <div className='my-4 flex items-end justify-between sm:my-0 sm:items-center'>
        <div className='flex flex-col gap-4 sm:my-4 sm:flex-row'>
          <Input
            placeholder='Filter apps...'
            className='h-9 w-40 lg:w-[250px]'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select value={appType} onValueChange={setAppType}>
            <SelectTrigger className='w-36'>
              <SelectValue>{appText.get(appType)}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Apps</SelectItem>
              <SelectItem value='connected'>Connected</SelectItem>
              <SelectItem value='notConnected'>Not Connected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className='w-16'>
            <SelectValue>
              <SlidersHorizontal size={18} />
            </SelectValue>
          </SelectTrigger>
          <SelectContent align='end'>
            <SelectItem value='ascending'>
              <div className='flex items-center gap-4'>
                <ArrowUpAz size={16} />
                <span>Ascending</span>
              </div>
            </SelectItem>
            <SelectItem value='descending'>
              <div className='flex items-center gap-4'>
                <ArrowUpZa size={16} />
                <span>Descending</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ul className='faded-bottom no-scrollbar grid gap-4 overflow-auto pt-4 pb-16 md:grid-cols-2 lg:grid-cols-3'>
        {filteredApps.map((app) => (
          <li key={app.name} className='rounded-lg border p-4 hover:shadow-md'>
            <div className='mb-8 flex items-center justify-between'>
              <div
                className={`bg-muted flex size-10 items-center justify-center rounded-lg p-2`}
              >
                <IconX icon={app.logo} size={18} />
              </div>
              <Button
                variant='outline'
                size='sm'
                className={`${app.connected ? 'border border-blue-300 bg-blue-50 hover:bg-blue-100 dark:border-blue-700 dark:bg-blue-950 dark:hover:bg-blue-900' : ''}`}
              >
                {app.connected ? 'Connected' : 'Connect'}
              </Button>
            </div>
            <div>
              <h2 className='mb-1 font-semibold'>{app.name}</h2>
              <p className='line-clamp-2 text-gray-500'>{app.desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
