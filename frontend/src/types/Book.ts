export type BookStatus = 'WANT_TO_READ' | 'READING' | 'READ'

export interface Book {
  id: string
  title: string
  author: string
  category: string | null
  status: BookStatus
  rating: number | null
  mainPoints: string | null
  readingDate: string | null
  createdAt: string
}

export interface CreateBookData {
  title: string
  author: string
  category?: string
  status?: BookStatus
  rating?: number
  mainPoints?: string
  readingDate?: string
}
