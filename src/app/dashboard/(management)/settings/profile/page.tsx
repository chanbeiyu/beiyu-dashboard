import { fetchSettingProfile, ProfileForm } from '@/features/settings';
import { ContentSection } from '../components/content-section';

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
      <ProfileForm profile={profile} />
    </ContentSection>
  );
}
