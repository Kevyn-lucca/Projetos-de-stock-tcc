<template>
  <div class="overflow-hidden flex flex-col items-center w-full h-auto">
    <div
      class="w-full sm:w-96 mx-auto mt-6 flex flex-row gap-4 items-center px-4 sm:px-0"
    >
      <div class="relative flex-grow">
        <UIcon
          name="i-lucide-search"
          class="absolute inset-y-0 left-0 my-auto ml-3 w-5 h-5 text-gray-400"
        />
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Pesquisar itens"
          class="w-full h-12 pl-10 pr-4 text-lg placeholder-gray-500 border border-gray-300 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 hover:border-gray-400"
        />
      </div>

      <UButton
        size="lg"
        variant="solid"
        :color="showColumn ? 'primary' : 'success'"
        class="flex-shrink-0"
        @click="MudarEstilo"
      >
        {{ estiloNovo }}
      </UButton>
      <UModal v-model:open="open" title="Novo estoque">
        <UButton
          size="lg"
          variant="solid"
          class="flex-shrink-0"
          color="primary"
          @click="open = true"
        >
          Novo Estoque
        </UButton>
        <template #body>
          <div class="px-4 dark:text-white py-3 flex flex-col gap-4">
            <div class="flex flex-col">
              <label class="text-sm font-medium">Produto:</label>
              <select v-model="novoItem.idProduto" class="input-base">
                <option
                  v-for="produto in Produtos"
                  :key="produto.id"
                  :value="produto.id"
                >
                  {{ produto.nome }}
                </option>
              </select>
            </div>

            <div class="flex dark:text-white flex-col">
              <label class="text-sm font-medium">Quantidade:</label>
              <input
                v-model.number="novoItem.quantidade"
                type="number"
                class="input-base"
                placeholder="Digite a quantidade"
              />
            </div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-white mt-3"
              >Validade:</label
            >
            <input
              v-model="novoItem.validade"
              type="date"
              class="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <div class="flex flex-col">
              <label class="text-sm dark:text-white font-medium">Status:</label>
              <select
                v-model="novoItem.status"
                class="w-full mt-1 px-3 py-2 hover:bg-gray-900 focus:ring-blue-500 focus:border-blue-500 light:text-black hover:text-white text-white light:bg-white"
              >
                <option value="Ok">Ok</option>
                <option value="Vencido">Vencido</option>
                <option value="Em falta">Em falta</option>
              </select>
            </div>
          </div>

          <div class="mt-4 flex justify-end gap-2">
            <UButton variant="solid" color="success" @click="criarEstoque">
              Salvar
            </UButton>
          </div>
        </template>
      </UModal>
    </div>

    <div class="w-full px-4">
      <Transition name="fade" mode="out-in" appear>
        <section
          v-if="showColumn"
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 w-full"
        >
          <MainCard
            v-for="item in filteredData"
            :id="item.id"
            :key="item.id"
            :img="item.img"
            :name="item.nome"
            :marca="item.marca"
            :validade="item.validade"
            :quantidade="item.quantidade"
            :status="item.status"
            :filial="false"
            :ProdutosId="item.IdProduto"
            @estoque-alterado="fetchEstoque"
          />
        </section>

        <!-- TABELA -->
        <section v-else class="mt-10">
          <UTable
            :data="filteredData"
            :columns="columns"
            class="flex-1 w-full"
          />
        </section>
      </Transition>

      <div v-if="loading" class="text-center text-gray-500 mt-8">
        Carregando estoque...
      </div>
      <div v-if="error" class="text-center text-red-500 mt-8">
        {{ error }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { h, resolveComponent, ref, computed, onMounted } from "vue";
import type { TableColumn } from "@nuxt/ui";
import MainCard from "@/components/MainCard.vue";
import { useAuth } from "@/composables/useAuth";
import { useNuxtApp } from "#app";

const { user } = useAuth();
const { $api } = useNuxtApp();

const showColumn = ref(false);
const estiloNovo = ref("Blocos");
const searchTerm = ref("");
const loading = ref(true);
const error = ref<string | null>(null);

const UBadge = resolveComponent("UBadge");
const UIcon = resolveComponent("UIcon");

type ProdutoAPI = {
  idEstoque: number;
  produto: {
    idProduto: number;
    nome: string;
    marca: string;
    categoria: string;
    unidadeMedida: string;
    perecivel: boolean;
  };
  idPanificadora: number;
  quantidade: number;
  dataValidade?: string | null;
  status: string;
};

type ProdutoFront = {
  id: string;
  nome: string;
  marca: string;
  validade: string;
  status: string;
  img: string;
  quantidade: number;
  IdProduto: number;
};

type Produto = {
  id: number;
  nome: string;
  marca: string;
};

const open = ref(false);
const Produtos = ref<Produto[]>([]);
const data = ref<ProdutoFront[]>([]);

function MudarEstilo() {
  showColumn.value = !showColumn.value;
  estiloNovo.value = estiloNovo.value === "Tabela" ? "Blocos" : "Tabela";
}

const fetchEstoque = async () => {
  loading.value = true;
  error.value = null;

  try {
    const res = await $api.get(
      "http://localhost:8080/WebAproject2/gerenciarEstoque?acao=listar"
    );

    // Ajuste do mapeamento conforme o JSON
    data.value = res.data.map((item: ProdutoAPI) => ({
      id: String(item.idEstoque),
      nome: item.produto?.nome || "Desconhecido",
      marca: item.produto?.marca || "Indefinida",
      validade: item.dataValidade || "Sem validade",
      status:
        item.status?.toUpperCase() === "ATIVO"
          ? "ok"
          : item.status?.toLowerCase() || "indefinido",
      img:
        "/produtos/" +
        (item.produto?.nome?.toLowerCase().replace(/\s+/g, "-") || "default") +
        ".png",
      quantidade: item.quantidade,
      IdProduto: item.produto?.idProduto,
    }));
  } catch (err) {
    console.error("Erro na requisição:", err);
  } finally {
    loading.value = false;
  }
};

const novoItem = ref({
  idProduto: null,
  quantidade: 0,
  status: "Ok",
  validade: "",
  idPanificadora: user.value?.idPanificadora,
});

const criarEstoque = async () => {
  if (!novoItem.value.idProduto) {
    alert("Selecione um produto.");
    return;
  }

  try {
    const params = new URLSearchParams();
    params.append("idProduto", String(novoItem.value.idProduto));
    params.append("quantidade", String(novoItem.value.quantidade));
    params.append("dataValidade", novoItem.value.validade || "");
    params.append("status", novoItem.value.status);
    params.append("idPanificadora", String(user.value?.idPanificadora || 1));

    await $api.post(
      "http://localhost:8080/WebAproject2/gerenciarEstoque",
      params
    );

    await fetchEstoque();
  } catch (err) {
    console.error("Erro ao criar estoque:", err);
    alert("Erro ao criar estoque. Confira os dados e tente novamente.");
  }
};

const fetchProduto = async () => {
  loading.value = true;
  error.value = null;

  try {
    const res = await $api.get(
      "http://localhost:8080/WebAproject2/gerenciarProduto?acao=listar"
    );

    // tipo correto para o retorno da API
    type ProdutoAPIResponse = {
      idProduto: number;
      nome: string;
      categoria: string;
      unidadeMedida: string;
      perecivel: boolean;
      marca: string;
    };

    const produtosAPI: ProdutoAPIResponse[] = res.data;

    Produtos.value = produtosAPI.map((item) => ({
      id: item.idProduto,
      nome: item.nome,
      marca: item.marca,
    }));
  } catch (err) {
    error.value = "Erro ao carregar produtos.";
    console.error("Erro ao carregar produtos:", err);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchProduto);
onMounted(fetchEstoque);

const filteredData = computed(() => {
  if (!searchTerm.value) return data.value;
  const s = searchTerm.value.toLowerCase();
  return data.value.filter((item) => item.nome.toLowerCase().includes(s));
});

const columns: TableColumn<ProdutoFront>[] = [
  { accessorKey: "id", header: "#" },
  { accessorKey: "nome", header: "Nome" },
  { accessorKey: "marca", header: "Marca" },
  {
    accessorKey: "validade",
    header: "Validade",
    cell: ({ row }) => {
      const validade = row.getValue("validade");
      if (validade === "Sem validade") return validade;
      return new Date(String(validade)).toLocaleDateString("pt-BR");
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const color =
        row.getValue("status") === "ok"
          ? "success"
          : row.getValue("status") === "falta"
          ? "error"
          : "warning";
      return h(UBadge, { class: "capitalize", variant: "subtle", color }, () =>
        row.getValue("status")
      );
    },
  },
  {
    accessorKey: "quantidade",
    header: () => h("div", { class: "text-right" }, "Quantidade"),
    cell: ({ row }) =>
      h("div", { class: "text-right font-medium" }, row.getValue("quantidade")),
  },
];
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
