import React, { useEffect, useState } from 'react'
import { OneOnOne, CreateOneOnOneData } from '../types/OneOnOne'
import { getAllOneOnOnes, createOneOnOne, updateOneOnOne, deleteOneOnOne } from '../services/oneOnOneApi'
import OneOnOneCard from '../components/one-on-ones/OneOnOneCard'
import OneOnOneModal from '../components/one-on-ones/OneOnOneModal'
import ConfirmModal from '../components/ConfirmModal'
import Toast, { ToastMessage, ToastType } from '../components/Toast'

const OneOnOnePage: React.FC = () => {
  const [oneOnOnes, setOneOnOnes] = useState<OneOnOne[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingOneOnOne, setEditingOneOnOne] = useState<OneOnOne | null>(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const showToast = (message: string, type: ToastType) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
  }
  const dismissToast = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id))

  useEffect(() => {
    loadOneOnOnes()
  }, [])

  const loadOneOnOnes = async () => {
    try {
      setLoading(true)
      const data = await getAllOneOnOnes()
      setOneOnOnes(Array.isArray(data) ? data : [])
      setError(null)
    } catch {
      setError('Erro ao carregar reuniões. Verifique a conexão com o servidor.')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (data: CreateOneOnOneData) => {
    if (editingOneOnOne) {
      const updated = await updateOneOnOne(editingOneOnOne.id, data)
      setOneOnOnes((prev) => prev.map((o) => (o.id === editingOneOnOne.id ? updated : o)))
      showToast('Reunião atualizada!', 'success')
    } else {
      const created = await createOneOnOne(data)
      setOneOnOnes((prev) => [created, ...prev])
      showToast('Reunião criada!', 'success')
    }
  }

  const handleEdit = (oneOnOne: OneOnOne) => {
    setEditingOneOnOne(oneOnOne)
    setModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!confirmDeleteId) return
    const id = confirmDeleteId
    setConfirmDeleteId(null)
    try {
      await deleteOneOnOne(id)
      setOneOnOnes((prev) => prev.filter((o) => o.id !== id))
    } catch {
      showToast('Erro ao deletar reunião.', 'error')
    }
  }

  if (loading) {
    return <div className="app-loading"><p>Carregando reuniões...</p></div>
  }

  return (
    <div className="one-on-one-page">
      <div className="one-on-one-header">
        <div>
          <h1 className="one-on-one-header__title">1:1s</h1>
          <p className="one-on-one-header__subtitle">Acompanhe suas reuniões one-on-one</p>
        </div>
        <button
          className="btn btn--primary"
          onClick={() => { setEditingOneOnOne(null); setModalOpen(true) }}
        >
          + Nova Reunião
        </button>
      </div>

      {error && <p className="app-error">{error}</p>}

      <div className="one-on-one-summary">
        <div className="one-on-one-summary__card">
          <span className="one-on-one-summary__label">Total de Reuniões</span>
          <span className="one-on-one-summary__value one-on-one-summary__value--indigo">
            {oneOnOnes.length}
          </span>
        </div>
      </div>

      <div className="one-on-one-list">
        {oneOnOnes.length === 0 ? (
          <p className="one-on-one-empty">Nenhuma reunião registrada. Clique em + Nova Reunião para adicionar.</p>
        ) : (
          oneOnOnes.map((oneOnOne) => (
            <OneOnOneCard
              key={oneOnOne.id}
              oneOnOne={oneOnOne}
              onEdit={handleEdit}
              onDelete={setConfirmDeleteId}
            />
          ))
        )}
      </div>

      {modalOpen && (
        <OneOnOneModal
          oneOnOne={editingOneOnOne}
          onSave={handleSave}
          onClose={() => { setModalOpen(false); setEditingOneOnOne(null) }}
        />
      )}

      {confirmDeleteId && (
        <ConfirmModal
          message="Tem certeza que deseja deletar esta reunião?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setConfirmDeleteId(null)}
        />
      )}

      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  )
}

export default OneOnOnePage
