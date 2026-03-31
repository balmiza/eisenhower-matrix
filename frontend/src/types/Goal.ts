export type GoalCategory = 'TECHNICAL' | 'BEHAVIORAL' | 'LEADERSHIP'
export type GoalTimeframe = 'SHORT' | 'MEDIUM' | 'LONG'
export type GoalStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'DONE'

export interface Goal {
  id: string
  title: string
  description: string | null
  category: GoalCategory
  timeframe: GoalTimeframe
  status: GoalStatus
  progress: number
  dueDate: string | null
  createdAt: string
}

export interface CreateGoalData {
  title: string
  description?: string
  category: GoalCategory
  timeframe: GoalTimeframe
  status?: GoalStatus
  progress?: number
  dueDate?: string
}
