import React, { useEffect, useState } from 'react'
import { JournalEntry, JournalEntryType, CreateJournalEntryData } from '../../types/JournalEntry'

interface JournalEntryModalProps {
  entry?: JournalEntry | null
  onSave: (data: CreateJournalEntryData) => Promise<void>
  onClose: () => void
}

const JournalEntryModal: React.FC<JournalEntryModalProps> = ({ entry, onSave, onClose }) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [type, setType] = useState<JournalEntryType>('LEARNING')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (entry) {
      setDate(entry.date)
      setType(entry.type)
      setContent(entry.content)
    }
  }, [entry])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) {
      setError('O conteúdo é obrigatório.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      await onSave({
        date,
        type,
        content: content.trim(),
      })
      onClose()
    } catch {
      setError('Erro ao salvar entrada. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h3 className="modal__title">{entry ? 'Editar Entrada' : 'Nova Entrada'}</h3>
          <button className="modal__close" onClick={onClose} aria-label="Fechar modal">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal__form">
          <div className="modal__form-row">
            <div className="form-group">
              <label htmlFor="journal-date" className="form-label">Data *</label>
              <input
                id="journal-date"
                type="date"
                className="form-input"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="journal-type" className="form-label">Tipo *</label>
              <select
                id="journal-type"
                className="form-input"
                value={type}
                onChange={(e) => setType(e.target.value as JournalEntryType)}
                required
              >
                <option value="LEARNING">📖 Aprendizado</option>
                <option value="ACHIEVEMENT">🏆 Conquista</option>
                <option value="CHALLENGE">⚡ Desafio</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="journal-content" className="form-label">Conteúdo *</label>
            <textarea
              id="journal-content"
              className="form-textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="O que aconteceu? O que você aprendeu?"
              rows={5}
              required
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

export default JournalEntryModal
