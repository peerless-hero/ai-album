/*
 * @Author: peerless_hero peerless_hero@outlook.com
 * @Date: 2025-02-22 17:27:02
 * @LastEditors: peerless_hero peerless_hero@outlook.com
 * @LastEditTime: 2025-02-25 10:02:29
 * @FilePath: \ai-album\src\modules\i18n.ts
 * @Description:
 *
 */
import en from '@locales/en.yml'
import jp from '@locales/ja-JP.yml'
import zh_CN from '@locales/zh-CN.yml'
import { createI18n } from 'vue-i18n'

export const supportedLanguages = {
  'en': 'English',
  'zh-CN': '简体中文',
  'ja-JP': '日本語',
}

export const i18n = createI18n({
  legacy: false,
  locale: navigator.language,
  fallbackLocale: 'en',
  messages: {
    'en': en,
    'zh-CN': zh_CN,
    'ja-JP': jp,
  },
  globalInjection: true,
})

export default i18n
