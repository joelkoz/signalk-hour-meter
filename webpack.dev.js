const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {

       mode: 'development',

       devtool: 'inline-source-map',

       devServer: {
            contentBase: './public',
            publicPath: '/',
            watchContentBase: true,
            hot: true,
            compress: true,
            port: 3000,
            host: '0.0.0.0',
            index: 'index.html',
            disableHostCheck: true,
            progress: true,
            stats: {
               children: false,
               maxModules: 0
            },
            watchOptions: {
               aggregateTimeout: 5000
            }
      },
      
      optimization: {
        minimize: false,
      }
});
