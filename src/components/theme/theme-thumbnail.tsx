import { Mode } from '@/context/ui-settings-context';
import { cn } from '@/lib/utils';
import React from 'react';

interface ThemeThumbnailProps extends React.ComponentProps<'div'> {
  mode: Mode;
}

export function ThemeThumbnail({
  mode,
  className,
  ...props
}: ThemeThumbnailProps) {
  return (
    <div
      {...props}
      className={cn(
        'border-muted hover:bg-accent items-center rounded-md border-2 p-1',
        className
      )}
    >
      {mode === 'light' ? (
        <div className='space-y-2 rounded-sm bg-[#ecedef] p-2'>
          <div className='space-y-2 rounded-md bg-white p-2 shadow-xs'>
            <div className='h-2 w-[80px] rounded-lg bg-[#ecedef]' />
            <div className='h-2 w-[100px] rounded-lg bg-[#ecedef]' />
          </div>
          <div className='flex items-center space-x-2 rounded-md bg-white p-2 shadow-xs'>
            <div className='h-4 w-4 rounded-full bg-[#ecedef]' />
            <div className='h-2 w-[100px] rounded-lg bg-[#ecedef]' />
          </div>
          <div className='flex items-center space-x-2 rounded-md bg-white p-2 shadow-xs'>
            <div className='h-4 w-4 rounded-full bg-[#ecedef]' />
            <div className='h-2 w-[100px] rounded-lg bg-[#ecedef]' />
          </div>
        </div>
      ) : (
        <div className='space-y-2 rounded-sm bg-slate-950 p-2'>
          <div className='space-y-2 rounded-md bg-slate-800 p-2 shadow-xs'>
            <div className='h-2 w-[80px] rounded-lg bg-slate-400' />
            <div className='h-2 w-[100px] rounded-lg bg-slate-400' />
          </div>
          <div className='flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-xs'>
            <div className='h-4 w-4 rounded-full bg-slate-400' />
            <div className='h-2 w-[100px] rounded-lg bg-slate-400' />
          </div>
          <div className='flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-xs'>
            <div className='h-4 w-4 rounded-full bg-slate-400' />
            <div className='h-2 w-[100px] rounded-lg bg-slate-400' />
          </div>
        </div>
      )}
    </div>
  );
}
