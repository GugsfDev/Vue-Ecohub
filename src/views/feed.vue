<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const posts = ref([])
const novoPost = ref('')

const usuario = JSON.parse(localStorage.getItem('usuario'))

const carregarPosts = async () => {
  const res = await api.get('/posts')
  posts.value = res.data
}

const publicarPost = async () => {
  if (!novoPost.value.trim()) return

  await api.post('/posts', {
    autor: usuario.nome,
    username: '@' + usuario.email.split('@')[0],
    conteudo: novoPost.value,
    userId: usuario._id
  })

  novoPost.value = ''
  carregarPosts()
}

// ❤️ CURTIR COM CONTROLE
const curtirPost = async (post) => {
  try {
    await api.put(`/posts/${post._id}/like`, {
      userId: usuario._id
    })

    carregarPosts()

  } catch (err) {
    alert('Você já curtiu esse post 😅')
  }
}

// 🗑️ DELETAR
const deletarPost = async (post) => {
  const confirmar = confirm('Deseja deletar?')
  if (!confirmar) return

  await api.delete(`/posts/${post._id}`, {
    data: { userId: usuario._id }
  })

  carregarPosts()
}

onMounted(carregarPosts)
</script>

<template>
  <div class="feed-wrapper">
    <div class="feed-grid">

      <!-- ESQUERDA -->
      <aside class="side-column">
        <div class="card mini-profile-card">
          <div class="profile-cover"></div>
          <img src="/perfil.jpg" class="profile-avatar-mini">

          <div class="profile-info-mini">
            <h3>{{ usuario?.nome || 'Usuário' }}</h3>
            <p>{{ usuario?.curso || 'Estudante' }}</p>
          </div>
        </div>
      </aside>

      <!-- CENTRO -->
      <main class="feed-main">

        <!-- CRIAR POST -->
        <div class="card create-post">
          <div class="input-row">
            <img src="/perfil.jpg" class="avatar-small">
            <textarea 
              v-model="novoPost" 
              placeholder="No que você está pensando?"
            ></textarea>
          </div>

          <div class="post-actions-row">
            <button class="btn-publicar" @click="publicarPost">
              Publicar
            </button>
          </div>
        </div>

        <!-- POSTS -->
        <div v-for="post in posts" :key="post._id" class="card post-card">
          
          <div class="post-header">
            <img src="/perfil.jpg" class="avatar-small">
            <div class="post-meta">
              <strong>{{ post.autor }}</strong>
              <span>{{ post.username }}</span>
            </div>
          </div>

          <div class="post-body">
            <p>{{ post.conteudo }}</p>
          </div>

          <!-- 🔥 AÇÕES -->
          <div style="display:flex; gap:10px; margin-top:10px;">

            <!-- ❤️ CURTIR -->
            <button @click="curtirPost(post._id)">
              ❤️ {{ post.likes || 0 }}
            </button>

            <!-- 🗑️ DELETAR -->
            <button 
              v-if="usuario?._id === post.userId"
              @click="deletarPost(post._id, post.userId)"
              style="color:red"
            >
              🗑️ Deletar
            </button>

          </div>

        </div>

      </main>

      <!-- DIREITA -->
      <aside class="side-column">
        <div class="card recommendation-card">
          <h4>Sugestões</h4>

          <div v-for="sug in sugestoes" :key="sug.id">
            {{ sug.nome }}
          </div>
        </div>
      </aside>

    </div>
  </div>
</template>

<style scoped>
@import '../assets/css/feed.css';
</style>