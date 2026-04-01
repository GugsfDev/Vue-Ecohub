<template>
  <main>

    <div class="brand">
      <span class="brand-name">MeuSite</span>
    </div>

    <div class="card">

      <!-- FORM -->
      <div v-if="!sucesso" class="form-area">

        <h1>Esqueceu a senha?</h1>
        <p class="sub">
          Informe o e-mail da sua conta e enviaremos um link.
        </p>

        <div class="field">
          <label>E-mail</label>

          <input
            type="email"
            v-model="email"
            placeholder="seu@email.com"
            @input="limparErro"
            @keydown.enter="enviar"
          />

          <div v-if="erro" class="msg error">
            {{ erro }}
          </div>
        </div>

        <button @click="enviar" :class="{ loading: carregando }">
          {{ carregando ? "Enviando..." : "Enviar link" }}
        </button>

      </div>

      <!-- SUCESSO -->
      <div v-else class="success-panel">
        <h2>E-mail enviado!</h2>
        <p>
          Enviamos um link para <strong>{{ email }}</strong>
        </p>
      </div>

    </div>

  </main>
</template>

<style scoped>
/* O caminho correto para sair de views/ e entrar em assets/css/ */
@import "../assets/css/esqueci.css";
</style>

<script>
export default {
  data() {
    return {
      email: "",
      erro: "",
      sucesso: false,
      carregando: false
    }
  },

  methods: {
    enviar() {
      this.erro = ""

      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      if (!this.email) {
        this.erro = "Informe seu e-mail"
        return
      }

      if (!regex.test(this.email)) {
        this.erro = "E-mail inválido"
        return
      }

      this.carregando = true

      setTimeout(() => {
        this.carregando = false
        this.sucesso = true
      }, 1500)
    },

    limparErro() {
      this.erro = ""
    }
  }
}
</script>

