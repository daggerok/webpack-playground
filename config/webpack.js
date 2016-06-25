/**
 * Created by mak on 6/25/16.
 */
module.exports = {
  entry: {
    app: './src/app.js'
  },
  output: {
    path: './dist',
    filename: '[name].js'
  },
  resolve: {
    extensions: [ '', '.js' ]
  }
};
