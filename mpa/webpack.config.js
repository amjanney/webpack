const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const glob = require('glob')
const setMPA = () => {
  const entry = {}
  const htmlwebpackplugins = []
  const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'))
  entryFiles.map((item, index) => {
    const entryFile = entryFiles[index]
    const match = entryFile.match(/src\/(.*)\/index\.js$/)
    const pageName = match && match[1]
    entry[pageName] = entryFile
    htmlwebpackplugins.push(
      new htmlWebpackPlugin({
        template: path.join(__dirname, `./src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: [pageName],
      })
    )
  })
  return {
    entry,
    htmlwebpackplugins,
  }
}

const { entry, htmlwebpackplugins } = setMPA()

module.exports = {
  entry,
  mode: 'production',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name]_[hash:6].js',
  },
  module: {},
  plugins: [...htmlwebpackplugins, new CleanWebpackPlugin()],
}
