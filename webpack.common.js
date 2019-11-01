const path = require('path');
const GlobalizePlugin = require( "globalize-webpack-plugin" );
const TerserPlugin = require('terser-webpack-plugin');

console.log(`Webpack process.env.NODE_ENV is ${process.env.NODE_ENV}`)

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
			production: false && (process.env.NODE_ENV === "production"),
			developmentLocale: "en",
			supportedLocales: [ "de", "en", "es", "fr", "fi" ],
			messages: "messages/[locale].json",
      output: "public/i18n_[locale]_[chunkhash].js",
		})
    ],
    optimization: {
        minimizer: [
          new TerserPlugin({
            cache: true,
            parallel: true,
            sourceMap: true
          }),
        ],
      },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [path.resolve(__dirname, 'src'), 'node_modules', 'node_modules/globalize/dist'],
    }
  };
