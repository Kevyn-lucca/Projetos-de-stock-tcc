<template>
  <div class="flex min-h-screen bg-white">
    <div class="w-72 pt-12 bg-[#2c3930] shadow-lg p-4 hidden md:block">
      <div class="flex gap-4">
        <h2 class="text-2xl font-bold mb-4 text-white">Nome de usuario</h2>
        <NuxtLink to="/gerenciamento_filial">
          <UAvatar src="https://github.com/benjamincanac.png" size="xl" />
        </NuxtLink>
      </div>
      <USeparator
        class="mt-8"
        icon="i-simple-icons-nuxtdotjs"
        color="secondary"
      />
      <div>
        <ul class="flex flex-col text-xl gap-10 mt-32 place-content-around">
          <li>
            <NuxtLink class="text-white" to="/gerenciamento_filial"
              >gerenciamento de filiais</NuxtLink
            >
          </li>
          <li>
            <NuxtLink class="text-white" to="/controle_inventario"
              >Controle de inventario</NuxtLink
            >
          </li>
          <li>
            <NuxtLink class="text-white" to="/relatorios">Relatorios</NuxtLink>
          </li>
          <li>
            <NuxtLink class="text-white" to="/">Tarefas</NuxtLink>
          </li>
          <li>
            <NuxtLink class="text-white" to="/">Log-out</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup scoped></script>
