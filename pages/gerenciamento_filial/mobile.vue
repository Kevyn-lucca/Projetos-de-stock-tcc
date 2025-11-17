<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
definePageMeta({
    layout: "mobile",
});


import FilialMobile from "@/components/FilialMobile.vue";

const filiais = ref<
    Array<{
        id: number;
        nome: string;
        cnpj: string;
        endereco: string;
        telefone: string;
        ativo: boolean;
    }>
>([]);

const carregando = ref(false);
const modalAdicionar = ref(false);
const novaFilialNome = ref("");
const novaFilialCnpj = ref("");
const novaFilialEndereco = ref("");
const novaFilialTelefone = ref("");

interface PanificadoraResponse {
    idPanificadora: number;
    nome: string;
    cnpj: string;
    endereco: string;
    telefone: string;
    desativado: boolean;
}
async function carregarFiliais() {
    carregando.value = true;
    try {
        const res = await axios.get(
            "http://localhost:8080/WebAproject2/GerenciarPanificadora?acao=listar"
        );

        filiais.value = (res.data as PanificadoraResponse[]).map((f) => ({
            id: f.idPanificadora,
            nome: f.nome,
            cnpj: f.cnpj,
            endereco: f.endereco,
            telefone: f.telefone,
            ativo: !f.desativado,
        }));
    } catch (err) {
        console.error("Erro ao carregar filiais:", err);
    } finally {
        carregando.value = false;
    }
}

async function adicionarFilial() {
    carregando.value = true;
    try {
        await axios.post("http://localhost:8080/WebAproject2/GerenciarPanificadora", {
            nome: novaFilialNome.value,
            cnpj: novaFilialCnpj.value,
            endereco: novaFilialEndereco.value,
            telefone: novaFilialTelefone.value,
            desativado: false,
        });

        // Limpar campos
        novaFilialNome.value = "";
        novaFilialCnpj.value = "";
        novaFilialEndereco.value = "";
        novaFilialTelefone.value = "";
        
        modalAdicionar.value = false;
        await carregarFiliais();
    } catch (err) {
        console.error("Erro ao adicionar filial:", err);
    } finally {
        carregando.value = false;
    }
}

onMounted(() => {
    carregarFiliais();
});
</script>

<template>
    <div class="flex flex-col items-center w-full min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
        
        <header class="w-full text-center py-4 mb-4">
            <h1 class="text-3xl font-bold text-gray-800 dark:text-white">
                Filiais Disponíveis
            </h1>
        </header>

        <div class="w-full mb-6">
            <button
                class="w-full px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors shadow-md"
                @click="modalAdicionar = true"
            >
                Adicionar Nova Filial
            </button>
        </div>

        <div v-if="carregando" class="text-gray-500 dark:text-gray-400 p-8">
            Carregando filiais...
        </div>

        <section 
            v-else-if="filiais.length"
            class="grid grid-cols-1 gap-4 w-full max-w-lg mx-auto"
        >
            <FilialMobile
                v-for="filial in filiais"
                :id="filial.id"
                :key="filial.id"
                :nome="filial.nome"
                :cnpj="filial.cnpj"
                :ativo="filial.ativo"
                :endereco="filial.endereco"
                :telefone="filial.telefone"
                @filial-alterada="carregarFiliais"
            />
        </section>
        
        <div v-else class="text-gray-500 dark:text-gray-400 p-8">
            Nenhuma filial encontrada. Adicione uma para começar!
        </div>

        <UModal v-model:open="modalAdicionar" title="Adicionar Nova Filial">
            <template #body>
                <div class="flex flex-col gap-4 p-4">
                    
                    <div>
                        <label class="text-sm font-medium text-gray-700 dark:text-gray-200">
                            Nome
                        </label>
                        <input
                            v-model="novaFilialNome"
                            type="text"
                            class="w-full mt-1 rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="Digite o nome da filial"
                        />
                    </div>

                    <div>
                        <label class="text-sm font-medium text-gray-700 dark:text-gray-200">
                            CNPJ
                        </label>
                        <input
                            v-model="novaFilialCnpj"
                            type="text"
                            class="w-full mt-1 rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="Digite o CNPJ"
                        />
                    </div>

                    <div>
                        <label class="text-sm font-medium text-gray-700 dark:text-gray-200">
                            Endereço
                        </label>
                        <input
                            v-model="novaFilialEndereco"
                            type="text"
                            class="w-full mt-1 rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="Digite o endereço"
                        />
                    </div>

                    <div>
                        <label class="text-sm font-medium text-gray-700 dark:text-gray-200">
                            Telefone
                        </label>
                        <input
                            v-model="novaFilialTelefone"
                            type="text"
                            class="w-full mt-1 rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="Digite o telefone"
                        />
                    </div>

                    <div class="flex gap-3 mt-4 w-full">
                        <button
                            class="flex-1 px-4 py-2 rounded-lg bg-gray-400 hover:bg-gray-500 text-white font-medium"
                            @click="modalAdicionar = false"
                        >
                            Cancelar
                        </button>

                        <button
                            class="flex-1 px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium"
                            :disabled="carregando || !novaFilialNome.trim()"
                            @click="adicionarFilial"
                        >
                            {{ carregando ? "Salvando..." : "Salvar" }}
                        </button>
                    </div>
                </div>
            </template>
        </UModal>
    </div>
</template>