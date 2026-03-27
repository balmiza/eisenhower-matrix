import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import ConfirmModal from '../components/ConfirmModal'

describe('ConfirmModal', () => {
  it('renderiza a mensagem de confirmação', () => {
    render(<ConfirmModal message="Deseja deletar?" onConfirm={jest.fn()} onCancel={jest.fn()} />)
    expect(screen.getByText('Deseja deletar?')).toBeInTheDocument()
  })

  it('renderiza os botões Cancelar e Deletar', () => {
    render(<ConfirmModal message="Deseja deletar?" onConfirm={jest.fn()} onCancel={jest.fn()} />)
    expect(screen.getByText('Cancelar')).toBeInTheDocument()
    expect(screen.getByText('Deletar')).toBeInTheDocument()
  })

  it('chama onConfirm ao clicar em Deletar', () => {
    const onConfirm = jest.fn()
    render(<ConfirmModal message="Confirmar?" onConfirm={onConfirm} onCancel={jest.fn()} />)
    fireEvent.click(screen.getByText('Deletar'))
    expect(onConfirm).toHaveBeenCalledTimes(1)
  })

  it('chama onCancel ao clicar em Cancelar', () => {
    const onCancel = jest.fn()
    render(<ConfirmModal message="Confirmar?" onConfirm={jest.fn()} onCancel={onCancel} />)
    fireEvent.click(screen.getByText('Cancelar'))
    expect(onCancel).toHaveBeenCalledTimes(1)
  })

  it('chama onCancel ao clicar no overlay', () => {
    const onCancel = jest.fn()
    const { container } = render(
      <ConfirmModal message="Confirmar?" onConfirm={jest.fn()} onCancel={onCancel} />
    )
    const overlay = container.querySelector('.modal-overlay')!
    fireEvent.click(overlay)
    expect(onCancel).toHaveBeenCalledTimes(1)
  })

  it('não propaga clique do conteúdo para o overlay', () => {
    const onCancel = jest.fn()
    const { container } = render(
      <ConfirmModal message="Confirmar?" onConfirm={jest.fn()} onCancel={onCancel} />
    )
    const modal = container.querySelector('.confirm-modal')!
    fireEvent.click(modal)
    expect(onCancel).not.toHaveBeenCalled()
  })
})
