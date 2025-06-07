import App from '@/types/app'

const local: App.I18n.Schema = {
   theme: {
      title: 'UNSEEN',
      description: '相机非攫取现实之器，而是映照存在暗涌之镜',
      lang: {
         'label': '语言',
         'en': 'English',
         'zh-CN': '简体中文',
         'zh-TW': '繁體中文',
      },
   },
   ui: {
      uploadText: '点击选择或者拖拽文件到此处上传',
      limitText: '上传 {type} 文件 (最大 {size})',
   },
   menu: {
      essential: '精选',
      recent: '最近',
      shuffle: '随览',
      nearby: '附近',
      faraway: '远方',
   },
}

export default local
