const path = require("path");
const nodeExternals = require('webpack-node-externals');

module.exports = eve => {

  const root = path.resolve(__dirname, '..');
  const dist = path.resolve(root, 'dist');
  const src = path.resolve(root, 'src');
  const isProd = eve === 'production'

  const config = {
    entry: "./src/server/index.js",
    mode: isProd ? 'production' : 'development',
    output: {
      path: dist,
      filename: "app.server.js"
    },
    target: 'node',
    externals: [nodeExternals({
            whitelist: ['react-image-crop/lib/ReactCrop.scss', 'react-redux-toastr/lib/css/react-redux-toastr.min.css']
          })],
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
  }

  if (isProd) { config.devtool = "source-map"; }

  return config

}