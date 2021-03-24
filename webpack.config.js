const path = require('path');

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = (env) => {

  const mode = env.development ? 'development' : 'production';
  //const devtool = mode === 'development' ? 'inline-source-map' : 'source-map';

  return {
    mode,
    entry: [
      './src/stories.ts',
      './src/stories.scss'
    ],
    devServer: {
      contentBase: './build',
      hot: true,
    },
    plugins: [
      new HtmlWebpackPlugin({ 
        filename: 'index.html', 
        chunks: ['index'], 
        template: 'src/index.html',
        title: "SHRI Task 1: Stories",
       }),
      new CopyPlugin({
        patterns: [{ from: 'src/data/data.json', to: "data.json" },
                   { from: 'src/assets/images',  to: "assets/images" }]
      }),
      new MiniCssExtractPlugin({
        filename: "stories.css"
      }),
      new ForkTsCheckerWebpackPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.ts?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options:{
            // disable type checker - we will use it in fork plugin
            transpileOnly: true 
          }
        },
        {
          test: /\.css$/,
          include: path.resolve(__dirname, 'src/normalize.css'),
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader"
          ]
        },
        {
          test: /\.ttf$/,
          use: {
            loader: 'url-loader',
            options: {
                limit: 25000,
                name: "assets/fonts/[name].[ext]"
             }
          }
        },
        {
          test: /\.s[ac]ss$/i,
          include: path.resolve(__dirname, 'src/stories.scss'),
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader", // Compiles Sass to CSS
          ],
        },
        {
           test: /\.svg$/,
           loader: 'svg-url-loader',
           options: {
           }
        }
      ],
    },
    resolve: {
      extensions: [ '.ts', '.js' ],
    },
    output: {
      filename: 'stories.js',
      path: path.resolve(__dirname, 'build'),
    }
  }
};