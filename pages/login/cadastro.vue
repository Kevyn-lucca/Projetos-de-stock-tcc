<template>
  <div
    class="h-screen px-6 py-20 md:px-12 lg:px-20 flex items-center justify-center bg-[linear-gradient(-225deg,#10b981,#047857_48%,#065f46)]"
  >
    <div
      class="p-8 shadow text-center lg:w-[30rem] backdrop-blur-md rounded-xl bg-[rgba(255,255,255,0.06)]"
    >
      <div class="text-3xl font-medium mb-6 text-primary-contrast">Login</div>

      <form @submit.prevent="onSubmit" novalidate class="space-y-4">
        <input
          v-model="form.email"
          type="email"
          placeholder="E-mail"
          :class="inputClass"
          required
        />
        <input
          v-model="form.senha"
          type="password"
          placeholder="Senha"
          :class="inputClass"
          required
        />

        <button
          type="submit"
          :disabled="submitting"
          class="max-w-40 w-full rounded-full border-0 p-4 text-xl font-medium bg-white/30 hover:bg-white/40 text-primary-contrast/80 disabled:opacity-50 transition"
        >
          <span v-if="!submitting">Entrar</span>
          <span v-else>Entrando...</span>
        </button>

        <p v-if="errorMessage" class="text-red-400 text-sm mt-2">
          {{ errorMessage }}
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuth } from "@/composables/useAuth";

definePageMeta({ layout: false });

const form = ref({ email: "", senha: "" });
const submitting = ref(false);
const errorMessage = ref("");

const inputClass =
  "!appearance-none placeholder:!text-primary-contrast/40 !border-0 !p-4 !w-full !outline-0 !text-base !block !bg-white/10 active:bg-white/20 !text-primary-contrast/70 !rounded-full";

const { login } = useAuth();

async function onSubmit() {
  errorMessage.value = "";

  if (!form.value.email.trim() || !form.value.senha.trim()) {
    errorMessage.value = "Preencha todos os campos.";
    return;
  }

  submitting.value = true;
  try {
    const sucesso = await login(
      form.value.email.trim(),
      form.value.senha.trim()
    );
    if (sucesso) {
      navigateTo("/controle_inventario");
    } else {
      errorMessage.value = "Usuário ou senha incorretos.";
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    errorMessage.value = err.message || "Erro ao tentar login.";
  } finally {
    submitting.value = false;
  }
}
</script>
