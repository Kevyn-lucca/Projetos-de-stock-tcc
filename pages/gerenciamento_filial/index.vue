<template>
  <div class="overflow-hidden flex flex-col items-center w-full h-auto">
    <div class="rounded-xl bg-white text-center h-14 mt-4 w-74">
      <h1 class="p-2 text-black text-center text-4xl">Filiais disponíveis</h1>
    </div>
    <div>
      <section class="grid grid-cols-2 gap-x-32 gap-y-10 mt-16">
        <MainCard v-for="i in 6" :key="i" />
      </section>
    </div>
  </div>
</template>

<script setup></script>
