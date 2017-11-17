import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TodoItem from './../TodoItem'
import Footer from './../Footer'

const MainSection = ({
  filter,
  filteredTodos,
  completedCount,
  count,
  activeCount,
  completeAll,
  clearCompleted,
  changeFilter,
  completeTodo,
  deleteTodo,
  editTodo,
}) => (
  <section className="main">
    {count && (
      <span>
        <input
          className="toggle-all"
          type="checkbox"
          checked={activeCount === 0}
        />
        <label onClick={completeAll} />
      </span>
    )}
    <ul className="todo-list">
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          {...{ todo, completeTodo, deleteTodo, editTodo }}
        />
      ))}
    </ul>
    {count && (
      <Footer
        completedCount={completedCount}
        activeCount={activeCount}
        filter={filter}
        onClearCompleted={clearCompleted}
        onShow={changeFilter}
      />
    )}
  </section>
)

MainSection.propTypes = {
  filter: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
  filteredTodos: PropTypes.array.isRequired,
  completedCount: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  activeCount: PropTypes.number.isRequired,
  completeAll: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
  changeFilter: PropTypes.func.isRequired,
}

export default MainSection
