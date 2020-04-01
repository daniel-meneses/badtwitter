const path = require("path");
const nodeExternals = require('webpack-node-externals');

const config = {
  entry: "./src/server/index.js",
  target: 'node',
  externals: [nodeExternals({
          whitelist: ['react-image-crop/lib/ReactCrop.scss']
        })],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.server.js"
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: ['ignore-loader']
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
