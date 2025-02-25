/*
 * @Author: peerless_hero peerless_hero@outlook.com
 * @Date: 2025-02-21 02:23:43
 * @LastEditors: peerless_hero peerless_hero@outlook.com
 * @LastEditTime: 2025-02-22 01:16:53
 * @FilePath: \ai-album\src\router.ts
 * @Description:
 *
 */
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

// 使用 webpack context 获取 assets 目录结构
function getAlbumStructure() {
  const context: any = import.meta.webpackContext('./assets', {
    recursive: true,
    regExp: /\.(png|jpe?g|svg|webp)$/i,
    mode: 'sync', // 同步模式确保构建时处理
  })

  const structure: Record<string, string[]> = {}
  const keys: string[] = context.keys()
  for (const path of keys) {
    const [_, dir] = path.split('/')
    if (!structure[dir])
      structure[dir] = []
    structure[dir].push(context(path).default)
  }

  return structure
}

const albumStructure = getAlbumStructure()

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('./views/Home.vue'),
    props: { albums: Object.keys(albumStructure) },
  },
  ...Object.entries(albumStructure).map(([dir, images]) => ({
    path: `/${dir}`,
    component: () => import('./views/Album.vue'),
    props: { images },
  })),
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
