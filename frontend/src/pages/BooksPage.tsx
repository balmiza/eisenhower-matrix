import React, { useEffect, useState } from 'react'
import { Book, CreateBookData } from '../types/Book'
import { getAllBooks, createBook, updateBook, deleteBook } from '../services/bookApi'
import BookCard from '../components/books/BookCard'
import BookModal from '../components/books/BookModal'
import ConfirmModal from '../components/ConfirmModal'
import Toast, { ToastMessage, ToastType } from '../components/Toast'

interface BooksPageProps {
  sortBy: 'date' | 'createdAt'
}

const BooksPage: React.FC<BooksPageProps> = ({ sortBy }) => {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingBook, setEditingBook] = useState<Book | null>(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const showToast = (message: string, type: ToastType) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
  }
  const dismissToast = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id))

  useEffect(() => {
    loadBooks()
  }, [])

  const loadBooks = async () => {
    try {
      setLoading(true)
      const data = await getAllBooks()
      setBooks(Array.isArray(data) ? data : [])
      setError(null)
    } catch {
      setError('Erro ao carregar livros. Verifique a conexão com o servidor.')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (data: CreateBookData) => {
    if (editingBook) {
      const updated = await updateBook(editingBook.id, data)
      setBooks((prev) => prev.map((b) => (b.id === editingBook.id ? updated : b)))
      showToast('Livro atualizado!', 'success')
    } else {
      const created = await createBook(data)
      setBooks((prev) => [...prev, created])
      showToast('Livro adicionado!', 'success')
    }
  }

  const handleEdit = (book: Book) => {
    setEditingBook(book)
    setModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!confirmDeleteId) return
    const id = confirmDeleteId
    setConfirmDeleteId(null)
    try {
      await deleteBook(id)
      setBooks((prev) => prev.filter((b) => b.id !== id))
    } catch {
      showToast('Erro ao deletar livro.', 'error')
    }
  }

  const total = books.length
  const read = books.filter((b) => b.status === 'READ').length
  const reading = books.filter((b) => b.status === 'READING').length
  const wantToRead = books.filter((b) => b.status === 'WANT_TO_READ').length

  if (loading) {
    return <div className="app-loading"><p>Carregando livros...</p></div>
  }

  return (
    <div className="books-page">
      <div className="books-header">
        <div>
          <h1 className="books-header__title">Minha Biblioteca</h1>
          <p className="books-header__subtitle">Gerencie seus livros e acompanhe suas leituras</p>
        </div>
        <button
          className="btn btn--primary"
          onClick={() => { setEditingBook(null); setModalOpen(true) }}
        >
          + Novo Livro
        </button>
      </div>

      {error && <p className="app-error">{error}</p>}

      <div className="books-summary">
        <div className="books-summary__card">
          <span className="books-summary__label">Total</span>
          <span className="books-summary__value books-summary__value--indigo">{total}</span>
        </div>
        <div className="books-summary__card">
          <span className="books-summary__label">Lidos</span>
          <span className="books-summary__value books-summary__value--green">{read}</span>
        </div>
        <div className="books-summary__card">
          <span className="books-summary__label">Lendo</span>
          <span className="books-summary__value books-summary__value--yellow">{reading}</span>
        </div>
        <div className="books-summary__card">
          <span className="books-summary__label">Quero Ler</span>
          <span className="books-summary__value books-summary__value--slate">{wantToRead}</span>
        </div>
      </div>

      <div className="books-list">
        {books.length === 0 ? (
          <p className="books-empty">Nenhum livro. Clique em + Novo Livro para adicionar.</p>
        ) : (
          [...books].sort((a, b) => {
            if (sortBy === 'date') {
              if (!a.readingDate && !b.readingDate) return 0
              if (!a.readingDate) return 1
              if (!b.readingDate) return -1
              return new Date(a.readingDate).getTime() - new Date(b.readingDate).getTime()
            }
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          }).map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onEdit={handleEdit}
              onDelete={setConfirmDeleteId}
            />
          ))
        )}
      </div>

      {modalOpen && (
        <BookModal
          book={editingBook}
          onSave={handleSave}
          onClose={() => { setModalOpen(false); setEditingBook(null) }}
        />
      )}

      {confirmDeleteId && (
        <ConfirmModal
          message="Tem certeza que deseja deletar este livro?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setConfirmDeleteId(null)}
        />
      )}

      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  )
}

export default BooksPage
