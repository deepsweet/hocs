import { createElement, Component } from 'react'
import getDisplayName from 'react-display-name'

const withCallbackOnChangeWhile = (propName, shouldCall, callback) => (Target) => {
  class WithCallbackOnChangeWhile extends Component {
    static getDerivedStateFromProps (nextProps, prevState) {
      if (prevState[propName] !== nextProps[propName] && shouldCall(nextProps) === true) {
        callback(nextProps)
      }

      return null
    }

    constructor (props, context) {
      super(props, context)

      this.state = {
        [propName]: props[propName]
      }
    }

    render () {
      return createElement(Target, this.props)
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    WithCallbackOnChangeWhile.displayName = `withCallbackOnChangeWhile(${getDisplayName(Target)})`
  }

  return WithCallbackOnChangeWhile
}

export default withCallbackOnChangeWhile
