import { Goal, CreateGoalData } from '../types/Goal'
import authenticatedApi from './authenticatedApi'

export const getAllGoals = async (): Promise<Goal[]> => {
  const response = await authenticatedApi.get<Goal[]>('/goals')
  return response.data
}

export const createGoal = async (data: CreateGoalData): Promise<Goal> => {
  const response = await authenticatedApi.post<Goal>('/goals', data)
  return response.data
}

export const updateGoal = async (id: string, data: CreateGoalData): Promise<Goal> => {
  const response = await authenticatedApi.put<Goal>(`/goals/${id}`, data)
  return response.data
}

export const deleteGoal = async (id: string): Promise<void> => {
  await authenticatedApi.delete(`/goals/${id}`)
}
