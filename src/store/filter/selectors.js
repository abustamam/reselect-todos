import { createSelector, createStructuredSelector } from 'reselect'

export const rootFilterSelector = state => state.filter || {}
export const getFilter = createSelector(
  rootFilterSelector,
  ({ filter }) => filter,
)
