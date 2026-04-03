export interface OneOnOne {
  id: string
  date: string
  manager: string
  agenda: string | null
  notes: string | null
  nextSteps: string | null
  createdAt: string
}

export interface CreateOneOnOneData {
  date: string
  manager: string
  agenda?: string
  notes?: string
  nextSteps?: string
}
