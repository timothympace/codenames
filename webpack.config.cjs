const HtmlWebpackPlugin = require('html-webpack-plugin');

// eslint-disable-next-line no-unused-vars
module.exports = (_, { mode }) => ({
  entry: './src/client/index.js',
  output: {
    filename: `[name].[hash].bundle.js`,
    chunkFilename: `[name].[chunkhash].chunk.js`,
    sourceMapFilename: '../maps/js/[filebase].map',
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
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
  ],
});
