import mobileForever from 'postcss-mobile-forever'

export default {
  plugins: [
    mobileForever({
      appSelector: '#app',
      viewportWidth: 375,
      maxDisplayWidth: 600,
    }),
  ],
}
