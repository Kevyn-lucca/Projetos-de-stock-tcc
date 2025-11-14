<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { useAuth } from "@/composables/useAuth";
import MainUsuario from "@/components/MainUsuario.vue";

const color = useColorMode();
const { user } = useAuth();

const isAdmin = user.value?.perfil !== "funcionario";
const isOpen = ref(false);
const modalTitle = ref("");
const carregando = ref(false);
const usuarios = ref<
  Array<{
    idUsuario: number;
    nome: string;
    email: string;
    perfil: string;
    idPanificadora: number;
  }>
>([]);

// Campos de token
const tokenGerado = ref("");
const gerandoToken = ref(false);
const perfilToken = ref("funcionario");
const panificadoraToken = ref(1);

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


async function carregarUsuarios() {
  try {
    carregando.value = true;
    const res = await axios.get(
      "http://localhost:8080/WebAproject2/GerenciarUsuario?acao=listar"
    );
    usuarios.value = res.data;
  } catch (err) {
    console.error("Erro ao buscar usuários:", err);
  } finally {
    carregando.value = false;
  }
}


async function gerarToken() {
  try {
    gerandoToken.value = true;
    const res = await axios.post(
      "http://localhost:8080/WebAproject2/GerenciarUsuario?acao=gerarToken",
      {
        perfil: perfilToken.value,
        idPanificadora: panificadoraToken.value,
      }
    );
    tokenGerado.value = res.data.token;
  } catch (err) {
    console.error("Erro ao gerar token:", err);
    alert("Falha ao gerar token.");
  } finally {
    gerandoToken.value = false;
  }
}

onMounted(carregarUsuarios);
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

          <!-- GRID DE USUÁRIOS -->
          <div
            v-else
            class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-12 p-4"
          >
        <MainUsuario
          v-for="usuario in usuarios"
          :key="usuario.idUsuario"
          :id-usuario="usuario.idUsuario"
          :nome="usuario.nome"
          :email="usuario.email"
          :perfil="usuario.perfil"
          :id-panificadora="usuario.idPanificadora"
        />


          </div>

          <!-- ÁREA DE GERAÇÃO DE TOKEN -->
          <div
            v-if="isAdmin"
            class="border-t border-gray-300 mt-4 pt-4 px-4 flex flex-col gap-4"
          >
            <h2 class="text-lg font-semibold text-gray-800 dark:text-white">
              Gerar Token para Cadastro
            </h2>

            <div class="flex gap-4">
              <div class="flex flex-col flex-1">
                <label class="text-sm">Perfil</label>
                <select
                  v-model="perfilToken"
                  class="border rounded-lg px-3 py-2 dark:bg-zinc-800"
                >
                  <option value="administrador">Administrador</option>
                  <option value="funcionario">Funcionário</option>
                </select>
              </div>

              <div class="flex flex-col flex-1">
                <label class="text-sm">ID Panificadora</label>
                <input
                  v-model="panificadoraToken"
                  type="number"
                  min="1"
                  class="border rounded-lg px-3 py-2 dark:bg-zinc-800"
                />
              </div>
            </div>

            <div class="flex gap-3 items-center">
              <UButton
                color="secondary"
                icon="i-lucide-key-round"
                :loading="gerandoToken"
                @click="gerarToken"
              >
                {{ gerandoToken ? "Gerando..." : "Gerar Token" }}
              </UButton>

              <input
                v-model="tokenGerado"
                readonly
                placeholder="Token gerado aparecerá aqui"
                class="flex-1 border rounded-lg px-3 py-2 text-xs dark:bg-zinc-800"
              />
            </div>
          </div>
        </div>
      </template>
    </UModal>
  </section>
</template>
