import mobileForever from 'postcss-mobile-forever'

export default {
  plugins: [
    mobileForever({
      appSelector: '#app',
      viewportWidth: 1757,
      maxDisplayWidth: 600,
    }),
  ],
}
