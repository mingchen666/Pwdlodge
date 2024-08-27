import axios from 'axios'

const request = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_URL, 
  // baseURL: 'http://localhost:5000',
  timeout: 5000 
})

export default request