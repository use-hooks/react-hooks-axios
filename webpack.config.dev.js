const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './example/index.js',

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
  },

  devtool: 'inline-source-map',

  devServer: {
    contentBase: [path.join(__dirname, 'dist')],
    hot: true,
    open: true,
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'example/index.html',
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],

};
