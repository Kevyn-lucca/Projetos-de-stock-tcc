<template>
  <div
    class="flex flex-col md:flex-row items-start md:items-center justify-start md:justify-center min-h-screen gap-4 p-4"
  >
    <TarefaPrincipal
      status="fazer"
      color="secondary"
      class="w-full md:w-auto"
      @drop-tarefa="moverTarefa"
    >
      <div class="flex items-center gap-2">
        <Icon
          class="h-5 w-5"
          name="lucide:clipboard-list"
          style="color: lightskyblue"
        />
        <h1 class="text-xl text-center">A Fazer</h1>
      </div>
      <tarefaBlock
        v-for="t in tarefas.filter((x) => x.status === 'fazer')"
        :key="t.id"
        :tarefa="t"
        draggable="true"
        class="hover:cursor-grab dragging:cursor-grabbing"
        @dragstart="onDragStart(t)"
      />
    </TarefaPrincipal>

    <TarefaPrincipal
      status="fazendo"
      color="warning"
      class="w-full md:w-auto border-t border-[#006d77]"
      @drop-tarefa="moverTarefa"
    >
      <div class="flex gap-2 items-center">
        <Icon class="h-5 w-5" name="lucide:loader" style="color: yellow" />
        <h1 class="text-xl text-center">Em Progresso</h1>
      </div>
      <tarefaBlock
        v-for="t in tarefas.filter((x) => x.status === 'fazendo')"
        :key="t.id"
        :tarefa="t"
        draggable="true"
        class="hover:cursor-grab [&.is-dragging]:cursor-grabbing"
        @dragstart="onDragStart(t)"
      />
    </TarefaPrincipal>

    <TarefaPrincipal
      status="feito"
      color="primary"
      class="w-full md:w-auto border-t border-[#006d77]"
      @drop-tarefa="moverTarefa"
    >
      <div class="flex items-center gap-2 ml-2">
        <Icon
          class="h-5 w-5"
          name="lucide:square-check-big"
          style="color: lightgreen"
        />
        <h1 class="text-xl text-center">Concluído</h1>
      </div>
      <tarefaBlock
        v-for="t in tarefas.filter((x) => x.status === 'feito')"
        :key="t.id"
        :tarefa="t"
        draggable="true"
        class="hover:cursor-grab [&.is-dragging]:cursor-grabbing"
        @dragstart="onDragStart(t)"
      />
    </TarefaPrincipal>
  </div>
</template>

<script setup>
import { ref } from "vue";

const tarefas = ref([
  {
    id: 1,
    titulo: "COMER UM PUDIM",
    mensagem: "TESTE DE UMA MESSAGEM MANEIRA",
    status: "fazer",
    color: "secondary",
  },
  {
    id: 2,
    titulo: "Avaliar trabalho",
    mensagem: "avaliar os trabalhos",
    status: "fazendo",
    color: "warning",
  },
  {
    id: 3,
    titulo: "Dar notas",
    mensagem: "dar uma nota 10 ao meu grupo (kevyn)",
    status: "feito",
    color: "primary",
  },
]);
definePageMeta({
  layout: "mobile",
});
const dragItem = ref(null);

function onDragStart(tarefa) {
  dragItem.value = tarefa;
}

function moverTarefa({ status, color }) {
  if (dragItem.value) {
    dragItem.value.status = status;
    dragItem.value.color = color;
  }
}
</script>

<style scoped>
.w-full {
  width: 100%;
}
</style>
