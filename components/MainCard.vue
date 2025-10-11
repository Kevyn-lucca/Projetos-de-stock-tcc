<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { useAuth } from "@/composables/useAuth";
const first = ref(false);

const props = defineProps<{
  id: string | number;
  img: string;
  name: string;
  marca: string;
  filial: boolean;
  validade: string;
  quantidade: number;
  status: string;
  ProdutosId: number;
}>();

const quantidade = ref(props.quantidade);
const validade = ref(props.validade);
const status = ref(props.status);
const carregando = ref(false);
const emit = defineEmits(["estoqueAlterado"]);

function atualizarEstoque() {
  emit("estoqueAlterado");
}

const { user, isAuthenticated } = useAuth();

async function salvarAlteracoes() {
  if (!isAuthenticated()) {
    alert("Sessão expirada. Faça login novamente.");
    return;
  }

  try {
    carregando.value = true;

    const payload = {
      quantidade: quantidade.value,
      dataValidade: validade.value === "Sem validade" ? null : validade.value, // camelCase
      status: status.value,
      idEstoque: Number(props.id),
      idProduto: Number(props.ProdutosId),
      idPanificadora: user.value?.idPanificadora,
    };

    await axios.put(
      `https://localhost:8443/estoque/update/${props.id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${user.value?.token}`,
        },
      }
    );
  } catch (err) {
    console.error("Erro ao atualizar estoque:", err);
    alert("Erro ao atualizar estoque");
  } finally {
    first.value = false;

    carregando.value = false;
    atualizarEstoque();
  }
}

// ======== DELETAR (DELETE) ========
async function deletarEstoque() {
  if (!isAuthenticated()) {
    alert("Sessão expirada. Faça login novamente.");
    return;
  }

  if (!confirm("Deseja realmente deletar este estoque?")) return;

  try {
    carregando.value = true;

    await axios.delete(`https://localhost:8443/estoque/delete/${props.id}`, {
      headers: {
        Authorization: `Bearer ${user.value?.token}`,
      },
    });
  } catch (err) {
    console.error("Erro ao deletar estoque:", err);
    alert("Erro ao deletar estoque");
  } finally {
    first.value = false;
    carregando.value = false;
    atualizarEstoque();
  }
}
</script>

<template>
  <div class="h-64 w-64">
    <!-- Imagem -->
    <div v-if="!props.img" class="h-42 w-64 bg-amber-100 rounded-t-2xl" />
    <img
      v-else
      class="h-42 w-72 rounded-t-2xl object-cover"
      :src="props.img"
      :alt="props.name"
    />

    <!-- Corpo principal -->
    <div class="h-22 w-64 bg-orange-400">
      <UModal v-model:open="first" :title="props.name">
        <UButton
          class="ml-25 mt-12"
          label="Editar"
          color="neutral"
          variant="subtle"
          @click="first = true"
        />

        <template #body>
          <!-- Cabeçalho -->
          <div
            v-if="!props.filial"
            class="flex justify-around w-full border-b border-gray-300"
          >
            <div class="px-4 py-2 font-medium dark:text-white text-gray-700">
              Marca: {{ props.marca }}
            </div>
            <div
              class="py-2 text-center font-medium dark:text-white text-gray-700"
            >
              Validade:
              {{
                validade === "Sem validade"
                  ? "Sem validade"
                  : new Date(validade).toLocaleDateString("pt-BR")
              }}
            </div>
          </div>

          <!-- Imagem maior -->
          <div class="p-4">
            <div
              class="w-full h-32 bg-gray-200 border-2 border-blue-500 rounded flex items-center justify-center text-gray-400"
            >
              <img class="h-32 w-auto" :src="props.img" :alt="props.name" />
            </div>
          </div>

          <!-- Inputs de edição -->
          <div class="px-4 py-3">
            <label
              class="block text-sm font-medium text-gray-700 dark:text-white"
              >Quantidade:</label
            >
            <input
              type="number"
              v-model="quantidade"
              class="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />

            <select
              v-model="status"
              class="w-full mt-1 px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 light:bg-white dark:text-white"
            >
              <option value="Ok">Ok</option>
              <option value="Vencido">Vencido</option>
              <option value="Em falta">Em falta</option>
            </select>

            <label
              class="block text-sm font-medium text-gray-700 dark:text-white mt-3"
              >Validade:</label
            >
            <input
              type="date"
              v-model="validade"
              class="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <!-- Botões -->
          <div class="px-4 flex justify-center space-x-4 mb-4">
            <button
              class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              :disabled="carregando"
              @click="deletarEstoque"
            >
              {{ carregando ? "..." : "Deletar" }}
            </button>

            <button
              class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              :disabled="carregando"
              @click="salvarAlteracoes"
            >
              {{ carregando ? "Salvando..." : "Salvar" }}
            </button>
          </div>
        </template>
      </UModal>
    </div>
  </div>
</template>
