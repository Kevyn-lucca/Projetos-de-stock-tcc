<template>
  <div>
    <header
      class="w-full h-20 bg-amber-100 relative flex items-center justify-between"
    >
      <div class="absolute left-6 -bottom-4 z-10">
        <button
          class="bg-white border-2 border-black rounded-full w-10 h-10 flex items-center justify-center shadow-md"
        >
          <Icon name="mdi-light:plus" style="color: black" />
        </button>
      </div>

      <div class="w-10" />

      <div class="flex items-center gap-4 mr-12">
        <Icon name="mdi-light:clock" size="28" style="color: black" />
        <Icon name="mdi-light:share-variant" size="28" style="color: black" />
      </div>
    </header>
    <div>
      <section>
        <div
          v-for="i in 4"
          :key="i"
          class="text-center bg-neutral-500 w-full mt-16 h-20"
        >
          GRAFICO
        </div>
      </section>
    </div>
  </div>
</template>
