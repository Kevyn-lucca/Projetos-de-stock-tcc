<template>
  <div class="overflow-hidden flex flex-col items-center w-full h-auto">
    <!-- Barra de pesquisa e botão -->
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
    </div>

    <div class="w-full px-4">
      <Transition name="fade" mode="out-in" appear>
        <!-- BLOCO (MainCard) -->
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
            :vendas="item.vendas"
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

      <!-- Mensagens -->
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
    id: number;
    nome: string;
    marca: string;
  };
  quantidade: number;
  dataValidade: string | null;
  status: string;
};

type ProdutoFront = {
  id: string;
  nome: string;
  marca: string;
  validade: string;
  status: "ok" | "falta" | "reabastecimento";
  img: string;
  vendas: number;
  quantidade: number;
};

const data = ref<ProdutoFront[]>([]);

function MudarEstilo() {
  showColumn.value = !showColumn.value;
  estiloNovo.value = estiloNovo.value === "Tabela" ? "Blocos" : "Tabela";
}

const fetchEstoque = async () => {
  loading.value = true;
  error.value = null;

  try {
    const res = await $api.get("https://localhost:8443/estoque", {
      headers: {
        Authorization: `Bearer ${user.value?.token}`,
      },
    });

    data.value = res.data.map((item: ProdutoAPI) => ({
      id: String(item.idEstoque),
      nome: item.produto?.nome || "Desconhecido",
      marca: item.produto?.marca || "Indefinida",
      validade: item.dataValidade ?? "Sem validade",
      status: item.status?.toLowerCase() || "ok",
      img:
        "/produtos/" +
        (item.produto?.nome?.toLowerCase().replace(/\s+/g, "-") || "default") +
        ".png",
      vendas: Math.floor(Math.random() * 50), // valor fictício temporário
      quantidade: item.quantidade,
    }));
  } catch (err) {
    error.value = "Erro ao carregar estoque.";
    console.error("Erro na requisição:", err);
  } finally {
    loading.value = false;
  }
};

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
      const color = {
        ok: "success" as const,
        falta: "error" as const,
        reabastecimento: "warning" as const,
      }[row.getValue("status") as string];
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
