/* eslint-disable max-len */
import React from 'react'
import { mount } from 'enzyme'

const Target = () => null

describe('withSafeAnimationFrame', () => {
  let origRequestAnimationFrame = null
  let origCancelAnimationFrame = null
  let withSafeAnimationFrame = null

  beforeAll(() => {
    origRequestAnimationFrame = global.requestAnimationFrame
    origCancelAnimationFrame = global.cancelAnimationFrame

    jest.resetModules()

    global.requestAnimationFrame = jest.fn(() => 'id')
    global.cancelAnimationFrame = jest.fn()

    withSafeAnimationFrame = require('../src').withSafeAnimationFrame
  })

  afterEach(() => {
    global.requestAnimationFrame.mockClear()
    global.cancelAnimationFrame.mockClear()
  })

  afterAll(() => {
    global.requestAnimationFrame = origRequestAnimationFrame
    global.cancelAnimationFrame = origCancelAnimationFrame
  })

  it('should pass props through', () => {
    const EnhancedTarget = withSafeAnimationFrame(Target)
    const wrapper = mount(
      <EnhancedTarget a={1} b={2} />
    )

    expect(wrapper.find(Target)).toMatchSnapshot()
  })

  it('should provide `requestSafeAnimationFrame` prop and unsubscriber as its call return', () => {
    const callback = () => {}
    const EnhancedTarget = withSafeAnimationFrame(Target)
    const wrapper = mount(
      <EnhancedTarget />
    )
    const cancelSafeAnimationFrame = wrapper.find(Target).prop('requestSafeAnimationFrame')(callback, 'a', 'b')

    expect(global.requestAnimationFrame.mock.calls).toMatchSnapshot()

    cancelSafeAnimationFrame()

    expect(global.cancelAnimationFrame.mock.calls).toMatchSnapshot()
  })

  it('should clear all safe intervals on unmount', () => {
    const EnhancedTarget = withSafeAnimationFrame(Target)
    const wrapper = mount(
      <EnhancedTarget />
    )
    const requestSafeAnimationFrame = wrapper.find(Target).prop('requestSafeAnimationFrame')

    requestSafeAnimationFrame()
    requestSafeAnimationFrame()
    requestSafeAnimationFrame()

    wrapper.unmount()

    expect(global.cancelAnimationFrame.mock.calls).toMatchSnapshot()
  })

  describe('display name', () => {
    const origNodeEnv = process.env.NODE_ENV

    afterAll(() => {
      process.env.NODE_ENV = origNodeEnv
    })

    it('should wrap display name in non-production env', () => {
      process.env.NODE_ENV = 'test'

      const EnhancedTarget = withSafeAnimationFrame(Target)
      const wrapper = mount(
        <EnhancedTarget />
      )

      expect(wrapper).toMatchSnapshot()
    })

    it('should not wrap display name in production env', () => {
      process.env.NODE_ENV = 'production'

      const EnhancedTarget = withSafeAnimationFrame(Target)
      const wrapper = mount(
        <EnhancedTarget />
      )

      expect(wrapper).toMatchSnapshot()
    })
  })
})
