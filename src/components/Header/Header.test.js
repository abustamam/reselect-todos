import React from 'react'
import { shallow } from 'enzyme'

import TodoTextInput from './../TodoTextInput'
import Header from '.'

const wrap = (props = {}) => shallow(<Header {...props} />)

const setup = () => {
  const props = {
    addTodo: jest.fn(),
  }
  const comp = wrap(props)
  return { props, comp }
}

describe('components', () => {
  describe('Header', () => {
    it('should render correctly', () => {
      const { comp } = setup()

      expect(comp.is('header')).toBe(true)
      expect(comp.hasClass('header')).toBe(true)
      const [h1, input] = comp.children().map(a => a)
      expect(h1.is('h1')).toBe(true)
      expect(h1.text()).toBe('shopping')
      expect(input.type()).toBe(TodoTextInput)
      expect(input.props().newTodo).toBe(true)
      expect(input.props().placeholder).toBe('What needs to be bought?')
    })

    it('should call addTodo if length of text is greater than 0', () => {
      const { props, comp } = setup()
      const [, input] = comp.children().map(a => a)
      input.props().onSave('')
      expect(props.addTodo).not.toBeCalled()
      input.props().onSave('Use Redux')
      expect(props.addTodo).toBeCalled()
    })
  })
})
