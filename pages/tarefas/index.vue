<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen gap-6 bg-gray-100 dark:bg-zinc-900"
  >
    <h1 class="text-3xl font-bold text-gray-800 dark:text-white mt-6 mb-4">
      Quadro de Tarefas
    </h1>

    <!-- Botão de adicionar tarefa -->
    <button
      class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
      @click="abrirModal"
    >
      + Nova Tarefa
    </button>

    <!-- Modal de criação -->
    <UModal v-model:open="modalAberto" title="Adicionar nova tarefa">
      <template #body>
        <div class="p-4 flex flex-col gap-4">
          <!-- Título -->
          <label class="text-sm font-medium text-gray-700 dark:text-gray-200">
            Título
          </label>
          <input
            v-model="novaTarefa.titulo"
            type="text"
            placeholder="Título da tarefa"
            class="input-base"
          />

          <label class="text-sm font-medium text-gray-700 dark:text-gray-200">
            Mensagem
          </label>
          <textarea
            v-model="novaTarefa.mensagem"
            placeholder="Descrição da tarefa"
            class="input-base"
          ></textarea>

          <div v-if="user.value?.perfil !== 'funcionario'">
            <select v-model="novaTarefa.idUsuario" class="input-base">
              <option disabled value="">Selecione o usuário</option>
              <option
                v-for="u in usuarios"
                :key="u.idUsuario"
                :value="u.idUsuario"
              >
                {{ u.nome }} - {{ u.perfil }}
              </option>
            </select>
          </div>

          <div class="flex justify-end gap-3 mt-4">
            <button
              class="px-4 py-2 rounded-lg bg-gray-400 hover:bg-gray-500 text-white font-medium transition-colors"
              @click="fecharModal"
            >
              Cancelar
            </button>
            <button
              class="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
              @click="criarTarefa"
            >
              Salvar
            </button>
          </div>
        </div>
      </template>
    </UModal>

    <!-- Kanban -->
    <div class="flex flex-wrap justify-center gap-6 w-full px-6">
      <!-- Coluna: Fazer -->
      <TarefaPrincipal status="fazer" color="secondary" @drop-tarefa="mover">
        <div class="flex items-center gap-2 mb-3">
          <Icon
            class="h-5 w-5"
            name="lucide:clipboard-list"
            style="color: lightskyblue"
          />
          <h1 class="text-xl font-semibold text-gray-800 dark:text-white">
            Fazer
          </h1>
        </div>
        <tarefaBlock
          v-for="t in tarefas.filter((x) => x.status === 'fazer')"
          :key="t.idTarefa"
          :tarefa="t"
          draggable="true"
          class="hover:cursor-grab active:cursor-grabbing"
          @dragstart="onDragStart(t)"
        />
      </TarefaPrincipal>

      <!-- Coluna: Fazendo -->
      <TarefaPrincipal status="fazendo" color="warning" @drop-tarefa="mover">
        <div class="flex items-center gap-2 mb-3">
          <Icon class="h-5 w-5" name="lucide:loader" style="color: gold" />
          <h1 class="text-xl font-semibold text-gray-800 dark:text-white">
            Fazendo
          </h1>
        </div>
        <tarefaBlock
          v-for="t in tarefas.filter((x) => x.status === 'fazendo')"
          :key="t.idTarefa"
          :tarefa="t"
          draggable="true"
          class="hover:cursor-grab active:cursor-grabbing"
          @dragstart="onDragStart(t)"
        />
      </TarefaPrincipal>

      <!-- Coluna: Feito -->
      <TarefaPrincipal status="feito" color="primary" @drop-tarefa="mover">
        <div class="flex items-center gap-2 mb-3">
          <Icon
            class="h-5 w-5"
            name="lucide:square-check-big"
            style="color: lightgreen"
          />
          <h1 class="text-xl font-semibold text-gray-800 dark:text-white">
            Feito
          </h1>
        </div>
        <tarefaBlock
          v-for="t in tarefas.filter((x) => x.status === 'feito')"
          :key="t.idTarefa"
          :tarefa="t"
          draggable="true"
          class="hover:cursor-grab active:cursor-grabbing"
          @dragstart="onDragStart(t)"
        />
      </TarefaPrincipal>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useAuth } from "@/composables/useAuth";
import { useTarefas } from "@/composables/useTarefas";
import TarefaPrincipal from "@/components/TarefaPrincipal.vue";
import tarefaBlock from "@/components/tarefaBlock.vue";

const { user } = useAuth();
const { tarefas, moverTarefa, carregarTarefas, adicionarTarefa } = useTarefas();

const dragItem = ref(null);
const modalAberto = ref(false);
const usuarios = ref([]);

const novaTarefa = ref({
  titulo: "",
  mensagem: "",
  idUsuario: "",
});

function abrirModal() {
  modalAberto.value = true;
}

function fecharModal() {
  modalAberto.value = false;
  novaTarefa.value = { titulo: "", mensagem: "", idUsuario: "" };
}

async function criarTarefa() {
  if (!novaTarefa.value.titulo || !novaTarefa.value.mensagem) {
    alert("Preencha todos os campos!");
    return;
  }

  if (user.value?.perfil === "funcionario") {
    novaTarefa.value.idUsuario = user.value.id;
  }

  await adicionarTarefa(novaTarefa.value);
  fecharModal();
}

// --- Drag and Drop ---
function onDragStart(tarefa) {
  dragItem.value = tarefa;
}
function mover({ status, color }) {
  moverTarefa({ status, color }, dragItem);
}

// --- Buscar todos os usuários da tabela ---
async function carregarUsuarios() {
  try {
    const res = await axios.get(
      "http://localhost:8080/WebAproject2/GerenciarUsuario?acao=listar"
    );
    usuarios.value = res.data;
  } catch (err) {
    console.error("Erro ao buscar usuários:", err);
  }
}

onMounted(() => {
  carregarUsuarios();
  carregarTarefas();
});
</script>
