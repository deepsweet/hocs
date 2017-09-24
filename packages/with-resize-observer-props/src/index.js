import { Component } from 'react'
import { createEagerFactory, setDisplayName, wrapDisplayName } from 'recompose'
import shallowEqual from 'shallowequal'

const isResizeObserverSupported = typeof global.ResizeObserver === 'function'

const withResizeObserverProps = (mapStateToProps, onRefName = 'onRef') => (Target) => {
  if (!isResizeObserverSupported) {
    return Target
  }

  const factory = createEagerFactory(Target)

  class WithResizeObserverProps extends Component {
    constructor (props, context) {
      super(props, context)

      this.state = {}
      this.onObserve = this.onObserve.bind(this)
      this.onRef = this.onRef.bind(this)
      this.observer = new global.ResizeObserver(this.onObserve)
    }

    componentDidMount () {
      this.observer.observe(this.domNode)
    }

    componentWillUnmount () {
      this.observer.disconnect()
    }

    onRef (ref) {
      this.domNode = ref

      if (typeof this.props[onRefName] === 'function') {
        this.props[onRefName](ref)
      }
    }

    onObserve (entries) {
      const nextState = entries.reduce((result, entry) => ({
        ...result,
        ...mapStateToProps(entry.contentRect)
      }), {})

      if (shallowEqual(this.state, nextState) === false) {
        this.setState(nextState)
      }
    }

    render () {
      return factory({
        ...this.props,
        ...this.state,
        [onRefName]: this.onRef
      })
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(
      wrapDisplayName(Target, 'withResizeObserverProps')
    )(WithResizeObserverProps)
  }

  return WithResizeObserverProps
}

export default withResizeObserverProps
