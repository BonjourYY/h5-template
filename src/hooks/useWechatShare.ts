import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { setWechatShare } from '@/utils/wechatShare'

export const useWechatShare = () => {
  const route = useRoute()
  const dynamicShareData = ref(null) // 动态分享数据，页面手动设置

  // 设置分享数据
  const setShareData = () => {
    console.log('当前路由 meta.shareData:', route.meta.shareData)
    // 优先使用页面动态设置的分享数据
    if (dynamicShareData.value) {
      setWechatShare(dynamicShareData.value)
    } else if (route.meta.shareData) {
      // 如果没有动态数据，尝试使用路由 meta 中的静态数据
      setWechatShare(route.meta.shareData)
    } else {
      // 如果都没有，不设置分享数据
      console.log('未设置分享数据')
      return
    }
  }

  // 监听路由变化，重新设置分享数据
  watch(
    () => route.fullPath,
    () => {
      setShareData()
    },
  )

  // 监听动态分享数据变化
  watch(
    () => dynamicShareData,
    () => {
      setShareData()
    },
  )

  // 初始化微信 SDK
  onMounted(() => {
    setShareData()
  })

  // 提供给页面手动设置动态分享数据的方法
  const setDynamicShareData = (data: any) => {
    dynamicShareData.value = data
  }

  return {
    setDynamicShareData,
  }
}
