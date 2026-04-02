<template>
  <section>
    <h2 class="titulo">Últimas Notícias</h2>

    <div class="noticias">
      <div 
        class="card-noticia" 
        v-for="(noticia, index) in noticias" 
        :key="index"
        :class="{ ativo: noticia.ativo }"
      >
        <img :src="noticia.imagem" alt="Imagem da notícia" />

        <h3>{{ noticia.titulo }}</h3>
        <p>{{ noticia.resumo }}</p>

        <a href="#" @click.prevent="toggleConteudo(index)">
          {{ noticia.ativo ? 'Ver menos' : 'Ver mais' }}
        </a>

        <div class="conteudo-extra">
          <p>{{ noticia.conteudo }}</p>
          <a 
            :href="noticia.link" 
            target="_blank" 
            class="link-externo"
          >
            Ler notícia completa →
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "NewsSection",
  data() {
    return {
      noticias: [
        {
          titulo: "Nova tecnologia revoluciona o mercado",
          resumo: "Uma inovação promete mudar tudo...",
          conteudo: "Aqui vai o conteúdo completo da notícia com mais detalhes e informações importantes.",
          imagem: "https://via.placeholder.com/400x200",
          link: "#",
          ativo: false
        },
        {
          titulo: "Economia cresce acima do esperado",
          resumo: "Dados mostram crescimento significativo...",
          conteudo: "Mais detalhes sobre a economia e o impacto nos próximos meses.",
          imagem: "https://via.placeholder.com/400x200",
          link: "#",
          ativo: false
        },
        {
          titulo: "Evento importante acontece na cidade",
          resumo: "Confira os destaques do evento...",
          conteudo: "Descrição completa do evento e tudo que aconteceu.",
          imagem: "https://via.placeholder.com/400x200",
          link: "#",
          ativo: false
        }
      ]
    };
  },
  methods: {
    toggleConteudo(index) {
      this.noticias[index].ativo = !this.noticias[index].ativo;
    }
  }
};
</script>
💡 O que esse código já faz
Usa exatamente suas classes (.noticias, .card-noticia, etc.)
Cards responsivos autom
<script setup>
</script>

<style scoped>
/* O caminho correto para sair de views/ e entrar em assets/css/ */
@import "../assets/css/geral.css";
@import "../assets/css/noticias.css";
</style>