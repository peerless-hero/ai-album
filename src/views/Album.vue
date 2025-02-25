<!--
 * @Author: peerless_hero peerless_hero@outlook.com
 * @Date: 2025-02-22 09:27:24
 * @LastEditors: peerless_hero peerless_hero@outlook.com
 * @LastEditTime: 2025-02-25 09:28:30
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
  <div class="max-w-[2000px] mx-auto py-8">
    <!-- Masonry Grid -->
    <div class="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 gap-4">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="break-inside-avoid mb-4"
        @click="currentIndex = index"
      >
        <div class="relative overflow-hidden rounded-lg shadow-lg bg-white cursor-pointer transform transition-transform duration-300 hover:scale-105">
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
