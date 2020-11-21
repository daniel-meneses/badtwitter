const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const webpack = require('webpack');
const BrotliPlugin = require('brotli-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackChangeAssetsExtensionPlugin = require('html-webpack-change-assets-extension-plugin')

const { NODE_ENV } = process.env

module.exports = eve => {

  const root = path.resolve(__dirname, '..');
  const dist = path.resolve(root, 'dist');
  const src = path.resolve(root, 'src');
  const isProd = eve === 'production'

  const config = {
    entry: "./src/index.js",
    mode: isProd ? 'production' : 'development',
    output: {
      path: path.resolve(__dirname, "../dist"),
      filename: '[name].js'
    },
    target: 'web',
    node: {
      fs: 'empty'
    },
    devtool: "source-map",
  //  devServer: {contentBase: './dist',},
    module: {
      rules: [
        {
          test: /\.(scss|css)$/,
          rules: [
            { loader: isProd ? MiniCssExtractPlugin.loader : 'style-loader'},
            {
              loader: 'css-modules-typescript-loader'
            },
            { loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: isProd ? '[hash:base64:5]' : '[name]__[local]',
                  mode: (resourcePath) => {
                    return resourcePath.includes('.mod.') ? 'local' : 'global'
                   }
                }
              } 
            },
            { loader: "sass-loader" },
          ],
        },
        {
          test: /\.(ts|tsx)$/,
          use: ["ts-loader"],
          exclude: /node_modules/
        },
        {
          test: /\.(js|jsx)$/,
          use: [{
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"]
            }
          }
          ],
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx", ".scss", ".json", ".wasm", ".mjs", "*"],
      modules: ['node_modules', 'src']
    }
  }

  const prodPlugins = [
    new HtmlWebpackPlugin({
      jsExtension: ".gz"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new CompressionPlugin({
      test: /\.(js|tsx|scss)$/,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
      }
    }),
    /* new BrotliPlugin({
         asset: '[path].br[query]',
         test: /\.(js|tsx|scss)$/,
         threshold: 10240,
         minRatio: 0.8
     }), */
   // new HtmlWebpackChangeAssetsExtensionPlugin()
  ]

  const devPlugins = [
    new CompressionPlugin({
      test: /\.(js|tsx|scss)$/,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
      }
    })
  ]

  config.plugins = isProd ? prodPlugins : devPlugins;
  if (!isProd) {
    config.devtool = "source-map";
    config.module.rules.push({
      enforce: "pre",
      test: /\.js$/,
      loader: "source-map-loader"
    })
  }

  return config;
}