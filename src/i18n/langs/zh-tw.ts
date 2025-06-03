import App from '@/types/app';

const local: App.I18n.Schema = {
  theme: {
    title: 'UNSEEN',
    description: '相機非攫取現實之器，而是映照存在暗湧之鏡',
    lang: {
      label: '語言',
      en: 'English',
      'zh-CN': '简体中文',
      'zh-TW': '繁體中文'
    }
  },
  ui: {
    uploadText: '點擊選擇或者拖拽文件到此處上傳',
    limitText: '上傳 {type} 文件 (最大 {size})'
  },
  menu: {
    essential: '精選',
    recent: '最近',
    shuffle: '隨覽',
    nearby: '附近',
    faraway: '遠方'
  }
};

export default local;
