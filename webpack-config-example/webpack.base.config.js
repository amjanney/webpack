// 基础配置
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name]_[hash:8].js',
  },
  resolve: {
    modules: [path.resolve(__dirname, './node_modules')],
    alias: {
      '@src': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/images'),
    },
    extensions: ['.js', 'json', '. jsx'],
  },
  module: {
    rules: [
      {
        include: path.resolve(__dirname, './src'), // 官方推荐使用
        test: /\.(eot|ttf|woff|woff2|svg)$/,
        use: {
          // loader: 'file-loader',
          loader: 'url-loader',
          options: {
            name: '[name]_[hash:6].[ext]',
            outputPath: 'iconfont/',
            limit: 1024, // 不超过大小转化成base64格式，10kb都可以转化为base64
          },
        },
      },
      {
        include: path.resolve(__dirname, './src'), // 官方推荐使用
        test: /\.js$/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
};
