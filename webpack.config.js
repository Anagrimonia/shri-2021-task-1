const path = require('path');

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');

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
                   { from: 'src/assets', to: 'assets'}],
      }),
      new MiniCssExtractPlugin({
        filename: "stories.css"
      })
    ],
    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader"
          ]
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader", // Translates CSS into CommonJS
            "sass-loader", // Compiles Sass to CSS
          ],
      },
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