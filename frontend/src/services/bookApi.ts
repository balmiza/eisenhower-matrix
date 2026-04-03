import axios from 'axios'
import { Book, CreateBookData } from '../types/Book'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
})

export const getAllBooks = async (): Promise<Book[]> => {
  const response = await api.get<Book[]>('/books')
  return response.data
}

export const createBook = async (data: CreateBookData): Promise<Book> => {
  const response = await api.post<Book>('/books', data)
  return response.data
}

export const updateBook = async (id: string, data: CreateBookData): Promise<Book> => {
  const response = await api.put<Book>(`/books/${id}`, data)
  return response.data
}

export const deleteBook = async (id: string): Promise<void> => {
  await api.delete(`/books/${id}`)
}
