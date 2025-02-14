export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/content",
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@nuxt/icon",
  ],
  css: ["@/assets/css/base.scss"],
  icon: {
    serverBundle: {
      collections: ["solar"],
    },
  },
});
