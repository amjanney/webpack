const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  // entry: ['./src/a.js', './src/b.js'],
  // entry: {
  //   build: './src/index.js',
  //   a: './src/a.js',
  //   b: './src/b.js',
  // },
  output: {
    path: path.resolve(__dirname, './build'),
    // filename: '[name][chunkhash:8].js',
    filename: 'build.js',
  },
  mode: 'production',
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
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
