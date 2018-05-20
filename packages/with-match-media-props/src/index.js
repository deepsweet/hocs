import { createElement, Component } from 'react'
import getDisplayName from 'react-display-name'
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
      return createElement(Target, {
        ...this.props,
        ...this.state
      })
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    WithMatchMediaProps.displayName = `withMatchMediaProps(${getDisplayName(Target)})`
  }

  return WithMatchMediaProps
}

export default withMatchMediaProps
