<template>
    <div class="flex gap-2">
    <div>
        <TarefaPrincipal>
            <tarefaBlock v-for=" i in 4" :key="i"></tarefaBlock>
        </TarefaPrincipal>
    </div>
    <div>
        <TarefaPrincipal>
            <tarefaBlock v-for=" i in 4" :key="i"></tarefaBlock>
        </TarefaPrincipal>
    </div>
    <div>
        <TarefaPrincipal>
            <tarefaBlock v-for=" i in 4" :key="i"></tarefaBlock>
        </TarefaPrincipal>
    </div>
</div>
</template>

