import { createSelector, createStructuredSelector } from 'reselect'

export const getTodos = state => state.todos || []
export const getTodosCount = createSelector(getTodos, list => list.length)
