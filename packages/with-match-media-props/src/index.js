import { Component } from 'react'
import { createEagerFactory, setDisplayName, wrapDisplayName } from 'recompose'
import json2mq from 'json2mq'

const isMatchMediaSupported = typeof global.matchMedia === 'function'

const queryToMql = (query) => global.matchMedia(json2mq(query))
const createMediaMatcher = (query) => {
  const mql = queryToMql(query)

  return {
    matches: mql.matches,
    subscribe (handler) {
      mql.addListener(handler)

      return () => mql.removeListener(handler)
    }
  }
}

const withMatchMediaProps = (propsQieries = {}) => (Target) => {
  if (!isMatchMediaSupported) {
    return Target
  }

  const factory = createEagerFactory(Target)

  class WithMatchMediaProps extends Component {
    constructor (props, context) {
      super(props, context)

      this.propsMatchers = Object.keys(propsQieries).map((prop) => ({
        prop,
        ...createMediaMatcher(propsQieries[prop])
      }))

      this.state = this.propsMatchers.reduce((result, propMatcher) => ({
        ...result,
        [propMatcher.prop]: propMatcher.matches
      }), {})
    }

    componentDidMount () {
      this.unsubscribers = this.propsMatchers.map((propMatcher) => propMatcher.subscribe((e) => {
        this.setState({
          [propMatcher.prop]: e.matches
        })
      }))
    }

    componentWillUnmount () {
      this.unsubscribers.forEach((unsubscribe) => unsubscribe())
    }

    render () {
      return factory({
        ...this.props,
        ...this.state
      })
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(Target, 'withMatchMediaProps'))(WithMatchMediaProps)
  }

  return WithMatchMediaProps
}

export default withMatchMediaProps
