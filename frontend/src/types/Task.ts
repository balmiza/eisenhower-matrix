export type Quadrant = 'Q1' | 'Q2' | 'Q3' | 'Q4'
export type Status = 'PENDING' | 'DONE'

export interface Task {
  id: string
  title: string
  description: string | null
  quadrant: Quadrant
  status: Status
  createdAt: string
  completedAt: string | null
}
