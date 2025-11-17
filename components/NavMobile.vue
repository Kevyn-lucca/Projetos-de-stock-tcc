<!-- eslint-disable vue/no-deprecated-v-on-native-modifier -->

<script setup lang="ts">
import { ref, watch, nextTick } from "vue";
import { useColorMode } from "#imports";
import { useAuth } from "~/composables/useAuth";

const { user } = useAuth(); // estado reativo do usuário

function gerarAvatares(nome: string) {
  const seed = encodeURIComponent(nome);
  return `https://api.dicebear.com/8.x/lorelei/svg?seed=${seed}`;
}

onMounted(() => {
  if (user.value?.nome) {
    url.value = gerarAvatares(user.value.nome);
  }
});


const url = ref("");
const open = ref(false);
const panel = ref<HTMLDivElement | null>(null);

const color = useColorMode();
const iconColor = color.value === "dark" ? "light" : "dark";

function closeMenu() {
  open.value = false;
}



watch(open, async (val) => {
  if (val) {
    await nextTick();
    panel.value?.focus?.();
  }
});
</script>

<template>
  <UButton
    variant="subtle"
    class="fixed top-3 left-3 z-50"
    :ui="{ base: 'p-2' }"
    @click="open = true"
  >
    <Icon class="h-6 w-6" name="lucide:menu" :style="{ color: iconColor }" />
  </UButton>

  <div
    v-if="open"
    class="fixed inset-0 bg-black/50 z-40 md:hidden"
    aria-hidden="true"
    @click="closeMenu"
  />

  <aside
    ref="panel"
    class="fixed top-0 left-0 h-full w-72 p-4 transition-transform duration-300 ease-in-out"
    :class="open ? 'translate-x-0' : '-translate-x-full'"
    style="background: #2c3930; z-index: 50"
    role="dialog"
    aria-modal="true"
    aria-label="Menu de navegação"
    tabindex="-1"
  >
    <div class="flex justify-between items-center mb-6">
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
      <UButton variant="subtle" class="p-1" @click="closeMenu">
        <Icon class="h-5 w-5" name="lucide:x" style="color: white" />
      </UButton>
    </div>

    <USeparator class="mb-6" icon="i-lucide-wheat" color="secondary" />

    <nav>
      <ul class="flex flex-col gap-6 text-lg">
        <li>
          <NuxtLink
            class="text-white block"
            to="/gerenciamento_filial"
            @click="closeMenu"
            >gerenciamento de filiais</NuxtLink
          >
        </li>
        <li>
          <NuxtLink
            class="text-white block"
            to="/controle_inventario"
            @click="closeMenu"
            >Controle de inventario</NuxtLink
          >
        </li>
        <li>
          <NuxtLink class="text-white block" to="/relatorios" @click="closeMenu"
            >Relatorios</NuxtLink
          >
        </li>
        <li>
          <NuxtLink class="text-white block" to="/tarefas" @click="closeMenu"
            >Tarefas</NuxtLink
          >
        </li>
        <li>
          <NuxtLink class="text-white block" to="/" @click="closeMenu"
            >Log-out</NuxtLink
          >
        </li>
      </ul>
    </nav>
  </aside>
</template>
