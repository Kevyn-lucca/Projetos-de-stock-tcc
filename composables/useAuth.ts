// composables/useAuth.ts
import { ref } from "vue";
import { useRouter } from "#app";
import axios from "axios";

interface Usuario {
  id_usuario: number;
  nome: string;
  email: string;
  perfil: string;
  idPanificadora?: number | null;
}

const user = ref<Usuario | null>(null);

export function useAuth() {
  const router = useRouter();

  const login = async (email: string, senha: string) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/WebAproject2/GerenciarUsuario?acao=login",
        { email, senha },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.status === 200 && res.data) {
        user.value = res.data;
        return true;
      }

      return false;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          throw new Error("Email ou senha inválidos.");
        }
        throw new Error("Erro ao conectar ao servidor.");
      }
      throw new Error("Erro inesperado no login.");
    }
  };

  const logout = async () => {
    user.value = null;
    router.push("/login");
  };

  const isAuthenticated = () => !!user.value;

  return { user, login, logout, isAuthenticated };
}
