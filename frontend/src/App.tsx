import React, { useEffect, useState } from 'react'
import { Task, Quadrant, Matrix } from './types/Task'
import { getAllTasks, completeTask, deleteTask, moveTask } from './services/api'
import QuadrantComponent from './components/Quadrant'
import AddTaskModal from './components/AddTaskModal'
import Toast, { ToastMessage, ToastType } from './components/Toast'
import ConfirmModal from './components/ConfirmModal'
import Sidebar, { Page } from './components/Sidebar'
import PdiPage from './pages/PdiPage'
import BooksPage from './pages/BooksPage'
import JournalPage from './pages/JournalPage'
import OneOnOnePage from './pages/OneOnOnePage'
import './App.css'

const QUADRANTS: { key: Quadrant; title: string; color: string }[] = [
  { key: 'Q1', title: '🔴 Fazer — Urgente e Importante', color: '#ef4444' },
  { key: 'Q2', title: '🟡 Agendar — Importante, Não Urgente', color: '#eab308' },
  { key: 'Q3', title: '🟠 Delegar — Urgente, Não Importante', color: '#f97316' },
  { key: 'Q4', title: '⚪ Eliminar — Não Urgente, Não Importante', color: '#6b7280' },
]

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('tasks')
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [modalQuadrant, setModalQuadrant] = useState<Quadrant | null>(null)
  const [selectedMatrix, setSelectedMatrix] = useState<Matrix>('PERSONAL')
  const [sortBy, setSortBy] = useState<'dueDate' | 'createdAt'>('dueDate')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [toasts, setToasts] = useState<ToastMessage[]>([])
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)

  const showToast = (message: string, type: ToastType) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
  }
  const dismissToast = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id))

  useEffect(() => {
    if (activePage === 'tasks') loadTasks()
  }, [selectedMatrix, activePage])

  const loadTasks = async () => {
    try {
      setLoading(true)
      const data = await getAllTasks(selectedMatrix)
      setTasks(Array.isArray(data) ? data : [])
      setError(null)
    } catch {
      setError('Erro ao carregar tarefas. Verifique a conexão com o servidor.')
    } finally {
      setLoading(false)
    }
  }

  const handleAddTask = (newTask: Task) => {
    setTasks((prev) => [...prev, newTask])
  }

  const handleCompleteTask = async (id: string) => {
    try {
      const updatedTask = await completeTask(id)
      setTasks((prev) => prev.map((t) => (t.id === id ? updatedTask : t)))
      showToast('Tarefa concluída!', 'success')
    } catch {
      showToast('Erro ao concluir tarefa.', 'error')
    }
  }

  const handleMoveTask = async (taskId: string, targetQuadrant: Quadrant) => {
    try {
      const updatedTask = await moveTask(taskId, targetQuadrant)
      setTasks((prev) => prev.map((t) => (t.id === taskId ? updatedTask : t)))
      showToast('Tarefa movida!', 'success')
    } catch {
      showToast('Erro ao mover tarefa.', 'error')
    }
  }

  const handleDeleteTask = (id: string) => {
    setConfirmDeleteId(id)
  }

  const handleConfirmDelete = async () => {
    if (!confirmDeleteId) return
    const id = confirmDeleteId
    setConfirmDeleteId(null)
    try {
      await deleteTask(id)
      setTasks((prev) => prev.filter((t) => t.id !== id))
    } catch {
      showToast('Erro ao deletar tarefa.', 'error')
    }
  }

  const getTasksByQuadrant = (quadrant: Quadrant): Task[] => {
    const filtered = tasks.filter((t) => t.quadrant === quadrant)
    return [...filtered].sort((a, b) => {
      if (sortBy === 'dueDate') {
        if (!a.dueDate && !b.dueDate) return 0
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      }
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    })
  }

  return (
    <div className="app-layout">
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
        selectedMatrix={selectedMatrix}
        onMatrixChange={setSelectedMatrix}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="app-content">
        {activePage === 'journal' ? (
          <JournalPage />
        ) : activePage === 'pdi' ? (
          <PdiPage />
        ) : activePage === 'books' ? (
          <BooksPage />
        ) : activePage === 'one-on-ones' ? (
          <OneOnOnePage />
        ) : (
          <div className="app">
            <header className="app-header">
              <div className="app-header__top">
                <button
                  className="hamburger"
                  onClick={() => setSidebarOpen((prev) => !prev)}
                  aria-label="Abrir menu"
                >
                  <span />
                  <span />
                  <span />
                </button>
                <h1 className="app-title">Matriz de Eisenhower</h1>
              </div>
              <div className="sort-controls">
                <span className="sort-controls__label">Ordenar por:</span>
                <button
                  className={`sort-controls__btn ${sortBy === 'dueDate' ? 'sort-controls__btn--active' : ''}`}
                  onClick={() => setSortBy('dueDate')}
                >
                  Data Limite
                </button>
                <button
                  className={`sort-controls__btn ${sortBy === 'createdAt' ? 'sort-controls__btn--active' : ''}`}
                  onClick={() => setSortBy('createdAt')}
                >
                  Data de Criação
                </button>
              </div>
              {error && <p className="app-error">{error}</p>}
            </header>

            {loading ? (
              <div className="app-loading"><p>Carregando tarefas...</p></div>
            ) : (
              <main className="matrix-grid">
                {QUADRANTS.map(({ key, title, color }) => (
                  <QuadrantComponent
                    key={key}
                    quadrant={key}
                    title={title}
                    color={color}
                    tasks={getTasksByQuadrant(key)}
                    onComplete={handleCompleteTask}
                    onDelete={handleDeleteTask}
                    onAddTask={setModalQuadrant}
                    onMoveTask={handleMoveTask}
                  />
                ))}
              </main>
            )}

            {modalQuadrant && (
              <AddTaskModal
                quadrant={modalQuadrant}
                matrix={selectedMatrix}
                onAdd={handleAddTask}
                onClose={() => setModalQuadrant(null)}
              />
            )}
          </div>
        )}
      </div>

      <Toast toasts={toasts} onDismiss={dismissToast} />
      {confirmDeleteId && (
        <ConfirmModal
          message="Tem certeza que deseja deletar esta tarefa?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setConfirmDeleteId(null)}
        />
      )}
    </div>
  )
}

export default App
