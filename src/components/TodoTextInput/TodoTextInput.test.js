import React from 'react'
import { shallow } from 'enzyme'

import TodoTextInput from '.'

const wrap = (props = {}) => shallow(<TodoTextInput {...props} />)

const setup = propOverrides => {
  const props = Object.assign(
    {
      onSave: jest.fn(),
      text: 'Use Redux',
      placeholder: 'What needs to be done?',
      editing: false,
      newTodo: false,
    },
    propOverrides,
  )

  const wrapper = wrap(props)

  return { props, wrapper }
}

describe('components', () => {
  describe('TodoTextInput', () => {
    it('should render correctly', () => {
      const { wrapper } = setup()
      expect(wrapper.props().placeholder).toEqual('What needs to be done?')
      expect(wrapper.props().value).toEqual('Use Redux')
      expect(wrapper.props().className).toEqual('')
    })

    it('should render correctly when editing=true', () => {
      const { wrapper } = setup({ editing: true })
      expect(wrapper.props().className).toEqual('edit')
    })

    it('should render correctly when newTodo=true', () => {
      const { wrapper } = setup({ newTodo: true })
      expect(wrapper.props().className).toEqual('new-todo')
    })

    it('should update value on change', () => {
      const { wrapper, renderer } = setup()
      wrapper.props().onChange({ target: { value: 'Use Radox' } })
      wrapper.update()
      expect(wrapper.props().value).toEqual('Use Radox')
    })

    it('should call onSave on return key press', () => {
      const { wrapper, props } = setup()
      wrapper.props().onKeyDown({ which: 13, target: { value: 'Use Redux' } })
      expect(props.onSave).toBeCalledWith('Use Redux')
    })

    it('should reset state on return key press if newTodo', () => {
      const { wrapper, renderer } = setup({ newTodo: true })
      wrapper.props().onKeyDown({ which: 13, target: { value: 'Use Redux' } })
      wrapper.update()
      expect(wrapper.props().value).toEqual('')
    })

    it('should call onSave on blur', () => {
      const { wrapper, props } = setup()
      wrapper.props().onBlur({ target: { value: 'Use Redux' } })
      expect(props.onSave).toBeCalledWith('Use Redux')
    })

    it('shouldnt call onSave on blur if newTodo', () => {
      const { wrapper, props } = setup({ newTodo: true })
      wrapper.props().onBlur({ target: { value: 'Use Redux' } })
      expect(props.onSave).not.toBeCalled()
    })
  })
})
