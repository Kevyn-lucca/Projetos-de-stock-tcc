<script setup lang="ts">
const filiais = [
  {
    id: 1,
    nome: "Filial Centro",
    data: "15/03/2018",
    vendas: 15420,
    img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&auto=format&fit=crop&q=60",
    filial: true,
  },
  {
    id: 2,
    nome: "Filial Norte",
    data: "07/11/2019",
    vendas: 9870,
    img: "https://images.unsplash.com/photo-1529429617124-95b109e86bb8?w=500&auto=format&fit=crop&q=60",
    filial: true,
  },
  {
    id: 3,
    nome: "Filial Sul",
    data: "22/06/2020",
    vendas: 12340,
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&auto=format&fit=crop&q=60",
    filial: true,
  },
  {
    id: 4,
    nome: "Filial Leste",
    data: "10/02/2021",
    vendas: 8450,
    img: "https://images.unsplash.com/photo-1560184897-ae75f4184934?w=500&auto=format&fit=crop&q=60",
    filial: true,
  },
  {
    id: 5,
    nome: "Filial Oeste",
    data: "30/09/2022",
    vendas: 6920,
    img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500&auto=format&fit=crop&q=60",
    filial: true,
  },
  {
    id: 6,
    nome: "Filial Aeroporto",
    data: "18/05/2023",
    vendas: 4310,
    img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=500&auto=format&fit=crop&q=60",
    filial: true,
  },
];

definePageMeta({
  layout: "mobile",
});
</script>

<template>
  <div class="flex flex-col items-center w-full p-4">
    <!-- Título -->
    <div
      class="bg-white rounded-xl w-full max-w-md text-center h-auto p-4 shadow-md"
    >
      <h1 class="text-2xl md:text-4xl font-bold text-black">
        Filiais disponíveis
      </h1>
    </div>

    <!-- Grid responsivo de filiais -->
    <section class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 w-full max-w-md">
      <MainCard
        v-for="filial in filiais"
        :key="filial.id"
        :img="filial.img"
        :name="filial.nome"
        :filial="filial.filial"
        :vendas="filial.vendas"
      />
    </section>
  </div>
</template>

<style scoped>
/* opcional: animação fade para os cards */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
