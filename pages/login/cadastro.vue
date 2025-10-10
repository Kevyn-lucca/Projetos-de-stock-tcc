<template>
  <div
    class="h-screen px-6 py-20 md:px-12 lg:px-20 flex items-center justify-center bg-[linear-gradient(-225deg,#10b981,#047857_48%,#065f46)]"
  >
    <div
      class="p-8 shadow text-center lg:w-[30rem] backdrop-blur-md rounded-xl bg-[rgba(255,255,255,0.06)]"
    >
      <div class="text-3xl font-medium mb-6 text-primary-contrast">
        Bem vindo
      </div>

      <form @submit.prevent="onSubmit" novalidate class="space-y-4">
        <input
          v-model="form.email"
          type="email"
          placeholder="E-mail"
          :class="inputClass"
          required
        />
        <input
          v-model="form.nome"
          type="text"
          placeholder="Nome"
          :class="inputClass"
        />
        <input
          v-model="form.senha"
          type="password"
          placeholder="Senha"
          :class="inputClass"
          required
        />
        <input
          v-model="form.confirmSenha"
          type="password"
          placeholder="Confirme sua senha"
          :class="inputClass"
          required
        />
        <input
          v-model="form.inviteToken"
          type="text"
          placeholder="Token de convite"
          :class="inputClass"
          required
        />

        <button
          type="submit"
          :disabled="submitting"
          class="max-w-40 w-full rounded-full border-0 p-4 text-xl font-medium bg-white/30 hover:bg-white/40 text-primary-contrast/80 disabled:opacity-50 transition"
        >
          <span v-if="!submitting">Cadastrar-se</span>
          <span v-else>Enviando...</span>
        </button>

        <p v-if="errorMessage" class="text-red-400 text-sm mt-2">
          {{ errorMessage }}
        </p>
        <p v-if="successMessage" class="text-green-400 text-sm mt-2">
          {{ successMessage }}
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
definePageMeta({ layout: false });

const form = ref({
  email: "",
  nome: "",
  senha: "",
  confirmSenha: "",
  inviteToken: "",
});

const submitting = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

const inputClass =
  "!appearance-none placeholder:!text-primary-contrast/40 !border-0 !p-4 !w-full !outline-0 !text-base !block !bg-white/10 active:bg-white/20 !text-primary-contrast/70 !rounded-full";

const { $api } = useNuxtApp();

async function onSubmit() {
  errorMessage.value = "";
  successMessage.value = "";

  if (
    !form.value.email.trim() ||
    !form.value.senha.trim() ||
    !form.value.inviteToken.trim()
  ) {
    errorMessage.value = "Preencha todos os campos obrigatórios.";
    return;
  }

  if (form.value.senha !== form.value.confirmSenha) {
    errorMessage.value = "As senhas não coincidem.";
    return;
  }

  submitting.value = true;

  try {
    const payload = {
      email: form.value.email.trim().toLowerCase(),
      nome: form.value.nome.trim() || null,
      senha: form.value.senha,
      inviteToken: form.value.inviteToken, // envia token para backend
    };

    console.log(payload);

    const res = await $api.post("/api/auth/registrar", payload, {
      headers: { "Content-Type": "application/json" },
    });

    if (res.data?.success) {
      successMessage.value =
        res.data.message || "Usuário cadastrado com sucesso!";
      form.value.senha = "";
      form.value.confirmSenha = "";
      form.value.inviteToken = "";
      setTimeout(() => navigateTo("/login"), 1200);
    } else {
      errorMessage.value = res.data?.message || "Erro ao cadastrar.";
    }
  } catch (err) {
    if (err.response?.data?.message) {
      errorMessage.value = err.response.data.message;
    } else if (err.message?.includes("Network")) {
      errorMessage.value = "Falha de conexão com o servidor.";
    } else {
      errorMessage.value = "Erro inesperado ao tentar registrar.";
    }
  } finally {
    submitting.value = false;
  }
}
</script>
