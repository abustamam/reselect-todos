import filter from './reducer'
import { types } from './actions'

describe('filter reducer', () => {
  it('should handle initial state', () => {
    expect(filter(undefined, {})).toEqual({ filter: 'all' })
  })
  it('should handle CHANGE_FILTER', () => {
    expect(
      filter(
        { filter: 'all' },
        { type: types.CHANGE_FILTER, filter: 'completed' },
      ),
    ).toEqual({
      filter: 'completed',
    })
  })
})
