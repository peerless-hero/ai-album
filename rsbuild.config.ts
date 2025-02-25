/*
 * @Author: peerless_hero peerless_hero@outlook.com
 * @Date: 2025-02-21 01:44:38
 * @LastEditors: peerless_hero peerless_hero@outlook.com
 * @LastEditTime: 2025-02-25 09:46:12
 * @FilePath: \ai-album\rsbuild.config.ts
 * @Description:
 *
 */
import { defineConfig } from '@rsbuild/core'
import { pluginVue } from '@rsbuild/plugin-vue'
import { pluginYaml } from '@rsbuild/plugin-yaml'
import { UnoCSSRspackPlugin } from '@unocss/webpack/rspack'
import AutoImportPlugin from 'unplugin-auto-import/rspack'

export default defineConfig(() => {
  return {
    html: {
      title: 'AI album',
      favicon: './public/favicon.ico',
    },
    plugins: [
      pluginYaml(),
      pluginVue(),
    ],
    tools: {
      rspack: {
        plugins: [
          AutoImportPlugin({
            imports: ['vue', 'vue-i18n', 'vue-router'],
            dts: './src/types/auto-imports.d.ts',
          }),
          UnoCSSRspackPlugin(),
        ],
      },
    },
  }
})
