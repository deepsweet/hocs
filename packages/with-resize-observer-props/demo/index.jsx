import React from 'react';
import { compose, withProps } from 'recompose';
import 'resize-observer-polyfill/dist/ResizeObserver.global';

import withResizeObserverProps from '../src/';

const Demo = ({ onRef, hasNarrowWidth, hasLongHeight }) => (
  <textarea
    readOnly={true}
    ref={onRef}
    style={{ width: 400, height: 100 }}
    value={`resize me!\n${JSON.stringify({ hasNarrowWidth, hasLongHeight })}`}
  />
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
