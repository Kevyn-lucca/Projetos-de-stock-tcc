<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import PieChart from "~/components/PieChart.vue";
import LineChart from "~/components/LineChart.vue";
interface Relatorio {
  idRelatorio: number;
  idPanificadora: number;
  idProduto: number;
  percentual: number;
  causa: string;
  periodo: Date;
}

const relatorios = ref<Relatorio[]>([]);
const novoRelatorio = ref({
  idPanificadora: 1,
  idProduto: 1,
  percentual: 0,
  causa: "",
  periodo: "",
});
const carregando = ref(false);

async function carregarRelatorios() {
  try {
    carregando.value = true;
    const { data } = await axios.get(
      "http://localhost:8080/WebAproject2/gerenciarRelatorio?acao=listar"
    );
    relatorios.value = data;
  } catch (err) {
    console.error("Erro ao carregar relatórios:", err);
    alert("Erro ao carregar relatórios.");
  } finally {
    carregando.value = false;
  }
}

async function adicionarRelatorio(tipo: "perda" | "venda") {
  if (!novoRelatorio.value.causa || !novoRelatorio.value.percentual) {
    alert("Preencha todos os campos!");
    return;
  }

  try {
    const payload = {
      idPanificadora: novoRelatorio.value.idPanificadora,
      idProduto: novoRelatorio.value.idProduto,
      percentual: novoRelatorio.value.percentual,
      causa:
        tipo === "perda"
          ? `Perda - ${novoRelatorio.value.causa}`
          : `Venda - ${novoRelatorio.value.causa}`,
      periodo: novoRelatorio.value.periodo,
    };

    await axios.post(
      "http://localhost:8080/WebAproject2/gerenciarRelatorio",
      payload,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    alert("Relatório adicionado com sucesso!");
    await carregarRelatorios();
    novoRelatorio.value = {
      idPanificadora: 1,
      idProduto: 1,
      percentual: 0,
      causa: "",
      periodo: "",
    };
  } catch (err) {
    console.error("Erro ao adicionar relatório:", err);
    alert("Falha ao adicionar relatório.");
  }
}

async function deletarRelatorio(id: number) {
  if (!confirm("Deseja realmente excluir este relatório?")) return;

  try {
    await axios.delete(
      `http://localhost:8080/WebAproject2/gerenciarRelatorio?idRelatorio=${id}`
    );
    relatorios.value = relatorios.value.filter((r) => r.idRelatorio !== id);
  } catch (err) {
    console.error("Erro ao deletar relatório:", err);
    alert("Falha ao deletar relatório.");
  }
}

const pieData = computed(() => ({
  labels: relatorios.value.map((r) => r.causa),
  datasets: [
    {
      data: relatorios.value.map((r) => r.percentual),
      backgroundColor: ["#e63946", "#457b9d", "#2a9d8f", "#f4a261", "#e9c46a"],
    },
  ],
}));

const pieOptions = {
  responsive: true,
  plugins: {
    legend: { position: "bottom" },
    title: { display: true, text: "Percentual por Causa" },
  },
};

const lineData = computed(() => ({
  labels: relatorios.value.map((r) => r.causa),
  datasets: [
    {
      label: "Percentual de Problemas / Vendas",
      data: relatorios.value.map((r) => r.percentual),
      borderColor: "#1d3557",
      backgroundColor: "#a8dadc",
      tension: 0.3,
      fill: false,
    },
  ],
}));

const lineOptions = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: { display: true, text: "Evolução de Relatórios" },
  },
  scales: { y: { beginAtZero: true } },
};

onMounted(carregarRelatorios);
</script>

<template>
  <div class="min-h-screen bg-[var(--p-surface-100)]">
    <main class="max-w-7xl mx-auto px-6 py-12">
      <h1 class="text-3xl font-bold text-[#064e3b] mb-8">
        Gestão de Relatórios
      </h1>

      <section
        class="bg-[#f4e1c1] p-6 rounded-2xl shadow-md mb-10 border border-[#064e3b]"
      >
        <h2 class="text-2xl font-semibold mb-4 text-[#2c3930]">
          Novo Relatório
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label class="font-medium text-sm text-[#2c3930]">Produto ID</label>
            <input
              v-model.number="novoRelatorio.idProduto"
              type="number"
              class="input-base w-full p-2 rounded border"
              placeholder="ID do Produto"
            />
          </div>

          <div>
            <label class="font-medium text-sm text-[#2c3930]">Percentual</label>
            <input
              v-model.number="novoRelatorio.percentual"
              type="number"
              step="0.1"
              class="input-base w-full p-2 rounded border"
              placeholder="Ex: 12.5"
            />
          </div>

          <div>
            <label class="font-medium text-sm text-[#2c3930]">Data</label>
            <input
              v-model="novoRelatorio.periodo"
              type="date"
              class="input-base w-full p-2 rounded border"
            />
          </div>
        </div>

        <div>
          <label class="font-medium text-sm text-[#2c3930]">Causa</label>
          <input
            v-model="novoRelatorio.causa"
            type="text"
            class="input-base w-full p-2 rounded border"
            placeholder="Descreva a causa"
          />
        </div>

        <div class="flex gap-4 mt-4">
          <button
            class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            @click="adicionarRelatorio('perda')"
          >
            Registrar Perda
          </button>
          <button
            class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            @click="adicionarRelatorio('venda')"
          >
            Registrar Venda
          </button>
        </div>
      </section>

      <!-- Gráficos -->
      <section class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div
          class="bg-[#e6ebef] p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center"
        >
          <h2 class="text-xl font-semibold mb-4 text-[#2c3930]">
            Distribuição por Causa
          </h2>
          <PieChart
            :chart-data="pieData"
            :chart-options="pieOptions"
            class="w-full h-80"
          />
        </div>

        <div
          class="bg-[#e6ebef] p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center"
        >
          <h2 class="text-xl font-semibold mb-4 text-[#2c3930]">
            Evolução dos Percentuais
          </h2>
          <LineChart
            :chart-data="lineData"
            :chart-options="lineOptions"
            class="w-full h-80"
          />
        </div>
      </section>

      <!-- Lista de relatórios -->
      <section>
        <h2 class="text-2xl font-semibold mb-4 text-[#2c3930]">
          Relatórios Registrados
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="r in relatorios"
            :key="r.idRelatorio"
            class="bg-[#f4e1c1] p-4 rounded-xl border border-[#064e3b] shadow-md flex flex-col justify-between"
          >
            <div>
              <p class="font-semibold text-[#2c3930]">
                Produto ID: {{ r.idProduto }}
              </p>
              <p class="text-[#586079]">Causa: {{ r.causa }}</p>
              <p class="text-[#586079]">Percentual: {{ r.percentual }}%</p>
              <p class="text-[#71717a] text-sm mt-1">
                Panificadora: {{ r.idPanificadora }}
              </p>
              <p class="text-[#71717a] text-sm">
                Data: {{ new Date(r.periodo).toLocaleDateString("pt-BR") }}
              </p>
            </div>
            <button
              class="mt-3 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
              @click="deletarRelatorio(r.idRelatorio)"
            >
              Excluir
            </button>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
