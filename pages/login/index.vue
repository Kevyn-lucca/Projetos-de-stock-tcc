<!-- eslint-disable no-undef -->
<template>
  <div
    class="h-screen px-6 py-20 md:px-12 lg:px-20 flex items-center justify-center bg-[linear-gradient(-225deg,#10b981,#047857_48%,#065f46)]"
  >
    <div
      class="p-12 shadow text-center lg:w-[30rem] backdrop-blur-md rounded-xl bg-[rgba(255,255,255,0.1)]"
    >
      <div class="text-4xl font-medium mb-12 text-primary-contrast">
        Bem vindo
      </div>

      <input
        v-model="email"
        type="text"
        class="!appearance-none placeholder:!text-primary-contrast/40 !border-0 !p-4 !w-full !outline-0 !text-xl !block !mb-6 !bg-white/10 active:bg-white/20 !text-primary-contrast/70 !rounded-full"
        placeholder="E-mail"
      />

      <input
        v-model="senha"
        type="password"
        class="!appearance-none placeholder:!text-primary-contrast/40 !border-0 !p-4 !w-full !outline-0 !text-xl !mb-6 !bg-white/10 active:bg-white/20 !text-primary-contrast/70 !rounded-full"
        placeholder="Senha"
      />

      <button
        type="button"
        class="max-w-40 w-full rounded-full appearance-none border-0 p-4 outline-0 text-xl mb-6 font-medium bg-white/30 hover:bg-white/40 active:bg-white/20 text-primary-contrast/80 cursor-pointer transition-colors duration-150"
        @click="handleLogin"
      >
        Fazer login
      </button>

      <p v-if="errorMessage" class="text-red-500 mb-4">{{ errorMessage }}</p>

      <a
        class="cursor-pointer font-medium block text-center text-primary-contrast"
        >Esqueceu a senha?</a
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "~/composables/useAuth";

definePageMeta({ layout: false });

const email = ref("");
const senha = ref("");
const errorMessage = ref("");

const router = useRouter();
const { login } = useAuth();

const handleLogin = async () => {
  errorMessage.value = "";
  const success = await login(email.value, senha.value);
  if (success) {
    console.log("entrei");
    router.push("/controle_inventario");
  } else {
    errorMessage.value = "Email ou senha inválidos";
  }
};
</script>
