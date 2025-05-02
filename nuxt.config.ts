// nuxt.config.js
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/auxiliar.css"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/mainSass.scss" as *\n;',
        },
      },
    },
  },
  modules: ["@formkit/auto-animate/nuxt", "@nuxt/ui"],
});
