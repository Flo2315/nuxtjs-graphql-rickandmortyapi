export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Rick and morty - Explore API GraphQL',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@/assets/css/main.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [{ src: '~/plugins/infiniteloading', ssr: false }],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ['@nuxtjs/apollo'],

  // Configuration appolo graphql
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'https://rickandmortyapi.com/graphql/',
      },
    },
  },

  router: {
    linkActiveClass: 'text-white bg-gray-900',
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
