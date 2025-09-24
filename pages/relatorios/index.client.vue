<script setup>
import PieChart from "~/components/PieChart.vue";
import LineChart from "~/components/LineChart.vue";

const relatorios = [
  {
    ID_Relatorio: 1,
    ID_Panificadora: 1,
    ID_Produto: 1,
    Percentual: 5.0,
    Causa: "Produto vencido",
  },
  {
    ID_Relatorio: 2,
    ID_Panificadora: 1,
    ID_Produto: 2,
    Percentual: 3.5,
    Causa: "Mau armazenamento",
  },
  {
    ID_Relatorio: 3,
    ID_Panificadora: 2,
    ID_Produto: 3,
    Percentual: 1.0,
    Causa: "Quebra durante transporte",
  },
];

// --- Pie Chart ---
const pieData = {
  labels: relatorios.map((r) => r.Causa),
  datasets: [
    {
      data: relatorios.map((r) => r.Percentual),
      backgroundColor: ["#f00", "#0f0", "#00f"],
    },
  ],
};

const pieOptions = {
  responsive: true,
  plugins: {
    legend: { position: "bottom" },
    title: { display: true, text: "Percentual por Causa" },
  },
};

// --- Line Chart ---
const lineData = {
  labels: relatorios.map((r) => r.Causa),
  datasets: [
    {
      label: "Percentual de Problemas",
      data: relatorios.map((r) => r.Percentual),
      borderColor: "#f00",
      backgroundColor: "#f88",
      tension: 0.3,
      fill: false,
    },
  ],
};

const lineOptions = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: { display: true, text: "Linha de Percentual por Causa" },
  },
  scales: {
    y: { beginAtZero: true },
  },
};
</script>

<template>
  <div class="min-h-screen bg-[var(--p-surface-100)]">
    <!-- Conteúdo -->
    <main class="max-w-7xl mx-auto px-6 py-12">
      <h1 class="text-3xl font-bold text-[#064e3b] mb-8">
        Relatórios de Problemas
      </h1>

      <!-- Gráficos -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Pie Chart -->
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

        <!-- Line Chart -->
        <div
          class="bg-[#e6ebef] p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center"
        >
          <h2 class="text-xl font-semibold mb-4 text-[#2c3930]">
            Percentual de Problemas
          </h2>
          <LineChart
            :chart-data="lineData"
            :chart-options="lineOptions"
            class="w-full h-80"
          />
        </div>
      </div>

      <!-- Lista de relatórios detalhados -->
      <div class="mt-12">
        <h2 class="text-2xl font-semibold mb-4 text-[#2c3930]">
          Detalhes dos Relatórios
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="r in relatorios"
            :key="r.ID_Relatorio"
            class="bg-[#f4e1c1] p-4 rounded-xl transition border border-[#064e3b]"
          >
            <p class="font-semibold text-[#2c3930]">
              Produto ID: {{ r.ID_Produto }}
            </p>
            <p class="text-[#586079]">Causa: {{ r.Causa }}</p>
            <p class="text-[#586079]">Percentual: {{ r.Percentual }}%</p>
            <p class="text-[#71717a] text-sm mt-1">
              Panificadora: {{ r.ID_Panificadora }}
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
