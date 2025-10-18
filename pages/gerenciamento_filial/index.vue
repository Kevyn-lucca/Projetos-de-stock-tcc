<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { useAuth } from "@/composables/useAuth";
import MainFilial from "@/components/MainFilial.vue";

const { user, isAuthenticated } = useAuth();
const filiais = ref<
  Array<{
    id: number;
    nome: string;
    cnpj: string;
    endereco: string;
    telefone: string;
    ativo: boolean;
  }>
>([]);
const carregando = ref(false);
const modalAdicionar = ref(false);
const novaFilialNome = ref("");
const novaFilialCnpj = ref("");
const novaFilialEndereco = ref("");
const novaFilialTelefone = ref("");

async function carregarFiliais() {
  if (!isAuthenticated()) return;

  carregando.value = true;
  try {
    const res = await axios.get("https://localhost:8443/panificadora", {
      headers: { Authorization: `Bearer ${user.value?.token}` },
    });
    filiais.value = res.data;
  } catch (err) {
    console.error("Erro ao carregar filiais:", err);
    alert("Erro ao carregar filiais");
  } finally {
    carregando.value = false;
  }
}

async function adicionarFilial() {
  if (!isAuthenticated()) {
    alert("Sessão expirada. Faça login novamente.");
    return;
  }

  carregando.value = true;
  try {
    await axios.post(
      "https://localhost:8443/panificadora/adicionar",
      {
        nome: novaFilialNome.value,
        cnpj: novaFilialCnpj.value,
        endereco: novaFilialEndereco.value,
        telefone: novaFilialTelefone.value,
        ativo: true,
      },
      { headers: { Authorization: `Bearer ${user.value?.token}` } }
    );
    alert("Filial adicionada com sucesso!");
    // Limpar campos
    novaFilialNome.value = "";
    novaFilialCnpj.value = "";
    novaFilialEndereco.value = "";
    novaFilialTelefone.value = "";
    modalAdicionar.value = false;
    carregarFiliais();
  } catch (err) {
    console.error("Erro ao adicionar filial:", err);
    alert("Erro ao adicionar filial");
  } finally {
    carregando.value = false;
  }
}

onMounted(() => {
  carregarFiliais();
});
</script>

<template>
  <div class="flex flex-col items-center w-full h-auto">
    <div class="rounded-xl bg-white text-center h-14 mt-4 w-auto">
      <h1 class="p-2 text-black text-center text-4xl">Filiais disponíveis</h1>
    </div>

    <div class="mt-4">
      <button
        class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium"
        @click="modalAdicionar = true"
      >
        Adicionar Filial
      </button>
    </div>

    <!-- Grid de filiais -->
    <section class="grid grid-cols-2 gap-x-32 gap-y-10 mb-4 mt-6">
      <MainFilial
        v-for="filial in filiais"
        :id="filial.id"
        :key="filial.id"
        :nome="filial.nome"
        :cnpj="filial.cnpj"
        :ativo="filial.ativo"
        :endereco="filial.endereco"
        :telefone="filial.telefone"
        @filial-alterada="carregarFiliais"
      />
    </section>

    <UModal v-model:open="modalAdicionar" title="Adicionar nova filial">
      <template #body>
        <div class="flex flex-col gap-4 p-4">
          <div>
            <label class="text-sm font-medium text-gray-700 dark:text-gray-200"
              >Nome</label
            >
            <input
              v-model="novaFilialNome"
              type="text"
              class="w-full mt-1 rounded-lg border px-3 py-2 outline-none"
              placeholder="Digite o nome da filial"
            />
          </div>
          <div>
            <label class="text-sm font-medium text-gray-700 dark:text-gray-200"
              >CNPJ</label
            >
            <input
              v-model="novaFilialCnpj"
              type="text"
              class="w-full mt-1 rounded-lg border px-3 py-2 outline-none"
              placeholder="Digite o CNPJ"
            />
          </div>
          <div>
            <label class="text-sm font-medium text-gray-700 dark:text-gray-200"
              >Endereço</label
            >
            <input
              v-model="novaFilialEndereco"
              type="text"
              class="w-full mt-1 rounded-lg border px-3 py-2 outline-none"
              placeholder="Digite o endereço"
            />
          </div>
          <div>
            <label class="text-sm font-medium text-gray-700 dark:text-gray-200"
              >Telefone</label
            >
            <input
              v-model="novaFilialTelefone"
              type="text"
              class="w-full mt-1 rounded-lg border px-3 py-2 outline-none"
              placeholder="Digite o telefone"
            />
          </div>
          <div class="flex justify-end gap-3 mt-4">
            <button
              class="px-4 py-2 rounded-lg bg-gray-400 hover:bg-gray-500 text-white font-medium"
              @click="modalAdicionar = false"
            >
              Cancelar
            </button>
            <button
              class="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium"
              :disabled="carregando || !novaFilialNome.trim()"
              @click="adicionarFilial"
            >
              {{ carregando ? "Salvando..." : "Salvar" }}
            </button>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>
