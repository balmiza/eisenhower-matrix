import React from 'react'
import { Matrix } from '../types/Task'

interface SidebarProps {
  selected: Matrix
  onChange: (matrix: Matrix) => void
  isOpen: boolean
  onClose: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ selected, onChange, isOpen, onClose }) => {
  const handleSelect = (matrix: Matrix) => {
    onChange(matrix)
    onClose()
  }

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <nav className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
        <h2 className="sidebar__title">Matrizes</h2>
        <button
          className={`sidebar__item ${selected === 'PERSONAL' ? 'sidebar__item--active' : ''}`}
          onClick={() => handleSelect('PERSONAL')}
        >
          🏠 Pessoal
        </button>
        <button
          className={`sidebar__item ${selected === 'WORK' ? 'sidebar__item--active' : ''}`}
          onClick={() => handleSelect('WORK')}
        >
          💼 Trabalho
        </button>
      </nav>
    </>
  )
}

export default Sidebar
