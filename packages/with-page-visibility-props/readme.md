# :see_no_evil: with-page-visibility-props

[![npm](https://img.shields.io/npm/v/@hocs/with-page-visibility-props.svg?style=flat-square)](https://www.npmjs.com/package/@hocs/with-page-visibility-props) [![ci](https://img.shields.io/travis/deepsweet/hocs/master.svg?style=flat-square)](https://travis-ci.org/deepsweet/hocs) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/hocs/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/hocs) [![deps](https://david-dm.org/deepsweet/hocs.svg?path=packages/with-page-visibility-props&style=flat-square)](https://david-dm.org/deepsweet/hocs?path=packages/with-page-visibility-props)

Part of a [collection](https://github.com/deepsweet/hocs) of Higher-Order Components for React, especially useful with [Recompose](https://github.com/acdlite/recompose).

Dynamically map page visibility status to props using [Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) ([Can I use?](https://caniuse.com/#feat=pagevisibility)).

> A few examples:
>
> * A site has an image carousel that shouldn't advance to the next slide unless the user is viewing the page.
> * An application showing a dashboard of information doesn't want to poll the server for updates when the page isn't visible.
> * A page wants to detect when it is being prerendered so it can keep accurate count of page views.
> * A site wants to switch off sounds when a device is in standby mode (user pushes power button to turn screen off)


## Install

```
yarn add @hocs/with-page-visibility-props
```

## Usage

```js
withPageVisibilityProps(
  mapStatusToProps: (visibilityStatus: Object) => Object,
): HigherOrderComponent
```

Where `visibilityStatus` is an `{ isVivisble, isHidden, isPrerendered, isUnloaded }` object, check out [`visibilityState`](https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilityState) documentation for details.

```js
import React from 'react';
import { compose } from 'recompose';
import withPageVisibilityProps from '@hocs/with-page-visibility-props';
import withLog from '@hocs/with-log';

const Demo = () => (
  <h1>Switch to another tab, go back here and check console logs.</h1>
);

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
)(Demo);
```

:tv: [Check out live demo](https://codesandbox.io/s/q7x0nvom24).

## Notes

* Target Component will be just passed through on unsupported platforms (i.e. `global.document.visibilityState` is `undefined`) like IE9, JSDOM (so Jest as well) or with Server-Side Rendering. This means that there will be no visibiulity status (i.e. `undefined`) which might be expected, but you can take care of it using Recompose [`defaultProps`](https://github.com/acdlite/recompose/blob/master/docs/API.md#defaultprops) HOC if it's really necessary.
