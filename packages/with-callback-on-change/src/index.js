import { createElement, Component } from 'react'
import getDisplayName from 'react-display-name'

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
    WithCallbackOnChange.displayName = `withCallbackOnChange(${getDisplayName(Target)})`
  }

  return WithCallbackOnChange
}

export default withCallbackOnChange
