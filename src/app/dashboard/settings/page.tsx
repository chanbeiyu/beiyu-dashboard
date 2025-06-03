import { SettingsSkeleton } from '@/app/dashboard/settings/settings-skeleton';
import { ProfileForm } from '@/features/settings/components/profile-form';
import { delay } from '@/utils/common';
import { Suspense } from 'react';
import { ContentSection } from './components/content-section';

const fetchValues = async () => {
  await delay(2000);
  return {
    username: 'shadcn',
    email: 'm@example.com',
    bio: 'I own a computer.',
    urls: [
      { value: 'https://shadcn.com' },
      { value: 'http://twitter.com/shadcn' }
    ]
  };
};

export default function Page() {
  const profile = fetchValues();
  return (
    <ContentSection
      title='Profile'
      desc='This is how others will see you on the site.'
    >
      <Suspense fallback={<SettingsSkeleton />}>
        <ProfileForm profile={profile} />
      </Suspense>
    </ContentSection>
  );
}
