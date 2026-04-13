<script setup>
import { ref } from 'vue'

const posts = ref([
  {
    id: 1,
    autor: 'Allan Silva',
    username: '@allan_eniac',
    avatar: '/perfil.jpg', 
    conteudo: 'Mais um projeto saindo do forno aqui no EcoHub! A integração do sistema de rotas está 100%. Bora pra cima! 🚀🔥',
    imagem: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    tempo: 'agora'
  }
])

const sugestoes = ref([
  { id: 1, nome: 'Inovação ENIAC', handle: '@inovacao_eniac' },
  { id: 2, nome: 'Hub de Projetos', handle: '@hub_projetos' }
])
</script>

<template>
  <div class="feed-wrapper">
    <div class="feed-grid">

      <!-- Coluna Esquerda -->
      <aside class="side-column">
        <div class="card mini-profile-card">
          <div class="profile-cover"></div>
          <img src="/perfil.jpg" alt="Perfil" class="profile-avatar-mini">
          <div class="profile-info-mini">
            <h3>Allan Silva</h3>
            <p>Estudante de TI</p>
          </div>
          <div class="profile-stats-mini">
            <div class="stat-item"><span>Visualizações</span><strong>124</strong></div>
            <div class="stat-item"><span>Conexões</span><strong>452</strong></div>
          </div>
        </div>
      </aside>

      <!-- Coluna Central -->
      <main class="feed-main">
        <!-- Criar Post -->
        <div class="card create-post">
          <div class="input-row">
            <img src="/perfil.jpg" alt="Avatar" class="avatar-small">
            <textarea placeholder="No que você está pensando?"></textarea>
          </div>
          <div class="post-actions-row">
            <div class="media-options">
              <button class="action-btn-styled">
                <i class="fa-solid fa-image"></i> Foto
              </button>
              <button class="action-btn-styled">
                <i class="fa-solid fa-calendar-day"></i> Evento
              </button>
            </div>
            <button class="btn-publicar">Publicar</button>
          </div>
        </div>

        <!-- Posts -->
        <div v-for="post in posts" :key="post.id" class="card post-card">
          <div class="post-header">
            <img :src="post.avatar" alt="Avatar" class="avatar-small">
            <div class="post-meta">
              <strong>{{ post.autor }}</strong>
              <span>{{ post.username }} • {{ post.tempo }}</span>
            </div>
          </div>
          <div class="post-body">
            <p>{{ post.conteudo }}</p>
            <img v-if="post.imagem" :src="post.imagem" class="post-img-main">
          </div>
        </div>
      </main>

      <!-- Coluna Direita -->
      <aside class="side-column">
        <div class="card recommendation-card">
          <h4>Sugestões para você</h4>
          <div v-for="sug in sugestoes" :key="sug.id" class="suggestion-item">
            <div class="suggestion-avatar"></div>
            <div class="suggestion-info">
              <span class="sug-name">{{ sug.nome }}</span>
              <span>{{ sug.handle }}</span>
            </div>
            <button class="btn-follow">Seguir</button>
          </div>
        </div>
      </aside>

    </div>
  </div>
</template>

