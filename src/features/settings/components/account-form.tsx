'use client';

import { UserProfile } from '@clerk/nextjs';

export function AccountForm() {

  return (
    <div className='flex w-full flex-col p-4'>
      <UserProfile fallback={<div>Loading...</div>} />
    </div>
  );
}
