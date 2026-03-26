export type Quadrant = 'Q1' | 'Q2' | 'Q3' | 'Q4'
export type Status = 'PENDING' | 'DONE'
export type Matrix = 'PERSONAL' | 'WORK'

export interface Task {
  id: string
  title: string
  description: string | null
  quadrant: Quadrant
  status: Status
  matrix: Matrix
  dueDate: string | null
  createdAt: string
  completedAt: string | null
}
