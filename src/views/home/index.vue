<template>
  <video
    class="w-[600px] h-[300px]"
    controls
    src="https://oss-jk.cbxmt.cn/yyx/%E8%83%BD%E9%87%8F%E5%92%8C%E8%9B%8B%E7%99%BD%E8%B4%A8.mp4"
  ></video>
  <div class="relative">
    <div class="h-screen w-full" v-show="!isShowMainContainer">
      <img src="@/assets/images/poster.jpg" class="h-full w-full object-cover object-top" />
      <img
        class="absolute right-0 bottom-[25%] w-[40%]"
        @click="
          () => {
            isShowMainContainer = true
          }
        "
        src="@/assets/images/click.png"
      />
    </div>
    <!-- <img src="@/assets/images/poster.jpg" /> -->
    <div v-show="isShowMainContainer">
      <div ref="start" class="absolute w-[100px] h-[100px] top-[20000px] z-[99]"></div>
      <div ref="end" class="absolute w-[100px] h-[100px] top-[39000px] z-[99]"></div>

      <ul>
        <img
          src="@/assets/images/car.png"
          class="sticky z-[99] top-[500px] left-0 w-[30%] float-left"
          ref="carElement"
        />
        <li
          v-for="(imageInfo, index) in imageInfos"
          :key="index"
          ref="imageItems"
          class="w-full bg-cover bg-center bg-no-repeat relative"
          :style="{
            backgroundImage: `url(${imageInfo.url})`,
            paddingTop: `${imageInfo.aspectRatio * 100}%`,
          }"
        >
          <!-- 使用封装的点位弹窗组件 -->
          <HotspotModal
            v-for="hotspot in imageInfo.hotspots"
            :key="hotspot.id"
            :hotspot-icon="hotspot.icon"
            :modal-image="hotspot.image || ''"
            :icon-position="hotspot.iconPosition"
            :image-position="hotspot.imagePosition"
            :address-image="hotspot.addressImage"
            :address-position="hotspot.addressPosition"
          />
        </li>
      </ul>
      <footer class="h-[10724px] pt-[1000px] relative">
        <div class="article_list h-[3804px] relative">
          <ul
            style="transform: rotate(90deg)"
            class="flex flex-col justify-evenly px-[80px] absolute top-[969px] left-[-320px] w-[2076px] h-[1076px]"
          >
            <li v-for="(item, index) in specialList.slice(0, 3)" :key="index">
              <a
                class="flex justify-between gap-[50px]"
                :href="`https://sharekcz.cztv.tv/article?id=${item.id}`"
                target="_blank"
              >
                <p class="text-[100px] line-clamp-1">
                  {{ item.title }}
                </p>
                <img
                  :src="item.thumbnails[0].src"
                  class="w-[400px] h-[300px] shrink-0 rounded-[20px]"
                />
              </a>
            </li>
          </ul>
          <a href="https://sharekcz.cztv.tv/special?id=586" target="_blank">
            <img
              src="@/assets/images/more.png"
              class="absolute bottom-[400px] right-[80px] w-[344px] h-[718px]"
            />
          </a>
        </div>

        <!-- <img
          @click="timelineShow = !timelineShow"
          src="@/assets/images/cursor.png"
          class="absolute top-[63%] left-[18%] w-[382px] h-[396px]"
        /> -->

        <img
          ref="mobileRef"
          class="absolute top-[63%] left-[18%] w-[20%]"
          src="@/assets/images/mobile.png"
        />

        <a href="https://sharekcz.cztv.tv/article?id=340210" target="_blank">
          <img src="@/assets/images/jgg.png" class="h-[1546px]" />
        </a>
      </footer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HotspotModal from '@/components/HotspotModal.vue'
import { useWechatShare } from '@/hooks/useWechatShare'
import { init } from 'scale-view'
import { getSpecialList } from '@/api/special'
init(1757, 600)

const isShowMainContainer = ref(false)
let carScrollTrigger: ScrollTrigger | null = null

// 注册ScrollTrigger插件
gsap.registerPlugin(ScrollTrigger)

// 初始化微信分享
useWechatShare()

interface Hotspot {
  id: string
  iconPosition: { x: number; y: number }
  imagePosition: { x: number; y: number }
  addressPosition: { x: number; y: number }
  addressImage: string
  icon?: string // 点位图标
  image?: string // 弹窗图片
}

interface ImageInfo {
  url: string
  aspectRatio: number
  hotspots: Hotspot[]
}

const imageInfos = ref<ImageInfo[]>([])

