<template>
  <div class="buscar-usuarios-page">
    <h2>Buscar usuários</h2>

    <input
      v-model="busca"
      type="text"
      placeholder="Digite o nome do usuário"
    />

    <p v-if="carregando">Carregando...</p>
    <p v-if="erro">{{ erro }}</p>

    <div v-if="!busca.trim() && recentes.length">
      <h3>Pesquisas recentes</h3>

      <div
        v-for="user in recentes"
        :key="user._id"
        class="usuario-item"
      >
        <div class="usuario-info">
          <img
            :src="user.foto || '/perfil.jpg'"
            class="usuario-foto"
            alt="Foto do usuário"
          />

          <RouterLink
            :to="`/perfil/${user._id}`"
            class="usuario-nome"
            @click="salvarRecente(user)"
          >
            {{ user.nome }}
          </RouterLink>
        </div>
      </div>
    </div>

    <div v-if="busca.trim() && !carregando && !erro && usuarios.length === 0">
      <p>Nenhum usuário encontrado.</p>
    </div>

    <div
      v-if="busca.trim()"
      v-for="user in usuarios"
      :key="user._id"
      class="usuario-item"
    >
      <div class="usuario-info">
        <img
          :src="user.foto || '/perfil.jpg'"
          class="usuario-foto"
          alt="Foto do usuário"
        />

        <RouterLink
          :to="`/perfil/${user._id}`"
          class="usuario-nome"
          @click="salvarRecente(user)"
        >
          {{ user.nome }}
        </RouterLink>
      </div>

      <button @click="seguir(user._id)">
        {{ usuarioLogado?.seguindo?.includes(user._id) ? 'Seguindo' : 'Seguir' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import api from 'api'

const busca = ref('')
const usuarios = ref([])
const recentes = ref([])
const carregando = ref(false)
const erro = ref('')

const usuarioLogado = JSON.parse(localStorage.getItem('usuario') || 'null')

const getChaveRecentes = () => {
  if (!usuarioLogado?._id) return null
  return `recentes_${usuarioLogado._id}`
}

const buscarUsuarios = async () => {
  try {
    const termo = busca.value.trim()

    if (!termo) {
      usuarios.value = []
      return
    }

    carregando.value = true
    erro.value = ''

    const response = await api.get(`/usuarios?nome=${encodeURIComponent(termo)}`)

    let lista = Array.isArray(response.data) ? response.data : []

    if (usuarioLogado?._id) {
      lista = lista.filter(user => user._id !== usuarioLogado._id)
    }

    usuarios.value = lista
  } catch (e) {
    console.error('Erro ao buscar usuários:', e)
    erro.value = 'Não foi possível buscar usuários.'
    usuarios.value = []
  } finally {
    carregando.value = false
  }
}

const seguir = async (id) => {
  try {
    if (!usuarioLogado?._id) {
      alert('Faça login novamente.')
      return
    }

    const response = await api.put(`/usuarios/seguir/${id}`, {
      userId: usuarioLogado._id
    })

    usuarioLogado.seguindo = response.data.seguindo || []
    localStorage.setItem('usuario', JSON.stringify(usuarioLogado))

    await buscarUsuarios()
  } catch (e) {
    console.error('Erro ao seguir usuário:', e)
    alert('Erro ao seguir usuário.')
  }
}

const salvarRecente = (user) => {
  const chave = getChaveRecentes()
  if (!chave) return

  let lista = JSON.parse(localStorage.getItem(chave) || '[]')

  lista = lista.filter(u => u._id !== user._id)
  lista.unshift(user)
  lista = lista.slice(0, 5)

  localStorage.setItem(chave, JSON.stringify(lista))
  recentes.value = lista
}

watch(busca, () => {
  buscarUsuarios()
})

onMounted(() => {
  const chave = getChaveRecentes()
  if (!chave) return

  recentes.value = JSON.parse(localStorage.getItem(chave) || '[]')
})
</script>

<style scoped>
@import "../assets/css/buscarusuario.css";
@import "../assets/css/geral.css";
</style>