import React, { useEffect, useState } from 'react'
import { Task, Quadrant } from './types/Task'
import { getAllTasks, completeTask, deleteTask } from './services/api'
import QuadrantComponent from './components/Quadrant'
import AddTaskModal from './components/AddTaskModal'
import './App.css'

const QUADRANTS: { key: Quadrant; title: string; color: string }[] = [
  { key: 'Q1', title: '🔴 Fazer — Urgente e Importante', color: '#ef4444' },
  { key: 'Q2', title: '🟡 Agendar — Importante, Não Urgente', color: '#eab308' },
  { key: 'Q3', title: '🟠 Delegar — Urgente, Não Importante', color: '#f97316' },
  { key: 'Q4', title: '⚪ Eliminar — Não Urgente, Não Importante', color: '#6b7280' },
]

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [modalQuadrant, setModalQuadrant] = useState<Quadrant | null>(null)
  const [sortBy, setSortBy] = useState<'dueDate' | 'createdAt'>('dueDate')

  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    try {
      setLoading(true)
      const data = await getAllTasks()
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
    } catch {
      alert('Erro ao concluir tarefa.')
    }
  }

  const handleDeleteTask = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja deletar esta tarefa?')) return
    try {
      await deleteTask(id)
      setTasks((prev) => prev.filter((t) => t.id !== id))
    } catch {
      alert('Erro ao deletar tarefa.')
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

  if (loading) {
    return (
      <div className="app-loading">
        <p>Carregando tarefas...</p>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Matriz de Eisenhower</h1>
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
          />
        ))}
      </main>

      {modalQuadrant && (
        <AddTaskModal
          quadrant={modalQuadrant}
          onAdd={handleAddTask}
          onClose={() => setModalQuadrant(null)}
        />
      )}
    </div>
  )
}

export default App
