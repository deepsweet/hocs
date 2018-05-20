import { createElement, Component } from 'react'
import getDisplayName from 'react-display-name'

const isOnlineStatusSupported = global.navigator && typeof global.navigator.onLine !== 'undefined'

const withOnlineStatusProps = (mapStatusToProps) => (Target) => {
  if (!isOnlineStatusSupported) {
    return Target
  }

  class WithOnlineStatusProps extends Component {
    constructor (props, context) {
      super(props, context)

      this.state = mapStatusToProps({
        isOnline: global.navigator.onLine,
        isOffline: !global.navigator.onLine
      })
      this.handleOnline = this.handleOnline.bind(this)
      this.handleOffline = this.handleOffline.bind(this)
    }

    componentDidMount () {
      global.addEventListener('online', this.handleOnline, false)
      global.addEventListener('offline', this.handleOffline, false)
    }

    componentWillUnmount () {
      global.removeEventListener('online', this.handleOnline)
      global.removeEventListener('offline', this.handleOffline)
    }

    handleOnline () {
      this.setState(
        mapStatusToProps({
          isOnline: true,
          isOffline: false
        })
      )
    }

    handleOffline () {
      this.setState(
        mapStatusToProps({
          isOnline: false,
          isOffline: true
        })
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
    WithOnlineStatusProps.displayName = `withOnlineStatusProps(${getDisplayName(Target)})`
  }

  return WithOnlineStatusProps
}

export default withOnlineStatusProps
