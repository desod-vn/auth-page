export default {
  target: 'static',

  head: {
    title: 'Đăng nhập',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
  ],

  plugins: [
    { src: '~/plugins/notifications', ssr: false },
  ],

  components: true,

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/fontawesome',
  ],


  fontawesome: {
    icons: {
      brands: true,
    }
  },

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  axios: {
    baseURL: 'http://localhost/api/',
    proxy: false,
    credentials: false,
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'login',
            method: 'post',
            propertyName: 'token',
          },
          user: {
            url: 'user',
            method: 'get',
            propertyName: 'user'
          },
          logout: { 
            url: 'logout',
            method: 'post'
          },
          tokenRequired: true,
          logout: false
        }
      },
    },
  },

  build: {
  }
}
