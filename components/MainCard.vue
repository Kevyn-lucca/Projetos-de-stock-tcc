<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { useAuth } from "@/composables/useAuth";

const first = ref(false);
const carregando = ref(false);

const props = defineProps<{
  id: string | number;
  img: string;
  name: string;
  marca: string;
  validade: string;
  quantidade: number;
  status: string;
  ProdutosId: number;
}>();

const quantidade = ref(props.quantidade);
const validade = ref(props.validade);
const status = ref(props.status);

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
      dataValidade: validade.value === "Sem validade" ? null : validade.value,
      status: status.value,
      idEstoque: Number(props.id),
      idProduto: Number(props.ProdutosId),
      idPanificadora: user.value?.idPanificadora,
    };

    await axios.put(
      `https://localhost:8443/estoque/update/${props.id}`,
      payload,
      {
        headers: { Authorization: `Bearer ${user.value?.token}` },
      }
    );
  } catch (err) {
    console.error("Erro ao atualizar estoque:", err);
    alert("Erro ao atualizar estoque");
  } finally {
    carregando.value = false;
    first.value = false;
    atualizarEstoque();
  }
}

async function deletarEstoque() {
  if (!isAuthenticated()) {
    alert("Sessão expirada. Faça login novamente.");
    return;
  }

  try {
    carregando.value = true;

    await axios.delete(`https://localhost:8443/estoque/delete/${props.id}`, {
      headers: { Authorization: `Bearer ${user.value?.token}` },
    });
  } catch (err) {
    console.error("Erro ao deletar estoque:", err);
    alert("Erro ao deletar estoque");
  } finally {
    carregando.value = false;
    first.value = false;
    atualizarEstoque();
  }
}
</script>

<template>
  <div
    class="group relative w-64 rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden bg-white dark:bg-zinc-900"
  >
    <!-- Imagem do produto -->
    <img
      v-if="props.img"
      :src="props.img"
      :alt="props.name"
      class="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105"
    />
    <div
      v-else
      class="h-44 w-full bg-gradient-to-br from-orange-200 to-yellow-200 flex items-center justify-center text-gray-400 text-sm"
    >
      Sem imagem
    </div>

    <!-- Informações principais -->
    <div class="p-4 flex flex-col gap-2">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
        {{ props.name }}
      </h3>
      <p class="text-sm text-gray-500 dark:text-gray-300">
        Marca: {{ props.marca }}
      </p>
      <p class="text-sm text-gray-500 dark:text-gray-300">
        Validade:
        {{
          validade === "Sem validade"
            ? "Sem validade"
            : new Date(
                new Date(validade).setDate(new Date(validade).getDate() + 1)
              ).toLocaleDateString("pt-BR")
        }}
      </p>
      <p class="text-sm text-gray-500 dark:text-gray-300">
        Quantidade: {{ quantidade }}
      </p>

      <UButton
        class="w-full mt-3"
        color="neutral"
        variant="subtle"
        label="Editar"
        @click="first = true"
      />
    </div>

    <!-- MODAL -->
    <UModal v-model:open="first" :title="`Editar ${props.name}`">
      <template #body>
        <div class="flex flex-col gap-4 p-4">
          <!-- Imagem -->
          <div
            class="w-full h-40 border rounded-xl flex items-center justify-center overflow-hidden"
          >
            <img
              v-if="props.img"
              :src="props.img"
              :alt="props.name"
              class="h-full object-cover"
            />
            <span v-else class="text-gray-400">Sem imagem</span>
          </div>

          <!-- Campos -->
          <div>
            <label class="text-sm font-medium text-gray-700 dark:text-gray-200">
              Quantidade
            </label>
            <input
              v-model="quantidade"
              type="number"
              class="w-full mt-1 rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
            />
          </div>

          <div>
            <label class="text-sm font-medium text-gray-700 dark:text-gray-200">
              Status
            </label>
            <select
              v-model="status"
              class="w-full mt-1 rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
            >
              <option value="Ok">Ok</option>
              <option value="Vencido">Vencido</option>
              <option value="Em falta">Em falta</option>
            </select>
          </div>

          <div>
            <label class="text-sm font-medium text-gray-700 dark:text-gray-200">
              Validade
            </label>
            <input
              v-model="validade"
              type="date"
              class="w-full mt-1 rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
            />
          </div>
        </div>

        <!-- Botões -->
        <div class="flex justify-end gap-3 px-4 pb-4 mt-2">
          <button
            class="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition"
            :disabled="carregando"
            @click="deletarEstoque"
          >
            {{ carregando ? "..." : "Deletar" }}
          </button>

          <button
            class="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium transition"
            :disabled="carregando"
            @click="salvarAlteracoes"
          >
            {{ carregando ? "Salvando..." : "Salvar" }}
          </button>
        </div>
      </template>
    </UModal>
  </div>
</template>
