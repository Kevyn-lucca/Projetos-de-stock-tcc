<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { useAuth } from "@/composables/useAuth";
import MainUsuario from "@/components/MainUsuario.vue";

const color = useColorMode();
const { user } = useAuth();

const isAdmin = true;
const isOpen = ref(false);
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

const usuarios = ref<
  Array<{
    id_usuario: number;
    nome: string;
    email: string;
    perfil: string;
    id_panificadora: number;
  }>
>([]);
const carregando = ref(false);

onMounted(async () => {
  try {
    carregando.value = true;
    const res = await axios.get("https://localhost:8443/usuarios", {
      headers: { Authorization: `Bearer ${user.value?.token}` },
    });
    usuarios.value = res.data;
  } catch (err) {
    console.error("Erro ao buscar usuários:", err);
  } finally {
    carregando.value = false;
  }
});
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

    <UModal v-model:open="isOpen" :title="modalTitle" class="w-auto">
      <template #body>
        <p v-if="modalTitle !== 'Gerenciar usuários'">
          Esses itens não serão implementados para a versão de demonstração.
        </p>

        <div v-else>
          <div v-if="carregando" class="p-4 text-center">
            Carregando usuários...
          </div>

          <div
            v-else
            class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-12 p-4"
          >
            <MainUsuario
              v-for="usuario in usuarios"
              :id="usuario.id_usuario"
              :key="usuario.id_usuario"
              :nome="usuario.nome"
              :email="usuario.email"
              :perfil="usuario.perfil"
              :id_panificadora="usuario.id_panificadora"
            />
          </div>
        </div>
      </template>
    </UModal>
  </section>
</template>
