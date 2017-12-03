import { createSelector, createStructuredSelector } from 'reselect'
// import reduce from 'lodash/fp/reduce'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'

import { getFilter } from './../filter/selectors'

// without FP
export const getTodos = state => state.todos || []
export const getTodosCount = createSelector(getTodos, todos => todos.length)

// with FP
export const getTodosFp = getOr([], 'todos')
export const getTodosCountFp = createSelector(getTodosFp, size)

// with structured selectors
const mapStateToPropsWithStructuredSelectors = createStructuredSelector({
  todos: getTodos,
  todosCount: getTodosCount,
})

// with array of selectors
const mapStateToPropsWithArrayOfSelectors = createSelector(
  [getTodos, getTodosCount],
  (todos, todosCount) => ({
    todos,
    todosCount,
  }),
)

// with reselect:
const mapStateToPropsWithReselect = state => ({
  todos: getTodos(state),
  todosCount: getTodosCount(state),
})

// without reselect:
const mapStateToPropsWithoutReselect = state => ({
  todos: state.todos || [],
  todosCount: state.todos.length,
})

const TODO_FILTERS = {
  all: () => true,
  active: todo => !todo.completed,
  completed: todo => todo.completed,
}

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
