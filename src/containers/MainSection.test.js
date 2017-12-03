import { mapStateToProps } from './MainSection'

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
    filter: {
      filter: 'all',
    },
    ...overrides,
  }

  return { state }
}

describe('MainSection mapStateToProps', () => {
  it('Maps state to props correctly', () => {
    const { state } = setup()
    expect(mapStateToProps(state)).toEqual({
      filter: 'all',
      count: 2,
      activeCount: 1,
      filteredTodos: [
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
      completedCount: 1,
    })
  })
})
