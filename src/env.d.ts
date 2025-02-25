/*
 * @Author: peerless_hero peerless_hero@outlook.com
 * @Date: 2025-02-21 01:44:38
 * @LastEditors: peerless_hero peerless_hero@outlook.com
 * @LastEditTime: 2025-02-25 02:37:27
 * @FilePath: \ai-album\src\env.d.ts
 * @Description:
 *
 */
/// <reference types="@rsbuild/core/types" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}
