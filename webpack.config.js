const path = require('path');
const GlobalizePlugin = require( "globalize-webpack-plugin" );
const TerserPlugin = require('terser-webpack-plugin');

var production = (process.env.NODE_ENV === "production");

module.exports = {
    entry: {
        mainPage: './src/mainPage.jsx'
    },
    output: {
        path: path.join(__dirname, 'public'),
        filename: '[name].js',
        publicPath: '/public/'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
                cacheDirectory: true,
                presets: ['@babel/preset-react', '@babel/preset-env']
            }
          }
       },
       {
          test: /\.css$/i,
          use: [ 
              { loader: 'style-loader' }, 
              { loader: 'css-loader' } 
          ]
       },
       {
          test: /\.(gif|ttf|eot|svg|woff2?)$/,
          use: {
            loader: 'url-loader',
            options: {
               name: '[name].[ext]'
            }
          }
       }       
      ]
    },
    plugins: [
		new GlobalizePlugin({
			production: production,
			developmentLocale: "en",
			supportedLocales: [ "de", "en", "es", "fr", "fi" ],
			messages: "messages/[locale].json",
			output: "i18n/[locale].[chunkhash].js"
		})
    ],
    optimization: {
        minimize: production,
        minimizer: [
          new TerserPlugin({
            cache: true,
            parallel: true,
            sourceMap: true
          }),
        ],
      }
  };
