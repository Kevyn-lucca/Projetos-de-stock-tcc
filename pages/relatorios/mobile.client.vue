<template>
  <div class="min-h-screen bg-[var(--p-surface-100)]">
    <main class="max-w-xl mx-auto px-4 py-8">
      <h1 class="text-2xl font-bold text-[#064e3b] mb-6 text-center">
        Relatórios de Problemas
      </h1>

      <div class="grid grid-cols-1 gap-6">
        <div
          class="bg-[#e6ebef] p-4 max-h-74 rounded-xl shadow-lg flex flex-col items-center justify-center"
        >
          <h2 class="text-lg font-semibold mb-3 text-[#2c3930]">
            Distribuição por Causa
          </h2>
          <PieChart
            :chart-data="pieData"
            :chart-options="pieOptions"
            class="w-full h-72"
          />
        </div>

        <div
          class="bg-[#e6ebef] p-4 rounded-xl max-h-74 shadow-lg flex flex-col items-center justify-center"
        >
          <h2 class="text-lg font-semibold mb-3 text-[#2c3930]">
            Percentual de Problemas
          </h2>
          <LineChart
            :chart-data="lineData"
            :chart-options="lineOptions"
            class="w-full h-72"
          />
        </div>
      </div>

      <div class="mt-8">
        <h2 class="text-xl font-semibold mb-4 text-[#2c3930]">
          Detalhes dos Relatórios
        </h2>
        <div class="grid grid-cols-1 gap-4">
          <div
            v-for="r in relatorios"
            :key="r.ID_Relatorio"
            class="bg-[#f4e1c1] p-4 rounded-xl shadow-md transition border border-[#064e3b]"
          >
            <p class="font-bold text-[#064e3b] text-base">
              {{ r.Causa }}
            </p>
            <p class="text-sm text-[#586079] mt-1">
              <span class="font-semibold">Percentual:</span> {{ r.Percentual }}%
            </p>
            <p class="text-sm text-[#586079]">
              <span class="font-semibold">Produto ID:</span> {{ r.ID_Produto }}
            </p>
            <p
              class="text-[#71717a] text-xs mt-2 border-t border-gray-300 pt-1"
            >
              Panificadora: {{ r.ID_Panificadora }}
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

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

const pieData = {
  labels: relatorios.map((r) => r.Causa),
  datasets: [
    {
      data: relatorios.map((r) => r.Percentual),
      backgroundColor: ["#f00", "#0f0", "#00f"],
      borderColor: "#fff",
      borderWidth: 2,
    },
  ],
};

const pieOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "bottom", labels: { boxWidth: 10 } }, 
    title: { display: true, text: "Percentual por Causa", font: { size: 14 } }, 
  },
};

const lineData = {
  labels: relatorios.map((r) => r.Causa),
  datasets: [
    {
      label: "Percentual de Problemas",
      data: relatorios.map((r) => r.Percentual),
      borderColor: "#064e3b",
      backgroundColor: "rgba(6, 78, 59, 0.2)",
      tension: 0.4,
      fill: true,
    },
  ],
};

const lineOptions = {
  responsive: true,
  maintainAspectRatio: false, 
  plugins: {
    legend: { position: "top", labels: { boxWidth: 10 } },
    title: {
      display: true,
      text: "Linha de Percentual por Causa",
      font: { size: 14 },
    },
  },
  scales: {
    y: { beginAtZero: true, ticks: { font: { size: 10 } } },
    x: { ticks: { font: { size: 10 } } },
  },
};
definePageMeta({
  layout: "mobile",
});
</script>
