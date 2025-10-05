import { ref, onMounted, watch } from "vue";

export function useTarefas() {
  const STORAGE_KEY = "tarefas_session";

  // Carrega tarefas da sessão, se existirem
  const tarefas = ref(
    JSON.parse(sessionStorage.getItem(STORAGE_KEY)) || [
      {
        id: 1,
        titulo: "COMER UM PUDIM",
        mensagem: "TESTE DE UMA MESSAGEM MANEIRA",
        status: "fazer",
        color: "secondary",
        data: "28/12/2003",
      },
      {
        id: 2,
        titulo: "Avaliar trabalho",
        mensagem: "avaliar os trabalhos",
        status: "fazendo",
        color: "warning",
        data: "28/12/2001",
      },
      {
        id: 3,
        titulo: "Dar notas",
        mensagem: "dar uma nota 10 ao meu grupo(kevyn)",
        status: "feito",
        color: "primary",
        data: "28/12/2000",
      },
    ]
  );

  // Gera o avatar para cada tarefa (só se ainda não existir)
  async function gerarAvatares() {
    for (const tarefa of tarefas.value) {
      if (!tarefa.avatar) {
        const seed = encodeURIComponent(tarefa.titulo.trim());
        tarefa.avatar = `https://api.dicebear.com/8.x/lorelei/svg?seed=${seed}`;
      }
    }
  }

  onMounted(() => gerarAvatares());

  // Atualiza o sessionStorage sempre que o array muda
  watch(
    tarefas,
    (val) => {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val));
    },
    { deep: true }
  );

  // Move tarefa e atualiza estado
  function moverTarefa({ status, color }, dragItem) {
    if (dragItem.value) {
      dragItem.value.status = status;
      dragItem.value.color = color;
      dragItem.value = null;
    }
  }

  return {
    tarefas,
    gerarAvatares,
    moverTarefa,
  };
}
