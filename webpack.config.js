const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';
    const config = {
      mode: isProduction ? 'production' : 'development',
      watch: !isProduction,
      entry: './src/index.js',
      output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index.js',
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
            test: /\.(png|jpeg|jpg|ttf|woff)$/,
            use: [
              {
                loader: 'file-loader',
              },
            ],
          },
          {
            test: /\.html$/i,
            loader: 'html-loader',
          },
        ]
      },
      plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          template: 'index.html'
        }),
        new MiniCssExtractPlugin({
          filename: 'style.css'
        }),
  
      ]
    }
    return config;
  }