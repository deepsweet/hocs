import { createElement, Component } from 'react'
import { setDisplayName, wrapDisplayName } from 'recompose'

const withCallbackOnce = (shouldCall, callback) => (Target) => {
  class WithCallbackOnce extends Component {
    componentWillReceiveProps (nextProps) {
      if (
        shouldCall(this.props) === false &&
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
    return setDisplayName(wrapDisplayName(Target, 'withCallbackOnce'))(WithCallbackOnce)
  }

  return WithCallbackOnce
}

export default withCallbackOnce
