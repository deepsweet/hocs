import React from 'react'
import { mount } from 'enzyme'

const Target = () => null

describe('withSafeInterval', () => {
  let withSafeInterval = null

  beforeAll(() => {
    jest.spyOn(global, 'setInterval').mockImplementation(() => 'id')
    jest.spyOn(global, 'clearInterval')
    jest.resetModules()

    withSafeInterval = require('../src').withSafeInterval
  })

  afterEach(() => {
    global.setInterval.mockClear()
    global.clearInterval.mockClear()
  })

  afterAll(() => {
    global.setInterval.mockRestore()
    global.clearInterval.mockRestore()
  })

  it('should pass props through', () => {
    const EnhancedTarget = withSafeInterval(Target)
    const wrapper = mount(
      <EnhancedTarget a={1} b={2} />
    )

    expect(wrapper.find(Target)).toMatchSnapshot()
  })

  it('should provide `setSafeInterval` prop and unsubscriber as its call return', () => {
    const callback = () => {}
    const EnhancedTarget = withSafeInterval(Target)
    const wrapper = mount(
      <EnhancedTarget />
    )
    const clearSafeInterval = wrapper.find(Target).prop('setSafeInterval')(callback, 'a', 'b')

    expect(global.setInterval.mock.calls).toMatchSnapshot()

    clearSafeInterval()

    expect(global.clearInterval.mock.calls).toMatchSnapshot()
  })

  it('should clear all safe intervals on unmount', () => {
    const EnhancedTarget = withSafeInterval(Target)
    const wrapper = mount(
      <EnhancedTarget />
    )
    const setSafeInterval = wrapper.find(Target).prop('setSafeInterval')

    setSafeInterval()
    setSafeInterval()
    setSafeInterval()

    wrapper.unmount()

    expect(global.clearInterval.mock.calls).toMatchSnapshot()
  })

  describe('display name', () => {
    const origNodeEnv = process.env.NODE_ENV

    afterAll(() => {
      process.env.NODE_ENV = origNodeEnv
    })

    it('should wrap display name in non-production env', () => {
      process.env.NODE_ENV = 'test'

      const EnhancedTarget = withSafeInterval(Target)
      const wrapper = mount(
        <EnhancedTarget />
      )

      expect(wrapper).toMatchSnapshot()
    })

    it('should not wrap display name in production env', () => {
      process.env.NODE_ENV = 'production'

      const EnhancedTarget = withSafeInterval(Target)
      const wrapper = mount(
        <EnhancedTarget />
      )

      expect(wrapper).toMatchSnapshot()
    })
  })
})
