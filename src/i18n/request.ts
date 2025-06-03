import { getRequestConfig } from 'next-intl/server';

import locales from '@/i18n/locale';
import { getUserLocale } from '@/server/locale';

export default getRequestConfig(async () => {
  const locale = await getUserLocale();
  return {
    locale,
    messages: locales[locale]
  };
});
