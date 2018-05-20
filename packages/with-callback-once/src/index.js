import { createElement, Component } from 'react'
import getDisplayName from 'react-display-name'

const withCallbackOnce = (shouldCall, callback) => (Target) => {
  class WithCallbackOnce extends Component {
    static getDerivedStateFromProps (nextProps, prevState) {
      if (
        typeof shouldCall === 'function' &&
        shouldCall(prevState) === false &&
        shouldCall(nextProps) === true
      ) {
        callback(nextProps)
      }

      return null
    }

    constructor (props, context) {
      super(props, context)

      this.state = props
    }

    render () {
      return createElement(Target, this.props)
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    WithCallbackOnce.displayName = `withCallbackOnce(${getDisplayName(Target)})`
  }

  return WithCallbackOnce
}

export default withCallbackOnce
