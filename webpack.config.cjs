const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

// eslint-disable-next-line no-unused-vars
module.exports = (_, { mode }) => ({
  entry: './src/client/index.js',
  output: {
    filename: `[name].[hash].bundle.js`,
    chunkFilename: `[name].[chunkhash].chunk.js`,
    sourceMapFilename: '../maps/js/[filebase].map',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
  },
  resolve: {
    alias: {
      ...(mode === 'development' && {
        'react-dom': '@hot-loader/react-dom',
      }),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    contentBase: './public',
    host: '0.0.0.0',
    port: 8085,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8086',
      },
      '/wsapi': {
        target: 'http://localhost:8086',
        ws: true,
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/client/index.html',
      filename: 'index.html',
    }),
  ],
});
