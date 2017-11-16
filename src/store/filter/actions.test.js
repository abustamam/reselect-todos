import { actions, types } from './actions'

describe('filter actions', () => {
  it('addTodo should create ADD_TODO action', () => {
    expect(actions.showAll()).toEqual({
      type: types.SHOW_ALL,
    })
  })

  it('deleteTodo should create DELETE_TODO action', () => {
    expect(actions.showActive()).toEqual({
      type: types.SHOW_ACTIVE,
    })
  })

  it('editTodo should create EDIT_TODO action', () => {
    expect(actions.showCompleted()).toEqual({
      type: types.SHOW_COMPLETED,
    })
  })
})
