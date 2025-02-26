// nuxt.config.js
export default defineNuxtConfig({
				compatibilityDate: '2024-11-01',
				devtools: { enabled: true },
				css: ['~/assets/auxiliar.scss'],
				vite: {
								css: {
												preprocessorOptions: {
																scss: {
																				additionalData: '@use "~/assets/main.scss" as *\n;',
																},
												},
								},
				},
				modules: [
				 '@nuxtjs/tailwindcss',
				 '@primevue/nuxt-module',
				 '@formkit/auto-animate',
				],
				primevue: {
								// Configurações do PrimeVue
				},
});