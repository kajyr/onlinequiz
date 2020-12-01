require('dotenv').config();

const webpack = require('webpack');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const mode = isProduction ? 'production' : 'development';

const firebaseConfigKeys = [
  'FIREBASE_API_KEY',
  'FIREBASE_AUTH_DOMAIN',
  'FIREBASE_DATABASE_URL',
  'FIREBASE_PROJECT_ID',
  'FIREBASE_STORAGE_BUCKET',
  'FIREBASE_MESS_SENDER_ID',
  'FIREBASE_APP_ID',
  'FIREBASE_MEASUREMENT_ID',
];

const firebaseConfig = {};
for (const key of firebaseConfigKeys) {
  firebaseConfig[key] = process.env[key];
}

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
  },
  entry: {
    app: './src/index.js',
  },
  output: {
    filename: '[name]-bundle.js',
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