// refs for animations
const imageItems = ref<HTMLElement[]>([])
const carElement = ref<HTMLElement>()
const mobileRef = ref<HTMLElement>()
const start = ref<HTMLElement>()
const end = ref<HTMLElement>()

// 示例点位配置 - 可以根据需要修改
const getHotspotsForImage = async (index: number): Promise<Hotspot[]> => {
  const configs = [
    [
      {
        id: '1-1',
        iconPosition: { x: 50, y: 30 },
        imagePosition: { x: 50, y: 30 },
        addressPosition: { x: 50, y: 16 },
        addressImage: (await import('@/assets/images/address/1.png?format=webp')).default,
        image: (await import('@/assets/images/nszh.png?format=webp')).default,
        icon: (await import('@/assets/images/cursor.png?format=webp')).default, // 可选：自定义点位图标
      },
      {
        id: '1-2',
        iconPosition: { x: 50, y: 60 },
        imagePosition: { x: 50, y: 60 },
        addressPosition: { x: 55, y: 73 },
        addressImage: (await import('@/assets/images/address/2.png?format=webp')).default,
        image: (await import('@/assets/images/tmh.png?format=webp')).default,
        icon: (await import('@/assets/images/cursor.png?format=webp')).default, // 可选：自定义点位图标
      },
      {
        id: '1-3',
        iconPosition: { x: 50, y: 95 },
        imagePosition: { x: 50, y: 95 },
        addressPosition: { x: 50, y: 109 },
        addressImage: (await import('@/assets/images/address/3.png?format=webp')).default,
        image: (await import('@/assets/images/cqyc.png?format=webp')).default,
        icon: (await import('@/assets/images/cursor.png?format=webp')).default, // 可选：自定义点位图标
      },
    ],
    [
      {
        id: '2-1',
        iconPosition: { x: 50, y: 32 },
        imagePosition: { x: 50, y: 32 },
        addressPosition: { x: 40, y: 45 },
        addressImage: (await import('@/assets/images/address/4.png?format=webp')).default,
        image: (await import('@/assets/images/tns.png?format=webp')).default,
        icon: (await import('@/assets/images/cursor.png?format=webp')).default,
      },
      {
        id: '2-2',
        iconPosition: { x: 50, y: 80 },
        imagePosition: { x: 50, y: 80 },
        addressPosition: { x: 40, y: 94 },
        addressImage: (await import('@/assets/images/address/5.png?format=webp')).default,
        image: (await import('@/assets/images/qgx.png?format=webp')).default,
        icon: (await import('@/assets/images/cursor.png?format=webp')).default,
      },
    ],
    [
      {
        id: '3-1',
        iconPosition: { x: 50, y: 15 },
        imagePosition: { x: 50, y: 15 },
        addressPosition: { x: 50, y: 28 },
        addressImage: (await import('@/assets/images/address/6.png?format=webp')).default,
        image: (await import('@/assets/images/kly.png?format=webp')).default,
        icon: (await import('@/assets/images/cursor.png?format=webp')).default,
      },
      {
        id: '3-2',
        iconPosition: { x: 40, y: 55 },
        imagePosition: { x: 60, y: 65 },
        image: (await import('@/assets/images/2.png?format=webp')).default,
        icon: (await import('@/assets/images/cursor.png?format=webp')).default,
      },
    ],
    [
      {
        id: '4-1',
        iconPosition: { x: 25, y: 14 },
        imagePosition: { x: 60, y: 14 },
        image: (await import('@/assets/images/3.png?format=webp')).default,
        icon: (await import('@/assets/images/cursor.png?format=webp')).default,
      },
      {
        id: '4-2',
        iconPosition: { x: 50, y: 56 },
        imagePosition: { x: 50, y: 56 },
        addressPosition: { x: 60, y: 43 },
        addressImage: (await import('@/assets/images/address/7.png?format=webp')).default,
        image: (await import('@/assets/images/hj.png?format=webp')).default,
        icon: (await import('@/assets/images/cursor.png?format=webp')).default,
      },
    ],
    [
      {
        id: '5-1',
        iconPosition: { x: 50, y: 34 },
        imagePosition: { x: 50, y: 34 },
        addressPosition: { x: 50, y: 48 },
        addressImage: (await import('@/assets/images/address/8.png?format=webp')).default,
        image: (await import('@/assets/images/sd.png?format=webp')).default,
        icon: (await import('@/assets/images/cursor.png?format=webp')).default,
      },
      {
        id: '5-2',
        iconPosition: { x: 50, y: 70 },
        imagePosition: { x: 50, y: 70 },
        addressPosition: { x: 55, y: 84 },
        addressImage: (await import('@/assets/images/address/9.png?format=webp')).default,
        image: (await import('@/assets/images/f.png?format=webp')).default,
        icon: (await import('@/assets/images/cursor.png?format=webp')).default,
      },
    ],
    [
      {
        id: '6-1',
        iconPosition: { x: 50, y: 5 },
        imagePosition: { x: 50, y: 5 },
        addressPosition: { x: 50, y: 18 },
        addressImage: (await import('@/assets/images/address/10.png?format=webp')).default,
        image: (await import('@/assets/images/whl.png?format=webp')).default,
        icon: (await import('@/assets/images/cursor.png?format=webp')).default,
      },
      {
        id: '6-2',
        iconPosition: { x: 50, y: 40 },
        imagePosition: { x: 50, y: 40 },
        addressPosition: { x: 55, y: 54 },
        addressImage: (await import('@/assets/images/address/11.png?format=webp')).default,
        image: (await import('@/assets/images/nj.png?format=webp')).default,
        icon: (await import('@/assets/images/cursor.png?format=webp')).default,
      },
      {
        id: '6-3',
        iconPosition: { x: 50, y: 70 },
        imagePosition: { x: 50, y: 70 },
        addressPosition: { x: 55, y: 84 },
        addressImage: (await import('@/assets/images/address/12.png?format=webp')).default,
        image: (await import('@/assets/images/ych.png?format=webp')).default,
        icon: (await import('@/assets/images/cursor.png?format=webp')).default,
      },
    ],
  ]
  return configs[index] || []
}

