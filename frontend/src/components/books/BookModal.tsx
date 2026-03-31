import React, { useEffect, useState } from 'react'
import { Book, BookStatus, CreateBookData } from '../../types/Book'

interface BookModalProps {
  book?: Book | null
  onSave: (data: CreateBookData) => Promise<void>
  onClose: () => void
}

const BookModal: React.FC<BookModalProps> = ({ book, onSave, onClose }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState<BookStatus>('WANT_TO_READ')
  const [rating, setRating] = useState<number | ''>('')
  const [mainPoints, setMainPoints] = useState('')
  const [readingDate, setReadingDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (book) {
      setTitle(book.title)
      setAuthor(book.author)
      setCategory(book.category || '')
      setStatus(book.status)
      setRating(book.rating ?? '')
      setMainPoints(book.mainPoints || '')
      setReadingDate(book.readingDate || '')
    }
  }, [book])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) {
      setError('O título é obrigatório.')
      return
    }
    if (!author.trim()) {
      setError('O autor é obrigatório.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      await onSave({
        title: title.trim(),
        author: author.trim(),
        category: category.trim() || undefined,
        status,
        rating: rating !== '' ? Number(rating) : undefined,
        mainPoints: mainPoints.trim() || undefined,
        readingDate: readingDate || undefined,
      })
      onClose()
    } catch {
      setError('Erro ao salvar livro. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h3 className="modal__title">{book ? 'Editar Livro' : 'Novo Livro'}</h3>
          <button className="modal__close" onClick={onClose} aria-label="Fechar modal">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal__form">
          <div className="form-group">
            <label htmlFor="book-title" className="form-label">Título *</label>
            <input
              id="book-title"
              type="text"
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: O Poder do Hábito"
              maxLength={255}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="book-author" className="form-label">Autor *</label>
            <input
              id="book-author"
              type="text"
              className="form-input"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Ex: Charles Duhigg"
              maxLength={255}
            />
          </div>

          <div className="modal__form-row">
            <div className="form-group">
              <label htmlFor="book-category" className="form-label">Categoria (opcional)</label>
              <input
                id="book-category"
                type="text"
                className="form-input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Ex: Desenvolvimento Pessoal"
                maxLength={100}
              />
            </div>

            <div className="form-group">
              <label htmlFor="book-status" className="form-label">Status</label>
              <select
                id="book-status"
                className="form-input"
                value={status}
                onChange={(e) => setStatus(e.target.value as BookStatus)}
              >
                <option value="WANT_TO_READ">Quero Ler</option>
                <option value="READING">Lendo</option>
                <option value="READ">Lido</option>
              </select>
            </div>
          </div>

          <div className="modal__form-row">
            <div className="form-group">
              <label htmlFor="book-rating" className="form-label">Avaliação (1-5, opcional)</label>
              <select
                id="book-rating"
                className="form-input"
                value={rating}
                onChange={(e) => setRating(e.target.value === '' ? '' : Number(e.target.value))}
              >
                <option value="">Sem avaliação</option>
                <option value="1">⭐ 1</option>
                <option value="2">⭐⭐ 2</option>
                <option value="3">⭐⭐⭐ 3</option>
                <option value="4">⭐⭐⭐⭐ 4</option>
                <option value="5">⭐⭐⭐⭐⭐ 5</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="book-reading-date" className="form-label">Data de leitura (opcional)</label>
              <input
                id="book-reading-date"
                type="date"
                className="form-input"
                value={readingDate}
                onChange={(e) => setReadingDate(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="book-main-points" className="form-label">Pontos principais (opcional)</label>
            <textarea
              id="book-main-points"
              className="form-textarea"
              value={mainPoints}
              onChange={(e) => setMainPoints(e.target.value)}
              placeholder="Anote os principais aprendizados do livro..."
              rows={3}
            />
          </div>

          {error && <p className="form-error">{error}</p>}

          <div className="modal__actions">
            <button type="button" className="btn btn--secondary" onClick={onClose} disabled={loading}>
              Cancelar
            </button>
            <button type="submit" className="btn btn--primary" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BookModal
