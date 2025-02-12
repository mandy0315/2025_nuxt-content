export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/content", "@nuxtjs/tailwindcss", "@nuxt/image"],
  css: ["@/assets/css/base.scss"],
  compatibilityDate: "2025-02-06",
});
