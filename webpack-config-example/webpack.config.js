const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

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
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          // 'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        include: path.resolve(__dirname, './src'), // 官方推荐使用
        test: /\.(png|jpe?g|gif|webp)$/,
        use: [
          {
            // loader: 'file-loader',
            loader: 'url-loader',
            options: {
              name: '[name]_[hash:6].[ext]',
              outputPath: 'images/',
              limit: 1024, // 不超过大小转化成base64格式，10kb都可以转化为base64
            },
          },
          // 图片压缩
          // {
          //   loader: 'image-webpack-loader',
          //   options: {
          //     mozjpeg: {
          //       progressive: true,
          //       quality: 65,
          //     },
          //     // optipng.enabled: false will disable optipng
          //     optipng: {
          //       enabled: false,
          //     },
          //     pngquant: {
          //       quality: [0.65, 0.9],
          //       speed: 4,
          //     },
          //     gifsicle: {
          //       interlaced: false,
          //     },
          //     // the webp option will enable WEBP
          //     webp: {
          //       quality: 75,
          //     },
          //   },
          // },
        ],
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
      minify: {
        // 压缩HTML⽂件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空⽩符与换⾏符
        minifyCSS: true, // 压缩内联css
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
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
