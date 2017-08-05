# @hocs

[![ci](https://img.shields.io/travis/deepsweet/hocs/master.svg?style=flat-square)](https://travis-ci.org/deepsweet/hocs) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/hocs/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/hocs)

A collection of [Higher-Order Components](https://facebook.github.io/react/docs/higher-order-components.html) for React, especially useful with [Recompose](https://github.com/acdlite/recompose).

> A Higher-Order Component is a function that takes a component and returns a new component.

## Packages

### :non-potable_water: [omit-props](packages/omit-props)

Helps to omit unnecessary context prop, state setters or anything else you don't want to propagate and `{...spread}` to Component.

### :recycle: [with-lifecycle](packages/with-lifecycle)

Provides a handy way to use some of [React Component Lifecycle](https://facebook.github.io/react/docs/react-component.html) methods.

### :left_right_arrow: [with-match-media-props](packages/with-match-media-props)

Dynamically map [CSS Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries) matches to boolean props using `window.matchMedia()` ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia), [Can I use](https://caniuse.com/#search=matchmedia)).

### :hourglass: [debounce-handler](packages/debounce-handler)

Helps to debounce handlers like `onChange`.

### :hourglass: [throttle-handler](packages/throttle-handler)

Helps to throttle handlers like `onChange`.

### …and more to come

You can [follow me on Twitter](https://twitter.com/deepsweet) for updates.

## Development

1. Create a new folder in `packages/`, let's say `with-foo`.
2. See `package.json` in already existing packages and create new `with-foo/package.json`.
3. Put source code in `with-foo/src/`, it will be transpiled and bundled into `with-foo/dist/`, `with-foo/lib/` and `with-foo/es/`.
4. Put tests written with Jest in `with-foo/test/`.
5. Put demo in `with-foo/demo/`, it will be rendered and wrapped with HMR.

Available scripts using [Start](https://github.com/start-runner/start):

```
yarn start build <package>
yarn start demo <package>
yarn start test
yarn start testWatch
yarn start lint
```
