import wx from 'weixin-js-sdk'

const fetchWechatConfig = async () => {
  try {
    const response = await fetch(
      `https://www.cz001.com.cn/?c=WeixinShare&m=czw&url=${window.location.href}`,
    )
    const result = await response.json()
    await initWechatSDK(result)
  } catch (error) {
    console.error('微信 SDK 初始化失败:', error)
  }
}

const initWechatSDK = async (config) => {
  return new Promise<void>((resolve, reject) => {
    wx.config({
      debug: false,
      appId: config.appId,
      timestamp: config.timestamp,
      nonceStr: config.nonceStr,
      signature: config.signature,
      jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'],
    })

    wx.ready(() => {
      resolve()
    })

    wx.error((err) => {
      reject(err)
    })
  })
}

export const setWechatShare = async (shareData) => {
  await fetchWechatConfig()

  if (!shareData) return

  const defaultData = {
    title: '默认标题',
    desc: '默认描述',
    link: window.location.href,
    imgUrl: '默认图片URL',
  }

  const finalData = { ...defaultData, ...shareData }

  wx.updateAppMessageShareData({
    title: finalData.title,
    desc: finalData.desc,
    link: finalData.link,
    imgUrl: finalData.imgUrl,
    success: () => {
      console.log('分享给朋友设置成功')
      console.log(finalData.link)
    },
    fail: () => {
      console.log('失败1')
    },
  })

  wx.updateTimelineShareData({
    title: finalData.title,
    link: finalData.link,
    imgUrl: finalData.imgUrl,
    success: () => {
      console.log('分享到朋友圈设置成功')
    },
    fail: () => {
      console.log('失败2')
    },
  })
}
