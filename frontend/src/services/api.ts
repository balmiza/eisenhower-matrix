import { Task, Quadrant, Matrix } from '../types/Task'
import authenticatedApi from './authenticatedApi'

export interface CreateTaskData {
  title: string
  description?: string
  quadrant: Quadrant
  dueDate?: string
  matrix?: Matrix
}

export const createTask = async (data: CreateTaskData): Promise<Task> => {
  const response = await authenticatedApi.post<Task>('/tasks', data)
  return response.data
}

export const getAllTasks = async (matrix: Matrix = 'PERSONAL'): Promise<Task[]> => {
  const response = await authenticatedApi.get<Task[]>(`/tasks?matrix=${matrix}`)
  return response.data
}

export const getTasksByQuadrant = async (quadrant: Quadrant): Promise<Task[]> => {
  const response = await authenticatedApi.get<Task[]>(`/tasks?quadrant=${quadrant}`)
  return response.data
}

export const completeTask = async (id: string): Promise<Task> => {
  const response = await authenticatedApi.patch<Task>(`/tasks/${id}/complete`)
  return response.data
}

export const moveTask = async (id: string, quadrant: Quadrant): Promise<Task> => {
  const response = await authenticatedApi.patch<Task>(`/tasks/${id}/move?quadrant=${quadrant}`)
  return response.data
}

export const deleteTask = async (id: string): Promise<void> => {
  await authenticatedApi.delete(`/tasks/${id}`)
}

export default authenticatedApi
