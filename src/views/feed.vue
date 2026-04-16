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
            <template v-if="editandoPostId === post._id">
              <textarea
                v-model="textoEditado"
                class="textarea-edicao"
              ></textarea>

              <div class="acoes-edicao">
                <button @click="salvarEdicao(post)" class="btn-salvar">
                  Salvar
                </button>

                <button @click="cancelarEdicao" class="btn-cancelar">
                  Cancelar
                </button>
              </div>
            </template>

            <template v-else>
              <p>{{ post.conteudo }}</p>
            </template>
          </div>

          <!-- AÇÕES -->
          <div class="post-actions">

            <button @click="curtirPost(post)">
              {{ jaCurtiu(post) ? '💔' : '❤️' }}
              {{ post.likes || 0 }}
            </button>

            <button 
              v-if="post.userId?.toString() === usuario._id && editandoPostId !== post._id"
              @click="iniciarEdicao(post)"
              class="btn-editar"
            >
              ✏️ Editar
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

<script setup>
import { ref, onMounted } from 'vue'
import api from 'api'

const posts = ref([])
const novoPost = ref('')
const editandoPostId = ref(null)
const textoEditado = ref('')

const usuario = JSON.parse(localStorage.getItem('usuario')) || {}

const sugestoes = ref([])

/* ================================
   CARREGAR POSTS
================================ */
const carregarPosts = async () => {
  try {
    const res = await api.get('/posts')
    posts.value = res.data
  } catch (err) {
    console.log(err)
  }
}

/* ================================
   CRIAR POST
================================ */
const publicarPost = async () => {
  if (!novoPost.value.trim()) return

  try {
    await api.post('/posts', {
      autor: usuario.nome,
      username: '@' + usuario.email.split('@')[0],
      conteudo: novoPost.value,
      userId: usuario._id
    })

    novoPost.value = ''
    carregarPosts()
  } catch (err) {
    console.log(err)
  }
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
    if (index !== -1) {
      posts.value[index] = res.data
    }
  } catch (err) {
    console.log(err)
  }
}

/* ================================
   INICIAR EDIÇÃO
================================ */
const iniciarEdicao = (post) => {
  editandoPostId.value = post._id
  textoEditado.value = post.conteudo
}

/* ================================
   CANCELAR EDIÇÃO
================================ */
const cancelarEdicao = () => {
  editandoPostId.value = null
  textoEditado.value = ''
}

/* ================================
   SALVAR EDIÇÃO
================================ */
const salvarEdicao = async (post) => {
  if (!textoEditado.value.trim()) {
    alert('O post não pode ficar vazio.')
    return
  }

  try {
    const res = await api.put(`/posts/${post._id}`, {
      conteudo: textoEditado.value,
      userId: usuario._id
    })

    const index = posts.value.findIndex(p => p._id === post._id)
    if (index !== -1) {
      posts.value[index] = res.data
    }

    cancelarEdicao()
  } catch (err) {
    console.log(err)
    alert('Erro ao editar post.')
  }
}

/* ================================
   DELETAR
================================ */
const deletarPost = async (post) => {
  const confirmar = confirm('Deseja deletar?')
  if (!confirmar) return

  try {
    await api.delete(`/posts/${post._id}/${usuario._id}`)
    carregarPosts()
  } catch (err) {
    console.log(err)
  }
}

onMounted(carregarPosts)
</script>

<style scoped>
@import '../assets/css/feed.css';

</style>