/*
 * @Author: peerless_hero peerless_hero@outlook.com
 * @Date: 2025-02-21 02:23:43
 * @LastEditors: peerless_hero peerless_hero@outlook.com
 * @LastEditTime: 2025-02-25 00:48:48
 * @FilePath: \ai-album\src\modules\router.ts
 * @Description:
 *
 */
import type { RouteRecordRaw } from 'vue-router'
import DefaultLayout from '@/components/DefaultLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'

// 使用 webpack context 获取 assets 目录结构
function getAlbumStructure() {
  const context: any = import.meta.webpackContext('../assets', {
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

    structure[dir].push(context(path))
  }

  return structure
}

const albumStructure = getAlbumStructure()

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        name: 'Home',
        path: '',
        component: () => import('@/views/Home.vue'),
        props: { albumStructure },
      },
      ...Object.entries(albumStructure).map(([dir, images]) => ({
        name: dir,
        path: `/${dir}`,
        component: () => import('@/views/Album.vue'),
        props: { images },
      })),
    ],
  },
  {
    name: '404',
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/404.vue'),
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
