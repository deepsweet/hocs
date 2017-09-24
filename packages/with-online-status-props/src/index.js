import { Component } from 'react'
import { createEagerFactory, setDisplayName, wrapDisplayName } from 'recompose'

const isOnlineStatusSupported = global.navigator && typeof global.navigator.onLine !== 'undefined'

const withOnlineStatusProps = (mapStatusToProps) => (Target) => {
  if (!isOnlineStatusSupported) {
    return Target
  }

  const factory = createEagerFactory(Target)

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
      return factory({
        ...this.props,
        ...this.state
      })
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(Target, 'withOnlineStatusProps'))(WithOnlineStatusProps)
  }

  return WithOnlineStatusProps
}

export default withOnlineStatusProps
