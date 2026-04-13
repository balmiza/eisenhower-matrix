import React from 'react'
import { WeeklyGoal } from '../../types/WeeklyGoal'

interface WeeklyGoalCardProps {
  goal: WeeklyGoal
  onComplete: (id: string) => void
  onEdit: (goal: WeeklyGoal) => void
  onDelete: (id: string) => void
}

const WeeklyGoalCard: React.FC<WeeklyGoalCardProps> = ({ goal, onComplete, onEdit, onDelete }) => {
  const isDone = goal.status === 'DONE'

  return (
    <div className={`weekly-goal-card ${isDone ? 'weekly-goal-card--done' : ''}`}>
      <div className="weekly-goal-card__priority">#{goal.priority}</div>
      <div className="weekly-goal-card__body">
        <p className="weekly-goal-card__title">{goal.title}</p>
        {goal.description && (
          <p className="weekly-goal-card__description">{goal.description}</p>
        )}
      </div>
      <div className="weekly-goal-card__actions">
        {!isDone && (
          <button
            className="weekly-goal-card__btn weekly-goal-card__btn--complete"
            onClick={() => onComplete(goal.id)}
            title="Concluir"
          >
            ✓
          </button>
        )}
        {!isDone && (
          <button
            className="weekly-goal-card__btn weekly-goal-card__btn--edit"
            onClick={() => onEdit(goal)}
            title="Editar"
          >
            ✏️
          </button>
        )}
        <button
          className="weekly-goal-card__btn weekly-goal-card__btn--delete"
          onClick={() => onDelete(goal.id)}
          title="Deletar"
        >
          🗑️
        </button>
      </div>
    </div>
  )
}

export default WeeklyGoalCard
