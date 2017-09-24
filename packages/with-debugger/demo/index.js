import React from 'react'
import { compose, withProps } from 'recompose'

import withDebugger from '../src/'

const Demo = () => (
  <h1>Hi</h1>
)

export default compose(
  withProps({ a: 1, b: 2, c: 3 }),
  withDebugger
)(Demo)
