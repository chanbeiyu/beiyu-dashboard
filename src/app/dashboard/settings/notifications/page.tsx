import { NotificationsForm } from '@/features/settings/components/notifications-form';
import { ContentSection } from '../components/content-section';

export default function SettingsNotifications() {
  return (
    <ContentSection
      title='Notifications'
      desc='Configure how you receive notifications.'
    >
      <NotificationsForm />
    </ContentSection>
  );
}
