import React from 'react'
import { mount } from 'enzyme'

import withLifecycle from '../src/'

const Target = () => null

describe('withLifecycle', () => {
  it('should pass props through to the Target', () => {
    const EnhancedTarget = withLifecycle()(Target)
    const wrapper = mount(
      <EnhancedTarget a={1} b={2} />
    )

    expect(wrapper.find(Target)).toMatchSnapshot()
  })

  describe('as object', () => {
    it('onConstructor', () => {
      const mockOnConstructor = jest.fn()
      const EnhancedTarget = withLifecycle({ onConstructor: mockOnConstructor })(Target)

      mount(
        <EnhancedTarget a={1} b={2} />
      )

      expect(mockOnConstructor.mock.calls).toMatchSnapshot()
    })

    it('onWillMount', () => {
      const mockOnWillMount = jest.fn()
      const EnhancedTarget = withLifecycle({ onWillMount: mockOnWillMount })(Target)

      mount(
        <EnhancedTarget a={1} b={2} />
      )

      expect(mockOnWillMount.mock.calls).toMatchSnapshot()
    })

    it('onDidMount', () => {
      const mockOnDidMount = jest.fn()
      const EnhancedTarget = withLifecycle({ onDidMount: mockOnDidMount })(Target)

      mount(
        <EnhancedTarget a={1} b={2} />
      )

      expect(mockOnDidMount.mock.calls).toMatchSnapshot()
    })

    it('onReceiveProps', () => {
      const mockOnReceiveProps = jest.fn()
      const EnhancedTarget = withLifecycle({ onReceiveProps: mockOnReceiveProps })(Target)
      const wrapper = mount(
        <EnhancedTarget a={1} b={2} />
      )

      wrapper.setProps({ c: 3 })

      expect(mockOnReceiveProps.mock.calls).toMatchSnapshot()
    })

    it('onGetSnapshotBeforeUpdate', () => {
      const mockOnGetSnapshotBeforeUpdate = jest.fn(() => 'snapshot')
      const mockOnDidUpdate = jest.fn()
      const EnhancedTarget = withLifecycle({
        onGetSnapshotBeforeUpdate: mockOnGetSnapshotBeforeUpdate,
        onDidUpdate: mockOnDidUpdate
      })(Target)
      const wrapper = mount(
        <EnhancedTarget a={1} b={2} />
      )

      wrapper.setProps({ c: 3 })

      expect(mockOnGetSnapshotBeforeUpdate.mock.calls).toMatchSnapshot()
      expect(mockOnDidUpdate.mock.calls).toMatchSnapshot()
    })

    it('onDidUpdate', () => {
      const mockOnDidUpdate = jest.fn()
      const EnhancedTarget = withLifecycle({ onDidUpdate: mockOnDidUpdate })(Target)
      const wrapper = mount(
        <EnhancedTarget a={1} b={2} />
      )

      wrapper.setProps({ c: 3 })

      expect(mockOnDidUpdate.mock.calls).toMatchSnapshot()
    })

    it('onWillUnmount', () => {
      const mockOnWillUnmount = jest.fn()
      const EnhancedTarget = withLifecycle({ onWillUnmount: mockOnWillUnmount })(Target)
      const wrapper = mount(
        <EnhancedTarget a={1} b={2} />
      )

      wrapper.unmount()

      expect(mockOnWillUnmount.mock.calls).toMatchSnapshot()
    })

    it('onDidCatch', () => {
      const mockOnDidCatch = jest.fn()
      const TargetWithError = () => {
        throw new Error('oops')
      }
      const EnhancedTarget = withLifecycle({ onDidCatch: mockOnDidCatch })(TargetWithError)
      const consoleError = console.error

      console.error = () => {}

      mount(
        <EnhancedTarget />
      )

      console.error = consoleError

      expect(mockOnDidCatch.mock.calls).toMatchSnapshot()
    })

    it('multiple', () => {
      const mockOnWillMount = jest.fn()
      const mockOnDidMount = jest.fn()
      const EnhancedTarget = withLifecycle({
        onWillMount: mockOnWillMount,
        onDidMount: mockOnDidMount
      })(Target)

      mount(
        <EnhancedTarget />
      )

      expect(mockOnWillMount.mock.calls).toMatchSnapshot()
      expect(mockOnDidMount.mock.calls).toMatchSnapshot()
    })
  })

  describe('as factory', () => {
    it('should call factory functions with props', () => {
      const mockFactory = jest.fn()
      const EnhancedTarget = withLifecycle(mockFactory)(Target)

      mount(
        <EnhancedTarget a={1} b={2} />
      )

      expect(mockFactory.mock.calls).toMatchSnapshot()
    })

    it('onConstructor', () => {
      const mockOnConstructor = jest.fn()
      const EnhancedTarget = withLifecycle(
        () => ({ onConstructor: mockOnConstructor })
      )(Target)

      mount(
        <EnhancedTarget a={1} b={2} />
      )

      expect(mockOnConstructor.mock.calls).toMatchSnapshot()
    })

    it('onWillMount', () => {
      const mockOnWillMount = jest.fn()
      const EnhancedTarget = withLifecycle(
        () => ({ onWillMount: mockOnWillMount })
      )(Target)

      mount(
        <EnhancedTarget a={1} b={2} />
      )

      expect(mockOnWillMount.mock.calls).toMatchSnapshot()
    })

    it('onDidMount', () => {
      const mockOnDidMount = jest.fn()
      const EnhancedTarget = withLifecycle(
        () => ({ onDidMount: mockOnDidMount })
      )(Target)

      mount(
        <EnhancedTarget a={1} b={2} />
      )

      expect(mockOnDidMount.mock.calls).toMatchSnapshot()
    })

    it('onReceiveProps', () => {
      const mockOnReceiveProps = jest.fn()
      const EnhancedTarget = withLifecycle(
        () => ({ onReceiveProps: mockOnReceiveProps })
      )(Target)
      const wrapper = mount(
        <EnhancedTarget a={1} b={2} />
      )

      wrapper.setProps({ c: 3 })

      expect(mockOnReceiveProps.mock.calls).toMatchSnapshot()
    })

    it('onGetSnapshotBeforeUpdate', () => {
      const mockOnGetSnapshotBeforeUpdate = jest.fn(() => 'snapshot')
      const mockOnDidUpdate = jest.fn()
      const EnhancedTarget = withLifecycle(
        () => ({
          onGetSnapshotBeforeUpdate: mockOnGetSnapshotBeforeUpdate,
          onDidUpdate: mockOnDidUpdate
        })
      )(Target)
      const wrapper = mount(
        <EnhancedTarget a={1} b={2} />
      )

      wrapper.setProps({ c: 3 })

      expect(mockOnGetSnapshotBeforeUpdate.mock.calls).toMatchSnapshot()
      expect(mockOnDidUpdate.mock.calls).toMatchSnapshot()
    })

    it('onDidUpdate', () => {
      const mockOnDidUpdate = jest.fn()
      const EnhancedTarget = withLifecycle(
        () => ({ onDidUpdate: mockOnDidUpdate })
      )(Target)
      const wrapper = mount(
        <EnhancedTarget a={1} b={2} />
      )

      wrapper.setProps({ c: 3 })

      expect(mockOnDidUpdate.mock.calls).toMatchSnapshot()
    })

    it('onWillUnmount', () => {
      const mockOnWillUnmount = jest.fn()
      const EnhancedTarget = withLifecycle(
        () => ({ onWillUnmount: mockOnWillUnmount })
      )(Target)
      const wrapper = mount(
        <EnhancedTarget a={1} b={2} />
      )

      wrapper.unmount()

      expect(mockOnWillUnmount.mock.calls).toMatchSnapshot()
    })

    it('onDidCatch', () => {
      const mockOnDidCatch = jest.fn()
      const TargetWithError = () => {
        throw new Error('oops')
      }
      const EnhancedTarget = withLifecycle(
        () => ({ onDidCatch: mockOnDidCatch })
      )(TargetWithError)
      const consoleError = console.error

      console.error = () => {}

      mount(
        <EnhancedTarget />
      )

      console.error = consoleError

      expect(mockOnDidCatch.mock.calls).toMatchSnapshot()
    })

    it('multiple', () => {
      const mockOnWillMount = jest.fn()
      const mockOnDidMount = jest.fn()
      const EnhancedTarget = withLifecycle(
        () => ({
          onWillMount: mockOnWillMount,
          onDidMount: mockOnDidMount
        })
      )(Target)

      mount(
        <EnhancedTarget />
      )

      expect(mockOnWillMount.mock.calls).toMatchSnapshot()
      expect(mockOnDidMount.mock.calls).toMatchSnapshot()
    })
  })

  describe('display name', () => {
    const origNodeEnv = process.env.NODE_ENV

    afterAll(() => {
      process.env.NODE_ENV = origNodeEnv
    })

    it('should wrap display name in non-production env', () => {
      process.env.NODE_ENV = 'test'

      const EnhancedTarget = withLifecycle()(Target)
      const wrapper = mount(
        <EnhancedTarget />
      )

      expect(wrapper).toMatchSnapshot()
    })

    it('should not wrap display name in production env', () => {
      process.env.NODE_ENV = 'production'

      const EnhancedTarget = withLifecycle()(Target)
      const wrapper = mount(
        <EnhancedTarget />
      )

      expect(wrapper).toMatchSnapshot()
    })
  })
})
