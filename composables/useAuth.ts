import { ref, onMounted } from "vue";
import { useRouter } from "#app";
import axios from "axios";

interface Usuario {
  idUsuario: number;
  nome: string;
  email: string;
  perfil: string;
  ativo?: boolean;
  idPanificadora?: number | null;
}

const user = ref<Usuario | null>(null);
const token = ref<string | null>(null);

export function useAuth() {
  const router = useRouter();

  // ---------- LOGIN ----------
  const login = async (email: string, senha: string) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/WebAproject2/GerenciarUsuario?acao=login",
        { email, senha },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (res.status === 200 && res.data) {
        user.value = res.data;

        const authHeader = res.headers["authorization"];
        if (authHeader) {
        }

        localStorage.setItem("user", JSON.stringify(user.value));

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

  // ---------- LOGOUT ----------
  const logout = async () => {
    user.value = null;
    token.value = null;
    localStorage.removeItem("user");
    router.push("/login");
  };

  const isAuthenticated = () => !!user.value;

  onMounted(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("authToken");

    if (savedUser && savedToken) {
      user.value = JSON.parse(savedUser);
      token.value = savedToken;
    }
  });


  return { user, login, logout, isAuthenticated,  };
}
