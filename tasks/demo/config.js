import path from 'path'
import HTMLWebpackPlugin from 'html-webpack-plugin'

import { babelConfigBrowserESM } from '../babel/config'

export default (packageName) => ({
  mode: 'development',
  entry: path.resolve('tasks/demo/index.js'),
  output: {
    publicPath: '/',
  },
  devtool: 'cheap-module-source-map',
  resolve: {
    extensions: [ '.js', '.jsx' ],
    modules: [
      'node_modules/',
      path.resolve(`packages/${packageName}/node_modules/`)
    ],
    alias: {
      '~': path.resolve(`packages/${packageName}/`)
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /\/node_modules\//,
        use: [
          {
            loader: 'babel-loader',
            options: {
              ...babelConfigBrowserESM,
              plugins: [
                ...babelConfigBrowserESM.plugins,
                'react-hot-loader/babel'
              ],
              cacheDirectory: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: packageName,
      template: require.resolve('./index.ejs')
    })
  ]
})
