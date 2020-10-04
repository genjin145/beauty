const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devServer: {overlay: true},
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({filename: 'css/style.css'}),
    new HtmlWebpackPlugin({template: './src/html/index.html'}),
    new HtmlWebpackPlugin({template: './src/html/404.html', filename: '404.html'}),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {from: './src/img', to: 'img'},
      ],
    }),
    new ImageminPlugin({
      pngquant: ({quality: 75}),
      plugins: [
        imageminMozjpeg({quality: 75, progressive: true})
      ]
    })
  ]
};