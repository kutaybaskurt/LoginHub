const path = require("path");
const dotenv = require("dotenv-webpack");
const nodeexternals = require("webpack-node-externals");

module.exports = {
  mode: "development",
  entry: "./sade/index.ts",
  target: "node",
  externals: [nodeexternals()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "@utils": path.resolve(__dirname, "sade/utils/index"),
      "@controllers": path.resolve(__dirname, "sade/controllers/index"),
      "@middlewares": path.resolve(__dirname, "sade/middlewares/index"),
    },
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  watch: true,
  plugins: [new dotenv()],
};
