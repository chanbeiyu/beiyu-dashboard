import { ProfileForm, fetchSettingProfile } from '@/features/settings';
import { Suspense } from 'react';
import { ContentSection } from './components/content-section';
import { SettingsSkeleton } from './settings-skeleton';

const fetchValues = async () => {
  return fetchSettingProfile();
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
