import React from 'react'
import { compose } from 'recompose'
import withLog from '@hocs/with-log/src/'

import withPageVisibilityProps from '../src/'

const Demo = () => (
  <h1>Switch to another tab, go back here and check console logs.</h1>
)

export default compose(
  withPageVisibilityProps(
    ({
      isVisible,
      isHidden,
      isPrerendered,
      isUnloaded
    }) => ({
      isVisible,
      isHidden,
      isPrerendered,
      isUnloaded
    })
  ),
  withLog()
)(Demo)
