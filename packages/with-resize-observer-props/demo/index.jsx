import React from 'react';
import { compose, withProps } from 'recompose';
import 'resize-observer-polyfill/dist/ResizeObserver.global';

import withResizeObserverProps from '../src/';

const Demo = ({ onRef, hasNarrowWidth, hasLongHeight }) => (
  <div
    ref={onRef}
    style={{ width: 400, resize: 'both', overflow: 'hidden', border: '1px solid #000' }}
  >
    <h2>resize me!</h2>
    {JSON.stringify({ hasNarrowWidth, hasLongHeight })}
  </div>
);

export default compose(
  withProps({
    myWidthBreakpoint: 500,
    myHeightBreakpoint: 300
  }),
  withResizeObserverProps(
    ({ myWidthBreakpoint, myHeightBreakpoint }) => ({ width, height }) => ({
      hasNarrowWidth: width < myWidthBreakpoint,
      hasLongHeight: height >= myHeightBreakpoint
    })
  )
)(Demo);
