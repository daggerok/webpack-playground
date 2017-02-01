import entry from './config/entry.babel';
import output from './config/output.babel';
import module from './config/module.babel';
import plugins from './config/plugins.babel';
import resolve from './config/resolve.babel';
import devtool from './config/devtool.babel';
import devServer from './config/webpack-dev-server.babel';
import node from './config/node.babel';

export default env => ({
  entry,
  output,
  module,
  plugins: plugins(env),
  resolve,
  devServer,
  bail: true,
  cache: true,
  target: 'web',
  devtool: devtool(env),
  node,
});
