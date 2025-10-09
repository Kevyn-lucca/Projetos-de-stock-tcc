import { ref } from "vue";
import { useRouter, useNuxtApp } from "#app";

const user = ref(null);

export function useAuth() {
  const router = useRouter();
  const { $api } = useNuxtApp(); // pega o Axios injetado

  const login = async (email: string, senha: string) => {
    try {
      const res = await $api.post("/api/auth/login", { email, senha });
      user.value = res.data.usuario;
      return true;
    } catch {
      return false;
    }
  };

  const refreshToken = async () => {
    try {
      const res = await $api.post("/api/auth/refresh");
      return res.data.token; // retorna o novo access token
    } catch {
      user.value = null;
      router.push("/login");
      return null;
    }
  };

  const logout = async () => {
    await $api.post("/api/auth/logout");
    user.value = null;
    router.push("/login");
  };

  const isAuthenticated = () => !!user.value;

  return { user, login, refreshToken, logout, isAuthenticated };
}
