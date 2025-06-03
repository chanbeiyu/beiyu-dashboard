import { ProfileForm } from '@/features/settings/components/profile-form';
import { ContentSection } from '../components/content-section';

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
