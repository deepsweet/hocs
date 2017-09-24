import React from 'react'
import 'intersection-observer'

import withIntersectionObserverProps from '../src/'

const Target = ({ isOnePixelVisible, isHalfVisible, isFullVisible, onRef }) => (
  <div ref={onRef} style={{ backgroundColor: 'RebeccaPurple', color: 'white' }}>
    <p>{JSON.stringify({ isOnePixelVisible })}</p>
    <p>{JSON.stringify({ isHalfVisible })}</p>
    <p>{JSON.stringify({ isFullVisible })}</p>
  </div>
)

export default withIntersectionObserverProps({
  isOnePixelVisible: 0.0,
  isHalfVisible: 0.5,
  isFullVisible: 1.0
})(Target)
