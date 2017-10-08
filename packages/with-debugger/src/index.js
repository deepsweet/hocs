/* eslint-disable no-debugger */
import { createElement } from 'react'
import { setDisplayName, wrapDisplayName } from 'recompose'

const withDebugger = (Target) => {
  if (process.env.NODE_ENV === 'production') {
    return Target
  }

  const WithDebugger = (props) => {
    debugger

    return createElement(Target, props)
  }

  return setDisplayName(wrapDisplayName(Target, 'withDebugger'))(WithDebugger)
}

export default withDebugger
