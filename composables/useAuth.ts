// composables/useAuth.ts
import { ref } from "vue";
import { useRouter, useNuxtApp } from "#app";

interface Usuario {
  id: number;
  nome: string;
  email: string;
  perfil: string;
  idPanificadora?: number | null;
  token: string;
}

const user = ref<Usuario | null>(null);
let interceptorsConfigured = false;

export function useAuth() {
  const router = useRouter();
  const { $api } = useNuxtApp();

  if (!interceptorsConfigured && $api) {
    $api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          user.value = null;
          router.push("/login");
        }
        return Promise.reject(error);
      }
    );
    interceptorsConfigured = true;
  }

  const login = async (email: string, senha: string) => {
    try {
      const res = await $api.post("/api/auth/login", { email, senha });
      if (res.data?.success && res.data.usuario) {
        user.value = res.data.usuario;
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const refreshToken = async () => {
    try {
      const res = await $api.post("/api/auth/refresh");
      if (res.data?.token && user.value) {
        user.value.token = res.data.token;
      }
      return res.data.token;
    } catch {
      user.value = null;
      router.push("/login");
      return null;
    }
  };

  const logout = async () => {
    try {
      await $api.post("/api/auth/logout", null, {
        headers: { Authorization: `Bearer ${user.value?.token}` },
      });
    } catch {
      console.warn("erro ao realizar logout");
    } finally {
      user.value = null;
      router.push("/login");
    }
  };

  const isAuthenticated = () => !!user.value?.token;

  return { user, login, refreshToken, logout, isAuthenticated };
}
