export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@nuxt/content",
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@nuxt/icon",
    "@nuxtjs/color-mode",
  ],

  css: ["@/assets/css/main.scss"],

  icon: {
    serverBundle: {
      collections: ["solar"],
    },
  },

  colorMode: {
    preference: "system",
    fallback: "light",
  },

  compatibilityDate: "2025-02-17",
});
