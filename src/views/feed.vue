<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const posts = ref([])
const novoPost = ref('')

const usuario = JSON.parse(localStorage.getItem('usuario')) || {}

/* ================================
   CARREGAR POSTS
================================ */
const carregarPosts = async () => {
  const res = await api.get('/posts')
  posts.value = res.data
}

/* ================================
   CRIAR POST
================================ */
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

/* ================================
   ENTER PUBLICA / SHIFT ENTER QUEBRA LINHA
================================ */
const handleEnter = (e) => {
  if (!e.shiftKey) {
    e.preventDefault()

    if (!novoPost.value.trim()) return

    publicarPost()
  }
}

/* ================================
   VERIFICA CURTIDA
================================ */
const jaCurtiu = (post) => {
  return post.curtidas?.includes(usuario._id)
}

/* ================================
   CURTIR / DESCURTIR
================================ */
const curtirPost = async (post) => {
  try {
    const res = await api.put(`/posts/${post._id}/like`, {
      userId: usuario._id
    })

    const index = posts.value.findIndex(p => p._id === post._id)
    posts.value[index] = res.data

  } catch (err) {
    console.log(err)
  }
}

/* ================================
   DELETAR
================================ */
const deletarPost = async (post) => {
  const confirmar = confirm('Deseja deletar?')
  if (!confirmar) return

  await api.delete(`/posts/${post._id}/${usuario._id}`)
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

          <img 
            :src="usuario?.foto || '/perfil.jpg'" 
            class="profile-avatar-mini"
          >

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

            <img 
              :src="usuario?.foto || '/perfil.jpg'" 
              class="avatar-small"
            >

            <!-- 🔥 TEXTAREA CORRETO -->
            <textarea 
              v-model="novoPost" 
              placeholder="No que você está pensando?"
              @keydown.enter="handleEnter"
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

            <img 
              :src="post.foto || '/perfil.jpg'" 
              class="avatar-small"
            >

            <div class="post-meta">
              <strong>{{ post.autor }}</strong>
              <span>{{ post.username }}</span>
            </div>
          </div>

          <div class="post-body">
            <p>{{ post.conteudo }}</p>
          </div>

          <!-- AÇÕES -->
          <div class="post-actions">

            <button @click="curtirPost(post)">
              {{ jaCurtiu(post) ? '💔' : '❤️' }}
              {{ post.likes || 0 }}
            </button>

            <button 
              v-if="post.userId?.toString() === usuario._id"
              @click="deletarPost(post)"
              class="btn-deletar"
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

/* 🔥 AÇÕES PADRÃO */
.post-actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

/* 🔥 BOTÃO DELETAR */
.btn-deletar {
  color: red;
}
</style>