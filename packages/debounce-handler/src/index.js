import { createElement, Component } from 'react'
import getDisplayName from 'react-display-name'
import debounce from 'just-debounce-it'

const debounceHandler = (handlerName, delay, leadingCall) => (Target) => {
  class DebounceHandler extends Component {
    constructor (props, context) {
      super(props, context)

      const debounced = debounce(props[handlerName], delay, leadingCall)

      this[handlerName] = (e, ...rest) => {
        if (e && typeof e.persist === 'function') {
          e.persist()
        }

        return debounced(e, ...rest)
      }
    }

    render () {
      return createElement(Target, {
        ...this.props,
        [handlerName]: this[handlerName]
      })
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    DebounceHandler.displayName = `debounceHandler(${getDisplayName(Target)})`
  }

  return DebounceHandler
}

export default debounceHandler
