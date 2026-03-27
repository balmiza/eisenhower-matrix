import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Sidebar from '../components/Sidebar'

describe('Sidebar', () => {
  it('renderiza os itens de menu', () => {
    render(<Sidebar selected="PERSONAL" onChange={jest.fn()} isOpen={false} onClose={jest.fn()} />)
    expect(screen.getByText(/Pessoal/)).toBeInTheDocument()
    expect(screen.getByText(/Trabalho/)).toBeInTheDocument()
  })

  it('aplica classe ativa no item selecionado PERSONAL', () => {
    render(<Sidebar selected="PERSONAL" onChange={jest.fn()} isOpen={false} onClose={jest.fn()} />)
    expect(screen.getByText(/Pessoal/).closest('button')).toHaveClass('sidebar__item--active')
    expect(screen.getByText(/Trabalho/).closest('button')).not.toHaveClass('sidebar__item--active')
  })

  it('aplica classe ativa no item selecionado WORK', () => {
    render(<Sidebar selected="WORK" onChange={jest.fn()} isOpen={false} onClose={jest.fn()} />)
    expect(screen.getByText(/Trabalho/).closest('button')).toHaveClass('sidebar__item--active')
    expect(screen.getByText(/Pessoal/).closest('button')).not.toHaveClass('sidebar__item--active')
  })

  it('chama onChange e onClose ao selecionar uma matriz', () => {
    const onChange = jest.fn()
    const onClose = jest.fn()
    render(<Sidebar selected="PERSONAL" onChange={onChange} isOpen={false} onClose={onClose} />)
    fireEvent.click(screen.getByText(/Trabalho/))
    expect(onChange).toHaveBeenCalledWith('WORK')
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('exibe overlay quando sidebar está aberta', () => {
    const { container } = render(
      <Sidebar selected="PERSONAL" onChange={jest.fn()} isOpen={true} onClose={jest.fn()} />
    )
    expect(container.querySelector('.sidebar-overlay')).toBeInTheDocument()
  })

  it('não exibe overlay quando sidebar está fechada', () => {
    const { container } = render(
      <Sidebar selected="PERSONAL" onChange={jest.fn()} isOpen={false} onClose={jest.fn()} />
    )
    expect(container.querySelector('.sidebar-overlay')).not.toBeInTheDocument()
  })

  it('chama onClose ao clicar no overlay', () => {
    const onClose = jest.fn()
    const { container } = render(
      <Sidebar selected="PERSONAL" onChange={jest.fn()} isOpen={true} onClose={onClose} />
    )
    fireEvent.click(container.querySelector('.sidebar-overlay')!)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('aplica classe sidebar--open quando isOpen=true', () => {
    const { container } = render(
      <Sidebar selected="PERSONAL" onChange={jest.fn()} isOpen={true} onClose={jest.fn()} />
    )
    expect(container.querySelector('.sidebar')).toHaveClass('sidebar--open')
  })
})
