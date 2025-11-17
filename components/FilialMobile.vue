<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

const props = defineProps<{
    id: number;
    nome: string;
    cnpj: string;
    endereco: string;
    telefone: string;
    ativo: boolean;
}>();

const modalAberto = ref(false);
const carregando = ref(false);

const editNome = ref(props.nome);
const editCnpj = ref(props.cnpj);
const editEndereco = ref(props.endereco);
const editTelefone = ref(props.telefone);

const emit = defineEmits(["filialAlterada"]);

function atualizarFilial() {
    emit("filialAlterada");
}

async function salvarAlteracoes() {
    try {
        carregando.value = true;

        const payload = {
            idPanificadora: props.id,
            nome: editNome.value,
            cnpj: editCnpj.value,
            endereco: editEndereco.value,
            telefone: editTelefone.value,
            desativado: !props.ativo, 
        };

        await axios.put(
            "http://localhost:8080/WebAproject2/GerenciarPanificadora",
            payload
        );
        
        modalAberto.value = false;
        atualizarFilial();
    } catch (err: any) {
        console.error("Erro ao atualizar filial:", err);
    } finally {
        carregando.value = false;
    }
}

async function toggleStatusFilial() {
    try {
        carregando.value = true;
        
        const novoStatusDesativado = props.ativo;

        const payload = {
            idPanificadora: props.id,
            desativado: novoStatusDesativado,
        };

        await axios.put(
            "http://localhost:8080/WebAproject2/GerenciarPanificadora",
            payload
        );
        
        modalAberto.value = false;
        atualizarFilial();
    } catch (err: any) {
        console.error("Erro ao alterar status da filial:", err);
    } finally {
        carregando.value = false;
    }
}
</script>

<template>
    <div
        class="group relative w-full rounded-lg shadow-md hover:shadow-lg transition cursor-pointer p-3 flex items-center gap-4"
        :class="
            props.ativo
                ? 'bg-white dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 hover:border-blue-500'
                : 'bg-red-50 dark:bg-red-900 border border-red-300 hover:border-red-500'
        "
        @click="modalAberto = true"
    >
        <div class="flex-shrink-0 text-3xl">
            🏭
        </div>

        <div class="flex-1 min-w-0">
            <h3 class="text-base font-semibold text-gray-900 dark:text-white truncate">
                {{ props.nome }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 truncate">
                {{ props.endereco }}
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
                Tel: {{ props.telefone }}
            </p>
        </div>

        <div
            class="flex-shrink-0 px-2 py-0.5 text-xs font-semibold rounded-full self-start mt-1"
            :class="
                props.ativo ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
                            : 'bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-100'
            "
        >
            {{ props.ativo ? "Ativa" : "Inativa" }}
        </div>
    </div>

    <UModal v-model:open="modalAberto" :title="`Editar ${props.nome}`" class="w-full sm:w-auto">
        <template #body>
            <div class="flex flex-col gap-4 p-4">
                
                <div>
                    <label class="text-sm font-medium text-gray-700 dark:text-gray-200">Nome</label>
                    <input
                        v-model="editNome"
                        type="text"
                        class="w-full mt-1 rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                </div>

                <div>
                    <label class="text-sm font-medium text-gray-700 dark:text-gray-200">CNPJ</label>
                    <input
                        v-model="editCnpj"
                        type="text"
                        class="w-full mt-1 rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                </div>

                <div>
                    <label class="text-sm font-medium text-gray-700 dark:text-gray-200">Endereço</label>
                    <input
                        v-model="editEndereco"
                        type="text"
                        class="w-full mt-1 rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                </div>

                <div>
                    <label class="text-sm font-medium text-gray-700 dark:text-gray-200">Telefone</label>
                    <input
                        v-model="editTelefone"
                        type="text"
                        class="w-full mt-1 rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                </div>

                <div class="flex flex-col gap-3 mt-4">
                    <button
                        class="w-full px-4 py-2 rounded-lg font-medium transition-colors justify-center"
                        :class="
                            props.ativo
                                ? 'bg-red-500 hover:bg-red-600 text-white'
                                : 'bg-green-500 hover:bg-green-600 text-white'
                        "
                        :disabled="carregando"
                        @click="toggleStatusFilial"
                    >
                        {{ carregando ? "..." : props.ativo ? "Desativar Filial" : "Reativar Filial" }}
                    </button>

                    <div class="flex gap-3 w-full">
                        <button
                            class="flex-1 px-4 py-2 rounded-lg bg-gray-400 hover:bg-gray-500 text-white font-medium"
                            :disabled="carregando"
                            @click="modalAberto = false"
                        >
                            Cancelar
                        </button>
                        <button
                            class="flex-1 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium"
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