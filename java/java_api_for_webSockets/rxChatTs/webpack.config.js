module.exports = {
  entry: "./chatmain",
  output: {filename: "chatapp.js"},
  module: {
    loaders: [
      {
      test: /.ts$/,
      loader: "ts-loader"
    }]
  },
  resolve: {
    extensions: [".ts", ".js"]
  }
}
