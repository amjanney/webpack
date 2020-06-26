const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'build.js',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
      },
      {
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
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new htmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
  ],
}
