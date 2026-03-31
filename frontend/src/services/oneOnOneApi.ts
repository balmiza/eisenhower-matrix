import axios from 'axios'
import { OneOnOne, CreateOneOnOneData } from '../types/OneOnOne'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
})

export const getAllOneOnOnes = async (): Promise<OneOnOne[]> => {
  const response = await api.get<OneOnOne[]>('/one-on-ones')
  return response.data
}

export const createOneOnOne = async (data: CreateOneOnOneData): Promise<OneOnOne> => {
  const response = await api.post<OneOnOne>('/one-on-ones', data)
  return response.data
}

export const updateOneOnOne = async (id: string, data: CreateOneOnOneData): Promise<OneOnOne> => {
  const response = await api.put<OneOnOne>(`/one-on-ones/${id}`, data)
  return response.data
}

export const deleteOneOnOne = async (id: string): Promise<void> => {
  await api.delete(`/one-on-ones/${id}`)
}
