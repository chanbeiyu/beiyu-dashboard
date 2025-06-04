import { DisplayFormValues, NotificationsFormValues, ProfileFormValues } from '@/features/settings';
import { delay } from '@/utils/common';

export const fetchSettingProfile = async (delayMs: number = 1000): Promise<ProfileFormValues> => {
  await delay(delayMs);
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

export const fetchSettingNotifications = async (delayMs: number = 1000): Promise<NotificationsFormValues> => {
  await delay(delayMs);
  return {
    type: 'all',
    mobile: true,
    communication_emails: false,
    marketing_emails: false,
    social_emails: true,
    security_emails: true
  };
};

export const fetchSettingDisplay = async (delayMs: number = 1000): Promise<DisplayFormValues> => {
  await delay(delayMs);
  return {
    items: [
      {
        id: 'recents',
        label: 'Recents',
        enabled: true
      },
      {
        id: 'home',
        label: 'Home',
        enabled: true
      },
      {
        id: 'applications',
        label: 'Applications',
        enabled: true
      },
      {
        id: 'desktop',
        label: 'Desktop',
        enabled: true
      },
      {
        id: 'downloads',
        label: 'Downloads',
        enabled: true
      },
      {
        id: 'documents',
        label: 'Documents',
        enabled: true
      }
    ]
  };
};


