import { createElement, Component } from 'react'
import { setDisplayName, wrapDisplayName } from 'recompose'

const withCallbackOnChange = (propName, callback) => (Target) => {
  class WithCallbackOnChange extends Component {
    componentWillReceiveProps (nextProps) {
      if (this.props[propName] !== nextProps[propName]) {
        callback(nextProps)
      }
    }

    render () {
      return createElement(Target, this.props)
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(Target, 'withCallbackOnChange'))(WithCallbackOnChange)
  }

  return WithCallbackOnChange
}

export default withCallbackOnChange
