import sequence from '@start/plugin-sequence'
import parallel from '@start/plugin-parallel'
import env from '@start/plugin-env'
import find from '@start/plugin-find'
import remove from '@start/plugin-remove'
import read from '@start/plugin-read'
import babel from '@start/plugin-lib-babel'
import write from '@start/plugin-write'
import eslint from '@start/plugin-lib-eslint'
import jest from '@start/plugin-lib-jest'
import webpackServe from '@start/plugin-lib-webpack-serve'

import {
  babelConfigNodeCJS,
  babelConfigBrowserESM,
  babelConfigReactNative
} from './babel/config'
import {
  jestConfigFull,
  jestConfigWatch
} from './jest/config'

export const buildNodeCJS = (packageName) =>
  sequence(
    find(`packages/${packageName}/src/**/*.js`),
    read,
    babel(babelConfigNodeCJS),
    write(`packages/${packageName}/build/node-cjs/`)
  )

export const buildBrowserESM = (packageName) =>
  sequence(
    find(`packages/${packageName}/src/**/*.js`),
    read,
    babel(babelConfigBrowserESM),
    write(`packages/${packageName}/build/browser-esm/`)
  )

export const buildReactNative = (packageName) =>
  sequence(
    find(`packages/${packageName}/src/**/*.js`),
    read,
    babel(babelConfigReactNative),
    write(`packages/${packageName}/build/react-native/`)
  )

export const build = (packageName) => {
  const pkg = require(`../packages/${packageName}/package.json`)
  const tasks = [
    pkg.main && 'buildNodeCJS',
    pkg.browser && 'buildBrowserESM'
    // pkg['react-native'] && 'buildReactNative'
  ].filter((target) => target)

  return sequence(
    find(`packages/${packageName}/build/`),
    remove,
    env('NODE_ENV', 'production'),
    parallel(tasks)(packageName)
  )
}

export const lint = () =>
  sequence(
    find([
      'tasks/**/*.js',
      'packages/*/@(src|test|demo)/**/*.js'
    ]),
    eslint()
  )

export const test = () =>
  sequence(
    env('NODE_ENV', 'test'),
    find('coverage/'),
    remove,
    jest(jestConfigFull)
  )

export const testWatch = () =>
  sequence(
    env('NODE_ENV', 'test'),
    find('coverage/'),
    remove,
    jest(jestConfigWatch)
  )

export const demo = (packageName) => {
  const webpackConfig = require('./demo/config').default

  return sequence(
    env('NODE_ENV', 'development'),
    webpackServe({ config: webpackConfig(packageName) })
  )
}
