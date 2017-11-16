import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Header from './Header'
import MainSection from './MainSection'
import { actions as todoActions } from './../store/todos/actions'

const App = ({ todos, ...actions }) => (
  <div>
    <Header />
    <MainSection />
  </div>
)

App.propTypes = {
  todos: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  todos: state.todos,
})

export default connect(mapStateToProps, todoActions)(App)
