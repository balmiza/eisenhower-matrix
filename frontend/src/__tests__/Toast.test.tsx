import { render, screen, fireEvent, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import Toast, { ToastMessage } from '../components/Toast'

const makeToast = (overrides: Partial<ToastMessage> = {}): ToastMessage => ({
  id: 1,
  message: 'Operação realizada!',
  type: 'success',
  ...overrides,
})

describe('Toast', () => {
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  it('renderiza mensagem de sucesso', () => {
    render(<Toast toasts={[makeToast()]} onDismiss={jest.fn()} />)
    expect(screen.getByText('Operação realizada!')).toBeInTheDocument()
  })

  it('renderiza mensagem de erro', () => {
    render(<Toast toasts={[makeToast({ type: 'error', message: 'Algo deu errado' })]} onDismiss={jest.fn()} />)
    expect(screen.getByText('Algo deu errado')).toBeInTheDocument()
  })

  it('renderiza múltiplos toasts', () => {
    const toasts: ToastMessage[] = [
      makeToast({ id: 1, message: 'Primeiro' }),
      makeToast({ id: 2, message: 'Segundo' }),
    ]
    render(<Toast toasts={toasts} onDismiss={jest.fn()} />)
    expect(screen.getByText('Primeiro')).toBeInTheDocument()
    expect(screen.getByText('Segundo')).toBeInTheDocument()
  })

  it('chama onDismiss ao clicar no toast', () => {
    const onDismiss = jest.fn()
    render(<Toast toasts={[makeToast({ id: 42 })]} onDismiss={onDismiss} />)
    fireEvent.click(screen.getByText('Operação realizada!'))
    expect(onDismiss).toHaveBeenCalledWith(42)
  })

  it('chama onDismiss automaticamente após 3500ms', () => {
    const onDismiss = jest.fn()
    render(<Toast toasts={[makeToast({ id: 99 })]} onDismiss={onDismiss} />)
    expect(onDismiss).not.toHaveBeenCalled()
    act(() => jest.advanceTimersByTime(3500))
    expect(onDismiss).toHaveBeenCalledWith(99)
  })

  it('não chama onDismiss antes dos 3500ms', () => {
    const onDismiss = jest.fn()
    render(<Toast toasts={[makeToast({ id: 99 })]} onDismiss={onDismiss} />)
    act(() => jest.advanceTimersByTime(3000))
    expect(onDismiss).not.toHaveBeenCalled()
  })

  it('não renderiza nada quando lista de toasts está vazia', () => {
    const { container } = render(<Toast toasts={[]} onDismiss={jest.fn()} />)
    expect(container.querySelector('.toast')).not.toBeInTheDocument()
  })
})
