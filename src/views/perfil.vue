<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'

const router = useRouter()

const usuario = ref(null)
const posts = ref([])

/* ================================
   CARREGA USUÁRIO + POSTS
================================ */
onMounted(async () => {
  const userStorage = localStorage.getItem('usuario')

  if (userStorage) {
    usuario.value = JSON.parse(userStorage)

    // 🔥 BUSCA POSTS
    const res = await api.get('/posts')
    posts.value = res.data

  } else {
    router.push('/login')
  }
})

/* ================================
   FILTRA POSTS DO USUÁRIO
================================ */
const meusPosts = computed(() => {
  if (!usuario.value) return []

  return posts.value.filter(post => {
    const postUserId =
      typeof post.userId === 'object'
        ? post.userId._id
        : post.userId

    return postUserId == usuario.value._id
  })
})

/* ================================
   UPLOAD FOTO
================================ */
const selecionarFoto = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()

  reader.onload = async () => {
    const base64 = reader.result

    const res = await api.put(`/usuarios/${usuario.value._id}/foto`, {
      foto: base64
    })

    usuario.value = res.data
    localStorage.setItem('usuario', JSON.stringify(res.data))
  }

  reader.readAsDataURL(file)
}

/* ================================
   LOGOUT
================================ */
const confirmarLogout = () => {
  const confirmar = confirm("Deseja sair?")

  if (confirmar) {
    localStorage.removeItem('usuario')
    router.push('/login')
  }
}
</script>

<template>
  <div class="perfil-layout">

    <!-- LADO ESQUERDO -->
    <aside class="sidebar-perfil">
      <div class="card-perfil-main">

        <img 
          :src="usuario?.foto || '/perfil.jpg'" 
          class="foto-grande"
        >

        <input type="file" @change="selecionarFoto" />

        <h2>{{ usuario?.nome }}</h2>
        <p class="username">@{{ usuario?.email?.split('@')[0] }}</p>

        <button @click="confirmarLogout">Sair</button>

      </div>
    </aside>

    <!-- POSTS DO USUÁRIO -->
    <main class="perfil-posts">

      <h3>Meus Posts</h3>

      <div v-if="meusPosts.length === 0">
        Nenhum post ainda...
      </div>

      <div 
        v-for="post in meusPosts" 
        :key="post._id" 
        class="post-card"
      >
        <p>{{ post.conteudo }}</p>

        <small>❤️ {{ post.likes }}</small>
      </div>

    </main>

  </div>
</template>

<style scoped>
@import "../assets/css/geral.css";
@import "../assets/css/perfil.css";

/* 🔥 POSTS NO PERFIL */
.perfil-posts {
  flex: 1;
  padding: 20px;
}

.post-card {
  background: #fff;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 10px;
}
</style>