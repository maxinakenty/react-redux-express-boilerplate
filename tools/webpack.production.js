const { DefinePlugin } = require('webpack');
const AssetsWebpackPlugin = require('assets-webpack-plugin');
const { cssModulesHash } = require('../package.json');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { PATH } = require('./constants');

module.exports = {
  mode: 'production',
  entry: {
    bundle: `${PATH.src}/index`,
  },
  output: {
    path: PATH.public,
    publicPath: '/',
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
  },
  performance: {
    hints: false,
  },
  watch: false,
  devtool: false,
  plugins: [
    new DefinePlugin({
      NODE_ENV: JSON.stringify('production'),
    }),
    new AssetsWebpackPlugin({
      filename: 'assets.json',
      path: PATH.public,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/common.[contenthash].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
              modules: true,
              importLoaders: 2,
              localIdentName: cssModulesHash,
              minimize: true,
            },
          },
          'resolve-url-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: false,
              config: {
                path: PATH.postcssConfig,
              },
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
              modules: false,
              importLoaders: 2,
              localIdentName: cssModulesHash,
              minimize: true,
            },
          },
          'resolve-url-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: false,
              config: {
                path: PATH.postcssConfig,
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false,
              modules: true,
              importLoaders: 2,
              localIdentName: cssModulesHash,
              minimize: true,
            },
          },
        ],
      },
    ],
  },
};
