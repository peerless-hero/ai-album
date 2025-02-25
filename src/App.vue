<!--
 * @Author: peerless_hero peerless_hero@outlook.com
 * @Date: 2025-02-21 01:44:38
 * @LastEditors: peerless_hero peerless_hero@outlook.com
 * @LastEditTime: 2025-02-25 09:45:37
 * @FilePath: \ai-album\src\App.vue
 * @Description: -
 *
-->
<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()

watchEffect(() => {
  const title = t(`navbar.title`)
  if (route.name === 'Home' || route.name === '404') {
    document.title = title
    return
  }
  const name = t(`route.name.${route.name as string}`)
  document.title = `${name} - ${title}`
})
</script>

<template>
  <router-view />
</template>
