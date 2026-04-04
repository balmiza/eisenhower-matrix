import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Sidebar from '../components/Sidebar'

const defaultProps = {
  activePage: 'tasks' as const,
  onNavigate: jest.fn(),
  selectedMatrix: 'PERSONAL' as const,
  onMatrixChange: jest.fn(),
  isOpen: false,
  onClose: jest.fn(),
  onSignOut: jest.fn(),
}

describe('Sidebar', () => {
  beforeEach(() => jest.clearAllMocks())

  it('renderiza os itens de menu', () => {
    render(<Sidebar {...defaultProps} />)
    expect(screen.getByText(/Matriz de Eisenhower/)).toBeInTheDocument()
    expect(screen.getByText(/PDI/)).toBeInTheDocument()
  })

  it('exibe sub-itens de matriz quando página ativa é tasks', () => {
    render(<Sidebar {...defaultProps} activePage="tasks" />)
    expect(screen.getByText(/Pessoal/)).toBeInTheDocument()
    expect(screen.getByText(/Trabalho/)).toBeInTheDocument()
  })

  it('não exibe sub-itens de matriz quando página ativa é pdi', () => {
    render(<Sidebar {...defaultProps} activePage="pdi" />)
    expect(screen.queryByText(/Pessoal/)).not.toBeInTheDocument()
    expect(screen.queryByText(/Trabalho/)).not.toBeInTheDocument()
  })

  it('aplica classe ativa na Matriz quando activePage=tasks', () => {
    render(<Sidebar {...defaultProps} activePage="tasks" />)
    expect(screen.getByText(/Matriz de Eisenhower/).closest('button')).toHaveClass('sidebar__item--active')
    expect(screen.getByText(/PDI/).closest('button')).not.toHaveClass('sidebar__item--active')
  })

  it('aplica classe ativa no PDI quando activePage=pdi', () => {
    render(<Sidebar {...defaultProps} activePage="pdi" />)
    expect(screen.getByText(/PDI/).closest('button')).toHaveClass('sidebar__item--active')
    expect(screen.getByText(/Matriz de Eisenhower/).closest('button')).not.toHaveClass('sidebar__item--active')
  })

  it('chama onNavigate e onClose ao clicar em PDI', () => {
    const onNavigate = jest.fn()
    const onClose = jest.fn()
    render(<Sidebar {...defaultProps} onNavigate={onNavigate} onClose={onClose} />)
    fireEvent.click(screen.getByText(/PDI/))
    expect(onNavigate).toHaveBeenCalledWith('pdi')
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('chama onMatrixChange e onClose ao selecionar Trabalho', () => {
    const onMatrixChange = jest.fn()
    const onClose = jest.fn()
    render(<Sidebar {...defaultProps} onMatrixChange={onMatrixChange} onClose={onClose} />)
    fireEvent.click(screen.getByText(/Trabalho/))
    expect(onMatrixChange).toHaveBeenCalledWith('WORK')
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('exibe overlay quando sidebar está aberta', () => {
    const { container } = render(<Sidebar {...defaultProps} isOpen={true} />)
    expect(container.querySelector('.sidebar-overlay')).toBeInTheDocument()
  })

  it('não exibe overlay quando sidebar está fechada', () => {
    const { container } = render(<Sidebar {...defaultProps} isOpen={false} />)
    expect(container.querySelector('.sidebar-overlay')).not.toBeInTheDocument()
  })

  it('chama onClose ao clicar no overlay', () => {
    const onClose = jest.fn()
    const { container } = render(<Sidebar {...defaultProps} isOpen={true} onClose={onClose} />)
    fireEvent.click(container.querySelector('.sidebar-overlay')!)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('aplica classe sidebar--open quando isOpen=true', () => {
    const { container } = render(<Sidebar {...defaultProps} isOpen={true} />)
    expect(container.querySelector('.sidebar')).toHaveClass('sidebar--open')
  })
})
