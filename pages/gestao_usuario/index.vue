<script setup lang="ts">
const color = useColorMode();

function changemode() {
  color.preference = color.value === "light" ? "dark" : "light";
}

// simulação: em produção você buscaria do backend / auth
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
      {
        label: "Mudar modo",
        icon: "i-lucide-lightbulb",
        onSelect: changemode, // <- aqui usa click em vez de onclick
      },
    ],
  },
];
</script>

<template>
  <section>
    <UCommandPalette
      placeholder="Pesquisar..."
      :groups="groups"
      class="flex-1 h-auto"
    />

    <!-- Só aparece para administradores -->
    <UButton
      v-if="isAdmin"
      icon="i-lucide-rocket"
      class="ml-5 mt-5"
      size="xl"
      color="primary"
      variant="solid"
      @click="changemode"
    >
      Gerenciar usuários
    </UButton>
  </section>
</template>
