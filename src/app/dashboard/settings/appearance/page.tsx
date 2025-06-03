import { ContentSection } from '@/app/dashboard/settings/components/content-section';
import { AppearanceForm } from '@/features/settings/components/appearance-form';

export default function SettingsAppearance() {
  return (
    <ContentSection
      title='Appearance'
      desc='Customize the appearance of the app. Automatically switch between day and night themes.'
    >
      <AppearanceForm />
    </ContentSection>
  );
}
