/**
 * Dependencies
 */

const watch = process.env.WATCH ? process.env.WATCH : false;
const webpack = require('webpack');
const path = require('path');
/**
 * Input/Output file paths
 */
var extEntryFilePath = './index';
var outputFileName = '[name].min.js';
var sourceMapOutputFileName = '[name].map';

module.exports = {
  watch: watch,
  mode: 'development',
  watchOptions: {
    aggregateTimeout: 300,
    ignored: /node_modules/
  },
  entry:        {
    app: extEntryFilePath
  },
  devtool:      'source-map',
  output:       {
    path:              __dirname,
    filename:          outputFileName,
    sourceMapFilename: sourceMapOutputFileName
  },
  resolve:      {
    extensions: ['.js', '.ts', '.json', '.html'],
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  externals:    {
    "jquery": "jQuery"
  },
  module:       {
    rules: [
      {
        test:    /\.ts/,
        exclude: /node_modules\/(?!phusion|vue).*/,
        loaders: ['ts-loader']
      }
    ]
  }
};
