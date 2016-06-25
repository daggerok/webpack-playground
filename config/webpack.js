/**
 * Created by mak on 6/25/16.
 */
module.exports = {
  entry: {
    app: './src/app.coffee'
  },
  output: {
    path: './dist',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.coffee']
  },
  module: {
    loaders: [
      {
        test: /\.coffee$/,
        exclude: /(node_modules)/,
        loader: 'coffee-loader'
      }
    ]
  }
};
