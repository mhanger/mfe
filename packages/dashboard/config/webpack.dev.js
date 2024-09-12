const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:8083/',
  },
  devServer: {
    port: 8083,
    historyApiFallback: {
      historyApiFallback: true,
    },
    headers: {
      'Access-Control-Allow-Origin': "*"
    }
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.(png|jpg|gif)$/i,
  //       type: 'asset/resource',
  //       generator: {
  //         filename: 'dashboard/latest/assets/[name][ext]',  // Specify the output folder as 'assets'
  //       },
  //     },
  //   ],
  // },
  plugins: [
    new ModuleFederationPlugin({
      name: 'dashboard',
      filename: 'remoteEntry.js',
      exposes: {
        './DashboardApp': './src/bootstrap'
      },
      shared: packageJson.dependencies,

    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);

