<template>
  <div v-if="sidebarStatus" class="flex min-h-screen">
    <div
      v-show="!loadItens"
      class="w-72 pt-0 bg-[#2c3930] shadow-lg p-4 hidden md:block"
    >
      <div class="flex justify-end p-3.5">
        <button @click="toggleSidebar">
          <Icon class="h-5 w-5" name="lucide:menu" style="color: white" />
        </button>
      </div>
      <div class="flex gap-4">
        <h2 class="text-2xl font-bold mb-4 text-white">Nome de usuario</h2>
        <NuxtLink to="/gestao_usuario">
          <UAvatar src="https://github.com/benjamincanac.png" size="xl" />
        </NuxtLink>
      </div>
      <USeparator
        class="mt-8"
        icon="i-simple-icons-nuxtdotjs"
        color="secondary"
      />
      <div>
        <ul class="flex flex-col text-xl gap-10 mt-15 place-content-around">
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
            <NuxtLink class="text-white" to="/tarefas">Tarefas</NuxtLink>
          </li>
          <li>
            <NuxtLink class="text-white" to="/">Log-out</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div v-else class="p-3.5">
    <button @click="toggleSidebar">
      <Icon class="h-5 w-5" name="lucide:menu" :style="{ color: colormode }" />
    </button>
  </div>
</template>

<script setup scoped>
const color = useColorMode();
const colormode = color.value === "dark" ? "light" : "dark";

const sidebarStatus = useSidebarStatus();
let loadItens = false;
const toggleSidebar = () => {
  sidebarStatus.value = !sidebarStatus.value;
  loadItens = !loadItens;
  if (sidebarStatus == true) {
    setTimeout(() => {
      loadItens = !loadItens;
    }, 1000);
  }
};
</script>
