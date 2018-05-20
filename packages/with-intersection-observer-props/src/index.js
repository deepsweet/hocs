import { createElement, Component } from 'react'
import getDisplayName from 'react-display-name'

const isIntersectionObserverSupported = typeof global.IntersectionObserver === 'function'

const withIntersectionObserverProps = (thresholds, options, onRefName = 'onRef') => (Target) => {
  if (!isIntersectionObserverSupported) {
    return Target
  }

  class WithIntersectionObserverProps extends Component {
    constructor (props, context) {
      super(props, context)

      this.state = {}
      this.onObserve = this.onObserve.bind(this)
      this.onRef = this.onRef.bind(this)
      this.observer = new global.IntersectionObserver(this.onObserve, {
        ...options,
        threshold: Object.keys(thresholds).map((prop) => thresholds[prop])
      })
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
      this.setState(
        Object.keys(thresholds).reduce((totalResult, prop) => ({
          ...totalResult,
          ...entries.reduce((entriesResult, entry) => ({
            ...entriesResult,
            [prop]: entry.isIntersecting && entry.intersectionRatio >= thresholds[prop]
          }), {})
        }), {})
      )
    }

    render () {
      return createElement(Target, {
        ...this.props,
        ...this.state,
        [onRefName]: this.onRef
      })
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    WithIntersectionObserverProps.displayName = `withIntersectionObserverProps(${getDisplayName(Target)})`
  }

  return WithIntersectionObserverProps
}

export default withIntersectionObserverProps
