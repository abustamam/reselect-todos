import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TodoItem from './../TodoItem'
import Footer from './../Footer'

const TODO_FILTERS = {
  all: () => true,
  active: todo => !todo.completed,
  completed: todo => todo.completed,
}

export default class MainSection extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    filter: PropTypes.oneOf('all', 'active', 'completed').isRequired,
    completeAll: PropTypes.func.isRequired,
    clearCompleted: PropTypes.func.isRequired,
    changeFilter: PropTypes.func.isRequired,
  }

  renderToggleAll(completedCount) {
    const { todos, completeAll } = this.props
    if (todos.length > 0) {
      return (
        <span>
          <input
            className="toggle-all"
            type="checkbox"
            checked={completedCount === todos.length}
          />
          <label onClick={completeAll} />
        </span>
      )
    }
  }

  renderFooter(completedCount) {
    const { todos, filter, changeFilter, clearCompleted } = this.props
    const activeCount = todos.length - completedCount

    if (todos.length) {
      return (
        <Footer
          completedCount={completedCount}
          activeCount={activeCount}
          filter={filter}
          onClearCompleted={clearCompleted}
          onShow={changeFilter}
        />
      )
    }
  }

  render() {
    const { todos, filter, ...actions } = this.props

    const filteredTodos = todos.filter(TODO_FILTERS[filter])
    const completedCount = todos.reduce(
      (count, todo) => (todo.completed ? count + 1 : count),
      0,
    )

    return (
      <section className="main">
        {this.renderToggleAll(completedCount)}
        <ul className="todo-list">
          {filteredTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} {...actions} />
          ))}
        </ul>
        {this.renderFooter(completedCount)}
      </section>
    )
  }
}
