import {
  getTodos,
  getFilteredTodos,
  getActiveCount,
  getCompletedCount,
  getTodosCount,
} from './selectors'

const setup = (overrides = {}) => {
  const state = {
    todos: [
      {
        text: 'Use Redux',
        completed: false,
        id: 0,
      },
      {
        text: 'Run the tests',
        completed: true,
        id: 1,
      },
    ],
    ...overrides,
  }

  return { state }
}

describe('Todo selectors', () => {
  it('gets the correct todo list', () => {
    const { state } = setup()
    expect(getTodos(state)).toEqual([
      {
        text: 'Use Redux',
        completed: false,
        id: 0,
      },
      {
        text: 'Run the tests',
        completed: true,
        id: 1,
      },
    ])
  })

  it('filters correctly on completed todos', () => {
    const { state } = setup({ filter: { filter: 'completed' } })
    expect(getFilteredTodos(state)).toEqual([
      {
        text: 'Run the tests',
        completed: true,
        id: 1,
      },
    ])
  })

  it('filters correctly on active todos', () => {
    const { state } = setup({ filter: { filter: 'active' } })
    expect(getFilteredTodos(state)).toEqual([
      {
        text: 'Use Redux',
        completed: false,
        id: 0,
      },
    ])
  })

  it('gets the correct todo count', () => {
    const { state } = setup()
    expect(getTodosCount(state)).toBe(2)
  })

  it('gets the correct completed todo count', () => {
    const { state } = setup()
    expect(getCompletedCount(state)).toBe(1)
  })

  it('gets the correct active todo count', () => {
    const { state } = setup()
    expect(getActiveCount(state)).toBe(1)
  })
})
