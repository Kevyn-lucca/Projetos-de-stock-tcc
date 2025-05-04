<script setup lang="ts">
const groups = [
  {
    id: "configs1",
    label: "Configurações de usuario",
    items: [
      {
        label: "Perfil",
        icon: "i-lucide-user",
      },
      {
        label: "Plano",
        icon: "i-lucide-credit-card",
      },
      {
        label: "Notificações",
        icon: "i-lucide-bell",
      },
      {
        label: "Security",
        icon: "i-lucide-lock",
      },
    ],
  },
  {
    id: "configs2",
    label: "Ambiente",
    items: [
      {
        label: "Perfil",
        icon: "i-lucide-user",
      },
      {
        label: "Formas de pagamento",
        icon: "i-lucide-credit-card",
      },
      {
        label: "Notificações",
        icon: "i-lucide-bell",
      },
      {
        label: "Modo escuro",
        icon: "ic:outline-lightbulb",
      },
    ],
  },
];
</script>

//O botão de gerenciar usuario só pode aparecer para administrador
<template>
  <section>
    <UCommandPalette
      placeholder="Pesquisar..."
      :groups="groups"
      class="flex-1 h-auto"
    />

    <UButton
      icon="i-lucide-rocket"
      class="ml-5 mt-5"
      size="xl"
      color="primary"
      variant="solid"
      >Gerenciar usuarios
    </UButton>
  </section>
</template>
