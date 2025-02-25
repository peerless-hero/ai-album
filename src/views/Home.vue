<!--
 * @Author: peerless_hero peerless_hero@outlook.com
 * @Date: 2025-02-25 09:07:35
 * @LastEditors: peerless_hero peerless_hero@outlook.com
 * @LastEditTime: 2025-02-25 10:04:20
 * @FilePath: \ai-album\src\views\Home.vue
 * @Description:
 *
-->
<script setup lang="ts">
defineProps<{
  albumStructure: Record<string, string[]>
}>()
</script>

<template>
  <div class="  mx-auto py-8">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
      <div
        v-for="(photos, albumName) in albumStructure"
        :key="albumName"
        class="group rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 cursor-pointer bg-white shadow-lg"
      >
        <RouterLink
          :key="albumName"
          :to="albumName"
          class="underline decoration-none"
        >
          <div class="relative pb-[75%] overflow-hidden">
            <div class="absolute inset-0">
              <img
                :alt="albumName"
                :src="photos[0]"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              >
            </div>
          </div>
          <div class="p-4">
            <h2 class="text-lg font-semibold text-blue-800 mb-2">
              {{ $t(`route.name.${albumName}`) }}
            </h2>
            <p class="text-blue-400">
              {{ $t('home.photoCount', [photos.length]) }}
            </p>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
