<template>
  <div class="split-layout">
    <div class="form-side">
      <div class="form-container">

        <!-- ✅ LOGO DINÂMICA -->
        <img 
          :src="darkMode ? logoEscuro : logoClaro" 
          alt="EcoHub" 
          class="logo icon-logo"
        >

        <h2>Bem-vindo de volta!</h2>
        <p class="subtitle">Entre com sua conta para acessar o EcoHub</p>

        <div class="form-box">
          <div class="form-header">
            <h3>Login</h3>
            <p>Digite suas credenciais para acessar sua conta</p>
          </div>

          <form @submit.prevent="fazerLogin">
            <div class="grupo-input">
              <label>E-mail institucional</label>
              <div class="campo">
                <i class="fa-solid fa-envelope"></i>
                <input 
                  type="email" 
                  v-model="email" 
                  placeholder="seu.email@eniac.edu.br" 
                  required
                >
              </div>
            </div>
            
            <div class="grupo-input">
              <label>Senha</label>
              <div class="campo">
                <i class="fa-solid fa-lock"></i>
                <input 
                  :type="mostrarSenha ? 'text' : 'password'" 
                  v-model="senha" 
                  placeholder="Digite sua senha" 
                  required
                >
                <i 
                  class="fa-solid toggle-senha" 
                  :class="mostrarSenha ? 'fa-eye-slash' : 'fa-eye'" 
                  @click="mostrarSenha = !mostrarSenha" 
                  style="cursor: pointer;"
                ></i>
              </div>
            </div>

            <div class="opcoes-login">
              <input type="checkbox" id="lembrarLogin" v-model="lembrarMe">
              <label for="lembrarLogin">Lembrar-me</label>

              <p class="troca-pagina">
                <RouterLink to="/esqueci">Esqueceu a senha?</RouterLink>
              </p>
            </div>

            <button type="submit">Entrar</button>

            <p class="troca-pagina">
              Não tem cadastro? <RouterLink to="/cadastro">Cadastre-se</RouterLink>
            </p>
          </form>
        </div>

        <RouterLink to="/inicio" class="btn-voltar">
          ← Voltar para a página inicial
        </RouterLink>
      </div>
    </div>

    <div class="image-side">
      <div class="image-content">
        <h2>Conecte-se ao Ecossistema Eniac</h2>
        <p>Compartilhe seus projetos, participe de eventos e conecte-se com a comunidade.</p>
        
        <div class="stats-row-login">
          <div class="stat-item">
            <h3>13k+</h3>
            <span>Alunos</span>
          </div>
          <div class="stat-item">
            <h3>12k+</h3>
            <span>Projetos</span>
          </div>
          <div class="stat-item">
            <h3>50+</h3>
            <span>Startups</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api' // ✅ SÓ ADICIONEI ISSO

// ✅ IMPORTAÇÃO DAS IMAGENS (ESSENCIAL)
import logoClaro from '../assets/img/eniacpreto.png'
import logoEscuro from '../assets/img/ecoescuro.png'

const email = ref('')
const senha = ref('')
const lembrarMe = ref(false)
const mostrarSenha = ref(false)

// 🌙 CONTROLE DO DARK MODE
const darkMode = ref(false)

onMounted(() => {
  const temaSalvo = localStorage.getItem("theme")

  if (temaSalvo === "dark") {
    document.body.classList.add("dark-mode")
    darkMode.value = true
  }
})

// ✅ AGORA COM API (SEM MEXER NO RESTO)
const fazerLogin = async () => {
  try {
    const response = await api.post('/login', {
      email: email.value,
      senha: senha.value
    })

    console.log('Login sucesso:', response.data)

    // salva token se existir
    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
    }

  } catch (error) {
    console.error('Erro no login:', error)
    alert('Email ou senha inválidos')
  }
}
</script>

<style scoped>
@import '../assets/css/login_cadastro.css';

.icon-logo {
  width: 120px;
  margin-bottom: 15px;
  align-self: center;
}
</style>