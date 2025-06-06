'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function ForbiddenError() {
  const router = useRouter();
  return (
    <div className='h-svh'>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        <h1 className='text-[7rem] leading-tight font-bold'>403</h1>
        <span className='font-medium'>Access Forbidden</span>
        <p className='text-muted-foreground text-center'>
          You don&#39;t have necessary permission <br />
          to view this resource.
        </p>
        <div className='mt-6 flex gap-4'>
          <Button variant='outline' onClick={() => router.back()}>
            Go Back
          </Button>
          <Button onClick={() => router.replace('/')}>Back to Home</Button>
        </div>
      </div>
    </div>
  );
}
