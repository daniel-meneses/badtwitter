const path = require("path");
const nodeExternals = require('webpack-node-externals');

const root = path.resolve(__dirname, '..');
const src = path.resolve(root, 'src');


const { NODE_ENV } = process.env
const isProd = NODE_ENV === 'production'
const isDev = NODE_ENV === 'development'

const config = {
  entry: "./src/server/index.js",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "app.server.js"
  },
  target: 'node',
  externals: [nodeExternals({
          whitelist: ['react-image-crop/lib/ReactCrop.scss']
        })],
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.scss|css$/,
        use: [
              {
                loader: "css-loader",
                options: {
                  importLoaders: 2,
                  modules: {
                    compileType: 'module',
                    exportOnlyLocals: true,
                    localIdentName: isProd ? '[hash:base64:5]' : '[name]__[local]',
                  }
                }
              },
              "sass-loader",
            ],
        include: /\.mod\.scss$/
      },
      {
        test: /\.scss|css$/,
        use: ["ignore-loader"],
        exclude: /\.mod\.scss$/
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
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  }
};

module.exports = config;
