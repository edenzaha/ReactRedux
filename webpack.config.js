'use strict';
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = 
{
  devtool: 'eval-source-map',
  entry: {
    redux: ['webpack-hot-middleware/client?reload=true', path.join(__dirname, 'app/static/redux.js')],
    reduxMiddleware: ['webpack-hot-middleware/client?reload=true', path.join(__dirname, 'app/static/reduxMiddleware.js')],
    reduxAsyncAction: ['webpack-hot-middleware/client?reload=true', path.join(__dirname, 'app/static/reduxAsyncAction.js')],
    reduxAsyncPromise: ['webpack-hot-middleware/client?reload=true', path.join(__dirname, 'app/static/reduxAsyncPromise.js')],    
    reactReduxClient : ['webpack-hot-middleware/client?reload=true', path.join(__dirname, 'app/static/reactReduxClient.js')],    
    main: path.join(__dirname, 'app/main.js')
  },
  output: {
    path: path.join(__dirname, '/dist/'),    
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/html/index.tpl.html',
      inject: false,
      filename: 'index.html'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })  
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        "presets": ["react", "es2015", "stage-0", "react-hmre"]
      }
    }, 
    {
      test: /\.js$/,
      loader: 'babel',
      query: {
        "presets": ["react", "es2015", "stage-0", "react-hmre"]
      }
    },    
    {
      test: /\.json?$/,
      loader: 'json'
    }, {
      test: /\.css$/,
      loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]'
    }]
  }
};
