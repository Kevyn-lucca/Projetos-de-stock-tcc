<script setup lang="ts">
import { ref } from "vue";
const color = useColorMode();

const isAdmin = true;
const isOpen = ref(false); // estado do modal
const modalTitle = ref("");
function changemode() {
  color.preference = color.value === "light" ? "dark" : "light";
}

function openModal(title: string) {
  modalTitle.value = title;
  isOpen.value = true;
}

const groups = [
  {
    id: "configs1",
    label: "Configurações de usuário",
    items: [
      {
        label: "Perfil",
        icon: "i-lucide-user",
        onSelect: () => openModal("Perfil"),
      },
      {
        label: "Plano",
        icon: "i-lucide-credit-card",
        onSelect: () => openModal("Plano"),
      },
      {
        label: "Segurança",
        icon: "i-lucide-lock",
        onSelect: () => openModal("Segurança"),
      },
    ],
  },
  {
    id: "configs2",
    label: "Ambiente",
    items: [
      {
        label: "Formas de pagamento",
        icon: "i-lucide-credit-card",
        onSelect: () => openModal("Formas de pagamento"),
      },
      {
        label: "Notificações",
        icon: "i-lucide-bell",
        onSelect: () => openModal("Notificações"),
      },
      { label: "Mudar modo", icon: "i-lucide-lightbulb", onSelect: changemode },
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

    <UButton
      v-if="isAdmin"
      icon="i-lucide-rocket"
      class="ml-5 mt-5"
      size="xl"
      color="primary"
      variant="solid"
      @click="() => openModal('Gerenciar usuários')"
    >
      Gerenciar usuários
    </UButton>

    <!-- NOTE: aqui usamos v-model:open (não v-model) -->
    <UModal v-model:open="isOpen" :title="modalTitle">
      <template #body>
        <p>testeeeee {{ modalTitle }}</p>
      </template>
    </UModal>
  </section>
</template>
