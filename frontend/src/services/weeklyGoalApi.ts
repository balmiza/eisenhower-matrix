import { WeeklyGoal, CreateWeeklyGoalData } from '../types/WeeklyGoal'
import authenticatedApi from './authenticatedApi'

export const getAllWeeklyGoals = async (): Promise<WeeklyGoal[]> => {
  const response = await authenticatedApi.get<WeeklyGoal[]>('/weekly-goals')
  return response.data
}

export const createWeeklyGoal = async (data: CreateWeeklyGoalData): Promise<WeeklyGoal> => {
  const response = await authenticatedApi.post<WeeklyGoal>('/weekly-goals', data)
  return response.data
}

export const updateWeeklyGoal = async (id: string, data: CreateWeeklyGoalData): Promise<WeeklyGoal> => {
  const response = await authenticatedApi.put<WeeklyGoal>(`/weekly-goals/${id}`, data)
  return response.data
}

export const completeWeeklyGoal = async (id: string): Promise<WeeklyGoal> => {
  const response = await authenticatedApi.patch<WeeklyGoal>(`/weekly-goals/${id}/complete`)
  return response.data
}

export const deleteWeeklyGoal = async (id: string): Promise<void> => {
  await authenticatedApi.delete(`/weekly-goals/${id}`)
}
