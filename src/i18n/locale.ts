import App from '@/types/app';
import enUS from './langs/en-us';
import zhCN from './langs/zh-cn';
import zhTW from './langs/zh-tw';

import LangOption = App.I18n.LangOption;

const locales: Record<App.I18n.LangType, App.I18n.Schema> = {
  'zh-CN': zhCN,
  'zh-TW': zhTW,
  'en-US': enUS
};

export const langOptions: Record<App.I18n.LangType, LangOption> = {
  'zh-CN': {
    key: 'zh-CN',
    vkey: 'zh-Hans',
    label: '简体中文',
    chart: '简',
    flag: 'flag:cn-4x3'
  },
  'zh-TW': {
    key: 'zh-TW',
    vkey: 'zh-Hant',
    label: '繁體中文',
    chart: '繁',
    flag: 'flag:tw-4x3'
  },
  'en-US': {
    key: 'en-US',
    vkey: 'en',
    label: 'English',
    chart: 'EN',
    flag: 'flag:gb-4x3'
  }
};

export const defaultLocale = 'zh-CN';

export default locales;
