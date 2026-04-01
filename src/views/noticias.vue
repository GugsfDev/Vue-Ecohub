<template>
  <div class="pagina-noticias">
    <section class="titulo">
      <h2>Principais notícias do eniac</h2>
    </section>
    
    <section class="noticias">
      <div class="card-noticia">
        <img src="../assets/img/ecohub.png" alt="Imagem da notícia">
        <h3>ginkeniac</h3>
        <p class="resumo">
         saiba tudo sobre a ginkeniac, todos os times participantes, todos as contribuições que estamos arrecadando 
        </p>
        <div class="conteudo-extra">
            <p>os principais timis da ginkeniac deste ano são o japão represnetado pelo ti</p>
            <a href="https://exemplo.com" target="_blank" class="link-externo">Saiba mais no site oficial</a>
        </div>
        <a href="#" class="ler-mais">Ler mais</a>
      </div>

      <div class="card-noticia">
        <img src="../assets/img/ecohub.png" alt="Imagem da notícia">
        <h3>Chat</h3>
        <p class="resumo">Resumo pequeno da notícia...</p>
        <div class="conteudo-extra">
            <p>Aqui fica o texto completo explicando melhor o assunto.</p>
            <a href="https://exemplo.com" target="_blank" class="link-externo">Saiba mais no site oficial</a>
        </div>
        <a href="#" class="ler-mais">Ler mais</a>
      </div>

      <div class="card-noticia" id="noticia-chat">
        <img src="../assets/img/ecohub.png" alt="Imagem da notícia">
        <h3>pokemon</h3>
        <p class="resumo">Resumo pequeno da notícia...</p>
        <div class="conteudo-extra">
            <p>se der certo vc sabera que pokemon e a maior franquia do mundo com mais de 90 bi por ano</p>
            <a href="https://www.pokemon.com/br" target="_blank" class="link-externo">Saiba mais no site oficial</a>
        </div>
        <a href="#" class="ler-mais">Ler mais</a>
      </div>
    </section>
  </div>
</template>

<script setup>
</script>

<style scoped>
/* O caminho correto para sair de views/ e entrar em assets/css/ */
@import "../assets/css/geral.css";
@import "../assets/css/noticias.css";
</style>