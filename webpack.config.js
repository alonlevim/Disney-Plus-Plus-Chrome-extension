const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const path = require("path");
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = (env, argv) => ({
   mode: 'production',

   devtool: 'source-map',

   entry: {
      serviceWorker: './src/background/index.ts',
      contentScripts: './src/contentScripts/index.ts',
   },

   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      clean: true,
   },

   resolve: {
      extensions: ['.ts', '.js']
   },

   module: {
      rules: [{
         test: /\.tsx?$/,
         use: 'ts-loader',
         exclude: /node_modules/,
      }],
   },

   plugins: [
      new ESLintPlugin({
         overrideConfigFile: path.resolve(__dirname, '.eslintrc.json')
      }),
      new CopyPlugin({
         patterns: [{
            from: ".",
            to: ".",
            context: "public"
         }]
      }),
      new Dotenv({
         path: `./src/${argv.mode}.env`
      }),
   ],

   watch: false,

   watchOptions: {
      poll: true,
      ignored: /node_modules/

   }
});