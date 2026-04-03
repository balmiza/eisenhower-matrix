import { Book, CreateBookData } from '../types/Book'
import authenticatedApi from './authenticatedApi'

export const getAllBooks = async (): Promise<Book[]> => {
  const response = await authenticatedApi.get<Book[]>('/books')
  return response.data
}

export const createBook = async (data: CreateBookData): Promise<Book> => {
  const response = await authenticatedApi.post<Book>('/books', data)
  return response.data
}

export const updateBook = async (id: string, data: CreateBookData): Promise<Book> => {
  const response = await authenticatedApi.put<Book>(`/books/${id}`, data)
  return response.data
}

export const deleteBook = async (id: string): Promise<void> => {
  await authenticatedApi.delete(`/books/${id}`)
}
