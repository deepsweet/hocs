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
import codecov from '@start/plugin-lib-codecov'

export const buildNodeCJS = async (packageName) => {
  const { default: { babelConfigNodeCJS } } = await import('./babel/config')

  return sequence(
    find(`packages/${packageName}/src/**/*.js`),
    read,
    babel(babelConfigNodeCJS),
    write(`packages/${packageName}/build/node-cjs/`)
  )
}

export const buildBrowserESM = async (packageName) => {
  const { default: { babelConfigBrowserESM } } = await import('./babel/config')

  return sequence(
    find(`packages/${packageName}/src/**/*.js`),
    read,
    babel(babelConfigBrowserESM),
    write(`packages/${packageName}/build/browser-esm/`)
  )
}

export const buildReactNative = async (packageName) => {
  const { default: { babelConfigReactNative } } = await import('./babel/config')

  return sequence(
    find(`packages/${packageName}/src/**/*.js`),
    read,
    babel(babelConfigReactNative),
    write(`packages/${packageName}/build/react-native/`)
  )
}

export const build = async (packageName) => {
  const pkg = await import(`../packages/${packageName}/package.json`)
  const tasks = [
    pkg.main && 'buildNodeCJS',
    pkg.browser && 'buildBrowserESM',
    pkg['react-native'] && 'buildReactNative'
  ].filter((target) => target)

  return sequence(
    find(`packages/${packageName}/build/`),
    remove,
    env({ NODE_ENV: 'production' }),
    parallel(tasks)(packageName)
  )
}

export const lint = () =>
  sequence(
    find([
      'tasks/**/*.js',
      'packages/*/{src,test,demo}/**/*.js'
    ]),
    read,
    eslint()
  )

export const test = async () => {
  const { jestConfigFull } = await import('./jest/config')

  return sequence(
    env({ NODE_ENV: 'test' }),
    find('coverage/'),
    remove,
    jest(jestConfigFull)
  )
}

export const testWatch = async () => {
  const { jestConfigWatch } = await import('./jest/config')

  return sequence(
    env({ NODE_ENV: 'test' }),
    find('coverage/'),
    remove,
    jest(jestConfigWatch)
  )
}

export const ci = () =>
  sequence(
    lint(),
    test(),
    find('coverage/lcov.info'),
    read,
    codecov
  )

export const demo = async (packageName) => {
  const { default: webpackConfig } = await import('./demo/config')

  return sequence(
    env({ NODE_ENV: 'development' }),
    webpackServe({ config: webpackConfig(packageName) })
  )
}
