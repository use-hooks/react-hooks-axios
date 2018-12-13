const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
  const isExample = env === 'example';
  const isBuild = env === 'build';
  const isDev = !env;

  return {
    mode: isBuild ? 'production' : 'development',
    entry: isBuild ? './src' : './example',

    output: {
      path: path.join(__dirname, isExample ? '__site__' : 'dist'),
      filename: 'index.js',
      libraryTarget: 'umd',
    },

    devtool: isDev && 'inline-source-map',

    devServer: {
      contentBase: [path.join(__dirname, 'dist')],
      hot: true,
      open: true,
    },

    externals: isBuild ? {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
        umd: 'react',
      },
    } : {},

    resolve: {
      extensions: ['.js', '.jsx', '.json'],
    },

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
      ],
    },

    plugins: [
      !isBuild && new HtmlWebpackPlugin({
        template: 'example/index.html',
      }),
      isDev && new webpack.NamedModulesPlugin(),
      isDev && new webpack.HotModuleReplacementPlugin(),
    ].filter(Boolean),
  };
};
