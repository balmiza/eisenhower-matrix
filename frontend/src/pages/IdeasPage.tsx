import React, { useEffect, useState } from 'react'
import { Idea, CreateIdeaData } from '../types/Idea'
import { getAllIdeas, createIdea, updateIdea, deleteIdea } from '../services/ideaApi'
import ConfirmModal from '../components/ConfirmModal'
import Toast, { ToastMessage, ToastType } from '../components/Toast'

const IdeasPage: React.FC = () => {
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const [formTitle, setFormTitle] = useState('')
  const [formDescription, setFormDescription] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const showToast = (message: string, type: ToastType) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
  }
  const dismissToast = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id))

  useEffect(() => {
    loadIdeas()
  }, [])

  const loadIdeas = async () => {
    try {
      setLoading(true)
      const data = await getAllIdeas()
      setIdeas(Array.isArray(data) ? data : [])
      setError(null)
    } catch {
      setError('Erro ao carregar ideias. Verifique a conexão com o servidor.')
    } finally {
      setLoading(false)
    }
  }

  const handleStartEdit = (idea: Idea) => {
    setEditingId(idea.id)
    setFormTitle(idea.title)
    setFormDescription(idea.description || '')
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setFormTitle('')
    setFormDescription('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formTitle.trim()) return
    setSubmitting(true)
    try {
      const data: CreateIdeaData = {
        title: formTitle.trim(),
        description: formDescription.trim() || undefined,
      }
      if (editingId) {
        const updated = await updateIdea(editingId, data)
        setIdeas((prev) => prev.map((i) => (i.id === editingId ? updated : i)))
        showToast('Ideia atualizada!', 'success')
        handleCancelEdit()
      } else {
        const created = await createIdea(data)
        setIdeas((prev) => [created, ...prev])
        showToast('Ideia salva!', 'success')
        setFormTitle('')
        setFormDescription('')
      }
    } catch {
      showToast('Erro ao salvar ideia.', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const handleConfirmDelete = async () => {
    if (!confirmDeleteId) return
    const id = confirmDeleteId
    setConfirmDeleteId(null)
    try {
      await deleteIdea(id)
      setIdeas((prev) => prev.filter((i) => i.id !== id))
      showToast('Ideia removida.', 'success')
    } catch {
      showToast('Erro ao deletar ideia.', 'error')
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (loading) {
    return <div className="app-loading"><p>Carregando ideias...</p></div>
  }

  return (
    <div className="ideas-page">
      <div className="ideas-capture">
        <form onSubmit={handleSubmit} className="ideas-form">
          <input
            className="ideas-form__title"
            placeholder="Qual é a sua ideia?"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            required
            autoFocus={!editingId}
          />
          <textarea
            className="ideas-form__description"
            placeholder="Detalhe um pouco mais (opcional)..."
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            rows={3}
          />
          <div className="ideas-form__actions">
            {editingId && (
              <button type="button" className="btn btn--secondary" onClick={handleCancelEdit}>
                Cancelar
              </button>
            )}
            <button type="submit" className="btn btn--primary" disabled={submitting || !formTitle.trim()}>
              {submitting ? 'Salvando...' : editingId ? 'Salvar alterações' : '+ Registrar ideia'}
            </button>
          </div>
        </form>
      </div>

      {error && <p className="app-error">{error}</p>}

      <div className="ideas-list">
        {ideas.length === 0 ? (
          <p className="ideas-empty">Nenhuma ideia registrada ainda. Use o campo acima para começar.</p>
        ) : (
          ideas.map((idea) => (
            <div key={idea.id} className={`idea-card ${editingId === idea.id ? 'idea-card--editing' : ''}`}>
              <div className="idea-card__body">
                <p className="idea-card__title">{idea.title}</p>
                {idea.description && (
                  <p className="idea-card__description">{idea.description}</p>
                )}
                <span className="idea-card__date">{formatDate(idea.createdAt)}</span>
              </div>
              <div className="idea-card__actions">
                <button
                  className="weekly-goal-card__btn weekly-goal-card__btn--edit"
                  onClick={() => handleStartEdit(idea)}
                  title="Editar"
                >
                  ✏️
                </button>
                <button
                  className="weekly-goal-card__btn weekly-goal-card__btn--delete"
                  onClick={() => setConfirmDeleteId(idea.id)}
                  title="Deletar"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {confirmDeleteId && (
        <ConfirmModal
          message="Tem certeza que deseja deletar esta ideia?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setConfirmDeleteId(null)}
        />
      )}

      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  )
}

export default IdeasPage
