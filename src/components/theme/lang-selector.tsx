'use client';

import { IconX } from '@/components/icon-x';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { langOptions } from '@/i18n/locale';
import { setUserLocale } from '@/server/locale';
import App from '@/types/app';
import { Languages } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useTopLoader } from 'nextjs-toploader';
import * as React from 'react';

export function LangSelector() {
  const currentLocale = useLocale();
  const topLoader = useTopLoader();

  const handleLocaleChange = (locale: string) => {
    topLoader.start();
    setUserLocale(locale as App.I18n.LangType).finally(() => {});
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon'>
          <Languages />
          <span className='sr-only'>Selector language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>Selector language</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={currentLocale}
          onValueChange={handleLocaleChange}
        >
          {Object.values(langOptions).map((locale) => (
            <DropdownMenuRadioItem key={locale.key} value={locale.key}>
              <IconX icon={locale.flag} size={22} />
              {locale.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
