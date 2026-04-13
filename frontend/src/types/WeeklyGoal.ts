export type WeeklyGoalStatus = 'PENDING' | 'DONE'

export interface WeeklyGoal {
  id: string
  title: string
  description: string | null
  priority: number
  status: WeeklyGoalStatus
  createdAt: string
}

export interface CreateWeeklyGoalData {
  title: string
  description?: string
  priority: number
}
