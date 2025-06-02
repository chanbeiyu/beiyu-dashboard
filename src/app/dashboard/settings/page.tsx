import ContentSection from '@/app/dashboard/settings/components/content-section';
import { ProfileForm } from '@/app/dashboard/settings/profile/profile-form';

export default function Page() {
  return (
    <ContentSection
      title='Profile'
      desc='This is how others will see you on the site.'
    >
      <ProfileForm />
    </ContentSection>
  );
}
