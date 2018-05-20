/* eslint-disable no-debugger */
import { createElement } from 'react'
import getDisplayName from 'react-display-name'

const withDebugger = (Target) => {
  if (process.env.NODE_ENV === 'production') {
    return Target
  }

  const WithDebugger = (props) => {
    debugger

    return createElement(Target, props)
  }

  WithDebugger.displayName = `withDebugger(${getDisplayName(Target)})`

  return WithDebugger
}

export default withDebugger
