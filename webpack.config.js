const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';
    const config = {
      mode: isProduction ? 'production' : 'development',
      watch: !isProduction,
      entry: {
        index: './src/index.js',
        boxes: './src/boxes.js',
        boxes: './src/timeline.js',
        boxes: './src/player.js',
      },
      output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        publicPath: '',
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          },
          {
            test: /\.css$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
              },
              {
                loader: "css-loader",
              },
            ]
          },
          {
            test: /\.(png|jpeg|jpg|ttf|woff|mp3)$/,
            use: [
              {
                loader: 'file-loader',
              },
            ],
          },
          {
            test: /\.html$/i,
            loader: 'html-loader',
          }
        ]
      },
      plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          template: 'index.html'
        }),
        new HtmlWebpackPlugin({
          template: 'boxes.html',
          filename: 'boxes.html'
        }),
        new HtmlWebpackPlugin({
          template: 'timeline.html',
          filename: 'timeline.html'
        }),
        new HtmlWebpackPlugin({
          template: 'player.html',
          filename: 'player.html'
        }),
        new MiniCssExtractPlugin({
          filename: '[name].css'
        })
      ]
    }
    return config;
  }