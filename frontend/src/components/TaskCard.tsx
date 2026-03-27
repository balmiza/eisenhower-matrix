import React from 'react'
import { Task } from '../types/Task'

interface TaskCardProps {
  task: Task
  onComplete: (id: string) => void
  onDelete: (id: string) => void
}

const formatDate = (date: string): string => {
  const d = new Date(date)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  return `${day}/${month}/${year} ${hours}:${minutes}`
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onComplete, onDelete }) => {
  const isDone = task.status === 'DONE'
  const isOverdue = !isDone && !!task.dueDate && new Date(task.dueDate) < new Date()

  return (
    <div
      className={`task-card ${isDone ? 'task-card--done' : ''} ${isOverdue ? 'task-card--overdue' : ''}`}
      style={{ opacity: isDone ? 0.6 : 1, cursor: isDone ? 'default' : 'grab' }}
      draggable={!isDone}
      onDragStart={(e) => { if (!isDone) { e.dataTransfer.setData('taskId', task.id) } }}
    >
      <div className="task-card__content">
        <h4
          className="task-card__title"
          style={{ textDecoration: isDone ? 'line-through' : 'none' }}
        >
          {task.title}
        </h4>
        {task.description && (
          <p
            className="task-card__description"
            style={{ textDecoration: isDone ? 'line-through' : 'none' }}
          >
            {task.description}
          </p>
        )}
        {task.dueDate && (
          <p className={`task-card__due-date${isOverdue ? ' task-card__due-date--overdue' : ''}`}>
            {isOverdue ? '⚠️' : '📅'} {formatDate(task.dueDate)}
          </p>
        )}
      </div>
      <div className="task-card__actions">
        {!isDone && (
          <button
            className="task-card__btn task-card__btn--complete"
            onClick={() => onComplete(task.id)}
            title="Marcar como concluída"
            aria-label="Marcar como concluída"
          >
            ✓
          </button>
        )}
        <button
          className="task-card__btn task-card__btn--delete"
          onClick={() => onDelete(task.id)}
          title="Deletar tarefa"
          aria-label="Deletar tarefa"
        >
          🗑
        </button>
      </div>
    </div>
  )
}

export default TaskCard
