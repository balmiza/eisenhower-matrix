import React, { useState, useEffect } from 'react'
import { WeeklyGoal, CreateWeeklyGoalData } from '../../types/WeeklyGoal'

interface WeeklyGoalModalProps {
  goal: WeeklyGoal | null
  onSave: (data: CreateWeeklyGoalData) => Promise<void>
  onClose: () => void
}

const WeeklyGoalModal: React.FC<WeeklyGoalModalProps> = ({ goal, onSave, onClose }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priorityInput, setPriorityInput] = useState('1')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (goal) {
      setTitle(goal.title)
      setDescription(goal.description || '')
      setPriorityInput(String(goal.priority))
    }
  }, [goal])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const priority = Math.max(1, parseInt(priorityInput) || 1)
    setLoading(true)
    try {
      await onSave({ title, description: description || undefined, priority })
      onClose()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal__title">{goal ? 'Editar Meta' : 'Nova Meta Semanal'}</h2>
        <form onSubmit={handleSubmit} className="modal__form">
          <div className="form-group">
            <label className="form-label">Título *</label>
            <input
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="O que você quer alcançar essa semana?"
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="form-label">Descrição</label>
            <textarea
              className="form-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detalhes ou contexto da meta..."
              rows={3}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Prioridade *</label>
            <input
              type="number"
              className="form-input"
              value={priorityInput}
              onChange={(e) => setPriorityInput(e.target.value)}
              onBlur={() => setPriorityInput(String(Math.max(1, parseInt(priorityInput) || 1)))}
              min={1}
              required
            />
            <span className="form-hint">Número menor = maior prioridade</span>
          </div>

          <div className="modal__actions">
            <button type="button" className="btn btn--secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn--primary" disabled={loading}>
              {loading ? 'Salvando...' : goal ? 'Salvar' : 'Criar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default WeeklyGoalModal
