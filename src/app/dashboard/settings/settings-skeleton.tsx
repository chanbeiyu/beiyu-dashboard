import { Skeleton } from '@/components/ui/skeleton';

export function SettingsSkeleton() {
  return (
    <div className='flex h-full w-full items-center space-x-4'>
      <div className='space-y-2'>
        {Array.from({ length: 5 }, (_, i) => {
          return <Skeleton key={i} className='h-12 w-1/3' />;
        })}
      </div>
      <div className='space-y-2'>
        <Skeleton className='h-8 w-[120px]' />
        <Skeleton className='h-4 w-[300px]' />
      </div>
    </div>
  );
}
