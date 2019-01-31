const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const env = process.env.NODE_ENV != 'production'
  ? 'development' : 'production'

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.ejs',
      templateParameters: {
        'env': env
      }
    })
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }

}