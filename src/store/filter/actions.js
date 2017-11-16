const createConstant = c => `filter/${c}`

export const CHANGE_FILTER = createConstant('CHANGE_FILTER')
export const SHOW_ALL = createConstant('SHOW_ALL')
export const SHOW_COMPLETED = createConstant('SHOW_COMPLETED')
export const SHOW_ACTIVE = createConstant('SHOW_ACTIVE')

export const types = { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE, CHANGE_FILTER }

const changeFilter = filter => ({ type: CHANGE_FILTER, filter })
const showAll = () => ({ type: SHOW_ALL })
const showCompleted = () => ({ type: SHOW_COMPLETED })
const showActive = () => ({ type: SHOW_ACTIVE })

export const actions = {
  changeFilter,
  showAll,
  showCompleted,
  showActive,
}
