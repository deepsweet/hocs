import React from 'react'
import { compose, withProps } from 'recompose'

import withLog from '../src/'

const Demo = () => (
  <h1>Hi</h1>
)

export default compose(
  withProps({ a: 1, b: 2, c: 3 }),
  withLog(({ a }) => `a = ${a}`)
)(Demo)
