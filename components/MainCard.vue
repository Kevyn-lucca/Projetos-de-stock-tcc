<script setup lang="ts">
const props = defineProps<{
  id: string | number;
  img: string;
  name: string;
  marca: string;
  filial: boolean;
  vendas: number;
  validade: string;
  quantidade: number;
  status: string;
}>();
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
      <UModal :title="props.name">
        <UButton
          class="ml-25 mt-12"
          label="Editar"
          color="neutral"
          variant="subtle"
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
                props.validade === "Sem validade"
                  ? "Sem validade"
                  : new Date(props.validade).toLocaleDateString("pt-BR")
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

          <!-- Botões -->
          <div class="px-4 flex justify-center space-x-4 mb-4">
            <button
              class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Deletar
            </button>
            <button
              class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Salvar
            </button>
          </div>

          <!-- Info detalhada -->
          <div v-if="!props.filial" class="px-4 py-3">
            <h3
              class="text-center text-lg font-semibold dark:text-white text-gray-700"
            >
              {{ props.name }}
            </h3>
            <div
              class="mt-2 flex justify-between text-sm dark:text-white text-gray-700"
            >
              <span>Quantidade: {{ props.quantidade }}</span>
              <span
                >Validade:
                {{
                  props.validade === "Sem validade"
                    ? "—"
                    : new Date(props.validade).toLocaleDateString("pt-BR")
                }}</span
              >
              <span>Vendas: {{ props.vendas }}</span>
            </div>
          </div>

          <!-- Modo Filial -->
          <div v-else class="px-4 py-3 ml-8 flex place-content-center">
            <div
              class="hover:border-b-2 hover:border-blue-500 mt-2 flex justify-center w-auto dark:text-white text-gray-700"
            >
              <span>Vendas:</span>
              &nbsp;&nbsp;
              <input
                type="text"
                class="focus:outline-none w-18 focus:border-none bg-transparent"
                :value="props.vendas"
              />
            </div>
          </div>
        </template>
      </UModal>
    </div>
  </div>
</template>
