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
periodo: string | Date;
nomeProduto: string;
}
definePageMeta({
    layout: "mobile",
});


type ProdutoType = {
id: number;
nome: string;
marca: string;
};

const produtos = ref<ProdutoType[]>([]);
const relatorios = ref<Relatorio[]>([]);
const carregando = ref(false);
const error = ref<string | null>(null);

const novoRelatorio = ref({
idPanificadora: 1,
idProduto: 1,
percentual: 0,
causa: "",
periodo: "",
});

type ProdutoAPIResponse = {
idProduto: number;
nome: string;
categoria?: string;
unidadeMedida?: string;
perecivel?: boolean;
marca?: string;
};

type RelatorioAPIResponse = {
idRelatorio: number;
idPanificadora: number;
idProduto: number;
percentual: number;
causa: string;
periodo: string;
nomeProduto:string;
};

async function fetchProdutos() {
try {
const res = await axios.get(
"http://localhost:8080/WebAproject2/gerenciarProduto?acao=listar"
);
const produtosAPI: ProdutoAPIResponse[] =
(res?.data as ProdutoAPIResponse[]) ?? [];
produtos.value = produtosAPI.map((item) => ({
id: item.idProduto,
nome: item.nome,
marca: item.marca ?? "",
}));

// Define produto padrão com segurança (se houver produtos)
novoRelatorio.value.idProduto = produtos.value?.[0]?.id ?? 1;
} catch (err) {
console.error("Erro ao carregar produtos:", err);
error.value = "Erro ao carregar produtos";
produtos.value = [];
novoRelatorio.value.idProduto = 1;
}
}

async function carregarRelatorios() {
try {
carregando.value = true;
const res = await axios.get(
"http://localhost:8080/WebAproject2/gerenciarRelatorio?acao=listar"
);
const data: RelatorioAPIResponse[] = (res?.data as RelatorioAPIResponse[]) ?? [];
// Normaliza/garante tipos esperados
relatorios.value = data.map((d) => ({
idRelatorio: d.idRelatorio,
idPanificadora: d.idPanificadora,
idProduto: d.idProduto,
percentual: Number(d.percentual ?? 0),
causa: d.causa ?? "",
periodo: d.periodo ?? "",
nomeProduto:d.nomeProduto
}));
} catch (err) {
console.error("Erro ao carregar relatórios:", err);
error.value = "Erro ao carregar relatórios";
relatorios.value = [];
} finally {
carregando.value = false;
}
}

function validarNovoRelatorio() {
const causaValida = typeof novoRelatorio.value.causa === "string" && novoRelatorio.value.causa.trim() !== "";
const percentualValido =
novoRelatorio.value.percentual !== null &&
novoRelatorio.value.percentual !== undefined &&
!isNaN(novoRelatorio.value.percentual);
return causaValida && percentualValido;
}

async function adicionarRelatorio(tipo: "perda" | "venda") {
if (!validarNovoRelatorio()) {
alert("Preencha todos os campos corretamente!");
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

// Converter para application/x-www-form-urlencoded
const params = new URLSearchParams();
Object.entries(payload).forEach(([k, v]) => {
params.append(k, String(v ?? ""));
});

await axios.post(
"http://localhost:8080/WebAproject2/gerenciarRelatorio",
params.toString(),
{ headers: { "Content-Type": "application/x-www-form-urlencoded" } }
);

await carregarRelatorios();

novoRelatorio.value = {
idPanificadora: 1,
idProduto: produtos.value?.[0]?.id ?? 1,
percentual: 0,
causa: "",
periodo: "",
};
} catch (err) {
console.error("Erro ao adicionar relatório:", err);
alert("Erro ao adicionar relatório. Veja o console para detalhes.");
}
}

async function deletarRelatorio(id: number) {
try {
await axios.delete(
`http://localhost:8080/WebAproject2/gerenciarRelatorio?idRelatorio=${encodeURIComponent(
String(id)
)}`
);
relatorios.value = relatorios.value.filter((r) => r.idRelatorio !== id);
} catch (err) {
console.error("Erro ao deletar relatório:", err);
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

onMounted(() => {
fetchProdutos();
carregarRelatorios();
});
</script>

<template>
<div class="min-h-screen bg-[var(--p-surface-100)]">
<main class="max-w-7xl mx-auto px-6 py-12">
<h1 class="text-3xl font-bold text-[#064e3b] mb-8">Gestão de Relatórios</h1>

<section
class="bg-[#f4e1c1] p-6 rounded-2xl shadow-md mb-10 border border-[#064e3b]"
>
<h2 class="text-2xl font-semibold mb-4 text-black">Novo Relatório</h2>

<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
<div>
<label class="font-medium text-sm text-black">Produto</label>
<select
v-model.number="novoRelatorio.idProduto"
  class="input-base w-full p-2 rounded border border-gray-300 bg-white text-black placeholder-gray-600 dark:bg-white dark:text-black dark:placeholder-gray-600"
>
<option
v-for="produto in produtos"
:key="produto.id"
:value="produto.id"
>
{{ produto.nome }}{{ produto.marca ? ' - ' + produto.marca : '' }}
</option>
</select>
</div>

<div>
<label class="font-medium text-sm text-black ">
Percentual
</label>
<input
v-model.number="novoRelatorio.percentual"
type="number"
step="0.1"
  class="input-base w-full p-2 rounded border border-gray-300 bg-white text-black placeholder-gray-600 dark:bg-white dark:text-black dark:placeholder-gray-600"
placeholder="Ex: 12.5"
/>
</div>

<div>
<label class="font-medium text-sm text-black">Data</label>
<input
v-model="novoRelatorio.periodo"
type="date"
  class="input-base w-full p-2 rounded border border-gray-300 bg-white text-black placeholder-gray-600 dark:bg-white dark:text-black dark:placeholder-gray-600"
/>
</div>
</div>

<div>
<label class="font-medium text-sm text-black ">Causa</label>
<input
v-model="novoRelatorio.causa"
type="text"
  class="input-base w-full p-2 rounded border border-gray-300 bg-white text-black placeholder-gray-600 dark:bg-white dark:text-black dark:placeholder-gray-600"
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
<PieChart :chart-data="pieData" :chart-options="pieOptions" class="w-full h-80" />
</div>

<div
class="bg-[#e6ebef] p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center"
>
<h2 class="text-xl font-semibold mb-4 text-[#2c3930]">
Evolução dos Percentuais
</h2>
<LineChart :chart-data="lineData" :chart-options="lineOptions" class="w-full h-80" />
</div>
</section>

<!-- Lista de relatórios -->
<section>
<h2 class="text-2xl font-semibold mb-4 text-[#2c3930]">Relatórios Registrados</h2>

<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
<div
v-for="r in relatorios"
:key="r.idRelatorio"
class="bg-[#f4e1c1] p-4 rounded-xl border border-[#064e3b] shadow-md flex flex-col justify-between"
>
<div>
<p class="font-semibold text-[#2c3930]">Produto: {{ r.nomeProduto }}</p>
<p class="text-[#586079]">Causa: {{ r.causa }}</p>
<p class="text-[#586079]">Percentual: {{ r.percentual }}%</p>
<p class="text-[#71717a] text-sm mt-1">Panificadora: {{ r.idPanificadora }}</p>
<p class="text-[#71717a] text-sm">
Data: {{ new Date(String(r.periodo)).toLocaleDateString("pt-BR") }}
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
</main> </div>
</template>