import React from 'react'
import { shallow } from 'enzyme'

import Footer from '.'

const wrap = (props = {}) => shallow(<Footer {...props} />)

const setup = propOverrides => {
  const props = Object.assign(
    {
      completedCount: 0,
      activeCount: 0,
      filter: 'all',
      onClearCompleted: jest.fn(),
      onShow: jest.fn(),
    },
    propOverrides,
  )

  const wrapper = wrap(props)
  return { props, wrapper }
}

const getTextContent = elem =>
  elem
    .children()
    .reduce(
      (out, child) =>
        out + (!!child.text() ? child.text() : getTextContent(child)),
      '',
    )

describe('components', () => {
  describe('Footer', () => {
    it('should render container', () => {
      const { wrapper } = setup()
      expect(wrapper.type()).toBe('footer')
      expect(wrapper.hasClass('footer')).toBe(true)
    })

    it('should display active count when 0', () => {
      const { wrapper } = setup({ activeCount: 0 })
      const [count] = wrapper.children().map(a => a)
      expect(getTextContent(count)).toBe('No items left')
    })

    it('should display active count when above 0', () => {
      const { wrapper } = setup({ activeCount: 1 })
      const [count] = wrapper.children().map(a => a)
      expect(getTextContent(count)).toBe('1 item left')
    })

    it('should render filters', () => {
      const { wrapper } = setup()
      const [, filters] = wrapper.children().map(a => a)
      expect(filters.type()).toBe('ul')
      expect(filters.hasClass('filters')).toBe(true)
      expect(filters.children().length).toBe(3)
      filters.children().forEach(function checkFilter(filter, i) {
        expect(filter.type()).toBe('li')
        const a = filter.children()
        expect(a.hasClass(i === 0 ? 'selected' : '')).toBe(true)
        expect(a.text()).toEqual(
          {
            0: 'All',
            1: 'Active',
            2: 'Completed',
          }[i],
        )
      })
    })

    it('should call onShow when a filter is clicked', () => {
      const { wrapper, props } = setup()
      const [, filters] = wrapper.children().map(a => a)
      const filterLink = filters
        .children()
        .map(a => a)[1]
        .children()
      filterLink.props().onClick({})
      expect(props.onShow).toBeCalledWith('active')
    })

    it('shouldnt show clear button when no completed todos', () => {
      const { wrapper } = setup({ completedCount: 0 })
      const [, , clear] = wrapper.children().map(a => a)
      expect(clear).toBe(undefined)
    })

    it('should render clear button when completed todos', () => {
      const { wrapper } = setup({ completedCount: 1 })
      const [, , clear] = wrapper.children().map(a => a)
      expect(clear.type()).toBe('button')
      expect(clear.text()).toBe('Clear completed')
    })

    it('should call onClearCompleted on clear button click', () => {
      const { wrapper, props } = setup({ completedCount: 1 })
      const [, , clear] = wrapper.children().map(a => a)
      clear.props().onClick({})
      expect(props.onClearCompleted).toBeCalled()
    })
  })
})
