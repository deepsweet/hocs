import { createElement, Component } from 'react'
import { setDisplayName, wrapDisplayName } from 'recompose'

const withCallbackOnChangeWhile = (propName, shouldCall, callback) => (Target) => {
  class WithCallbackOnChangeWhile extends Component {
    componentWillReceiveProps (nextProps) {
      if (
        this.props[propName] !== nextProps[propName] &&
        shouldCall(nextProps) === true
      ) {
        callback(nextProps)
      }
    }

    render () {
      return createElement(Target, this.props)
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(
      wrapDisplayName(Target, 'withCallbackOnChangeWhile')
    )(WithCallbackOnChangeWhile)
  }

  return WithCallbackOnChangeWhile
}

export default withCallbackOnChangeWhile
