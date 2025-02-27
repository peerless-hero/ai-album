<script setup lang="ts">
interface Props {
  modelValue: number | null
  images: string[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: number | null]
}>()

const scale = ref(1)
const rotation = ref(0)
const position = ref({ x: 0, y: 0 })
const isDragging = ref(false)
const dragStart = ref({ x: 0, y: 0 })

const showNavigation = computed(() => props.images && props.images.length > 1)

function isNumber(params: any): params is number {
  return typeof params === 'number'
}
const route = useRoute()

const current = computed(() => {
  if (!isNumber(props.modelValue)) {
    return {
      id: props.modelValue,
    }
  }
  return {
    id: props.modelValue,
    description: `${route.name as string}-${props.modelValue}`,
    url: props.images[props.modelValue],
  }
})

const currentIndex = computed(() => {
  return isNumber(props.modelValue) ? props.modelValue : -1
})

// 关闭预览
function closePreview(): void {
  emit('update:modelValue', null)
  resetImage()
}

// 上一张图片
function prevImage(): void {
  const index = currentIndex.value
  if (index > 0 && props.images) {
    emit('update:modelValue', index - 1)
    resetImage()
  }
  else {
    emit('update:modelValue', props.images.length - 1)
    resetImage()
  }
}

// 下一张图片
function nextImage(): void {
  const index = currentIndex.value
  if (props.images && index < props.images.length - 1) {
    emit('update:modelValue', index + 1)
    resetImage()
  }
  else {
    emit('update:modelValue', 0)
    resetImage()
  }
}

// 处理滚轮缩放
function handleWheel(e: WheelEvent): void {
  e.preventDefault()
  const delta = e.deltaY * -0.001
  adjustScale(delta)
}

// 调整缩放
function adjustScale(delta: number): void {
  const newScale = scale.value + delta
  if (newScale >= 0.1 && newScale <= 3) {
    scale.value = newScale
  }
}

// 调整旋转
function adjustRotation(delta: number): void {
  rotation.value = (rotation.value + delta) % 360
}

// 重置图片状态
function resetImage(): void {
  scale.value = 1
  rotation.value = 0
  position.value = { x: 0, y: 0 }
}

// 开始拖动
function startDrag(e: MouseEvent): void {
  isDragging.value = true
  dragStart.value = {
    x: e.clientX - position.value.x,
    y: e.clientY - position.value.y,
  }
}

// 拖动中
function onDrag(e: MouseEvent): void {
  if (isDragging.value) {
    position.value = {
      x: e.clientX - dragStart.value.x,
      y: e.clientY - dragStart.value.y,
    }
  }
}

// 停止拖动
function stopDrag(): void {
  isDragging.value = false
}

// 键盘事件处理
function handleKeydown(e: KeyboardEvent): void {
  if (!props.modelValue)
    return

  switch (e.key) {
    case 'ArrowLeft':
      prevImage()
      break
    case 'ArrowRight':
      nextImage()
      break
    case 'Escape':
      closePreview()
      break
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div
    v-if="isNumber(modelValue)"
    class="fixed inset-0 bg-black/95 flex items-center justify-center z-50"
    @click.self="closePreview"
    @wheel.prevent="handleWheel"
  >
    <!-- Close Button -->
    <button
      class="absolute top-6 right-6 text-white/75 p-3 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 backdrop-blur-sm bg-black/20"
      title="关闭 (ESC)"
      @click="closePreview"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <!-- Navigation Arrows -->
    <button
      v-if="showNavigation"
      class="absolute left-6 top-1/2 -translate-y-1/2 text-white/75 p-3 hover:text-white hover:bg-white/10 hover:scale-110 rounded-full transition-all duration-300 backdrop-blur-sm bg-black/20 group"
      title="上一张 (←)"
      @click="prevImage"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 transition-transform duration-300 group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <button
      v-if="showNavigation"
      class="absolute right-6 top-1/2 -translate-y-1/2 text-white/75 p-3 hover:text-white hover:bg-white/10 hover:scale-110 rounded-full transition-all duration-300 backdrop-blur-sm bg-black/20 group"
      title="下一张 (→)"
      @click="nextImage"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <!-- Image Container -->
    <div
      class="max-w-7xl w-full max-h-[90vh] p-4 relative select-none"
      @mousedown="startDrag"
      @mousemove="onDrag"
      @mouseup="stopDrag"
      @mouseleave="stopDrag"
    >
      <img
        :alt="current.description"
        :src="current.url"
        class="w-full h-full object-contain rounded-lg transition-transform duration-200"
        :style="{
          transform: `scale(${scale}) rotate(${rotation}deg) translate(${position.x}px, ${position.y}px)`,
          cursor: isDragging ? 'grabbing' : 'grab',
        }"
        draggable="false"
      >
      <div class="absolute left-1/2 -translate-x-1/2 bottom-6 px-4 py-2 rounded-lg bg-black/40 backdrop-blur-sm">
        <p class="text-white/90 text-sm">
          {{ current.description }}
        </p>
      </div>
    </div>

    <!-- Toolbar -->
    <div class="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 px-6 py-3 bg-black/40 rounded-full backdrop-blur-sm border border-white/10">
      <!-- Zoom Out -->
      <button
        class="p-2 text-white/75 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 group"
        :title="$t('image.tool.zoomOut')"
        @click="adjustScale(-0.1)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
        </svg>
      </button>

      <!-- Scale Display -->
      <span class="text-white/90 text-sm min-w-[3rem] text-center">
        {{ Math.round(scale * 100) }}%
      </span>

      <!-- Zoom In -->
      <button
        class="p-2 text-white/75 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 group"
        :title="$t('image.tool.zoomIn')"
        @click="adjustScale(0.1)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
        </svg>
      </button>

      <div class="w-px h-5 bg-white/20 mx-1" />

      <!-- Reset -->
      <button
        class="p-2 text-white/75 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 group"
        :title="$t('image.tool.reset')"
        @click="resetImage"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform duration-300 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>

      <div class="w-px h-5 bg-white/20 mx-1" />

      <!-- Rotate Left -->
      <button
        class="p-2 text-white/75 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 group"
        :title="$t('image.tool.rotateLeft')"
        @click="adjustRotation(-90)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform duration-300 group-hover:-rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.5 15a7 7 0 009 6.71V15H2.5z M11.5 15V3.29a7 7 0 00-9 6.71h9z" />
        </svg>
      </button>

      <!-- Rotate Right -->
      <button
        class="p-2 text-white/75 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 group"
        :title="$t('image.tool.rotateRight')"
        @click="adjustRotation(90)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform duration-300 group-hover:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21.5 15a7 7 0 01-9 6.71V15h9z M12.5 15V3.29a7 7 0 019 6.71h-9z" />
        </svg>
      </button>

      <div class="w-px h-5 bg-white/20 mx-1" />

      <!-- Download -->
      <a
        class="p-2 text-white/75 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 group"
        :title="$t('image.tool.download')"
        :href="current.url"
        :download="current.description"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform duration-300 group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      </a>
    </div>

    <!-- Image Counter -->
    <div
      v-if="showNavigation"
      class="absolute top-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm text-white/90 text-sm"
    >
      {{ currentIndex + 1 }} / {{ images.length }}
    </div>
  </div>
</template>

<style>
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
</style>
