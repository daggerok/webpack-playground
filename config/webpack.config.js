const { resolve } = require('path');
const pathTo = rel => resolve(process.cwd(), rel);
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { NamedModulesPlugin } = require('webpack');
const { version } = require('../package.json');

module.exports = env => ({
  entry: {
    app: './src/main.js',
  },
  output: {
    path: pathTo('./dist'),
    // publicPath: '/',
    filename: `[name].js?v=${version}`,
    sourceMapFilename: `[file].map?v=${version}`,
    chunkFilename: `[id].chunk.js?v=${version}`,
    jsonpFunction: 'w',
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        use: [
          'babel-loader',
        ],
        include: pathTo('./src'),
      },
      {
        test: /\.css/i,
        use: [
          'style-loader',
          'css-loader?modules',
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new NamedModulesPlugin(),
  ],
  resolve: {
    extensions: [
      '.js',
    ],
    modules: [
      pathTo('./src'),
      'node_modules',
    ],
  },
  devServer: 'production' != env ? {
    contentBase: pathTo('./src'),
  } : {},
});
