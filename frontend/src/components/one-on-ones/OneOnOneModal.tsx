import React, { useEffect, useState } from 'react'
import { OneOnOne, CreateOneOnOneData } from '../../types/OneOnOne'

interface OneOnOneModalProps {
  oneOnOne?: OneOnOne | null
  onSave: (data: CreateOneOnOneData) => Promise<void>
  onClose: () => void
}

const OneOnOneModal: React.FC<OneOnOneModalProps> = ({ oneOnOne, onSave, onClose }) => {
  const [date, setDate] = useState('')
  const [manager, setManager] = useState('')
  const [agenda, setAgenda] = useState('')
  const [notes, setNotes] = useState('')
  const [nextSteps, setNextSteps] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (oneOnOne) {
      setDate(oneOnOne.date)
      setManager(oneOnOne.manager)
      setAgenda(oneOnOne.agenda || '')
      setNotes(oneOnOne.notes || '')
      setNextSteps(oneOnOne.nextSteps || '')
    }
  }, [oneOnOne])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!date) {
      setError('A data é obrigatória.')
      return
    }
    if (!manager.trim()) {
      setError('O gestor é obrigatório.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      await onSave({
        date,
        manager: manager.trim(),
        agenda: agenda.trim() || undefined,
        notes: notes.trim() || undefined,
        nextSteps: nextSteps.trim() || undefined,
      })
      onClose()
    } catch {
      setError('Erro ao salvar reunião. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h3 className="modal__title">{oneOnOne ? 'Editar Reunião 1:1' : 'Nova Reunião 1:1'}</h3>
          <button className="modal__close" onClick={onClose} aria-label="Fechar modal">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal__form">
          <div className="modal__form-row">
            <div className="form-group">
              <label htmlFor="one-on-one-date" className="form-label">Data *</label>
              <input
                id="one-on-one-date"
                type="date"
                className="form-input"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                autoFocus
              />
            </div>

            <div className="form-group">
              <label htmlFor="one-on-one-manager" className="form-label">Gestor *</label>
              <input
                id="one-on-one-manager"
                type="text"
                className="form-input"
                value={manager}
                onChange={(e) => setManager(e.target.value)}
                placeholder="Nome do gestor"
                maxLength={255}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="one-on-one-agenda" className="form-label">Pauta (opcional)</label>
            <textarea
              id="one-on-one-agenda"
              className="form-textarea"
              value={agenda}
              onChange={(e) => setAgenda(e.target.value)}
              placeholder="Tópicos a discutir..."
              rows={3}
            />
          </div>

          <div className="form-group">
            <label htmlFor="one-on-one-notes" className="form-label">Anotações (opcional)</label>
            <textarea
              id="one-on-one-notes"
              className="form-textarea"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Anotações da reunião..."
              rows={3}
            />
          </div>

          <div className="form-group">
            <label htmlFor="one-on-one-next-steps" className="form-label">Próximos Passos (opcional)</label>
            <textarea
              id="one-on-one-next-steps"
              className="form-textarea"
              value={nextSteps}
              onChange={(e) => setNextSteps(e.target.value)}
              placeholder="Ações acordadas..."
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

export default OneOnOneModal
