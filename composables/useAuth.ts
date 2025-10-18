// composables/useAuth.ts
import { ref } from "vue";
import { useRouter } from "#app";

interface Usuario {
  id: number;
  nome: string;
  email: string;
  perfil: string;
  idPanificadora?: number | null;
  token: string;
}

const user = ref<Usuario | null>({
  id: 1,
  nome: "Usuário Teste",
  email: "teste@teste.com",
  perfil: "admin",
  idPanificadora: null,
  token: "fake-token",
});

export function useAuth() {
  const router = useRouter();

  const login = async (_email: string, _senha: string) => {
    user.value = {
      id: 1,
      nome: "Usuário Teste",
      email: "teste@teste.com",
      perfil: "admin",
      idPanificadora: null,
      token: "fake-token",
    };
    return true;
  };

  const refreshToken = async () => {
    // Sempre retorna o token fake
    return user.value?.token || null;
  };

  const logout = async () => {
    // Opcional: podemos apenas redirecionar sem limpar o usuário
    router.push("/login");
  };

  const isAuthenticated = () => true; // Sempre autenticado

  return { user, login, refreshToken, logout, isAuthenticated };
}
