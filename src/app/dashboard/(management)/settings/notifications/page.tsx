import { fetchSettingNotifications } from '@/features/settings';
import { NotificationsForm } from '@/features/settings/components/notifications-form';
import { ContentSection } from '../components/content-section';

const fetchValues = async () => {
  return fetchSettingNotifications();
};

export default function SettingsNotifications() {
  const notifications = fetchValues();
  return (
    <ContentSection
      title='Notifications'
      desc='Configure how you receive notifications.'
    >
      <NotificationsForm notifications={notifications} />
    </ContentSection>
  );
}
