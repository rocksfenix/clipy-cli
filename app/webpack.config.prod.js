const webpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const baseConfig = require('./webpack.config.base.js')

const env = process.env.NODE_ENV != 'production'
  ? 'development' : 'production'

module.exports = webpackMerge(baseConfig, {
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      // Embed all javascript and css inline
      inlineSource: '.(js|css)$', 
      template: 'index.ejs',
      templateParameters: {
        'env': env
      }
    }),
    new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin)
  ],

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  }
})