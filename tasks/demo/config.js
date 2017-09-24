import path from 'path'
import webpack from 'webpack'
import HTMLWebpackPlugin from 'html-webpack-plugin'

import { babelConfigBrowserESM } from '../babel/config'

export default (packageName) => ({
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    path.resolve('tasks/demo/index.js')
  ],
  output: {
    publicPath: '/',
    pathinfo: true
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
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
})
