import React from 'react'
import { Book, BookStatus } from '../../types/Book'

interface BookCardProps {
  book: Book
  onEdit: (book: Book) => void
  onDelete: (id: string) => void
}

const STATUS_LABEL: Record<BookStatus, string> = {
  WANT_TO_READ: 'Quero Ler',
  READING: 'Lendo',
  READ: 'Lido',
}

const BookCard: React.FC<BookCardProps> = ({ book, onEdit, onDelete }) => {
  const renderStars = (rating: number | null) => {
    if (!rating) return null
    return (
      <span className="book-card__rating">
        {'⭐'.repeat(rating)}
      </span>
    )
  }

  const truncate = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + '...'
  }

  return (
    <div className="book-card">
      <div className="book-card__top">
        <div className="book-card__info">
          <span className="book-card__title">{book.title}</span>
          <span className="book-card__author">{book.author}</span>
        </div>
        <span className={`book-card__status-badge book-card__status-badge--${book.status.toLowerCase().replace(/_/g, '-')}`}>
          {STATUS_LABEL[book.status]}
        </span>
      </div>

      {book.category && (
        <span className="book-card__category">{book.category}</span>
      )}

      {renderStars(book.rating)}

      {book.mainPoints && (
        <p className="book-card__main-points">{truncate(book.mainPoints, 120)}</p>
      )}

      <div className="book-card__footer">
        {book.readingDate && (
          <span className="book-card__date">
            {new Date(book.readingDate + 'T00:00:00').toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })}
          </span>
        )}
        <div className="book-card__actions">
          <button
            className="book-card__btn book-card__btn--edit"
            onClick={() => onEdit(book)}
            aria-label="Editar livro"
          >
            ✏️
          </button>
          <button
            className="book-card__btn book-card__btn--delete"
            onClick={() => onDelete(book.id)}
            aria-label="Deletar livro"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookCard
