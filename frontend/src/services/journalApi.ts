import { JournalEntry, CreateJournalEntryData } from '../types/JournalEntry'
import authenticatedApi from './authenticatedApi'

export const getAllEntries = async (): Promise<JournalEntry[]> => {
  const response = await authenticatedApi.get<JournalEntry[]>('/journal')
  return response.data
}

export const createEntry = async (data: CreateJournalEntryData): Promise<JournalEntry> => {
  const response = await authenticatedApi.post<JournalEntry>('/journal', data)
  return response.data
}

export const updateEntry = async (id: string, data: CreateJournalEntryData): Promise<JournalEntry> => {
  const response = await authenticatedApi.put<JournalEntry>(`/journal/${id}`, data)
  return response.data
}

export const deleteEntry = async (id: string): Promise<void> => {
  await authenticatedApi.delete(`/journal/${id}`)
}
