/**
 * Created by mak on 6/25/16.
 */
module.exports = {
  entry: {
    app: './src/app.babel.js'
  },
  output: {
    path: './dist',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.babel.js', '.es6']
  },
  module: {
    loaders: [
      {
        test: /\.(babel.js|es6)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['babel-preset-es2015']
        }
      }
    ]
  }
};
