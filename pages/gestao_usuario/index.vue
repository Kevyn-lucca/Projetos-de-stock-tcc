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
    <UModal v-model:open="isOpen" :title="modalTitle" class="w-auto">
      <template #body>
        <p v-if="modalTitle != 'Gerenciar usuários'">
          esses itens não serã implementados para a versão de demonstração
        </p>
        <div v-else>
          <div class="flex gap-4">
            <MainCard
              v-for="i in 10"
              :key="i"
              :img="`https://i.pravatar.cc/150?img=${i}`"
              :name="`Funcionário ${i}`"
              :filial= false
              :cargo="i % 3 === 0 ? 'Vendedor' : 'Atendente'"
              :vendas="Math.floor(Math.random() * 100)"
              :ativo="i % 4 !== 0"
            />
          </div>
        </div>
      </template>
    </UModal>
  </section>
</template>
