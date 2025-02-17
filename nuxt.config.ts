import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ["@nuxt/content", "@nuxt/image", "@nuxt/icon", "@nuxtjs/color-mode"],

  vite: {
    plugins: [tailwindcss()],
  },

  css: ["@/assets/css/tailwind.css"],

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
