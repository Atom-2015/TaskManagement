const webpack = require("webpack");

module.exports = function override(config) {
  config.resolve.fallback = {
    fs: false,
    child_process: false,
    worker_threads: false,
    module: false, // fixes 'module' not found in webpack internals
    os: require.resolve("os-browserify/browser"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    url: require.resolve("url/"),
    constants: require.resolve("constants-browserify"),
    querystring: require.resolve("querystring-es3"),
    vm: require.resolve("vm-browserify"),
    assert: require.resolve("assert"),
    path: require.resolve("path-browserify"),
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    zlib: require.resolve("browserify-zlib"),
    buffer: require.resolve("buffer"),
    process: require.resolve("process/browser.js"), // ✅ correct extension
    util: require.resolve("util"),
     tty: require.resolve("tty-browserify"),
  };

  config.plugins = [
    ...(config.plugins || []),
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
      process: "process/browser.js", // ✅ correct extension
    }),
  ];
   // ignore TypeScript .d.ts files like from esbuild
  config.module.rules.push({
    test: /\.d\.ts$/,
    use: "ignore-loader",
  });

  return config;
};
