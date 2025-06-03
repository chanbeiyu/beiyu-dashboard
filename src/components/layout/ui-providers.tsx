'use client';
import {
  Mode,
  ModeSettings,
  UISettingsProvider
} from '@/context/ui-settings-context';
import { UIThemeProvider } from '@/context/ui-theme-context';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import React, { type ReactNode } from 'react';

export default function UIProviders({
  children,
  settingsCookie,
  mode
}: {
  children: ReactNode;
  mode?: Mode;
  settingsCookie?: ModeSettings;
}) {
  return (
    <>
      <UISettingsProvider settingsCookie={settingsCookie} mode={mode}>
        <UIThemeProvider>
          <ClerkProvider
            appearance={{
              baseTheme: mode === 'dark' ? dark : undefined
            }}
          >
            {children}
          </ClerkProvider>
        </UIThemeProvider>
      </UISettingsProvider>
    </>
  );
}
