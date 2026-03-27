import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import QuadrantComponent from '../components/Quadrant'
import { Task } from '../types/Task'

const mockTask: Task = {
  id: 'task-1',
  title: 'Tarefa Urgente',
  description: null,
  quadrant: 'Q1',
  status: 'PENDING',
  matrix: 'PERSONAL',
  dueDate: null,
  createdAt: '2026-03-25T10:00:00',
  completedAt: null,
}

const defaultProps = {
  quadrant: 'Q1' as const,
  title: '🔴 Fazer — Urgente e Importante',
  color: '#ef4444',
  tasks: [],
  onComplete: jest.fn(),
  onDelete: jest.fn(),
  onAddTask: jest.fn(),
  onMoveTask: jest.fn(),
}

describe('Quadrant', () => {
  beforeEach(() => jest.clearAllMocks())

  it('renderiza o título do quadrante', () => {
    render(<QuadrantComponent {...defaultProps} />)
    expect(screen.getByText('🔴 Fazer — Urgente e Importante')).toBeInTheDocument()
  })

  it('exibe mensagem de vazio quando não há tarefas', () => {
    render(<QuadrantComponent {...defaultProps} tasks={[]} />)
    expect(screen.getByText(/Nenhuma tarefa/)).toBeInTheDocument()
  })

  it('renderiza tarefas quando existem', () => {
    render(<QuadrantComponent {...defaultProps} tasks={[mockTask]} />)
    expect(screen.getByText('Tarefa Urgente')).toBeInTheDocument()
  })

  it('não exibe mensagem de vazio quando há tarefas', () => {
    render(<QuadrantComponent {...defaultProps} tasks={[mockTask]} />)
    expect(screen.queryByText(/Nenhuma tarefa/)).not.toBeInTheDocument()
  })

  it('chama onAddTask ao clicar no botão +', () => {
    const onAddTask = jest.fn()
    render(<QuadrantComponent {...defaultProps} onAddTask={onAddTask} />)
    fireEvent.click(screen.getByLabelText('Adicionar tarefa em Q1'))
    expect(onAddTask).toHaveBeenCalledWith('Q1')
    expect(onAddTask).toHaveBeenCalledTimes(1)
  })

  it('aplica cor da borda no topo', () => {
    const { container } = render(<QuadrantComponent {...defaultProps} color="#ef4444" />)
    const quadrant = container.querySelector('.quadrant')
    expect(quadrant).toHaveStyle({ borderTop: '4px solid #ef4444' })
  })

  // Nota: testes de drag-and-drop (dragOver, dragLeave, drop) omitidos propositalmente.
  // JSDOM não implementa a DataTransfer API nem o DragEvent de forma suficiente para
  // testar a lógica de drag do React. Cobrir com testes E2E (Cypress/Playwright).
})
