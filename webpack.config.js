require('dotenv').config();

const webpack = require('webpack');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const mode = isProduction ? 'production' : 'development';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESS_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const plugins = [
  new webpack.DefinePlugin({
    FIREBASE_CONFIG: JSON.stringify(firebaseConfig),
  }),
  new HtmlWebpackPlugin({
    inject: false,
    templateContent: ({ htmlWebpackPlugin }) => `
    <html>
      <head>
        <title>Online Quiz</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        ${htmlWebpackPlugin.tags.headTags}
      </head>
      <body>
        <div id="root"></div>
        ${htmlWebpackPlugin.tags.bodyTags}
      </body>
    </html>
  `,
  }),
];
if (isProduction) {
  plugins.push(
    new TerserPlugin({
      cache: true,
      parallel: true,
    })
  );
}

module.exports = {
  mode,
  plugins,
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 9000,
    historyApiFallback: true,
  },
  entry: {
    app: './src/index.js',
  },
  output: {
    filename: '[name]-bundle.js',
    publicPath: '/',
    path: path.resolve(__dirname, 'public'),
  },
  devtool: isProduction ? false : 'source-map',
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: __dirname,
      },
      {
        test: /\.(png|eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
        loader: 'url-loader',
      },
    ],
  },
};
