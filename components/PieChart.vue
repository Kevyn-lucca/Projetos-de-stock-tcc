<script setup>
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { Chart } from "vue-chartjs";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const _props = defineProps({
  chartData: { type: Object, required: true },
  chartOptions: { type: Object, default: () => ({}) },
});
</script>

<template>
  <Chart type="pie" :data="chartData" :options="chartOptions" />
</template>
