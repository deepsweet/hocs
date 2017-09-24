import React from 'react'
import { mount } from 'enzyme'

import withCallbackOnChange from '../src/'

const Target = () => null

describe('withCallbackOnChange', () => {
  it('should pass props through', () => {
    const EnhancedTarget = withCallbackOnChange()(Target)
    const wrapper = mount(
      <EnhancedTarget a={1} b={2} c={3} />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('should invoke a callback on prop change', () => {
    const mockCallback = jest.fn()
    const EnhancedTarget = withCallbackOnChange('a', mockCallback)(Target)
    const wrapper = mount(
      <EnhancedTarget a={1} b={2} c={3} />
    )

    expect(mockCallback.mock.calls).toMatchSnapshot()
    wrapper.setProps({ a: 11 })
    expect(mockCallback.mock.calls).toMatchSnapshot()
  })

  it('should no-op if prop is the same', () => {
    const mockCallback = jest.fn()
    const EnhancedTarget = withCallbackOnChange('a', mockCallback)(Target)
    const wrapper = mount(
      <EnhancedTarget a={1} b={2} c={3} />
    )

    expect(mockCallback.mock.calls).toMatchSnapshot()
    wrapper.setProps({ a: 1 })
    expect(mockCallback.mock.calls).toMatchSnapshot()
  })

  describe('display name', () => {
    const origNodeEnv = process.env.NODE_ENV

    afterAll(() => {
      process.env.NODE_ENV = origNodeEnv
    })

    it('should wrap display name in non-production env', () => {
      process.env.NODE_ENV = 'test'

      const EnhancedTarget = withCallbackOnChange()(Target)
      const wrapper = mount(
        <EnhancedTarget />
      )

      expect(wrapper).toMatchSnapshot()
    })

    it('should not wrap display name in production env', () => {
      process.env.NODE_ENV = 'production'

      const EnhancedTarget = withCallbackOnChange()(Target)
      const wrapper = mount(
        <EnhancedTarget />
      )

      expect(wrapper).toMatchSnapshot()
    })
  })
})
