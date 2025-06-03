import App from '@/types/app';

const local: App.I18n.Schema = {
  theme: {
    title: 'UNSEEN',
    description:
      'A camera is not a tool to capture reality, but a mirror to reflect the unseen layers of existence',
    lang: {
      label: 'Language',
      en: 'English',
      'zh-CN': '简体中文',
      'zh-TW': '繁體中文'
    }
  },
  ui: {
    uploadText: 'Select or drag and drop your files here',
    limitText: 'You can upload {type} files (up to {size} each)'
  },
  menu: {
    essential: 'Essential',
    recent: 'Recent',
    shuffle: 'Shuffle',
    nearby: 'Nearby',
    faraway: 'Faraway'
  }
};

export default local;
