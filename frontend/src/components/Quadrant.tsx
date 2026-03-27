import React, { useState } from 'react'
import { Quadrant as QuadrantType, Task } from '../types/Task'
import TaskCard from './TaskCard'

interface QuadrantProps {
  quadrant: QuadrantType
  title: string
  color: string
  tasks: Task[]
  onComplete: (id: string) => void
  onDelete: (id: string) => void
  onAddTask: (quadrant: QuadrantType) => void
  onMoveTask: (taskId: string, targetQuadrant: QuadrantType) => void
}

const QuadrantComponent: React.FC<QuadrantProps> = ({
  quadrant,
  title,
  color,
  tasks,
  onComplete,
  onDelete,
  onAddTask,
  onMoveTask,
}) => {
  const [isDragOver, setIsDragOver] = useState(false)

  return (
    <div
      className={`quadrant${isDragOver ? ' quadrant--drag-over' : ''}`}
      style={{ borderTop: `4px solid ${color}` }}
      onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={(e) => { e.preventDefault(); setIsDragOver(false); const id = e.dataTransfer.getData('taskId'); if (id) onMoveTask(id, quadrant) }}
    >
      <div className="quadrant__header">
        <h2 className="quadrant__title" style={{ color }}>
          {title}
        </h2>
        <button
          className="quadrant__add-btn"
          style={{ backgroundColor: color }}
          onClick={() => onAddTask(quadrant)}
          aria-label={`Adicionar tarefa em ${quadrant}`}
          title="Adicionar tarefa"
        >
          +
        </button>
      </div>
      <div className="quadrant__tasks">
        {tasks.length === 0 ? (
          <p className="quadrant__empty">Nenhuma tarefa. Clique em + para adicionar.</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={onComplete}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default QuadrantComponent
