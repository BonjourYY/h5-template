export default {
  plugins: {
    'postcss-px-to-viewport-8-plugin': {
      viewportWidth: 375, // 根据设计稿设定
      unitPrecision: 4, // 转化精度，转换后保留位数
      viewportUnit: 'vmin', // 转换后的单位
      fontViewportUnit: 'vmin', // 字体单位
      unitToConvert: 'px', // 需要转换的单位
      mediaQuery: true,
    },
  },
}
