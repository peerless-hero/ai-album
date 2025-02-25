<!--
 * @Author: peerless_hero peerless_hero@outlook.com
 * @Date: 2025-02-21 02:54:37
 * @LastEditors: peerless_hero peerless_hero@outlook.com
 * @LastEditTime: 2025-02-25 10:04:44
 * @FilePath: \ai-album\src\views\404.vue
 * @Description:
 *
-->
<script setup lang="ts">
const isDark = ref(false)

function toggleDarkMode() {
  isDark.value = !isDark.value
}
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center px-4 transition-colors duration-300"
    :class="isDark ? 'bg-gray-900' : 'bg-slate-50'"
  >
    <div class="text-center">
      <!-- 404 Animation -->
      <div class="relative mb-8">
        <h1
          class="text-[12rem] font-bold transition-colors duration-300"
          :class="isDark ? 'text-gray-800' : 'text-gray-200'"
        >
          404
        </h1>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32">
          <!-- Broken Image Icon -->
          <div class="relative w-full h-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-full h-full animate-float transition-colors duration-300"
              :class="isDark ? 'text-indigo-400' : 'text-indigo-500'"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>
      </div>

      <!-- Error Message -->
      <h2
        class="text-2xl font-semibold mb-4 transition-colors duration-300"
        :class="isDark ? 'text-white' : 'text-gray-800'"
      >
        {{ $t('404.title') }}
      </h2>
      <p
        class="text-lg mb-8 transition-colors duration-300"
        :class="isDark ? 'text-gray-400' : 'text-gray-600'"
      >
        {{ $t('404.desc') }}
      </p>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <RouterLink to="/">
          <button
            class="inline-flex items-center justify-center px-6 py-3 rounded-lg text-white transition-colors duration-300 bg-indigo-500 hover:bg-indigo-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            {{ $t('404.home') }}
          </button>
        </RouterLink>
        <button
          class="inline-flex items-center justify-center px-6 py-3 rounded-lg transition-colors duration-300"
          :class="isDark ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-gray-800 hover:bg-gray-50'"
          @click="$router.back"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
            />
          </svg>
          {{ $t('404.back') }}
        </button>
      </div>

      <!-- Dark Mode Toggle -->
      <button
        class="mt-8 p-2 rounded-full transition-colors duration-300"
        :class="isDark ? 'text-gray-300 hover:bg-gray-800' : 'text-indigo-600 hover:bg-indigo-50'"
        @click="toggleDarkMode"
      >
        <svg
          v-if="!isDark"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<style>
@keyframes float {
  0%, 100% {
    transform: translateY(-10px);
  }
  50% {
    transform: translateY(10px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>
