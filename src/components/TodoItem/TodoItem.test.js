import React from 'react'
import { shallow } from 'enzyme'

import TodoTextInput from './../TodoTextInput'
import TodoItem from '.'

const wrap = (props = {}) => shallow(<TodoItem {...props} />)

const setup = (editing = false) => {
  const props = {
    todo: {
      id: 0,
      text: 'Use Redux',
      completed: false,
    },
    editTodo: jest.fn(),
    deleteTodo: jest.fn(),
    completeTodo: jest.fn(),
  }

  let wrapper = wrap(props)

  if (editing) {
    wrapper.setState({ editing: true })
    wrapper.update()
  }

  return { props, wrapper }
}

describe('components', () => {
  describe('TodoItem', () => {
    it('initial render', () => {
      const { wrapper } = setup()

      expect(wrapper.type()).toBe('li')
      expect(wrapper.hasClass('')).toBe(true)

      const div = wrapper.children()

      expect(div.type()).toBe('div')
      expect(div.hasClass('view')).toBe(true)

      const [input, label, button] = div.children().map(a => a)

      expect(input.type()).toBe('input')
      expect(input.props().checked).toBe(false)

      expect(label.type()).toBe('label')
      expect(label.text()).toBe('Use Redux')

      expect(button.type()).toBe('button')
      expect(button.hasClass('destroy')).toBe(true)
    })

    it('input onChange should call completeTodo', () => {
      const { wrapper, props } = setup()
      const input = wrapper
        .children()
        .children()
        .first()
      input.props().onChange({})
      expect(props.completeTodo).toBeCalledWith(0)
    })

    it('button onClick should call deleteTodo', () => {
      const { wrapper, props } = setup()
      const button = wrapper
        .children()
        .children()
        .map(a => a)[2]
      button.props().onClick({})
      expect(props.deleteTodo).toBeCalledWith(0)
    })

    it('label onDoubleClick should put component in edit state', () => {
      const { wrapper } = setup()
      const label = wrapper
        .children()
        .children()
        .map(a => a)[1]
      label.props().onDoubleClick({})
      wrapper.update()
      expect(wrapper.type()).toBe('li')
      expect(wrapper.hasClass('editing')).toBe(true)
    })

    it('edit state render', () => {
      const { wrapper } = setup(true)
      expect(wrapper.type()).toBe('li')
      expect(wrapper.hasClass('editing')).toBe(true)

      const input = wrapper.children().first()
      expect(input.type()).toBe(TodoTextInput)
      expect(input.props().text).toBe('Use Redux')
      expect(input.props().editing).toBe(true)
    })

    it('TodoTextInput onSave should call editTodo', () => {
      const { wrapper, props } = setup(true)
      const f = wrapper
        .children()
        .props()
        .onSave('Use Redux')
      expect(props.editTodo).toBeCalledWith(0, 'Use Redux')
    })

    it('TodoTextInput onSave should call deleteTodo if text is empty', () => {
      const { wrapper, props } = setup(true)
      wrapper
        .children()
        .props()
        .onSave('')
      expect(props.deleteTodo).toBeCalledWith(0)
    })

    it('TodoTextInput onSave should exit component from edit state', () => {
      const { wrapper, renderer } = setup(true)
      wrapper
        .children()
        .props()
        .onSave('Use Redux')
      wrapper.update()
      expect(wrapper.type()).toBe('li')
      expect(wrapper.hasClass('')).toBe(true)
    })
  })
})
