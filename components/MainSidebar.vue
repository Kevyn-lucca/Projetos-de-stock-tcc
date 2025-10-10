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
      <div class="flex items-center justify-between w-full mb-4">
        <h2
          class="flex-1 text-2xl sm:text-3xl md:text-4xl font-bold text-white truncate"
          :title="user?.nome"
        >
          {{ user?.nome }}
        </h2>
        <NuxtLink to="/gestao_usuario">
          <UAvatar :src="url" size="xl" />
        </NuxtLink>
      </div>
      <USeparator class="mt-8" icon="i-lucide-wheat" color="secondary" />
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

<script setup lang="ts">
import { ref, computed } from "vue";
import { useAuth } from "~/composables/useAuth"; // importa o composable

const { user } = useAuth(); // estado reativo do usuário
const url = ref("");

// Gera avatar a partir do nome do usuário
function gerarAvatares(nome: string) {
  const seed = encodeURIComponent(nome);
  return `https://api.dicebear.com/8.x/lorelei/svg?seed=${seed}`;
}

onMounted(() => {
  if (user.value?.nome) {
    url.value = gerarAvatares(user.value.nome);
  }
});

const color = useColorMode();
const sidebarStatus = useSidebarStatus();

const colormode = computed(() => (color.value === "dark" ? "light" : "dark"));

const loadItens = ref(false);

const toggleSidebar = () => {
  sidebarStatus.value = !sidebarStatus.value;
  loadItens.value = !loadItens.value;
};
</script>
