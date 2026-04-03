import React, { useEffect, useState } from 'react'
import { JournalEntry, CreateJournalEntryData } from '../types/JournalEntry'
import { getAllEntries, createEntry, updateEntry, deleteEntry } from '../services/journalApi'
import JournalEntryCard from '../components/journal/JournalEntryCard'
import JournalEntryModal from '../components/journal/JournalEntryModal'
import ConfirmModal from '../components/ConfirmModal'
import Toast, { ToastMessage, ToastType } from '../components/Toast'

const JournalPage: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const showToast = (message: string, type: ToastType) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
  }
  const dismissToast = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id))

  useEffect(() => {
    loadEntries()
  }, [])

  const loadEntries = async () => {
    try {
      setLoading(true)
      const data = await getAllEntries()
      setEntries(Array.isArray(data) ? data : [])
      setError(null)
    } catch {
      setError('Erro ao carregar entradas. Verifique a conexão com o servidor.')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (data: CreateJournalEntryData) => {
    if (editingEntry) {
      const updated = await updateEntry(editingEntry.id, data)
      setEntries((prev) => prev.map((e) => (e.id === editingEntry.id ? updated : e)))
      showToast('Entrada atualizada!', 'success')
    } else {
      const created = await createEntry(data)
      setEntries((prev) => [created, ...prev])
      showToast('Entrada criada!', 'success')
    }
  }

  const handleEdit = (entry: JournalEntry) => {
    setEditingEntry(entry)
    setModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!confirmDeleteId) return
    const id = confirmDeleteId
    setConfirmDeleteId(null)
    try {
      await deleteEntry(id)
      setEntries((prev) => prev.filter((e) => e.id !== id))
    } catch {
      showToast('Erro ao deletar entrada.', 'error')
    }
  }

  const totalLearning = entries.filter((e) => e.type === 'LEARNING').length
  const totalAchievement = entries.filter((e) => e.type === 'ACHIEVEMENT').length
  const totalChallenge = entries.filter((e) => e.type === 'CHALLENGE').length

  if (loading) {
    return <div className="app-loading"><p>Carregando entradas...</p></div>
  }

  return (
    <div className="journal-page">
      <div className="journal-header">
        <div>
          <h1 className="journal-header__title">Diário de Bordo</h1>
          <p className="journal-header__subtitle">Registre aprendizados, conquistas e desafios</p>
        </div>
        <button
          className="btn btn--primary"
          onClick={() => { setEditingEntry(null); setModalOpen(true) }}
        >
          + Nova Entrada
        </button>
      </div>

      {error && <p className="app-error">{error}</p>}

      <div className="journal-summary">
        <div className="journal-summary__card">
          <span className="journal-summary__label">Total</span>
          <span className="journal-summary__value journal-summary__value--indigo">{entries.length}</span>
        </div>
        <div className="journal-summary__card">
          <span className="journal-summary__label">Aprendizados</span>
          <span className="journal-summary__value journal-summary__value--blue">{totalLearning}</span>
        </div>
        <div className="journal-summary__card">
          <span className="journal-summary__label">Conquistas</span>
          <span className="journal-summary__value journal-summary__value--green">{totalAchievement}</span>
        </div>
        <div className="journal-summary__card">
          <span className="journal-summary__label">Desafios</span>
          <span className="journal-summary__value journal-summary__value--orange">{totalChallenge}</span>
        </div>
      </div>

      <div className="journal-list">
        {entries.length === 0 ? (
          <p className="journal-empty">Nenhuma entrada. Clique em + Nova Entrada para começar.</p>
        ) : (
          entries.map((entry) => (
            <JournalEntryCard
              key={entry.id}
              entry={entry}
              onEdit={handleEdit}
              onDelete={setConfirmDeleteId}
            />
          ))
        )}
      </div>

      {modalOpen && (
        <JournalEntryModal
          entry={editingEntry}
          onSave={handleSave}
          onClose={() => { setModalOpen(false); setEditingEntry(null) }}
        />
      )}

      {confirmDeleteId && (
        <ConfirmModal
          message="Tem certeza que deseja deletar esta entrada?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setConfirmDeleteId(null)}
        />
      )}

      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  )
}

export default JournalPage
