import React from 'react'
import { Goal, GoalCategory, GoalStatus } from '../../types/Goal'

interface GoalCardProps {
  goal: Goal
  onEdit: (goal: Goal) => void
  onDelete: (id: string) => void
}

const CATEGORY_LABEL: Record<GoalCategory, string> = {
  TECHNICAL: 'Técnica',
  BEHAVIORAL: 'Comportamental',
  LEADERSHIP: 'Liderança',
}

const STATUS_LABEL: Record<GoalStatus, string> = {
  NOT_STARTED: 'Não iniciada',
  IN_PROGRESS: 'Em andamento',
  DONE: 'Concluída',
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, onEdit, onDelete }) => {
  const progressColor = goal.status === 'DONE' ? '#4ade80' : '#6366f1'

  return (
    <div className="goal-card">
      <div className="goal-card__top">
        <span className="goal-card__title">{goal.title}</span>
        <span className={`goal-card__category goal-card__category--${goal.category.toLowerCase()}`}>
          {CATEGORY_LABEL[goal.category]}
        </span>
      </div>

      {goal.description && (
        <p className="goal-card__desc">{goal.description}</p>
      )}

      <div className="goal-card__progress">
        <div className="goal-card__progress-top">
          <span>Progresso</span>
          <span>{goal.progress}%</span>
        </div>
        <div className="goal-card__progress-bar">
          <div
            className="goal-card__progress-fill"
            style={{ width: `${goal.progress}%`, backgroundColor: progressColor }}
          />
        </div>
      </div>

      <div className="goal-card__footer">
        <span className={`goal-card__status goal-card__status--${goal.status.toLowerCase().replace('_', '-')}`}>
          {STATUS_LABEL[goal.status]}
        </span>
        <div className="goal-card__actions">
          {goal.dueDate && (
            <span className="goal-card__date">
              até {new Date(goal.dueDate).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })}
            </span>
          )}
          <button className="goal-card__btn goal-card__btn--edit" onClick={() => onEdit(goal)} aria-label="Editar meta">
            ✏️
          </button>
          <button className="goal-card__btn goal-card__btn--delete" onClick={() => onDelete(goal.id)} aria-label="Deletar meta">
            🗑️
          </button>
        </div>
      </div>
    </div>
  )
}

export default GoalCard
