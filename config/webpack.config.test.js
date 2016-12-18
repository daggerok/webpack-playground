const { resolve } = require('path');

module.exports = function(env) {
  return {
    entry: {
      vendors: './src/vendors.js',
      app: './src/main.js',
    },
    output: {
      path: resolve('./dist'),
      filename: 'test.bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.js$/i,
          loader: 'babel-loader',
          include: resolve('./src'),
          exclude: /(node_modules|bower_components)/,
        },

        {
          test: /\.(styl|css)$/i,
          loaders: [
            'style-loader',
            'css-loader',
            'postcss-loader',
            'stylus-loader',
          ],
        },
      ],
    },
  };
};
