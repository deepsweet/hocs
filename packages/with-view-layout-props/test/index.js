import React from 'react'
import { mount } from 'enzyme'

import withViewLayoutProps from '../src/'

const Target = () => null

describe('withViewLayoutProps', () => {
  it('should pass props through', () => {
    const EnhancedTarget = withViewLayoutProps((state) => state)(Target)
    const wrapper = mount(
      <EnhancedTarget a={1} b={2} />
    )

    expect(wrapper.find(Target)).toMatchSnapshot()
  })

  it('should map layout dimensions to props', () => {
    const mockStateToProps = jest.fn((state) => state)
    const EnhancedTarget = withViewLayoutProps(mockStateToProps)(Target)
    const wrapper = mount(
      <EnhancedTarget />
    )

    wrapper.find(Target).prop('onLayout')({
      nativeEvent: {
        layout: {
          width: 1,
          height: 2,
          x: 3,
          y: 4
        }
      }
    })
    wrapper.update()

    expect(mockStateToProps.mock.calls).toMatchSnapshot()
    expect(wrapper.find(Target)).toMatchSnapshot()
  })

  it('should use provided custom `onLayout` handler name', () => {
    const EnhancedTarget = withViewLayoutProps(() => {}, 'onMyViewLayout')(Target)
    const wrapper = mount(
      <EnhancedTarget />
    )

    expect(wrapper.find(Target)).toMatchSnapshot()
  })

  describe('display name', () => {
    const origNodeEnv = process.env.NODE_ENV

    afterAll(() => {
      process.env.NODE_ENV = origNodeEnv
    })

    it('should wrap display name in non-production env', () => {
      process.env.NODE_ENV = 'test'

      const EnhancedTarget = withViewLayoutProps(() => {})(Target)
      const wrapper = mount(
        <EnhancedTarget />
      )

      expect(wrapper).toMatchSnapshot()
    })

    it('should not wrap display name in production env', () => {
      process.env.NODE_ENV = 'production'

      const EnhancedTarget = withViewLayoutProps(() => {})(Target)
      const wrapper = mount(
        <EnhancedTarget />
      )

      expect(wrapper).toMatchSnapshot()
    })
  })
})
