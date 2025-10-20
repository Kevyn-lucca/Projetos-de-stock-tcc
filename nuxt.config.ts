// nuxt.config.js
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",

  devtools: { enabled: true },

  css: ["~/assets/auxiliar.css"],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/mainSass.scss" as *;',
        },
      },
    },
  },

  app: {
    head: {
      link: [
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "/bread-svgrepo-com(3).svg",
        },
      ],
    },
  },

  modules: [
    "@formkit/auto-animate/nuxt",
    "@nuxt/ui",
    "@nuxt/eslint",
    "@nuxtjs/color-mode",
    "nuxt-security",
  ],

  security: {
    headers: {
      contentSecurityPolicy: {
        "default-src": ["'self'"],
        "img-src": ["'self'", "data:", "https://api.dicebear.com"],
        "connect-src": ["'self'", "https://localhost:8443"],
      },
    },
  },
});
