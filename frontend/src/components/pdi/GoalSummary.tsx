import React from 'react'
import { Goal } from '../../types/Goal'

interface GoalSummaryProps {
  goals: Goal[]
}

const GoalSummary: React.FC<GoalSummaryProps> = ({ goals }) => {
  const total = goals.length
  const done = goals.filter((g) => g.status === 'DONE').length
  const inProgress = goals.filter((g) => g.status === 'IN_PROGRESS').length
  const notStarted = goals.filter((g) => g.status === 'NOT_STARTED').length

  return (
    <div className="pdi-summary">
      <div className="pdi-summary__card">
        <span className="pdi-summary__label">Total de metas</span>
        <span className="pdi-summary__value pdi-summary__value--indigo">{total}</span>
      </div>
      <div className="pdi-summary__card">
        <span className="pdi-summary__label">Concluídas</span>
        <span className="pdi-summary__value pdi-summary__value--green">{done}</span>
      </div>
      <div className="pdi-summary__card">
        <span className="pdi-summary__label">Em andamento</span>
        <span className="pdi-summary__value pdi-summary__value--yellow">{inProgress}</span>
      </div>
      <div className="pdi-summary__card">
        <span className="pdi-summary__label">Não iniciadas</span>
        <span className="pdi-summary__value pdi-summary__value--slate">{notStarted}</span>
      </div>
    </div>
  )
}

export default GoalSummary
