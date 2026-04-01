import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000' // O endereço onde sua API Node está rodando
})

export default api