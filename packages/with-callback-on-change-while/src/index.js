import { Component } from 'react'
import { createEagerFactory, setDisplayName, wrapDisplayName } from 'recompose'

const withCallbackOnChangeWhile = (propName, shouldCall, callback) => (Target) => {
  const factory = createEagerFactory(Target)

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
      return factory(this.props)
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
