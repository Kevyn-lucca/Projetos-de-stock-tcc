<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { useAuth } from "@/composables/useAuth";

const { user, isAuthenticated } = useAuth();

const props = defineProps<{
  id: number;
  nome: string;
  cnpj: string;
  endereco: string;
  telefone: string;
  ativo: boolean;
}>();

const modalAberto = ref(false);
const carregando = ref(false);
const filiais = ref<
  { id: number; nome: string; img?: string; filial: boolean }[]
>([]);
const filialSelecionada = ref<number | null>(null);

const editNome = ref(props.nome);
const editCnpj = ref(props.cnpj);
const editEndereco = ref(props.endereco);
const editTelefone = ref(props.telefone);

const emit = defineEmits(["filialAlterada"]);

function atualizarFilial() {
  emit("filialAlterada");
}

async function salvarAlteracoes() {
  if (!isAuthenticated()) {
    alert("Sessão expirada. Faça login novamente.");
    return;
  }

  try {
    carregando.value = true;

    const payload = {
      nome: editNome.value,
      cnpj: editCnpj.value,
      endereco: editEndereco.value,
      telefone: editTelefone.value,
    };

    await axios.put(
      `https://localhost:8443/panificadora/update/${props.id}`,
      payload,
      { headers: { Authorization: `Bearer ${user.value?.token}` } }
    );

    modalAberto.value = false;
    atualizarFilial();
    alert("Filial atualizada com sucesso!");
  } catch (err) {
    console.error("Erro ao atualizar filial:", err);
    alert("Erro ao atualizar filial");
  } finally {
    carregando.value = false;
  }
}

async function toggleStatusFilial() {
  if (!isAuthenticated()) {
    alert("Sessão expirada. Faça login novamente.");
    return;
  }

  const acao = props.ativo ? "desativar" : "reativar";

  try {
    carregando.value = true;

    // Usando PUT para desativar/reativar (mais semântico que DELETE)
    await axios.put(
      `https://localhost:8443/panificadora/${acao}/${props.id}`,
      {},
      { headers: { Authorization: `Bearer ${user.value?.token}` } }
    );

    modalAberto.value = false;
    atualizarFilial();
    alert(`Filial ${props.ativo ? "desativada" : "reativada"} com sucesso!`);
  } catch (err: unknown) {
    console.error(`Erro ao ${acao} filial:`, err);
  } finally {
    carregando.value = false;
  }
}

// Lifecycle
onMounted(async () => {
  try {
    const res = await axios.get("https://localhost:8443/panificadora", {
      headers: { Authorization: `Bearer ${user.value?.token}` },
    });
    filiais.value = res.data;
    filialSelecionada.value = props.id;
  } catch (err) {
    console.error("Erro ao buscar filiais:", err);
  }
});
</script>

<template>
  <!-- Card da Filial -->
  <div
    class="group relative w-64 rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden cursor-pointer"
    :class="
      props.ativo
        ? 'bg-white dark:bg-zinc-900 border-2 border-transparent hover:border-blue-500'
        : 'bg-red-100 dark:bg-red-900 border-2 border-red-300'
    "
    @click="modalAberto = true"
  >
    <!-- Indicador de status -->
    <div
      class="absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full"
      :class="
        props.ativo ? 'bg-green-100 text-green-800' : 'bg-red-200 text-red-800'
      "
    >
      {{ props.ativo ? "Ativa" : "Inativa" }}
    </div>

    <!-- Imagem da filial -->
    <div
      class="h-44 w-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400 text-sm"
    >
      <div class="text-center">
        <div class="text-4xl mb-2">🏭</div>
        <div>Sem imagem</div>
      </div>
    </div>

    <!-- Informações básicas -->
    <div class="p-4 flex flex-col gap-2">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white truncate">
        {{ props.nome }}
      </h3>
      <p class="text-sm text-gray-600 dark:text-gray-300 truncate">
        {{ props.cnpj }}
      </p>
      <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
        {{ props.endereco }}
      </p>
      <p class="text-xs text-gray-500 dark:text-gray-400">
        {{ props.telefone }}
      </p>
    </div>
  </div>

  <!-- Modal de edição -->
  <UModal v-model:open="modalAberto" :title="`Editar ${props.nome}`">
    <template #body>
      <div class="flex flex-col gap-4 p-4">
        <!-- Nome -->
        <div>
          <label class="text-sm font-medium text-gray-700 dark:text-gray-200">
            Nome
          </label>
          <input
            v-model="editNome"
            type="text"
            class="w-full mt-1 rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <!-- CNPJ -->
        <div>
          <label class="text-sm font-medium text-gray-700 dark:text-gray-200">
            CNPJ
          </label>
          <input
            v-model="editCnpj"
            type="text"
            class="w-full mt-1 rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <!-- Endereço -->
        <div>
          <label class="text-sm font-medium text-gray-700 dark:text-gray-200">
            Endereço
          </label>
          <input
            v-model="editEndereco"
            type="text"
            class="w-full mt-1 rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <!-- Telefone -->
        <div>
          <label class="text-sm font-medium text-gray-700 dark:text-gray-200">
            Telefone
          </label>
          <input
            v-model="editTelefone"
            type="text"
            class="w-full mt-1 rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <!-- Botões -->
        <div class="flex justify-between gap-3 mt-4">
          <button
            class="px-4 py-2 rounded-lg font-medium transition-colors"
            :class="
              props.ativo
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
            "
            :disabled="carregando"
            @click="toggleStatusFilial"
          >
            {{ carregando ? "..." : props.ativo ? "Desativar" : "Reativar" }}
          </button>

          <div class="flex gap-3">
            <button
              class="px-4 py-2 rounded-lg bg-gray-400 hover:bg-gray-500 text-white font-medium transition-colors"
              :disabled="carregando"
              @click="modalAberto = false"
            >
              Cancelar
            </button>
            <button
              class="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
              :disabled="carregando"
              @click="salvarAlteracoes"
            >
              {{ carregando ? "Salvando..." : "Salvar" }}
            </button>
          </div>
        </div>
      </div>
    </template>
  </UModal>
</template>
