'use strict';
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = 
{
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
     path.join(__dirname, 'app/js/client.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),    
    filename: 'client.js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/html/index.tpl.html',
      inject: "body",
      filename: 'index.html'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })  
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        "presets": ["react", "es2015", "stage-0", "react-hmre"],
         plugins: ["transform-decorators-legacy"]
      }
    }, 
    {
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        "presets": ["react", "es2015", "stage-0", "react-hmre"],
         plugins: ["transform-decorators-legacy"]
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
