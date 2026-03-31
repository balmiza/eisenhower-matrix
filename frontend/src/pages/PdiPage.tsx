import React, { useEffect, useState } from 'react'
import { Goal, GoalTimeframe, CreateGoalData } from '../types/Goal'
import { getAllGoals, createGoal, updateGoal, deleteGoal } from '../services/goalApi'
import GoalCard from '../components/pdi/GoalCard'
import GoalModal from '../components/pdi/GoalModal'
import GoalSummary from '../components/pdi/GoalSummary'
import ConfirmModal from '../components/ConfirmModal'
import Toast, { ToastMessage, ToastType } from '../components/Toast'

const TIMEFRAMES: { key: GoalTimeframe; label: string; sublabel: string }[] = [
  { key: 'SHORT', label: 'Curto prazo', sublabel: 'até 6 meses' },
  { key: 'MEDIUM', label: 'Médio prazo', sublabel: '6 meses a 2 anos' },
  { key: 'LONG', label: 'Longo prazo', sublabel: '2+ anos' },
]

const PdiPage: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null)
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
      const data = await getAllGoals()
      setGoals(Array.isArray(data) ? data : [])
      setError(null)
    } catch {
      setError('Erro ao carregar metas. Verifique a conexão com o servidor.')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (data: CreateGoalData) => {
    if (editingGoal) {
      const updated = await updateGoal(editingGoal.id, data)
      setGoals((prev) => prev.map((g) => (g.id === editingGoal.id ? updated : g)))
      showToast('Meta atualizada!', 'success')
    } else {
      const created = await createGoal(data)
      setGoals((prev) => [...prev, created])
      showToast('Meta criada!', 'success')
    }
  }

  const handleEdit = (goal: Goal) => {
    setEditingGoal(goal)
    setModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!confirmDeleteId) return
    const id = confirmDeleteId
    setConfirmDeleteId(null)
    try {
      await deleteGoal(id)
      setGoals((prev) => prev.filter((g) => g.id !== id))
    } catch {
      showToast('Erro ao deletar meta.', 'error')
    }
  }

  const getGoalsByTimeframe = (timeframe: GoalTimeframe) =>
    goals.filter((g) => g.timeframe === timeframe)

  if (loading) {
    return <div className="app-loading"><p>Carregando metas...</p></div>
  }

  return (
    <div className="pdi-page">
      <div className="pdi-header">
        <div>
          <h1 className="pdi-header__title">Plano de Desenvolvimento Individual</h1>
          <p className="pdi-header__subtitle">Acompanhe suas metas de carreira</p>
        </div>
        <button
          className="btn btn--primary"
          onClick={() => { setEditingGoal(null); setModalOpen(true) }}
        >
          + Nova Meta
        </button>
      </div>

      {error && <p className="app-error">{error}</p>}

      <GoalSummary goals={goals} />

      <div className="pdi-content">
        {TIMEFRAMES.map(({ key, label, sublabel }) => (
          <div key={key} className="pdi-section">
            <div className="pdi-section__header">
              <span className={`pdi-section__badge pdi-section__badge--${key.toLowerCase()}`}>
                {label}
              </span>
              <span className="pdi-section__sublabel">{sublabel}</span>
            </div>

            <div className="pdi-goals-grid">
              {getGoalsByTimeframe(key).length === 0 ? (
                <p className="pdi-empty">Nenhuma meta. Clique em + Nova Meta para adicionar.</p>
              ) : (
                getGoalsByTimeframe(key).map((goal) => (
                  <GoalCard
                    key={goal.id}
                    goal={goal}
                    onEdit={handleEdit}
                    onDelete={setConfirmDeleteId}
                  />
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <GoalModal
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

export default PdiPage
