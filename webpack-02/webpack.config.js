const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name]_[hash:8].js',
    // cdn地址,自动关联到html
    // publicPath: 'https://test.com/test',
  },
  mode: 'production',
  devtool: 'source-map',
  resolve: {
    modules: [path.resolve(__dirname, './node_modules')],
    alias: {
      '@src': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/images'),
    },
    extensions: ['.js', 'json'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        include: path.resolve(__dirname, './src'), // 官方推荐使用
        // exclude: path.resolve(__dirname, './node_modules'),
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        include: path.resolve(__dirname, './src'), // 官方推荐使用
        test: /\.(png|jpe?g|gif|webp)$/,
        use: {
          // loader: 'file-loader',
          loader: 'url-loader',
          options: {
            name: '[name]_[hash:6].[ext]',
            outputPath: 'images/',
            limit: 1024, // 不超过大小转化成base64格式，10kb都可以转化为base64
          },
        },
      },
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
        // exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  devServer: {
    contentBase: './dist',
    port: 8081,
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
    new MiniCssExtractPlugin({
      filename: 'css/[name]_[hash:6].css',
    }),
  ],
};
