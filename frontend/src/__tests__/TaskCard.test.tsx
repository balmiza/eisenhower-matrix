import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import TaskCard from '../components/TaskCard'
import { Task } from '../types/Task'

const mockPendingTask: Task = {
  id: '1234-uuid',
  title: 'Tarefa de Teste',
  description: 'Descrição da tarefa',
  quadrant: 'Q1',
  status: 'PENDING',
  dueDate: null,
  createdAt: '2026-03-25T10:00:00',
  completedAt: null,
}

const mockDoneTask: Task = {
  ...mockPendingTask,
  id: '5678-uuid',
  status: 'DONE',
  completedAt: '2026-03-25T12:00:00',
}

describe('TaskCard', () => {
  it('renderiza título e descrição', () => {
    render(
      <TaskCard
        task={mockPendingTask}
        onComplete={jest.fn()}
        onDelete={jest.fn()}
      />
    )
    expect(screen.getByText('Tarefa de Teste')).toBeInTheDocument()
    expect(screen.getByText('Descrição da tarefa')).toBeInTheDocument()
  })

  it('chama onComplete ao clicar no botão de concluir', () => {
    const onComplete = jest.fn()
    render(
      <TaskCard
        task={mockPendingTask}
        onComplete={onComplete}
        onDelete={jest.fn()}
      />
    )
    fireEvent.click(screen.getByLabelText('Marcar como concluída'))
    expect(onComplete).toHaveBeenCalledWith('1234-uuid')
    expect(onComplete).toHaveBeenCalledTimes(1)
  })

  it('chama onDelete ao clicar no botão de deletar', () => {
    const onDelete = jest.fn()
    render(
      <TaskCard
        task={mockPendingTask}
        onComplete={jest.fn()}
        onDelete={onDelete}
      />
    )
    fireEvent.click(screen.getByLabelText('Deletar tarefa'))
    expect(onDelete).toHaveBeenCalledWith('1234-uuid')
    expect(onDelete).toHaveBeenCalledTimes(1)
  })

  it('exibe visual de concluída quando status=DONE', () => {
    render(
      <TaskCard
        task={mockDoneTask}
        onComplete={jest.fn()}
        onDelete={jest.fn()}
      />
    )
    const title = screen.getByText('Tarefa de Teste')
    expect(title).toHaveStyle({ textDecoration: 'line-through' })

    // Botão de complete não deve aparecer para tarefas DONE
    expect(screen.queryByLabelText('Marcar como concluída')).not.toBeInTheDocument()

    // Botão de delete ainda deve aparecer
    expect(screen.getByLabelText('Deletar tarefa')).toBeInTheDocument()
  })
})
