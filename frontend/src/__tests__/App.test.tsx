import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from '../App'
import * as api from '../services/api'
import * as goalApi from '../services/goalApi'
import { Task } from '../types/Task'

jest.mock('../services/api', () => ({
  getAllTasks: jest.fn(),
  completeTask: jest.fn(),
  deleteTask: jest.fn(),
  moveTask: jest.fn(),
  createTask: jest.fn(),
}))

jest.mock('../services/goalApi', () => ({
  getAllGoals: jest.fn(),
  createGoal: jest.fn(),
  updateGoal: jest.fn(),
  deleteGoal: jest.fn(),
}))

const makeTask = (overrides: Partial<Task> = {}): Task => ({
  id: '1',
  title: 'Tarefa Teste',
  description: null,
  quadrant: 'Q1',
  status: 'PENDING',
  matrix: 'PERSONAL',
  dueDate: null,
  createdAt: '2026-03-26T10:00:00',
  completedAt: null,
  ...overrides,
})

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(api.getAllTasks as jest.Mock).mockResolvedValue([])
    ;(goalApi.getAllGoals as jest.Mock).mockResolvedValue([])
  })

  it('renderiza na página de tasks por padrão', async () => {
    render(<App />)
    await waitFor(() => {
      expect(screen.getAllByText(/Matriz de Eisenhower/).length).toBeGreaterThanOrEqual(1)
    })
  })

  it('renderiza os quatro quadrantes após carregar', async () => {
    render(<App />)
    await waitFor(() => {
      expect(screen.getByText(/Fazer — Urgente e Importante/)).toBeInTheDocument()
      expect(screen.getByText(/Agendar — Importante/)).toBeInTheDocument()
      expect(screen.getByText(/Delegar — Urgente/)).toBeInTheDocument()
      expect(screen.getByText(/Eliminar/)).toBeInTheDocument()
    })
  })

  it('exibe mensagem de erro quando API falha', async () => {
    ;(api.getAllTasks as jest.Mock).mockRejectedValueOnce(new Error('Network error'))
    render(<App />)
    expect(await screen.findByText(/Erro ao carregar tarefas/)).toBeInTheDocument()
  })

  it('renderiza tarefas nas colunas corretas', async () => {
    const task = makeTask({ title: 'Minha Tarefa Q1', quadrant: 'Q1' })
    ;(api.getAllTasks as jest.Mock).mockResolvedValueOnce([task])
    render(<App />)
    expect(await screen.findByText('Minha Tarefa Q1')).toBeInTheDocument()
  })

  it('exibe botões de ordenação', async () => {
    render(<App />)
    await waitFor(() => {
      expect(screen.getByText('Data Limite')).toBeInTheDocument()
      expect(screen.getByText('Data de Criação')).toBeInTheDocument()
    })
  })

  it('altera ordenação ao clicar nos botões', async () => {
    render(<App />)
    await waitFor(() => screen.getByText('Data de Criação'))
    const btnCreatedAt = screen.getByText('Data de Criação')
    fireEvent.click(btnCreatedAt)
    expect(btnCreatedAt).toHaveClass('sort-controls__btn--active')
  })

  it('recarrega tarefas ao trocar de matriz na sidebar', async () => {
    render(<App />)
    await waitFor(() => screen.getByText(/Trabalho/))
    fireEvent.click(screen.getByText(/Trabalho/))
    await waitFor(() => expect(api.getAllTasks).toHaveBeenCalledWith('WORK'))
  })

  it('navega para a página de PDI ao clicar no menu', async () => {
    render(<App />)
    await waitFor(() => screen.getByText(/PDI/))
    fireEvent.click(screen.getByText(/PDI/))
    expect(await screen.findByText('Plano de Desenvolvimento Individual')).toBeInTheDocument()
  })

  it('completa tarefa e exibe toast de sucesso', async () => {
    const task = makeTask({ id: 'task-1', title: 'Concluir' })
    ;(api.getAllTasks as jest.Mock).mockResolvedValueOnce([task])
    ;(api.completeTask as jest.Mock).mockResolvedValueOnce({ ...task, status: 'DONE' })

    render(<App />)
    await screen.findByText('Concluir')
    fireEvent.click(screen.getByLabelText('Marcar como concluída'))

    expect(await screen.findByText('Tarefa concluída!')).toBeInTheDocument()
  })

  it('exibe modal de confirmação ao deletar tarefa', async () => {
    const task = makeTask({ id: 'task-2', title: 'Deletar esta' })
    ;(api.getAllTasks as jest.Mock).mockResolvedValueOnce([task])

    render(<App />)
    await screen.findByText('Deletar esta')
    fireEvent.click(screen.getByLabelText('Deletar tarefa'))

    expect(screen.getByText(/Tem certeza que deseja deletar/)).toBeInTheDocument()
  })

  it('cancela deleção ao clicar em Cancelar no modal', async () => {
    const task = makeTask({ id: 'task-3', title: 'Manter tarefa' })
    ;(api.getAllTasks as jest.Mock).mockResolvedValueOnce([task])

    render(<App />)
    await screen.findByText('Manter tarefa')
    fireEvent.click(screen.getByLabelText('Deletar tarefa'))
    fireEvent.click(screen.getByText('Cancelar'))

    expect(screen.queryByText(/Tem certeza/)).not.toBeInTheDocument()
    expect(api.deleteTask).not.toHaveBeenCalled()
  })

  it('confirma deleção e remove tarefa da lista', async () => {
    const task = makeTask({ id: 'task-4', title: 'Remover tarefa' })
    ;(api.getAllTasks as jest.Mock).mockResolvedValueOnce([task])
    ;(api.deleteTask as jest.Mock).mockResolvedValueOnce(undefined)

    render(<App />)
    await screen.findByText('Remover tarefa')
    fireEvent.click(screen.getByLabelText('Deletar tarefa'))
    fireEvent.click(screen.getByText('Deletar'))

    await waitFor(() => expect(screen.queryByText('Remover tarefa')).not.toBeInTheDocument())
  })
})
