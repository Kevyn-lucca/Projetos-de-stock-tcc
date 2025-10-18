<template>
  <div class="flex items-center justify-center h-screen gap-4">
    <TarefaPrincipal status="fazer" color="secondary" @drop-tarefa="mover">
      <div class="flex items-center gap-2">
        <Icon
          class="h-5 w-5"
          name="lucide:clipboard-list"
          style="color: lightskyblue"
        />
        <h1 class="text-xl text-center">Fazer</h1>
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

    <TarefaPrincipal status="fazendo" color="warning" @drop-tarefa="mover">
      <div class="flex gap-2 items-center">
        <Icon class="h-5 w-5" name="lucide:loader" style="color: yellow" />
        <h1 class="text-xl text-center">Fazendo</h1>
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

    <TarefaPrincipal status="feito" color="primary" @drop-tarefa="mover">
      <div class="flex items-center gap-2 ml-2">
        <Icon
          class="h-5 w-5"
          name="lucide:square-check-big"
          style="color: lightgreen"
        />
        <h1 class="text-xl text-center">Feito</h1>
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
import { useTarefas } from "@/composables/useTarefas";

const { tarefas, moverTarefa } = useTarefas();
const dragItem = ref(null);

function onDragStart(tarefa) {
  dragItem.value = tarefa;
}

function mover({ status, color }) {
  moverTarefa({ status, color }, dragItem);
}
</script>
