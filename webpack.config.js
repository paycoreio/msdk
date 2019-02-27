const libName = "PaycoreSDK";

const path = require("path");
const nodeExternals = require("webpack-node-externals");

const clientDevelopmentConfig = {
  target: "web",
  mode: "development",
  entry: __dirname + "/src/index.js",
  devtool: "inline-source-map",
  output: {
    path: __dirname + "/dist",
    filename: libName + ".umd.js",
    library: "PaycoreSDK",
    libraryTarget: "umd",
    umdNamedDefine: true,
    globalObject: "typeof self !== 'undefined' ? self : this"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: [path.resolve("./node_modules"), path.resolve("./src")],
    extensions: [".json", ".js"]
  }
};

const clientProductionConfig = Object.assign({}, clientDevelopmentConfig, {
  mode: "production",
  devtool: "source-map",
  output: {
    ...clientDevelopmentConfig.output,
    filename: libName + ".umd.min.js"
  }
});

module.exports = [clientDevelopmentConfig, clientProductionConfig];
