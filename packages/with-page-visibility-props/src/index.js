import { createElement, Component } from 'react'
import getDisplayName from 'react-display-name'

const isPageVisibiitySupported = global.document &&
                                 typeof global.document.visibilityState !== 'undefined'

const getVisibilityStatus = (visibilityState) => ({
  isVisible: visibilityState === 'visible',
  isHidden: visibilityState === 'hidden',
  isPrerendered: visibilityState === 'prerender',
  isUnloaded: visibilityState === 'unloaded'
})

const withPageVisibilityProps = (mapStatusToProps) => (Target) => {
  if (!isPageVisibiitySupported) {
    return Target
  }

  class WithPageVisibilityProps extends Component {
    constructor (props, context) {
      super(props, context)

      this.state = mapStatusToProps(
        getVisibilityStatus(global.document.visibilityState)
      )
      this.onVibisilityChange = this.onVibisilityChange.bind(this)
    }

    componentDidMount () {
      global.document.addEventListener('visibilitychange', this.onVibisilityChange, false)
    }

    componentWillUnmount () {
      global.document.removeEventListener('visibilitychange', this.onVibisilityChange)
    }

    onVibisilityChange () {
      this.setState(
        mapStatusToProps(
          getVisibilityStatus(global.document.visibilityState)
        )
      )
    }

    render () {
      return createElement(Target, {
        ...this.props,
        ...this.state
      })
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    WithPageVisibilityProps.displayName = `withPageVisibilityProps(${getDisplayName(Target)})`
  }

  return WithPageVisibilityProps
}

export default withPageVisibilityProps
