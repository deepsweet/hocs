import React from 'react'
import 'resize-observer-polyfill/dist/ResizeObserver.global'
import { compose, pure } from 'recompose'

import withResizeObserverProps from '../src/'

const styles = {
  width: 400,
  resize: 'both',
  overflow: 'hidden',
  border: '1px solid #000'
}

const Demo = ({ onRef, hasNarrowWidth, hasLongHeight }) => (
  <div ref={onRef} style={styles}>
    <h2>resize me!</h2>
    {JSON.stringify({ hasNarrowWidth, hasLongHeight })}
  </div>
)

export default compose(
  withResizeObserverProps(
    ({ width, height }) => ({
      hasNarrowWidth: width < 500,
      hasLongHeight: height >= 300
    })
  ),
  pure
)(Demo)
