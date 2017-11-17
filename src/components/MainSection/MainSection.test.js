import React from 'react'
import { shallow, mount } from 'enzyme'

import TodoItem from './../TodoItem'
import Footer from './../Footer'
import MainSection from '.'
// import { SHOW_ALL, SHOW_COMPLETED } from './../../constants/TodoFilters'

const wrap = (props = {}) => shallow(<MainSection {...props} />)

const setup = propOverrides => {
  const props = Object.assign(
    {
      filteredTodos: [
        {
          text: 'Use Redux',
          completed: false,
          id: 0,
        },
        {
          text: 'Run the tests',
          completed: true,
          id: 1,
        },
      ],
      completedCount: 1,
      activeCount: 1,
      count: 2,
      filter: 'all',
      changeFilter: jest.fn(),
      editTodo: jest.fn(),
      deleteTodo: jest.fn(),
      completeTodo: jest.fn(),
      completeAll: jest.fn(),
      clearCompleted: jest.fn(),
    },
    propOverrides,
  )

  const wrapper = wrap(props)

  return {
    props,
    wrapper,
  }
}

describe('components', () => {
  describe('MainSection', () => {
    it('should render container', () => {
      const { wrapper } = setup()
      expect(wrapper.type()).toBe('section')
      expect(wrapper.hasClass('main')).toBe(true)
    })

    describe('toggle all input', () => {
      it('should render', () => {
        const { wrapper } = setup()
        const [toggle] = wrapper
          .children()
          .first()
          .children()
          .map(a => a)
        expect(toggle.type()).toBe('input')
        expect(toggle.props().type).toBe('checkbox')
        expect(toggle.props().checked).toBe(false)
      })

      it('should be checked if all todos completed', () => {
        const { wrapper } = setup({
          filteredTodos: [
            {
              text: 'Use Redux',
              completed: true,
              id: 0,
            },
          ],
          completedCount: 1,
          activeCount: 0,
          count: 1,
        })
        const [toggle] = wrapper
          .children()
          .first()
          .children()
          .map(a => a)
        expect(toggle.props().checked).toBe(true)
      })

      it('should call completeAll on change', () => {
        const { wrapper, props } = setup()
        const [, label] = wrapper
          .children()
          .first()
          .children()
          .map(a => a)
        label.props().onClick({})
        expect(props.completeAll).toBeCalled()
      })
    })

    describe('footer', () => {
      it('should render', () => {
        const { wrapper } = setup()
        const [, , footer] = wrapper.children().map(a => a)
        expect(footer.type()).toBe(Footer)
        expect(footer.props().completedCount).toBe(1)
        expect(footer.props().activeCount).toBe(1)
        expect(footer.props().filter).toBe('all')
      })

      it('onShow should set the filter', () => {
        const { wrapper, props } = setup()
        const [, , footer] = wrapper.children().map(a => a)
        footer.props().onShow('completed')
        expect(props.changeFilter.mock.calls).toEqual([['completed']])
      })

      it('onClearCompleted should call clearCompleted', () => {
        const { wrapper, props } = setup()
        const [, , footer] = wrapper.children().map(a => a)
        footer.props().onClearCompleted()
        expect(props.clearCompleted).toBeCalled()
      })
    })

    describe('todo list', () => {
      it('should render', () => {
        const { wrapper, props } = setup()
        const [, list] = wrapper.children().map(a => a)
        expect(list.type()).toBe('ul')
        expect(list.children().length).toBe(2)
        list.children().forEach((item, i) => {
          expect(item.type()).toBe(TodoItem)
          expect(item.props().todo).toBe(props.filteredTodos[i])
        })
      })
    })
  })
})
