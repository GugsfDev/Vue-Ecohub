<template>
  <div class="perfil-layout">
    <aside class="sidebar-perfil">
      <div class="card-perfil-main">
        <img src="../assets/img/perfil.jpg" alt="Foto de Perfil" class="foto-grande">
        
        <h2>João Silva</h2>
        <p class="username">@joaosilva</p>
        <p class="bio">Desenvolvedor Vue.js e entusiasta de inovação no EcoHub ENIAC. 🚀 🌱</p>
        
        <div class="perfil-stats">
          <div class="stat"><span>120</span>Seguidores</div>
          <div class="stat"><span>45</span>Seguindo</div>
          <div class="stat"><span>8</span>Posts</div>
        </div>
        
        <div class="acoes-perfil">
          <button class="btn-editar">Editar Perfil</button>
          <button class="btn-sair" @click="confirmarLogout">Sair (Logout)</button>
        </div>
      </div>
    </aside>

    <main class="perfil-timeline">
      <div class="timeline-header">
        <h3>Minha Atividade Recente</h3>
      </div>
      
      <div class="tweet-card-fake">
        <p class="tweet-text-fake">
          "Finalizei o desenvolvimento do painel de perfil! @ecohub_eniac #vue #webdev"
          <br>
          <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c" alt="Código" class="fake-img">
        </p>
      </div>
      
      <div class="tweet-card-fake">
        <p class="tweet-text-fake">
          "Sera na sala 101, Auditório Central, às 19:30!"
          <br>
          <span class="badg-fake">Participando: Workshop de React Native (📅 sab, 17/10)</span>
        </p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// Lógica de Logout: Limpa o token e redireciona
const confirmarLogout = () => {
  const confirmar = window.confirm("Você tem certeza de que deseja sair?")
  if (confirmar) {
    // 1. Limpa o token do localStorage
    localStorage.removeItem('token')
    
    // 2. Redireciona para a página de Login
    router.push('/login')
  }
}
</script>

<style scoped>
/* O caminho deve sair de 'views' e entrar em 'assets/css' */
@import "../assets/css/geral.css";
@import "../assets/css/perfil.css";
</style>