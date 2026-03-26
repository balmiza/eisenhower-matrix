import React, { useState } from 'react'
import { Quadrant, Task } from '../types/Task'
import { createTask } from '../services/api'

interface AddTaskModalProps {
  quadrant: Quadrant
  onAdd: (task: Task) => void
  onClose: () => void
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ quadrant, onAdd, onClose }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) {
      setError('O título é obrigatório.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const task = await createTask({
        title: title.trim(),
        description: description.trim() || undefined,
        quadrant,
        dueDate: dueDate || undefined,
      })
      onAdd(task)
      onClose()
    } catch {
      setError('Erro ao criar tarefa. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h3 className="modal__title">Nova Tarefa — {quadrant}</h3>
          <button className="modal__close" onClick={onClose} aria-label="Fechar modal">
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal__form">
          <div className="form-group">
            <label htmlFor="task-title" className="form-label">
              Título *
            </label>
            <input
              id="task-title"
              type="text"
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Preparar relatório"
              maxLength={255}
              autoFocus
            />
          </div>
          <div className="form-group">
            <label htmlFor="task-description" className="form-label">
              Descrição (opcional)
            </label>
            <textarea
              id="task-description"
              className="form-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detalhes da tarefa..."
              rows={3}
            />
          </div>
          <div className="form-group">
            <label htmlFor="task-due-date" className="form-label">
              Data e hora limite (opcional)
            </label>
            <input
              id="task-due-date"
              type="datetime-local"
              className="form-input"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          {error && <p className="form-error">{error}</p>}
          <div className="modal__actions">
            <button
              type="button"
              className="btn btn--secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn--primary" disabled={loading}>
              {loading ? 'Salvando...' : 'Adicionar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddTaskModal
