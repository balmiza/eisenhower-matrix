import React from 'react'
import { OneOnOne } from '../../types/OneOnOne'

interface OneOnOneCardProps {
  oneOnOne: OneOnOne
  onEdit: (oneOnOne: OneOnOne) => void
  onDelete: (id: string) => void
}

const OneOnOneCard: React.FC<OneOnOneCardProps> = ({ oneOnOne, onEdit, onDelete }) => {
  const formattedDate = new Date(oneOnOne.date + 'T00:00:00').toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="one-on-one-card">
      <div className="one-on-one-card__header">
        <span className="one-on-one-card__date">{formattedDate}</span>
        <div className="one-on-one-card__actions">
          <button
            className="one-on-one-card__btn one-on-one-card__btn--edit"
            onClick={() => onEdit(oneOnOne)}
            aria-label="Editar reunião"
          >
            ✏️
          </button>
          <button
            className="one-on-one-card__btn one-on-one-card__btn--delete"
            onClick={() => onDelete(oneOnOne.id)}
            aria-label="Deletar reunião"
          >
            🗑️
          </button>
        </div>
      </div>

      <div className="one-on-one-card__manager">
        <span className="one-on-one-card__manager-icon">👤</span>
        <span className="one-on-one-card__manager-name">{oneOnOne.manager}</span>
      </div>

      {oneOnOne.agenda && (
        <div className="one-on-one-card__section">
          <span className="one-on-one-card__section-label">Pauta</span>
          <p className="one-on-one-card__section-text">{oneOnOne.agenda}</p>
        </div>
      )}

      {oneOnOne.notes && (
        <div className="one-on-one-card__section">
          <span className="one-on-one-card__section-label">Anotações</span>
          <p className="one-on-one-card__section-text">{oneOnOne.notes}</p>
        </div>
      )}

      {oneOnOne.nextSteps && (
        <div className="one-on-one-card__section">
          <span className="one-on-one-card__section-label">Próximos Passos</span>
          <p className="one-on-one-card__section-text">{oneOnOne.nextSteps}</p>
        </div>
      )}
    </div>
  )
}

export default OneOnOneCard
