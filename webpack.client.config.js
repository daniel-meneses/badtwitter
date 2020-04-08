const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.client.js"
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.scss|css$/,
        use: [
              "style-loader",
              MiniCssExtractPlugin.loader,
              "css-loader",
              "sass-loader"
            ]
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
  plugins: [
    new MiniCssExtractPlugin({
        filename: "[name].css",
    })],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".scss", ".json", ".wasm", ".mjs", "*"],
    modules: ['node_modules', 'src']
  }
};

module.exports = config;
