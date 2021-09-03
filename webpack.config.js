const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const loader = new THREE.OBJLoader2();
var webpack = require('webpack');

const port = process.env.PORT || 5000;

module.exports = {
  // 개발환경
  mode: 'none',

  // 애플리케이션 시작 경로
  entry: './src/index.js',

  // 번들된 파일 경로
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname + "/build")
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
  })
  ],

  // 개발 서버 설정
  devServer: {
    historyApiFallback: true, //react-router같은 거 쓸 때 새로고침 시 cannot GET/signup 에러 뜨는 것 해결
    host: 'localhost',
    port: port,
    open: true, // open page when start
    proxy: {
      '/v2/user/me':{
        target : 'https://kapi.kakao.com',
        changeOrigin: true,
      }
    }
  },
};