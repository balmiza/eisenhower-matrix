import { Idea, CreateIdeaData } from '../types/Idea'
import authenticatedApi from './authenticatedApi'

export const getAllIdeas = async (): Promise<Idea[]> => {
  const response = await authenticatedApi.get<Idea[]>('/ideas')
  return response.data
}

export const createIdea = async (data: CreateIdeaData): Promise<Idea> => {
  const response = await authenticatedApi.post<Idea>('/ideas', data)
  return response.data
}

export const updateIdea = async (id: string, data: CreateIdeaData): Promise<Idea> => {
  const response = await authenticatedApi.put<Idea>(`/ideas/${id}`, data)
  return response.data
}

export const deleteIdea = async (id: string): Promise<void> => {
  await authenticatedApi.delete(`/ideas/${id}`)
}
