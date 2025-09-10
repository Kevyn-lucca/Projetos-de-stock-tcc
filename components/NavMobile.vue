<!-- eslint-disable vue/no-deprecated-v-on-native-modifier -->

<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onUnmounted } from "vue";
import { useColorMode } from "#imports";

// Controle de abertura do menu
const open = ref(false);
const panel = ref<HTMLDivElement | null>(null);

// Determina cor dos ícones conforme tema
const color = useColorMode();
const iconColor = color.value === "dark" ? "light" : "dark";

function closeMenu() {
  open.value = false;
}

// Fecha ao pressionar ESC
function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape" && open.value) closeMenu();
}

onMounted(() => window.addEventListener("keydown", onKeydown));
onUnmounted(() => window.removeEventListener("keydown", onKeydown));

watch(open, async (val) => {
  if (val) {
    await nextTick();
    panel.value?.focus?.();
  }
});
</script>

<template>
  <!-- Botão hambúrguer (apenas sm e menor) -->
  <UButton
    variant="subtle"
    class="fixed top-3 left-3 z-50"
    :ui="{ base: 'p-2' }"
    @click="open = true"
  >
    <Icon class="h-6 w-6" name="lucide:menu" :style="{ color: iconColor }" />
  </UButton>

  <!-- Overlay escuro -->
  <div
    v-if="open"
    class="fixed inset-0 bg-black/50 z-40 md:hidden"
    aria-hidden="true"
    @click="closeMenu"
  />

  <!-- Painel deslizante lateral -->
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
      <div class="flex items-center gap-3">
        <div>
          <h2 class="text-2xl font-bold text-white">Nome de usuario</h2>
          <NuxtLink to="/gestao_usuario" class="block -mt-1">
            <UAvatar src="https://github.com/benjamincanac.png" size="lg" />
          </NuxtLink>
        </div>
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
