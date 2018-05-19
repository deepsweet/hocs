import { createElement, Component } from 'react'
import { setDisplayName, wrapDisplayName } from 'recompose'

const withCallbackOnChange = (propName, callback) => (Target) => {
  class WithCallbackOnChange extends Component {
    static getDerivedStateFromProps (nextProps, prevState) {
      if (prevState[propName] !== nextProps[propName]) {
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
    return setDisplayName(wrapDisplayName(Target, 'withCallbackOnChange'))(WithCallbackOnChange)
  }

  return WithCallbackOnChange
}

export default withCallbackOnChange
