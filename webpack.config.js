var webpack = require('webpack')
var path = require('path')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  entry: {
    app: ['./app/js/app.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.min.js',
    sourceMapFilename: 'bundle.map.js',
  },
  module: {
    loaders: [
      { test: /\.js?$/, loaders: ['babel'], exclude: /node_modules/ },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      { test: /\.txt$/, loader: 'raw-loader' },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'app/css/global.css' },
      { from: 'app/index.html' },
    ]),
    new HtmlWebpackPlugin({
      template: 'app/index.html',
    }),
    /*
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
    */
  ],
}
