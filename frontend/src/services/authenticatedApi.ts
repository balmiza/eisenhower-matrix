import axios from 'axios'
import { auth } from '../firebase'

const authenticatedApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
})

authenticatedApi.interceptors.request.use(async (config) => {
  const user = auth.currentUser
  if (user) {
    const token = await user.getIdToken()
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default authenticatedApi
