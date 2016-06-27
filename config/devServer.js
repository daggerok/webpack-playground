/**
 * Created by mak on 6/25/16.
 */
module.exports = {
  inline: true,
  contentBase: './',
  port: 3000,
  options: {
    watchOptions: 100
  },
  proxy: {
    "/api/*": {
      "target": {
        "host": "localhost",
        "protocol": "http:",
        "port": 8080
      },
      ignorePath: true,
      changeOrigin: true,
      secure: false
    }
  },
  stats: 'minimal'
};
