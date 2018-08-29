import { createElement, Component } from 'react'
import getDisplayName from 'react-display-name'
import throttle from 'just-throttle'

const throttleHandler = (handlerName, interval, leadingCall) => (Target) => {
  class ThrottleHandler extends Component {
    constructor (props, context) {
      super(props, context)

      const intervalValue = typeof interval === 'function' ? interval(props) : interval

      this.throttlePropInvoke = throttle(
        (...args) => this.props[handlerName](...args),
        intervalValue,
        leadingCall
      )

      this.handler = (e, ...rest) => {
        if (e && typeof e.persist === 'function') {
          e.persist()
        }

        return this.throttlePropInvoke(e, ...rest)
      }
    }

    render () {
      return createElement(Target, {
        ...this.props,
        [handlerName]: this.handler
      })
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    ThrottleHandler.displayName = `throttleHandler(${getDisplayName(Target)})`
  }

  return ThrottleHandler
}

export default throttleHandler
