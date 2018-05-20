import { createElement, Component } from 'react'
import { setDisplayName, wrapDisplayName } from 'recompose'

export default (methodsArg) => (Target) => {
  class WithLifecycle extends Component {
    constructor (props, context) {
      super(props, context)

      const methods = typeof methodsArg === 'function' ? methodsArg(props) : methodsArg

      if (methods) {
        if (methods.onConstructor) {
          methods.onConstructor(props)
        }

        if (methods.onWillMount) {
          this.componentWillMount = () => {
            methods.onWillMount(this.props)
          }
        }

        if (methods.onDidMount) {
          this.componentDidMount = () => {
            methods.onDidMount(this.props)
          }
        }

        if (methods.onReceiveProps) {
          this.state = props

          WithLifecycle.getDerivedStateFromProps = (nextProps, prevState) => {
            methods.onReceiveProps(prevState, nextProps)

            return null
          }
        }

        if (methods.onGetSnapshotBeforeUpdate) {
          this.getSnapshotBeforeUpdate = (prevProps) => {
            return methods.onGetSnapshotBeforeUpdate(prevProps, this.props)
          }
        }

        if (methods.onDidUpdate) {
          this.componentDidUpdate = (prevProps, _, snapshot) => {
            methods.onDidUpdate(prevProps, this.props, snapshot)
          }
        }

        if (methods.onWillUnmount) {
          this.componentWillUnmount = () => {
            methods.onWillUnmount(this.props)
          }
        }

        if (methods.onDidCatch) {
          this.componentDidCatch = (...args) => {
            methods.onDidCatch(...args)
          }
        }
      }
    }

    render () {
      return createElement(Target, this.props)
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(Target, 'withLifecycle'))(WithLifecycle)
  }

  return WithLifecycle
}
