<template>
  <div>
    <!-- 点位 -->
    <div
      ref="hotspotRef"
      class="absolute z-99 -translate-x-1/2 -translate-y-1/2"
      :style="{
        left: `${iconPosition.x}%`,
        top: `${iconPosition.y}%`,
      }"
      @click="openModal"
    >
      <img :src="hotspotIcon" :style="hotspotImageStyles" />
    </div>
    <div class="absolute -translate-x-1/2 -translate-y-1/2 z-[99]" :style="addressImageStyles">
      <img :src="addressImage" />
    </div>
    <!-- 弹出的图片内容 -->
    <div v-if="isOpen" ref="modalContentRef">
      <div class="absolute -translate-x-1/2 -translate-y-1/2 z-[99]" :style="modalImageStyles">
        <img
          src="@/assets/images/close.png"
          class="absolute z-[99] right-[0] bottom-[20px] w-[362px] h-[369px]"
          @click="closeModal"
        />
        <img :src="modalImage" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, computed } from 'vue'
import { init } from 'scale-view'
import { clampVw } from 'scale-view'
init(1757, 600)

interface Position {
  x: number
  y: number
}

interface Props {
  hotspotIcon?: string // 点位图标，可选，不传则使用默认圆点
  modalImage: string // 弹窗中显示的图片
  iconPosition: Position // 点位位置（百分比）
  imagePosition: Position
  addressImage: string // 地址图片
  addressPosition: Position // 地址图片位置（百分比）
}

const props = withDefaults(defineProps<Props>(), {
  hotspotIcon: '',
  modalImage: '',
  iconPosition: () => {
    return { x: 0, y: 0 }
  },
  imagePosition: () => {
    return { x: 0, y: 0 }
  },
  addressImage: '',
  addressPosition: () => {
    return { x: 0, y: 0 }
  },
})

const isOpen = ref(false)

// refs for elements
const hotspotRef = ref<HTMLElement>()
const modalContentRef = ref<HTMLElement>()

// 图片尺寸状态
const hotspotImageSize = ref({ width: 0, height: 0 })
const modalImageSize = ref({ width: 0, height: 0 })
const addressImageSize = ref({ width: 0, height: 0 })

// 加载图片并获取尺寸的函数
const loadImageSize = (src: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    if (!src) {
      resolve({ width: 0, height: 0 })
      return
    }

    const img = new Image()
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight })
    }
    img.onerror = () => {
      reject(new Error(`Failed to load image: ${src}`))
    }
    img.src = src
  })
}

// 加载 hotspotIcon 尺寸
const loadHotspotImageSize = async () => {
  try {
    if (props.hotspotIcon) {
      const size = await loadImageSize(props.hotspotIcon)
      hotspotImageSize.value = size
    }
  } catch (error) {
    console.warn('Failed to load hotspot icon size:', error)
  }
}

// 加载 modalImage 尺寸
const loadModalImageSize = async () => {
  try {
    if (props.modalImage) {
      const size = await loadImageSize(props.modalImage)
      modalImageSize.value = size
    }
  } catch (error) {
    console.warn('Failed to load modal image size:', error)
  }
}

// 加载 addressImage 尺寸
const loadAddressImageSize = async () => {
  try {
    if (props.addressImage) {
      const size = await loadImageSize(props.addressImage)
      addressImageSize.value = size
    }
  } catch (error) {
    console.warn('Failed to load address image size:', error)
  }
}

// 监听 props 变化
watch(() => props.hotspotIcon, loadHotspotImageSize, { immediate: true })
watch(() => props.modalImage, loadModalImageSize, { immediate: true })
watch(() => props.addressImage, loadAddressImageSize, { immediate: true })

onMounted(() => {
  loadHotspotImageSize()
  loadModalImageSize()
  loadAddressImageSize()
})

// px 转 vw 的工具函数，返回 min() CSS 函数格式
// const pxToVw = (px: number, viewportWidth: number = 1757) => {
//   const vw = (px / viewportWidth) * 100
//   const maxPx = px * (px / 600)
//   return `min(${vw.toFixed(3)}vw, ${maxPx.toFixed(3)}px)`
// }

// 计算属性：生成内联样式
const hotspotImageStyles = computed(() => {
  if (hotspotImageSize.value.width === 0 || hotspotImageSize.value.height === 0) {
    return {}
  }
  return {
    width: clampVw(hotspotImageSize.value.width),
    height: clampVw(hotspotImageSize.value.height),
  }
})

const modalImageStyles = computed(() => {
  const baseStyles = {
    left: `${props.imagePosition.x}%`,
    top: `${props.imagePosition.y}%`,
  }

  if (modalImageSize.value.width === 0 || modalImageSize.value.height === 0) {
    return baseStyles
  }

  return {
    ...baseStyles,
    width: clampVw(modalImageSize.value.width),
    height: clampVw(modalImageSize.value.height),
  }
})

const addressImageStyles = computed(() => {
  const baseStyles = {
    left: `${props.addressPosition.x}%`,
    top: `${props.addressPosition.y}%`,
  }

  if (addressImageSize.value.width === 0 || addressImageSize.value.height === 0) {
    return baseStyles
  }

  return {
    ...baseStyles,
    width: clampVw(addressImageSize.value.width),
    height: clampVw(addressImageSize.value.height),
  }
})

const openModal = () => {
  isOpen.value = true

  // nextTick(() => {
  //   if (modalContentRef.value) {
  //     // 设置初始状态：在上方隐藏
  //     gsap.set(modalContentRef.value, {
  //       y: -20,
  //       opacity: 0,
  //       scale: 0.9,
  //     })

  //     // 创建从上到下的滑入动画
  //     gsap.to(modalContentRef.value, {
  //       y: 0,
  //       opacity: 1,
  //       scale: 1,
  //       duration: 0.4,
  //       ease: 'back.out(1.2)',
  //     })
  //   }
  // })
}

const closeModal = () => {
  isOpen.value = false
}
</script>
