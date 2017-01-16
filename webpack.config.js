var debug = process.env.NODE_ENV !== 'production';
var webpack = require('webpack');
var path = require('path');

module.exports = {
  quiet: false,
  context: path.join(__dirname, 'src'),
  devtool: debug ? 'inline-sourcemap' : null,
  // entry: './js/client.js',
  entry: './app.js',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  },
  output: {
    path: __dirname + '/src',
    filename: 'bundle.min.js'

  },

  plugins: debug ? [] : [
    new webpack.HotModuleReplacementPlugin()
  ],
};
