import axios from 'axios'

const api = axios.create({
  baseURL: 'https://5c2k0pdyag.execute-api.us-east-1.amazonaws.com/v1'
})

export default api
