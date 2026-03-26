import React from 'react'
import { Matrix } from '../types/Task'

interface SidebarProps {
  selected: Matrix
  onChange: (matrix: Matrix) => void
}

const Sidebar: React.FC<SidebarProps> = ({ selected, onChange }) => {
  return (
    <nav className="sidebar">
      <h2 className="sidebar__title">Matrizes</h2>
      <button
        className={`sidebar__item ${selected === 'PERSONAL' ? 'sidebar__item--active' : ''}`}
        onClick={() => onChange('PERSONAL')}
      >
        🏠 Pessoal
      </button>
      <button
        className={`sidebar__item ${selected === 'WORK' ? 'sidebar__item--active' : ''}`}
        onClick={() => onChange('WORK')}
      >
        💼 Trabalho
      </button>
    </nav>
  )
}

export default Sidebar
