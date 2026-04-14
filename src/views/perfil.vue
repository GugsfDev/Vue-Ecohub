<template>
  <div class="perfil-layout">
    <aside class="sidebar-perfil">
      <div class="card-perfil-main">
        <img src="../assets/img/perfil.jpg" alt="Foto de Perfil" class="foto-grande">
        
        <!-- 🔥 NOME DINÂMICO -->
        <h2>{{ usuario?.nome || 'Usuário' }}</h2>

        <!-- 🔥 USERNAME AUTOMÁTICO -->
        <p class="username">@{{ usuario?.email?.split('@')[0] }}</p>

        <p class="bio">Bem-vindo ao seu perfil no EcoHub 🚀</p>
        
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
          "Finalizei o desenvolvimento do painel de perfil!"
        </p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 🔥 USUÁRIO
const usuario = ref(null)

// 🚀 CARREGA USUÁRIO AO ENTRAR
onMounted(() => {
  const userStorage = localStorage.getItem('usuario')

  if (userStorage) {
    usuario.value = JSON.parse(userStorage)
  } else {
    // 🔒 se não estiver logado
    router.push('/login')
  }
})

// 🚪 LOGOUT
const confirmarLogout = () => {
  const confirmar = window.confirm("Você tem certeza de que deseja sair?")
  
  if (confirmar) {
    localStorage.removeItem('usuario') // 🔥 CORRIGIDO
    router.push('/login')
  }
}

</script>

<style scoped>
/* O caminho deve sair de 'views' e entrar em 'assets/css' */
@import "../assets/css/geral.css";
@import "../assets/css/perfil.css";
</style>