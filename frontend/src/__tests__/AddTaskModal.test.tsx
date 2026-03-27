import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import AddTaskModal from '../components/AddTaskModal'
import * as api from '../services/api'
import { Task } from '../types/Task'

jest.mock('../services/api', () => ({
  createTask: jest.fn(),
}))

const mockCreatedTask: Task = {
  id: 'new-task-id',
  title: 'Nova Tarefa',
  description: null,
  quadrant: 'Q2',
  status: 'PENDING',
  matrix: 'PERSONAL',
  dueDate: null,
  createdAt: '2026-03-26T10:00:00',
  completedAt: null,
}

const defaultProps = {
  quadrant: 'Q2' as const,
  matrix: 'PERSONAL' as const,
  onAdd: jest.fn(),
  onClose: jest.fn(),
}

describe('AddTaskModal', () => {
  beforeEach(() => jest.clearAllMocks())

  it('renderiza o formulário com título do quadrante', () => {
    render(<AddTaskModal {...defaultProps} />)
    expect(screen.getByText(/Nova Tarefa — Q2/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Título/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Descrição/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Data e hora limite/)).toBeInTheDocument()
  })

  it('exibe erro quando título está vazio ao submeter', async () => {
    render(<AddTaskModal {...defaultProps} />)
    fireEvent.click(screen.getByText('Adicionar'))
    expect(await screen.findByText('O título é obrigatório.')).toBeInTheDocument()
    expect(api.createTask).not.toHaveBeenCalled()
  })

  it('chama createTask e onAdd com dados corretos ao submeter', async () => {
    ;(api.createTask as jest.Mock).mockResolvedValueOnce(mockCreatedTask)
    render(<AddTaskModal {...defaultProps} />)

    fireEvent.change(screen.getByLabelText(/Título/), { target: { value: 'Nova Tarefa' } })
    fireEvent.change(screen.getByLabelText(/Descrição/), { target: { value: 'Detalhe' } })
    fireEvent.click(screen.getByText('Adicionar'))

    await waitFor(() => expect(api.createTask).toHaveBeenCalledWith({
      title: 'Nova Tarefa',
      description: 'Detalhe',
      quadrant: 'Q2',
      dueDate: undefined,
      matrix: 'PERSONAL',
    }))
    expect(defaultProps.onAdd).toHaveBeenCalledWith(mockCreatedTask)
    expect(defaultProps.onClose).toHaveBeenCalled()
  })

  it('exibe erro quando createTask falha', async () => {
    ;(api.createTask as jest.Mock).mockRejectedValueOnce(new Error('Network error'))
    render(<AddTaskModal {...defaultProps} />)

    fireEvent.change(screen.getByLabelText(/Título/), { target: { value: 'Tarefa' } })
    fireEvent.click(screen.getByText('Adicionar'))

    expect(await screen.findByText('Erro ao criar tarefa. Tente novamente.')).toBeInTheDocument()
    expect(defaultProps.onAdd).not.toHaveBeenCalled()
  })

  it('chama onClose ao clicar em Cancelar', () => {
    render(<AddTaskModal {...defaultProps} />)
    fireEvent.click(screen.getByText('Cancelar'))
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
  })

  it('chama onClose ao clicar no overlay', () => {
    const { container } = render(<AddTaskModal {...defaultProps} />)
    fireEvent.click(container.querySelector('.modal-overlay')!)
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
  })

  it('chama onClose ao clicar no botão fechar', () => {
    render(<AddTaskModal {...defaultProps} />)
    fireEvent.click(screen.getByLabelText('Fechar modal'))
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
  })

  it('exibe "Salvando..." enquanto aguarda resposta da API', async () => {
    let resolve: (v: Task) => void
    ;(api.createTask as jest.Mock).mockReturnValueOnce(new Promise((r) => { resolve = r }))

    render(<AddTaskModal {...defaultProps} />)
    fireEvent.change(screen.getByLabelText(/Título/), { target: { value: 'Tarefa' } })
    fireEvent.click(screen.getByText('Adicionar'))

    expect(await screen.findByText('Salvando...')).toBeInTheDocument()
    resolve!(mockCreatedTask)
  })
})
