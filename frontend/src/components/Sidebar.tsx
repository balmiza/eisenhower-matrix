import React from 'react'
import { Matrix } from '../types/Task'

export type Page = 'tasks' | 'pdi' | 'books'

interface SidebarProps {
  activePage: Page
  onNavigate: (page: Page) => void
  selectedMatrix: Matrix
  onMatrixChange: (matrix: Matrix) => void
  isOpen: boolean
  onClose: () => void
}

const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  onNavigate,
  selectedMatrix,
  onMatrixChange,
  isOpen,
  onClose,
}) => {
  const handleNavigate = (page: Page) => {
    onNavigate(page)
    onClose()
  }

  const handleMatrixChange = (matrix: Matrix) => {
    onMatrixChange(matrix)
    onClose()
  }

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <nav className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
        <h2 className="sidebar__title">Performance</h2>

        <p className="sidebar__section">Produtividade</p>
        <button
          className={`sidebar__item ${activePage === 'tasks' ? 'sidebar__item--active' : ''}`}
          onClick={() => handleNavigate('tasks')}
        >
          📋 Matriz de Eisenhower
        </button>

        {activePage === 'tasks' && (
          <div className="sidebar__sub">
            <button
              className={`sidebar__subitem ${selectedMatrix === 'PERSONAL' ? 'sidebar__subitem--active' : ''}`}
              onClick={() => handleMatrixChange('PERSONAL')}
            >
              🏠 Pessoal
            </button>
            <button
              className={`sidebar__subitem ${selectedMatrix === 'WORK' ? 'sidebar__subitem--active' : ''}`}
              onClick={() => handleMatrixChange('WORK')}
            >
              💼 Trabalho
            </button>
          </div>
        )}

        <p className="sidebar__section">Desenvolvimento</p>
        <button
          className={`sidebar__item ${activePage === 'pdi' ? 'sidebar__item--active' : ''}`}
          onClick={() => handleNavigate('pdi')}
        >
          🎯 PDI
        </button>
        <button
          className={`sidebar__item ${activePage === 'books' ? 'sidebar__item--active' : ''}`}
          onClick={() => handleNavigate('books')}
        >
          📚 Livros
        </button>
      </nav>
    </>
  )
}

export default Sidebar