<style scoped>
.feed-wrapper { background: #f0f2f5; min-height: 100vh; padding: 20px 0; transition: background 0.3s, color 0.3s; }
.feed-grid { display: grid; grid-template-columns: 240px 1fr 280px; gap: 20px; max-width: 1100px; margin: 0 auto; align-items: start; }
.feed-main { display: flex; flex-direction: column; gap: 16px; }

/* ===== CARDS ===== */
.card { background: #fff; border-radius: 10px; border: 1px solid #ddd; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); transition: background 0.3s, color 0.3s, border 0.3s; }

/* ==== MINI PROFILE (ESQUERDA) ==== */
.profile-cover { height: 60px; background: #00d2ff; border-radius: 10px 10px 0 0; }
.profile-avatar-mini { width: 70px; height: 70px; border-radius: 50%; border: 4px solid #fff; margin: -35px auto 10px; display: block; object-fit: cover; }
.profile-info-mini { text-align: center; padding: 0 10px 15px; border-bottom: 1px solid #eee; }
.profile-info-mini h3 { margin: 0; font-size: 1.1rem; }
.profile-stats-mini { padding: 12px; font-size: 0.8rem; }
.stat-item { display: flex; justify-content: space-between; margin-bottom: 5px; color: #65676b; }

/* ==== CRIAR POST (CENTRAL) ==== */
.create-post { padding: 15px; }
.input-row { display: flex; gap: 10px; margin-bottom: 15px; }
.avatar-small { width: 48px; height: 48px; border-radius: 50%; object-fit: cover; background: #eee; flex-shrink: 0; }
textarea { flex: 1; border: none; resize: none; outline: none; font-size: 1rem; padding-top: 10px; min-height: 50px; }

.post-actions-row { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #eee; padding-top: 10px; }
.media-options { display: flex; gap: 10px; }
.action-btn-styled { background: none; border: none; cursor: pointer; display: flex; align-items: center; gap: 8px; font-weight: 600; color: #65676b; padding: 8px; border-radius: 6px; transition: background 0.3s; }
.action-btn-styled:hover { background: #f2f2f2; }
.btn-publicar { background: #00d2ff; color: #fff; border: none; padding: 8px 20px; border-radius: 20px; font-weight: bold; cursor: pointer; }

/* ==== POST CARD ==== */
.post-card { padding: 15px; }
.post-header { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
.post-meta { display: flex; flex-direction: column; }
.post-meta strong { color: #1c1e21; }
.post-meta span { font-size: 0.8rem; color: #65676b; }
.post-img-main { width: 100%; border-radius: 8px; margin-top: 10px; border: 1px solid #eee; }

/* ==== SUGESTÕES (DIREITA) ==== */
.recommendation-card { padding: 15px; }
.suggestion-item { display: flex; align-items: center; gap: 10px; margin-top: 15px; }
.suggestion-avatar { width: 35px; height: 35px; background: #ddd; border-radius: 50%; }
.suggestion-info { flex: 1; display: flex; flex-direction: column; font-size: 0.85rem; }
.sug-name { font-weight: bold; }
.btn-follow { background: #fff; border: 1px solid #00d2ff; color: #00d2ff; border-radius: 20px; padding: 4px 12px; cursor: pointer; font-size: 0.8rem; font-weight: bold; transition: all 0.3s; }
.btn-follow:hover { background: #00d2ff; color: #fff; }

/* ===== RESPONSIVO ===== */
@media (max-width: 992px) {
  .feed-grid { grid-template-columns: 1fr; }
  .side-column { display: none; }
}

/* ===== MODO ESCURO ===== */
body.dark-mode .feed-wrapper { background: #0f172a; color: white; }

/* cards gerais */
body.dark-mode .card,
body.dark-mode .mini-profile-card,
body.dark-mode .recommendation-card,
body.dark-mode .create-post,
body.dark-mode .post-card {
  background: #020817;
  color: #94a3b8;
  border: 1px solid #1e293b;
}

/* textarea modo escuro */
body.dark-mode textarea {
  background: #1f1f1f;  /* fundo escuro */
  color: #e4e4e4;       /* texto claro */
  border: 1px solid #333; /* borda escura */
}

/* meta do post */
body.dark-mode .post-meta strong { color: #fff; }
body.dark-mode .post-meta span { color: #94a3b8; }

/* botões */
body.dark-mode .action-btn-styled { color: #ccc; }
body.dark-mode .action-btn-styled:hover { background-color: #2a2a2a; }

body.dark-mode .btn-follow { border: 1px solid #00d2ff; background: transparent; color: #00d2ff; }
body.dark-mode .btn-follow:hover { background: #00d2ff; color: #fff; }

body.dark-mode .profile-cover {
    background-color: #1a6fad;
}

body.dark-mode .btn-publicar{ background-color: #1a6fad ;}
</style>