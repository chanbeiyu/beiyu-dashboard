'use client';

// React Imports
import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { ThemePreset } from '@/types/theme';
import { defaultThemeState } from '@/config/theme';
import { useObjectCookie } from '@/hooks/use-object-cookie';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { getPresetThemeStyles } from '@/utils/theme-presets';

export type Mode = 'system' | 'light' | 'dark';

export type ThemeType = {
  preset?: string | null;
  styles?: ThemePreset;
};

export type ThemeSettings = {
  theme: ThemeType;
  savedThemes?: Array<{
    name: string;
    styles: ThemePreset;
  }>;
};

export type ModeSettings = {
  mode: Mode;
};

export type Settings = ModeSettings & ThemeSettings;

// SettingsContextProps type
type SettingsContextProps = {
  settings: Settings;
  updateSettings: (settings: Partial<Settings>) => void;
  applyThemePreset: (preset: string) => void;
  resetToDefault: () => void;
  hasStateChanged: () => boolean;
};

type Props = {
  children: ReactNode;
  mode?: Mode;
  settingsCookie?: ModeSettings;
};

// Initial Settings
const initialModeSettings: ModeSettings = {
  mode: 'light'
};

const initialThemeSettings: ThemeSettings = {
  theme: {
    preset: null,
    styles: defaultThemeState
  }
};

// Initial Settings Context
export const UiSettingsContext = createContext<SettingsContextProps | null>(
  null
);

// Settings Provider
export const UISettingsProvider = (props: Props) => {
  // Props
  const { children, mode } = props;

  const updatedInitialModeSettings = {
    ...initialModeSettings,
    mode: mode ?? 'light'
  };

  // Cookies for mode
  const [modeCookie, updateModeCookie] = useObjectCookie<ModeSettings>(
    'shadcn-studio-mode',
    JSON.stringify(props.settingsCookie) !== '{}'
      ? props.settingsCookie
      : updatedInitialModeSettings
  );

  // localStorage for theme settings
  const [themeSettings, setThemeSettings] = useLocalStorage<ThemeSettings>(
    'shadcn-studio-theme',
    initialThemeSettings
  );

  // Combined settings state
  const settings: Settings = {
    ...modeCookie,
    ...themeSettings
  };

  const updateSettings = (newSettings: Partial<Settings>) => {
    // Split updates between mode and theme settings
    if ('mode' in newSettings) {
      const modeUpdate: ModeSettings = {
        mode: newSettings.mode!
      };

      updateModeCookie(modeUpdate);
    }

    // Update theme-related settings
    if ('theme' in newSettings || 'savedThemes' in newSettings) {
      setThemeSettings((prev: ThemeSettings) => ({
        ...prev,
        ...(newSettings.theme && { theme: newSettings.theme }),
        ...(newSettings.savedThemes && { savedThemes: newSettings.savedThemes })
      }));
    }
  };

  const applyThemePreset = (preset: string) => {
    setThemeSettings((prev: ThemeSettings) => ({
      ...prev,
      theme: {
        ...prev.theme,
        preset,
        styles: getPresetThemeStyles(preset)
      }
    }));
  };

  const resetToDefault = () => {
    // Preserve saved themes when resetting
    setThemeSettings((prev: ThemeSettings) => ({
      ...initialThemeSettings,
      savedThemes: prev.savedThemes
    }));
  };

  const hasStateChanged = () => {
    return (
      JSON.stringify(themeSettings.theme.styles) !==
      JSON.stringify(initialThemeSettings.theme.styles)
    );
  };

  return (
    <UiSettingsContext.Provider
      value={{
        settings,
        updateSettings,
        applyThemePreset,
        resetToDefault,
        hasStateChanged
      }}
    >
      {children}
    </UiSettingsContext.Provider>
  );
};

export const useUISettings = () => {
  // Hooks
  const context = useContext(UiSettingsContext);

  if (!context) {
    throw new Error(
      'useSettingsContext must be used within a SettingsProvider'
    );
  }

  return context;
};
