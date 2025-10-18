<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { useAuth } from "@/composables/useAuth";

const { user, isAuthenticated } = useAuth();

const props = defineProps<{
  id: number;
  nome: string;
  email: string;
  perfil: string;
  id_panificadora: number;
}>();

const emit = defineEmits(["usuarioAlterado"]);

const modalAberto = ref(false);
const carregando = ref(false);

const editNome = ref(props.nome);
const editEmail = ref(props.email);
const editPerfil = ref(props.perfil);
const editPanificadora = ref(props.id_panificadora);

function atualizarUsuarios() {
  emit("usuarioAlterado");
}

async function salvarAlteracoes() {
  if (!isAuthenticated()) {
    alert("Sessão expirada. Faça login novamente.");
    return;
  }

  try {
    carregando.value = true;

    const payload = {
      nome: editNome.value,
      email: editEmail.value,
      perfil: editPerfil.value,
      id_panificadora: editPanificadora.value,
    };

    await axios.put(
      `https://localhost:8443/usuarios/update/${props.id}`,
      payload,
      { headers: { Authorization: `Bearer ${user.value?.token}` } }
    );

    modalAberto.value = false;
    atualizarUsuarios();
    alert("Usuário atualizado com sucesso!");
  } catch (err: unknown) {
    console.error("Erro ao atualizar usuário:", err);
    alert("Erro ao atualizar usuário!");
  } finally {
    carregando.value = false;
  }
}

async function deletarUsuario() {
  if (!isAuthenticated()) {
    alert("Sessão expirada. Faça login novamente.");
    return;
  }
  console.log(props.id);

  try {
    carregando.value = true;

    await axios.delete(`https://localhost:8443/usuarios/delete/${props.id}`, {
      headers: { Authorization: `Bearer ${user.value?.token}` },
    });

    modalAberto.value = false;
    atualizarUsuarios();
    alert("Usuário deletado com sucesso!");
  } catch (err: unknown) {
    console.error("Erro ao deletar usuário:", err);
    alert("Erro ao deletar usuário!");
  } finally {
    carregando.value = false;
  }
}

// Lifecycle
</script>

<template>
  <!-- Card do Usuário -->
  <div
    class="group relative w-64 rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden cursor-pointer bg-white dark:bg-zinc-900 border-2 border-transparent hover:border-blue-500"
    @click="modalAberto = true"
  >
    <div
      class="h-44 w-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400 text-sm"
    >
      <div class="text-center">
        <div class="text-4xl mb-2">👤</div>
        <div>{{ props.nome }}</div>
      </div>
    </div>

    <div class="p-4 flex flex-col gap-2">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white truncate">
        {{ props.nome }}
      </h3>
      <p class="text-sm text-gray-600 dark:text-gray-300 truncate">
        {{ props.email }}
      </p>
      <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
        Perfil: {{ props.perfil }}
      </p>
      <p class="text-xs text-gray-500 dark:text-gray-400">
        Panificadora: {{ props.id_panificadora }}
      </p>
    </div>
  </div>

  <!-- Modal de edição -->
  <UModal v-model:open="modalAberto" :title="`Editar ${props.nome}`">
    <template #body>
      <div class="flex flex-col gap-4 p-4">
        <!-- Nome -->
        <div>
          <label class="text-sm font-medium text-gray-700 dark:text-gray-200">
            Nome
          </label>
          <input
            v-model="editNome"
            type="text"
            class="w-full mt-1 rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <!-- Email -->
        <div>
          <label class="text-sm font-medium text-gray-700 dark:text-gray-200">
            E-mail
          </label>
          <input
            v-model="editEmail"
            type="email"
            class="w-full mt-1 rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <!-- Perfil -->
        <div>
          <label class="text-sm font-medium text-gray-700 dark:text-gray-200">
            Perfil
          </label>
          <select
            v-model="editPerfil"
            class="w-full mt-1 rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="Administrador">Administrador</option>
            <option value="Admin">Admin</option>
            <option value="Funcionario">Funcionario</option>
            <option value="funcionario">funcionario</option>
            <option value="Gerente">Gerente</option>
          </select>
        </div>

        <!-- Panificadora -->
        <div>
          <label class="text-sm font-medium text-gray-700 dark:text-gray-200">
            ID Panificadora
          </label>
          <input
            v-model.number="editPanificadora"
            type="number"
            min="1"
            class="w-full mt-1 rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <!-- Botões -->
        <div class="flex justify-between gap-3 mt-4">
          <button
            class="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors"
            :disabled="carregando"
            @click="deletarUsuario"
          >
            {{ carregando ? "..." : "Excluir" }}
          </button>

          <div class="flex gap-3">
            <button
              class="px-4 py-2 rounded-lg bg-gray-400 hover:bg-gray-500 text-white font-medium transition-colors"
              :disabled="carregando"
              @click="modalAberto = false"
            >
              Cancelar
            </button>
            <button
              class="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
              :disabled="carregando"
              @click="salvarAlteracoes"
            >
              {{ carregando ? "Salvando..." : "Salvar" }}
            </button>
          </div>
        </div>
      </div>
    </template>
  </UModal>
</template>
