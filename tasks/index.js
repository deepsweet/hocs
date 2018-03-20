import Task from '@start/task'
import Reporter from '@start/reporter'
import env from '@start/plugin-env'
import find from '@start/plugin-find'
import clean from '@start/plugin-clean'
import read from '@start/plugin-read'
import babel from '@start/plugin-babel'
import write from '@start/plugin-write'
import parallel from '@start/plugin-parallel'
import jest from '@start/plugin-jest'
import eslint from '@start/plugin-eslint'
import webpackServe from '@start/plugin-webpack-serve'

const reporter = Reporter()
const task = Task(reporter)

export const buildNodeCJS = (packageName) => {
  const { babelConfigNodeCJS } = require('./babel/config')

  return task(
    find(`packages/${packageName}/src/**/*.js`),
    read,
    babel(babelConfigNodeCJS),
    write(`packages/${packageName}/build/node-cjs/`)
  )
}

export const buildBrowserESM = (packageName) => {
  const { babelConfigBrowserESM } = require('./babel/config')

  return task(
    find(`packages/${packageName}/src/**/*.js`),
    read,
    babel(babelConfigBrowserESM),
    write(`packages/${packageName}/build/browser-esm/`)
  )
}

export const buildReactNative = (packageName) => {
  const { babelConfigReactNative } = require('./babel/config')

  return task(
    find(`packages/${packageName}/src/**/*.js`),
    read,
    babel(babelConfigReactNative),
    write(`packages/${packageName}/build/react-native/`)
  )
}

export const build = (packageName) => {
  const pkg = require(`../packages/${packageName}/package.json`)
  const targets = [
    pkg.main && buildNodeCJS,
    pkg.browser && buildBrowserESM,
    pkg['react-native'] && buildReactNative
  ].filter((target) => target)

  return task(
    find(`packages/${packageName}/build/`),
    clean,
    env('NODE_ENV', 'production'),
    parallel(...targets)(packageName)
  )
}

export const lint = () => task(
  find([
    'tasks/**/*.js',
    'packages/*/@(src|test|demo)/**/*.js'
  ]),
  eslint({
    cache: true,
    cacheLocation: 'node_modules/.cache/eslint'
  })
)

export const test = () => {
  const { jestConfigFull } = require('./jest/config')

  return task(
    env('NODE_ENV', 'test'),
    find('coverage/'),
    clean,
    jest(jestConfigFull)
  )
}

export const testWatch = () => {
  const { jestConfigWatch } = require('./jest/config')

  return task(
    env('NODE_ENV', 'test'),
    find('coverage/'),
    clean,
    jest(jestConfigWatch)
  )
}

export const demo = (packageName) => {
  const webpackConfig = require('./demo/config').default

  return task(
    env('NODE_ENV', 'development'),
    webpackServe({ config: webpackConfig(packageName) })
  )
}
