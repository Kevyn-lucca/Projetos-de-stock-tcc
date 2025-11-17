<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useColorMode } from "#imports";
import { useAuth } from "@/composables/useAuth"; 
import UsuarioMobile from "@/components/UsuarioMobile.vue";

definePageMeta({
    layout: "mobile",
});

const color = useColorMode();
const { user } = useAuth();
const isAdmin = computed(() => user.value?.perfil !== "funcionario"); 

const isOpen = ref(false);
const modalTitle = ref("");
const carregando = ref(false);

const usuarios = ref<
    Array<{
        idUsuario: number;
        nome: string;
        email: string;
        perfil: string;
        idPanificadora: number;
    }>
>([]);

// Campos de token
const tokenGerado = ref("");
const gerandoToken = ref(false);
const perfilToken = ref("funcionario");
const panificadoraToken = ref(1);


function changemode() {
    color.preference = color.value === "light" ? "dark" : "light";
}

function openModal(title: string) {
    modalTitle.value = title;
    isOpen.value = true;
}

async function carregarUsuarios() {
    try {
        carregando.value = true;
        

        const res = await axios.get("http://localhost:8080/WebAproject2/GerenciarUsuario?acao=listar");
        usuarios.value = res.data;
    } catch (err) {
        console.error("Erro ao buscar usuários:", err);
    } finally {
        carregando.value = false;
    }
}

async function gerarToken() {
    try {
        gerandoToken.value = true;
    
        const res = await axios.post(
            "http://localhost:8080/WebAproject2/GerenciarUsuario?acao=gerarToken",
            { perfil: perfilToken.value, idPanificadora: panificadoraToken.value }
        );
        tokenGerado.value = res.data.token;
    } catch (err) {
        console.error("Erro ao gerar token:", err);
        alert("Falha ao gerar token.");
    } finally {
        gerandoToken.value = false;
    }
}

const groups = computed(() => [
    {
        id: "configs1",
        label: "Configurações de usuário",
        items: [
            { label: "Perfil", icon: "i-lucide-user", onSelect: () => openModal("Perfil") },
            { label: "Plano", icon: "i-lucide-credit-card", onSelect: () => openModal("Plano") },
            { label: "Segurança", icon: "i-lucide-lock", onSelect: () => openModal("Segurança") },
        ],
    },
    {
        id: "configs2",
        label: "Ambiente",
        items: [
            { label: "Formas de pagamento", icon: "i-lucide-credit-card", onSelect: () => openModal("Formas de pagamento") },
            { label: "Notificações", icon: "i-lucide-bell", onSelect: () => openModal("Notificações") },
            { label: "Mudar modo", icon: "i-lucide-lightbulb", onSelect: changemode },
        ],
    },
]);

onMounted(carregarUsuarios);
</script>

<template>
    <div class="p-4">
        <div class="mb-4">
            <UCommandPalette
                :groups="groups"
                placeholder="Pesquisar..."
                class="w-full"
            />

            <UButton
                v-if="isAdmin"
                icon="i-lucide-rocket"
                size="lg"
                color="primary"
                variant="solid"
                class="mt-4 w-full justify-center"
                @click="() => openModal('Gerenciar usuários')"
            >
                Gerenciar usuários
            </UButton>
        </div>

        <UModal v-model:open="isOpen" :title="modalTitle" class="w-full h-full sm:w-auto sm:h-auto">
            <template #body>
                <div class="p-4 sm:p-6">
                    <p v-if="modalTitle !== 'Gerenciar usuários'">
                        Esses itens não serão implementados para a versão de demonstração.
                    </p>

                    <div v-else>
                        <div v-if="carregando" class="p-4 text-center">
                            Carregando usuários...
                        </div>

                        <div
                            v-else
                            class="grid grid-cols-1 gap-4 p-2 sm:grid-cols-2"
                        >
                            <UsuarioMobile 
                                v-for="usuario in usuarios" 
                                :key="usuario.idUsuario" 
                                :id-usuario="usuario.idUsuario"
                                :nome="usuario.nome"
                                :email="usuario.email"
                                :perfil="usuario.perfil"
                                :id-panificadora="usuario.idPanificadora"
                                
                                @usuario-alterado="carregarUsuarios"
                            />
                        </div>

                        <div
                            v-if="isAdmin"
                            class="border-t border-gray-300 dark:border-gray-700 mt-6 pt-6 flex flex-col gap-4"
                        >
                            <h2 class="text-lg font-semibold text-gray-800 dark:text-white">
                                Gerar Token para Cadastro
                            </h2>

                            <div class="flex flex-col gap-4">
                                <div class="flex flex-col">
                                    <label class="text-sm font-medium">Perfil</label>
                                    
                                    <select
                                        v-model="perfilToken"
                                        class="
                                            mt-1 w-full 
                                            border border-gray-300 dark:border-gray-700 
                                            bg-white dark:bg-gray-900 
                                            text-gray-900 dark:text-white
                                            rounded-md shadow-sm
                                            py-2.5 px-4
                                            focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                                            transition duration-150 ease-in-out
                                        "
                                    >
                                        <option value="administrador">Administrador</option>
                                        <option value="funcionario">Funcionário</option>
                                    </select>
                                </div>

                                <div class="flex flex-col">
                                    <label class="text-sm font-medium">ID Panificadora</label>
                                    <UInput
                                        v-model="panificadoraToken"
                                        type="number"
                                        min="1"
                                        placeholder="Ex: 1"
                                        class="mt-1"
                                    />
                                </div>
                            </div>

                            <div class="flex flex-col gap-3 items-stretch">
                                <UButton
                                    color="secondary"
                                    icon="i-lucide-key-round"
                                    :loading="gerandoToken"
                                    @click="gerarToken"
                                    size="lg"
                                    class="w-full justify-center"
                                >
                                    {{ gerandoToken ? "Gerando..." : "Gerar Token" }}
                                </UButton>

                                <UInput
                                    v-model="tokenGerado"
                                    readonly
                                    placeholder="Token gerado aparecerá aqui"
                                    class="w-full text-xs"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </UModal>
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>