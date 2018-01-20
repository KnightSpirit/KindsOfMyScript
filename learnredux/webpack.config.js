const webpack = require('webpack');
const path = require('path');
const htmlPlugin = require('html-webpack-plugin');
module.exports = {
  entry: {
    app: './src/app.tsx',
    vendor: ['react', 'react-dom', 'redux']
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new htmlPlugin({
      title: 'App',
      template: './src/html/index.html'
    })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.less$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader", // translates CSS into CommonJS
            options: {
              modules: true
            }
        }, {
            loader: "less-loader" // compiles Less to CSS
        }]
      }
    ]
  }
}