// 获取图片尺寸
const getImageDimensions = (url: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight })
    img.onerror = reject
    img.src = url
  })
}

const specialList = ref<object[]>([])

onMounted(async () => {
  // 请求接口
  const { data: result } = await getSpecialList(586)
  specialList.value = result.data
  console.log(specialList.value)

  // 导入所有背景图片
  const imageModules = import.meta.glob('../../assets/images/bg/*.jpg', {
    eager: true,
    query: { url: true, format: 'webp' },
    import: 'default',
  })

  const imageUrls = Object.values(imageModules) as string[]

  const imageInfoPromises = imageUrls.map(async (url, index) => {
    const dimensions = await getImageDimensions(url)
    return {
      url,
      aspectRatio: dimensions.height / dimensions.width,
      hotspots: await getHotspotsForImage(index),
    }
  })

  imageInfos.value = await Promise.all(imageInfoPromises)

  await nextTick()

  // 实时监听滚动距离
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY
    console.log('当前滚动距离:', scrollY)
    // console.log('自适应开始位置:', clampVw(5791))
    // console.log('自适应结束位置:', clampVw(10172))
  })

  // 创建车辆滚动触发器的函数
  const createCarScrollTrigger = () => {
    if (carScrollTrigger) {
      carScrollTrigger.kill()
    }

    if (carElement.value && start.value && end.value) {
      carScrollTrigger = ScrollTrigger.create({
        trigger: 'body',
        start: () => start.value?.offsetTop || 0,
        end: () => end.value?.offsetTop || 0,
        onEnter: () => carElement.value && gsap.to(carElement.value, { opacity: 0, duration: 0.3 }),
        onLeave: () => carElement.value && gsap.to(carElement.value, { opacity: 1, duration: 0.3 }),
        onEnterBack: () =>
          carElement.value && gsap.to(carElement.value, { opacity: 0, duration: 0.3 }),
        onLeaveBack: () =>
          carElement.value && gsap.to(carElement.value, { opacity: 1, duration: 0.3 }),
      })
    }
  }

  // 监听 isShowMainContainer 变化，重新创建 ScrollTrigger
  watch(isShowMainContainer, async (newValue) => {
    if (newValue) {
      await nextTick()
      ScrollTrigger.refresh()
      await nextTick()
      createCarScrollTrigger()
    }
  })

  // 初始设置车辆滚动时的显示/隐藏
  createCarScrollTrigger()

  // 设置手机上下晃动动画（抖音logo效果）
  // if (mobileRef.value) {
  //   gsap.to(mobileRef.value, {
  //     y: -15,
  //     duration: 1.5,
  //     yoyo: true,
  //     repeat: -1,
  //     ease: 'sine.inOut',
  //   })
  // }
})
</script>

<style lang="css" scoped>
footer {
  background: url('@/assets/images/7.jpg') center / cover no-repeat;
}

.article_list {
  background: url('@/assets/images/zx.png') center / cover no-repeat;
}
</style>
