<script setup lang="ts">
import { supportedLanguages } from '~/modules/i18n'

const isLanguageMenuOpen = ref(false)
function toggleLanguageMenu(): void {
  isLanguageMenuOpen.value = !isLanguageMenuOpen.value
}

const isDark = ref(false)

const { locale } = useI18n()
function selectLanguage(code: string): void {
  locale.value = code
}

const isDetailView = ref<boolean>(false)
function toggleDarkMode(): void {
  isDark.value = !isDark.value
}

// 点击其他地方关闭下拉菜单
function closeLanguageMenu(e: MouseEvent): void {
  if (!(e.target as HTMLElement).closest('.relative')) {
    isLanguageMenuOpen.value = false
  }
}

// 添加全局点击事件监听
if (typeof window !== 'undefined') {
  window.addEventListener('click', closeLanguageMenu)
}
</script>

<template>
  <div class="transition-colors duration-300" :class="isDark ? 'dark bg-gray-900' : 'bg-slate-50'">
    <!-- Fixed Header -->
    <header
      class="sticky top-0 z-50 transition-colors duration-300"
      :class="isDark ? 'bg-gray-800' : 'bg-white shadow-sm'"
    >
      <div class="max-w-[2000px] h-16 mx-auto flex items-center justify-between">
        <!-- 左侧标题区域 -->
        <div class="pl-6 flex items-center min-w-0">
          <div
            class="flex items-center gap-2 cursor-pointer"
            @click="isDetailView = !isDetailView"
          >
            <template v-if="$route.name === 'Home'">
              <h1
                class="text-xl font-bold transition-colors duration-300"
                :class="isDark ? 'text-white' : ''"
              >
                {{ $t('navbar.title') }}
              </h1>
            </template>
            <template v-else>
              <button
                class="p-2 rounded-full transition-colors duration-300"
                :class="isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-blue-100 '"
                @click="$router.back"
              >
                <svg
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <h1
                class="text-lg font-medium truncate transition-colors duration-300"
                :class="isDark ? 'text-white' : ''"
              >
                {{ $t(`route.name.${$route.name as string}`) }}
              </h1>
            </template>
          </div>
        </div>

        <!-- 右侧操作区 -->
        <div class="pr-6 flex items-center space-x-2">
          <!-- GitHub Link -->
          <a
            href="https://github.com/peerless-hero/ai-album"
            target="_blank"
            rel="noopener noreferrer"
            class="p-2 rounded-full transition-colors duration-300"
            :class="isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-blue-100'"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <!-- Language Selector -->
          <div class="relative">
            <button
              class="p-2 rounded-full transition-colors duration-300"
              :class="isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-blue-100 '"
              @click="toggleLanguageMenu"
            >
              <svg
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
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>

            <!-- Language Dropdown Menu -->
            <div
              v-show="isLanguageMenuOpen"
              class="absolute right-0 mt-2 w-48 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10 transition-colors duration-300"
              :class="isDark ? 'bg-gray-800' : 'bg-white'"
            >
              <div class="py-1" @click="isLanguageMenuOpen = false">
                <a
                  v-for="(lang, code) in supportedLanguages"
                  :key="code"
                  href="#"
                  class="block px-4 py-2 text-sm transition-colors duration-300"
                  :class="isDark ? 'text-gray-300 hover:bg-gray-700' : ' hover:bg-blue-50'"
                  @click="selectLanguage(code)"
                >
                  {{ lang }}
                </a>
              </div>
            </div>
          </div>

          <!-- Dark Mode Toggle -->
          <button
            class="p-2 rounded-full transition-colors duration-300"
            :class="isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-blue-100 '"
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
    </header>

    <!-- Main Content -->
    <main class="mx-auto overflow-y-auto min-h-[calc(100vh-72px)] px-20px bg-blue-50 dark:bg-gray-900 px-6 custom-scrollbar">
      <router-view />
    </main>
  </div>
</template>

<style>
/* 自定义滚动条样式 */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #6366f1 transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #6366f1;
  border-radius: 3px;
}

.dark .custom-scrollbar {
  scrollbar-color: #818cf8 transparent;
}

.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #818cf8;
}

.backdrop-blur-md {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
</style>
