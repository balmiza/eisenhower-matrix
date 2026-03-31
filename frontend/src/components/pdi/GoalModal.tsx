import React, { useEffect, useState } from 'react'
import { Goal, GoalCategory, GoalTimeframe, GoalStatus, CreateGoalData } from '../../types/Goal'

interface GoalModalProps {
  goal?: Goal | null
  onSave: (data: CreateGoalData) => Promise<void>
  onClose: () => void
}

const GoalModal: React.FC<GoalModalProps> = ({ goal, onSave, onClose }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<GoalCategory>('TECHNICAL')
  const [timeframe, setTimeframe] = useState<GoalTimeframe>('SHORT')
  const [status, setStatus] = useState<GoalStatus>('NOT_STARTED')
  const [progress, setProgress] = useState(0)
  const [dueDate, setDueDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (goal) {
      setTitle(goal.title)
      setDescription(goal.description || '')
      setCategory(goal.category)
      setTimeframe(goal.timeframe)
      setStatus(goal.status)
      setProgress(goal.progress)
      setDueDate(goal.dueDate || '')
    }
  }, [goal])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) {
      setError('O título é obrigatório.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      await onSave({
        title: title.trim(),
        description: description.trim() || undefined,
        category,
        timeframe,
        status,
        progress,
        dueDate: dueDate || undefined,
      })
      onClose()
    } catch {
      setError('Erro ao salvar meta. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h3 className="modal__title">{goal ? 'Editar Meta' : 'Nova Meta'}</h3>
          <button className="modal__close" onClick={onClose} aria-label="Fechar modal">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal__form">
          <div className="form-group">
            <label htmlFor="goal-title" className="form-label">Título *</label>
            <input
              id="goal-title"
              type="text"
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Dominar React avançado"
              maxLength={255}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="goal-description" className="form-label">Descrição (opcional)</label>
            <textarea
              id="goal-description"
              className="form-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva o que você quer alcançar..."
              rows={3}
            />
          </div>

          <div className="modal__form-row">
            <div className="form-group">
              <label htmlFor="goal-category" className="form-label">Categoria *</label>
              <select
                id="goal-category"
                className="form-input"
                value={category}
                onChange={(e) => setCategory(e.target.value as GoalCategory)}
              >
                <option value="TECHNICAL">Técnica</option>
                <option value="BEHAVIORAL">Comportamental</option>
                <option value="LEADERSHIP">Liderança</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="goal-timeframe" className="form-label">Prazo *</label>
              <select
                id="goal-timeframe"
                className="form-input"
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value as GoalTimeframe)}
              >
                <option value="SHORT">Curto (até 6 meses)</option>
                <option value="MEDIUM">Médio (6m a 2 anos)</option>
                <option value="LONG">Longo (2+ anos)</option>
              </select>
            </div>
          </div>

          <div className="modal__form-row">
            <div className="form-group">
              <label htmlFor="goal-status" className="form-label">Status</label>
              <select
                id="goal-status"
                className="form-input"
                value={status}
                onChange={(e) => setStatus(e.target.value as GoalStatus)}
              >
                <option value="NOT_STARTED">Não iniciada</option>
                <option value="IN_PROGRESS">Em andamento</option>
                <option value="DONE">Concluída</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="goal-due-date" className="form-label">Data limite (opcional)</label>
              <input
                id="goal-due-date"
                type="date"
                className="form-input"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="goal-progress" className="form-label">
              Progresso: <strong>{progress}%</strong>
            </label>
            <input
              id="goal-progress"
              type="range"
              min={0}
              max={100}
              step={5}
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              className="form-range"
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

export default GoalModal
