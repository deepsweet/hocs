# [@hocs](http://funkyimg.com/i/2wUmy.jpg)

[![ci](https://img.shields.io/travis/deepsweet/hocs/master.svg?style=flat-square)](https://travis-ci.org/deepsweet/hocs) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/hocs/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/hocs)

A collection of [Higher-Order Components](https://facebook.github.io/react/docs/higher-order-components.html) for React, especially useful with [Recompose](https://github.com/acdlite/recompose).

> A Higher-Order Component is a function that takes a component and returns a new component.

## Packages

### Universal

#### :non-potable_water: [omit-props](packages/omit-props)

Helps to omit unnecessary context, state setters or anything else you don't want to propagate with `{...spread}`.

#### :recycle: [with-lifecycle](packages/with-lifecycle)

Provides a handy way to use some of [React Component Lifecycle](https://facebook.github.io/react/docs/react-component.html) methods.

#### :hourglass: [debounce-handler](packages/debounce-handler)

Helps to debounce handlers like `onChange`.

#### :hourglass: [throttle-handler](packages/throttle-handler)

Helps to throttle handlers like `onChange`.

#### :watch: [safe-timers](packages/safe-timers)

Provides safe versions of `setTimeout`, `setInterval`, `requestAnimationFrame` and `requestIdleCallback` which will be cleared/cancelled automatically before component is unmounted.

#### :bell: [with-callback-on-change](packages/with-callback-on-change)

Invokes a callback on prop change, useful to decouple side effects like `onChange` handler in a declarative way.

#### :bell: [with-callback-on-change-while](packages/with-callback-on-change-while)

Invokes a callback on prop change while condition is true, useful to decouple side effects like `onChange` handler in a declarative way and control loops.

#### :bell: [with-callback-once](packages/with-callback-once)

Invokes a callback once condition is true (while previous check was false), useful to decouple side effects like `onSuccess` or `onError` handlers in a declarative way.

#### :mag: [with-log](packages/with-log)

Injects `console.log` with props or any custom message into render.

#### :mag: [with-debugger](packages/with-debugger)

Injects `debugger` into render.

### Browser

#### :left_right_arrow: [with-match-media-props](packages/with-match-media-props)

Dynamically map [CSS Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries) matches to boolean props using [`window.matchMedia()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) ([Can I use?](https://caniuse.com/#search=matchmedia)).

#### :left_right_arrow: [with-resize-observer-props](packages/with-resize-observer-props)

Dynamically map *component* size and position changes to props using [Resize Observer API](https://github.com/WICG/ResizeObserver) ([Can I use?](https://caniuse.com/#feat=resizeobserver) :see_no_evil:).

#### :eyes: [with-intersection-observer-props](packages/with-intersection-observer-props)

Dynamically map visibility of a component to boolean props using [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) ([Can I use?](https://caniuse.com/#feat=intersectionobserver)).

#### :see_no_evil: [with-page-visibility-props](packages/with-page-visibility-props)

Dynamically map page visibility status to props using [Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) ([Can I use?](https://caniuse.com/#feat=pagevisibility)).

#### :electric_plug: [with-online-status-props](packages/with-online-status-props)

Dynamically map online/offline status to props using [`navigator.onLine`](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine/onLine) ([Can I use?](https://caniuse.com/#feat=online-status)).

#### :no_entry: [prevent-handlers-default](packages/prevent-handlers-default)

Decouples [`e.preventDefault()`](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault) side effect from handlers like form submitting or clicking a link.

### React Native

#### :left_right_arrow: [with-view-layout-props](packages/with-view-layout-props)

Dynamically map View layout dimensions to props using [`onLayout()`](https://facebook.github.io/react-native/docs/view.html#onlayout) handler.

### …and more to come

You can [follow me on Twitter](https://twitter.com/deepsweet) for updates.

## Development

1. Create a new folder in `packages/`, let's say `with-foo`.
2. See `package.json` in already existing packages and create new `with-foo/package.json`.
3. Put source code in `with-foo/src/`, it will be transpiled and bundled into `with-foo/dist/`, `with-foo/lib/` and `with-foo/es/`.
4. Put tests written with Jest in `with-foo/test/`.
5. Put demo in `with-foo/demo/`, it will be rendered and wrapped with HMR.

Available commands using [Start](https://github.com/deepsweet/start):

```
yarn start build <package>
yarn start demo <package>
yarn start test
yarn start testWatch
yarn start lint
```
