'use client';

import { useUITheme } from '@/context/ui-theme-context';
import { Moon, Sun } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';

export function ModeToggle() {
  const { setTheme, theme } = useUITheme();

  const handleThemeToggle = React.useCallback(
    (e?: React.MouseEvent) => {
      const newMode = theme === 'dark' ? 'light' : 'dark';
      const root = document.documentElement;

      if (!document.startViewTransition) {
        setTheme(newMode);
        return;
      }

      // Set coordinates from the click event
      if (e) {
        root.style.setProperty('--x', `${e.clientX}px`);
        root.style.setProperty('--y', `${e.clientY}px`);
      }

      document.startViewTransition(() => {
        setTheme(newMode);
      });
    },
    [theme, setTheme]
  );

  return (
    <Button
      variant='ghost'
      size='icon'
      onClick={handleThemeToggle}
    >
      {theme === 'dark' ? <Moon /> : <Sun />}
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
}
