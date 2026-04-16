<script setup>
import { ref, watch, onMounted } from 'vue'
import api from '../services/api'

const busca = ref('')
const usuarios = ref([])
const recentes = ref([])

const usuarioLogado = JSON.parse(localStorage.getItem('usuario'))

/* =========================================
   🔍 BUSCAR USUÁRIOS
========================================= */
const buscarUsuarios = async () => {
  const response = await api.get('/usuarios?nome=' + busca.value)
  usuarios.value = response.data
}

/* 🔥 BUSCA AUTOMÁTICA AO DIGITAR */
watch(busca, () => {
  buscarUsuarios()
})

/* =========================================
   👥 SEGUIR
========================================= */
const seguir = async (id) => {
  await api.put('/usuarios/seguir/' + id, {
    userId: usuarioLogado._id
  })

  buscarUsuarios()
}

/* =========================================
   🕒 SALVAR RECENTES
========================================= */
const salvarRecente = (user) => {
  let lista = JSON.parse(localStorage.getItem('recentes')) || []

  // remove duplicado
  lista = lista.filter(u => u._id !== user._id)

  // adiciona no topo
  lista.unshift(user)

  // limita a 5
  lista = lista.slice(0, 5)

  localStorage.setItem('recentes', JSON.stringify(lista))

  recentes.value = lista
}

/* =========================================
   📦 CARREGAR RECENTES
========================================= */
onMounted(() => {
  recentes.value = JSON.parse(localStorage.getItem('recentes')) || []
})
</script>

<template>
  <div>
    <h2>Buscar usuários</h2>

    <input v-model="busca" placeholder="Digite o nome" />

    <!-- 🔥 RECENTES -->
    <div v-if="!busca && recentes.length">
      <h3>Pesquisas recentes</h3>

      <div v-for="user in recentes" :key="user._id">
        <p @click="salvarRecente(user)">
          {{ user.nome }}
        </p>
      </div>
    </div>

    <!-- 🔍 RESULTADOS -->
    <div v-for="user in usuarios" :key="user._id">
      <p @click="salvarRecente(user)">
        {{ user.nome }}
      </p>

      <button @click="seguir(user._id)">
        {{ usuarioLogado.seguindo?.includes(user._id)
          ? 'Deixar de seguir'
          : 'Seguir'
        }}
      </button>
    </div>
  </div>
</template>