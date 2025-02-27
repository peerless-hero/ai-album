<!--
 * @Author: peerless_hero peerless_hero@outlook.com
 * @Date: 2025-02-22 09:27:24
 * @LastEditors: peerless_hero peerless_hero@outlook.com
 * @LastEditTime: 2025-02-28 03:12:45
 * @FilePath: \ai-album\src\views\Album.vue
 * @Description:
 *
-->
<script setup lang="ts">
import ImagePreview from '@/components/ImagePreview.vue'

defineProps<{
  images: string[]
}>()

const currentIndex = ref<number | null>(null)
</script>

<template>
  <div class="max-w-[2000px] mx-auto py-8 dark:bg-gray-800">
    <!-- Masonry Grid -->
    <div class="grid shadow-black  sm:grid-cols-2 grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="break-inside-avoid mb-4"
        @click="currentIndex = index"
      >
        <div class="relative overflow-hidden rounded-lg shadow-lg bg-white dark:bg-gray-800 cursor-pointer transform transition-transform duration-300 hover:scale-105">
          <img
            :src="image"
            :alt="`${String($route.name)}-${index + 1}`"
            class="w-full h-auto"
            loading="lazy"
          >
        </div>
      </div>
    </div>
  </div>
  <ImagePreview
    v-model="currentIndex"
    :images="images"
  />
</template>

<style>
.break-inside-avoid {
  break-inside: avoid;
}
</style>
