<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

// ---------- PROPS ----------
const props = defineProps<{
    idUsuario: number;
    nome: string;
    email: string;
    perfil: string;
    idPanificadora: number;
}>();

function gerarAvatares() {
  const seed = encodeURIComponent(props.nome);
  return `https://api.dicebear.com/8.x/lorelei/svg?seed=${seed}`;
}

const url = ref("");

    url.value = gerarAvatares();

const emit = defineEmits(["usuarioAlterado"]);

const modalAberto = ref(false);
const carregando = ref(false);

// ---------- CAMPOS EDITÁVEIS ----------
const editNome = ref(props.nome);
const editEmail = ref(props.email);
const editPerfil = ref(props.perfil);
const editPanificadora = ref(props.idPanificadora);

// Define as opções de perfil para o <select>
const perfilOptions = ["administrador", "funcionario", "gerente"];

// Atualiza lista no componente pai
function atualizarUsuarios() {
    emit("usuarioAlterado");
}

// ---------- SALVAR ALTERAÇÕES ----------
async function salvarAlteracoes() {
    try {
        carregando.value = true;

        const payload = {
            idUsuario: props.idUsuario,
            nome: editNome.value,
            email: editEmail.value,
            perfil: editPerfil.value,
            idPanificadora: editPanificadora.value,
        };

        const { data } = await axios.put(
            `http://localhost:8080/WebAproject2/GerenciarUsuario?idUsuario=${props.idUsuario}`,
            payload,
            { headers: { "Content-Type": "application/json" } }
        );

        if (data?.erro) {
            return;
        }

        modalAberto.value = false;
        atualizarUsuarios();
    } catch (err: any) {
        console.error("Erro ao atualizar usuário:", err);
    } finally {
        carregando.value = false;
    }
}

async function AtivarUsuario() {
    try {
        carregando.value = true;

        await axios.put(
            `http://localhost:8080/WebAproject2/GerenciarUsuario?acao=ativar&idUsuario=${props.idUsuario}`,
            {},
            { 
                params: { idUsuario: props.idUsuario }, 
                headers: { "Content-Type": "application/json" } 
            }
        );

        modalAberto.value = false;
        atualizarUsuarios();
    } catch (err: any) {
        console.error("Erro ao ativar usuário:", err);
    } finally {
        carregando.value = false;
    }
}

async function deletarUsuario() {
    try {
        carregando.value = true;

        const { data } = await axios.delete(
            "http://localhost:8080/WebAproject2/GerenciarUsuario",
            {
                params: { idUsuario: props.idUsuario },
                headers: { "Content-Type": "application/json" },
            }
        );

        if (data?.erro) {
            return;
        } else {
            modalAberto.value = false;
            atualizarUsuarios();
        }
    } catch (err: any) {
        console.error("Erro ao deletar usuário:", err);
    } finally {
        carregando.value = false;
    }
}
</script>

<template>
    <div
        class="group relative w-full rounded-lg shadow-md hover:shadow-xl transition overflow-hidden cursor-pointer bg-white dark:bg-zinc-900 border-2 border-transparent hover:border-blue-500"
        @click="modalAberto = true"
    >
        <div class="p-3 flex items-center gap-3">
            <div class="flex-shrink-0 h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-lg">
                          <UAvatar :src="url" size="xl" />
            </div>
            
            <div class="flex-1 min-w-0">
                <h3 class="text-base font-semibold text-gray-900 dark:text-white truncate">
                    {{ props.nome }}
                </h3>
                <p class="text-xs text-gray-600 dark:text-gray-300 truncate">
                    {{ props.email }}
                </p>
            </div>
            
            <div class="flex-shrink-0">
                 <span class="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {{ props.perfil }}
                </span>
            </div>
        </div>
    </div>

    <UModal v-model:open="modalAberto" :title="`Editar ${props.nome}`">
        <template #body>
            <div class="flex flex-col gap-4 p-4">
                <div>
                    <label class="text-sm font-medium text-gray-700 dark:text-gray-200">Nome</label>
                    <input
                        v-model="editNome"
                        type="text"
                        class="w-full mt-1 rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label class="text-sm font-medium text-gray-700 dark:text-gray-200">E-mail</label>
                    <input
                        v-model="editEmail"
                        type="email"
                        class="w-full mt-1 rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label class="text-sm font-medium text-gray-700 dark:text-gray-200">Perfil</label>
                    <select
                        v-model="editPerfil"
                        class="
                            w-full mt-1 
                            border border-gray-300 dark:border-gray-700 
                            bg-white dark:bg-gray-700 
                            text-gray-900 dark:text-white
                            rounded-lg shadow-sm
                            py-2 px-3
                            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                            transition duration-150 ease-in-out
                        "
                    >
                        <option v-for="perfil in perfilOptions" :key="perfil" :value="perfil">
                            {{ perfil.charAt(0).toUpperCase() + perfil.slice(1) }}
                        </option>
                    </select>
                </div>

                <div>
                    <label class="text-sm font-medium text-gray-700 dark:text-gray-200">ID Panificadora</label>
                    <input
                        v-model.number="editPanificadora"
                        type="number"
                        min="1"
                        class="w-full mt-1 rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div class="flex flex-col sm:flex-row justify-between gap-3 mt-4">
                    <button
                        class="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors w-full sm:w-auto"
                        :disabled="carregando"
                        @click.stop="deletarUsuario"
                    >
                        {{ carregando ? "..." : "Excluir" }}
                    </button>

                    <div class="flex gap-3 w-full sm:w-auto">
                        <button
                            class="flex-1 px-4 py-2 rounded-lg bg-gray-400 hover:bg-gray-500 text-white font-medium transition-colors"
                            :disabled="carregando"
                            @click.stop="modalAberto = false"
                        >
                            Cancelar
                        </button>

                        <button
                            class="flex-1 px-4 py-2 rounded-lg bg-gray-400 hover:bg-gray-500 text-white font-medium transition-colors"
                            :disabled="carregando"
                            @click.stop="AtivarUsuario"
                        >
                            Ativar
                        </button>

                        <button
                            class="flex-1 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
                            :disabled="carregando"
                            @click.stop="salvarAlteracoes"
                        >
                            {{ carregando ? "Salvando..." : "Salvar" }}
                        </button>
                    </div>
                </div>
            </div>
        </template>
    </UModal>
</template>