import { createElement, Component } from 'react'
import getDisplayName from 'react-display-name'

const preventHandlersDefault = (...handlers) => (Target) => {
  class PreventHandlersDefault extends Component {
    constructor (props, context) {
      super(props, context)

      this.handlers = handlers.reduce((result, handlerName) => {
        if (typeof props[handlerName] === 'function') {
          result[handlerName] = (e, ...rest) => {
            if (e && typeof e.preventDefault === 'function') {
              e.preventDefault()
            }

            props[handlerName](e, ...rest)
          }
        }

        return result
      }, {})
    }

    render () {
      return createElement(Target, {
        ...this.props,
        ...this.handlers
      })
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    PreventHandlersDefault.displayName = `preventHandlersDefault(${getDisplayName(Target)})`
  }

  return PreventHandlersDefault
}

export default preventHandlersDefault
