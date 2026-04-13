import React, { useEffect, useState } from 'react'
import { WeeklyGoal, CreateWeeklyGoalData } from '../types/WeeklyGoal'
import {
  getAllWeeklyGoals,
  createWeeklyGoal,
  updateWeeklyGoal,
  completeWeeklyGoal,
  deleteWeeklyGoal,
} from '../services/weeklyGoalApi'
import WeeklyGoalCard from '../components/weekly-goals/WeeklyGoalCard'
import WeeklyGoalModal from '../components/weekly-goals/WeeklyGoalModal'
import ConfirmModal from '../components/ConfirmModal'
import Toast, { ToastMessage, ToastType } from '../components/Toast'

const WeeklyGoalsPage: React.FC = () => {
  const [goals, setGoals] = useState<WeeklyGoal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingGoal, setEditingGoal] = useState<WeeklyGoal | null>(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const showToast = (message: string, type: ToastType) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
  }
  const dismissToast = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id))

  useEffect(() => {
    loadGoals()
  }, [])

  const loadGoals = async () => {
    try {
      setLoading(true)
      const data = await getAllWeeklyGoals()
      setGoals(Array.isArray(data) ? data : [])
      setError(null)
    } catch {
      setError('Erro ao carregar metas. Verifique a conexão com o servidor.')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (data: CreateWeeklyGoalData) => {
    if (editingGoal) {
      const updated = await updateWeeklyGoal(editingGoal.id, data)
      setGoals((prev) => prev.map((g) => (g.id === editingGoal.id ? updated : g))
        .sort((a, b) => a.priority - b.priority))
      showToast('Meta atualizada!', 'success')
    } else {
      const created = await createWeeklyGoal(data)
      setGoals((prev) => [...prev, created].sort((a, b) => a.priority - b.priority))
      showToast('Meta criada!', 'success')
    }
  }

  const handleComplete = async (id: string) => {
    try {
      const updated = await completeWeeklyGoal(id)
      setGoals((prev) => prev.map((g) => (g.id === id ? updated : g)))
      showToast('Meta concluída!', 'success')
    } catch {
      showToast('Erro ao concluir meta.', 'error')
    }
  }

  const handleEdit = (goal: WeeklyGoal) => {
    setEditingGoal(goal)
    setModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!confirmDeleteId) return
    const id = confirmDeleteId
    setConfirmDeleteId(null)
    try {
      await deleteWeeklyGoal(id)
      setGoals((prev) => prev.filter((g) => g.id !== id))
      showToast('Meta removida.', 'success')
    } catch {
      showToast('Erro ao deletar meta.', 'error')
    }
  }

  const pending = goals.filter((g) => g.status === 'PENDING')
  const done = goals.filter((g) => g.status === 'DONE')

  if (loading) {
    return <div className="app-loading"><p>Carregando metas...</p></div>
  }

  return (
    <div className="weekly-goals-page">
      <div className="weekly-goals-header">
        <div>
          <h1 className="weekly-goals-header__title">Metas Semanais</h1>
          <p className="weekly-goals-header__subtitle">Defina e priorize o que mais importa essa semana</p>
        </div>
        <button
          className="btn btn--primary"
          onClick={() => { setEditingGoal(null); setModalOpen(true) }}
        >
          + Nova Meta
        </button>
      </div>

      {error && <p className="app-error">{error}</p>}

      <div className="weekly-goals-summary">
        <div className="weekly-goals-summary__card">
          <span className="weekly-goals-summary__label">Total</span>
          <span className="weekly-goals-summary__value weekly-goals-summary__value--indigo">{goals.length}</span>
        </div>
        <div className="weekly-goals-summary__card">
          <span className="weekly-goals-summary__label">Pendentes</span>
          <span className="weekly-goals-summary__value weekly-goals-summary__value--yellow">{pending.length}</span>
        </div>
        <div className="weekly-goals-summary__card">
          <span className="weekly-goals-summary__label">Concluídas</span>
          <span className="weekly-goals-summary__value weekly-goals-summary__value--green">{done.length}</span>
        </div>
      </div>

      <div className="weekly-goals-list">
        {goals.length === 0 ? (
          <p className="weekly-goals-empty">Nenhuma meta. Clique em + Nova Meta para começar.</p>
        ) : (
          <>
            {pending.length > 0 && (
              <div className="weekly-goals-section">
                <h3 className="weekly-goals-section__title">Pendentes</h3>
                {pending.map((goal) => (
                  <WeeklyGoalCard
                    key={goal.id}
                    goal={goal}
                    onComplete={handleComplete}
                    onEdit={handleEdit}
                    onDelete={setConfirmDeleteId}
                  />
                ))}
              </div>
            )}
            {done.length > 0 && (
              <div className="weekly-goals-section">
                <h3 className="weekly-goals-section__title weekly-goals-section__title--done">Concluídas</h3>
                {done.map((goal) => (
                  <WeeklyGoalCard
                    key={goal.id}
                    goal={goal}
                    onComplete={handleComplete}
                    onEdit={handleEdit}
                    onDelete={setConfirmDeleteId}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {modalOpen && (
        <WeeklyGoalModal
          goal={editingGoal}
          onSave={handleSave}
          onClose={() => { setModalOpen(false); setEditingGoal(null) }}
        />
      )}

      {confirmDeleteId && (
        <ConfirmModal
          message="Tem certeza que deseja deletar esta meta?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setConfirmDeleteId(null)}
        />
      )}

      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  )
}

export default WeeklyGoalsPage
