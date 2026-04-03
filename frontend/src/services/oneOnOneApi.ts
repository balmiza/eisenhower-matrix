import { OneOnOne, CreateOneOnOneData } from '../types/OneOnOne'
import authenticatedApi from './authenticatedApi'

export const getAllOneOnOnes = async (): Promise<OneOnOne[]> => {
  const response = await authenticatedApi.get<OneOnOne[]>('/one-on-ones')
  return response.data
}

export const createOneOnOne = async (data: CreateOneOnOneData): Promise<OneOnOne> => {
  const response = await authenticatedApi.post<OneOnOne>('/one-on-ones', data)
  return response.data
}

export const updateOneOnOne = async (id: string, data: CreateOneOnOneData): Promise<OneOnOne> => {
  const response = await authenticatedApi.put<OneOnOne>(`/one-on-ones/${id}`, data)
  return response.data
}

export const deleteOneOnOne = async (id: string): Promise<void> => {
  await authenticatedApi.delete(`/one-on-ones/${id}`)
}
