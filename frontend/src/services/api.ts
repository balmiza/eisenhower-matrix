import axios from 'axios'
import { Task, Quadrant } from '../types/Task'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
})

export interface CreateTaskData {
  title: string
  description?: string
  quadrant: Quadrant
}

export const createTask = async (data: CreateTaskData): Promise<Task> => {
  const response = await api.post<Task>('/tasks', data)
  return response.data
}

export const getAllTasks = async (): Promise<Task[]> => {
  const response = await api.get<Task[]>('/tasks')
  return response.data
}

export const getTasksByQuadrant = async (quadrant: Quadrant): Promise<Task[]> => {
  const response = await api.get<Task[]>(`/tasks?quadrant=${quadrant}`)
  return response.data
}

export const completeTask = async (id: string): Promise<Task> => {
  const response = await api.patch<Task>(`/tasks/${id}/complete`)
  return response.data
}

export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`)
}

export default api
