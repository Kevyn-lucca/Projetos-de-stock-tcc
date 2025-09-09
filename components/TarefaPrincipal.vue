<template>
  <div
    class="TarefaPrincipal pl-2 pb-2 min-h-[300px]"
    @dragover.prevent
    @drop="onDrop"
  >
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  status: String,
  color: String,
});
const emit = defineEmits(["drop-tarefa"]);

function onDrop() {
  emit("drop-tarefa", { status: props.status, color: props.color });
}
</script>

<style scoped>
.TarefaPrincipal {
  width: 20rem;
  display: flex;
  flex-direction: column;
}
</style>
