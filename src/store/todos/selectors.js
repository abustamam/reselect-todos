import { createSelector, createStructuredSelector } from 'reselect'
import reduce from 'lodash/fp/reduce'

import { getFilter } from './../filter/selectors'

const TODO_FILTERS = {
  all: () => true,
  active: todo => !todo.completed,
  completed: todo => todo.completed,
}

export const getTodos = state => state.todos || []
export const getTodosCount = createSelector(getTodos, todos => todos.length)
export const getCompletedCount = createSelector(getTodos, todos =>
  todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0),
)
export const getActiveCount = createSelector(
  [getTodosCount, getCompletedCount],
  (count, completedCount) => count - completedCount,
)
export const getFilteredTodos = createSelector(
  [getTodos, getFilter],
  (todos, filter) => todos.filter(TODO_FILTERS[filter]),
)

// export const getCompletedCount = createSelector(
//   getTodos,
//   reduce((count, todo) => (todo.completed ? count + 1 : count), 0),
// )
