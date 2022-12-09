const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const path = require('path')

const devServer = {
  port: 3456,
  host: '0.0.0.0',
  watchContentBase: true,
  inline: true,
  stats: 'errors-only',
  historyApiFallback: true,
  hot: true,
  contentBase: path.join(__dirname, '../public'),
  compress: true,
  clientLogLevel: 'warning',
  headers: { 'Access-Control-Allow-Origin': '*' },
  // open: true,
  watchOptions: {
    ignored: /node_modules/,
  },
}

const devConfig = {
  mode: 'development',
  devServer: devServer,
  devtool: 'source-map'
}

module.exports = webpackMerge.merge(baseConfig, devConfig)


