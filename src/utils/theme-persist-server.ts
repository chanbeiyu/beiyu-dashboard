import 'server-only';

import { Mode, ModeSettings } from '@/context/ui-settings-context';

import { cookies } from 'next/headers';

export const getMode = async (): Promise<Mode> => {
  try {
    const cookieStore = await cookies();
    const settings = cookieStore.get('shadcn-studio-mode');

    if (!settings?.value) return 'light';

    try {
      const parsedSettings = JSON.parse(settings.value) as ModeSettings;

      return parsedSettings.mode || 'light';
    } catch {
      return 'light';
    }
  } catch {
    return 'light';
  }
};

export const getSettingsFromCookie = async (): Promise<ModeSettings> => {
  try {
    const cookieStore = await cookies();
    const settings = cookieStore.get('shadcn-studio-mode');

    if (!settings?.value) {
      return {
        mode: 'light'
      };
    }

    try {
      return JSON.parse(settings.value) as ModeSettings;
    } catch {
      return {
        mode: 'light'
      };
    }
  } catch {
    return {
      mode: 'light'
    };
  }
};
