import React from 'react'
import { mount } from 'enzyme'

const Target = () => null
const dummyMapStatusToProps = () => {}

describe('withOnlineStatusProps', () => {
  describe('Online Status API is supported', () => {
    let origOnlineStatus = null
    let withOnlineStatusProps = null

    beforeAll(() => {
      origOnlineStatus = global.navigator.onLine
    })

    beforeEach(() => {
      jest.resetModules()

      Object.defineProperty(global.navigator, 'onLine', {
        get: () => true,
        configurable: true
      })
      withOnlineStatusProps = require('../src/').default
    })

    afterAll(() => {
      Object.defineProperty(global.navigator, 'onLine', {
        get: () => origOnlineStatus,
        configurable: true
      })
    })

    it('should set initial state', () => {
      const EnhancedTarget = withOnlineStatusProps(
        ({ isOnline, isOffline }) => ({ isOnline, isOffline })
      )(Target)
      const wrapper = mount(
        <EnhancedTarget />
      )

      expect(wrapper.find(Target)).toMatchSnapshot()
    })

    it('should handle online status change', () => {
      const EnhancedTarget = withOnlineStatusProps(
        ({ isOnline, isOffline }) => ({ isOnline, isOffline })
      )(Target)
      const wrapper = mount(
        <EnhancedTarget />
      )

      global.dispatchEvent(new CustomEvent('offline'))
      wrapper.update()
      expect(wrapper.find(Target)).toMatchSnapshot()
      global.dispatchEvent(new CustomEvent('online'))
      wrapper.update()
      expect(wrapper.find(Target)).toMatchSnapshot()
    })

    it('should remove event listener on unmount', () => {
      const EnhancedTarget = withOnlineStatusProps(
        ({ isOnline, isOffline }) => ({ isOnline, isOffline })
      )(Target)
      const wrapper = mount(
        <EnhancedTarget />
      )
      const instance = wrapper.instance()

      wrapper.unmount()
      global.document.dispatchEvent(new CustomEvent('offline'))
      // TODO: mount again and check?
      // https://github.com/airbnb/enzyme/pull/969
      expect(instance.state).toMatchSnapshot()
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

        const EnhancedTarget = withOnlineStatusProps(dummyMapStatusToProps)(Target)
        const wrapper = mount(
          <EnhancedTarget />
        )

        expect(wrapper).toMatchSnapshot()
      })

      it('should not wrap display name in production env', () => {
        process.env.NODE_ENV = 'production'

        const EnhancedTarget = withOnlineStatusProps(dummyMapStatusToProps)(Target)
        const wrapper = mount(
          <EnhancedTarget />
        )

        expect(wrapper).toMatchSnapshot()
      })
    })
  })

  describe('Online Status API is not supported', () => {
    let origOnlineStatus = null
    let withOnlineStatusProps = null

    beforeAll(() => {
      origOnlineStatus = global.navigator.onLine
    })

    beforeEach(() => {
      jest.resetModules()

      Object.defineProperty(global.navigator, 'onLine', {
        get: () => {},
        configurable: true
      })
      withOnlineStatusProps = require('../src/').default
    })

    afterAll(() => {
      Object.defineProperty(global.navigator, 'onLine', {
        get: () => origOnlineStatus,
        configurable: true
      })
    })

    it('should just pass Target component through', () => {
      const EnhancedTarget = withOnlineStatusProps(dummyMapStatusToProps)(Target)
      const wrapper = mount(
        <EnhancedTarget a={1} b={2} c={3} />
      )

      expect(wrapper).toMatchSnapshot()
    })
  })
})
