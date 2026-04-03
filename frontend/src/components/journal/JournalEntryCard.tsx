import React from 'react'
import { JournalEntry, JournalEntryType } from '../../types/JournalEntry'

interface JournalEntryCardProps {
  entry: JournalEntry
  onEdit: (entry: JournalEntry) => void
  onDelete: (id: string) => void
}

const TYPE_LABEL: Record<JournalEntryType, string> = {
  LEARNING: '📖 Aprendizado',
  ACHIEVEMENT: '🏆 Conquista',
  CHALLENGE: '⚡ Desafio',
}

const TYPE_MODIFIER: Record<JournalEntryType, string> = {
  LEARNING: 'learning',
  ACHIEVEMENT: 'achievement',
  CHALLENGE: 'challenge',
}

const JournalEntryCard: React.FC<JournalEntryCardProps> = ({ entry, onEdit, onDelete }) => {
  const formattedDate = new Date(entry.date + 'T00:00:00').toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="journal-entry-card">
      <div className="journal-entry-card__header">
        <span className="journal-entry-card__date">{formattedDate}</span>
        <span className={`journal-entry-card__type-badge journal-entry-card__type-badge--${TYPE_MODIFIER[entry.type]}`}>
          {TYPE_LABEL[entry.type]}
        </span>
      </div>

      <p className="journal-entry-card__content">{entry.content}</p>

      <div className="journal-entry-card__footer">
        <div className="journal-entry-card__actions">
          <button
            className="journal-entry-card__btn journal-entry-card__btn--edit"
            onClick={() => onEdit(entry)}
            aria-label="Editar entrada"
          >
            ✏️
          </button>
          <button
            className="journal-entry-card__btn journal-entry-card__btn--delete"
            onClick={() => onDelete(entry.id)}
            aria-label="Deletar entrada"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  )
}

export default JournalEntryCard
