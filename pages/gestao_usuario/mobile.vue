<script setup lang="ts">
definePageMeta({
  layout: "mobile",
});
const color = useColorMode();

function changemode() {
  color.preference = color.value === "light" ? "dark" : "light";
}

const isAdmin = true;

const groups = [
  {
    id: "configs1",
    label: "Configurações de usuário",
    items: [
      { label: "Perfil", icon: "i-lucide-user" },
      { label: "Plano", icon: "i-lucide-credit-card" },
      { label: "Segurança", icon: "i-lucide-lock" },
    ],
  },
  {
    id: "configs2",
    label: "Ambiente",
    items: [
      { label: "Formas de pagamento", icon: "i-lucide-credit-card" },
      { label: "Notificações", icon: "i-lucide-bell" },
      { label: "Mudar modo", icon: "i-lucide-lightbulb", onSelect: changemode },
    ],
  },
];
</script>

<template>
  <div>
    <!-- Palette mobile full screen -->
    <div class="fixed inset-0 z-40 pt-12 flex flex-col bg-[#2c3930] p-4">
      <!-- Command Palette -->
      <UCommandPalette
        :groups="groups"
        placeholder="Pesquisar..."
        class="flex-1"
      />

      <!-- Botão gerenciar usuários flutuante (mobile) -->
      <UButton
        v-if="isAdmin"
        icon="i-lucide-rocket"
        size="lg"
        color="primary"
        variant="solid"
        class="mt-4 w-full"
        @click="changemode"
      >
        Gerenciar usuários
      </UButton>
    </div>
  </div>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
