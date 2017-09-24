import React from 'react'
import { mount } from 'enzyme'

const Target = () => null

describe('withSafeTimeout', () => {
  let withSafeTimeout = null

  beforeAll(() => {
    jest.spyOn(global, 'setTimeout').mockImplementation(() => 'id')
    jest.spyOn(global, 'clearTimeout')
    jest.resetModules()

    withSafeTimeout = require('../src').withSafeTimeout
  })

  afterEach(() => {
    global.setTimeout.mockClear()
    global.clearTimeout.mockClear()
  })

  afterAll(() => {
    global.setTimeout.mockRestore()
    global.clearTimeout.mockRestore()
  })

  it('should pass props through', () => {
    const EnhancedTarget = withSafeTimeout(Target)
    const wrapper = mount(
      <EnhancedTarget a={1} b={2} />
    )

    expect(wrapper.find(Target)).toMatchSnapshot()
  })

  it('should provide `setSafeTimeout` prop and unsubscriber as its call return', () => {
    const callback = () => {}
    const EnhancedTarget = withSafeTimeout(Target)
    const wrapper = mount(
      <EnhancedTarget />
    )
    const clearSafeTimeout = wrapper.find(Target).prop('setSafeTimeout')(callback, 'a', 'b')

    expect(global.setTimeout.mock.calls).toMatchSnapshot()
    clearSafeTimeout()
    expect(global.clearTimeout.mock.calls).toMatchSnapshot()
  })

  it('should clear all safe timeouts on unmount', () => {
    const EnhancedTarget = withSafeTimeout(Target)
    const wrapper = mount(
      <EnhancedTarget />
    )
    const setSafeTimeout = wrapper.find(Target).prop('setSafeTimeout')

    setSafeTimeout()
    setSafeTimeout()
    setSafeTimeout()

    wrapper.unmount()

    expect(global.clearTimeout.mock.calls).toMatchSnapshot()
  })

  describe('display name', () => {
    const origNodeEnv = process.env.NODE_ENV

    afterAll(() => {
      process.env.NODE_ENV = origNodeEnv
    })

    it('should wrap display name in non-production env', () => {
      process.env.NODE_ENV = 'test'

      const EnhancedTarget = withSafeTimeout(Target)
      const wrapper = mount(
        <EnhancedTarget />
      )

      expect(wrapper).toMatchSnapshot()
    })

    it('should not wrap display name in production env', () => {
      process.env.NODE_ENV = 'production'

      const EnhancedTarget = withSafeTimeout(Target)
      const wrapper = mount(
        <EnhancedTarget />
      )

      expect(wrapper).toMatchSnapshot()
    })
  })
})
