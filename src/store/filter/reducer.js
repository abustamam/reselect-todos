import { SHOW_ACTIVE, SHOW_ALL, SHOW_COMPLETED, CHANGE_FILTER } from './actions'

const initialState = {
  filter: 'all', // enum: all, completed, active
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_FILTER:
      return { ...state, filter: action.filter }
    case SHOW_ACTIVE:
      return { ...state, filter: 'active' }
    case SHOW_ALL:
      return { ...state, filter: 'all' }
    case SHOW_COMPLETED:
      return { ...state, filter: 'completed' }
    default:
      return state
  }
}
