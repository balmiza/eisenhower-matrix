export interface Idea {
  id: string
  title: string
  description: string | null
  createdAt: string
  updatedAt: string
}

export interface CreateIdeaData {
  title: string
  description?: string
}
