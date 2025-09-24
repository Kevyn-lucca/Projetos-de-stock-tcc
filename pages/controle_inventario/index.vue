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
        @click="MudarEstilo()"
      >
        {{ estiloNovo }}
      </UButton>
    </div>

    <div class="w-full px-4">
      <Transition name="fade" mode="out-in" appear>
        <section
          v-if="showColumn"
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 w-full"
        >
          <MainCard
            v-for="item in filteredData"
            :key="item.id"
            :img="item.img || ''"
            :name="item.nome"
            :filial="false"
            :vendas="item.vendas"
          />
        </section>

        <section v-else class="mt-10">
          <UTable
            :data="filteredData"
            :columns="columns"
            class="flex-1 w-full"
          />
        </section>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { h, resolveComponent, ref, computed } from "vue";
import type { TableColumn } from "@nuxt/ui";

const showColumn = ref(false);
const estiloNovo = ref("Blocos");
const searchTerm = ref(""); // Novo estado reativo para o termo de busca

function MudarEstilo() {
  showColumn.value = !showColumn.value;
  estiloNovo.value = estiloNovo.value === "Tabela" ? "Blocos" : "Tabela";
}

const UBadge = resolveComponent("UBadge");
const UIcon = resolveComponent("UIcon"); // Garantindo que o UIcon esteja resolvido

type Produtos = {
  id: string;
  nome: string;
  marca: string;
  validade: string;
  status: "ok" | "falta" | "reabastecimento";
  img: string;
  vendas: number;
  quantidade: number;
};

// NOTA PARA A API: usei nomes de produtos mais realistas para testar a busca.
const data = ref<Produtos[]>([
  {
    id: "4600",
    nome: "Notebook Gamer Pro",
    marca: "TechCorp",
    validade: "2024-03-11T15:30:00",
    status: "ok",
    img: "",
    vendas: 2,
    quantidade: 594,
  },
  {
    id: "4599",
    nome: "Smartphone Android X",
    marca: "MobilePlus",
    validade: "2024-03-11T10:10:00",
    status: "falta",
    img: "",
    vendas: 2,
    quantidade: 276,
  },
  {
    id: "4598",
    nome: "Mouse Pad Grande",
    marca: "GearUp",
    validade: "2024-03-11T08:50:00",
    status: "reabastecimento",
    img: "",
    vendas: 2,
    quantidade: 315,
  },
  {
    id: "4597",
    nome: "Teclado Mecânico RGB",
    marca: "TechCorp",
    validade: "2024-03-10T19:45:00",
    img: "",
    status: "ok",
    vendas: 2,
    quantidade: 529,
  },
  {
    id: "4596",
    nome: "Monitor 4K Ultra Wide",
    marca: "ViewMax",
    validade: "2024-03-10T15:55:00",
    img: "",
    status: "ok",
    vendas: 2,
    quantidade: 639,
  },
]);

const filteredData = computed(() => {
  if (!searchTerm.value) {
    return data.value;
  }

  const searchLower = searchTerm.value.toLowerCase();

  return data.value.filter((item) => {
    // Aplica o filtro no campo 'nome'
    return item.nome.toLowerCase().includes(searchLower);
  });
});

const columns: TableColumn<Produtos>[] = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => `#${row.getValue("id")}`,
  },
  {
    accessorKey: "nome",
    header: "Nome",
  },
  {
    accessorKey: "marca",
    header: "Marca",
  },
  {
    accessorKey: "validade",
    header: "Validade",
    cell: ({ row }) => {
      return new Date(row.getValue("validade")).toLocaleString("pt-BR", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
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
    accessorKey: "vendas",
    header: "Vendas",
  },
  {
    accessorKey: "quantidade",
    header: () => h("div", { class: "text-right" }, "Quantidade"),
    cell: ({ row }) => {
      const quantidade = Number.parseInt(row.getValue("quantidade"));

      return h("div", { class: "text-right font-medium" }, quantidade);
    },
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
