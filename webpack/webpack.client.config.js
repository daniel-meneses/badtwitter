const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const webpack = require('webpack');
const BrotliPlugin = require('brotli-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackChangeAssetsExtensionPlugin = require('html-webpack-change-assets-extension-plugin')


const { NODE_ENV } = process.env
const isProd = NODE_ENV === 'production'
const isDev = NODE_ENV === 'development'

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: '[name].js'
  },
  target: 'web',
  node: {
    fs: 'empty'
  },
  devtool: "source-map",
  devServer: {
     contentBase: './dist',
  },
  module: {
    rules: [
      {
        test: /\.scss|css$/,
        use: [
              //MiniCssExtractPlugin.loader,
              "style-loader",
              "css-loader",
              "sass-loader",
            ],
        exclude: /\.mod\.scss$/
      },
      {
        test: /\.mod\.scss$/,
        use: [
              "style-loader",
              {
                loader: 'css-modules-typescript-loader',
                options: {
                  mode: 'emit'
                }
              },
              { loader: "css-loader",
                options: {
                  importLoaders: 2,
                  modules: {
                    localIdentName: isProd ? '[hash:base64:5]' : '[name]__[local]',
                  }
                }
              },
              "sass-loader",
            ],
        include: /\.mod\.scss$/
      },
      {
        test: /\.tsx?$/,
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
      },
      {
          enforce: "pre",
          test: /\.js$/,
          loader: "source-map-loader"
      }
    ]
  },
  /*
  optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all'
				}
			}
		}
	}, */
  plugins: [
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
      'process.env.ENV': JSON.stringify(process.env.ENV),
    }),
  /*  new BrotliPlugin({
            asset: '[path].br[query]',
            test: /\.(js|tsx|scss)$/,
            threshold: 10240,
            minRatio: 0.8
        }), */
    new HtmlWebpackChangeAssetsExtensionPlugin()
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".scss", ".json", ".wasm", ".mjs", "*"],
    modules: ['node_modules', 'src']
  }
};

module.exports = config;
