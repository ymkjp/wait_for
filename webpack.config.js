// https://github.com/samuelsimoes/chrome-extension-webpack-boilerplate
var _ = require("lodash"),
  webpack = require("webpack"),
  path = require("path"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  GenerateJsonPlugin = require('generate-json-webpack-plugin'),
  WriteFilePlugin = require("write-file-webpack-plugin"),
  WebpackCleanupPlugin = require('webpack-cleanup-plugin');
  manifest = require("./src/manifest.json")
;

module.exports = {
  entry: {
    app: path.join(__dirname, "src", "js", "app.js"),
    popup: path.join(__dirname, "src", "js", "popup.js"),
    options: path.join(__dirname, "src", "js", "options.js"),
    background: path.join(__dirname, "src", "js", "background.js")
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ]
  },
  resolve: {
    alias: {}
  },
  devtool: 'source-map',
  plugins: [
    new WebpackCleanupPlugin(),
    new GenerateJsonPlugin('manifest.json', _.merge({
      version: process.env.npm_package_version,
      description: process.env.npm_package_description,
      author: process.env.npm_package_author,
      homepage_url: process.env.npm_package_homepage
    }, manifest)),
    // expose and write the allowed env vars on the compiled bundle
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "", "popup.html"),
      filename: "popup.html",
      chunks: ["popup"]
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "options.html"),
      filename: "options.html",
      chunks: ["options"]
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "background.html"),
      filename: "background.html",
      chunks: ["background"]
    }),
    new WriteFilePlugin()
  ]
};
