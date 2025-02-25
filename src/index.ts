/*
 * @Author: peerless_hero peerless_hero@outlook.com
 * @Date: 2025-02-21 01:44:38
 * @LastEditors: peerless_hero peerless_hero@outlook.com
 * @LastEditTime: 2025-02-22 17:32:36
 * @FilePath: \ai-album\src\index.ts
 * @Description:
 *
 */
import App from '@/App.vue'
import i18n from '@/modules/i18n'
import router from '@/modules/router'
import { createApp } from 'vue'
import 'uno.css'
import '@unocss/reset/tailwind.css'

createApp(App)
  .use(router)
  .use(i18n)
  .mount('#root')
