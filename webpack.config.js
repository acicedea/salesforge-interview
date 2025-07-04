const webpack = require("webpack");

module.exports = {
  resolve: {
    fallback: {
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      url: require.resolve("url/"),
      buffer: require.resolve("buffer/"),
      stream: require.resolve("stream-browserify"),
      os: require.resolve("os-browserify/browser"),
      process: require.resolve("process/browser")
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"]
    })
  ]
};
