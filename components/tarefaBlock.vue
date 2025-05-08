<template>
    <div class="blocoTarefa border-2 rounded border-blue-300 shadow-2xs mt-2  flex justify-between flex-col">
        <div class= "itemTarefa">  
            <h1>Para fazer</h1>
            <UBadge>teste</UBadge>
        </div>
        <div id = "textoTarefa">
            <p>mensagem</p>
        </div>
        <div class="itemTarefa">
            <span>20 agosto</span>
            <p>
                avatar
            </p>
        </div>
        </div>
</template>


<style  lang="css" scoped>
.itemTarefa{
    display: flex;
    justify-content: space-between;
  
}


#textoTarefa{
    display: flex;
   
}
.blocoTarefa{
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
    min-width: 2px;
    max-width: 300px;
    min-height:100px ;
    max-height: 250px;
    padding: 7px;
    background-color: white;
    color: black;
}
</style>