import React from 'react'
import { compose, withProps } from 'recompose'

import omitProps from '../src/'

const Demo = (props) => (
  <h1>props: {JSON.stringify(props)}</h1>
)

export default compose(
  withProps({ a: 1, b: 2, c: 3 }),
  omitProps('a', 'b')
)(Demo)
