import { Skeleton } from '@/components/ui/skeleton';

export function SettingsSkeleton() {
  return (
    <div className='flex items-center space-x-4'>
      <Skeleton className='h-12 w-12' />
      <div className='space-y-2'>
        <Skeleton className='h-8 w-[350px]' />
        <Skeleton className='h-8 w-[300px]' />
      </div>
    </div>
  );
}
