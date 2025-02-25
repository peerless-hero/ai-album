/*
 * @Author: peerless_hero peerless_hero@outlook.com
 * @Date: 2024-04-10 10:15:59
 * @LastEditors: peerless_hero peerless_hero@outlook.com
 * @LastEditTime: 2025-02-22 15:49:55
 * @FilePath: \ai-album\uno.config.ts
 * @Description: unocss配置文件
 */
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-700 text-white cursor-pointer !outline-none hover:bg-teal-800 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
  ],
  presets: [
    presetWind3 (),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
  ],
  transformers: [
    transformerVariantGroup(),
    transformerDirectives({ enforce: 'pre' }),
  ],
  safelist: 'prose m-auto text-left'.split(' '),
  rules: [
    ['color-theme', { color: '#162F7C' }],
    ['bg-primary', { 'background-color': '#165dff', '--un-bg-opacity': 1 }],
  ],
})
