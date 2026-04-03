export type JournalEntryType = 'LEARNING' | 'ACHIEVEMENT' | 'CHALLENGE'

export interface JournalEntry {
  id: string
  date: string
  type: JournalEntryType
  content: string
  createdAt: string
}

export interface CreateJournalEntryData {
  date: string
  type: JournalEntryType
  content: string
}
