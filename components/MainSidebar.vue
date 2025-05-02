<template>
  <div class="flex h-screen bg-white">
    <div
      class="w-72 pt-12 bg-[#2c3930] shadow-lg p-4 space-y-36 hidden md:block"
    >
      <div class="flex gap-4">
        <h2 class="text-2xl font-bold mb-4 text-white">Nome de usuario</h2>
        <UAvatar src="https://github.com/benjamincanac.png" size="xl" />
      </div>
      <div class="flex flex-col text-xl gap-10 place-content-around">
        <NuxtLink class="text-white" to="/gerenciamentofilial"
          >gerenciamento de filiais</NuxtLink
        >
        <NuxtLink class="text-white" to="/gerenciamentofilial"
          >Controle de inventario</NuxtLink
        >
        <NuxtLink class="text-white" to="/gerenciamentofilial"
          >Relatorios</NuxtLink
        >
        <NuxtLink class="text-white" to="/gerenciamentofilial"
          >Tarefas</NuxtLink
        >
        <NuxtLink class="text-white" to="/gerenciamentofilial"
          >Log-out</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script setup scoped></script>
