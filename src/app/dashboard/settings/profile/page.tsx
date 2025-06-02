import { ProfileForm } from '@/app/dashboard/settings/profile/profile-form';
import ContentSection from '../components/content-section';

export default function SettingsProfile() {
  return (
    <ContentSection
      title='Profile'
      desc='This is how others will see you on the site.'
    >
      <ProfileForm />
    </ContentSection>
  );
}
