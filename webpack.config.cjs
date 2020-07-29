const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

// eslint-disable-next-line no-unused-vars
module.exports = (_, { mode }) => {
  process.env.NODE_ENV = mode;

  return {
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
        {
          test: /\.sass|scss|css$/,
          use: [
            {
              // use style-loader so hmr works with sass imports
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: {
                  exportLocalsConvention: 'camelCaseOnly',
                  localIdentName: '[name]__[local]--[hash:base64:5]',
                },
                esModule: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  // eslint-disable-next-line global-require
                  require('autoprefixer')({
                    cascade: false,
                    env: mode,
                  }),
                ],
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
      ],
    },
    devtool: mode === 'development' ? 'eval-source-map' : 'source-map',
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
  };
};
