import React from 'react'
import { connect } from 'react-redux'
import map from 'lodash/fp/map'

const TodoList = ({ allTodos }) => {
  return (
    <div>{map(({ title, id }) => <div key={id}>{title}</div>, allTodos)}</div>
  )
}

const mapStateToProps = ({ todos: { allTodos } }) => ({ allTodos })

export default connect(mapStateToProps)(TodoList)
