import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { actions as filterActions } from './../store/filter/actions'
import { getFilter } from './../store/filter/selectors'
import { actions as todoActions } from './../store/todos/actions'
import { getTodos, getTodosCount } from './../store/todos/selectors'
import MainSection from './../components/MainSection'

const mapStateToProps = createStructuredSelector({
  todos: getTodos,
  filter: getFilter,
  count: getTodosCount,
})

export default connect(mapStateToProps, { ...filterActions, ...todoActions })(
  MainSection,
)
