import { rootFilterSelector, getFilter } from './selectors'

const setup = (overrides = {}) => {
  const state = {
    filter: {
      filter: 'all',
    },
    ...overrides,
  }

  return { state }
}

describe('Filter selectors', () => {
  it('gets the correct filter', () => {
    const { state } = setup()
    expect(getFilter(state)).toBe('all')
  })
})
