<template>
    <div class="flex flex-col place-content-center">

    
    <div class="TarefaPrincipal pl-2 pb-2">
        <slot ></slot>
    </div>
    </div>
</template>

<style lang="css" scoped>
.TarefaPrincipal{
    background-color: white;
    width: 20rem;
    height: auto;
    display: flex;
    flex-direction: column;
    place-content: center;
}
</style>
