import axios from 'axios'
import { Goal, CreateGoalData } from '../types/Goal'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
})

export const getAllGoals = async (): Promise<Goal[]> => {
  const response = await api.get<Goal[]>('/goals')
  return response.data
}

export const createGoal = async (data: CreateGoalData): Promise<Goal> => {
  const response = await api.post<Goal>('/goals', data)
  return response.data
}

export const updateGoal = async (id: string, data: CreateGoalData): Promise<Goal> => {
  const response = await api.put<Goal>(`/goals/${id}`, data)
  return response.data
}

export const deleteGoal = async (id: string): Promise<void> => {
  await api.delete(`/goals/${id}`)
}
