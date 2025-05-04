<template>
  <div class="overflow-hidden flex flex-col items-center w-full h-auto">
    <div class="w-80 mx-auto mt-6 flex flex-row gap-4">
      <div
        class="rounded-2xl bg-white shadow-md hover:shadow-lg transition-all duration-300"
      >
        <input
          type="text"
          placeholder="Pesquisar itens"
          class="w-full h-14 px-4 text-black text-2xl placeholder-gray-400 focus:outline-none focus:ring-2 rounded-2xl"
        />
      </div>
      <UButton @click="MudarEstilo()" size="md" variant="ghost">
        {{ estiloNovo }}</UButton
      >
    </div>
    <div>
      <Transition name="fade" mode="out-in" appear>
        <section
          v-if="showColumn"
          class="grid grid-cols-3 gap-x-32 gap-y-10 mt-16"
        >
          <MainCard v-for="i in 6" :key="i" />
        </section>
        <section v-else class="mt-16">
          <UTable :data="data" :columns="columns" class="flex-1" />
        </section>
      </Transition>
    </div>
  </div>
</template>

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

<script setup lang="ts">
let showColumn = ref(false);
let estiloNovo = ref("Blocos");
function MudarEstilo() {
  showColumn.value = !showColumn.value;
  estiloNovo.value = estiloNovo.value === "Tabela" ? "Blocos" : "Tabela";
}

import { h, resolveComponent } from "vue";
import type { TableColumn } from "@nuxt/ui";

const UBadge = resolveComponent("UBadge");

type Produtos = {
  id: string;
  nome: string;
  marca: string;
  validade: string;
  status: "ok" | "falta" | "reabastecimento";
  vendas: number;
  quantidade: number;
};

//NOTA PARA A API: esse é o estilo de json que tem que chegar dela.
const data = ref<Produtos[]>([
  {
    id: "4600",
    nome: "teste",
    marca: "teste marca",
    validade: "2024-03-11T15:30:00",
    status: "ok",
    vendas: 2,
    quantidade: 594,
  },
  {
    id: "4599",
    nome: "teste",
    marca: "teste marca",
    validade: "2024-03-11T10:10:00",
    status: "falta",
    vendas: 2,
    quantidade: 276,
  },
  {
    id: "4598",
    nome: "teste",
    marca: "teste marca",
    validade: "2024-03-11T08:50:00",
    status: "reabastecimento",
    vendas: 2,
    quantidade: 315,
  },
  {
    id: "4597",
    nome: "teste",
    marca: "teste marca",
    validade: "2024-03-10T19:45:00",
    status: "ok",
    vendas: 2,
    quantidade: 529,
  },
  {
    id: "4596",
    nome: "teste",
    marca: "teste marca",
    validade: "2024-03-10T15:55:00",
    status: "ok",
    vendas: 2,
    quantidade: 639,
  },
]);

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
        reabastecimento: "neutral" as const,
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
