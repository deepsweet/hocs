import React from 'react'
import { mount } from 'enzyme'

const Target = () => null
const dummyMapStatusToProps = () => {}
const fullMapStatusToProps = ({ isVisible, isHidden, isPrerendered, isUnloaded }) => ({
  isVisible,
  isHidden,
  isPrerendered,
  isUnloaded
})

describe('withPageVisibilityProps', () => {
  describe('Page Visibility API is supported', () => {
    let withPageVisibilityProps = null
    let origVisibilityState = null

    beforeAll(() => {
      origVisibilityState = global.document.visibilityState
    })

    beforeEach(() => {
      jest.resetModules()

      Object.defineProperty(global.document, 'visibilityState', {
        get: () => 'visible',
        configurable: true
      })
      withPageVisibilityProps = require('../src/').default
    })

    afterAll(() => {
      Object.defineProperty(global.document, 'visibilityState', {
        get: () => origVisibilityState
      })
    })

    it('should set initial state', () => {
      const EnhancedTarget = withPageVisibilityProps(fullMapStatusToProps)(Target)
      const wrapper = mount(
        <EnhancedTarget />
      )

      expect(wrapper.find(Target)).toMatchSnapshot()
    })

    it('should handle page visibility state change', () => {
      const EnhancedTarget = withPageVisibilityProps(fullMapStatusToProps)(Target)
      const wrapper = mount(
        <EnhancedTarget />
      )

      Object.defineProperty(global.document, 'visibilityState', {
        get: () => 'hidden',
        configurable: true
      })
      global.document.dispatchEvent(new CustomEvent('visibilitychange'))
      wrapper.update()

      expect(wrapper.find(Target)).toMatchSnapshot()
    })

    it('should remove event listener on unmount', () => {
      const mockVisibility = jest.fn(() => 'hidden')
      const EnhancedTarget = withPageVisibilityProps(fullMapStatusToProps)(Target)
      const wrapper = mount(
        <EnhancedTarget />
      )

      wrapper.unmount()

      Object.defineProperty(global.document, 'visibilityState', {
        get: mockVisibility,
        configurable: true
      })
      global.document.dispatchEvent(new CustomEvent('visibilitychange'))

      expect(mockVisibility.mock.calls).toMatchSnapshot()
    })

    describe('display name', () => {
      let origNodeEnv = null

      beforeAll(() => {
        origNodeEnv = process.env.NODE_ENV
      })

      afterAll(() => {
        process.env.NODE_ENV = origNodeEnv
      })

      it('should wrap display name in non-production env', () => {
        process.env.NODE_ENV = 'test'

        const EnhancedTarget = withPageVisibilityProps(dummyMapStatusToProps)(Target)
        const wrapper = mount(
          <EnhancedTarget />
        )

        expect(wrapper).toMatchSnapshot()
      })

      it('should not wrap display name in production env', () => {
        process.env.NODE_ENV = 'production'

        const EnhancedTarget = withPageVisibilityProps(dummyMapStatusToProps)(Target)
        const wrapper = mount(
          <EnhancedTarget />
        )

        expect(wrapper).toMatchSnapshot()
      })
    })
  })

  describe('Page Visibility API is not supported', () => {
    let withPageVisibilityProps = null
    let origVisibilityState = null

    beforeAll(() => {
      origVisibilityState = global.document.visibilityState
    })

    beforeEach(() => {
      jest.resetModules()

      Object.defineProperty(global.document, 'visibilityState', {
        get: () => {},
        configurable: true
      })
      withPageVisibilityProps = require('../src/').default
    })

    afterAll(() => {
      Object.defineProperty(global.document, 'visibilityState', {
        get: () => origVisibilityState
      })
    })

    it('should just pass Target component through', () => {
      const EnhancedTarget = withPageVisibilityProps(dummyMapStatusToProps)(Target)
      const wrapper = mount(
        <EnhancedTarget a={1} b={2} c={3} />
      )

      expect(wrapper).toMatchSnapshot()
    })
  })
})
