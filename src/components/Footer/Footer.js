import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const FILTER_TITLES = {
  all: 'All',
  active: 'Active',
  completed: 'Completed',
}

export default class Footer extends Component {
  static propTypes = {
    completedCount: PropTypes.number.isRequired,
    activeCount: PropTypes.number.isRequired,
    filter: PropTypes.string.isRequired,
    onClearCompleted: PropTypes.func.isRequired,
    onShow: PropTypes.func.isRequired,
  }

  render() {
    const {
      completedCount,
      onClearCompleted,
      filter: selectedFilter,
      onShow,
      activeCount,
    } = this.props

    const itemWord = activeCount === 1 ? 'item' : 'items'

    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{activeCount || 'No'}</strong> {itemWord} left
        </span>
        <ul className="filters">
          {['all', 'active', 'completed'].map(filter => (
            <li key={filter}>
              <a
                className={classnames({
                  selected: filter === selectedFilter,
                })}
                style={{ cursor: 'pointer' }}
                onClick={() => onShow(filter)}
              >
                {FILTER_TITLES[filter]}
              </a>
            </li>
          ))}
        </ul>
        {completedCount && (
          <button className="clear-completed" onClick={onClearCompleted}>
            Clear completed
          </button>
        )}
      </footer>
    )
  }
}
