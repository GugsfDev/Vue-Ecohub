<template>
  <div class="perfil-layout">

    <!-- LADO ESQUERDO -->
    <aside class="sidebar-perfil">
      <div class="card-perfil-main">

        <!-- MINHA FOTO: clicável -->
        <label v-if="ehMeuPerfil" class="foto-label">
          <img 
            :src="usuario?.foto || '/perfil.jpg'" 
            class="foto-grande"
          >
          <input 
            type="file" 
            accept="image/*" 
            @change="selecionarFoto" 
            class="input-foto-escondido"
          />
        </label>

        <!-- FOTO DE OUTRA PESSOA: normal -->
        <img 
          v-else
          :src="usuario?.foto || '/perfil.jpg'" 
          class="foto-grande"
        >

        <h2>{{ usuario?.nome }}</h2>
        <p class="username">@{{ usuario?.email?.split('@')[0] }}</p>

        <div class="perfil-stats">
          <span><strong>{{ usuario?.seguidores?.length || 0 }}</strong> seguidores</span>
          <span><strong>{{ usuario?.seguindo?.length || 0 }}</strong> seguindo</span>
        </div>

        <button v-if="ehMeuPerfil" @click="confirmarLogout">Sair</button>

        <button v-else @click="seguirOuDeixarDeSeguir">
          {{ jaSegue ? 'Seguindo' : 'Seguir' }}
        </button>

      </div>
    </aside>

    <!-- POSTS DO USUÁRIO -->
    <main class="perfil-posts">

      <h3>{{ ehMeuPerfil ? 'Meus Posts' : 'Posts do usuário' }}</h3>

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

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from 'api'

const route = useRoute()
const router = useRouter()

const usuario = ref(null)
const carregando = ref(false)
const erro = ref('')
const meusPosts = ref([])

const usuarioLogado = ref(JSON.parse(localStorage.getItem('usuario') || 'null'))

const ehMeuPerfil = computed(() => {
  return !!usuario.value?._id && !!usuarioLogado.value?._id && usuario.value._id === usuarioLogado.value._id
})

const jaSegue = computed(() => {
  return usuarioLogado.value?.seguindo?.includes(usuario.value?._id)
})

const carregarPostsDoUsuario = async (idUsuario) => {
  try {
    const response = await api.get('/posts')
    const posts = Array.isArray(response.data) ? response.data : []

    meusPosts.value = posts.filter(post => post.userId === idUsuario)
  } catch (e) {
    console.error('Erro ao carregar posts do usuário:', e)
    meusPosts.value = []
  }
}

const carregarPerfil = async () => {
  try {
    carregando.value = true
    erro.value = ''

    usuarioLogado.value = JSON.parse(localStorage.getItem('usuario') || 'null')

    const id = route.params.id

    if (id) {
      const response = await api.get(`/usuarios/${id}`)
      usuario.value = response.data

      if (usuario.value?._id) {
        await carregarPostsDoUsuario(usuario.value._id)
      } else {
        meusPosts.value = []
      }
    } else {
      usuario.value = usuarioLogado.value

      if (usuario.value?._id) {
        await carregarPostsDoUsuario(usuario.value._id)
      } else {
        meusPosts.value = []
      }
    }
  } catch (e) {
    console.error('Erro ao carregar perfil:', e)
    erro.value = 'Não foi possível carregar o perfil.'
    usuario.value = null
    meusPosts.value = []
  } finally {
    carregando.value = false
  }
}

const selecionarFoto = async (event) => {
  try {
    const arquivo = event.target.files[0]

    if (!arquivo) return
    if (!usuario.value?._id) return
    if (!ehMeuPerfil.value) return

    const reader = new FileReader()

    reader.onload = async () => {
      const fotoBase64 = reader.result

      const response = await api.put(`/usuarios/${usuario.value._id}/foto`, {
        foto: fotoBase64
      })

      usuario.value = response.data

      const usuarioLocal = JSON.parse(localStorage.getItem('usuario') || 'null')

      if (usuarioLocal && usuarioLocal._id === usuario.value._id) {
        localStorage.setItem('usuario', JSON.stringify(response.data))
        usuarioLogado.value = response.data
      }
    }

    reader.readAsDataURL(arquivo)
  } catch (e) {
    console.error('Erro ao atualizar foto:', e)
    alert('Erro ao atualizar foto.')
  }
}

const seguirOuDeixarDeSeguir = async () => {
  try {
    if (!usuarioLogado.value?._id || !usuario.value?._id) {
      alert('Faça login novamente.')
      return
    }

    const response = await api.put(`/usuarios/seguir/${usuario.value._id}`, {
      userId: usuarioLogado.value._id
    })

    usuarioLogado.value.seguindo = response.data.seguindo || []
    localStorage.setItem('usuario', JSON.stringify(usuarioLogado.value))

    const perfilAtualizado = await api.get(`/usuarios/${usuario.value._id}`)
    usuario.value = perfilAtualizado.data
  } catch (e) {
    console.error('Erro ao seguir usuário:', e)
    alert('Erro ao seguir usuário.')
  }
}

const confirmarLogout = () => {
  localStorage.removeItem('usuario')
  router.push('/login')
}

onMounted(carregarPerfil)
watch(() => route.params.id, carregarPerfil)
</script>

<style scoped>
@import "../assets/css/geral.css";
@import "../assets/css/perfil.css";

</style>