<template>
  <div
    class="relative min-h-[40rem] lg:min-h-0 bg-surface-0 dark:bg-primary-600 flex lg:flex-row flex-col"
  >
    <div
      class="flex lg:flex lg:flex-row flex-col justify-center md:justify-normal h-full flex-1"
    >
      <div class="relative flex-1 z-20 flex items-center justify-center">
        <div class="flex items-center justify-center h-full">
          <div
            class="w-full max-w-2xl px-6 py-12 lg:p-12 xl:p-16 text-center lg:text-left"
          >
            <h1
              class="text-4xl xl:text-5xl font-bold text-surface-0 lg:text-surface-900 dark:text-surface-0 mb-6 !leading-tight"
            >
              O sistema que seu negocio
              <span aria-label="precisa" class="typewriter" />
            </h1>
            <p
              class="text-surface-0/90 lg:text-surface-700 dark:text-surface-200 text-xl leading-normal mb-8 max-w-xl lg:max-w-none"
            >
              Um sistema automatizado e inteligente de organização de estoque
              para padarias. é a solução ideal para transformar a rotina da sua
              padaria, promovendo maior organização, redução de desperdícios e
              aumentando significativamente a eficiência no processo de
              gerenciamento de produtos.
            </p>

            <div
              class="flex items-center gap-4 justify-center lg:justify-start"
            >
              <NuxtLink to="/login/cadastro">
                <button
                  class="buttonClassico !border-primary-600 hover:border-none !text-white hover:!text-black hover:!bg-green-800 !bg-green-400"
                >
                  <p>Cadastre-se</p>
                </button>
              </NuxtLink>
              <NuxtLink to="sobre">
              <button
                class="buttonClassico !border-primary-600 hover:border-none !text-white hover:!text-black hover:!bg-green-800 !bg-green-400"
              >
                <a href="#">Saiba mais</a> 
              </button>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <div class="absolute lg:relative inset-0 lg:inset-auto flex-1">
        <div
          class="absolute lg:hidden inset-0 bg-surface-900/60 dark:bg-surface-900/80 z-10"
        />
        <img
          src="/hero-1.png"
          alt="hero-1"
          class="h-full w-full object-cover xl:[clip-path:polygon(25%_0,100%_0%,100%_100%,0_100%)]"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "prelogin",
});
</script>

<style lang="scss" scoped>
.buttonClassico:hover {
  box-shadow: 0.25rem 0.25rem black, 0 0 10px rgba(0, 0, 0, 0.2) !important;
}

body {
  background-color: $HeaderBgMain;
}
</style>
