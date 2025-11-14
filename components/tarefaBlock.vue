<template>
  <div
    class="blocoTarefa border-2 rounded border-blue-300 mt-2 flex justify-between flex-col relative bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm"
  >
  

    <!-- Cabeçalho da tarefa -->
    <div class="itemTarefa">
      <h1 class="font-semibold text-lg">{{ tarefa.titulo }}</h1>
      <UBadge :color="tarefa.color || 'blue'">
        #{{ tarefa.idTarefa || tarefa.id }}
      </UBadge>
    </div>

    <!-- Corpo da tarefa -->
    <div id="textoTarefa" class="mt-2">
      <p class="text-sm leading-snug">
        {{ tarefa.mensagem }}
      </p>
    </div>

    <!-- Rodapé -->
  <div class="itemTarefa mt-3 flex items-center justify-between p-2 rounded-lg border border-gray-200">
  <div class="flex items-center space-x-3">
    <UAvatar
      :src="tarefa.avatar || 'https://api.dicebear.com/7.x/initials/svg?seed=' + (tarefa.nomeUsuario || 'User')"
      size="md"
    />
    <span class="text-xs text-gray-500">{{ tarefa.dataCriacao }}</span>
  </div>

  <button
    class="btnExcluir text-gray-400 hover:text-red-500 transition"
    @click="deletarTarefa"
    title="Excluir tarefa"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
</div>

  </div>
</template>

<script setup>
import axios from "axios";
const props = defineProps({
  tarefa: {
    type: Object,
    required: true,
    default: () => ({
      idTarefa: "",
      titulo: "",
      color: "",
      mensagem: "",
      data: "",
      avatar: "",
      nomeUsuario: "",
    }),
  },
});


//imagem do usuario tá bugando
const emit = defineEmits(["tarefaExcluida"]);

async function deletarTarefa() {
  if (
    !confirm(
      `Tem certeza que deseja excluir a tarefa "${props.tarefa.titulo}"?`
    )
  ) {
    return;
  }

  try {
    const res = await axios.delete(
      `http://localhost:8080/WebAproject2/GerenciarTarefa?idTarefa=${props.tarefa.idTarefa || props.tarefa.id}`
    );

    if (res.status === 200) {
      emit("tarefaExcluida", props.tarefa.idTarefa || props.tarefa.id);
    } else {
      alert("Não foi possível excluir a tarefa.");
    }
  } catch (err) {
    console.error("Erro ao excluir tarefa:", err);
    alert("Erro ao excluir a tarefa. Verifique o console para mais detalhes.");
  }
}

function formatarData(data) {
  if (!data) return "";
  const d = new Date(data);
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
</script>

<style scoped>
.itemTarefa {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#textoTarefa {
  display: flex;
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}

.blocoTarefa {
  position: relative;
  width: 100%;
  max-width: 300px;
  min-height: 120px;
  padding: 10px;
  border-radius: 12px;
  transition: transform 0.1s ease-in-out;
}
.blocoTarefa:hover {
  transform: scale(1.02);
}

.btnExcluir {
  background: none;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
}
</style>
