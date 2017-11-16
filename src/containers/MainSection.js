import { connect } from 'react-redux'

import { actions as filterActions } from './../store/filter/actions'
import { actions as todoActions } from './../store/todos/actions'
import MainSection from './../components/MainSection'

const mapStateToProps = ({ todos, filter: { filter } }) => ({
  todos,
  filter,
})

export default connect(mapStateToProps, { ...filterActions, ...todoActions })(
  MainSection,
)
