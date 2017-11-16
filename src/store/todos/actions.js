const createConstant = c => `todos/${c}`

export const ADD_TODO = createConstant('ADD_TODO')
export const DELETE_TODO = createConstant('DELETE_TODO')
export const EDIT_TODO = createConstant('EDIT_TODO')
export const COMPLETE_TODO = createConstant('COMPLETE_TODO')
export const COMPLETE_ALL = createConstant('COMPLETE_ALL')
export const CLEAR_COMPLETED = createConstant('CLEAR_COMPLETED')

export const types = {
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  COMPLETE_TODO,
  COMPLETE_ALL,
  CLEAR_COMPLETED,
}

export const addTodo = text => ({ type: ADD_TODO, text })
export const deleteTodo = id => ({ type: DELETE_TODO, id })
export const editTodo = (id, text) => ({ type: EDIT_TODO, id, text })
export const completeTodo = id => ({ type: COMPLETE_TODO, id })
export const completeAll = () => ({ type: COMPLETE_ALL })
export const clearCompleted = () => ({ type: CLEAR_COMPLETED })

export const headerActions = { addTodo }

export const actions = {
  addTodo,
  deleteTodo,
  editTodo,
  completeTodo,
  completeAll,
  clearCompleted,
}
