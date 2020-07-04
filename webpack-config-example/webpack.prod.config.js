// 生产环境配置
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');

const prodConfig = {
  mode: 'production',
  output: {
    // cdn地址,自动关联到html
    path: path.resolve(__dirname, './build'),
    publicPath: 'https://cdn.test.com/assets',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        include: path.resolve(__dirname, './src'), // 官方推荐使用
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        include: path.resolve(__dirname, './src'), // 官方推荐使用
        test: /\.(png|jpe?g|gif|webp)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: {
        // 压缩HTML⽂件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空⽩符与换⾏符
        minifyCSS: true, // 压缩内联css
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name]_[contenthash:6].css',
    }),
    new OptimizeCSSAssetsPlugin({
      cssProcessor: require('cssnano'), //引⼊cssnano配置压缩选项
      cssProcessorOptions: {
        discardComments: { removeAll: true },
      },
    }),
  ],
};
module.exports = merge(baseConfig, prodConfig);
