
/*module.exports = {
  entry: "./main.ts",
  output: {filename: "app.js"},
  module: {
    loaders: [
      {
        test: /.ts$/,
        loader: "ts-loader"
      }
    ]
  },
  resolve: {
    extensions: [ "ts", ".js", ""]
  }
}*/

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
    extensions: ["", ".ts", ".js"]
  }
}
