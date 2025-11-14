import { ref, onMounted } from "vue";
import axios from "axios";
import { useAuth } from "@/composables/useAuth";

export function useTarefas() {
  const { user, isAuthenticated } = useAuth();

  const tarefas = ref([]);
  const carregando = ref(false);
  const erro = ref(null);

  const API_URL = "http://localhost:8080/WebAproject2/GerenciarTarefa";

  function gerarAvatar(nomeUsuario) {
    const seed = encodeURIComponent(nomeUsuario.trim());
    return `https://api.dicebear.com/8.x/lorelei/svg?seed=${seed}`;
  }

  async function carregarTarefas() {
    if (!isAuthenticated()) return;

    carregando.value = true;
    erro.value = null;

    try {
      const idUsuario = user.value?.idUsuario;
      const res = await axios.get(API_URL, {
        params: {
          acao: "listar",
          idUsuario,
        },
      });

      tarefas.value = (res.data || []).map((t) => ({
        idTarefa: t.idTarefa,
        titulo: t.titulo,
        mensagem: t.mensagem,
        status: t.status,
        color: t.color,
        dataCriacao: t.dataCriacao,
        idUsuario: t.idUsuario,
        avatar: gerarAvatar(t.nomeUsuario || "Usuário"),
      }));
    } catch (err) {
      console.error("❌ Erro ao carregar tarefas:", err);
      erro.value = "Falha ao carregar tarefas.";
    } finally {
      carregando.value = false;
    }
  }


  
  async function adicionarTarefa(nova) {
    try {
      carregando.value = true;

      console.log(nova)
      const payload = {
        titulo: nova.titulo,
        mensagem: nova.mensagem,
        status: nova.status || "fazer",
        color: nova.color || "secondary",
        idUsuario: nova.idUsuario,
      };

      const res = await axios.post(API_URL, payload);

      const tarefa = res.data;
      tarefa.avatar = gerarAvatar(tarefa.titulo);
      tarefas.value.push(tarefa);
    } catch (err) {
      console.log("erro ao adicionar tarefas" + err);
    } finally {
      carregando.value = false;
    }
  }

  async function atualizarTarefa(tarefa) {
    try {
      carregando.value = true;

      await axios.put(API_URL, tarefa);

      const index = tarefas.value.findIndex(
        (t) => t.idTarefa === tarefa.idTarefa
      );
      if (index !== -1) {
        tarefas.value[index] = {
          ...tarefa,
          avatar: gerarAvatar(tarefa.titulo),
        };
      }
    } catch (err) {
      console.error("Erro ao atualizar tarefa:", err);
    } finally {
      carregando.value = false;
    }
  }

  function moverTarefa({ status, color }, dragItem) {
    if (dragItem.value) {
      dragItem.value.status = status;
      dragItem.value.color = color;
      atualizarTarefa(dragItem.value);
      dragItem.value = null;
    }
  }



  return {
    tarefas,
    carregando,
    erro,
    carregarTarefas,
    adicionarTarefa,
    atualizarTarefa,
    moverTarefa,
  };
}
