import axios from 'axios'
import { createTask, getAllTasks, completeTask, deleteTask } from '../services/api'
import { Task } from '../types/Task'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const mockTask: Task = {
  id: 'abc-123',
  title: 'Test Task',
  description: 'Test description',
  quadrant: 'Q1',
  status: 'PENDING',
  createdAt: '2026-03-25T10:00:00',
  completedAt: null,
}

// We need to mock the axios.create() call
const mockAxiosInstance = {
  post: jest.fn(),
  get: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn(),
  create: jest.fn(),
}

jest.mock('axios', () => ({
  create: jest.fn(() => ({
    post: jest.fn(),
    get: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  })),
}))

// Get the mocked instance
import api from '../services/api'

describe('api service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('createTask - faz POST /tasks e retorna tarefa criada', async () => {
    const spy = jest.spyOn(api, 'post').mockResolvedValueOnce({ data: mockTask })

    const result = await createTask({ title: 'Test Task', quadrant: 'Q1' })

    expect(spy).toHaveBeenCalledWith('/tasks', {
      title: 'Test Task',
      quadrant: 'Q1',
    })
    expect(result).toEqual(mockTask)
  })

  it('getAllTasks - faz GET /tasks e retorna lista', async () => {
    const tasks = [mockTask]
    const spy = jest.spyOn(api, 'get').mockResolvedValueOnce({ data: tasks })

    const result = await getAllTasks()

    expect(spy).toHaveBeenCalledWith('/tasks')
    expect(result).toEqual(tasks)
  })

  it('completeTask - faz PATCH /tasks/{id}/complete e retorna tarefa atualizada', async () => {
    const completedTask = { ...mockTask, status: 'DONE' as const, completedAt: '2026-03-25T12:00:00' }
    const spy = jest.spyOn(api, 'patch').mockResolvedValueOnce({ data: completedTask })

    const result = await completeTask('abc-123')

    expect(spy).toHaveBeenCalledWith('/tasks/abc-123/complete')
    expect(result).toEqual(completedTask)
  })

  it('deleteTask - faz DELETE /tasks/{id}', async () => {
    const spy = jest.spyOn(api, 'delete').mockResolvedValueOnce({ data: undefined })

    await deleteTask('abc-123')

    expect(spy).toHaveBeenCalledWith('/tasks/abc-123')
  })
})
