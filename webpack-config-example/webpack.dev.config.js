// 开发环境配置
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');

const webpack = require('webpack');
const merge = require('webpack-merge');

const baseConfig = require('./webpack.base.config.js');

const devConfig = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name]_[hash:8].js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.less$/,
        include: path.resolve(__dirname, './src'), // 官方推荐使用
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
      },
      {
        include: path.resolve(__dirname, './src'), // 官方推荐使用
        test: /\.(png|jpe?g|gif|webp)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]_[hash:6].[ext]',
              outputPath: 'images/',
              limit: 1024, // 不超过大小转化成base64格式，10kb都可以转化为base64
            },
          },
        ],
      },
    ],
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    port: 8082,
    open: true,
    hot: true,
    hotOnly: true, // 关闭浏览器自动刷新
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new htmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

module.exports = merge(baseConfig, devConfig);
