import React from 'react'
import { Matrix } from '../types/Task'

export type Page = 'tasks' | 'pdi' | 'books' | 'journal' | 'one-on-ones' | 'weekly-goals'

interface SidebarProps {
  activePage: Page
  onNavigate: (page: Page) => void
  selectedMatrix: Matrix
  onMatrixChange: (matrix: Matrix) => void
  isOpen: boolean
  onClose: () => void
  onSignOut: () => void
}

const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  onNavigate,
  selectedMatrix,
  onMatrixChange,
  isOpen,
  onClose,
  onSignOut,
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

        <button
          className={`sidebar__item ${activePage === 'weekly-goals' ? 'sidebar__item--active' : ''}`}
          onClick={() => handleNavigate('weekly-goals')}
        >
          🗓️ Metas Semanais
        </button>

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

        <p className="sidebar__section">Reflexão</p>
        <button
          className={`sidebar__item ${activePage === 'journal' ? 'sidebar__item--active' : ''}`}
          onClick={() => handleNavigate('journal')}
        >
          📝 Diário de Bordo
        </button>
        <button
          className={`sidebar__item ${activePage === 'one-on-ones' ? 'sidebar__item--active' : ''}`}
          onClick={() => handleNavigate('one-on-ones')}
        >
          🤝 1:1s
        </button>

        <div className="sidebar__footer">
          <button className="sidebar__signout" onClick={onSignOut}>
            Sair
          </button>
        </div>
      </nav>
    </>
  )
}

export default Sidebar
