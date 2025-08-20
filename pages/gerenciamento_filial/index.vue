<template>
  <div class="overflow-hidden flex flex-col items-center w-full h-auto">
    <div class="rounded-xl bg-white text-center h-14 mt-4 w-74">
      <h1 class="p-2 text-black text-center text-4xl">Filiais disponíveis</h1>
    </div>
    <div>
      <section class="grid grid-cols-2 gap-x-32 gap-y-10 mt-16">
        <MainCard
          v-for="i in 6"
          :key="i"
          :img="'https://images.unsplash.com/photo-1594161433013-43d02893c83d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJha2VyeXN8ZW58MHx8MHx8fDA%3D'"
        />
      </section>
    </div>
  </div>
</template>

<script setup></script>
