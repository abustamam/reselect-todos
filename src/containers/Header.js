import { connect } from 'react-redux'

import Header from './../components/Header'
import { headerActions } from './../store/todos/actions'

export default connect(null, headerActions)(Header)
