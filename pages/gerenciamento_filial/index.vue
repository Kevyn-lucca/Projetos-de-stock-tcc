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
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdYeB7u23Ycsufn4SfO3eCL44IKV-Mcvrcog&s",
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
</script>

<template>
  <div class="overflow-hidden flex flex-col items-center w-full h-auto">
    <div class="rounded-xl bg-white text-center h-14 mt-4 w-auto">
      <h1 class="p-2 text-black text-center text-4xl">Filiais disponíveis</h1>
    </div>
    <div>
      <section class="grid grid-cols-2 gap-x-32 gap-y-10 mb-4 mt-16">
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
  </div>
</template>
