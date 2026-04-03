import axios from 'axios'
import { JournalEntry, CreateJournalEntryData } from '../types/JournalEntry'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
})

export const getAllEntries = async (): Promise<JournalEntry[]> => {
  const response = await api.get<JournalEntry[]>('/journal')
  return response.data
}

export const createEntry = async (data: CreateJournalEntryData): Promise<JournalEntry> => {
  const response = await api.post<JournalEntry>('/journal', data)
  return response.data
}

export const updateEntry = async (id: string, data: CreateJournalEntryData): Promise<JournalEntry> => {
  const response = await api.put<JournalEntry>(`/journal/${id}`, data)
  return response.data
}

export const deleteEntry = async (id: string): Promise<void> => {
  await api.delete(`/journal/${id}`)
}
